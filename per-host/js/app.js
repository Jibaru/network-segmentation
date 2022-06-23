import { parseHosts } from "../../js/parsers/hosts-parser.js";
import { parseIp } from "../../js/parsers/ip-parser.js";
import { isValidHostsInput } from "../../js/validators/hosts-input-validator.js";
import { isValidIPInput } from "../../js/validators/ip-input-validator.js";
import { TableRowBuilder } from "./builders/table-row-builder.js";

const formElement = document.getElementById("form");
const tableBodyElement = document.getElementById("results");
const tableResultsElement = document.getElementById("table-results");

const App = {
  init() {
    this.showTable(false);
    this.listen();
  },
  listen() {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      const ipElement = formElement.ip;
      const hostsElement = formElement.hosts;

      const ipValidation = isValidIPInput(ipElement.value);
      const hostsValidation = isValidHostsInput(hostsElement.value);

      if (!ipValidation.isValid || !hostsValidation.isValid) {
        const errorMessages = [
          ...ipValidation.errors,
          ...hostsValidation.errors,
        ].reduce((prev, val) => prev + val + "\n", "");
        alert(errorMessages);
        return;
      }

      const ip = parseIp(ipElement.value);
      const hosts = parseHosts(hostsElement.value);

      const tableRowBuilder = new TableRowBuilder();

      let fromIP = ip;

      const tableRows = hosts
        .sort((a, b) => (a.hostsRequired < b.hostsRequired ? 1 : -1))
        .map(({ name, hostsRequired }) => {
          const { tableRow, details } = tableRowBuilder
            .setName(name)
            .setFromIP(fromIP)
            .setHostsRequired(hostsRequired)
            .withObjectDetails()
            .build();

          fromIP = details.nextIP;

          return tableRow;
        });

      this.clearTable();
      this.fillTable(tableRows);
      this.showTable(true);
    });
  },
  clearTable() {
    while (tableBodyElement.firstChild) {
      tableBodyElement.removeChild(tableBodyElement.firstChild);
    }
  },
  showTable(show) {
    if (show) {
      tableResultsElement.style.display = "block";
    } else {
      tableResultsElement.style.display = "none";
    }
  },
  fillTable(tableRows) {
    tableRows.forEach((tableRow) => {
      const tr = document.createElement("tr");

      const tdName = document.createElement("td");
      const tdHostsRequired = document.createElement("td");
      const tdFromIP = document.createElement("td");
      const tdFirstIP = document.createElement("td");
      const tdLastIP = document.createElement("td");
      const tdBroadcastIP = document.createElement("td");
      const tdDefaultGateway = document.createElement("td");
      const tdSubmask = document.createElement("td");
      const tdSubmaskSuffix = document.createElement("td");

      tdName.textContent = tableRow.name;
      tdHostsRequired.textContent = tableRow.hostsRequired;
      tdFromIP.textContent = tableRow.fromIP;
      tdFirstIP.textContent = tableRow.firstIP;
      tdLastIP.textContent = tableRow.lastIP;
      tdBroadcastIP.textContent = tableRow.broadcastIP;
      tdDefaultGateway.textContent = tableRow.defaultGateway;
      tdSubmask.textContent = tableRow.submask;
      tdSubmaskSuffix.textContent = tableRow.submaskSuffix;

      tr.appendChild(tdName);
      tr.appendChild(tdHostsRequired);
      tr.appendChild(tdFromIP);
      tr.appendChild(tdFirstIP);
      tr.appendChild(tdLastIP);
      tr.appendChild(tdBroadcastIP);
      tr.appendChild(tdDefaultGateway);
      tr.appendChild(tdSubmask);
      tr.appendChild(tdSubmaskSuffix);

      tableBodyElement.appendChild(tr);
    });
  },
};

App.init();
