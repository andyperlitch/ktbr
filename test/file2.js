var kt = require('knights-templar');
var template = kt.make(__dirname+'/template2.html', '_');
var markup = template({ name: 'andy', age: 24 });
console.log(markup);