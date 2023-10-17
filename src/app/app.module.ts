import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from  '@angular/fire/compat/database';
import { firebaseConfig } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { ReactiveFormsModule } from '@angular/forms';

import 'firebase/firestore';
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

firebase.initializeApp(environment.firebaseConfig);
const db = firebase.firestore();
console.log(db);

@NgModule({
  declarations: [AppComponent],
    imports: [BrowserModule, 
              IonicModule.forRoot(),
              AppRoutingModule,
              AngularFireModule.initializeApp(environment.firebaseConfig),
              AngularFireAuthModule,
              AngularFireDatabaseModule,
              FirestoreModule,
              FormsModule ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
  })
  export class AppModule {}

