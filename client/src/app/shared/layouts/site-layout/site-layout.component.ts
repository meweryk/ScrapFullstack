import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService, MaterialInstance } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('floating') floatingRef: ElementRef
  @ViewChild('sidenav') sidenavRef: ElementRef
  @ViewChild('dropdown') dropdownRef: ElementRef

  width: any
  sidenav: MaterialInstance
  dropdown: MaterialInstance
  nicname: string
  shop: string


  links = [
    { url: '/overview', name: 'Обзор' },
    { url: '/analytics', name: 'Аналитика' },
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Ассортимент' },
    { url: '/materials', name: 'База материалов' },
    { url: '/deliveries', name: 'Поставки' }
  ]

  constructor(private auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.width = window.innerWidth
    this.nicname = this.auth.getNicname()
    this.shop = this.auth.getShop()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth
  }

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef)
    this.sidenav = MaterialService.initSidenav(this.sidenavRef)
    this.dropdown = MaterialService.initDropdown(this.dropdownRef)
  }

  logout(event: Event) {
    event.preventDefault() //убрали перезагрузку страницы
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  ngOnDestroy() {
    this.sidenav.destroy()
    this.dropdown.destroy()
  }

  openSidenav() {
    this.sidenav.open()
  }

  closeSidenav() {
    if (this.width < 992) {
      this.sidenav.close()
    }
  }

  profileShow() {
    this.router.navigate(['/setting'])
  }
}
