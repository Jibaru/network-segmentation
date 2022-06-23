export class IP {
  static MAX_NUMBER_PER_BYTE = 255;
  static MAX_HOSTS_PER_BYTE = 256;
  static MIN_HOSTS_PER_BYTE = 0;

  static CLASS_A = "A";
  static CLASS_B = "B";
  static CLASS_C = "C";
  static CLASS_D = "D";
  static CLASS_E = "E";

  constructor(firstByte, secondByte, thirdByte, fourthByte) {
    this._firstByte = firstByte;
    this._secondByte = secondByte;
    this._thirdByte = thirdByte;
    this._fourthByte = fourthByte;
  }

  static fromArray(bytes) {
    return new IP(bytes[0], bytes[1], bytes[2], bytes[3]);
  }

  get firstByte() {
    return this._firstByte;
  }

  get secondByte() {
    return this._secondByte;
  }

  get thirdByte() {
    return this._thirdByte;
  }

  get fourthByte() {
    return this._fourthByte;
  }

  class() {
    if (this.firstByte <= 127) {
      return IP.CLASS_A;
    }

    if (this.firstByte <= 191) {
      return IP.CLASS_B;
    }

    if (this.firstByte <= 223) {
      return IP.CLASS_C;
    }

    if (this.firstByte <= 239) {
      return IP.CLASS_D;
    }

    return IP.CLASS_E;
  }

  clone() {
    return new IP(
      this.firstByte,
      this.secondByte,
      this.thirdByte,
      this.fourthByte
    );
  }

  toString() {
    return `${this.firstByte}.${this.secondByte}.${this.thirdByte}.${this.fourthByte}`;
  }
}
