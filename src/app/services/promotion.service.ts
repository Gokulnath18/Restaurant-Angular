import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { Promotions } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promotion [] {
    return Promotions;
  }

  getPromotion(id: string): Promotion {
    return Promotions.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Promotion {
    return Promotions.filter((promo) => promo.featured)[0];
  }

}
