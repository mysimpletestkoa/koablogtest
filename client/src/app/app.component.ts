import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

import '../assets/css/styles.css';
import { MenuService } from './_services/index';
import { User, currentUser } from './_models/index';

@Component({
  moduleId: module.id.toString(),
  selector: 'app',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  private searchString: string = "";
  private currentUser: currentUser = new currentUser;
  private currentMenu: Array<{}>;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private sessionStorage: SessionStorageService) {
    // console.log('application constructor');
      this.currentMenu = this.menuService.user();
  }

  ngOnInit() {
    // console.log('app.onInit');
  }

  search() {
    if (this.searchString == undefined) {
      this.searchString = "";
      this.sessionStorage.store('searchString', this.searchString);
    } else {
      console.log('search', this.searchString);
      this.sessionStorage.store('searchString', this.searchString);
      this.searchString = "";
    };
  }

  login() {
    this.router.navigate(['/login']);
  }
}