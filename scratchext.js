var fs = require('fs');
var net = require('net');

exports.create = function (config) {
    if (!config) config = {};
    if (!config.blocks) config.blocks = {};

    var sockets = [];
    var updates = [];
    var vars = {};
    var ext = {
        trigger: function (event) {},
        set: function (name, value) {
            if (typeof name !== 'string') return;
            updates.push([name, value]);
            vars[name] = value;
            ext.update();
        },
        get: function (name) {
            return vars[name];
        },
        update: function () {
            var response = {
                method: 'update',
                params: updates
            };
            sockets.forEach(function (socket) {
                socket.write(JSON.stringify(response) + '\n');
            });
            updates = [];
        },
        blocks: config.blocks,
        vars: {}
    };

    var info = JSON.parse(fs.readFileSync(config.info || 'extension.json'));
    var port = info.extensionPort;

    var blocks = info.blockSpecs;
    if (blocks instanceof Array) {
        blocks.forEach(function (block) {
            if (!(block instanceof Array) || block.length < 3) return;
            if (block[0] === 'r') {
                var name = block[2];
                Object.defineProperty(ext.vars, name, {
                    set: function (value) {
                        ext.set(name, value);
                    },
                    get: function () {
                        return ext.get(name);
                    }
                });
            }
        });
    }

    var server = net.createServer(function (socket) {
        socket.on('connect', function (e) {
            console.log('Connected to Scratch as "%s", port %d', info.extensionName, port);
            sockets.push(socket);
        });
        socket.on('close', function (e) {
            console.log('Disconnected from Scratch');
            var i = sockets.indexOf(socket);
            if (i !== -1) sockets.splice(i, 1);
        });
        socket.on('data', function (data) {
            if (data.toString() === '<policy-file-request/>\0') {
                socket.write('<?xml version="1.0"?><cross-domain-policy><allow-access-from domain="*" to-ports="*"/></cross-domain-policy>\0');
                return;
            }
            ('' + data).split('\n').forEach(function (line) {
                if (!line) return;
                try {
                    var p = JSON.parse(line);
                } catch (e) {
                    console.log('Unknown packet %s', line);
                    return;
                }
                if (!p) return;
                if (p.method === 'poll') {
                } else if (config.blocks[p.method]) {
                    config.blocks[p.method].apply(ext, p.params);
                }
            });
        });
    });
    server.listen(port);
    return ext;
};
