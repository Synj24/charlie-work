global.charlieWork.fs = require('fs');
global.charlieWork.path = require('path');
global.charlieWork.grunt = require('grunt');
module.exports = function(taskPath, args) {
    global.charlieWork.args = JSON.parse(args);
    global.charlieWork.taskDefs = {};
    global.charlieWork.taskArr = [];
    global.charlieWork.grunt.task.init = function() {};
	global.charlieWork.grunt.loadPlugins = function(arr) {
        for (i = 0; i < arr.length; i++) {
            global.charlieWork.grunt.loadNpmTasks(arr[i]);
			global.charlieWork.taskDefs[arr[i].replace('grunt-', '')] = {};
        }
    };
	require(taskPath);
    global.charlieWork.grunt.initConfig(global.charlieWork.taskDefs);
    global.charlieWork.grunt.tasks(global.charlieWork.taskArr, {}, function() {
		process.exit();
    });
};
