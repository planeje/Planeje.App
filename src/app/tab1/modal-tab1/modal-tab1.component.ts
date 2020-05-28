import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-tab1',
  templateUrl: './modal-tab1.component.html',
  styleUrls: ['./modal-tab1.component.scss'],
})
export class ModalTab1Component implements OnInit {
  @Input() transactionType: string;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('tipo da modal ->', this.transactionType);
  }
  close() {
    this.modalCtrl.dismiss();
  }
  save(){
    if(this.transactionType === 'revenue') {
      console.log('criar receita');
    } else {
      console.log('crair despesa');
    }
  }
}
