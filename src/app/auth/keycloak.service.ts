import Keycloak, {KeycloakInstance} from "keycloak-js";
import {deserialize} from "../shared/decorators/property-mapper";
import {Session} from "./Session";
import {doubleStorage} from "../shared/decorators/utils";
import {STORED_REALM} from "./auth.redux";
import {fromPromise} from "rxjs/internal-compatibility";
import {catchError, mapTo} from "rxjs/operators";
import {of} from "rxjs";
import {httpClient} from "../shared/services/client";
import {API} from "../shared/services/api";

declare const KEYCLOAK_URL: string;
declare const KEYCLOAK_CLIENT_ID: string;
declare const APP_BASE_URL: string;

class KeycloakService {
  keyCloak: KeycloakInstance;

  checkSSSO(realm: string = doubleStorage.get(STORED_REALM)) {
    return Keycloak({
      realm,
      url: KEYCLOAK_URL,
      clientId: KEYCLOAK_CLIENT_ID,
    }).init({
      onLoad: "check-sso",
      redirectUri: APP_BASE_URL,
    });
  }

  async init(realm: string = doubleStorage.get(STORED_REALM)) {
    this.keyCloak = Keycloak({
      realm,
      url: KEYCLOAK_URL,
      clientId: KEYCLOAK_CLIENT_ID,
    });

    try {
      await this.keyCloak.init({
        onLoad: "login-required",
        redirectUri: window.location.href,
      });
    } catch (error) {
      throw new Error("Keycloak initialization error");
    }
  }

  get session(): Session {
    return deserialize(Session, {
      token: this.keyCloak.token,
      username: (this.keyCloak.userInfo as any)?.preferred_username || "Unknown",
    });
  }

  signOut() {
    return fromPromise(
      this.keyCloak.logout({
        redirectUri: APP_BASE_URL,
      }),
    );
  }

  checkRealm(realmName = doubleStorage.get(STORED_REALM)) {
    return httpClient
      .get(API.validateRealm, {params: {realmName}, disableAuth: true})
      .pipe(
        mapTo(true),
        catchError(() => of(false)),
      )
      .toPromise();
  }
}

export const authService = new KeycloakService();
