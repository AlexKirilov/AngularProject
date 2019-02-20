import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-message-handler',
  templateUrl: './message-handler.component.html',
  styleUrls: ['./message-handler.component.scss']
})
export class MessageHandlerComponent {

  constructor(
    public dialogRef: MatDialogRef<MessageHandlerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data.msgType: ', data);
  }
}
