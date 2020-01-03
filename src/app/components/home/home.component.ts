import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "src/app/services/project.service";
import { FileService } from "src/app/services/file.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  date;
  data = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ps: ProjectService,
    private fs: FileService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let dateParam = params.get("date");
      if (dateParam) {
        this.date = dateParam;
        this.getData();
      } else {
        let now = new Date();
        this.date =
          new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            2
          ).getTime() / 1000;
        this.getData();
      }
    });
  }

  getData() {
    this.ps.getData(this.date).subscribe(data => {
      this.data = (data as any[]).map((d, i) => {
        let fd = { no: i + 1 };

        fd["Employee ID"] = d.user.id;
        fd["Employee name"] = d.user.fullName;
        fd["Project name"] = d.user.project.name;

        if (d.checkIn) {
          fd["Check in date"] = new Date(
            d.checkIn.time.seconds * 1000
          ).toDateString();
          fd["Check in time"] = new Date(
            d.checkIn.time.seconds * 1000
          ).toTimeString();
          fd["Check in image"] = d.checkIn.image || undefined;
        } else {
          fd["Check in date"] = "not available";
          fd["Check in time"] = "not available";
          fd["Check in image"] = undefined;
        }

        if (d.checkOut) {
          fd["Check out date"] = new Date(
            d.checkOut.time.seconds * 1000
          ).toDateString();
          fd["Check out time"] = new Date(
            d.checkOut.time.seconds * 1000
          ).toTimeString();
          fd["Check out image"] = d.checkOut.image || undefined;
        } else {
          fd["Check out date"] = "not available";
          fd["Check out time"] = "not available";
          fd["Check out image"] = undefined;
        }

        if (d.checkIn.location) {
          fd["Google map link"] =
            "https://maps.google.com/?q=" +
            d.checkIn.location.latitude +
            "," +
            d.checkIn.location.longitude;
        } else {
          fd["Google map link"] = undefined;
        }
        return fd;
      });
    });
  }

  show(value) {
    let now = new Date(value);
    let date =
      new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        2
      ).getTime() / 1000;
    this.router.navigate(["/" + date]);
  }

  exel() {
    this.fs.exel(this.data, "Dashboard");
  }

  pdf() {
    let head = [
      [
        "no",
        "Employee ID",
        "Employee name",
        "Project name",
        "Check in date",
        "Check out date",
        "Check in time",
        "Check out time",
        "Check in image",
        "Check out image",
        "Google map link"
      ]
    ];
    let table = document.getElementById("table");
    let tr = table.querySelectorAll("tr");
    let body = [];
    tr.forEach(t => body.push(Array.from(t.querySelectorAll("td"))));
    body.forEach(b => {
      for (let i = 0; i < b.length; i++) {
        b[i] = b[i].textContent;
      }
    });
    this.fs.pdf(head, body, "Dashboard");
  }
}
