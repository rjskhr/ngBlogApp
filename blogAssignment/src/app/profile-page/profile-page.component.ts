import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  blogposts;
  loggedin;

  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginservice.subscribe((loggedin)=>{
      this.loggedin = loggedin;
      if(this.loggedin){
        this.loginservice.getMyPosts()
          .subscribe(data =>{
            this.blogposts = data;
          });
      } else{
        this.blogposts = null;
      }
    });
  }

  blogDeleteHandler(blogId){
    this.blogposts = this.blogposts.filter(blog => blog.id != blogId);
  }


}
