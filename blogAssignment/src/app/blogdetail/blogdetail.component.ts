import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogDataService} from "../services/blog-data.service";
import {BlogActionService} from "../services/blog-action.service";

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.css']
})
export class BlogdetailComponent implements OnInit {
  blogId: number;
  blog;
  win = <any>window;
  categories = ["Potatoes", "Latin", "Other"];

  constructor(private route: ActivatedRoute, private router: Router, private request: BlogDataService, public blogaction: BlogActionService) { }

  ngOnInit() {
    this.blogId = +this.route.snapshot.params['id'];
    this.request.getPost(this.blogId)
      .subscribe((result)=>{
        this.blog = result;
      })
  }

  deleteHandler(){
    let retCatch = this.blogaction.deletePost(this.blog.id);
    if(retCatch){
      retCatch.subscribe(data =>{
        this.router.navigateByUrl('/home');
      })
    }
  }

}
