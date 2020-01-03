import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { UsersComponent } from "./components/users/users.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { AddProjectComponent } from "./components/add-project/add-project.component";
import { EditProjectComponent } from "./components/edit-project/edit-project.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "Attendance", component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: "add-user",
    component: AddUserComponent,
    canActivate: [AuthGuardService]
  },
  { path: "users", component: UsersComponent, canActivate: [AuthGuardService] },
  {
    path: "users/:id",
    component: EditUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "projects",
    component: ProjectsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "projects/:id",
    component: EditProjectComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "add-project",
    component: AddProjectComponent,
    canActivate: [AuthGuardService]
  },
  { path: "login", component: LoginComponent },
  { path: ":date", component: HomeComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
