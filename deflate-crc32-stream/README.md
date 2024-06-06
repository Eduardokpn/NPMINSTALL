# deflate-crc32-stream v0.1.2
deflate-crc32-stream is a streaming deflater with CRC32 checksumer. It uses [buffer-crc32](https://www.npmjs.org/package/buffer-crc32) behind the scenes to reliably handle binary data and fancy character sets. Data comes through compressed with [zlib.DeflateRaw](http://nodejs.org/api/zlib.html#zlib_class_zlib_deflateraw).

## Install

This module has been merged into [CRC32Stream](https://www.npmjs.org/package/crc32-stream). No future updates will be made to this module.

### Usage

```js
var CRC32Stream = require('deflate-crc32-stream');

var source = fs.createReadStream('file.txt');
var deflate = new DeflateCRC32Stream();

deflate.on('end', function(err) {
  // do something with deflate.digest() here
});

// either pipe it
source.pipe(deflate);

// or write it
deflate.write('string');
deflate.end();
```

### Instance API

Inherits [zlib.DeflateRaw](http://nodejs.org/api/zlib.html#zlib_class_zlib_deflateraw) methods.

#### digest()

Returns the checksum digest in unsigned form.

#### hex()

Returns the hexadecimal representation of the checksum digest. (ie E81722F0)

#### size(compressed)

Returns the raw uncompressed size/length of passed-through data.

If `compressed` is `true`, it returns compressed length instead.

### Instance Options

Inherits [zlib.DeflateRaw](http://nodejs.org/api/zlib.html#zlib_class_zlib_deflateraw) options.

## Things of Interest

- [Changelog](https://github.com/ctalkington/node-deflate-crc32-stream/releases)
- [Contributing](https://github.com/ctalkington/node-deflate-crc32-stream/blob/master/CONTRIBUTING.md)
- [MIT License](https://github.com/ctalkington/node-deflate-crc32-stream/blob/master/LICENSE-MIT)