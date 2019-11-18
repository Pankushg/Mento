import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { UserChatService } from '../../services/user-chat.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SocketService } from '../../services/socket.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userChatService: UserChatService,
    private socketService: SocketService,
  ) {}

  ngOnInit() {
    /* this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.userChatService.getChats(params.get('id'));
      })).subscribe(value => {
        console.log("fdssdS"); 
        console.log(value); 
      if(value.success=='true'){
      }else{}
    }); */

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.room=params.get('id');
        return params.get('id2')
      })).subscribe(value => {
        console.log("fdssdS"); 
        console.log(value); 
      if(true){
      }else{}
    });

    //Joinging Room
    this.socketService.listen("joinRoom").subscribe((data)=>{
      console.log(data + " Joined");
    });
    this.socketService.emit("joinRoom","");
    this.socketService.listen("chat").subscribe((data:{message:string,handle:string})=>{
      let fragment = document.createDocumentFragment(),
        tempElement = document.createElement('div');
      tempElement.innerHTML = "<div id='message'>" + data.message +"!</div>";
      while (tempElement.firstChild) {
        fragment.appendChild(tempElement.firstChild);
      }
      document.getElementById("chat-messages").appendChild(fragment)
    });
  }

  getData(data):Observable<any>{
    return of(this.hero);
  }

  sendMessage(){
    let message = this.chatForm.get('chatMessage').value
    console.log(message);
    this.socketService.emit("chat",{message:this.chatForm.get('chatMessage').value,handle:"dummyRoom"});
  }
}
