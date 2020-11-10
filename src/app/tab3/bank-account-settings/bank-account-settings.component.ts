import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Actions } from 'src/app/usual/models/actions.enum';
import { BankAccount } from 'src/app/usual/models/bank-account.model';
import { BankAccountService } from '../bank-account.service';

@Component({
  selector: 'app-bank-account-settings',
  templateUrl: './bank-account-settings.component.html',
  styleUrls: ['./bank-account-settings.component.scss'],
})
export class BankAccountSettingsComponent implements OnInit {
  @Input() data: BankAccount;

  public readonly actionsType = Actions;
  public form: FormGroup;
  public action: Actions;
  public loading = false;

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
      id: new FormControl(null),
      accountName: new FormControl('', Validators.required),
      balance: new FormControl(null, Validators.required)
    });
  }

  private _setFormValue(bankAccount: BankAccount): void {
    this.form.patchValue({
      id: bankAccount.id,
      accountName: bankAccount.accountName,
      balance: bankAccount.balance
    });
  }

  private _createAccount(bankAccount: BankAccount): void {
    this._bankAccountService.createBankAccount(bankAccount)
    .pipe(
      finalize(() => {
        this.loading = false;
        this.form.enable();
      })
    )
    .subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.NEW });
    })
  }

  private _editAccount(bankAccount: BankAccount): void {
    this._bankAccountService.editBankAccount(bankAccount)
    .pipe(
      finalize(() => {
        this.loading = false;
        this.form.enable();
      })
    )
    .subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.EDIT });
    })
  }

  public save(formValue: any): void {
    this.loading = true;
    this.form.disable();
    this.action === Actions.EDIT
    ? this._editAccount(formValue)
    : this._createAccount(formValue);
  }

  public close(): void {
    this._modalCtrl.dismiss();
  }

  public get accountNameCtrl(): AbstractControl {
    return this.form.get('accountName');
  }

  public get balanceCtrl(): AbstractControl {
    return this.form.get('balance');
  }
}
