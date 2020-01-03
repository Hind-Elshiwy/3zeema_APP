import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private st: AngularFireStorage,
    private fs: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  addUser(email, password, name, fullName, project, image) {
    return new Promise((resolve, reject) => {
      this.auth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          let ref = this.st.ref(
            "usersImage/" +
              user.user.uid +
              "." +
              image.slice(image.indexOf("/") + 1, image.indexOf(";"))
          );
          ref
            .putString(image, "data_url", {
              contentType: image.slice(
                image.indexOf(":") + 1,
                image.indexOf(";")
              )
            })
            .then(() => {
              ref.getDownloadURL().subscribe(url => {
                this.fs
                  .doc("users/" + user.user.uid)
                  .set({
                    username: email,
                    id: user.user.uid,
                    project: project,
                    name: name,
                    fullName: fullName,
                    image: url
                  })
                  .then(() => {
                    resolve();
                  });
              });
            });
        });
    });
  }

  getAllUsers() {
    return this.fs.collection("users").valueChanges();
  }

  getUser(id): Observable<any> {
    return this.fs.doc("users/" + id).valueChanges();
  }

  editUser(user, newImage) {
    return new Promise((resolve, reject) => {
      if (newImage) {
        let ref = this.st.ref(
          "usersImage/" +
            user.id +
            "." +
            newImage.slice(newImage.indexOf("/") + 1, newImage.indexOf(";"))
        );
        ref
          .putString(newImage, "data_url", {
            contentType: newImage.slice(
              newImage.indexOf(":") + 1,
              newImage.indexOf(";")
            )
          })
          .then(() => {
            ref.getDownloadURL().subscribe(url => {
              user.image = url;
              this.fs
                .doc("users/" + user.id)
                .set(user)
                .then(() => {
                  resolve();
                });
            });
          });
      } else {
        this.fs
          .doc("users/" + user.id)
          .set(user)
          .then(() => {
            resolve();
          });
      }
    });
  }
}
