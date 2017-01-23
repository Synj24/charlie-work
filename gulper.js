global.charlieWork.gulp = require('gulp');

function whenReady(test, func) {
    if (test()) func();
    else {
        var notReady = setInterval(function() {
            if (test()) {
                func();
                clearInterval(notReady);
            }
        }, 100);
    }
}
var complete = 0;
function appplyCB(i, gulp, taskArr){
	whenReady(function() {
		return gulp.tasks[taskArr[i].name].done;
	}, function() {
		complete++;
		if (taskArr.length === complete) {
					process.exit();
		}
	});
}

module.exports = function(taskPath, args) {
	global.charlieWork.args = JSON.parse(args);
    require(taskPath);
    for (i = 0; i < charlieWork.taskArr.length; i++) {
        charlieWork.gulp.task(charlieWork.taskArr[i].name, charlieWork.taskArr[i].deffinition);
        charlieWork.gulp.start(charlieWork.taskArr[i].name);
		appplyCB(i, charlieWork.gulp, charlieWork.taskArr);
    }
};
