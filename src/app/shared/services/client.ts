import { ajaxDelete, AjaxError, AjaxObservable, ajaxPost, ajaxPut, AjaxResponse } from "rxjs/internal-compatibility";
import URITemplate from "urijs/src/URITemplate";
import URI from "urijs";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { store } from "../redux/store";
import { UnauthorizedAccessAction } from "../app/auth/auth.redux";
import { authService } from "../app/auth/keycloak.service";

export interface IHttpOptions {
  params?: { [key: string]: string };
  queryParams?: { [key: string]: any };
  headers?: { [key: string]: string };
  responseType?: string;
  disableAuth?: boolean;
}

const globalErrorHandler = (error: AjaxError) => {
  if (error.status === 401) {
    store.dispatch(new UnauthorizedAccessAction());
  }

  return throwError(error);
};

const graphQlErrorMapper = (response: AjaxResponse) => {
  if (response.response.errors && response.response.errors.length > 0) {
    const firstError = response.response.errors[0];
    throw {
      status: firstError.extensions ? firstError.extensions.code : "",
      response: {
        overrideMessage: firstError.message,
      },
      xhr: response.xhr,
    };
  }
  return response;
};

class HttpClient {
  get token() {
    return authService.keyCloak.token;
  }

  public getDefaultHeaders(options: IHttpOptions) {
    return {
      "Content-Type": "application/json",
      ...(!options.disableAuth && this.token
        ? {
            Authorization: `Bearer ${this.token}`,
          }
        : {}),
    };
  }

  public get(url: string, options: IHttpOptions = {}) {
    return new AjaxObservable<AjaxResponse>({
      method: "GET",
      url: this.transformUri(url, options),
      responseType: options.responseType || "json",
      headers: { ...this.getDefaultHeaders(options), ...(options.headers || {}) },
    }).pipe(catchError(globalErrorHandler));
  }

  public post(url: string, body?: any, options: IHttpOptions = {}) {
    return ajaxPost(this.transformUri(url, options), body, {
      ...this.getDefaultHeaders(options),
      ...(options.headers || {}),
    }).pipe(catchError(globalErrorHandler));
  }

  public postGraphQl(url: string, body?: any, options: IHttpOptions = {}) {
    return ajaxPost(this.transformUri(url, options), this.transformBody(body), {
      ...this.getDefaultHeaders(options),
      ...(options.headers || {}),
    })
      .pipe(catchError(globalErrorHandler))
      .pipe(map(graphQlErrorMapper));
  }

  public delete(url: string, options: IHttpOptions = {}) {
    return ajaxDelete(this.transformUri(url, options), {
      ...this.getDefaultHeaders(options),
      ...(options.headers || {}),
    }).pipe(catchError(globalErrorHandler));
  }

  public put(url: string, body?: any, options: IHttpOptions = {}) {
    return ajaxPut(this.transformUri(url, options), body, {
      ...this.getDefaultHeaders(options),
      ...(options.headers || {}),
    }).pipe(catchError(globalErrorHandler));
  }

  public transformUri(url: string, uriSpecs: IHttpOptions = {}): string {
    const parsed = URI(
      URITemplate(url)
        .expand({
          ...uriSpecs.params,
        })
        .valueOf(),
    );

    return parsed
      .search({
        ...parsed.search(true),
        ...(uriSpecs.queryParams || {}),
      })
      .valueOf();
  }

  public transformBody(body: any) {
    const variables = {
      ...body.variables,
    };
    return {
      ...body,
      variables,
    };
  }
}

export const httpClient = new HttpClient();
