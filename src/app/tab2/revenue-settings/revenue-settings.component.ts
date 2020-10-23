import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TransactionService } from '../transaction.service';
import { BankAccountService } from 'src/app/tab3/bank-account.service';
import { Actions } from 'src/app/usual/models/actions.enum';
import { TransactionType } from 'src/app/usual/models/transactionType.enum';

@Component({
  selector: 'app-revenue-settings',
  templateUrl: './revenue-settings.component.html',
  styleUrls: ['./revenue-settings.component.scss'],
})
export class RevenueSettingsComponent implements OnInit {
  @Input() data: any;
  @Output() complete = new EventEmitter<{ action: Actions, expense: any }>();

  public readonly typeActions = Actions;
  public action: Actions;
  public form: FormGroup;
  public bankAccounts: any[];

  constructor(
    private _modalCtrl: ModalController,
    private _fb: FormBuilder,
    private _transactionService: TransactionService,
    private _banckAccountService: BankAccountService
  ) { }

  ngOnInit() {
    this.form = this._buildForm()
    this._banckAccountService.getBankAccounts().subscribe(response => {
      // this.bankAccounts = response;
    });

    if(!!this.data) {
      this.action = Actions.EDIT;
      this._setFormValue(this.data);
    } else {
      this.action = Actions.NEW;
    }
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      transactionId: new FormControl(null),
      description: new FormControl(''),
      recurrent: new FormControl(false),
      transactionValue: new FormControl(null),
      bankId: new FormControl(null),
      transactionDate: new FormControl(new Date()),
      transactionDueDate: new FormControl(new Date().toJSON()),
      transactionType: new FormControl(TransactionType.REVENUE),
    });
  }

  private _setFormValue(revenue: any) {
    this.form.patchValue({
      ransactionId: revenue.transaction_id,
      description: revenue.description,
      recurrent: revenue.recurrent,
      transactionValue: revenue.transaction_value,
      bankId: revenue.bank_id,
      transactionDate: revenue.transaction_date,
      transactionDueDate: revenue.transaction_due_date
    });
  }

  public save(formValue: any) {
    this._transactionService.createExpense(formValue).subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.EDIT, expense: formValue });
    })
  }

  public closeModal(){
    this._modalCtrl.dismiss();
  }

  public get transactionDueDateCtrl(): AbstractControl {
    return this.form.get('transactionDueDate');
  }

}
