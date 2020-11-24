import { jsonProperty } from "../shared/decorators/json-property";

export class Session {
  @jsonProperty()
  username: string;

  @jsonProperty()
  token: string;

  @jsonProperty()
  tokenExpiration: string;
}
