import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  details:boolean;
  constructor() {

   }

  ngOnInit() {

  }
  
  public show(){
    if(!this.details){
      this.details = true;
    }
    else {
      this.details = false;
    }
  }
}
