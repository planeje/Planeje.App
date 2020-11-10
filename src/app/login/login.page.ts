import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
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
    private _router: Router
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
    })
  }

  public get emailCtrl(): AbstractControl {
    return this.loginForm.get('email');
  }

  public get passwordCtrl(): AbstractControl {
    return this.loginForm.get('password');
  }
}
