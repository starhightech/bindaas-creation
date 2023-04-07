import { Users as UserInterface } from '../interface/user'

export class User implements UserInterface {
  key!: number;
  name!: string;
  email!: string;
  phone!: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
