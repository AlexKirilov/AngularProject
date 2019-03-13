import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-message-handler',
  templateUrl: './message-handler.component.html',
  styleUrls: ['./message-handler.component.scss']
})
export class MessageHandlerComponent implements OnInit {

  private externalData = '';
  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    public dialogRef: MatDialogRef<MessageHandlerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // const cid = this.route.snapshot.paramMap.get('cid');
    // this.externalData = cid ? '?cid=' + cid : '';
  }

  navigateTo(link: string) {
    link = this.data.cid ? link += `${this.data.cid}` : link;
    this.router.navigateByUrl(`/${link}`);
  }

}
