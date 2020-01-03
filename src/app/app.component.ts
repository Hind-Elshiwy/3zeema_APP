import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  navOpen = false;
  isAdmin = false;

  constructor(private router: Router) {
    this.isAdmin = localStorage.getItem("isAdmin") === "true";
  }

  logout() {
    localStorage.clear();
    this.isAdmin = false;
    this.router.navigate(["/login"]);
  }
}
