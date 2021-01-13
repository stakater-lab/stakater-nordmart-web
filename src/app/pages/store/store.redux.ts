import {getProductsAPI} from "./store.service";
import {ApiAction} from "../../shared/redux/api-action";
import {CallBack} from "../../typings";
import {Action} from "nested-combine-reducers/dist/types";
import {Product} from "./Product";
import {Epic} from "redux-observable";
import {createAPIEpic} from "../../shared/redux/api-epic";
import {createSelector} from "reselect";

export const GET_PRODUCTS = "products/get";
export const GET_PRODUCTS_SUCCESS = "products/get/success";
export const GET_PRODUCTS_FAILED = "products/get/failed";

export class GetProductsAction extends ApiAction {
  public type = GET_PRODUCTS;
  public api$ = getProductsAPI();

  constructor(public successCb?: CallBack) {
    super();
  }
}

export class GetProductsSuccessAction implements Action {
  public type = GET_PRODUCTS_SUCCESS;

  constructor(public origin: GetProductsAction, public products: Product[]) {

  }
}

export class GetProductsFailedAction implements Action {
  public type = GET_PRODUCTS_FAILED;

  constructor(public error: Error) {

  }
}

const SET_SEARCH_QUERY = "products/query";
export class SetSearchQueryAction implements Action {
  public type = SET_SEARCH_QUERY;

  constructor(public query: string) {
  }
}

type ACTIONS = GetProductsSuccessAction;

interface IStoreState {
  products: Product[];
}

const initialState: IStoreState = {
  products: []
};

export function storeReducer(state: IStoreState = initialState, action: ACTIONS) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: undefined
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products
      }
    case GET_PRODUCTS_FAILED:
      return {
        ...state,
        products: []
      }
    default:
      return state;
  }
}

export const STORE_REDUX_KEY = "store";
const root = (state: any): IStoreState => state[STORE_REDUX_KEY];
export const STORE_SELECTORS = {
  products: createSelector(root, store => store.products || [])
}

export const STORE_EPICS: Epic[] = [
  createAPIEpic(GET_PRODUCTS, GetProductsSuccessAction, GetProductsFailedAction)
]
