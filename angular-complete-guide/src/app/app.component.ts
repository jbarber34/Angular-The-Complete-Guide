import { Component } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService],
})
export class AppComponent {
  userName = '';
  showParagraph = true;
  detailsLog = [];

  onResetUserName() {
    this.userName = '';
  }

  onDetailsClick() {
    this.showParagraph = !this.showParagraph;
    // this.detailsLog.push(this.detailsLog.length + 1);
    this.detailsLog.push(new Date());
  }
}
