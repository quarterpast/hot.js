const fs = require("fs"),
path = require("path");

exports.modules = {};
exports.load = function(file) {
	var that = this;
	exports.modules[path.basename(file,".js")] = require(file);
	that.emit("load",exports.modules[path.basename(file,".js")]);
	fs.watch(file,function(event,name) {
		if(!name) name = file;
		if(name != file) delete exports.modules[path.basename(file,".js")]
		delete require.cache[path.join(__dirname,name)];
		exports.modules[path.basename(name,".js")] = require(name);
		that.emit("reload",exports.modules[path.basename(name,".js")],name);
	});
}
exports.load.prototype = new process.EventEmitter();