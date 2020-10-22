import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../forgot-password/forgotPassword.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {
  public form: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _forgotPasswordService: ForgotPasswordService,
    private _router: Router
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
    this._forgotPasswordService.resetPassword(formValue).subscribe(() => {
      this._router.navigate(['login']);
    }, err => {
      console.log('err', err);
    })
  }

  public back(): void {
    history.back();
  }
}
