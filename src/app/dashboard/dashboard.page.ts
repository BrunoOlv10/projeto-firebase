import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public user: firebase.User | null = null;

  constructor(private router: Router, public authService: AuthService) {
    this.authService.isAuthenticated().subscribe((data) => {
      this.user = data;

      if (!this.user)
        this.router.navigate(['/home']);
    });

    console.log(1, this.user)
  }

  ngOnInit() {
    console.log(2, this.user);
  }
}
