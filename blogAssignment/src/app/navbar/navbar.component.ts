import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/filter';
import {SearchService} from "../services/search.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {

  private _loggedin: boolean = null;
  private _mySubscription: any;
  username: string = null;
  searchdisplay = false;
  private _searchTerm;

  get searchTerm(){
    return this._searchTerm;
  }

  set searchTerm(value){
    this._searchTerm = value;
    this.sendSearchTerm();
  }

  constructor(private _loginservice: LoginService, private router: Router,
                private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute,
                private searchService: SearchService) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd)=>{
        if(event.url.startsWith('/search')){
          this.searchdisplay = true;
          setTimeout((<any>window).searchHelper, 200);
        } else{
          this.searchdisplay = false;
        }
        this.cd.markForCheck();

      });

    this._mySubscription = this._loginservice.subscribe((data)=>{
      this._loggedin = data;
      this.username = this._loginservice.username;
      this.cd.markForCheck();
    });
  }

  get loggedin(){
    return this._loggedin;
  }

  logoutClick(){
    this._loginservice.logout();
  }

  onSearchClick(){
    this.searchdisplay = !this.searchdisplay;
    if(this.searchdisplay){
      this.cd.markForCheck();
      this.router.navigateByUrl('/search');
      setTimeout((<any>window).searchHelper, 100);
    }
  }

  sendSearchTerm(){
      this.searchService.searchTerm.next(this._searchTerm);
  }

  sendFilterCategory(cat){
    this.searchService.searchCategory.next(cat);
  }

  ngOnDestroy() {
    this._mySubscription.unsubscribe();
  }

}
