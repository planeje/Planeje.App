import { ErrorEnum, IRequestError } from './../usual/models/request-error.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ForgotPasswordService } from './forgotPassword.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public form: FormGroup;
  public loading = false;

  constructor(
    private _fb: FormBuilder,
    private _forgotPasswrodService: ForgotPasswordService,
    private _router: Router,
    private _toastController: ToastController
    ) { }

  ngOnInit() {
    this.form = this._buildForm();
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public sendToken(formValue: any): void {
    this.loading = true;
    this.form.disable();
    this._forgotPasswrodService.sendEmailToken(formValue)
    .pipe(
      finalize(() => {
        this.loading = false;
        this.form.enable();
      })
    )
    .subscribe(() => {
      this._router.navigate(['token']);
    }, async (err: IRequestError) => {
      const toastMessage = err.error.error === ErrorEnum.USER_NOT_FOUND
      ? 'Usuário não encontrado. Verifique se o email foi digitado corretamente.'
      : 'Ocorreu um erro. Tente novamente mais tarde.'

      const toast = await this._toastController.create({
        message: toastMessage,
        duration: 3000
      });
      toast.present();
    });
  }

  public back(): void {
    history.back();
  }

  public get emailCtrl(): AbstractControl {
    return this.form.get('email');
  }
}
