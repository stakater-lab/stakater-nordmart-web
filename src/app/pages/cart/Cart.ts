import {Product} from "../store/Product";
import {jsonProperty} from "../../shared/decorators/json-property";

export class CartItem {
  @jsonProperty()
  price: number;

  @jsonProperty()
  product: Product;

  @jsonProperty()
  promoSavings: number;

  @jsonProperty()
  quantity: number;

  get total() {
    return this.quantity * (this.product.price - this.promoSavings);
  }
}

export class Cart {
  @jsonProperty()
  cartId: string;

  @jsonProperty()
  cartItemPromoSavings: number;

  @jsonProperty()
  cartItemTotal: number;

  @jsonProperty()
  cartTotal: number;

  @jsonProperty()
  shippingPromoSavings: number;

  @jsonProperty()
  shippingTotal: number;

  @jsonProperty({
    type: CartItem
  })
  shoppingCartItemList: CartItem[];
}
