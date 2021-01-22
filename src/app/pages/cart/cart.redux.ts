import {Action} from "nested-combine-reducers/dist/types";
import {Cart} from "./Cart";
import {CallBack} from "../../typings";
import {ApiAction} from "../../shared/redux/api-action";
import {addToCartAPI, checkoutAPI, getCartActionAPI, removeFromCartAPI} from "./cart.service";
import {Epic} from "redux-observable";
import {createAPIEpic} from "../../shared/redux/api-epic";
import {createSelector} from "reselect";
import {Product} from "../store/Product";

export const GET_CART = "cart/get";
export const GET_CART_SUCCESS = "cart/get/success";
export const GET_CART_FAILED = "cart/get/failed";

export class GetCartAction extends ApiAction {
  public type = GET_CART;
  public api$ = getCartActionAPI()

  constructor(public successCb?: CallBack) {
    super();
  }
}

export class GetCartSuccessAction implements Action {
  public type = GET_CART_SUCCESS;

  constructor(public origin: GetCartAction, public cart: Cart) {

  }
}

export class GetCartFailedAction implements Action {
  public type = GET_CART_FAILED;

  constructor(public error: Error) {

  }
}


export const ADD_TO_CART = "cart/add";
export const ADD_TO_CART_SUCCESS = "cart/add/success";
export const ADD_TO_CART_FAILED = "cart/add/failed";

export class AddToCartAction extends ApiAction {
  public type = ADD_TO_CART;
  public api$ = addToCartAPI(this.cartId, this.product, this.quantity);

  constructor(public cartId: string, public product: Product, public quantity: number, public successCb?: CallBack) {
    super();
  }
}

export class AddToCartSuccessAction implements Action {
  public type = ADD_TO_CART_SUCCESS;

  constructor(public origin: AddToCartAction, public cart: Cart) {

  }
}

export class AddToCartFailedAction implements Action {
  public type = ADD_TO_CART_FAILED;

  constructor(public error: Error) {

  }
}


export const REMOVE_FROM_CART = "cart/removeItem";
export const REMOVE_FROM_CART_SUCCESS = "cart/removeItem/success";
export const REMOVE_FROM_CART_FAILED = "cart/removeItem/failed";

export class RemoveFromCartAction extends ApiAction {
  public type = REMOVE_FROM_CART;
  public api$ = removeFromCartAPI(this.cartId, this.product, this.quantity);

  constructor(public cartId: string, public product: Product, public quantity: number, public successCb?: CallBack) {
    super();
  }
}

export class RemoveFromCartSuccessAction implements Action {
  public type = REMOVE_FROM_CART_SUCCESS;

  constructor(public origin: RemoveFromCartAction, public cart: Cart) {

  }
}

export class RemoveFromCartFailedAction implements Action {
  public type = REMOVE_FROM_CART_FAILED;

  constructor(public error: Error) {

  }
}


export const CHECKOUT = "cart/checkout";
export const CHECKOUT_SUCCESS = "cart/checkout/success";
export const CHECKOUT_FAILED = "cart/checkout/failed";

export class CheckoutAction extends ApiAction {
  public type = CHECKOUT;
  public api$ = checkoutAPI(this.cartId);

  constructor(public cartId: string, public successCb?: CallBack) {
    super();
  }
}

export class CheckoutSuccessAction implements Action {
  public type = CHECKOUT_SUCCESS;

  constructor(public origin: CheckoutAction) {

  }
}

export class CheckoutFailedAction implements Action {
  public type = CHECKOUT_FAILED;

  constructor(public error: Error) {

  }
}



type ACTIONS = GetCartSuccessAction & AddToCartSuccessAction;

interface ICartState {
  cart?: Cart;
}

const initialState: ICartState = {};

export function cartReducer(state: ICartState = initialState, action: ACTIONS) {
  switch (action.type) {
    case GET_CART_SUCCESS:
      return {
        ...state,
        cart: action.cart
      }
    case ADD_TO_CART_SUCCESS:
    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cart: action.cart
      }
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        cart: undefined
      }
    default:
      return state;
  }
}

export const CART_REDUX_KEY = "cart";
const root = (state: any): ICartState => state[CART_REDUX_KEY];
export const CART_SELECTOR = {
  cart: createSelector(root, cartState => cartState.cart)
}

export const CART_EPICS: Epic[] = [
  createAPIEpic(GET_CART, GetCartSuccessAction, GetCartFailedAction),
  createAPIEpic(ADD_TO_CART, AddToCartSuccessAction, AddToCartFailedAction),
  createAPIEpic(REMOVE_FROM_CART, RemoveFromCartSuccessAction, RemoveFromCartFailedAction),
  createAPIEpic(CHECKOUT, CheckoutSuccessAction, CheckoutFailedAction),
]
