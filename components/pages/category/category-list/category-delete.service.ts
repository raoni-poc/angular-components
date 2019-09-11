import {Injectable, ViewChild} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {NotifyMessageService} from "../../../../services/notify-message.service.ts.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
  providedIn: 'root'
})

export class CategoryDeleteService {

  private _categoryListComponent: CategoryListComponent;

  constructor(private notifyMessage: NotifyMessageService) {
  }

  set categoryListComponent(value: CategoryListComponent){
    this._categoryListComponent = value;
  }

  showModalDelete(categoryId: number){
    this._categoryListComponent.categoryId = categoryId;
    this._categoryListComponent.categoryDeleteModal.showModal();
  }

  onDeleteSuccess($event: any) {
    console.log($event);
    this._categoryListComponent.getCategories();
    this.notifyMessage.success(`Categoria excluida com sucesso`);
  }

  onDeleteError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error(`Não foi possível excluir a categoria. 
    Verifique se a mesma não esta relacionada com produtos.`);
  }
}
