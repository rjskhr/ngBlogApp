import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogDataService} from "../services/blog-data.service";
import {SearchService} from "../services/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  allPosts: any[];
  displayPosts: any[]
  searchterm;
  searchcategory;
  private searchTermSubscription;
  private searchCategorySubscription;

  constructor(private request: BlogDataService, private searchService: SearchService) { }

  ngOnInit() {
    this.request.getAllPosts()
      .subscribe((res) => {
        this.allPosts = res;

        this.searchTermSubscription = this.searchService.searchTerm.subscribe(searchterm =>{
          this.searchterm = searchterm;
          this.filterPosts();
        });

        this.searchCategorySubscription = this.searchService.searchCategory.subscribe(searchcategory =>{
          this.searchcategory = searchcategory;
          this.filterPosts()
        });

      });
  }

  filterPosts(){
    if(this.searchcategory == 0){
      this.displayPosts = this.allPosts.map(data => data);
    } else {
      this.displayPosts = this.allPosts.filter(post => post.category == this.searchcategory);
    }

    if(this.searchterm) {
      this.displayPosts = this.displayPosts.filter(post => post.title.toLowerCase()
                                                .indexOf(this.searchterm.toLowerCase()) !== -1);
    }

  }

  ngOnDestroy(){
    this.searchCategorySubscription.unsubscribe();
    this.searchTermSubscription.unsubscribe();
  }

}
