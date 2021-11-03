import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';
  environments = ["Dev", "Prod"];
  agents = ["macbook-pro", "thinkpad-x270"]
}
