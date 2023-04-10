/* eslint-disable @typescript-eslint/member-ordering */
export class SelectOption {
  private _name!: string;
  private _id: any;
  private _items?: SelectOption[];

  constructor(name: string, id: string | number, items?: SelectOption[]) {
    this.name = name;
    this.id = id;
    this.items = items;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get id(): string | number {
    return this._id;
  }

  set id(id: string | number) {
    this._id = id;
  }

  get items(): SelectOption[] | undefined {
    return this._items;
  }

  set items(items: SelectOption[] | undefined) {
    this._items = items;
  }

}

export abstract class SelectOptionsFactory {
  static createFromArray(
    source: [],
    nameKey: string = 'name',
    idKey: string = 'id',
    itemsKey: string = 'items'): SelectOption[] {
    return source ? source.map(obj => (new SelectOption(obj[nameKey], obj[idKey], obj[itemsKey]))) : [];
  }
}
