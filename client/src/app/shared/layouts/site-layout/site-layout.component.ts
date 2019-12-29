import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService, MaterialInstance } from '../../classes/material.service';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('floating', { static: false }) floatingRef: ElementRef
  @ViewChild('sidenav', { static: false }) sidenavRef: ElementRef

  width: any
  sidenav: MaterialInstance
  aSub: Subscription
  nicname: string
  shop: string


  links = [
    { url: '/overview', name: 'Обзор' },
    { url: '/analytics', name: 'Аналитика' },
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Ассортимент' },
    { url: '/deliveries', name: 'Поставки' },
    { url: '/materials', name: 'База материалов' }
  ]

  constructor(private auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.width = window.innerWidth

    this.aSub = this.auth.getById().subscribe((data: User) => {
      this.nicname = data.nicname
      this.shop = data.shop
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth
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
    this.aSub.unsubscribe()
  }

  openSidenav() {
    this.sidenav.open()
  }

  closeSidenav() {
    if (this.width < 992) {
      this.sidenav.close()
    }
  }

  nikcnameShow() {
    MaterialService.toast(`${this.nicname}`)
  }
}
