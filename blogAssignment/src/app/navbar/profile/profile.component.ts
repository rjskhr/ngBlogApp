import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  @Input() username;
  @Output() logout: EventEmitter<any> = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
    (<any>window).profileDropDown();
  }

  logoutClick(){
    this.logout.emit();
  }

}
