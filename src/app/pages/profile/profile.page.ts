import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: Profile;
  editing = false;
  bio: string;
  constructor(private router : Router ,private db: AngularFireDatabase, private profileService: ProfileService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.profileService.getProfile(user.uid).subscribe(profile => {
          this.profile = profile;
          this.bio = profile.bio;
        });
      }
    });
  }

  startEditing() {
    this.editing = true;
  }
  goToActionSheet() {
    this.router.navigate(['/action-sheet']);
  }

  saveBio() {
    if (this.profile) {
      const newProfile: Profile = {
        uid: this.profile.uid,
        name: this.profile.name,
        email: this.profile.email,
        username: this.profile.username,
        password: this.profile.password,
        role: this.profile.role,
        bio: this.bio
      };
  
      this.profileService.updateProfile(this.profile.uid, newProfile).then(() => {
        this.editing = false;
      }).catch(error => {
        console.log(error);
      });
    }
  }

}
