import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateComponent} from "./create/create.component";
import {AllblogsComponent} from "./allblogs/allblogs.component";
import {BlogdetailComponent} from "./blogdetail/blogdetail.component";
import {LoginComponent} from "./login/login.component";
import {BlogUpdateComponent} from "./blog-update/blog-update.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'create', component: CreateComponent},
  { path: 'home', component: HomeComponent },
  { path: 'blogs', component: AllblogsComponent },
  { path: 'blogs/:id', component: BlogdetailComponent },
  { path: 'blogs/:id/update', component: BlogUpdateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfilePageComponent},
  { path: 'search', component: SearchComponent},
];

export const Routing = RouterModule.forRoot(routes);
