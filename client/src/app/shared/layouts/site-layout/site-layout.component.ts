import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService, MaterialInstance } from '../../classes/material.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../interfaces';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('floating', { static: false }) floatingRef: ElementRef
  @ViewChild('sidenav', { static: false }) sidenavRef: ElementRef
  sidenav: MaterialInstance
  aSub: Subscription
  nicname: string
  shop: string


  links = [
    { url: '/overview', name: 'Обзор' },
    { url: '/analytics', name: 'Аналитика' },
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Ассортимент' }
  ]

  constructor(private auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.aSub = this.auth.getById().subscribe((data: User) => {
      this.nicname = data.nicname
      this.shop = data.shop
    })
  }


  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef)
    this.sidenav = MaterialService.initSidenav(this.sidenavRef)
  }

  logout(event: Event) {
    event.preventDefault() //убрали перезагрузку страницы
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  ngOnDestroy() {
    this.sidenav.destroy()
  }

  openSidenav() {
    this.sidenav.open()
  }


}
