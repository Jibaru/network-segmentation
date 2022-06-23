export class TableRow {
  constructor(
    name,
    hostsRequired,
    fromIP,
    firstIP,
    lastIP,
    broadcastIP,
    defaultGateway,
    submask,
    submaskSuffix
  ) {
    this.name = name;
    this.hostsRequired = hostsRequired;
    this.fromIP = fromIP;
    this.firstIP = firstIP;
    this.lastIP = lastIP;
    this.broadcastIP = broadcastIP;
    this.defaultGateway = defaultGateway;
    this.submask = submask;
    this.submaskSuffix = submaskSuffix;
  }
}
