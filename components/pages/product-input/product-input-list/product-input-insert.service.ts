import {Injectable, ViewChild} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service.ts.service";
import { ProductInputListComponent } from './product-input-list.component';

@Injectable({
  providedIn: 'root'
})

export class ProductInputInsertService {

  private _inputListComponent: ProductInputListComponent;

  constructor(private notifyMessage: NotifyMessageService) {
  }

  set inputListComponent(value: ProductInputListComponent){
    this._inputListComponent = value;
  }

  showModalInsert() {
    this._inputListComponent.inputNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    this.notifyMessage.success('Produto cadastrado com sucesso.');
    this._inputListComponent.getInputs();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao inserir produto.');
  }
}
