import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private fs: AngularFirestore) {}

  getData(date) {
    return this.fs.collection("/attendance/" + date + "/users").valueChanges();
  }

  getAllProjects() {
    return this.fs.collection("projects").valueChanges();
  }

  getProject(id): Observable<any> {
    return this.fs.doc("projects/" + id).valueChanges();
  }

  addNewProject(name, area, lat, long, branches = []) {
    return this.fs
      .collection("projects")
      .add({
        id: "",
        name: name,
        areaSize: area,
        location: new firebase.firestore.GeoPoint(lat, long),
        branches: branches
      })
      .then(doc => {
        return this.fs.doc("projects/" + doc.id).update({ id: doc.id });
      });
  }

  editProject(id, name, area, lat, long, branches=[]) {
    return this.fs.doc("projects/" + id).set({
      id: id,
      name: name,
      areaSize: area,
      location: new firebase.firestore.GeoPoint(lat, long),
      branches: branches
    });
  }

  deleteProject(id) {
    return this.fs.doc("projects/" + id).delete();
  }
}
