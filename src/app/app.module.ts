import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";

import { ImageCropperModule } from "ngx-image-cropper";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { UsersComponent } from "./components/users/users.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { AddProjectComponent } from "./components/add-project/add-project.component";
import { EditProjectComponent } from "./components/edit-project/edit-project.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserComponent,
    UsersComponent,
    ProjectsComponent,
    AddProjectComponent,
    EditProjectComponent,
    EditUserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageCropperModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDxcZwsxebHLtgsG3Y867gW8LdHa77W-04",
      authDomain: "azeemaattendance.firebaseapp.com",
      databaseURL: "https://azeemaattendance.firebaseio.com",
      projectId: "azeemaattendance",
      storageBucket: "azeemaattendance.appspot.com",
      messagingSenderId: "160630262035",
      appId: "1:160630262035:web:7a71d842e3d5d503"
    }),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
