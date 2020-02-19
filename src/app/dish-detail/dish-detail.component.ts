import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { AuthorReview } from '../shared/feedback';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;
  dishIds: string [];
  prev: string;
  next: string;
  reviewForm: FormGroup;
  authorReview: AuthorReview;
  reviewDate: Date;
  errMsg: string;
  dishCopy: Dish;
  //review: Comment;
  @ViewChild('revform',{static: true}) reviewFormDirective: { resetForm: () => void; };
  reviewFormErrors = {
    'authorname': '',
    'authorcomment': ''
  }

  reviewValidationMessages = {
    'authorname': {
      'required': 'Name is required',
      'minlength': 'Name must be atleast 3 characters long',
      'maxlength': 'Name must not exceed more than 25 characters'
    },
    'authorcomment': {
      'required': 'Comment is required',
    }
  }

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject("BaseURL") private BaseURL) { 
      this.createReviewForm();
    }

  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds,
      errmsg => this.errMsg = <any>errmsg);
    this.route.params.pipe(switchMap(
      (params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => { 
        this.dish = dish;
        this.dishCopy = dish;
        this.setPrevNext(dish.id); 
      },
        errmsg => this.errMsg = <any>errmsg);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createReviewForm(): void {
    this.reviewForm = this.fb.group({
      authorname: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      authorstar: [0, Validators.required],
      authorcomment: ['', Validators.required]
    });

    this.reviewForm.valueChanges.subscribe((data) => this.onReviewFormValueChanged(data));

    this.onReviewFormValueChanged();
  }

  onReviewFormSubmit(rform: any) {
    this.authorReview = this.reviewForm.value;
    this.reviewDate = new Date();
    const review: Comment = {
      rating: 0,
      comment: '',
      author: '',
      date: ''
    }
    review.rating = this.reviewForm.value.authorstar;
    review.comment = this.reviewForm.value.authorcomment;
    review.author = this.reviewForm.value.authorname;
    review.date = this.reviewDate.toISOString();
    this.dishCopy.comments.push(review);
    // this.dishService.putDish(this.dishCopy).subscribe((dish) => {this.dish = dish; this.dishCopy = dish},
    //   errmsg => {this.dish = null; this.dishCopy = null; this.errMsg = <any>errmsg;});
    console.log(this.authorReview);
    this.reviewForm.reset({
      authorname: '',
      authorstar: 0,
      authorcomment: ''
    }); 
    rform.resetForm();
  }

  onReviewFormValueChanged(data?: any) {
    if(!this.reviewForm) {
      return;
    }
    const form = this.reviewForm;
    for (const field in this.reviewFormErrors) {
      if( this.reviewFormErrors.hasOwnProperty(field) ){
        this.reviewFormErrors[field] = '';
        const control = form.get(field);
        if ( control && control.dirty && !control.valid ) {
          const messages = this.reviewValidationMessages[field];
          for ( const key in control.errors ) {
            if(control.errors.hasOwnProperty(key)) {
              this.reviewFormErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }

}
