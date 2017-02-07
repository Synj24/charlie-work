// Arguments passed are accessible view charlieWork.args
charlieWork.grunt.loadNpmTasks('grunt-shell'); // initialize grunt plugin(s)
charlieWork.taskDefs.shell = { // define plugin as an object, empty, or with options defined
    options: {
        stderr: false
    },
};


charlieWork.taskDefs.shell.showMSG = { // specific task deffinition
    command: `echo This is exampleGruntTask.grunt.js, running "echo" in grunt-shell$"\narguments received: ${charlieWork.args.join(',')}"`
};
charlieWork.taskArr.push('shell:showMSG'); // add a stack (synchronous, executes in order)


charlieWork.taskDefs.shell.showMSG2 = { // specific task deffinition
    command: `echo 2nd message, just to show two instances...`
};
charlieWork.taskArr.push('shell:showMSG2'); // add task to stack (synchronous, executes in order)
