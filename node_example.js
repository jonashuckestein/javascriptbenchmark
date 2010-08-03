// TODO create object
var jsbm = require('./javascriptbenchmark');

jsbm.title('Is String.length slow?');
jsbm.description('Super long text goes here ...');

jsbm.author('@jonashuckestein');

jsbm.setup(function() {
	this.longString = (new Array(2985478)).join('long');
});

jsbm.test("string.length", function() {
	var a = this.longString.length === 0;
});

jsbm.test("string === ''", function() {
	var a = this.longString === '';
});

jsbm.test("!string", function() {
	var a = !this.longString;
});

jsbm.run();

jsbm.printResults();