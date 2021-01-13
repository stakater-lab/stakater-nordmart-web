import Keycloak, {KeycloakInstance} from "keycloak-js";
import {deserialize} from "../shared/decorators/property-mapper";
import {Session} from "./Session";
import {fromPromise} from "rxjs/internal-compatibility";

declare const SSO_REALM: string;
declare const SSO_URL: string;
declare const SSO_CLIENT_ID: string;
declare const APP_BASE_URL: string;

console.info({
  SSO_REALM,
  SSO_URL,
  SSO_CLIENT_ID,
  APP_BASE_URL
})

class KeycloakService {
  keyCloak: KeycloakInstance;

  checkSSSO(realm: string = SSO_REALM) {
    return Keycloak({
      realm,
      url: SSO_URL,
      clientId: SSO_CLIENT_ID,
    }).init({
      onLoad: "check-sso",
      redirectUri: APP_BASE_URL,
    });
  }

  async init(realm: string = SSO_REALM) {
    this.keyCloak = Keycloak({
      realm,
      url: SSO_URL,
      clientId: SSO_CLIENT_ID,
    });

    try {
      return await this.keyCloak.init({
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
}

export const authService = new KeycloakService();
