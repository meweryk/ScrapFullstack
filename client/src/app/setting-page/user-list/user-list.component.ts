import { Component, HostListener, Input, OnDestroy, OnInit, } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  @Input('userRole') userRole: string
  @Input('userShop') userShop: string
  @Input('userId') userId: string

  uSub: Subscription
  users: User[] = []

  masterSelected: boolean
  checkedList: any

  role: string
  loading = false
  height: number

  constructor(private auth: AuthService) {
    this.masterSelected = false;
  }

  ngOnInit(): void {
    this.height = 0.5 * window.innerHeight
    this.loading = true
    const params = Object.assign({}, { role: this.userRole, shop: this.userShop, _id: this.userId })
    this.uSub = this.auth.getByShop(params).subscribe(users => {
      this.users = users
      this.loading = false
    })
  }

  ngOnDestroy() {
    this.uSub.unsubscribe()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = 0.5 * event.target.innerHeight
  }

  isReadSelected() {
    this.masterSelected = this.users.every(function (item: any) {
      return item.flagRead == true
    })
    this.getCheckedItemList();
  }

  isWriteSelected() {
    this.masterSelected = this.users.every(function (item: any) {
      return item.flagWrite == true
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.users.length; i++) {
      if ((this.users[i].flagRead || this.users[i].flagWrite) && (this.users[i].role != 'admin')) {
        this.checkedList.push(this.users[i])
        console.log(this.users[i].flagRead)
      }
    }
  }

  onChangeRole(user) { }

  onDeleteUser(event: Event, user: User) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию "${user.nicname}"?`)

    if (decision) {
      this.auth.delete(user._id).subscribe(
        response => {
          const idx = this.users.findIndex(u => u._id === user._id)
          this.users.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

}
