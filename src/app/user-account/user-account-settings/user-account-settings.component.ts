import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-user-account-settings',
  templateUrl: './user-account-settings.component.html',
  styleUrls: ['./user-account-settings.component.scss'],
})
export class UserAccountSettingsComponent implements OnInit {
  @Input() data: User;
  public form: FormGroup;
  public changed = false;
  constructor(
    private _modalCtrl: ModalController,
    private _fb: FormBuilder,
    private _userAccountService: UserAccountService
  ) { }

  ngOnInit() {
    this.form = this._buildForm(this.data);
    this.form.valueChanges.pipe(take(1))
      .subscribe(() => (this.changed = true));
  }

  private _buildForm(data: User): FormGroup {
    return this._fb.group({
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      name: new FormControl(data.name, Validators.required)
    })
  }

  public save(formValue: User): void {
    this._userAccountService.updateUserInfo(this.data.id, formValue)
      .subscribe(response => {
        this._modalCtrl.dismiss({ data: response });
      }, err => {
        console.log('err', err);
      });
  }

  public closeModal(): void {
    this._modalCtrl.dismiss();
  }

  public get nameCtrl(): AbstractControl {
    return this.form.get('name');
  }

}
