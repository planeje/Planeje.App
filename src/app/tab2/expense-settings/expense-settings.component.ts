import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TransactionService } from '../transaction.service';
import { CategoryService } from 'src/app/tab1/category.service';
import { BankAccountService } from 'src/app/tab3/bank-account.service';
import { Actions } from 'src/app/usual/models/actions.enum';
import { TransactionType } from 'src/app/usual/models/transactionType.enum';
import { Transaction } from 'src/app/usual/models/transaction.model';

@Component({
  selector: 'app-expense-settings',
  templateUrl: './expense-settings.component.html',
  styleUrls: ['./expense-settings.component.scss'],
})
export class ExpenseSettingsComponent implements OnInit {
  @Input() data: any;

  public readonly typeActions = Actions;
  public action: Actions;
  public form: FormGroup;
  public categories: any[];
  public bankAccounts: any[];

  constructor(
    private _fb: FormBuilder,
    private _modalCtrl: ModalController,
    private _transactionService: TransactionService,
    private _categoryService: CategoryService,
    private _banckAccountService: BankAccountService
  ) { }

  ngOnInit() {
    this.form = this._buildExpenseForm()
    this._categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });

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

  private _buildExpenseForm(): FormGroup {
    return this._fb.group({
      id: new FormControl(null),
      description: new FormControl('', Validators.required),
      recurrent: new FormControl(false, Validators.required),
      transactionValue: new FormControl(null, Validators.required),
      categoryId: new FormControl(null),
      accountId: new FormControl(null),
      transactionDate: new FormControl(new Date(), Validators.required),
      transactionDueDate: new FormControl(new Date(), Validators.required),
      transactionType: new FormControl(TransactionType.EXPENSE),
    });
  }

  private _setFormValue(expense: Transaction): void {
    this.form.patchValue({
      id: expense.id,
      description: expense.description,
      recurrent: expense.recurrent,
      transactionValue: expense.transactionValue,
      categoryId: expense.categoryId,
      accountId: expense.accountId,
      transactionDate: expense.transactionDate,
      transactionDueDate: expense.transactionDueDate
    });
  }

  public _createExpense(formValue: Transaction): void {
    this._transactionService.createTransaction(formValue).subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.EDIT, expense: formValue });
    })
  }

  private _editExpense(formValue: Transaction): void {
    console.log(formValue);
    this._transactionService.editTransaction(formValue).subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.EDIT});
    });
  }

  public save(formValue: Transaction): void {
    this.action === Actions.NEW
    ? this._createExpense(formValue)
    : this._editExpense(formValue);
  }

  public closeModal(): void {
    this._modalCtrl.dismiss();
  }

}
