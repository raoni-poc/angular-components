import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, ProductPhoto} from "../../../../models.js";
import {ProductPhotoEditModalComponent} from "../product-photo-edit-modal/product-photo-edit-modal.component.js";
import {ProductPhotoDeleteModalComponent} from "../product-photo-delete-modal/product-photo-delete-modal.component.js";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service.js";
import {NotifyMessageService} from "../../../../services/notify-message.service.ts.service.js";

declare const $;

@Component({
  selector: 'product-photo-manager',
  templateUrl: './product-photo-manager.component.html',
  styleUrls: ['./product-photo-manager.component.css']
})

export class ProductPhotoManagerComponent implements OnInit {

  photos: ProductPhoto[] = [];
  product: Product = null;
  productId: number;
  photoIdtoEdit: number;
  photoIdToDelete: number;

  @ViewChild(ProductPhotoEditModalComponent, {static: false}) editModal: ProductPhotoEditModalComponent;

  @ViewChild(ProductPhotoDeleteModalComponent, {static: false}) deleteModal: ProductPhotoDeleteModalComponent;

  constructor(private productPhotoHttp: ProductPhotoHttpService,
              private route: ActivatedRoute,
              private notifyMessage: NotifyMessageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getPhotos();
    });
    this.configFancybox();
    console.log(this.editModal);
  }

  getPhotos() {
    this.productPhotoHttp
      .list(this.productId)
      .subscribe(data => {
        this.photos = data.photos;
        this.product = data.product;
      });
  }

  configFancybox() {
    $.fancybox.defaults.btnTpl.edit = `
    <a class="fancybox-button" data-fancybox-edit 
        title="Substituir" href="javascript:void(0)" style="text-align: center">
            <i class="fas fa-edit"></i>    
    </a>
    $.fancybox.defaults.btnTpl.delete = \`
    <a class="fancybox-button" data-fancybox-delete 
        title="Excluir" href="javascript:void(0)" style="text-align: center">
            <i class="fas fa-trash"></i>    
    </a>
    `
    $.fancybox.defaults.buttons = ['download', 'edit', 'delete'];
    $('body').on('click', '[data-fancybox-edit]', (e) => {
      this.photoIdtoEdit = this.getPhotoIdFromSlideShow();
      this.editModal.showModal();
    });
    $('body').on('click', '[data-fancybox-delete]', (e) => {
      this.photoIdToDelete = this.getPhotoIdFromSlideShow();
      this.deleteModal.showModal();
    });
  }

  getPhotoIdFromSlideShow() {
    const src = $('.fancybox-slide--current .fancybox-image').attr('src');
    const id = $('[data-fancybox="gallery"]').find(`[src="${src}"]`).attr('id');
    return id.split('-')[1];

  }

  onInsertSuccess(data: { photos: ProductPhoto[] }) {
    this.photos.push(...data.photos);
    this.notifyMessage.success('Foto(s) cadastrada(s) com sucesso.');
  }

  onEditSuccess(data: ProductPhoto) {
    $.fancybox.getInstance().close();
    this.editModal.hideModal();
    const index = this.photos.findIndex((photo: ProductPhoto) => {
      return photo.id == this.photoIdtoEdit
    });
    this.photos[index] = data;
    this.notifyMessage.success('Foto Substituida com sucesso');
  }

  onDeleteSuccess(data: ProductPhoto) {
    $.fancybox.getInstance().close();
    this.deleteModal.hideModal();
    const index = this.photos.findIndex((photo: ProductPhoto) => {
      return photo.id == this.photoIdtoEdit
    });
    this.photos.splice(index, 1);
    this.notifyMessage.success('Foto Excluida com sucesso');
  }

}
