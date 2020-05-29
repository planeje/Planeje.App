import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-modal-tab1',
  templateUrl: './modal-tab1.component.html',
  styleUrls: ['./modal-tab1.component.scss'],
})
export class ModalTab1Component implements OnInit {
  @Input() transactionType: string;
  @Input() visibility: boolean;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    console.log('tipo da modal ->', this.transactionType);
    console.log('Deu ->', this.visibility);
  }
  close() {
    this.modalCtrl.dismiss();
  }
  save(){
    if(this.transactionType === 'revenue') {
      console.log('criar receita');
    } else {
      console.log('criar despesa');
    }
    this.close();
  }
  
}
