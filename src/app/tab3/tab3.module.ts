import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module'
import { HttpClientModule } from '@angular/common/http';
import { BankAccountSettingsComponent } from './bank-account-settings/bank-account-settings.component';
import { UsualModule } from '../usual/usual.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    UsualModule
  ],
  declarations: [
    Tab3Page,
    BankAccountSettingsComponent
  ]
})
export class Tab3PageModule {}
