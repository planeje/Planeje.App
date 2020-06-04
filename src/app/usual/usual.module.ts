import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalTabComponent } from './modal-tab/modal-tab.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [ModalTabComponent],
  imports: [
    CommonModule, UsualModule, BrowserModule
  ]
})
export class UsualModule { }
