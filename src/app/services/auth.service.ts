import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private fs: AngularFirestore) {}

  login(): Observable<any> {
    return this.fs.collection("admin").valueChanges();
  }
}
