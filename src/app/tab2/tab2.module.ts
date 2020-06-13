import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ExpenseSettingsComponent } from './expense-settings/expense-settings.component';
import { RevenueSettingsComponent } from './revenue-settings/revenue-settings.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    HttpClientModule
  ],
  declarations: [Tab2Page,
    ExpenseSettingsComponent,
    RevenueSettingsComponent
  ]
})
export class Tab2PageModule {}
