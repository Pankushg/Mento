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
  
  errMsg;

  registerForm = new FormGroup({
    userName: new FormControl(''),
  });

  registerUser(){
    this.errMsg = undefined;
    this.registerService.register(
      {
        userName : this.registerForm.get('userName').value
      }).subscribe(data => {
        console.log(data);
        if(data.success){
          this.router.navigate(['usersList',data.user]).then(err=>{
            if(err) console.log(err);
            else console.log(this.router);
          });
          console.log(`${data.user.username} registered successfully`);
        } else {
          this.errMsg=data.msg;
          console.log(`${this.registerForm.get('userName').value} already registered`);
        }
    });
    console.log('Register User request sent to Register service');
  }
}
