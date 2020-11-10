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
  public details:boolean;
  public loading = true;
  public activities: Activities[];

  constructor(
    private _activitiesService: ActivitiesService
  ) { }

  ngOnInit() {
    this._getActivities();
  }

  private _getActivities():void {
    this._activitiesService.getActivities()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(response => {
        this.activities = response;
      });
  }

  public show(): void {
    if(!this.details){
      this.details = true;
    }
    else {
      this.details = false;
    }
  }
}
