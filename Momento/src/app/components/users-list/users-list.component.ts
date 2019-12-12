import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../../services/users-list.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { DataControllerService } from "../../services/data-controller.service";
import { SocketService } from "../../services/socket.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private loggedInUser : {_id:string, username: string}
  private availableUsers : [{_id:string, username: string}]

  constructor( 
    private router : Router,
    private route: ActivatedRoute,
    private usersListService : UsersListService,
    private dataControllerService : DataControllerService,
    private socketService: SocketService,
  ) {}

  ngOnInit() {
    /* if(this.dataControllerService.getLoggedInUserData()!=undefined)
      this.loggedInUser=this.dataControllerService.getLoggedInUserData();
    else if(window.localStorage.getItem("username")!=undefined){
      console.log(window.localStorage);
      this.loggedInUser={id: window.localStorage.getItem("id"), username: window.localStorage.getItem("username")};
    } */
    console.log(window.localStorage.getItem('username'));
    this.loggedInUser = {_id: window.localStorage.getItem('id'), username: window.localStorage.getItem('username')};
    this.usersListService.authenticateUsersRoute().subscribe(profile=>{
      //this.user=profile.user;
      console.log(profile);
      this.loggedInUser.username=profile.user.username;
      this.loggedInUser._id=profile.user._id;
      this.usersListService.getUsers(this.loggedInUser).subscribe(data=>{
        console.log(data);
        this.availableUsers=data.users;
        this.dataControllerService.setAvailableUsersData(this.availableUsers);
        this.availableUsers.forEach(element => {
          console.log(element._id);
          let privateRoom = element._id+" "+this.loggedInUser._id;
          this.socketService.emit("readyRoom",privateRoom)
        });
        console.log(this.dataControllerService.getAvailableUsersData())
      });
      this.socketService.listen("roomReady").subscribe((data)=>{
        console.log(data + " Joined");
      });
    },err=>{
      console.log(err);
      this.router.navigate(['register'])
      return false;
    });
    /* this.socketService.listen("knocKnock").subscribe((data)=>{
    }); */
  }
 /*  usersList(){
    this.usersListService.getUsers().subscribe(data=>{
      console.log(data);
      if(data.success){
        this.users=data.users.splice(1);
      }
    });
  } */

  userClicked(user){
    let userClicked = user;
    let loggedInUser = this.loggedInUser;
    let privateRoomId = loggedInUser._id+" "+userClicked._id;
    this.dataControllerService.setPrivateRoomId({id:privateRoomId});
    console.log(privateRoomId);
    this.router.navigate(['/chat',userClicked._id]);
    //this.socketService.emit("knocKnock",privateRoomId)
    //let loggedInUser
  }
}
