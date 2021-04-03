import { Injectable } from '@angular/core'
import { MaterialService } from '../shared/classes/material.service'
import { User } from '../shared/interfaces'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public checkedList: any[] = []

  add(user: User, candidate: any) {
    const userCandidate = Object.assign({}, {
      _id: user._id,
      flagRead: user.flagRead,
      flagWrite: user.flagWrite,
      role: user.role
    })

    //const candidate = this.checkedList.find(user => user._id === userCandidate._id)

    if (candidate) {
      //Изменяем роль усли она менялась
      if (candidate.role != userCandidate.role) {
        candidate.role = userCandidate.role
        MaterialService.toast(`Параметры пользователя ${user.nicname} приняты к изменению.`)
      }
      if (candidate.flagRead != userCandidate.flagRead) {
        candidate.flagRead = userCandidate.flagRead
        MaterialService.toast(`Параметры пользователя ${user.nicname} приняты к изменению.`)
      }
      if (candidate.flagWrite != userCandidate.flagWrite) {
        candidate.flagWrite = userCandidate.flagWrite
        MaterialService.toast(`Параметры пользователя ${user.nicname} приняты к изменению.`)
      }
    } else {
      this.checkedList.push(userCandidate)
      MaterialService.toast(`Параметры пользователя ${user.nicname} приняты к изменению.`)
    }

  }

  clear() {
    this.checkedList = []
  }

  remove(id: string) {
    const idx = this.checkedList.findIndex(p => p._id === id)
    this.checkedList.splice(idx, 1)
    MaterialService.toast(`Параметры пользователя приведены к исходному состоянию.`)
  }

}
