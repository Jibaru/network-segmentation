import { IP } from "../../../js/models/ip.model.js";
import { SubMask } from "../../../js/models/submask.model.js";
import { IPAdder } from "../../../js/utils/ip-adder.js";
import { proxPow2 } from "../../../js/utils/prox-pow2.js";
import { TableRow } from "../models/table-row.model.js";

export class TableRowBuilder {
  constructor() {
    this._name = "-";
    this._hostsRequired = 0;
    this._fromIP = new IP(0, 0, 0, 0);
    this._useDetails = false;
  }

  setName(name) {
    this._name = name;
    return this;
  }

  setFromIP(ip) {
    this._fromIP = ip;
    return this;
  }

  setHostsRequired(hostsRequired) {
    this._hostsRequired = hostsRequired;
    return this;
  }

  withObjectDetails() {
    this._useDetails = true;

    return this;
  }

  build() {
    const [hostsTotal] = proxPow2(this._hostsRequired);
    const ipAdder = new IPAdder(this._fromIP.clone());

    const broadcastIP = ipAdder.addHosts(hostsTotal).substractHosts(1).ip;

    const firstIP = ipAdder.setIP(this._fromIP.clone()).addHosts(1).ip;
    const lastIP = ipAdder.setIP(broadcastIP.clone()).substractHosts(1).ip;

    const submask = SubMask.fromHostsRequired(this._hostsRequired);

    const tableRow = new TableRow(
      this._name,
      this._hostsRequired,
      this._fromIP.toString(),
      firstIP.toString(),
      lastIP.toString(),
      broadcastIP.toString(),
      firstIP.toString(),
      submask.toString(),
      submask.formattedSuffix
    );

    if (this._useDetails) {
      return {
        tableRow,
        details: {
          nextIP: ipAdder.setIP(broadcastIP.clone()).addHosts(1).ip,
        },
      };
    }

    return tableRow;
  }
}
