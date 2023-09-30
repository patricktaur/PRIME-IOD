import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core/authentication/credentials.service';

@Component({
  selector: 'app-user-access-view',
  templateUrl: './user-access-view.component.html',
  styleUrls: ['./user-access-view.component.css']
})
export class UserAccessViewComponent {
  userId : any;
  constructor(
    private credentialsService: CredentialsService,
    
    ) {}
    ngOnInit(): void {
      this.userId = this.credentialsService.currentUser.id;
    }

}
