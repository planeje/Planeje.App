import { NgModule } from '@angular/core';
import { ModalTabComponent } from './modal-tab/modal-tab.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ModalTabComponent, MenuComponent],
  imports: [
    RouterModule
  ],
  exports: [MenuComponent]
})
export class UsualModule { }
