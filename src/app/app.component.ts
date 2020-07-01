import { Component } from '@angular/core';
import { UserAuth } from './models/userauth';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IoTeMidoCliente';
  securityObject: UserAuth = null;

  constructor(private service: SecurityService) {
    this.securityObject = this.service.securityObject;
  }

  logout() {
    this.service.logout();
  }
}
