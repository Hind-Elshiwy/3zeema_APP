import { Component, OnInit } from "@angular/core";
import { ProjectService } from "src/app/services/project.service";
import { UserService } from "src/app/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
  projects = [];
  user;
  adding;
  success;
  error;

  constructor(
    private ps: ProjectService,
    private us: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ps.getAllProjects().subscribe(projects => {
      this.projects = projects;
      this.us
        .getUser(this.route.snapshot.paramMap.get("id"))
        .subscribe(user => {
          user.project = this.projects.findIndex(
            project => (project.id = user.project.id)
          );
          this.user = user;
        });
    });
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

  save() {
    this.adding = true;
    this.success = false;
    this.error = "";
    this.user.project = this.projects[this.user.project];
    this.us
      .editUser(this.user, this.croppedImage)
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
