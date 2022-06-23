export function proxPow2(hostsQuantity) {
  const TO_USE_NET_AND_ROUTER = 2;

  let exponent = 0;
  let pow2 = Math.pow(2, exponent);
  while (pow2 < hostsQuantity + TO_USE_NET_AND_ROUTER) {
    exponent++;
    pow2 = Math.pow(2, exponent);
  }

  return [pow2, exponent];
}
