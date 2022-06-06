import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss']
})
export class RecaptchaComponent implements OnInit {

  public aFormGroup!: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'pt';
  public type: 'image' | 'audio' = 'image';
  public siteKey:string = '6Lexg0ggAAAAABxYoc_oHkpddQ74SqffhRT8NTHo'

  ngOnInit() {

    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

}
