import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalTabComponent } from '../usual/modal-tab/modal-tab.component';
import { CategoryService } from './category.service';
import { CategorySettingsComponent } from './category-settings/category-settings.component';
import { Actions } from '../models/actions.enum';
import { finalize } from 'rxjs/operators';
import { CategoryDetailsComponent } from './category-details/category-details.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  
})
export class Tab1Page implements OnInit {
  public loading = false;
  public categories =  [
    {
      "category_id": 1,
      "category_name": 'Lazer',
      "color": 'blue'
    },    {
      "category_id": 2,
      "category_name": 'Casa',
      "color": 'red'
    },    {
      "category_id": 3,
      "category_name": 'Despesas fixas',
      "color": 'green'
    }
  ];

  constructor(
    private modalCtlr: ModalController,
    private _categoryService: CategoryService
  ) {}

  ngOnInit() {
    // this._getCategories();
  }

  // private _getCategories() {
  //   this._categoryService.getCategories()
  //   .pipe(finalize(() => (this.loading = false)))
  //   .subscribe(response => {
  //     this.categories = response;
  //   });
  // }

  public async showModalCategory(category?: any) {
    const categorySettingsModal =  await this.modalCtlr.create({
      component: CategorySettingsComponent,
      componentProps: { data:  category }
    });
    categorySettingsModal.present();
    const dataEmitted = (await categorySettingsModal.onDidDismiss()).data;
    if (!!dataEmitted) {
      this.loading = true
      // this._getCategories();
    }
  }

  public deleteCategory(id: number) {
    this._categoryService.deleteCategory(id).subscribe(() => {
      const index = this.categories.findIndex(el => el.category_id === id);
      this.categories.splice(index, 1);
    });
  }

  public async showModalMeta(){
    const categoryMeta = await this.modalCtlr.create({
      component: CategoryDetailsComponent,
    })
    categoryMeta.present();
  }
}
