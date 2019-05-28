Variables allow your extension to report values to Scratch.

## Declared variables
You can declare variables by adding reporter blocks to your extension manifest. For example:

```json
{
    "extensionName": "Notifications",
    "extensionPort": 12345,
    "blockSpecs": [
        ["r", "# of notifications", "notificationCount"]
    ]
}
```

After you've declared variables, you can get or set them with the `vars` property of the extension object.

```js
var ext = require('./scratchext/scratchext').create();
ext.vars.notificationCount = 0;
setInterval(function () {
    ext.vars.notificationCount += 1;
    console.log('Notification count: %d', ext.vars.notificationCount);
}, 5000);
```

You can also declare variables manually with the `declare(…)` method of the [extension object](Extension objects).

```js
ext.declare('variable');
ext.vars.variable = 'Hello, world!';
```

## Arbitrary variables
You can set any variable by calling the `set(…)` method of the extension object:

```js
ext.set('item' + i, 'hello');
```

and retrieve a variable with the `get(…)` method:

```js
console.log(name + ': %d', ext.get(name));
```