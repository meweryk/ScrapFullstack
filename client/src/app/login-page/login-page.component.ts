import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup(control: {
      email: new FormControl(formState: null, validatorOr: [Validators.required, Validators.email]),
      password: new FormControl(formState: null, validatorOrOpts: [Validators.required, Validators.minLength(minLength: 6)])
    })
  }

  onSubmit() {

  }

}
