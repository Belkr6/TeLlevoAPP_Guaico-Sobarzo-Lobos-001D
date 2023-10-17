import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';


  @Component({
    selector: 'app-action-sheet',
    templateUrl: './action-sheet.page.html',
    styleUrls: ['./action-sheet.page.scss'],
  })
  export class ActionSheetPage implements OnInit {
    profile: Profile;
    name: string;
    isModalOpen = false;
    role: string;
    constructor(private fs: FirestoreService,private router: Router, private db: AngularFireDatabase, private profileService: ProfileService, private afAuth: AngularFireAuth) { }

    ngOnInit() {
      this.afAuth.user.subscribe(user => {
        if (user) {
          this.profileService.getProfile(user.uid).subscribe(profile => {
            this.profile = profile;
            this.role = profile.role;
            this.name = profile.name;
            
          });
        }
      });
    }

    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }

    irARegistro() {
      this.router.navigate(['/register']);
    }

    SignOut() {
      this.fs.signOut();
    }
  }
  
  

