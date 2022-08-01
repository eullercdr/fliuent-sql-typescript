export default class FluentSQLBuilder {
  #database: any[];
  #limit: number = 0;
  #select: string[] = [];
  #where = [] as any;
  #orderBy: string = "";

  constructor(database: any[]) {
    this.#database = database;
  }

  static for(database: any[]) {
    return new FluentSQLBuilder(database);
  }

  select(props: string[]) {
    this.#select = props;
    return this;
  }

  where(query: { [key: string]: string | RegExp }) {
    const [[prop, selectedValue]] = Object.entries(query);
    const whereFilter =
      selectedValue instanceof RegExp
        ? selectedValue
        : new RegExp(selectedValue);
    this.#where.push({ prop, filter: whereFilter });
    return this;
  }

  limit(max: number) {
    this.#limit = max;
    return this;
  }

  orderBy(field: string) {
    this.#orderBy = field;
    return this;
  }

  #performLimit(results: any[]) {
    return this.#limit && results.length === this.#limit;
  }

  #hasWhere(item: any) {
    for (const { prop, filter } of this.#where) {
      if (!item[prop].match(filter)) {
        return false;
      }
    }
    return true;
  }

  //reconstruct the object with the selected fields
  #performSelect(item: any) {
    let currentItem: any = {};
    const entries = Object.entries(item);
    for (const [key, value] of entries) {
      if (this.#select.length && !this.#select.includes(key)) {
        continue;
      }
      currentItem[key] = value;
    }
    return currentItem;
  }

  #performOrderBy(results: any[]) {
    if (!this.#orderBy) {
      return results;
    }
    return results.sort((prev, next) => {
      return prev[this.#orderBy].localeCompare(next[this.#orderBy]);
    });
  }

  build() {
    const results: any[] = [];
    for (const item of this.#database) {
      if (!this.#hasWhere(item)) {
        continue;
      }
      const currentItem = this.#performSelect(item);
      results.push(currentItem);
      if (this.#performLimit(results)) {
        break;
      }
    }
    return this.#performOrderBy(results);
  }
}
