import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogDataService} from "../services/blog-data.service";
import {BlogActionService} from "../services/blog-action.service";

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.css']
})
export class BlogUpdateComponent implements OnInit {
  private blog;
  blogId: number;
  blogTitle: string;
  blogContent: string;

  constructor(private route: ActivatedRoute, private bds: BlogDataService, private bas: BlogActionService, private router: Router) { }

  ngOnInit() {
    this.blogId = +this.route.snapshot.params['id'];


    this.bds.getPost(this.blogId)
      .subscribe((result)=>{
        if(!this.bas.isEditable(result.authorId)){
          this.router.navigate([`/blogs/${this.blogId}`])
        }
        this.blog = result;
        this.blogTitle = result.title;
        this.blogContent = result.post;
        let domOp = (<any>window);
        domOp.$(`option[value='${this.blog.category}']`).attr("selected", true);
        domOp.materialSelect();
      });

    //subscribe to loggedin and do a reroute when logged out
  }

  updatePost(){
    let blogCategory = (<any>window).$("select#blogCategory").val();
    this.bas.updatePost(this.blog.authorId, this.blogId, this.blogTitle, this.blogContent, +blogCategory)
      .subscribe((res) => {
        this.router.navigate([`/blogs/${res.id}`]);
      });
  }

}
