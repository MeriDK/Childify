import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrls: ['./family-page.component.scss']
})
export class FamilyPageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  private readonly baseUrl = 'http://127.0.0.1:8000';

  data : Observable<any>;

  rec : any;

  ngOnInit(): void {
  }

  getData(): Observable<any> {
    console.log('SHIT');
    let resp = this.http.get('http://127.0.0.1:8000/childify/');
    //console.log(resp[0].name);
    this.data = resp;
    return this.http.jsonp('${this.baseUrl}/childify', 'callback');
  }
}
