import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode';
import config from  '../../../../package.json';
import { Event } from '../family-recent-item/family-recent-item.component';

@Component({
  selector: 'app-family-recent-events',
  templateUrl: './family-recent-events.component.html',
  styleUrls: ['./family-recent-events.component.scss']
})
export class FamilyRecentEventsComponent implements OnInit {

  constructor(private http: HttpClient,
    private tokenService: TokenService) { }

    private user = jwt_decode(this.tokenService.getAccess())

    httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json',
    'Authorization':'Bearer '+ this.tokenService.getAccess()})}}

    events: Event[];


  ngOnInit(): void {
    this.getEvents().then((val) => {
      console.log(val);

      this.events = this.parseEvent(val);
    }, (err) => {

    });
  }

  getEvents(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.get(config['baseURL'] + '/user/' + this.user.user_id + '/family/statistic', this.httpHeaders()).subscribe(value => {
        resolve(value['events']);
      }, error => {

        console.log(error.status);
        if(error.status == 401){
          this.tokenService.refreshTokenSubs().then((val) => {
            console.log('Rafreshed');
            this.ngOnInit();   
          });
        }
        
        console.log("There is a prob with network");
        reject();
      });
    });
    return promise;
  }

  parseEvent(val): Event[] {
    var events: Event[];

    val.forEach(el => {
      console.log('---------------------' + this.chooseImg(el['executor']['numIcon']));
      
      if (events) {
        events.push({
          title: el['title'], 
          status: this.parseCategory(el['status']), 
          points: el['points'], 
          time: new Date(el['time']).getHours() + ':' + new Date(el['time']).getMinutes(), 
          categoryImg: el['category'], 
          imgUrl: this.chooseImg(el['executor']['numIcon'])});
      } else {
        events = [{
          title: el['title'], 
          status: this.parseCategory(el['status']), 
          points: el['points'], 
          time: new Date(el['time']).getHours() + ':' + new Date(el['time']).getMinutes(), 
          categoryImg: el['category'], 
          imgUrl: this.chooseImg(el['executor']['numIcon'])
        }]
      }
    });

    return events;
  }
  
  chooseImg(num): string {
    return '../../assets/svg/' + num + '.svg';
  }

  parseCategory(num): string {
    switch(num) {
      case 1:
        return 'Take to do';
      case 2:
        return 'In progress';
      case 3:
        return 'Cheked';
      case 4:
        return 'Done';
    }

    return 'Undefined';
  }

}
