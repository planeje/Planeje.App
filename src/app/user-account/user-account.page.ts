import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { finalize, take } from 'rxjs/operators';
import { User } from '../usual/models/user.model';
import { UserAccountSettingsComponent } from './user-account-settings/user-account-settings.component';
import { UserAccountService } from './user-account.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {
  public user: User;
  public isEditingPassword = false;
  public editPasswordForm: FormGroup;
  public loadingChangePassword = false;

  constructor(
    private _modalCtlr: ModalController,
    private _userAccountService: UserAccountService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this._userAccountService.getUserInfo()
      .pipe(take(1))
      .subscribe(response => {
        this.user = response;
      }, err => {
        console.log(err);
      });

    this.editPasswordForm = this._buildEditPasswordForm();
  }

  private _buildEditPasswordForm(): FormGroup {
    return this._fb.group({
      password: new FormControl('', Validators.required)
    });
  }

  public togglePasswordEdit(): void {
    this.isEditingPassword = !this.isEditingPassword;
  }

  public savePassword(formValue: { password: string }): void {
    this.loadingChangePassword = true;
    this.passwordCtrl.disable();
    // this._userAccountService.changePassword(this.user.id, formValue)
    // .pipe(
    //   finalize(() => {
    //     this.loadingChangePassword = false;
    //     this.passwordCtrl.reset();
    //   })
    // )
    // .subscribe(() => {
    //   this.isEditingPassword = false;
    // }, err => {
    //   console.log('err,', err);
    // });
  }

  public async showModalUserSetting(user: User): Promise<void> {
    const userAccountModal = await this._modalCtlr.create({
      component: UserAccountSettingsComponent,
      componentProps: { data: user }
    });
    userAccountModal.present();
    const dataEmitted = (await userAccountModal.onDidDismiss()).data;
    if (!!dataEmitted) {
      this.user.name = dataEmitted.data.name;
    }
  }

  public get passwordCtrl(): AbstractControl {
    return this.editPasswordForm.get('password');
  }
}
