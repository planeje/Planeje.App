import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Cipher } from 'crypto';


@Component({
  selector: 'app-modal-tab',
  templateUrl: './modal-tab.component.html',
  styleUrls: ['./modal-tab.component.scss'],
})
export class ModalTabComponent implements OnInit {
  @Input() transactionType: string;
  @Input() isTransaction: boolean;
  @Input() visibility: boolean;
  // @Input() isExpense: boolean;
  @Input() isBankAccount: boolean;
  @Input() isCategory: boolean;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    console.log('tipo da modal ->', this.transactionType);
    console.log('Visibilidade ->', this.visibility);
    console.log('É conta bancária ->', this.isBankAccount);
    console.log('É categoria ->', this.isCategory);
    console.log('É transação ->', this.isTransaction);
  }
  close() {
    this.modalCtrl.dismiss();
  }
  save(){
    if(this.transactionType === 'revenue') {
      console.log('criar receita');
    } else if (this.transactionType === 'expense') {
      console.log('criar despesa');
    }
     else if (this.transactionType === 'bankAccount') {
      console.log('criar conta bancária');
    }
     else if (this.transactionType === 'category') {
      console.log('criar categoria');
    }
    this.close();
  }
  
}
