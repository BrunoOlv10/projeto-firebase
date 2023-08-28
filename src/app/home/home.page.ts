import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(data => {
      if (data)
        this.router.navigate(['/dashboard'])
    });
  }

  handleSignIn() {
    this.authService.signIn();
  }

}
