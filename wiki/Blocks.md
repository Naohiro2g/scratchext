The blocks object contains the implementation of your extension's command blocks. Each block selector should have a corresponding entry in the blocks object, passed to the [start()](start) function. For example:

```js
var ext = require('./scratchext/scratchext').create({
    blocks: {
        greet: function () {
            console.log('Hello, world!');
        }
    }
});
```

You can access the blocks with the `blocks` property of the extension object:

```js
ext.blocks.greet();
```