import { Component, OnInit } from '@angular/core';
import {BlogDataService} from "../services/blog-data.service";

@Component({
  selector: 'app-allblogs',
  templateUrl: './allblogs.component.html',
  styleUrls: ['./allblogs.component.css']
})
export class AllblogsComponent implements OnInit {
  allposts: any[];

  constructor(private request: BlogDataService) { }

  ngOnInit() {
    this.request.getAllPosts()
      .subscribe((res) => {
        this.allposts = res;
      });
  }

  blogDeleteHandler(blogId){
    this.allposts = this.allposts.filter(blog => blog.id != blogId);
  }

}
