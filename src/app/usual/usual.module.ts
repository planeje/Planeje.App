import { ModuleWithProviders, NgModule } from '@angular/core';
import { ModalTabComponent } from './modal-tab/modal-tab.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './interceptors';



@NgModule({
  declarations: [ModalTabComponent, MenuComponent],
  imports: [
    RouterModule
  ],
  exports: [MenuComponent],
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
