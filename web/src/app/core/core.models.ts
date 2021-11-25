import {Id} from "../../types";

export interface Dto {
  id: Id;
}

export class DomainModel<T extends Dto> {

  constructor(obj?: T) {
    if (obj !== undefined) {
      for (let element in obj) {
        // @ts-ignore
        this[element] = obj[element];
      }
    }
  }

}
