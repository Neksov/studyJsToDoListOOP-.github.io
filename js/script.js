'use strict';

class Todo{
  constructor(form, input, todoList, todoCompleted){
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);

    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));//коллекция 

  }

  addToStorage (){
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))//из коллекции делаем массив
  }

  render(){
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
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

    if(todo.completed){
      this.todoCompleted.append(li);
    }else{
      this.todoList.append(li);
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
      this.input.value ='';

      this.render();
    }
    }

  generateKey(){
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);//создаем не большой набор символов
  }

  deleteItem(li){//удаление строки
    this.todoData.forEach((item, i, arr) =>{
      if(item.key === li.key){
        li.remove(li);
        arr.delete(i);
      }
      this.render();
    });
  }

  completedItem(li){//меняем дела 
    this.todoData.forEach((item) =>{
          if(item.key === li.key){
            item.completed = !item.completed;
          }
          this.render();
        });
  }

  handler(){
    const toDoContainer = document.querySelector('.todo-container');

          toDoContainer.addEventListener('click', (event) =>{
            let target = event.target; //записываем в таргет элемент на котором произошло событие.
            if(target.matches('.todo-remove')){
              this.deleteItem(target.closest('.todo-item'));
            }else if(target.matches('.todo-complete')){
              this.completedItem(target.closest('.todo-item'));
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
