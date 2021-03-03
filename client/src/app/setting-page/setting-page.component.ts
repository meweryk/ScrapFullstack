import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit {
  form: FormGroup
  loader = false
  open = false

  phone: string = ''
  nicname: string = ''
  email: string = ''
  shop: string = ''
  role: string = ''
  id: string = ''

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.nicname = this.auth.getNicname()
    this.phone = this.auth.getPhone() ? this.auth.getPhone() : ''
    this.email = this.auth.getEmail()
    this.shop = this.auth.getShop() ? this.auth.getShop() : ''
    this.role = this.auth.getRole() ? this.auth.getRole() : 'worker'
    this.id = this.auth.getId()

    this.form = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      nicname: new FormControl(this.nicname, [Validators.required]),
      shop: new FormControl(this.shop, [Validators.required]),
      phone: new FormControl(this.phone, [Validators.pattern('^[0-9]+(?!.)')])
    })

    this.form.disable()
  }

  changeSetting() {
    this.open = true
    this.form.enable()
  }

  onSubmit() { }

}
