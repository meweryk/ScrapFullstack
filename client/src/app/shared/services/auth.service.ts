import { Injectable } from '@angular/core';
import { Message, User } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token = null
  private myNicname = null
  private myShop = null
  private myEmail = null
  private myPhone = null
  private myRole = null
  private myId = null

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{ token: string, nicname: string, shop: string, email: string, phone: string, role: string, id: string }> {
    return this.http.post<{ token: string, nicname: string, shop: string, email: string, phone: string, role: string, id: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token, nicname, shop, email, phone, role, id }) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
            localStorage.setItem('my-nicname', nicname)
            this.setNicname(nicname)
            localStorage.setItem('my-shop', shop)
            this.setShop(shop)
            localStorage.setItem('my-email', email)
            this.setEmail(email)
            localStorage.setItem('my-phone', phone)
            this.setPhone(phone)
            localStorage.setItem('my-role', role)
            this.setRole(role)
            localStorage.setItem('my-id', id)
            this.setId(id)
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token
  }

  setNicname(nicname: string) {
    this.myNicname = nicname
  }

  setShop(shop: string) {
    this.myShop = shop
  }

  setEmail(email: string) {
    this.myEmail = email
  }

  setPhone(phone: string) {
    this.myPhone = phone
  }

  setRole(role: string) {
    this.myRole = role
  }

  setId(id: string) {
    this.myId = id
  }

  getToken(): string {
    return this.token
  }

  getNicname(): string {
    return this.myNicname
  }

  getShop(): string {
    return this.myShop
  }

  getEmail(): string {
    return this.myEmail
  }

  getPhone(): string {
    return this.myPhone
  }

  getRole(): string {
    return this.myRole
  }

  getId(): string {
    return this.myId
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    this.setNicname(null)
    this.setShop(null)
    this.setEmail(null)
    this.setPhone(null)
    this.setRole(null)
    this.setId(null)
    localStorage.clear()
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`api/auth/${id}`)
  }

  update(user: User): Observable<{ token: string, nicname: string, shop: string, email: string, phone: string, role: string, id: string }> {
    return this.http.patch<{ token: string, nicname: string, shop: string, email: string, phone: string, role: string, id: string }>(`api/auth/update/${user._id}`, user)
      .pipe(
        tap(
          ({ token, nicname, shop, email, phone, role, id }) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
            localStorage.setItem('my-nicname', nicname)
            this.setNicname(nicname)
            localStorage.setItem('my-shop', shop)
            this.setShop(shop)
            localStorage.setItem('my-email', email)
            this.setEmail(email)
            localStorage.setItem('my-phone', phone)
            this.setPhone(phone)
            localStorage.setItem('my-role', role)
            this.setRole(role)
            localStorage.setItem('my-id', id)
            this.setId(id)
          }
        )
      )
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/auth/${id}`)
  }


}
