In this tutorial, we'll make a <kbd>read file</kbd> block which allows you to read files from the filesystem. First, declare the blocks in your [manifest](Manifests).

```json
{
    "extensionName": "Filesystem",
    "extensionPort": 48002,
    "blockSpecs": [
        [" ", "read file %s", "readFile", "/etc/hosts"],
        ["r", "file contents", "contents"],
        ["b", "done reading?", "done"]
    ]
}
```

Next, implement the `readFile` block:

```js
var fs = require('fs');
var ext = require('./scratchext/scratchext').create({
    blocks: {
        readFile: function (filename) {
            ext.vars.done = false;
            fs.readFile(filename, function (err, contents) {
                ext.vars.contents = '' + contents;
                ext.vars.done = true;
            });
        }
    }
});
```

In Scratch, we can use these two blocks to read a file:

<pre>
read file [/etc/hosts]
wait until &lt;done reading?&gt;
say (file contents)
</pre>