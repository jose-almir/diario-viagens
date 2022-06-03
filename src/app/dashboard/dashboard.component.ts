import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashboardService } from '../core/services/dashboard/dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalPosts$?: Observable<number>;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Postagens da semana', cols: 3, rows: 1, id: 'week-posts' },
          {
            title: 'Locais mais visitados',
            cols: 3,
            rows: 1,
            id: 'common-locals',
          },
          { title: 'Últimos posts', cols: 3, rows: 1, id: 'last-posts' },
        ];
      }

      return [
        { title: 'Postagens da semana', cols: 2, rows: 2, id: 'week-posts' },
        {
          title: 'Locais mais visitados',
          cols: 1,
          rows: 1,
          id: 'common-locals',
        },
        { title: 'Últimos posts', cols: 1, rows: 1, id: 'last-posts' },
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.totalPosts$ = this.dashboardService.getPostsCount();
  }
}
