if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop, handler) {
			var
			  oldval = this[prop]
			, newval = oldval
			, getter = function () {
				return newval;
			}
			, setter = function (val) {
				oldval = newval;
				return newval = handler.call(this, prop, oldval, val);
			}
			;
			
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}

// object.unwatch
if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}

/*


var o = { p: 1 };
undefined
o.watch("p", function (id, oldval, newval) {
    console.log( "o." + id + " changed from " + oldval + " to " + newval );
    return newval;
});
undefined
o.p = 2;
VM59:2 o.p changed from 1 to 2
2
o.p="sjdhbchjsd"
VM59:2 o.p changed from 2 to sjdhbchjsd
"sjdhbchjsd"

*/
