import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAccountPageRoutingModule } from './user-account-routing.module';

import { UserAccountPage } from './user-account.page';
import { UsualModule } from '../usual/usual.module';
import { UserAccountSettingsComponent } from './user-account-settings/user-account-settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAccountPageRoutingModule,
    UsualModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserAccountPage,
    UserAccountSettingsComponent
  ]
})
export class UserAccountPageModule {}
