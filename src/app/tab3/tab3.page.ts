import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalTabComponent } from '../usual/modal-tab/modal-tab.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private modalCtlr: ModalController
  ) {}

    async showModalBankAccount(){
      const modalTab =  await this.modalCtlr.create({
        component: ModalTabComponent,
        componentProps: { transactionType: 'bankAccount', visibility: false, isBankAccount:true, isTransaction:false }
      });
      modalTab.present();
      console.log('Conta Bancária');
    }
  }