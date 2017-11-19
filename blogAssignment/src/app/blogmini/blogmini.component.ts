import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogActionService} from "../services/blog-action.service";

@Component({
  selector: 'app-blogmini',
  templateUrl: './blogmini.component.html',
  styleUrls: ['./blogmini.component.css']
})
export class BlogminiComponent implements OnInit {

  @Input() blog: any;
  @Output() deleted = new EventEmitter<any>();
  win = <any>window;
  categories = ["Potatoes", "Latin", "Other"];

  constructor(public blogaction: BlogActionService) { }

  ngOnInit() {
  }

  deleteHandler(){
    let retCatch = this.blogaction.deletePost(this.blog.id);
    if(retCatch){
      retCatch.subscribe(data =>{
        this.deleted.emit(this.blog.id);
      })
    }
  }

}
