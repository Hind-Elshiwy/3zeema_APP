import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { ProjectService } from "src/app/services/project.service";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  projects = [];
  adding;
  success;
  error;

  constructor(private us: UserService, private ps: ProjectService) {}

  ngOnInit() {
    this.ps.getAllProjects().subscribe(projects => (this.projects = projects));
  }

  imageChangedEvent: any = "";
  croppedImage: any = "";

  fileChangeEvent(event: any): void {
    if (!event.target.files[0]) {
      this.croppedImage = "";
      this.imageChangedEvent = "";
    } else {
      this.imageChangedEvent = event;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  addUser(email, password, name, fullName, project) {
    this.adding = true;
    this.success = false;
    this.error = "";
    this.us
      .addUser(
        email,
        password,
        name,
        fullName,
        this.projects[project],
        this.croppedImage
      )
      .then(() => {
        this.adding = false;
        this.success = true;
        this.error = "";
      })
      .catch(err => {
        this.adding = false;
        this.success = false;
        this.error = err;
      });
  }
}
