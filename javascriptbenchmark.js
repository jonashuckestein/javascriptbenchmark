var jsbm = (function() {

	var _tests = {},
		// the key has to be unique
	    _author = "anonymous",
		_description = null,
		_title = "Testing some stuff (this is the default title)",
		_repetitions = 1000000,
		//_statusCallback = function(){},
		_setupFunc = function() {},
		_done = false,
		_times;

	var title = function(title) {
		_title = title;
	};
	var description = function(description) {
		_description = description;
	};
	var author = function(author) {
		_author = author;
	};
	var setup = function(setupFunc) {
		_setupFunc = setupFunc;
	};
	var test = function(title, testFunc) {
		_tests[title] = testFunc;
	};
    // var statusCallback = function(statusCallbackFunc) {
    //  _statusCallback = statusCallbackFunc();
    // };
	var run = function(options) {
		var id, i, sandbox; //, status_callback_time;
		
		_times = {};
		
		if (options === undefined || options === null) {
			options = {};
		}
		for (id in _tests) {
			if (_tests.hasOwnProperty(id)) {
                // we sandbox the tests
                // this takes (on my iMac) about 20ms extra for each 1M repetitions.
                // that seems acceptable in absolute terms
                sandbox = {};
                _setupFunc.apply(sandbox);
                _times[id] = new Date().getTime();
                //status_callback_time = 0;
				for (i = 0; i < _repetitions; i++) {
					_tests[id].apply(sandbox);
//					status_callback_time += new Date().getTime();
				    _statusCallback(id, i);
//					status_callback_time -= new Date().getTime();
				}
				_times[id] = new Date().getTime() - _times[id] ; //+ status_callback_time;
			}
		}
		_done = true;
		return _times;
	};
    
    var _getLocalAssesment = function() {
        var min = Infinity, max = 0, id, min_id;

        for (id in _tests) {
			if (_tests.hasOwnProperty(id)) {
			    if (_times[id] > max) {
			        max = _times[id];
			    }
			    if (_times[id] < min) {
			        min = _times[id];
                    min_id = id;
			    }
		    }
		}
		return '"' + min_id + '" is up to ' + Math.floor((max - min)/min * 100) + '% faster.';
    };

	var printResults = function() {
	    var id;
	    console.log("\n"+_title);
	    console.log(new Array(70).join("="));
	    _description && console.log(_description);
        if (_done) {
            console.log("\nResults for " + _repetitions + " repetitions:\n");
    		for (id in _tests) {
    			if (_tests.hasOwnProperty(id)) {
                    console.log("  '" + id + "': " + _times[id] + "ms");
    			}
    		}
            console.log("\n"+_getLocalAssesment()+"\n");
        }	    
	};

	return {
		test: test,
		run: run,
		setup: setup,
		title: title,
		description: description,
		author: author,
		printResults: printResults,
		send
	};
})();

if (typeof(window) === 'undefined') {
	module.exports = jsbm;
} else {
	window.jsbm = jsbm;
}
