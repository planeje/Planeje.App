import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalTab1Component } from './modal-tab1/modal-tab1.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private modalCtlr: ModalController
  ) {}

    async showModalRevenue(){
      const modalTab1 =  await this.modalCtlr.create({
        component: ModalTab1Component,
        componentProps: { transactionType: 'revenue', visibility: false }
      });
      modalTab1.present();
      console.log('Não tem que aparecer categoria');
    }

    async showModalExpense(){
      const modalTab1 =  await this.modalCtlr.create({
        component: ModalTab1Component,
        componentProps: { transactionType: 'expense', visibility: true }
      });
      console.log('Tem que aparecer categoria');
      modalTab1.present();
    }
}