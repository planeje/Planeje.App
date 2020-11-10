import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Activities } from '../usual/models/activities.model';
import { ActivitiesService } from './activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  details:boolean;
  public loading = true;
  public activities: Activities[];
  constructor(
    private _activitiesService: ActivitiesService
  ) {

   }

  ngOnInit() {
    this._getActivities();
    console.log(this.activities)
  }

  private _getActivities() {
    this._activitiesService.getActivities()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(response => {
        this.activities = response;
      });
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
