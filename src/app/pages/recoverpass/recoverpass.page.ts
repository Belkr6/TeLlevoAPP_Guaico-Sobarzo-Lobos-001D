import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss'],
})
export class RecoverpassPage implements OnInit {
email: any
  constructor(public AuthService: FirestoreService, public route: Router) { }

  ngOnInit() {
  }

  async rstPassword(email: string) {
    try {
      await this.AuthService.resetPassword(email);
      console.log('Email sent');
      this.route.navigate(['/register']);
    } catch (error) {
      console.log(error);
    }
  

  }
}