import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  username: string;
  password: string;
  private _loggedin: boolean;
  private _mySubscription: any;

  get loggedin(): boolean{
    return this._loggedin;
  }

  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
    this._mySubscription = this.loginservice.subscribe((data)=>{
      this._loggedin = data;
      if(data){
        this.router.navigateByUrl('/home');
      }
    });
  }

  ngOnDestroy() {
    this._mySubscription.unsubscribe();
  }

  loginclick(username: string, password: string){
    //disable edit here?
    this.loginservice.attemptlogin(username, password);
    //unsubscribe on destroy?
  }

}
