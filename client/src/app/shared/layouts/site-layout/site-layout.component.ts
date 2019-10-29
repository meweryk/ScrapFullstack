import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService, MaterialInstance } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit, OnDestroy {

  @ViewChild('floating', { static: false }) floatingRef: ElementRef
  @ViewChild('sidenav', { static: false }) sidenavRef: ElementRef
  sidenav: MaterialInstance

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
