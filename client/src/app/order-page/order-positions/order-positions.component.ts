import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Observable } from 'rxjs';
import { Position } from 'src/app/shared/interfaces';
import { switchMap, map } from 'rxjs/operators';
import { OrderService } from '../order.service';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tapTarget') tapTargetRef: ElementRef
  tapTarget: MaterialInstance
  comments: string = ''
  positions$: Observable<Position[]>

  height: number

  allShops: string[]
  searchShop = ''
  searchVid = ''

  constructor(private route: ActivatedRoute,
    private positionsService: PositionsService,
    private order: OrderService) { }

  ngOnInit() {
    this.height = 0.75 * window.innerHeight
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
        ),
        map(
          (positions: Position[]) => {
            return positions.map(position => {
              position.quantity = 1
              return position
            })
          }
        )
      )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = 0.75 * event.target.innerHeight
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  ngOnDestroy() {
    this.tapTarget.destroy()
  }

  addToOrder(position: Position) {
    MaterialService.toast(`Добавлено х${position.quantity}`)
    this.order.add(position)
  }

  openInfo(exposition) {
    this.tapTarget.open()
    this.comments = exposition
  }
}
