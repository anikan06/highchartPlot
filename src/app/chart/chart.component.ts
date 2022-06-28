import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { ChartData, Dt, newData } from '../modals/chartData';
import { SharingService } from '../services/sharing.service';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, AfterViewInit {
  colorsArr = [];
  dt: Array<any> = [];
  chartType?: any = '';

  constructor(private shr: SharingService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.shr.castUser.subscribe((re: ChartData) => {
      if (re) {
        this.colorsArr = Object.values(re.colors);

        let temp: any = re.monthlyRevenue;
        let result = [];
        for (var i in temp) {
          result.push({ name: i, y: parseInt(temp[i]) });
        }
        this.dt = result;
        this.chartType = Object.values(re.type)[0];

        this.createChart(this.dt, this.chartType);
      }
    });

    this.cd.detectChanges();
  }

  public ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  private createChart(dta: any, chartType: string) {
    let data: any[] = [];
    data = dta;
    if (chartType === 'bar') {
      const chart = Highcharts.chart(
        'chart' as any,
        {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Market Qtr Report',
          },
          credits: {
            enabled: false,
          },
          legend: {
            enabled: false,
          },
          yAxis: {
            min: 0,
            title: 'Select Monthly Income',
          },
          xAxis: {
            type: 'color',
          },

          tooltip: {
            headerFormat: `<div>Month: {point.key}</div>`,
            pointFormat: `<div>Revenue: {point.y}</div>`,
            shared: true,
            useHTML: true,
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true,
              },
            },
            column: {
              colorByPoint: true,
            },
          },
          colors: this.colorsArr,
          series: [
            {
              name: 'Amount',
              data,
            },
          ],
        } as any
      );
    }
    if (chartType === 'pie') {
      const chart = Highcharts.chart('chart', {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Market Qtr Report',
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          headerFormat: `<span class="mb-2">Month: {point.key}</span><br>`,
          pointFormat: '<span>Revenue: {point.y}</span>',
          useHTML: true,
        },
        colors: this.colorsArr,
        series: [
          {
            name: null,
            innerSize: '50%',
            data,
          },
        ],
      } as any);
    }
    if (chartType === 'line') {
      const chart = Highcharts.chart('chart', {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Market Qtr Report',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: null,
          },
        },
        xAxis: {
          type: 'category',
        },
        tooltip: {
          headerFormat: `<div>Date: {point.key}</div>`,
          pointFormat: `<div>Revenue: {point.y}</div>`,
          shared: true,
          useHTML: true,
        },
        colors: this.colorsArr,
        series: [
          {
            name: 'Amount',
            data,
          },
        ],
      } as any);
    }
  }
}
