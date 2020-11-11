import { ErrorEnum, IRequestError } from './../usual/models/request-error.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ForgotPasswordService } from '../forgot-password/forgotPassword.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {
  public form: FormGroup;
  public loading = false;

  constructor(
    private _fb: FormBuilder,
    private _forgotPasswordService: ForgotPasswordService,
    private _router: Router,
    private _toastController: ToastController
  ) { }

  ngOnInit() {
    this.form = this._buildForm();
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      token: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public resetPassword(formValue: { email: string, token: string, password: string }): void{
    this.loading = true;
    this.form.disable();
    this._forgotPasswordService.resetPassword(formValue)
    .pipe(
      finalize(() => {
        this.loading = false;
        this.form.enable();
      })
    )
    .subscribe(() => {
      this._router.navigate(['login']);
    }, async (err: IRequestError) => {
      let toastMessage: string
      if(err.error.error === ErrorEnum.USER_NOT_FOUND)
        toastMessage = 'Usuário não encontrado. Verifique se o email foi digitado corretamente.';

      if(err.error.error === ErrorEnum.TOKEN_INVALID)
        toastMessage = 'Token inválido';

      if(err.error.error === ErrorEnum.TOKEN_EXPIRED)
        toastMessage = 'O token digitado expirou. Gere um novo token.';

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

  public get tokenCtrl(): AbstractControl {
    return this.form.get('token');
  }

  public get passwordCtrl(): AbstractControl {
    return this.form.get('password');
  }
}
