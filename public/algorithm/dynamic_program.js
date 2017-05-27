// 有面值为1, 3, 5的硬币若干，问凑出11块最少的硬币数
// test(0)=0, test(1)=1, test(2)=2, test(3)=1

function test (n) {
  if (n === 0) {
    return 0;
  } else {
    if (n < 3) {
      return test(n-1) + 1
    } else if (n >= 3 && n < 5) {
      return Math.min(test(n - 1) + 1, test(n - 3) + 1)
    } else {
      return Math.min(test(n - 1) + 1, test(n - 3) + 1, test(n - 5) + 1)
    }
  }
}

//LIS Longest increase sequense最长非降序子序列
// 一开始想错了，15, 27, 14, 38, 26, 55, 46, 65, 85 => 6 => 15, 27, 38, 55, 65, 85
// 2, 1, 5, 3, 6, 4, 8, 9, 7 => 5  => 1, 5, 6, 8, 9
function lis(arr) {
  let d = [];
  let len = 1;
  for (let i = 0; i < arr.length; i++)   {
    d[i] = 1;
    for (let j = 0; j < i; j++) {
      if (j < i && arr[j] < arr[i]) {
        d[i] = d[j] + 1;
      }
    }
    if (d[i] > len) {
      len = d[i];
    }
  }
  return len;
}

function lis2(arr) {
  let d = [];
  let len = 1;
  let target = [];
  for (let i = 0; i < arr.length; i++)   {
    d[i] = 1;
    target[i] = [arr[i]];
    for (let j = 0; j < i; j++) {
      if (j < i && arr[j] < arr[i]) {
        d[i] = d[j] + 1;
      }
      let preMax = Math.max.apply(Math, target[i-1])
      if (j < i && arr[j] < arr[i] && arr[j] <= preMax) {
        target[i].push(arr[j]);
      }
    }
    if (d[i] > len) {
      len = d[i];
    }
  }
  return target;
}


lis2([5,3,4,8,2])

