import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalTabComponent } from '../usual/modal-tab/modal-tab.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private modalCtlr: ModalController
  ) {}

    async showModalCategory(){
      const modalTab =  await this.modalCtlr.create({
        component: ModalTabComponent,
        componentProps: { transactionType: 'category', visibility: false, isBankAccount:false,isCategory: true, isTransaction:false }
      });
      modalTab.present();
      console.log('Categoria');
    }
  }
