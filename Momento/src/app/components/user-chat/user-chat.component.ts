import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { UserChatService } from '../../services/user-chat.service';
import { UsersListService } from '../../services/users-list.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SocketService } from '../../services/socket.service';
import { DataControllerService } from "../../services/data-controller.service";

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  chatForm = new FormGroup({
    chatMessage: new FormControl(''),
  });

  private room: string;
  chats:any;
  userId:any;
  sender:true;
  userIds:Observable<any>;
  data:{message:string,handle:string};
  hero:Observable<[{name:'Pankush'},{name:'nidhi'}]>
  loggedInUser : {_id:string,username:string};
  clickedUser : {_id:string,username:string};


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userChatService: UserChatService,
    private socketService: SocketService,
    private dataControllerService : DataControllerService,
    private usersListService : UsersListService, 
  ) {}

  ngOnInit() {
    this.userChatService.authenticateChatsRoute().subscribe(data=>{
      this.loggedInUser = data.user;
      console.log(data);
      //Chat : authenticateSession >> verifyUserClickedId >> ValidateUserClickedId >> ifUserPresentInDB >>
      //listenToTheparticularRooId
      this.activatedRoute.paramMap.subscribe(params => { 
        let id = params.get('id'); 
        this.usersListService.getUsers(this.loggedInUser).subscribe(data=>{
          console.log(data);
          for(let user of data.users){
            if(user._id===id) {
              this.clickedUser=user;
              break;
            }
          }
          if(this.clickedUser!=undefined){
            //setting room id for private chat
            let privateRoomId = this.loggedInUser._id+" "+this.clickedUser._id;

            //listening to messages in private chat
            this.socketService.listen("chat").subscribe((data:{message:string,handle:string})=>{
              console.log("OOLALALA");
              let fragment = document.createDocumentFragment(),
                tempElement = document.createElement('div');
              tempElement.innerHTML = "<div id='message-r' style='text-align:left'>" + data.message +"</div>";
              while (tempElement.firstChild) {
                fragment.appendChild(tempElement.firstChild);
              }
              document.getElementById("chat-messages").appendChild(fragment);
            });
          } else{
            console.log('Invalid Chat Request');
            this.router.navigate(['register']);
          }
        });
      });  
    },err=>{
      console.log(err);
      this.router.navigate(['register'])
      return false;
    });      
  }

  sendMessage(){
    let message = this.chatForm.get('chatMessage').value
    console.log(this.dataControllerService.getPrivateRoomId());
    let fragment = document.createDocumentFragment(),
        tempElement = document.createElement('div');
      tempElement.innerHTML = "<div id='message-s' style='text-align:right'>" + message +"</div>";
      while (tempElement.firstChild) {
        fragment.appendChild(tempElement.firstChild);
      }
      document.getElementById("chat-messages").appendChild(fragment);
      console.log(document)
    this.socketService.emit("chat",
    {message:this.chatForm.get('chatMessage').value,handle:this.dataControllerService.getPrivateRoomId().id});
  }
}
