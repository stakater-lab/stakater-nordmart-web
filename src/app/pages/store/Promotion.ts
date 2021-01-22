import {jsonProperty} from "../../shared/decorators/json-property";

export class Promotion {
  @jsonProperty()
  id: string;

  @jsonProperty()
  active: boolean;

  @jsonProperty()
  code: string;

  @jsonProperty()
  description: string;

  @jsonProperty()
  itemId: number;

  @jsonProperty()
  percentOff: number;
}
