import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.scss']
})
export class UserStatisticComponent implements OnInit {

  familyName: String = "The Simplsons";
  numOfMembers = 2
  points = 15

  obj = {
    "user_id": 6664,
    "family": {
        "name": "The Gods",
        "size": 2
    },
    "statistic": {
        "tasks": {
            "accomplised": 21,
            "selected": 24
        },
        "prizes": {            
            "accomplised": 3,
            "amount": 4
        },
        "points": 0,
        "activity": [
            {
                "day": [],
                "accomplished_prizes": []
            },
            {
                "day": [],
                "done_tasks": []
            },
            {
                "day": [],
                "selected_tasks": []
            }
        ]
    } 
}

  constructor() { }

  ngOnInit(): void {
  }



}
