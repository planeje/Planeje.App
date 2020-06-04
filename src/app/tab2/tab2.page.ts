import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalTabComponent } from '../usual/modal-tab/modal-tab.component';
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
        component: ModalTabComponent,
        componentProps: { transactionType: 'revenue', visibility: false, isBankAccount: false, isCategory: false, isTransaction:true }
      });
      modalTab1.present();
      console.log('Não tem que aparecer categoria');
    }

    async showModalExpense(){
      const modalTab1 =  await this.modalCtlr.create({
        component: ModalTabComponent,
        componentProps: { transactionType: 'expense', visibility: true, isBankAccount: false, isCategory: false, isTransaction:false }
      });
      modalTab1.present();
      console.log('Tem que aparecer categoria');
    }
}