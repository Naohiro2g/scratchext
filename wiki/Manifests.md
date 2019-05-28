The `extension.json` manifest file contains information about an extension and the blocks it defines. It has the following format:

```json
{
    "extensionName": <name>,
    "extensionPort": <port>,
    "blockSpecs": [
        [<type>, <spec>, <selector>, <defaults>...]
    ]
}
```

Your extension name should consist of CamelCase alphanumeric characters. The port should be unique among extensions, and should not require superuser permissions to open.

Block types can be `" "` (command; see [Blocks](Blocks)), `"f"` (end-of-stack command), `"r"` (reporter; see [Variables](Variables)), or `"b"` (boolean reporter). Blocks specs are strings comprising plain words for label parts and input specifiers for argument slots, and can also contain icon names prefixed by an at sign (`@`). Input slots consist of a percent sign (`%`) followed by an input type, followed optionally by a period (`.`) and a menu name. See [here](https://docs.google.com/spreadsheet/ccc?key=0Ai13BQTlMxCzdG5lelZDczFnc241S2FmWVNhcEkwMEE#gid=0) for a complete list of input types and menu names.