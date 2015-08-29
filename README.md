# JavaScript Variable Length Encoded Integers

Dynamically encodes a number into N bytes:

0->63 -- 1 bytes  
->8,191 -- 2 bytes  
->1,048,575 -- 3 bytes  
->2^20-1 -- 4 bytes  
->2^27-1 -- 5 bytes  
->2^34-1 -- 6 bytes  
->2^41-1 -- 7 bytes  
->2^48-1 -- 8 bytes  
->2^54-1 -- 9 bytes (above unsafe limit of 2^53 - 1)  

I could make an unsigned version, but I don't need it myself -- open an issue if
  you need this.

## Usage

```js
var encode  = require('vle-integers').encode;
var decode  = require('vle-integers').decode;

var encode  = encode(123);
var decoded = decode(123);
```

## Decode Method

The decode method will only decode the leading number, meaning that if you
  attempt to decode something like:

```js
var data = encode('123') + 'asdf';
```

It will work correctly.  It will also properly decode Buffers.  There is an
  optional `decode.consume` method that consumes the processed bytes and
  returns:

```js
{
    number : number
  , bytes  : bytes  // without the leading consumed bytes
};
```

## Encode Method

Encoding always returns a string.  If you want a Buffer, create one by passing
  the result to a Buffer and being sure to set the encoding as `ascii`:

```js
var encode  = require('vle-integers').encode;
var encoded = encode(123);

var buf = new Buffer(encoded, 'ascii');

// or

buf.write(encoded, 0, 'ascii');
```

There is also an optional `encode.array` method that returns an array of numbers
  representing the ascii value of each byte.
