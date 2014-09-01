// 本地 key-value 数据库操作
var localDatabase = function() {
		
}

localDatabase.prototype.item = function(k) {
	var val = localStorage.getItem(k);
	if(!val) return null;
	
	try{
		//val = JSON.parse(val);
	} catch(e) {
		console.log(e);
		val = val;
	}
	
	return val;
};

localDatabase.prototype.set = function(k, val) {
	try{
		if(typeof(val) != 'string') val = JSON.stringify(val);
		
		localStorage.setItem(k, val);
	} catch(e) {
		console.log(e);
	}
};

localDatabase.prototype.list = function() {
	var k = '', val = null, rList = [];
	for(var i = 0, l = localStorage.length; i < l; i++) {
		k = localStorage.key(i);
		val = this.item(k);
		
		var o = {};
		o.id = k;
		o.name = val;
		if(val) rList.push(o);
	}
	return rList;
};

localDatabase.prototype.clear = function() {
	localStorage.clear();
};

localDatabase.prototype.del = function(k) {
	localStorage.removeItem(k);
};