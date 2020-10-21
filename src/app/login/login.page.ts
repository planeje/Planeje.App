import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup

  constructor(
    private _loginService: LoginService,
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginForm = this._buildForm();
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public loginUser(formValue: { email: string, password: string }): void {
    this._loginService.authenticate(formValue.email, formValue.password)
      .subscribe(response => {
        this._router.navigate(['tabs/tab2']);
    })
  }

}
