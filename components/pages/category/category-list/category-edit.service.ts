import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service.ts.service";
import {CategoryListComponent} from "./category-list.component";

@Injectable({
  providedIn: 'root'
})

export class CategoryEditService {

  private _categoryListComponent: CategoryListComponent;

  constructor(private notifyMessage: NotifyMessageService) {
  }

  set categoryListComponent(value: CategoryListComponent){
    this._categoryListComponent = value;
  }

  showModalEdit(categoryId: number){
    this._categoryListComponent.categoryId = categoryId;
    this._categoryListComponent.categoryEditModal.showModal();
  }

  onEditSuccess($event: any) {
    console.log($event);
    this._categoryListComponent.getCategories();
    this.notifyMessage.success('Categoria Editada com sucesso.')
  }

  onEditError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao editar categoria.')
  }
}
