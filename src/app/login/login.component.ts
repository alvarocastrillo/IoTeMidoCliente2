import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserAuth } from '../models/userauth';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';
import { tokens } from '../tokens/token';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  securityObject: UserAuth = null;
  returnUrl = '/red';
  errorMessage = '';

  constructor(
    private service: SecurityService,
    private router: Router, private token:tokens
  ) { }

  ngOnInit() {
  }

  login() {
    this.errorMessage = '';

    this.service.login(this.user).subscribe(
      resp => {
        this.securityObject = resp;
        let nombre = this.token.ObtenerNombreUsuario();
        let id = this.token.ObtenerIdUsuario();
        this.router.navigateByUrl(this.returnUrl);
      },
      error => this.errorMessage = error
    )
    
  }
}
