import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAccountPageRoutingModule } from './user-account-routing.module';

import { UserAccountPage } from './user-account.page';
import { UsualModule } from '../usual/usual.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAccountPageRoutingModule,
    UsualModule
  ],
  declarations: [UserAccountPage]
})
export class UserAccountPageModule {}
