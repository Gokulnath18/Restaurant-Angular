import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { validateBasis } from '@angular/flex-layout';
import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [flyInOut()]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  feedBackSubmissionProcess: string = '';
  // @ViewChild('fform',{static: true}) feebackFormDirective: { resetForm: () => void; };

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  }

  vaildationMessages = {
    'firstname': {
      'required': 'First Name is required',
      'minlength': 'First Name must be atleast 3 characters long',
      'maxlength': 'First Name cannot exceed more than 25 characters'
    },
    'lastname': {
      'required': 'Last Name is required',
      'minlength': 'Last Name must be atleast 3 characters long',
      'maxlength': 'Last Name cannot exceed more than 25 characters'
    },
    'telnum': {
      'required': 'Tel. number is required',
      'pattern': 'Tel. numbers must cotain only numbers between 0-9'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email is not in valid format'
    }
  }

  constructor(private fb: FormBuilder,
    private feedBackService: FeedbackService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    
    this.feedbackForm.valueChanges.subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // to reset the form
  }

  onSubmit(fbForm: any) {
    this.feedback = this.feedbackForm.value;
    this.feedBackSubmissionProcess = 'inProgress';
    this.feedBackService.submitFeedback(this.feedback).subscribe((feedBack) => {
      if(feedBack) {
        this.feedBackSubmissionProcess = 'submitted';
      }
    });
    console.log(this.feedback);
    setTimeout(() => (
      this.feedBackSubmissionProcess = '',
      this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    }),
    fbForm.resetForm()), 5000);
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)){
        //clear previous error message if avialable
        this.formErrors[field] = '';
        const control = form.get(field);
        if( control && control.dirty && !control.valid){
          const messages = this.vaildationMessages[field];
          for (const key in control.errors) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
