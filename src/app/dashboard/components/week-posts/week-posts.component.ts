import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { map, Observable } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-week-posts',
  templateUrl: './week-posts.component.html',
  styleUrls: ['./week-posts.component.scss'],
})
export class WeekPostsComponent implements OnInit {
  chartData$?: Observable<ChartData>;

  config: ChartConfiguration['options'] = {
    responsive: true,
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.chartData$ = this.dashboardService.getWeekPosts().pipe(
      map((data) => {
        return {
          labels: Object.keys(data), // eixo horizontal
          datasets: [
            {
              data: Object.values(data),// eixo vertical
              label: 'Quantidade de posts', // série
            },
          ],
        };
      })
    );
  }
}
