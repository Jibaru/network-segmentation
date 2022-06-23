import { IP } from "../models/ip.model.js";

export class IPAdder {
  constructor(ip) {
    this._ip = ip;
  }

  setIP(ip) {
    this._ip = ip;

    return this;
  }

  addHosts(numberOfHosts) {
    let firstByte = this.ip.firstByte;
    let secondByte = this.ip.secondByte;
    let thirdByte = this.ip.thirdByte;
    let fourthByte = this.ip.fourthByte;

    while (numberOfHosts--) {
      fourthByte++;

      if (fourthByte > IP.MAX_NUMBER_PER_BYTE) {
        fourthByte = 0;

        thirdByte++;

        if (thirdByte > IP.MAX_NUMBER_PER_BYTE) {
          thirdByte = 0;
          secondByte++;

          if (secondByte > IP.MAX_NUMBER_PER_BYTE) {
            secondByte = 0;
            firstByte++;
          }
        }
      }
    }

    this._ip = new IP(firstByte, secondByte, thirdByte, fourthByte);

    return this;
  }

  substractHosts(numberOfHosts) {
    let firstByte = this.ip.firstByte;
    let secondByte = this.ip.secondByte;
    let thirdByte = this.ip.thirdByte;
    let fourthByte = this.ip.fourthByte;

    while (numberOfHosts--) {
      fourthByte--;

      if (fourthByte < 0) {
        fourthByte = IP.MAX_NUMBER_PER_BYTE;

        thirdByte--;

        if (thirdByte < 0) {
          thirdByte = IP.MAX_NUMBER_PER_BYTE;
          secondByte--;

          if (secondByte < 0) {
            secondByte = IP.MAX_NUMBER_PER_BYTE;
            firstByte--;
          }
        }
      }
    }

    this._ip = new IP(firstByte, secondByte, thirdByte, fourthByte);

    return this;
  }

  get ip() {
    return this._ip;
  }
}

// 182.162.32.3
// sumar 456 hosts
