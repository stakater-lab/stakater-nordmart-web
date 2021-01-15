import Keycloak, {KeycloakInstance} from "keycloak-js";
import {fromPromise} from "rxjs/internal-compatibility";
import {deserialize} from "../shared/decorators/property-mapper";
import {Session} from "./Session";
import {Optional} from "../typings";
import {of} from "rxjs";

declare const SSO_REALM: string;
declare const SSO_URL: string;
declare const SSO_CLIENT_ID: string;

console.info({
  SSO_REALM,
  SSO_URL,
  SSO_CLIENT_ID,
});

class KeycloakService {
  public keyCloak: KeycloakInstance;

  constructor() {
    this.keyCloak = Keycloak({
      url: SSO_URL,
      realm: SSO_REALM,
      clientId: SSO_CLIENT_ID
    });
  }

  checkSSSO() {
    return this.keyCloak.init({
      onLoad: "check-sso",
      redirectUri: window.location.href,
    });
  }

  async init() {
    try {
      return await this.keyCloak.init({
        onLoad: "login-required",
        redirectUri: window.location.href,
      });
    } catch (error) {
      throw new Error("Keycloak initialization error");
    }
  }

  get userInfo(): Optional<Session> {
    return this.keyCloak.userInfo ? deserialize(Session, this.keyCloak?.userInfo) : undefined;
  }

  signIn() {
    if (this.keyCloak && this.keyCloak.authenticated) {
      return of(this.userInfo);
    }

    return fromPromise(
      this.keyCloak.login(),
    );
  }

  signOut() {
    return fromPromise(
      this.keyCloak.logout(),
    );
  }
}

export const authService = new KeycloakService();
