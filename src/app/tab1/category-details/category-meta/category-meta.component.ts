import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { Actions } from 'src/app/usual/models/actions.enum';
import { SpendingGoal } from 'src/app/usual/models/spending-goal.model';
import { SpendingGoalService } from '../spending-goal.service';

@Component({
  selector: 'app-category-meta',
  templateUrl: './category-meta.component.html',
  styleUrls: ['./category-meta.component.scss'],
})
export class CategoryMetaComponent implements OnInit {
  @Input() data: SpendingGoal;
  @Input() categoryId: number;

  public form: FormGroup;
  public action: Actions;
  public actionsType = Actions;
  public currentDate = dayjs().startOf('day').add(1, 'day').toISOString();
  constructor(
    private _modalCtrl: ModalController,
    private _fb: FormBuilder,
    private _spendingGoalService: SpendingGoalService
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
      description: new FormControl('', Validators.required),
      goalDueDate: new FormControl('', Validators.required),
      value: new FormControl(null, Validators.required)
    });
  }

  private _setFormValue(data: SpendingGoal): void {
    this.form.patchValue({
      id: data.id,
      description: data.description,
      goalDueDate: data.goalDueDate,
      value: data.value
    });
  }

  private _editGoal(data: SpendingGoal): void {
    this._spendingGoalService.editGoal(data, this.categoryId).subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.EDIT });
    });
  }

  private _createGoal(data: SpendingGoal): void {
    this._spendingGoalService.createGoal(data, this.categoryId).subscribe(response => {
      this._modalCtrl.dismiss({ action: Actions.EDIT });
    });
  }

  public onSave(formValue: SpendingGoal): void {
    this.action === this.actionsType.EDIT
    ? this._editGoal(formValue)
    : this._createGoal(formValue)
  }

  public close(): void {
    this._modalCtrl.dismiss();
  }

  public get descriptionCtrl(): AbstractControl {
    return this.form.get('description');
  }
  public get valueCtrl(): AbstractControl {
    return this.form.get('value');
  }

  public get goalDueDateCtrl(): AbstractControl {
    return this.form.get('goalDueDate');
  }
}
