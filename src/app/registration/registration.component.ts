import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import anime from 'node_modules/animejs'
import $ from 'node_modules/jquery'
import  RegistrationService  from './registrationService'
import { ApiService } from '../api.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [ApiService]
})
export class RegistrationComponent implements OnInit {

  @ViewChild("registrationBody",{read: ViewContainerRef}) registrationBody
  data : any;

  constructor(private componentFactoryResolver : ComponentFactoryResolver, private api: ApiService) {
    this.data = {username: '', email: '', password: '', confirmPassword: '', isParent: false}
  }

  ngOnInit(): void {
    this.initAnime()
    this.initEventListener()
  }

  initEventListener(): void {
    $(".msg--registration").on( 'click' , () => { RegistrationService.forwardToSignIn() })
  }

  initAnime(): void {
    anime({
      targets: '.svg_path--logo',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1200,
      fill: '#a082a8',
      delay: function(el, i) { return i * 250 },
      direction: 'alternate',
      loop: true
    });
  }

  registerNewUser(): void {
    RegistrationService.registerNewUser(this.api, this.data, this.registrationBody, this.componentFactoryResolver)
  }
}
