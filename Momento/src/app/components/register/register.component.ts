import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from "../../services/register.service";
import { RouterLink, RouteConfigLoadEnd, ActivatedRoute,Router } from '@angular/router';
import { DataControllerService } from "../../services/data-controller.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private registerService : RegisterService,
    private router : Router,
    private dataControllerService : DataControllerService,
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
          this.dataControllerService.setLoggedInUserData({id: data.user._id, username: data.user.username});
          console.log(this.dataControllerService.getLoggedInUserData());
          this.registerService.logout();
          this.registerService.storeUserData(data.token, data.user);
          this.router.navigate(['usersList']);
          console.log(`${data.user.username} registered successfully`);
        } else {
          this.errMsg=data.msg;
          console.log(`${this.registerForm.get('userName').value} already registered`);
        }
    });
    console.log('Register User request sent to Register service');
  }
}
