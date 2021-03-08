import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  sSub: Subscription
  loader = false
  open = false

  phone: string = ''
  nicname: string = ''
  email: string = ''
  shop: string = ''
  role: string = ''
  id: string = ''

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loader = false

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      nicname: new FormControl(null, [Validators.required]),
      shop: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.pattern('^[0-9]+(?!.)')])
    })

    this.fatch()

    this.form.disable()
  }

  private fatch() {
    this.nicname = this.auth.getNicname()
    this.phone = this.auth.getPhone() ? this.auth.getPhone() : ''
    this.email = this.auth.getEmail()
    this.shop = this.auth.getShop() ? this.auth.getShop() : ''
    this.role = this.auth.getRole() ? this.auth.getRole() : 'worker'
    this.id = this.auth.getId()
    this.form.patchValue({
      email: this.email,
      password: "0000000000",
      nicname: this.nicname,
      shop: this.shop,
      phone: this.phone
    })
    MaterialService.updateTextInputs()
  }

  changeSetting() {
    this.open = true
    this.form.enable()
  }

  chancel() {
    this.fatch()
    this.form.disable()
    this.open = false
  }

  ngOnDestroy() {
    if (this.sSub) {
      this.sSub.unsubscribe()
    }
  }

  /*change(incriased: any) {
    this.onChanged.emit(incriased)
  }*/

  onSubmit() {
    this.form.setValue
    this.form.disable()
    const user: User = {
      _id: this.id,
      email: this.form.value.email,
      phone: this.form.value.phone,
      password: this.form.value.password === "0000000000" ? null : this.form.value.password,
      nicname: this.form.value.nicname,
      shop: this.form.value.shop,
      role: this.role
    }

    this.loader = true

    const desision = window.confirm(`${this.nicname} - изменить регистрационные данные?`)

    if (desision) {
      this.sSub = this.auth.update(user).subscribe(
        () => {
          MaterialService.toast('Изменения сохранены')
          //this.router.navigate(['/setting'])
          //this.fatch()
          //this.open = false
          window.location.reload()
        },
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
          this.loader = false
        }
      )
    }
  }

}
