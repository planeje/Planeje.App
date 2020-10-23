import { NgModule } from '@angular/core';
import { ModalTabComponent } from './modal-tab/modal-tab.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { CategoryGraphComponent } from './category-graph/category-graph.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [ModalTabComponent, MenuComponent, CategoryGraphComponent],
  imports: [
    RouterModule,CommonModule,ChartsModule
  ],
  exports: [MenuComponent, CategoryGraphComponent]
})
export class UsualModule { }
