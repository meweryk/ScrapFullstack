import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsPage } from '../shared/interfaces';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderImportRef: ElementRef
  @ViewChild('tapTarget') tapTargetRef: ElementRef
  tapTarget: MaterialInstance

  aSub: Subscription
  average: number
  averageIn: number
  averageOut: number
  pending = true

  //инжектирование сервиса при помощи которого делается бэк запрос
  constructor(private service: AnalyticsService) {
    Chart.register(...registerables)
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)

    const gainConfig: any = {}

    const gainAllConfig: any = {
      label: 'Выручка',
      borderColor: 'black',
      borderWidth: '2',
      borderDash: [5, 5],
      steppedLine: false,
      fill: true
    }
    const gainInConfig: any = {
      label: 'Импорт',
      borderColor: '#ff8f63',
      lineTension: 0.3,
      steppedLine: false,
      fill: false
    }
    const gainOutConfig: any = {
      label: 'Экспорт',
      borderColor: '#36dfeb',
      lineTension: 0.3,
      steppedLine: false,
      fill: false
    }

    const orderConfig: any = {}

    const orderAllConfig: any = {
      label: 'Все заказы',
      borderColor: 'black',
      borderWidth: '2',
      borderDash: [5, 5],
      steppedLine: false,
      fill: false
    }
    const orderInConfig: any = {
      label: 'Импорт',
      borderColor: '#ff8f63',
      lineTension: 0.3,
      steppedLine: false,
      fill: false
    }
    const orderOutConfig: any = {
      label: 'Экспорт',
      borderColor: '#36dfeb',
      lineTension: 0.3,
      steppedLine: false,
      fill: false
    }


    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average
      this.averageIn = data.averageIn
      this.averageOut = data.averageOut

      gainConfig.labels = data.chart.map(item => item.label)
      gainInConfig.data = data.chart.map(item => item.gainIn)
      gainOutConfig.data = data.chart.map(item => item.gainOut)
      gainAllConfig.data = data.chart.map(item => item.gain)
      gainConfig.datasets = [gainAllConfig, gainOutConfig, gainInConfig]



      orderConfig.labels = data.chart.map(item => item.label)
      orderAllConfig.data = data.chart.map(item => item.order)
      orderInConfig.data = data.chart.map(item => item.orderIn)
      orderOutConfig.data = data.chart.map(item => item.orderOut)
      orderConfig.datasets = [orderAllConfig, orderOutConfig, orderInConfig]

      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      const orderCtx = this.orderImportRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '305px'
      orderCtx.canvas.height = '325px'
      new Chart(gainCtx,
        {
          type: 'line',
          options: {
            responsive: true
          },
          data: {
            labels: gainConfig.labels,
            datasets: gainConfig.datasets
          }
        }
      )
      new Chart(orderCtx,
        {
          type: 'line',
          options: {
            responsive: true
          },
          data: {
            labels: orderConfig.labels,
            datasets: orderConfig.datasets
          }
        }
      )

      this.pending = false
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
    this.tapTarget.destroy()
  }

  openInfo() {
    this.tapTarget.open()
  }

}
