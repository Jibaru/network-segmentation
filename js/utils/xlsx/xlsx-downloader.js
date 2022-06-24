export function downloadXlsx(xlsx, name = "excel") {
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);

    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }

    return buf;
  }

  saveAs(
    new Blob([s2ab(xlsx)], { type: "application/octet-stream" }),
    `${name}.xlsx`
  );
}
