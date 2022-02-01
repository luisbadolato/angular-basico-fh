import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-grafica-barra',
  templateUrl: './grafica-barra.component.html',
  styleUrls: ['./grafica-barra.component.css']
})
export class GraficaBarraComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() formato: string = 'bar';
  @Input() barChartLabels: string[] = [ '1941','1942','1943','1944','1945','1946','1947','1948' ];
  @Input() barChartDataInput: any = [];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: { },
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartPlugins = [
    DataLabelsPlugin
  ];
  public barChartType: ChartType = this.parseFormat(this.formato);


  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: this.barChartDataInput.datasets
  };


  constructor() { }
  
  ngOnInit(): void {
    this.barChartType = this.parseFormat(this.formato);
    this.barChartData.labels = this.barChartLabels;
    this.barChartData.datasets = this.barChartDataInput.datasets

  }

  public parseFormat( format: string): ChartType {

    switch (format) {
      case 'line':
        return 'line';
      case 'doughnut':
        return 'doughnut';
      default:
        return 'bar';
    }

  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }
}
