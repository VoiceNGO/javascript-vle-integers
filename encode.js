function encode(number) {
  var bytes     = [];
  var firstByte = true;
  var negative  = number < 0;
  var byte;

  if (negative) {
    number = -number;
  }

  while (number > 0) {
    if (firstByte) {
      if (number < 0) {
        var negative = true;
        number = -number;
      }

      byte = number & 63;

      if (negative) {
        byte |= 64;
      }

      number >>= 6;
      firstByte = false;
    } else {
      byte = number & 127;
      number >>= 7;
    }

    if(number) {
      byte |= 128;
    }

    bytes.push(byte);
  }

  return bytes;
}

module.exports = function(number) {
  return encode(number).map(function(byte) {
    return String.fromCharCode(byte);
  }).join('');
};

module.exports.array = function(number) {
  return encode(number);
};
