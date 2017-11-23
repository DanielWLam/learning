# 搞懂JS执行机制
中午看了一篇清晰易懂的文章来解释JS执行机制，这里打算用自己的话来做个总结，有位伟人说过，自己能总结归纳起来，才是自己的。

# 同步与异步
因为JS单线程的特性，实际上很多需要耗时的任务，JS都会把异步任务都放到event_queue中，在主线程的事情做完后，会定期的轮训event_queue，把里面的结果拿出来，这样循环往复的过程就构成了event_loop。说起来，既然是queue，那么任务自然是**FIFO**了。

# Macro Event Queue与Micro Event Queue
Event_queue也分两种，一种是macro_event_queue, 主要存在的主流程的异步任务，setTimeout回调和setInterval回调；另一个micro_event_queue，存放的主要是process任务和promise的then回调等。

# 执行流程
1. 第一轮：按顺序执行主流程任务
2. 按顺序执行micro event queue的任务
3. 第二轮：取出macro event queue第一个任务，压入主流程，重复第1步

# 举个栗子
```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
process.nextTick(() => {
  console.log(3)
})
new Promise((resolve) => {
  console.log(4)
  resolve()
}).then(() => {
  console.log(5)
})
```
上面一段代码，执行的流程就会像下图这样：
![undefined](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/0633bcb2-d454-4ef3-b26b-4d60e557d2b1.png)  
1. 首先执行同步任务，按出现顺序，输出1
2. 遇到setTimeout，放入micro event queue
3. 遇到process，放入micro event queue
4. 遇到promise，先立即执行，输出4，then回调放入micro event queue
5. 然后看micro event queue，逐个执行，输出3， 输出5
5. 第一轮event loop执行结束

![undefined](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/e8ef9660-35cb-4a29-98af-39e6dbc91311.png) 

第二轮event loop开始
1. 去除Macro event queue第一个放入主流程执行
2. 输出2
3. micro event queue没有任务
4. 第二轮event loop执行结束

再举个栗子，理解了这个例子就是真的懂了：
```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
process.nextTick(() => {
  console.log(3)
})
new Promise((resolve) => {
  console.log(4)
  resolve()
}).then(() => {
  console.log(5)
})

setTimeout(() => {
  console.log(6)
}, 0)
new Promise((resolve) => {
  console.log(7)
  setTimeout(() => {
    console.log(8)
    resolve()
  }, 0)
}).then(() => {
  console.log(9)
  setTimeout(() => {
    console.log(10)
    new Promise((resolve) => {
      console.log(11)
      resolve()
    }).then(() => {
      console.log(12)
    })
  }, 0)
})
```
还是画图辅助：
第一轮eventloop：
![undefined](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/3e03e4ed-49e2-4f4e-aff3-d21abffb6102.png) 
1. 主流程输出：1， 4， 7
2. 执行第一个micro event queue：输出3
3. 第二个micro event queue：输出5
4. micro event queue清空，第一轮执行完毕

第二轮eventloop：
![undefined](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/f17f5dc8-52db-43ad-9c19-559a186521ef.png) 
1. 主流程输出2
2. micro event queue为空，第二轮执行完毕

第三轮eventloop：
![undefined](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/251229d3-918c-4274-bd7d-ee0cd1413abc.png) 
1. 主流程输出6
2. 第二轮执行完毕

第四轮eventloop
![undefined](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/e7ab082c-d8f4-4657-b1ce-9ec85d0b6673.png) 
1. 注意，这里执行输出8后，resolve，这时才向micro event queue压入then回调
2. 执行then9回调,输出9
3. 又有新的setTimeout，压入macro event queue
4. 这轮循环没有东西可执行，结束

第五轮eventloop
![undefined](https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/skylark/png/c5595a38-4357-4e18-afdc-7b6b4baf072d.png) 
1. 第五轮，setTimeout10进入主流程，输出10,
2. 遇到promise，输出11
3. resolve， 压入then到micro event queue
4. 取出micro event queue执行，输出12
5. 完毕

至此， 这段代码的完整执行流程就结束了，最终输出：
```js
1, 4, 7, 3, 5, 2, 6, 8, 9, 10, 11, 12
```







