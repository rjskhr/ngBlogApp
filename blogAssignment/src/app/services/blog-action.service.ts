import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

const BASE_URL = 'http://localhost:3204/';
const header = {headers: new Headers({'Content-Type':'application/json'})};

@Injectable()
export class BlogActionService {

  private _loggedin;
  get loggedin(){
    return this._loggedin;
  }
  get userid(){
    return this.loginservice.userid;
  }
  favs: any[] = [];

  constructor(private loginservice: LoginService, private http: Http) {
    this.loginservice.subscribe((data)=>{
      this._loggedin = data;
      if(this._loggedin == true) {
        this.loginservice.favArrayObservable
          .subscribe((favs)=>{
            this.favs = favs;
          });
      } else{
        this.favs = [];
      }
    });
  }

  isEditable(authorId){
    return this.loggedin && (this.userid == authorId);
  }

  isFav(blogId){
    return this.favs.includes(blogId);
  }

  favD(blogId){
    if(this._loggedin) {
      this.loginservice.favoritePost(blogId);
    }
  }

  unfavD(blogId){
    console.log("unfav")
    if(this._loggedin) {
      console.log("heeeere")
      this.loginservice.unfavoritePost(blogId);
    }
  }

  submitPost(blogTitle: string, blogContent: string, blogCategory: number){
    if(this.loggedin) {
      let data = {
        'author': this.loginservice.username,
        'authorId': this.loginservice.userid,
        'title': blogTitle,
        'post': blogContent,
        'time': Date.now(),
        'category': blogCategory
      };
      return this.http.post(`${BASE_URL}blogposts/`, data, header)
        .map(res => res.json());
    }
  }

  deletePost(blogId){
    if(this._loggedin) {
      if(confirm("Do you want to delete?")){
        return this.http.delete(`${BASE_URL}blogposts/${blogId}`)
          .map(res => {
            this._internalFavUpdate(blogId);
            return res.json()
          });
      }
    }
  }

  private _internalFavUpdate(blogId){
    this.http.get(`${BASE_URL}userdetails`).map(d => d.json())
      .subscribe(userdetails => {
        userdetails.forEach(userdetail => {
          let newFavs = {'favorites': userdetail.favorites.filter(d => d!=blogId)};
          this.http.patch(`${BASE_URL}userdetails/${userdetail.id}`, newFavs, header)
            .subscribe(d => d);
        });
      });
  }

  updatePost(blogId: number, blogTitle: string, blogContent: string, blogCategory: number){
    if(this._loggedin && this.isEditable(blogId)){
      let data = {
        'title': blogTitle,
        'post': blogContent,
        'category': blogCategory
      };
      return this.http.patch(`${BASE_URL}blogposts/${blogId}`, data, header)
        .map(res => res.json());
    }
  }
}
