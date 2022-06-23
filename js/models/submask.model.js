import { proxPow2 } from "../utils/prox-pow2.js";
import { IP } from "./ip.model.js";

export class SubMask {
  static EXPONENT_HOSTS_MAPPER = {
    0: {
      mask: [255, 255, 255, 255],
      suffix: 32,
    },
    1: {
      mask: [255, 255, 255, 254],
      suffix: 31,
    },
    2: {
      mask: [255, 255, 255, 252],
      suffix: 30,
    },
    3: {
      mask: [255, 255, 255, 248],
      suffix: 29,
    },
    4: {
      mask: [255, 255, 255, 240],
      suffix: 28,
    },
    5: {
      mask: [255, 255, 255, 224],
      suffix: 27,
    },
    6: {
      mask: [255, 255, 255, 192],
      suffix: 26,
    },
    7: {
      mask: [255, 255, 255, 128],
      suffix: 25,
    },
    8: {
      mask: [255, 255, 255, 0],
      suffix: 24,
    },
    9: {
      mask: [255, 255, 254, 0],
      suffix: 23,
    },
    10: {
      mask: [255, 255, 252, 0],
      suffix: 22,
    },
    11: {
      mask: [255, 255, 248, 0],
      suffix: 21,
    },
    12: {
      mask: [255, 255, 240, 0],
      suffix: 20,
    },
    13: {
      mask: [255, 255, 224, 0],
      suffix: 19,
    },
    14: {
      mask: [255, 255, 192, 0],
      suffix: 18,
    },
    15: {
      mask: [255, 255, 128, 0],
      suffix: 17,
    },
    16: {
      mask: [255, 255, 0, 0],
      suffix: 16,
    },
    17: {
      mask: [255, 254, 0, 0],
      suffix: 15,
    },
    18: {
      mask: [255, 252, 0, 0],
      suffix: 14,
    },
    19: {
      mask: [255, 248, 0, 0],
      suffix: 13,
    },
    20: {
      mask: [255, 240, 0, 0],
      suffix: 12,
    },
    21: {
      mask: [255, 224, 0, 0],
      suffix: 11,
    },
    22: {
      mask: [255, 192, 0, 0],
      suffix: 10,
    },
    23: {
      mask: [255, 128, 0, 0],
      suffix: 9,
    },
    24: {
      mask: [255, 0, 0, 0],
      suffix: 8,
    },
    25: {
      mask: [254, 0, 0, 0],
      suffix: 7,
    },
    26: {
      mask: [252, 0, 0, 0],
      suffix: 6,
    },
    27: {
      mask: [248, 0, 0, 0],
      suffix: 5,
    },
    28: {
      mask: [240, 0, 0, 0],
      suffix: 4,
    },
    29: {
      mask: [224, 0, 0, 0],
      suffix: 3,
    },
    30: {
      mask: [192, 0, 0, 0],
      suffix: 2,
    },
    31: {
      mask: [128, 0, 0, 0],
      suffix: 1,
    },
    32: {
      mask: [0, 0, 0, 0],
      suffix: 0,
    },
  };

  constructor(firstByte, secondByte, thirdByte, fourthByte) {
    this._firstByte = firstByte;
    this._secondByte = secondByte;
    this._thirdByte = thirdByte;
    this._fourthByte = fourthByte;

    this._calcExtras();
  }

  static fromIP(ip) {
    let firstByte = 0;
    let secondByte = 0;
    let thirdByte = 0;

    if (ip.class() == IP.CLASS_A) {
      firstByte = 255;
    } else if (ip.class() == IP.CLASS_B) {
      firstByte = 255;
      secondByte = 255;
    } else if (ip.class() == IP.CLASS_C) {
      firstByte = 255;
      secondByte = 255;
      thirdByte = 255;
    }

    return new SubMask(firstByte, secondByte, thirdByte, 0);
  }

  static fromHostsRequired(quantity) {
    const [_, exponent] = proxPow2(quantity);

    const { mask } = SubMask.EXPONENT_HOSTS_MAPPER[exponent];

    return new SubMask(mask[0], mask[1], mask[2], mask[3]);
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

  get suffix() {
    return this._suffix;
  }

  get formattedSuffix() {
    return `/${this.suffix}`;
  }

  get maxHostsAllowed() {
    return this._maxHostsAllowed;
  }

  get lastExponent() {
    return this._lastExponent;
  }

  _calcExtras() {
    const entries = Object.entries(SubMask.EXPONENT_HOSTS_MAPPER);

    for (const [exponent, data] of entries) {
      if (
        data.mask[0] == this.firstByte &&
        data.mask[1] == this.secondByte &&
        data.mask[2] == this.thirdByte &&
        data.mask[3] == this.fourthByte
      ) {
        this._maxHostsAllowed = Math.pow(2, exponent);
        this._suffix = data.suffix;
        this._lastExponent = parseInt(exponent);
        break;
      }
    }
  }

  toString() {
    return `${this.firstByte}.${this.secondByte}.${this.thirdByte}.${this.fourthByte}`;
  }
}
