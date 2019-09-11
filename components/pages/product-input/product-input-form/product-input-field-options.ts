import {FieldsOptions} from "../../../../common/fields-options";

const productInputFieldOptions: FieldsOptions = {
  product_id: {
    id: 'product_id',
    label: 'Produto',
  },
  amount: {
    id: 'amount',
    label: 'Quantidade',
    validationMessage: {
      min: 1
    }
  }
};

export default productInputFieldOptions;
