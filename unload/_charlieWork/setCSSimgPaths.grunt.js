charlieWork.grunt.loadPlugins([
	'grunt-string-replace',
	'grunt-shell'
]);


charlieWork.taskDefs['string-replace'].setPort = {
		files: [{
			expand: true,
			cwd: './GUI',
			src: ['**/*.css'],
			dest: './GUI'
		}],
		options:{
			replacements: [{
				pattern: /(?=localhost:).*(?=img)/gm,
				replacement: `localhost:${charlieWork.args[0]}/`
			}]
		}
};
charlieWork.taskArr.push('string-replace:setPort');


charlieWork.taskDefs.shell.options = {stderr: false};
charlieWork.taskDefs.shell.showMSG = {
	command: 'echo This is exampleGruntTask.grunt.js, running "echo" in grunt-shell'
};

charlieWork.taskArr.push('shell:showMSG');
