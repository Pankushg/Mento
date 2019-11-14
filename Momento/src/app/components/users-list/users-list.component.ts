import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../../services/users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor( private usersListService : UsersListService) { }

  ngOnInit() {
    this.usersList();
  }

  users:any;

  usersList(){
    this.usersListService.getUsers().subscribe(data=>{
      console.log(data);
      if(data.success){
        this.users=data.users.splice(1);
      }
    });
  }

  userClicked(){
  }
}
