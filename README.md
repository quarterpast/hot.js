Really stupid module hotloading for node. Use like:

```javascript
const hot = require("hot.js");
var one = new hot.load("./one.js");
one.on("reload",function() {
	console.log(hot.modules.one);
});
```