// Arguments passed are accessible view charlieWork.args
charlieWork.shell = require('gulp-shell'); //require any gulp plugin(s) used, and define as a property of "charlieWork"

charlieWork.taskArr = [ // array of tasks that will run
	{ // task deffinition
		name: 'msg',
		deffinition: charlieWork.shell.task([
			'echo This is exampleGulpTask.gulp.js, running "echo" in gulp-shell',
			`echo arguments received: ${charlieWork.args}`
		])
	},
	{ // task deffinition
		name: 'msg2',
		deffinition: charlieWork.shell.task([
			'echo 2nd message, just to show two instances...'
		])
	}
];

/*
	Note: tasks are parsed from top to bottom as always, but are executed asynchronously
*/
