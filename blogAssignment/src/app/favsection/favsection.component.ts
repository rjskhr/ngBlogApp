import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-favsection',
  templateUrl: './favsection.component.html',
  styleUrls: ['./favsection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavsectionComponent implements OnInit, OnDestroy {

  favposts: any;
  private myLoginSubscription: any;
  private myFavSubscription: any;
  loggedin: boolean;

  constructor(private loginserive: LoginService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.myLoginSubscription = this.loginserive
      .subscribe((value)=>{
        this.loggedin = value;
        if(this.loggedin) {
          this.myFavSubscription = this.loginserive.favorites
            .subscribe(favs =>{
              this.favposts = favs;
              this.cd.markForCheck();
            })
        } else{
          this.favposts = [];
        }
        this.cd.markForCheck();
      });
  }

  unfav(id){
    //remove locally first;
    //markfor changes
    //use login service to update favs
    this.loginserive.unfavoritePost(id);
  }

  ngOnDestroy(){
    this.myLoginSubscription.unsubscribe();
    if(this.myFavSubscription){
      this.myFavSubscription.unsubscribe();
    }
  }

}
