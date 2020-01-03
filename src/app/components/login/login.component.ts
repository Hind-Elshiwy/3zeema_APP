import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loging = false;
  error = "";

  constructor(private as: AuthService, private router: Router) {}

  ngOnInit() {}

  login(form) {
    this.loging = true;
    this.error = "";
    this.as.login().subscribe(admins => {
      let admin = admins[0];
      if (
        admin &&
        admin.email === form.value.email &&
        admin.password === form.value.password
      ) {
        this.loging = false;
        this.error = "";
        localStorage.setItem("isAdmin", "true");
        window.location.pathname = "/";
      } else {
        this.loging = false;
        this.error = "Email or Password is incorrect";
      }
    });
  }
}
