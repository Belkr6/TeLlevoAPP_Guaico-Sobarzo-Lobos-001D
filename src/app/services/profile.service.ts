import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Profile } from '../models/profile.model';
import {tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


  

  export class ProfileService {
    private profileDoc!: AngularFirestoreDocument<Profile>;

    constructor(private afs: AngularFirestore) { }

    createProfile(uid: string, profile: Profile): Promise<void> {
      this.profileDoc = this.afs.doc<Profile>(`profiles/${uid}`);
      return this.profileDoc.set(profile);
    }

    getProfile(uid: string): Observable<Profile> {
      this.profileDoc = this.afs.doc<Profile>(`profiles/${uid}`);
      return this.profileDoc.valueChanges().pipe(
        // Filter out undefined values
        filter((profile): profile is Profile => !!profile),
        tap(profile => console.log(profile)) // Log the retrieved profile to the console
      );
    }

    updateProfile(uid: string, profile: Profile): Promise<void> {
      this.profileDoc = this.afs.doc<Profile>(`profiles/${uid}`);
      return this.profileDoc.update(profile);
    }
  }

  



  