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
    if (menuBtn.className === "menu-btn") {
      menuBtn.className += " active";
    } else {
      menuBtn.className = "menu-btn";
    }

    var menuNav = document.getElementById('menu-nav');
    if (menuNav.className === "menu-nav") {
      menuNav.className += " active";
      // setTimeout(() => {
      //   menuNav.className += " show";
      // }, 1)

    } else {
      menuNav.className = "menu-nav";
    }
  }

}
