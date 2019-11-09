import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from "../../services/register.service";
import { RouterLink, RouteConfigLoadEnd, ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private registerService : RegisterService,
    private router : Router,
  ) { }

  ngOnInit() {
  }
  
  registerForm = new FormGroup({
    userName: new FormControl(''),
  });

  registerUser(){
    this.registerService.register(
      {
        userName : this.registerForm.get('userName').value
      }).subscribe(data => {
        if(data.success){
          this.router.navigate(['usersList']);
        }
    });
    console.log('Register User request sent to Register service');
  }
}
