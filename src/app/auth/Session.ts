import {jsonProperty} from "../shared/decorators/json-property";

export class Session {
  @jsonProperty()
  email: string;

  @jsonProperty()
  email_verified: boolean;

  @jsonProperty()
  family_name: string;

  @jsonProperty()
  given_name: string;

  @jsonProperty()
  name: string;

  @jsonProperty()
  preferred_username: string;

  @jsonProperty()
  sub: string;
}
