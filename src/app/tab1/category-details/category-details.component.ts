import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { SpendingGoal } from 'src/app/usual/models/spending-goal.model';
import { CategoryMetaComponent } from './category-meta/category-meta.component';
import { SpendingGoalService } from './spending-goal.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  @Input() categoryId: number;

  public detailGoalId: number;
  public goals: SpendingGoal[];
  public loading = true;

  constructor(
    private _modalCtrl: ModalController,
    private _spendingGoalService: SpendingGoalService
  ) { }

  ngOnInit() {
    this._getGoals();
  }

  private _getGoals(): void {
    this._spendingGoalService.getGoals(this.categoryId)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(response => {
        this.goals = response;
      });
  }

  public close(): void {
    this._modalCtrl.dismiss();
  }
  public showDetails(goalId: number): void {
    this.detailGoalId === goalId
    ? this.detailGoalId = null
    : this.detailGoalId = goalId;
  }

  public isOpen(goalId): boolean {
    return this.detailGoalId === goalId
    ? true
    : false;
  }

  public async showModalMeta(goal: SpendingGoal) {
    const categoryMetaModal =  await this._modalCtrl.create({
      component: CategoryMetaComponent,
      componentProps: { data: goal, categoryId: this.categoryId }
    });
    categoryMetaModal.present();
    const dataEmitted = (await categoryMetaModal.onDidDismiss()).data;
    if (!!dataEmitted) {
      this.loading = true
      this._getGoals();
    }
    // this.close()
  }
}
