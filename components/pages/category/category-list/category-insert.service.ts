import {Injectable, ViewChild} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {NotifyMessageService} from "../../../../services/notify-message.service.ts.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
  providedIn: 'root'
})



export class CategoryInsertService {

  private _categoryListComponent: CategoryListComponent;

  constructor(private notifyMessage: NotifyMessageService) {
  }

  set categoryListComponent(value: CategoryListComponent){
    this._categoryListComponent = value;
  }

  showModalInsert() {
    this._categoryListComponent.categoryNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    this.notifyMessage.success('Categoria cadastrada com sucesso.');
    this._categoryListComponent.getCategories();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao criar categoria.');
  }
}
