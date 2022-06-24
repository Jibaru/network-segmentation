export class Excel {
  constructor(headers) {
    this._headers = headers;
    this._rows = [];
  }

  appendRow(row) {
    this._rows.push(row);
  }

  get headers() {
    return this._headers;
  }

  forEachRow(callback) {
    for (const row of this._rows) {
      callback(row);
    }

    return this;
  }
}
