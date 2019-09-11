import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Category} from "../../../../models";
import {FormGroup} from "@angular/forms";
import fieldOptions from "./category-field-options";

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, OnChanges {

  @Input()
  form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.changeRef.detectChanges();
  }

  get fieldOptions(): any{
    return fieldOptions;
  }

}
