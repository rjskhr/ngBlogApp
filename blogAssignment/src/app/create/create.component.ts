import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BlogActionService} from "../services/blog-action.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  blogTitle: string;
  blogContent: string;
  blogCategory;

  constructor(private request: BlogActionService, private router: Router) { }

  ngOnInit() {
    (<any>window).materialSelect();
  }

  submitPost(){
    let blogCategory = (<any>window).$("select#blogCategory").val();
    this.request.submitPost(this.blogTitle, this.blogContent, +blogCategory)
      .subscribe((res) => {
        this.router.navigate([`/blogs/${res.id}`]);
      });
  }

}

