import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CategoryService } from '../category.service';
import { finalize } from 'rxjs/operators';
import { Actions } from 'src/app/usual/models/actions.enum';

@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.scss'],
})
export class CategorySettingsComponent implements OnInit {
  @Input() data: any;

  public readonly actionsType = Actions;
  public form: FormGroup;
  public action: Actions;

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
      categoryId: new FormControl(null),
      categoryName: new FormControl('')
    });
  }

  private _setFormValues(category: any): void {
    this.form.patchValue({
      categoryId: category.category_id,
      categoryName: category.category_name
    });
  }

  private createCategory(category: any): void {
    this._categoryService.createCategory(category)
      .pipe(finalize(() => this.close()))
      .subscribe(response => {
        this._modalCtrl.dismiss({ action: Actions.NEW });
      });;
  }

  private _editCategory(category: any): void {
    this._categoryService.editCategory(category)
      .pipe(finalize(() => this.close()))
      .subscribe(response => {
        this._modalCtrl.dismiss({ action: Actions.EDIT });
      });
  }

  public close(): void {
    this._modalCtrl.dismiss();
  }

  public save(formValue: any) {
    this.action === Actions.EDIT
    ? this._editCategory(formValue)
    : this.createCategory(formValue);
  }

}
