import React from 'react'
import {observer} from 'mobx-react'

@observer
class TodoList extends React.Component {
  constructor () {
    super()
    this.state = {
      a: 1,
      b: 2,
      arr: [1, 2, 3, 5, 6, 7]
    }
  }
  render () {
    let $li = this.state.arr.map(item => {
      return (
        <li>{item}</li>
      )
    })
    return (
      <ul>
        {$li}
      </ul>
    )
  }
}

export default TodoList
