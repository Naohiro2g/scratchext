Extension objects are the JavaScript interface for scratchext extensions. You can create an extension object with the `scratchext.create(…)` function. `create(…)` takes one optional argument: a configuration object. All keys in the configuration object are optional, and can be any of the following:

<dl>
<dt>blocks
<dd>An object containing the implementation for each command block in the extension; see [Blocks](Blocks).
<dt>manifest
<dd>A string containing the relative path to the extension manifest file. By default, this is `extension.json`.
</dl>

## Properties and methods

The `create(…)` function returns an object with a number of properties and methods.

<dl>
<dt>blocks
<dd>An object containing the blocks passed to <code>create(…)</code>; see <a href=Blocks>Blocks</a>.
<dt>vars
<dd>An object containing the variables declared in your <a href=Manifests>manifest</a>; see <a href=Variables>Variables</a>.
<dt>declare(name)
<dd>Declares a variable so you can use access it with the <code>vars</code> object; see <a href=Variables>Variables</a>.
<dt>set(name, value)
<dd>Sets a variable; see <a href=Variables>Variables</a>.
<dt>get(name)
<dd>Returns the value of a variable; see <a href=Variables>Variables</a>.
<dt>trigger(event)
<dd><strong>Warning: This method is unimplemented. Scratch does not currently support custom hat blocks.</strong>
<dd>Triggers an event; see <a href=Events>Events</a>.
</dl>