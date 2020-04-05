import { Injectable } from '@angular/core';
import { User } from '../interfaces';
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

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  login(user: User): Observable<{ token: string, nicname: string, shop: string }> {
    return this.http.post<{ token: string, nicname: string, shop: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token, nicname, shop }) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
            localStorage.setItem('my-nicname', nicname)
            this.setNicname(nicname)
            localStorage.setItem('my-shop', shop)
            this.setShop(shop)
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    this.setNicname(null)
    this.setShop(null)
    localStorage.clear()
  }

  setNicname(nicname: string) {
    this.myNicname = nicname
  }
  getNicname(): string {
    return this.myNicname
  }

  setShop(shop: string) {
    this.myShop = shop
  }

  getShop(): string {
    return this.myShop
  }


}
