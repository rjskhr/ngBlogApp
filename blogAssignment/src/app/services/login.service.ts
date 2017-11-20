import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BlogDataService} from "./blog-data.service";

const BASE_URL = 'http://localhost:3205/';
const header = {headers: new Headers({'Content-Type':'application/json'})};

@Injectable()
export class LoginService {

  private _loginTeller: any = new BehaviorSubject(false);
  private _user: any = {};

  constructor(private http: Http, private blogdata: BlogDataService) {
    let loginUsername = localStorage.getItem("blogAppUsername");
    let loginPassword = localStorage.getItem("blogAppPassword");
    if(loginUsername != null && loginPassword != null) {
      this.http.get(`${BASE_URL}users?username=${loginUsername}`)
        .subscribe((result) => {
          let resultJ = result.json();
          if (resultJ.length == 1 && resultJ[0].password == loginPassword) {
            this.http.get(`${BASE_URL}userdetails/${resultJ[0].id}`)
              .subscribe((res)=>{
                this._user = res.json();
                this.favoritesUpdate();
                this._loginTeller.next(true);
              });
          }
        });
    } else{
      this._loginTeller.next(false);
    }
  }

  subscribe(fn){
    if(this._loginTeller){
      return this._loginTeller.subscribe(fn);
    }
    return null;
  }

  get username(): string{
    return this._user.username;
  }
  get userid(): number{
    return this._user.id;
  }

  favArrayObservable = new BehaviorSubject([]);
  favArrayUpdate(){
    if(this._user){
      this.favArrayObservable.next(this._user.favorites);
    } else{
      this.favArrayObservable.next([]);
    }
  }

  //also see if we can "cache" favdetails so we don't have to send all those get requests.

  favorites: BehaviorSubject<any> = new BehaviorSubject([]);
  private _arr;
  private favObservable;

  favoritesUpdate(){
    this.favArrayUpdate();
    if(this._user.favorites && this._user.favorites.length > 0){
      this._arr = {array: [], length: this._user.favorites.length};
      this.favObservable = new BehaviorSubject(null);
      this.favObservable.subscribe((data) => {
        if(data == null){
          return;
        }
        this._arr.array.push(data);
        this._arr.length--;
        if(this._arr.length == 0){
          this.favorites.next(this._arr.array);
          this._arr = null;
          this.favObservable = null;
        }
      });

      this._user.favorites.forEach(fav => {
        this.blogdata.getPost(fav).subscribe((data)=>{
          this.favObservable.next(data);
        });
      });
    } else{
      this.favorites.next([]);
    }
  }

  favoritePost(BlogId){
    this.http.get(`${BASE_URL}userdetails/${this._user.id}`)
      .subscribe((details)=>{
        let detailsJ = details.json();
        this._user.favorites = detailsJ.favorites;
        if(!this._user.favorites.includes(BlogId)){
          this._user.favorites.push(BlogId);
          this.http.patch(`${BASE_URL}userdetails/${this._user.id}`, this._user, header)
            .subscribe(data => data);
        }
        this.favoritesUpdate();
      });
  }

  unfavoritePost(BlogId){
    this.http.get(`${BASE_URL}userdetails/${this._user.id}`)
      .subscribe((details)=>{
        let detailsJ = details.json();
        this._user.favorites = detailsJ.favorites;
        if(this._user.favorites.includes(BlogId)){
          const index = this._user.favorites.indexOf(BlogId);
          this._user.favorites.splice(index, 1);
          console.log(this._user.favorites);
          this.http.patch(`${BASE_URL}userdetails/${this._user.id}`, this._user, header)
            .subscribe(data => data);
        }
        this.favoritesUpdate();
      });
  }

  attemptlogin(username: string, password: string){
    this.http.get(`${BASE_URL}users?username=${username}`)
      .subscribe((result)=>{
        let resultJ = result.json();
        if(resultJ.length === 1 && resultJ[0].password === password){
          localStorage.setItem("blogAppUsername", username);
          localStorage.setItem("blogAppPassword", password);
          this.http.get(`${BASE_URL}userdetails/${resultJ[0].id}`)
            .subscribe((res)=>{
              this._user = res.json();
              this.favoritesUpdate();
              this._loginTeller.next(true);
            });
        } else {
          this._loginTeller.next(false);
        }
      });
  }

  logout(){
    localStorage.removeItem("blogAppUsername");
    localStorage.removeItem("blogAppPassword");
    this._user = {};
    this._loginTeller.next(false);
  }

  getMyPosts(){
    if(this._user){
      return this.blogdata.getMyPosts(this._user.id);
    }
  }



}
