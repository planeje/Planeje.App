import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ErrorEnum, IRequestError } from '../usual/models/request-error.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup
  public loading = false;

  constructor(
    private _loginService: LoginService,
    private _fb: FormBuilder,
    private _router: Router,
    private _toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this._buildForm();
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  public loginUser(formValue: { email: string, password: string }): void {
    this.loading = true
    this.loginForm.disable();
    this._loginService.authenticate(formValue.email, formValue.password)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.loginForm.enable();
        })
      )
      .subscribe(() => {
        this._router.navigate(['tabs/tab2']);
      }, async (err: IRequestError) => {
        let toastMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
        if(err.error.error === ErrorEnum.USER_NOT_FOUND)
          toastMessage = 'Usuário não encontrado. Verifique se o email foi digitado corretamente.';

        if(err.error.error === ErrorEnum.INVALID_PASSWORD)
        toastMessage = 'Senha incorreta.';
        const toast = await this._toastController.create({
          message: toastMessage,
          duration: 3000
        });
        toast.present();
      });
  }

  public get emailCtrl(): AbstractControl {
    return this.loginForm.get('email');
  }

  public get passwordCtrl(): AbstractControl {
    return this.loginForm.get('password');
  }
}
