import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('fform',{static: true}) feebackFormDirective: { resetForm: () => void; };

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: [0, Validators.required],
      email: ['', Validators.required],
      agree: [false, Validators.required],
      contacttype: ['None', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feebackFormDirective.resetForm();
  }

}
