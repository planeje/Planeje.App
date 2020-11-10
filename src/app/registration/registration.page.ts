import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { User } from '../usual/models/user.model';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public form: FormGroup;
  public loading = false;

  constructor(
    private _fb: FormBuilder,
    private _registrationService: RegistrationService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.form = this._buildForm();
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public createUser(formValue: User): void {
    this.loading = true;
    this.form.disable();
    this._registrationService.createUser(formValue)
    .pipe(
      finalize(() => {
        this.loading = false;
        this.form.enable();
      })
    )
    .subscribe(() => {
      this._router.navigate(['login']);
    }, err => {
      console.log('err', err);
    });
  }

  public back(): void {
    history.back();
  }
}
