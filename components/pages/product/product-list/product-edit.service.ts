import {Injectable} from "@angular/core";
import {ProductListComponent} from "../../product/product-list/product-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service.ts.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ProductEditService {

  private _productListComponent: ProductListComponent;

  constructor(private notifyMessage: NotifyMessageService) {
  }

  set productListComponent(value: ProductListComponent){
    this._productListComponent = value;
  }

  showModalEdit(productId: number){
    this._productListComponent.productId = productId;
    this._productListComponent.productEditModal.showModal();
  }

  onEditSuccess($event: any) {
    console.log($event);
    this._productListComponent.getProducts();
    this.notifyMessage.success('Produto Editado com sucesso.')
  }

  onEditError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao editar produto.')
  }

}
