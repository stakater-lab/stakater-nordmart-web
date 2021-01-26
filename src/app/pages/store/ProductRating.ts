import {jsonProperty} from "../../shared/decorators/json-property";

export class ProductRating {
  @jsonProperty()
  customerName: string;

  @jsonProperty()
  dateTime: Date;

  @jsonProperty()
  id: string;

  @jsonProperty()
  productId: string;

  @jsonProperty()
  rating: number;

  @jsonProperty()
  reviewText: string;
}
