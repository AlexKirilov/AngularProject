import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { DatashareService } from "../../services/datashare.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DatastoreService } from "../../services/datastore.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-resetpass",
  templateUrl: "./resetpass.component.html",
  styleUrls: ["./resetpass.component.scss"]
})
export class ResetpassComponent implements OnInit {
  public passNotMatch = false;
  public signin: FormGroup;
  private data: any = {};
  public btnSubmitValidation = false;
  public barLabel = '';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  
  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private route: ActivatedRoute,
    private datashare: DatashareService,
    private datastore: DatastoreService
  ) {
    this.titleService.setTitle("Reset Password");
    this.datashare.changeCurrentPage("resetpass");
    this.signin = fb.group({
      password: ["", Validators.required],
      repassword: ["", Validators.required]
    });
  }

  ngOnInit() {}

  checkpass() {
    if (
      this.signin.value.password !== "" &&
      this.signin.value.repassword !== ""
    ) {
      const tmp = this.signin.value.password === this.signin.value.repassword;
      this.passNotMatch = !tmp;
      this.btnSubmitValidation = true;
      return tmp;
    }
    this.btnSubmitValidation = false;
    return false;
  }

  changePass() {
    if (this.checkpass()) {
      const params: any = this.route.queryParams;
      this.data.cid = params.value.cid;
      this.data.sd = params.value.sd;
      this.data.sid = params.value.sid;

      this.datastore.resetPass({
        data: this.data,
        newpass: this.signin.value.repassword
      }).pipe(take(1)).subscribe( data => console.log('reset data: ', data));
    }
  }

  validUserData() {}
}
