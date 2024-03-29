import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {CategoryInsertService} from "./category-insert.service";
import {CategoryEditService} from "./category-edit.service";
import {CategoryDeleteService} from "./category-delete.service";
import {Category} from "../../../../models";

declare let $;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15,
  };
  sortColumn = {column: 'created_at', sort: 'desc'};
  searchText: string;

  @ViewChild(CategoryNewModalComponent, {static: false})
  categoryNewModal: CategoryNewModalComponent;

  @ViewChild(CategoryEditModalComponent, {static: false})
  categoryEditModal: CategoryEditModalComponent;

  @ViewChild(CategoryDeleteModalComponent, {static: false})
  categoryDeleteModal: CategoryDeleteModalComponent;

  categoryId: number;

  constructor(private categoryHttp: CategoryHttpService,
              protected categoryInsertService: CategoryInsertService,
              protected categoryEditService: CategoryEditService,
              protected categoryDeleteService: CategoryDeleteService
  ) {
    this.categoryInsertService.categoryListComponent = this;
    this.categoryEditService.categoryListComponent = this;
    this.categoryDeleteService.categoryListComponent = this;
  };

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this.categoryHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    }).subscribe(response => {
      this.categories = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page
    })
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getCategories();
  }

  sort(sortColumn){
    this.getCategories();
  }

  search(search){
    this.searchText = search;
    this.getCategories()
  }


}
