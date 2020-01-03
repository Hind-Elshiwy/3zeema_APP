import { Component, OnInit, ViewChild } from "@angular/core";
// import {} from "googlemaps";
import { ProjectService } from "src/app/services/project.service";
import { ActivatedRoute } from "@angular/router";
import { Validators, FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.css"]
})
export class EditProjectComponent implements OnInit {
  @ViewChild("map", { static: false }) mapContainer: any;
  map: google.maps.Map;
  adding;
  success;
  error;
  marker;
  showAddBranchForm=false;
  projectForm: FormGroup;
  branches: FormArray;
  id;
  constructor(private route: ActivatedRoute, private ps: ProjectService, private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.projectForm = this.formBuilder.group({
      projectName: ["", [Validators.required]],
      areaSize: [0, [Validators.required]],
      long: [31.3386764, [Validators.required]],
      lat: [30.0865862, [Validators.required]],
    });
    this.ps.getProject(this.id).subscribe(projectData => {
      console.log(projectData);
      this.projectForm = this.formBuilder.group({
        projectName: [projectData.name, [Validators.required]],
        areaSize: [projectData.areaSize, [Validators.required]],
        long: [projectData.location.longitude, [Validators.required]],
        lat: [projectData.location.latitude, [Validators.required]],
        branches: this.formBuilder.array([])
      });
      if(projectData.branches.length > 0){
        projectData.branches.forEach(branch => {
          this.addBranch(branch);
        })
      }
    });
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

  addBranch(data?): void {
    this.branches = this.projectForm.get('branches') as FormArray;
    this.branches.push(this.createBranch(data || {}));
  }

  createBranch(branch?): FormGroup {
    return this.formBuilder.group({
      name: branch.name? branch.name : '',
      areaSize: branch.areaSize? branch.areaSize : 0,
      long: branch.long? branch.long : 30.0865862,
      lat: branch.lat? branch.lat : 31.3386764
    });
  }
 
  changeMarker() {
    let long =  this.projectForm.get('long').value
    let lat =  this.projectForm.get('lat').value
    this.marker.setPosition(new google.maps.LatLng(lat, long));
  }
  save() {
    console.log(this.projectForm.value)
    let {projectName, areaSize, lat, long, branches}= this.projectForm.value
    this.adding = true;
    this.success = false;
    this.error = "";
    this.ps
      .editProject(this.id, projectName, areaSize, lat, long, branches)
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
