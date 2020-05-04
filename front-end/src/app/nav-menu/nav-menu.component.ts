import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      
  }

  navMenuAni():void {
    var menuBtn = document.getElementById('menu-btn-link');
    if (menuBtn.className === "nav-bar__menu-btn") {
      menuBtn.className += " active";
    } else {
      menuBtn.className = "nav-bar__menu-btn";
    }

    var menuNav = document.getElementById('menu-nav');
    if (menuNav.className === "menu-block__menu-nav") {
      menuNav.className += " active";
    } else {
      menuNav.className = "menu-block__menu-nav";
    }
  }

}
