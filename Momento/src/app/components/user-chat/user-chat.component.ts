import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { UserChatService } from '../../services/user-chat.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userChatService: UserChatService,
  ) {}

  chats:any;
  userId:any;
  userIds:Observable<any>
  hero:Observable<[{name:'Pankush'},{name:'nidhi'}]>

  getData(data):Observable<any>{
    return of(this.hero);
  }

  ngOnInit() {
    /* this.chat = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))); */
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.userChatService.getChats(params.get('id'));
      })
    ).subscribe(value => {
      console.log(value);
      if(value.success=='true'){

      }else{
      }
    });
  }
}
