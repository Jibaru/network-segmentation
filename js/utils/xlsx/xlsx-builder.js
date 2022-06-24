export class XlsxBuilder {
  constructor(excel) {
    this._excel = excel;
  }

  setExcel(excel) {
    this._excel = excel;

    return this;
  }

  build() {
    function colsWidth(rows) {
      return rows[0].map((a, i) => ({
        wch: Math.max(
          ...rows.map((a2) => (a2[i] ? a2[i].toString().length : 0))
        ),
      }));
    }

    const rows = [this._excel.headers];

    this._excel.forEachRow((row) => rows.push(row));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    worksheet["!cols"] = colsWidth(rows);

    workbook.SheetNames.push("Hoja 1");
    workbook.Sheets["Hoja 1"] = worksheet;

    return XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  }
}
