import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CategorySettingsComponent } from './category-settings/category-settings.component';
import { HttpClientModule } from '@angular/common/http';
import { UsualModule } from '../usual/usual.module';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryMetaComponent } from './category-details/category-meta/category-meta.component';
import { ColorChromeModule } from 'ngx-color/chrome';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    UsualModule,
    ColorChromeModule
  ],
  declarations: [
    Tab1Page,
    CategorySettingsComponent,
    CategoryDetailsComponent,
    CategoryMetaComponent,
  ]
})
export class Tab1PageModule {}
