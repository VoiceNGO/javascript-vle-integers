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
