import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from './forgotPassword.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public form: FormGroup;
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

  public sendToken(formValue: any) {
    this._forgotPasswrodService.sendEmailToken(formValue).subscribe(() => {
      this._router.navigate(['token']);
    }, err => {
      console.log(err);
    });
  }

  public back(): void {
    history.back();
  }
}
