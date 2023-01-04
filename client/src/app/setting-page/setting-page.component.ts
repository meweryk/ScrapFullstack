import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from './dialog.service'


@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup
  sSub: Subscription
  loader = false
  open = false
  exit = true

  phone: string = ''
  nicname: string = ''
  email: string = ''
  shop: string = ''
  role: string = ''
  id: string = ''

  constructor(private auth: AuthService,
    private router: Router,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loader = false

    this.form = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)]),
      nicname: new UntypedFormControl(null, [Validators.required]),
      shop: new UntypedFormControl(null, [Validators.required]),
      phone: new UntypedFormControl(null, [Validators.pattern('^[0-9]+(?!.)')])
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

  exitPage(noSave: boolean) {
    this.exit = noSave //если false - есть несохранённые параметры
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (this.exit) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Отменить изменения?')
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
          this.router.navigate(['/setting'])
          this.fatch()
          this.open = false
          //window.location.reload()
        },
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
          this.loader = false
        }
      )
    } else {
      this.fatch()
      this.open = false
    }
  }

  userDel(event: Event) {
    //event.stopPropagation()
    const desision = window.confirm(`${this.nicname} - удалить профиль? Вы будете перенаправлены на страницу регистрацию.`)
    if (desision) {
      this.sSub = this.auth.delete(this.id).subscribe(
        response => MaterialService.toast(response.message),
        error => MaterialService.toast(error.error.message),
        () => this.router.navigate(['/register'])
      )
    } else {
      this.fatch()
      this.open = false
    }
  }

}
