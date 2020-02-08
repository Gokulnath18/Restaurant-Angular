import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Promotion } from '../shared/promotion';
import { Promotions } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion []> {
    return of(Promotions).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    return of(Promotions.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return of(Promotions.filter((promo) => promo.featured)[0]).pipe(delay(2000));
  }

}
