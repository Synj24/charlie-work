var xcolor = require('xcolor')

var fs = require('fs');
global.charlieWork = {};
var scan = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    var a;
    var name;
    var type;
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (!stat || !stat.isDirectory()){
            a = file.split('/');
            name = a[a.length - 1];
            name = name.split('.');
            switch (name[1]) {
                case 'grunt':
                    type = 'grunt';
                    break;
                case 'gulp':
                    type = 'gulp';
                    break;
                default:
                    type = 'node';
                    break;
            }
            name = name[0];
            results.push({
                name: name,
                type: type,
                path: file
            });
        }
    });
    return results;
};
module.exports = function(name, args, dir, cb) {
	var processExit = false;
    var tasks = scan(dir);
    var taskAtHand = null;
    var defaultTask = null;
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].name === name) {
            taskAtHand = tasks[i];
        }
    }
    if (taskAtHand === null) {
        xcolor.log('');
        xcolor.log('{{#e80000}}Error:');
        xcolor.log('');
        xcolor.log(`{{#e80000}}    no task named ${name} could be found`);
        xcolor.log('');
        xcolor.log(`{{#e80000}}    "charlie-work" is looking for a file named:`);
        xcolor.log('');
        xcolor.log(`{{#e80000}}        ${name}.grunt.js,`);
        xcolor.log(`{{#e80000}}        ${name}.gulp.js,`);
        xcolor.log(`{{#e80000}}            OR`);
        xcolor.log(`{{#e80000}}        ${name}.js,`);
        xcolor.log('');
        xcolor.log(`{{#e80000}}    in ${dir}`);
        return false;
        process.exit();
    } else {
        xcolor.log(`{{#deb012}}attempting to run ${name}`);
    }
    var cp = require('child_process');
    switch (taskAtHand.type) {
        case 'grunt':
            // var child = cp.fork(__dirname+'/gruntWork.js', ['bobert']);
            var child = cp.fork(__dirname + '/gruntWork.js', [taskAtHand.path, JSON.stringify(args)]);
            child.on('exit', function(m) {
                cb();
                if (processExit) {
                    setTimeout(function() {
                        process.exit();
                    }, 100);
                }
            });
            // require('./grunter.js')(taskAtHand, processExit, args, cb);
            break;
        case 'gulp':
		charlieWork.args = args;
            var child = cp.fork(__dirname + '/gulpWork.js', [taskAtHand.path, JSON.stringify(args)]);
            child.on('exit', function(m) {
                cb();
                if (processExit) {
                    setTimeout(function() {
                        process.exit();
                    }, 100);
                }
            });
            break;
        case 'node':
        var child = cp.fork(__dirname+'/noder.js', [JSON.stringify(args), taskAtHand.path]);
            child.on('exit', function(m) {
			    cb();
			    if (processExit) {
			        setTimeout(function() {
			            process.exit();
			        }, 100);
			    }
			});
			break;
    }
    process.on('exit', function(e) {
		if(child) child.kill();

    });
};
