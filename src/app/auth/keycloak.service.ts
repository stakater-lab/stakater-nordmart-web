import Keycloak, {KeycloakInstance} from "keycloak-js";
import {fromPromise} from "rxjs/internal-compatibility";
import {deserialize} from "../shared/decorators/property-mapper";
import {Session} from "./Session";
import {Optional} from "../typings";
import {of} from "rxjs";

class KeycloakService {
  public keyCloak: KeycloakInstance;

  constructor() {
    this.keyCloak = Keycloak("keycloak.json");
  }

  checkSSSO() {
    return this.keyCloak.init({
      onLoad: "check-sso",
      redirectUri: window.location.href,
    });
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
