/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
// import {} from "googlemaps";
import { ProjectService } from "src/app/services/project.service";
import { Validators, FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"]
})
export class AddProjectComponent implements OnInit, AfterViewInit {
  @ViewChild("map", { static: false }) mapContainer: any;
  map: google.maps.Map;
  adding;
  success;
  error;
  marker;
  projectForm: FormGroup;
  branches: FormArray;
  constructor(private ps: ProjectService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      projectName: ["", [Validators.required]],
      areaSize: [0, [Validators.required]],
      long: [31.3386764, [Validators.required]],
      lat: [30.0865862, [Validators.required]],
      branches: this.formBuilder.array([])
    });
  }

  createBranch(): FormGroup {
    return this.formBuilder.group({
      name: '',
      areaSize: 0,
      long: 31.3386764,
      lat: 30.0865862
    });
  }
  addBranch(): void {
    this.branches = this.projectForm.get('branches') as FormArray;
    this.branches.push(this.createBranch());
  }
  ngAfterViewInit() {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: new google.maps.LatLng(30.0865862, 31.3386764),
      zoom: 12
    });
    this.marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(30.0865862, 31.3386764)
    });
    this.map.addListener("click", e => {
      this.projectForm.get('lat').setValue(e.latLng.lat());
      this.projectForm.get('long').setValue(e.latLng.lng());
      this.marker.setPosition(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
    });
  }
  changeMarker() {
    let long =  this.projectForm.get('long').value
    let lat =  this.projectForm.get('lat').value
    this.marker.setPosition(new google.maps.LatLng(lat, long));
  }
  addProject() {
    console.log(this.projectForm.value)
    let {projectName, areaSize, lat, long, branches}= this.projectForm.value
    this.adding = true;
    this.success = false;
    this.error = "";
    this.ps
      .addNewProject(projectName, areaSize, lat, long, branches)
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
