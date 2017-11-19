import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import { Routing } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogsComponent } from './home/blogs/blogs.component';
import { FavsectionComponent } from './favsection/favsection.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { BlogdetailComponent } from './blogdetail/blogdetail.component';
import { AllblogsComponent } from './allblogs/allblogs.component';
import { BlogminiComponent } from './blogmini/blogmini.component';
import {BlogDataService} from "./services/blog-data.service";
import { LoginComponent } from './login/login.component';
import {LoginService} from "./services/login.service";
import { ProfileComponent } from './navbar/profile/profile.component';
import {BlogActionService} from "./services/blog-action.service";
import { BlogUpdateComponent } from './blog-update/blog-update.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SearchComponent } from './search/search.component';
import {SearchService} from "./services/search.service";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogsComponent,
    FavsectionComponent,
    CreateComponent,
    HomeComponent,
    BlogdetailComponent,
    AllblogsComponent,
    BlogminiComponent,
    LoginComponent,
    ProfileComponent,
    BlogUpdateComponent,
    ProfilePageComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    Routing,
    HttpModule,
    FormsModule
  ],
  providers: [BlogDataService, LoginService, BlogActionService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
