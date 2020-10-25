import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivitiesPageRoutingModule } from './activities-routing.module';

import { ActivitiesPage } from './activities.page';
import { UsualModule } from '../usual/usual.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivitiesPageRoutingModule,
    UsualModule
  ],
  declarations: [ActivitiesPage]
})
export class ActivitiesPageModule {}
