import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../../services/users-list.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute,
    private usersListService : UsersListService
  ) { }

  ngOnInit(
  ) {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.usersListService.getUsers(params.get('_id'));
      })).subscribe(value => {
      console.log(value); 
    });
  }

  users:any;

 /*  usersList(){
    this.usersListService.getUsers().subscribe(data=>{
      console.log(data);
      if(data.success){
        this.users=data.users.splice(1);
      }
    });
  } */

  userClicked(){
  }
}
