import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-message-handler',
  templateUrl: './message-handler.component.html',
  styleUrls: ['./message-handler.component.scss']
})
export class MessageHandlerComponent implements OnInit {

  public setManually = false;
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<MessageHandlerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  navigateTo(link: string) {
    link = this.data.cid ? link += `${this.data.cid}` : link;
    this.router.navigateByUrl(`/${link}`);
  }

}
