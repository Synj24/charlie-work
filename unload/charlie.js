var args = process.argv.slice(2, process.argv.length);
var charlie = require('charlie-work');
var xcolor = require('xcolor');
var TaskArray = [];
var taskFolder = null;
for (i = 0; i < args.length; i++) {
    if (args[i].substr(0, 1) !== '-') TaskArray.push(args[i]);
    else taskFolder = args[i].replace('-', '');
}
if (taskFolder === null) taskFolder = '_charlieWork';
taskFolder = __dirname + '/' + taskFolder;
var execStr = '';

for (var i = 0; i < TaskArray.length; i++) {
    if (i === TaskArray.length - 1) { //last run
        execStr += `charlie('${TaskArray[i]}', [], '${taskFolder}', function() {`;
        execStr += 'xcolor.log(`{{#27cf2f}}_________________________________`);';
		execStr+='console.log();';
		execStr+='console.log();';
        execStr += 'xcolor.log(`{{#27cf2f}}      {{bold}}Charlie work\'s done!{{/bold}}`);';
		execStr+='console.log();';
        execStr += 'xcolor.log(`{{#27cf2f}}_________________________________`);';
		execStr+='console.log();';
		for (var j = 0; j < TaskArray.length; j++) {
		    execStr += '});';
		}
    } else {
        execStr += `charlie('${TaskArray[i]}', [], '${taskFolder}', function() {`;
    }
}
setTimeout(function(){
	eval(execStr);
},0);
