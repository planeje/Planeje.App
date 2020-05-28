import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalTab1Component } from './modal-tab1/modal-tab1.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private modalCtlr: ModalController
  ) {}
  
    async showModalTab1(){
      const modalTab1 =  await this.modalCtlr.create({
        component: ModalTab1Component,
        // data: {'revenue': 'revenue'}
      });
      modalTab1.present();
    }
}
