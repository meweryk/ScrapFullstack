import { Component, HostListener, Input, OnDestroy, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
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

  saveCheckedList: boolean
  list: any[]

  role: string
  loading = false
  height: number

  constructor(private auth: AuthService,
    private usersCh: UserService) {
    this.saveCheckedList = true;
  }

  ngOnInit(): void {
    this.height = 0.5 * window.innerHeight
    this.loading = true
    const params = Object.assign({}, { role: this.userRole, shop: this.userShop, _id: this.userId })
    this.uSub = this.auth.getByShop(params).subscribe(users => {
      this.users = users
      this.list = JSON.parse(JSON.stringify(users))
      this.loading = false
    })
  }

  ngOnDestroy() {
    this.uSub.unsubscribe()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = 0.8 * event.target.innerHeight
  }

  onChange(user: User) {
    const candidate = this.usersCh.checkedList.find(p => p._id === user._id)
    const oldUser = this.list.find(p => p._id === user._id)
    let hot = JSON.stringify(user) === JSON.stringify(oldUser) // сравниваем два объекта

    if (candidate && hot) {
      this.usersCh.remove(user._id)
    }
    if (!hot) {
      this.usersCh.add(user, candidate)
    }
    this.saveCheckedList = this.usersCh.checkedList.length === 0
  }

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

  saveAll($event) { }

}
