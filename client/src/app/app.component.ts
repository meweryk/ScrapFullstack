import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) { }

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken)

    }

    const thisNicname = localStorage.getItem('my-nicname')
    if (thisNicname !== null) {
      this.auth.setNicname(thisNicname)
    }

    const thisShop = localStorage.getItem('my-shop')
    if (thisShop !== null) {
      this.auth.setShop(thisShop)
    }
  }
}
