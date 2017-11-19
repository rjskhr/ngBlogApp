import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogDataService} from "../../services/blog-data.service";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit, OnDestroy {

  blogposts: any[] = null;

  private myPostsSubscription;

  constructor(private blogservice: BlogDataService, private loginservice: LoginService) { }

  ngOnInit() {
    this.myPostsSubscription = this.blogservice.getRecentPosts(5)
      .subscribe((blogposts) => {
        this.blogposts = blogposts;
      });
  }

  ngOnDestroy(){
    this.myPostsSubscription.unsubscribe();
  }

  blogDeleteHandler(blogId){
    this.blogposts = this.blogposts.filter(blog => blog.id != blogId);
  }


}
