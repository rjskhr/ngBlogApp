import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SearchService {
  searchTerm = new BehaviorSubject(null);
  searchCategory = new BehaviorSubject(0);
  constructor() { }

}
