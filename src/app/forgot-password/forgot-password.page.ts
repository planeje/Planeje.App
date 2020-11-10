import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private _router: Router
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
    }, err => {
      console.log(err);
    });
  }

  public back(): void {
    history.back();
  }
}
