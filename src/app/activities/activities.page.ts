import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  details:boolean
  constructor() {

   }

  ngOnInit() {

  }
  public  showDetails(): void {
    this.details = true
    console.log('era pra aparecer')
  }  public  closeDetails(): void {
    this.details = false
    console.log('era pra fechar')
  }
}
