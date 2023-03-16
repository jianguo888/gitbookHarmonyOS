// 导入默认数据
import todoList from '../../common/data/todoList.js'
// 存储
import storage from '@system.storage';
// 对话框
import prompt from '@system.prompt';
export default {
    data: {
        todoList: todoList,
        value: ''
    },
    onInit(){
        storage.get({
            key: 'todoInfo',
            success: data => {
                console.log('获取Storage成功' + data);
            }
        });
    },
    setStorage() {
        storage.set({
            key: 'todoInfo',
            value: JSON.stringify(this.todoList),
            success: data => {
                console.log('保存成功');
            }
        });
    },
    // 删除
    remove (index){
        prompt.showDialog({
            title: "确定删除吗",
            message: "当前删除的索引是 "+ index,
            buttons: [
                {text:'取消', color: '#666666'},
                {text:'确定', color: '#666666'}
            ],
            success: function(data) {
                if(data.index === 1) {
                    todoList.splice(index,1)
                    storage.set({
                        key: 'todoInfo',
                        value: JSON.stringify(todoList),
                        success: data => {
                            console.log('保存成功');
                        }
                    });
                }
            }
        })
    },
    // 更改状态
    checkStatus(index){
        console.log(index);
        this.todoList[index].status = !this.todoList[index].status;
        this.setStorage()
    },
    changeValue (e) {
       this.value = e.value
    },
    addTodo() {
        this.todoList.push({
            info: this.value,
            status: false
        })
        this.setStorage()
    },
    // 计算属性，计算代办总数
    computed: {
        needTodoNum(){
            let num = 0;
            this.todoList.forEach(item => {
                if(!item.status){
                    num++;
                }
            });
            return num;
        }
    },
}
