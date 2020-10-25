import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category-meta',
  templateUrl: './category-meta.component.html',
  styleUrls: ['./category-meta.component.scss'],
})
export class CategoryMetaComponent implements OnInit {

  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {}
  public close(): void {
    this._modalCtrl.dismiss();
  }
}
