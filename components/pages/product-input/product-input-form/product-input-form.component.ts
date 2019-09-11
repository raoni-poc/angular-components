import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import productInputFieldOptions from "./product-input-field-options";
import {ProductIdFieldService} from "./product-id-field.service";
import {Select2Component} from "ng2-select2";

@Component({
  selector: 'product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.css']
})
export class ProductInputFormComponent implements OnInit {

  @Input()
  form: FormGroup;

  @ViewChild(Select2Component, {static: false, read: ElementRef})
  select2Element: ElementRef;

  constructor(private changeRef: ChangeDetectorRef,
              public productIdField: ProductIdFieldService) { }

  ngOnInit() {
    this.productIdField.make(this.select2Element, this.form.get('product_id'))
  }

  ngOnChanges(): void {
    this.changeRef.detectChanges();
  }

  get fieldOptions(): any{
    return productInputFieldOptions;
  }
}
