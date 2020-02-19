import { Component, OnInit, Inject } from '@angular/core';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  errMsg: string;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject("BaseURL") private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
       .subscribe((dish) => this.dish = dish,
       errmsg => this.errMsg = <any>errmsg);
    this.promotionService.getFeaturedPromotion()
       .subscribe((promotion) => this.promotion = promotion,
       errmsg => this.errMsg = <any>errmsg);

    this.leaderService.getFeaturedLeader()
       .subscribe((leader) => this.leader = leader,
       errmsg => this.errMsg = <any>errmsg);
  }

}
