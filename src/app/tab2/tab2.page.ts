import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionService } from './transaction.service';
import { ExpenseSettingsComponent } from './expense-settings/expense-settings.component';
import { RevenueSettingsComponent } from './revenue-settings/revenue-settings.component';
import { TransactionType } from '../usual/models/transactionType.enum';
import {  finalize } from 'rxjs/operators';
import { Transaction } from '../usual/models/transaction.model';
import { CategoryService } from '../tab1/category.service';
import { Category } from '../usual/models/category.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public loading = false;
  public transactions: Transaction[];
  public categories: Category[];

  //filtro
  public filterForm: FormGroup;
  public startDate = dayjs();
  public endDate = dayjs();
  
  



  constructor(
    private modalCtlr: ModalController,
    private _transactionService: TransactionService,
    private _categoryService: CategoryService,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {

    this.filterForm = this._buildFilterForm(this.startDate, this.endDate);
    this.filterForm.valueChanges.subscribe(response => {
      this._getTransactions(response)
    })
    this._getTransactions(this.filterForm.value);
    this._categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });
    
  }

  private _buildFilterForm(dataInicial: dayjs.Dayjs, dataFinal: dayjs.Dayjs){
    return this._fb.group({
      dataInicial: new FormControl(dataInicial),
      dataFinal: new FormControl(dataFinal),
      categoryId: new FormControl(null)
    })
  }

  private _getTransactions(data) {
    this._transactionService.getTransactions(data)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(response => {
        this.transactions = response;
        this.loading = false;
      });
  }

  public async showModalExpense(expense?: any) {
    const expenseModal = await this.modalCtlr.create({
      component: ExpenseSettingsComponent,
      componentProps: { data: expense },
    });
    expenseModal.present();
    const dataEmitted = (await expenseModal.onDidDismiss()).data;
    if (!!dataEmitted) {
      this.loading = true;
      this._getTransactions(this.filterForm.value);
    }
  }

  public async showModalRevenue(revenue?: any) {
    const revenueModal = await this.modalCtlr.create({
      component: RevenueSettingsComponent,
      componentProps: { data: revenue }
    });
    revenueModal.present();
    const dataEmitted = (await revenueModal.onDidDismiss()).data;
    if (!!dataEmitted) {
      this.loading = true;
      this._getTransactions(this.filterForm.value);
    }
  }

  public editTransaction(transaction: any) {
    transaction.transactionType === TransactionType.EXPENSE
      ? this.showModalExpense(transaction)
      : this.showModalRevenue(transaction);
  }


  public deleteTransaction(id: number): void {
    this._transactionService.deleteTransaction(id).subscribe(() => {
      const index = this.transactions.findIndex(el => el.id === id);
      this.transactions.splice(index, 1);
    });
  }
  public get dataInicialCtrl(): AbstractControl{
    return this.filterForm.get('dataInicial');
  }  
  public get dataFinalCtrl(): AbstractControl{
    return this.filterForm.get('dataFinal');
  }
}
