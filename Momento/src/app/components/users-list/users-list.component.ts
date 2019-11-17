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

  private availableUsers:[{id:string, username:string}]

  constructor( 
    private route: ActivatedRoute,
    private usersListService : UsersListService
  ) { }

  ngOnInit(
  ) {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let user = {
          id : params.get('_id'),
          username : params.get('username')
        }
        return this.usersListService.getUsers(user);
      })).subscribe(value => {
      console.log(value);
      this.availableUsers=value.users;
      console.log(this.availableUsers)
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
