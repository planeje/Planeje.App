import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CategoryService } from '../category.service';
import { finalize } from 'rxjs/operators';
import { Actions } from 'src/app/usual/models/actions.enum';
import { Category } from 'src/app/usual/models/category.model';

@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.scss'],
})
export class CategorySettingsComponent implements OnInit {
  @Input() data: Category;

  public readonly actionsType = Actions;
  public form: FormGroup;
  public action: Actions;
  public loading = false;

  constructor(
    private _modalCtrl: ModalController,
    private _fb: FormBuilder,
    public _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.form = this._buildForm();
    if(!!this.data) {
      this.action = Actions.EDIT
      this._setFormValues(this.data);
    } else {
      this.action = Actions.NEW
    }
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      id: new FormControl(null),
      name: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required)
    });
  }

  private _setFormValues(category: Category): void {
    this.form.patchValue({
      id: category.id,
      name: category.name,
      color: category.color
    });
  }

  private createCategory(category: Category): void {
    this._categoryService.createCategory(category)
      .pipe(finalize(() => {
        this.loading = false;
        this.form.enable();
        this.close();
      }))
      .subscribe(response => {
        this._modalCtrl.dismiss({ action: Actions.NEW });
      });
  }

  private _editCategory(category: any): void {
    this._categoryService.editCategory(category)
      .pipe(finalize(() => {
        this.loading = false;
        this.form.enable();
        this.close();
      }))
      .subscribe(response => {
        this._modalCtrl.dismiss({ action: Actions.EDIT });
      });
  }

  public close(): void {
    this._modalCtrl.dismiss();
  }

  public save(formValue: any) {
    this.loading = true;
    this.form.disable();
    this.action === Actions.EDIT
    ? this._editCategory(formValue)
    : this.createCategory(formValue);
  }

  public get nameCtrl(): AbstractControl {
    return this.form.get('name');
  }

  public get colorCtrl(): AbstractControl {
    return this.form.get('color');
  }
}
