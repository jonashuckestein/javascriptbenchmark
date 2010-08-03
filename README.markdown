Javascript Benchmark
=========================================================================================
This is the initial version of what I'm hoping to soon be the Javascript Equivalent of http://rubybenchmark.com.

Javascript Benchmark allows you to comparatively benchmark snippets of JavaScript code that achieve the same thing.

Usage
-----------------------------------------------------------------------------------------------------
Take a look at test.html (you can use fs.js to start a simple ad-hoc fileserver) and node_example.js.

TODO
-----------------------------------------------------------------------------------------------------
Things I hope I'll get to soon:

 * jsbm.submit() to submit results to a central server
 * jsbm.require() to pull code (such as jQuery from a remote server)
 * jsbm.environment() to give tons of information about the testing conditions and environment
 * make HTML testbed that allows testing of DOM manipulations and such
 * allow testers to run scripts from the central server and record the results
 * make a frontend for the central server that shows nice graphs and maybe has a few community features
 * consider using a smarter benchmarking script with a variable number of repetitions
