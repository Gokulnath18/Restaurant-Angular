import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseURL";
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

import { Promotion } from '../shared/promotion';
// import { Promotions } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion []> {
    return this.http.get<Promotion[]>(baseURL + '/promotions')
      .pipe(catchError(this.processHttpMsgService.handleError));
    // return of(Promotions).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + '/promotions/' + id)
      .pipe(catchError(this.processHttpMsgService.handleError));
    // return of(Promotions.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + '/promotions?featured=true')
      .pipe(map(promotion => promotion[0]))
      .pipe(catchError(this.processHttpMsgService.handleError));
    // return of(Promotions.filter((promo) => promo.featured)[0]).pipe(delay(2000));
  }

}
