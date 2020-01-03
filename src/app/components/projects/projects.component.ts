import { Component, OnInit } from "@angular/core";
import { ProjectService } from "src/app/services/project.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  projects;

  constructor(private ps: ProjectService) {}

  ngOnInit() {
    this.ps.getAllProjects().subscribe(projects => {
      console.log(projects)
      this.projects = projects
    });
  }

  delete(i) {
    let confirmResult = confirm(
      "Deleting " + this.projects[i].name + "\nAre you sure ?"
    );
    if (confirmResult) {
      this.ps.deleteProject(this.projects[i].id);
    }
  }
}
