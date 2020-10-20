import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserAcountSettingsComponent } from './user-acount-settings/user-acount-settings.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {

  constructor(
    private modalCtlr: ModalController,
  ) {}

  ngOnInit() {
    
  }
  public async showModalUserSetting() {
    const expenseModal = await this.modalCtlr.create({
      component: UserAcountSettingsComponent
    });
    expenseModal.present();
  }
}