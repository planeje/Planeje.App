import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Actions } from 'src/app/models/actions.enum';
import { ModalController } from '@ionic/angular';
import { BankAccountService } from '../bank-account.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-bank-account-settings',
  templateUrl: './bank-account-settings.component.html',
  styleUrls: ['./bank-account-settings.component.scss'],
})
export class BankAccountSettingsComponent implements OnInit {
  @Input() data: any;

  public readonly actionsType = Actions;
  public form: FormGroup;
  public action: Actions;

  constructor(
    private _modalCtrl: ModalController,
    private _fb: FormBuilder,
    private _bankAccountService: BankAccountService
  ) { }

  ngOnInit() {
    this.form = this._buildForm();
    if(!!this.data) {
      this.action = Actions.EDIT;
      this._setFormValue(this.data);
    } else {
      this.action = Actions.NEW;
    }
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      accountId: new FormControl(null),
      accountName: new FormControl(''),
      balance: new FormControl(null)
    });
  }

  private _setFormValue(bankAccount: any): void {
    this.form.patchValue({
      accountId: bankAccount.account_id,
      accountName: bankAccount.account_name,
      balance: bankAccount.balance
    });
  }

  private _createAccount(bankAccount: any): void {
    this._bankAccountService.createBankAccount(bankAccount).subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.NEW });
    })
  }

  private _editAccount(bankAccount: any): void {
    this._bankAccountService.editBankAccount(bankAccount).subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.EDIT });
    })
  }

  public save(formValue: any): void {
    this.action === Actions.EDIT
    ? this._editAccount(formValue)
    : this._createAccount(formValue);
  }

  public close(): void {
    this._modalCtrl.dismiss();
  }

}
