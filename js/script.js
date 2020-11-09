'use strict';

class Todo{
  constructor(form, input, todolist, todoComleted){
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todolist = document.querySelector(todolist);
    this.todoComleted = document.querySelector(todoComleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));//коллекция 

  }

  addToStorage (){
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))//из коллекции делаем массив
  }

  render(){
    this.todolist.textContent = '';
    this.todoComleted.textContent = '';
    this.todoData.forEach(this.createItem);
    this.addToStorage ();
  }

  createItem = (todo) =>{
    
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;

    li.insertAdjacentHTML('beforeend',`
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
          <button class="todo-remove"></button>
          <button class="todo-complete"></button>
        </div>
    `);

    if(todo.comleted){
      this.todoComleted.append(li);
    }else{
      this.todolist.append(li);
    }
  }

  addTodo(e){
    e.preventDefault();// отменяем стандартные действия

    if(this.input.value.trim() === ''){
      alert('Повторите еще раз');
    }else{
      const newTodo = {
        value: this.input.value, //текст который будем получать
        completed: false, // свойство которое определяет выполнено условие или нет. Если false добавляем в todolist,а если true todoComleted
        key: this.generateKey(),//ключ
      }

      this.todoData.set(newTodo.key, newTodo);

      this.render();
    }
    console.log(this);
    }

  generateKey(){
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);//создаем не большой набор символов
  }

  deleteItem(){
    const todoRemove = document.querySelector('.todo-remove');//удаление строки
    todoRemove.addEventListener('click',()=>{
      
    // delete this.todoData[todo.key]; //удаляем по ключу
    this.todoData.delete(this.key);
    // localStorage.clear(this.todoData.splice(this.key, 1)); //удаляет полностью 
    render();
    });
  }

  // completedItem(){
  //   const btnTodoCompleted = document.querySelector('.todo-complete')
  //   btnTodoCompleted.addEventListener('click', function(){
  //     this.todoData.forEach((item) =>{
  //         if (item.this.todoData === this.key){
  //           todo.completed = true;
  //           this.render();
  //         }else{
  //           todo.completed = false;
  //           this.render();
  //         }
  //     });
  //   });
  //   localStorage.setItem('todoData', JSON.stringify(this.todoData));//ковектируем в json формат
  //   const data = JSON.parse(localStorage.getItem('todoData')); //конвертировать обратно в формат javascript
  // }

  handler(){
    const toDoContainer = document.querySelector('.todo-container');

          toDoContainer.addEventListener('click', (event) =>{
            let target = event.target; //записываем в таргет элемент на котором произошло событие.
            if(target === target.closest('.todo-remove')){
              console.log(target);
              this.deleteItem();
            }else if(target === target.closest('.todo-complete')){
              console.log(target);
              // this.completedItem();
            }
          });
  }

  init(){
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    this.handler();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
