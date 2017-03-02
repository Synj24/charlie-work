var charlie = require('charlie-work');
//charlie(TaskName, arguments(strings and numbers only in an array, TaskDirectory, callbackFunction);
charlie('exampleGruntTask', [1, 2, 3], `${__dirname}/_charlieWork-examples`, function(childProcess) {
	console.log('killable child returned here');
}, function() {
	console.log('callback 1');
	charlie('exampleNodeTask', ['and to the', 4], `${__dirname}/_charlieWork-examples`, function(childProcess) {
		console.log('killable child returned here');
	}, function() {
		console.log('callback 2');
		charlie('exampleGruntTask', ['snoop doggy dog', 'Dr. Dre'], `/${__dirname}/_charlieWork-examples`, function(childProcess) {
			console.log('killable child returned here');
		}, function() {
			console.log('callback 3');
			charlie('exampleGulpTask', ['is at the door'], `${__dirname}/_charlieWork-examples`, function(childProcess) {
				console.log('killable child returned here');
			}, function() {
				console.log('callback 4');
				charlie('exampleGulpTask', ['ready to make and entrace'], `${__dirname}/_charlieWork-examples`, function(childProcess) {
					console.log('killable child returned here');
				}, function() {
					console.log('callback 5');
					charlie('exampleNodeTask', ['some', 'more', 'args'], `${__dirname}/_charlieWork-examples`, function(childProcess) {
						console.log('killable child returned here');
					}, function() {
						console.log('callback 6');
					});
				});
			});
		});
	});
});
