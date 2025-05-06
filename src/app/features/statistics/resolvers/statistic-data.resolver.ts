import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StatisticsDataService } from '../services/statistics-data.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticDataResolver implements Resolve<any> {
  constructor(private statisticsService: StatisticsDataService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    if (!id) {
      return of(null);
    }
    
    return this.statisticsService.getStatisticData(id)
      .pipe(
        catchError(error => {
          console.error('Error in resolver:', error);
          return of(null);
        })
      );
  }
}