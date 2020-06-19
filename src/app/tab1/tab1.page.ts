import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalTabComponent } from '../usual/modal-tab/modal-tab.component';
import { CategoryService } from './category.service';
import { CategorySettingsComponent } from './category-settings/category-settings.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public loading = true;
  public categories: any[];

  constructor(
    private modalCtlr: ModalController,
    private _categoryService: CategoryService
  ) {}

  ngOnInit() {
    this._categoryService.getCategories().subscribe(response => {
      this.categories = response;
      this.loading = false;
    })
  }

  public async showModalCategory(category?: any) {
    const modalTab =  await this.modalCtlr.create({
      component: CategorySettingsComponent,
      componentProps: { data:  category }
    });
    modalTab.present();
  }

  public deleteCategory(id: number) {
    console.log(id);
    this._categoryService.deleteCategory(id).subscribe();
  }
}
