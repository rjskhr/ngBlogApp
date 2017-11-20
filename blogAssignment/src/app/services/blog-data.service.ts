import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

const BASE_URL = 'http://localhost:3205/';
const header = {headers: new Headers({'Content-Type':'application/json'})};

@Injectable()
export class BlogDataService {

  constructor(private http: Http) { }

  getRecentPosts(num: number){
    return this.http.get(`${BASE_URL}blogposts?_sort=id&_order=desc&_start=0&_end=${num}`)
      .map(result => result.json());
  }

  getMyPosts(userId){
    return this.http.get(`${BASE_URL}blogposts?authorId=${userId}`)
      .map(result => result.json());
  }

  getAllPosts(){
    return this.http.get(`${BASE_URL}blogposts/`)
      .map(result => result.json());
  }

  getPost(id: number){
    return this.http.get(`${BASE_URL}blogposts/${id}`)
      .map(result => result.json());
  }

}
