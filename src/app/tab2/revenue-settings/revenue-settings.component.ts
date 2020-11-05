import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TransactionService } from '../transaction.service';
import { BankAccountService } from 'src/app/tab3/bank-account.service';
import { Actions } from 'src/app/usual/models/actions.enum';
import { TransactionType } from 'src/app/usual/models/transactionType.enum';
import { Transaction } from 'src/app/usual/models/transaction.model';

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
  public categories: any[];
  public bankAccounts: any[];

  constructor(
    private _modalCtrl: ModalController,
    private _fb: FormBuilder,
    private _transactionService: TransactionService,
    private _banckAccountService: BankAccountService
  ) { }

  ngOnInit() {
    this.form = this._buildRevenueForm()
    this._banckAccountService.getBankAccounts().subscribe(response => {
      this.bankAccounts = response;
    });

    if(!!this.data) {
      this.action = Actions.EDIT;
      this._setFormValue(this.data);
    } else {
      this.action = Actions.NEW;
    }
  }

  private _buildRevenueForm(): FormGroup {
    return this._fb.group({
      id: new FormControl(null, Validators.required),
      description: new FormControl('', Validators.required),
      recurrent: new FormControl(false, Validators.required),
      transactionValue: new FormControl(null, Validators.required),
      bankId: new FormControl(null),
      transactionDate: new FormControl(new Date(), Validators.required),
      transactionDueDate: new FormControl(new Date().toJSON(), Validators.required),
      transactionType: new FormControl(TransactionType.REVENUE, Validators.required),
    });
  }

  private _setFormValue(revenue: Transaction): void {
    this.form.patchValue({
      id: revenue.id,
      description: revenue.description,
      recurrent: revenue.recurrent,
      transactionValue: revenue.transactionValue,
      accountId: revenue.accountId,
      transactionDate: revenue.transactionDate,
      transactionDueDate: revenue.transactionDueDate
    });
  }


  public _createRevenue(formValue: any): void {
    this._transactionService.createTransaction(formValue).subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.EDIT});
    })
  }
  private _editRevenue(formValue: any): void {
    console.log(formValue);
    this._transactionService.editTransaction(formValue).subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.EDIT});
    });
  }

  public save(formValue: any): void {
    this.action === Actions.NEW
    ? this._createRevenue(formValue)
    : this._editRevenue(formValue);
  }

  public closeModal(): void {
    this._modalCtrl.dismiss();
  }

  public get descriptionCtrl(): AbstractControl {
    return this.form.get('description');
  }  
  public get transactionValueCtrl(): AbstractControl {
    return this.form.get('transactionValue');
  }  
  public get accountIdCtrl(): AbstractControl {
    return this.form.get('accountId');
  }  
  public get transactionDueDateCtrl(): AbstractControl {
    return this.form.get('transactionDueDate');
  }
}
