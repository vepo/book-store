import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  get form() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login({
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    });
  }

}
