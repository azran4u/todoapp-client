import { Component } from '@angular/core';
import {Cat, CatService} from './cat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoArray = [];
  title = 'My first Todo App';
  public cats: Cat[];

  constructor( private catService: CatService ){};

  addTodo(value) {
    this.todoArray.push(value);
    console.log("item added:" + value);

    this.catService.getAllCats()
      .subscribe(
        res => {
          let cats : Cat[] = res["cats"];
          cats.forEach( (cat) => {
            console.log("Received from cat service: " + cat.name);
          })},
        err => {
          console.log("Error: " + err.name + ". " + err.message );
        }
      );
  }

  /*delete item*/
  deleteItem(todo) {
    for (let i = 0; i <= this.todoArray.length; i++) {
      if (todo == this.todoArray[i]) {
        this.todoArray.splice(i, 1)
      }
    }
    console.log("item deleted: " + todo.toString())
  }

  // submit Form
  todoSubmit(value:any){
    if(value!==""){
      this.addTodo(value.todo)
    }else{
      alert('Field required **')
    }
  }
}
