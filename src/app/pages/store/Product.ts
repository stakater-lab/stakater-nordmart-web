import {jsonProperty} from "../../shared/decorators/json-property";

class Availability {
  @jsonProperty()
  quantity: number
}
export class Product {
  @jsonProperty()
  itemId: string;

  @jsonProperty()
  name: string;

  @jsonProperty()
  description: string;

  @jsonProperty()
  price: number;

  @jsonProperty()
  availability: Availability;
}
