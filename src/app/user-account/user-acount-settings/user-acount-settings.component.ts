import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-acount-settings',
  templateUrl: './user-acount-settings.component.html',
  styleUrls: ['./user-acount-settings.component.scss'],
})
export class UserAcountSettingsComponent implements OnInit {

  constructor(private _modalCtrl: ModalController) { }

  ngOnInit() {}
  public closeModal(): void {
    this._modalCtrl.dismiss();
  }
}
