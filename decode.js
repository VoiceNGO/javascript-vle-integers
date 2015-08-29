function process(bytes) {
  var isString  = typeof bytes === 'string';
  var number    = 0;
  var ix        = 0;
  var byte      = bytes[ix];
  var firstByte = true;
  var negative;
  var bits;
  var byteVal;
  var contFlag;

  while (byte) {
    if (isString) {
      byte = byte.charCodeAt(0);
    }

    contFlag = byte & 128;

    // if first byte
    if (firstByte) {
      negative = byte & 64;
      bits     = 6;

    } else {
      bits = 7;
    }

    byteVal = byte & ((1 << (bits)) - 1);

    if (contFlag) {
      byte = bytes[ix + 1];

    } else {
      byte = null;
    }

    firstByte = false;
    number   += byteVal << (ix ? 6 + 7 * (ix - 1) : 0);
    ix++;
  }

  return {
      number : negative ? -number : number
    , ix     : ix
  };
};

/**
 * Decodes a VLE integer at the beginning of a byte buffer or string
 *
 * @param  {Buffer|String} bytes raw data
 * @return {Number}        The decoded number
 */
module.exports = function(bytes){
  return process(bytes).number;
};

/**
 * Decodes a VLE integer at the beginning of a byte buffer or string and returns the decoded number along with the
 *   original string/buffer with the number consumed
 *
 * @param  {Buffer|String} bytes raw data
 * @return {Object}
 * @return {Buffer|String} return.bytes
 * @return {Number}        return.number
 */
module.exports.consume = function(bytes) {
  var processed = process(bytes);
  var bytes     = bytes.slice(processed.ix);

  return {
      number : processed.number
    , bytes  : bytes
  };
};
