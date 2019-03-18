import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Unsubscribable } from 'rxjs';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';
import { ModalHandlerService } from '../../services/modal-handler.service';
import { HandleErrorsService } from 'src/app/services/handle-errors.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  public ifAdmin: Boolean;
  public images = '';
  public imageNames = [];

  private unscData: Unsubscribable;
  private unscGetGallery: Unsubscribable;

  constructor(
    private datastore: DatastoreService,
    private datashare: DatashareService,
    private modalwindow: ModalHandlerService,
    private errorHandler: HandleErrorsService,
  ) {
    this.datashare.ifAdmin.subscribe((bool) => {
      this.ifAdmin = bool;
    });
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.unscData) { this.unscData.unsubscribe(); }
    if (this.unscGetGallery) { this.unscGetGallery.unsubscribe(); }
  }

  getData() {
    this.unscGetGallery = this.datastore.getGallery().subscribe(
      (images) => {
        if (images.length > 0) {
          this.imageNames = images[0].images;
          this.images = images[0].images.join(', ');
        } else {
          this.images = this.imageNames = images;
        }
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }

  preview() {
    this.imageNames = this.images.split(',').filter(function (item) {
      return item.trim() !== '';
    }).map(function (item) {
      return item.trim();
    });
  }

  save() {
    let tmp = [];
    if (this.images !== '') {
      tmp = this.images.split(',').filter(function (item) {
        return item.trim() !== '';
      }).map(function (item) {
        return item.trim();
      });
      this.unscData = this.datastore.addToGallery({ images: tmp }).subscribe(
        () => this.getData(),
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      );
    }
  }

  openImage(path: any) {
    this.modalwindow.openModalImage(path);
  }
}
