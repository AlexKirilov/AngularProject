import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '../../../../node_modules/@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Modal window data: ', data);
    if (data.modal === 'image') {
      const newClass = document.getElementsByTagName('mat-dialog-container');
      newClass[0].classList.add('image-transperant');
    }
  }

  navigateTo(link: string) {
    link = this.data.cid ? link += `${this.data.cid}` : link;
    this.router.navigateByUrl(`/${link}`);
  }
}
