var fs = require('fs');
var path = require('path');
var projectRoot = process.argv[1].split('/node_modules')[0];
var defaultFolder = `${projectRoot}/_charlieWork`;
//
// console.log(projectRoot);
function locationExists(a) {
    try {
        return stats = fs.lstatSync(a), !0;
    } catch (b) {
        return !1;
    }
}

function copyRecursiveSync(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (exists && isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.linkSync(src, dest);
    }
}
var folderExists = fs.existsSync(defaultFolder);
if (!folderExists) copyRecursiveSync(`${__dirname}/unload/_charlieWork`, defaultFolder);
if(!locationExists(`${projectRoot}/_charlieWork-CLI-example.sh`)) console.log('exists');

if(!locationExists(projectRoot+'/_charlieWork-CLI-example.sh')){
	fs.createReadStream(`${__dirname}/unload/_charlieWork-CLI-example.sh`).pipe(fs.createWriteStream(`${projectRoot}/_charlieWork-CLI-example.sh`));
}

if(!locationExists(projectRoot+'/_charlieWork-programatic-example.js')){
	fs.createReadStream(`${__dirname}/unload/_charlieWork-programatic-example.js`).pipe(fs.createWriteStream(`${projectRoot}/_charlieWork-programatic-example.js`));
}

if(!locationExists(projectRoot+'/_charlie.js')){
	fs.createReadStream(`${__dirname}/unload/charlie.js`).pipe(fs.createWriteStream(`${projectRoot}/charlie.js`));
}
