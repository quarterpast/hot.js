const fs = require("fs"),
path = require("path");

exports.modules = {};
exports.load = function(file) {
	var that = this;
	this.module = exports.modules[path.basename(file,".js")] = require(file);
	this.emit("load",this.module);
	fs.watch(file,function(event,name) {
		if(!name) name = file;
		if(name != file) delete exports.modules[path.basename(file,".js")]
		delete require.cache[path.join(__dirname,name)];
		that.module = exports.modules[path.basename(name,".js")] = require(name);
		that.emit("reload",that.module,name);
	});
}
exports.load.prototype = new process.EventEmitter();