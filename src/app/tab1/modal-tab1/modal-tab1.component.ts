import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-tab1',
  templateUrl: './modal-tab1.component.html',
  styleUrls: ['./modal-tab1.component.scss'],
})
export class ModalTab1Component implements OnInit {
  @Input() req: string;
  @Output() salvar = new EventEmitter<string>();

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}
  close() {
    this.modalCtrl.dismiss();
  }
  save(){
    this.salvar.emit(this.req)
  }
}
