import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TransactionType } from 'src/app/models/transactionType.enum';
import { ModalController } from '@ionic/angular';
import { TransactionService } from '../transaction.service';
import { Actions } from 'src/app/models/actions.enum';

@Component({
  selector: 'app-expense-settings',
  templateUrl: './expense-settings.component.html',
  styleUrls: ['./expense-settings.component.scss'],
})
export class ExpenseSettingsComponent implements OnInit {
  @Input() data: any;
  @Output() completeCreate = new EventEmitter<{ action: Actions, expense: any }>();

  public readonly typeActions = Actions;
  public action: Actions;
  public modalTitle: string;
  public form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _modalCtrl: ModalController,
    private _transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.form = this._buildExpenseForm()
    if(!!this.data) {
      this.action = Actions.EDIT;
      this._setFormValue(this.data);
    } else {
      this.action = Actions.NEW;
    }
  }

  private _buildExpenseForm(): FormGroup {
    return this._fb.group({
      transactionId: new FormControl(null),
      description: new FormControl(''),
      recurrent: new FormControl(false),
      transactionValue: new FormControl(null),
      categoryId: new FormControl(null),
      bankId: new FormControl(null),
      transactionDate: new FormControl(new Date()),
      transactionDueDate: new FormControl(new Date()),
      transactionType: new FormControl(TransactionType.EXPENSE),
    });
  }

  private _setFormValue(expense: any): void {
    this.form.patchValue({
      transactionId: expense.transaction_id,
      description: expense.description,
      recurrent: expense.recurrent,
      transactionValue: expense.transaction_value,
      categoryId: expense.category_id,
      bankId: expense.bank_id,
      transactionDate: expense.transaction_date,
      transactionDueDate: expense.transaction_due_date
    });
  }

  public _createExpense(formValue: any): void {
    this._transactionService.createExpense(formValue).subscribe(response => {
      this.completeCreate.emit(response);
      this._modalCtrl.dismiss({ action: Actions.EDIT, expense: formValue });
    })
  }

  private _editExpense(formValue: any): void {
    console.log(formValue);
    this._transactionService.editTransaction(formValue).subscribe(response => {
      this.completeCreate.emit(response);
      this._modalCtrl.dismiss({ action: Actions.EDIT, expense: formValue });
    });
  }

  public save(formValue: any): void {
    this.action === Actions.NEW
    ? this._createExpense(formValue)
    : this._editExpense(formValue);
  }

  public closeModal(): void {
    this._modalCtrl.dismiss();
  }

}
