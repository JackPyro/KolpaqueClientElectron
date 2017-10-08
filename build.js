const packager = require('electron-packager');
const rl = require('readline-sync');
const fs = require('fs');
const path = require('path');

let platformRl = rl.question('select platform. all - for all platforms.\n');
let outPathRl = rl.question('select output folder.\n');

let options = {
    dir: './',
    tmpdir: false,
    icon: './icon',
    arch: 'x64',
    ignore: [
        '.idea'
    ],
    overwrite: true,
    win32metadata: {
        ProductName: 'KolpaqueClientElectron',
        InternalName: 'KolpaqueClientElectron',
        FileDescription: 'KolpaqueClientElectron',
        OriginalFilename: 'KolpaqueClientElectron.exe'
    },
    asar: {
        unpackDir: 'node_modules/node-notifier/vendor/**'
    },
    packageManager: 'yarn',
    prune: true
};

if (platformRl === 'all') {
    options.platform = 'win32,darwin,linux';
} else {
    options.platform = platformRl;
}

if (!fs.existsSync(outPathRl)) {
    console.log('bad path.');
    return;
}

options.out = path.join(outPathRl, 'KolpaqueClientElectron');

console.log(options);

packager(options, function (err, appPaths) {
    if (err) {
        console.log(err);
    }

    console.log(appPaths);
});
