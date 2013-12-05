var assert = require("assert");
var browserify = require("browserify");
var Stream = require('stream');
var fs = require('fs');
var exec = require('child_process').exec;

describe("the knights templar transform function for browserify", function() {
    
    it("should be a function", function() {
        assert.equal(typeof require('../'),"function");
    });
    
    it("should return a stream", function() {
        var tkr = require('../');
        assert.ok(tkr() instanceof Stream);
    });
    
    it("should be chainable with browserify.transform()", function() {
        var tkr = require('../');
        var bundle = browserify('./test/file1.js')
        .transform('.')
        .bundle();
        assert.ok(bundle instanceof Stream);
    });
    
    it("should remove all calls to knights-templar", function(done) {
        var tkr = require('../');
        var bundle = browserify('./test/file1.js')
        .transform(tkr)
        .bundle(
            {
                detectGlobals: true
            }, 
            function(err, src) {
                var regex = /require\('knights-templar'\)/;
                assert(!err);
                assert(src.length > 0);
                assert(!regex.test(src));
                
                done();
            }
        );
    });
    
    it("should be callable with the -t argument of browserify", function(done){
        exec('browserify -t ktbr ./test/file1.js', function(err, stdout, stderr){
            
            var regex = /require\('knights-templar'\)/;
            assert(!stderr);
            assert(stdout.length > 0);
            assert(!regex.test(stdout));
            
            done();
        })
    });
    
    it("should be able to compile underscore templates", function(done){
        var tkr = require('../');
        var bundle = browserify('./test/file1.js')
        .transform(tkr)
        .bundle(
            {
                detectGlobals: true
            }, 
            function(err, src) {
                var regex = /require\('knights-templar'\)/;
                assert(!err);
                assert(src.length > 0);
                assert(!regex.test(src));
                
                done();
            }
        );
    });
    
})