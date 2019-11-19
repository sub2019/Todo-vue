(function (Vue) {
  'use strict';

  let list = [
    {id: 1, text: "吃饭", completed: true},
    {id: 2, text: "睡觉", completed: false},
    {id: 3, text: "打豆豆", completed: false}
  ]

  console.log(new Vue())
  var app = new Vue({
    el: '.todoapp',
    data: {
      title: '2019/11/18',
      list,
      status: '',
      editStyle: ''
    },
    methods: {
      /**
       * 添加任务项
       */
      addTodo (e) {
        this.list.push({
          id: this.list.length + 1,
          text: e.target.value,
          completed: false
        })
        e.target.value = ''
      },

      /**
       * 删除任务项
       */
      removeTodo (index) {
        this.list.splice(index, 1)
      },

      /**
       * 全选
       */
      selectAll (e) {
        let status = e.target.checked
        this.list.map((item) => {
          item.completed = status
        })
      },

      /**
       * 单选
       */
      selectOne (item) {
        item.completed = !item.completed
      },

      /**
       * 状态切换
       */
      toggleStatus (e) {
        let hash = e.target.hash.slice(2)
        this.status = hash
      },

      /**
       * 清理全部
       */
      clearAll () {
        this.list = []
      },

      /**
       * 完成编辑
       */
      editCompleted (item, $event) {
        item.text = $event.target.value
        this.editStyle = ''
      }
    },

    computed: {
      /**
       * 关联全选
       */
      allSelectStatus () {
        return this.list.every((i) => i.completed === true)
      },

      /**
       * 未完成任务数
       */
      uncompletedTodos () {
        return this.list.filter((item) => item.completed === false).length
      },

      /**
       * 切换完成/未完成
       */
      filterList () {
        if (this.status === '') {
          return this.list
        }
        if (this.status === 'active') {
          return this.list.filter((item) => {
            return item.completed === false
          })
        }
        if (this.status === 'completed') {
          return this.list.filter((item) => {
            return item.completed === true
          })
        }
      }
    },

    directives: {
      /**
       * 自动获取焦点
       */
      focus: {
        inserted (el) {
          el.focus()
        }
      }
    },

    created () {
      console.log(this.filterList)
      let hash = ''
      hash = getHash()
      console.log(hash,111111111)
      this.status = hash
    }
  })

})(Vue);


function getHash () {
  return window.location.hash.slice(2)
}


