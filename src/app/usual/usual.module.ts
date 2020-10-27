import { ModuleWithProviders, NgModule } from '@angular/core';
import { ModalTabComponent } from './modal-tab/modal-tab.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './interceptors';
import { CommonModule } from '@angular/common';
import { CategoryGraphComponent } from './category-graph/category-graph.component';
import { ChartsModule } from 'ng2-charts';
import { DateFilter } from './pipes/date-filter.pipe';



@NgModule({
  declarations: [
    ModalTabComponent,
    MenuComponent,
    CategoryGraphComponent,
    DateFilter
  ],
  imports: [
    RouterModule,
    CommonModule,
    ChartsModule
  ],
  exports: [
    MenuComponent,
    CategoryGraphComponent,
    DateFilter
  ],
  providers: [httpInterceptorProviders]
})
export class UsualModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UsualModule,
      providers: [httpInterceptorProviders]
    };
  }
}
