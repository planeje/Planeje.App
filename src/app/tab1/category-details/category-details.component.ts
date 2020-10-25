import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryMetaComponent } from './category-meta/category-meta.component';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  details:boolean;

  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {}

  public close(): void {
    this._modalCtrl.dismiss();
  }
  public show(): void{
    if(!this.details){
      this.details = true;
    }
    else {
      this.details = false;
    }
  }
  public async showModalMeta(){
    const categoryMetaModal =  await this._modalCtrl.create({
      component: CategoryMetaComponent}
    );
    categoryMetaModal.present();
    this.close()
}
}
