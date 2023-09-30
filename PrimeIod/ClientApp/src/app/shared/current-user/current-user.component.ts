import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {
  currentUser: any;
  constructor(private credSerivce: CredentialsService) {}

  ngOnInit(): void {
    this.currentUser = this.credSerivce.currentUser.fullName;
  }
}
