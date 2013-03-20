var browserify = require("browserify");
var Stream = require('stream');
var fs = require('fs');

describe("the knights templar transform function for browserify", function() {
    
    it("should be a function", function() {
        expect(typeof require('../')).toBe("function");
    });
    
    it("should return a stream", function() {
        var tkr = require('../');
        expect(tkr() instanceof Stream).toBeTruthy();
    });
    
    it("should be chainable with browserify.transform()", function() {
        var tkr = require('../');
        var bundle = browserify('./file1.js')
        .transform('../index')
        .bundle();
        expect(bundle instanceof Stream).toBeTruthy();
    });
    
    it("should remove all calls to knights-templar", function(done) {
        var tkr = require('../');
        var bundle = browserify('./specs/file1.js')
        .transform(tkr)
        .bundle(
            {
                detectGlobals: true
            }, 
            function(err, src) {
                expect(err).toBeFalsy();
                expect(src.length > 0).toBeTruthy();
                expect(/require\('knights-templar'\)/.test(src)).toBeFalsy();
                done();
            }
        );
    });
    
    
    
})