
# Parse

## Defualt

### options

```js
var defaults = {  
    allowDots: false,  
    allowPrototypes: false,  
    allowSparse: false,  
    arrayLimit: 20,  
    charset: 'utf-8',  
    charsetSentinel: false,  
    comma: false,  
    decoder: utils.decode,  
    delimiter: '&',  
    depth: 5,  
    ignoreQueryPrefix: false,  
    interpretNumericEntities: false,  
    parameterLimit: 1000,  
    parseArrays: true,  
    plainObjects: false,  
    strictNullHandling: false  
};

...

return {  
    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,  
    
    allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,  
    
    allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,  
    
    arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,  
    
    charset: charset,  
    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,  
    
    comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,  
    
    decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,  
    
    delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,  
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens  
    
    depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,  
    
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,  
    
    interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,  
    
    parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,  
    
    parseArrays: opts.parseArrays !== false,  
    plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,  
    
    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling  
};
```


### decoding function (utils.decode)

```js
var decode = function (str, decoder, charset) {  
    var strWithoutPlus = str.replace(/\+/g, ' ');  
    if (charset === 'iso-8859-1') {  
        // unescape never throws, no try...catch needed:  
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);  
    }  
    // utf-8  
    try {  
        return decodeURIComponent(strWithoutPlus);  
    } catch (e) {  
        return strWithoutPlus;  
    }  
};
```

'+' 싸인을 모두 공백 문자열로 변환.


## URI encoded strings work too:

```js
assert.deepEqual(qs.parse('a%5Bb%5D=c'), {
    a: { b: 'c' }
}); // true
```



## Options

### ignoreQueryPrefix

To bypass the leading question mark, use `ignoreQueryPrefix`:

```js
var prefixed = qs.parse('?a=b&c=d', { ignoreQueryPrefix: true });

assert.deepEqual(prefixed, { a: 'b', c: 'd' }); // true
```


# stringify

## Default options

```js 

var defaults = {  
    addQueryPrefix: false,  
    allowDots: false,  
    charset: 'utf-8',  
    charsetSentinel: false,  
    delimiter: '&',  
    encode: true,  
    encoder: utils.encode,  
    encodeValuesOnly: false,  
    format: defaultFormat,  
    formatter: formats.formatters[defaultFormat],  
    // deprecated  
    indices: false,  
    serializeDate: function serializeDate(date) {  
        return toISO.call(date);  
    },  
    skipNulls: false,  
    strictNullHandling: false  
};

...

return {  
    addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,  
    
    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,  
    
    charset: charset,  
    
    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,  
    
    delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,  
    
    encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
      
    encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,  
    
    encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,  
    
    filter: filter,  
    format: format,  
    formatter: formatter,  
    
    serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,  
    
    skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,  
    
    sort: typeof opts.sort === 'function' ? opts.sort : null, 
     
    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling  
    
};
```