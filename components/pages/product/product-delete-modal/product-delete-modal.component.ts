import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent implements OnInit {

  product = null;
  _productId: number;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;

  constructor(public productHttp: ProductHttpService) {
  }
  ngOnInit() {
  }

  @Input()
  set productId(value) {
    this._productId = value;
    if(this._productId){
      this.productHttp
        .get(this._productId)
        .subscribe(product => this.product = product)
    }
  }

  destroy(){
    this.productHttp
      .destroy(this._productId)
      .subscribe((product) =>{
        this.onSuccess.emit(product);
        this.modal.hide();
      },error => this.onError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

}
