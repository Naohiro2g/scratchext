In this tutorial, we'll make a <kbd>say hello</kbd> block which prints a greeting to the console. First, create a [manifest file](Manifests) called `extension.json` in your project directory.

```json
{
    "extensionName": "HelloWorld",
    "extensionPort": 48001,
    "blockSpecs": [
        [" ", "say hello", "greet"]
    ]
}
```

Here we've declared a command block (`" "`) with the spec <kbd>say hello</kbd> and the selector `HelloWorld.greet`. Let's implement the `greet` block in the extension's behavior file, `extension.js`.

```js
require('./scratchext/scratchext').create({
    blocks: {
        greet: function () {
            console.log('Hello, world!');
        }
    }
});
```

Run the extension with Node…

```sh
$ sudo node extension.js
```

…and import the extension into Scratch by shift-clicking the **File** menu, selecting **Import Experimental Extension**, and choosing `extension.json` in the file dialog.

![Shift-click File menu with 'Import Experimental Extension' highlighted"](http://scratch.mit.edu/internalapi/asset/0a21c83d286a59ad7f0408fd8296eb82.png/get/)

Your block will appear in the **More Blocks** category. Click it to say hello!

![Image of the 'say hello' block in the 'More Blocks' palette](http://scratch.mit.edu/internalapi/asset/65a2b074d530f905ccb840853d06842d.png/get/)

```sh
$ sudo node extension.js
Connected to Scratch as "HelloWorld", port 12345
Hello, world!
```