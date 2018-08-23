import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { ModalHandlerService } from '../../services/modal-handler.service';
import { DatashareService } from '../../services/datashare.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  ifAdmin;
  images = '';
  imageNames = [];
  constructor(
    private datastore: DatastoreService,
    private datashare: DatashareService,
    private modalwindow: ModalHandlerService,
  ) {
    this.datashare.ifAdmin.subscribe( (bool) => {
      this.ifAdmin = bool;
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData () {
    this.datastore.getGallery( (images) => {
      if (images.length > 0) {
      this.imageNames = images[0].images;
      this.images = images[0].images.join(', ');
      } else {
        this.images = this.imageNames = images;
      }
    });
  }

  preview() {
    this.imageNames = this.images.split(',').filter(function(item) {
      return item.trim() !== '';
    }).map(function(item) {
      return item.trim();
    });
  }

  save() {
    let tmp = [];
    if (this.images !== '') {
      tmp = this.images.split(',').filter(function(item) {
        return item.trim() !== '';
      }).map(function(item) {
        return item.trim();
      });
      this.datastore.addToGallery({ images: tmp}, (r) => { this.getData(); });
    }
  }

  openImage(path) {
    this.modalwindow.openModalImage(path);
  }
}
