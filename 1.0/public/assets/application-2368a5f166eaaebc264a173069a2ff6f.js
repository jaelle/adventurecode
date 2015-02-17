/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).focus()
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top += scrollTop

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: scrollHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);












// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
;
(function() {


}).call(this);
// Do not edit this file; automatically generated by build.py.
"use strict";

var COMPILED=!0,goog=goog||{};goog.global=this;goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c=c[d]?c[d]:c[d]={}:c[d]=b};
goog.define=function(a,b){var c=b;COMPILED||(goog.global.CLOSURE_UNCOMPILED_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES,a)?c=goog.global.CLOSURE_UNCOMPILED_DEFINES[a]:goog.global.CLOSURE_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES,a)&&(c=goog.global.CLOSURE_DEFINES[a]));goog.exportPath_(a,c)};goog.DEBUG=!0;goog.LOCALE="en";goog.TRUSTED_SITE=!0;goog.STRICT_MODE_COMPATIBLE=!1;
goog.provide=function(a){if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a];for(var b=a;(b=b.substring(0,b.lastIndexOf(".")))&&!goog.getObjectByName(b);)goog.implicitNamespaces_[b]=!0}goog.exportPath_(a)};goog.setTestOnly=function(a){if(COMPILED&&!goog.DEBUG)throw a=a||"",Error("Importing test-only code into non-debug environment"+a?": "+a:".");};goog.forwardDeclare=function(a){};
COMPILED||(goog.isProvided_=function(a){return!goog.implicitNamespaces_[a]&&goog.isDefAndNotNull(goog.getObjectByName(a))},goog.implicitNamespaces_={});goog.getObjectByName=function(a,b){for(var c=a.split("."),d=b||goog.global,e;e=c.shift();)if(goog.isDefAndNotNull(d[e]))d=d[e];else return null;return d};goog.globalize=function(a,b){var c=b||goog.global,d;for(d in a)c[d]=a[d]};
goog.addDependency=function(a,b,c){if(goog.DEPENDENCIES_ENABLED){var d;a=a.replace(/\\/g,"/");for(var e=goog.dependencies_,f=0;d=b[f];f++)e.nameToPath[d]=a,a in e.pathToNames||(e.pathToNames[a]={}),e.pathToNames[a][d]=!0;for(d=0;b=c[d];d++)a in e.requires||(e.requires[a]={}),e.requires[a][b]=!0}};goog.ENABLE_DEBUG_LOADER=!0;
goog.require=function(a){if(!COMPILED&&!goog.isProvided_(a)){if(goog.ENABLE_DEBUG_LOADER){var b=goog.getPathFromDeps_(a);if(b){goog.included_[b]=!0;goog.writeScripts_();return}}a="goog.require could not find: "+a;goog.global.console&&goog.global.console.error(a);throw Error(a);}};goog.basePath="";goog.nullFunction=function(){};goog.identityFunction=function(a,b){return a};goog.abstractMethod=function(){throw Error("unimplemented abstract method");};
goog.addSingletonGetter=function(a){a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a}};goog.instantiatedSingletons_=[];goog.DEPENDENCIES_ENABLED=!COMPILED&&goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED&&(goog.included_={},goog.dependencies_={pathToNames:{},nameToPath:{},requires:{},visited:{},written:{}},goog.inHtmlDocument_=function(){var a=goog.global.document;return"undefined"!=typeof a&&"write"in a},goog.findBasePath_=function(){if(goog.global.CLOSURE_BASE_PATH)goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_())for(var a=goog.global.document.getElementsByTagName("script"),b=a.length-1;0<=b;--b){var c=a[b].src,d=c.lastIndexOf("?"),d=-1==d?c.length:
d;if("base.js"==c.substr(d-7,7)){goog.basePath=c.substr(0,d-7);break}}},goog.importScript_=function(a){var b=goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_;!goog.dependencies_.written[a]&&b(a)&&(goog.dependencies_.written[a]=!0)},goog.writeScriptTag_=function(a){if(goog.inHtmlDocument_()){var b=goog.global.document;if("complete"==b.readyState){if(/\bdeps.js$/.test(a))return!1;throw Error('Cannot write "'+a+'" after document load');}b.write('<script type="text/javascript" src="'+a+'">\x3c/script>');
return!0}return!1},goog.writeScripts_=function(){function a(e){if(!(e in d.written)){if(!(e in d.visited)&&(d.visited[e]=!0,e in d.requires))for(var g in d.requires[e])if(!goog.isProvided_(g))if(g in d.nameToPath)a(d.nameToPath[g]);else throw Error("Undefined nameToPath for "+g);e in c||(c[e]=!0,b.push(e))}}var b=[],c={},d=goog.dependencies_,e;for(e in goog.included_)d.written[e]||a(e);for(e=0;e<b.length;e++)if(b[e])goog.importScript_(goog.basePath+b[e]);else throw Error("Undefined script input");
},goog.getPathFromDeps_=function(a){return a in goog.dependencies_.nameToPath?goog.dependencies_.nameToPath[a]:null},goog.findBasePath_(),goog.global.CLOSURE_NO_DEPS||goog.importScript_(goog.basePath+"deps.js"));
goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};goog.isDef=function(a){return void 0!==a};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return"array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return"array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isString=function(a){return"string"==typeof a};
goog.isBoolean=function(a){return"boolean"==typeof a};goog.isNumber=function(a){return"number"==typeof a};goog.isFunction=function(a){return"function"==goog.typeOf(a)};goog.isObject=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.hasUid=function(a){return!!a[goog.UID_PROPERTY_]};goog.removeUid=function(a){"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_]}catch(b){}};
goog.UID_PROPERTY_="closure_uid_"+(1E9*Math.random()>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.cloneObject(a[c]);return b}return a};goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};
goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};goog.bind=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_;return goog.bind.apply(null,arguments)};
goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c]};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date};
goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval)if(null==goog.evalWorksForGlobals_&&(goog.global.eval("var _et_ = 1;"),"undefined"!=typeof goog.global._et_?(delete goog.global._et_,goog.evalWorksForGlobals_=!0):goog.evalWorksForGlobals_=!1),goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("script");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));b.body.appendChild(c);
b.body.removeChild(c)}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;goog.getCssName=function(a,b){var c=function(a){return goog.cssNameMapping_[a]||a},d=function(a){a=a.split("-");for(var b=[],d=0;d<a.length;d++)b.push(c(a[d]));return b.join("-")},d=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:d:function(a){return a};return b?a+"-"+d(b):d(a)};goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b};
!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING);goog.getMsg=function(a,b){var c=b||{},d;for(d in c){var e=(""+c[d]).replace(/\$/g,"$$$$");a=a.replace(new RegExp("\\{\\$"+d+"\\}","gi"),e)}return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c)};goog.exportProperty=function(a,b,c){a[b]=c};
goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){var g=Array.prototype.slice.call(arguments,2);return b.prototype[c].apply(a,g)}};
goog.base=function(a,b,c){var d=arguments.callee.caller;if(goog.STRICT_MODE_COMPATIBLE||goog.DEBUG&&!d)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(d.superClass_)return d.superClass_.constructor.apply(a,Array.prototype.slice.call(arguments,1));for(var e=Array.prototype.slice.call(arguments,2),f=!1,g=a.constructor;g;g=g.superClass_&&g.superClass_.constructor)if(g.prototype[b]===d)f=!0;else if(f)return g.prototype[b].apply(a,
e);if(a[b]===d)return a.constructor.prototype[b].apply(a,e);throw Error("goog.base called from a method of one name to a method of a different name");};goog.scope=function(a){a.call(goog.global)};goog.debug={};goog.debug.Error=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,goog.debug.Error);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};goog.inherits(goog.debug.Error,Error);goog.debug.Error.prototype.name="CustomError";goog.dom={};goog.dom.NodeType={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12};goog.string={};goog.string.Unicode={NBSP:"\u00a0"};goog.string.startsWith=function(a,b){return 0==a.lastIndexOf(b,0)};goog.string.endsWith=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c};goog.string.caseInsensitiveStartsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(0,b.length))};goog.string.caseInsensitiveEndsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(a.length-b.length,b.length))};
goog.string.caseInsensitiveEquals=function(a,b){return a.toLowerCase()==b.toLowerCase()};goog.string.subs=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};goog.string.collapseWhitespace=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};goog.string.isEmpty=function(a){return/^[\s\xa0]*$/.test(a)};goog.string.isEmptySafe=function(a){return goog.string.isEmpty(goog.string.makeSafe(a))};
goog.string.isBreakingWhitespace=function(a){return!/[^\t\n\r ]/.test(a)};goog.string.isAlpha=function(a){return!/[^a-zA-Z]/.test(a)};goog.string.isNumeric=function(a){return!/[^0-9]/.test(a)};goog.string.isAlphaNumeric=function(a){return!/[^a-zA-Z0-9]/.test(a)};goog.string.isSpace=function(a){return" "==a};goog.string.isUnicodeChar=function(a){return 1==a.length&&" "<=a&&"~">=a||"\u0080"<=a&&"\ufffd">=a};goog.string.stripNewlines=function(a){return a.replace(/(\r\n|\r|\n)+/g," ")};
goog.string.canonicalizeNewlines=function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")};goog.string.normalizeWhitespace=function(a){return a.replace(/\xa0|\s/g," ")};goog.string.normalizeSpaces=function(a){return a.replace(/\xa0|[ \t]+/g," ")};goog.string.collapseBreakingSpaces=function(a){return a.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};goog.string.trim=function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
goog.string.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,"")};goog.string.trimRight=function(a){return a.replace(/[\s\xa0]+$/,"")};goog.string.caseInsensitiveCompare=function(a,b){var c=String(a).toLowerCase(),d=String(b).toLowerCase();return c<d?-1:c==d?0:1};goog.string.numerateCompareRegExp_=/(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare=function(a,b){if(a==b)return 0;if(!a)return-1;if(!b)return 1;for(var c=a.toLowerCase().match(goog.string.numerateCompareRegExp_),d=b.toLowerCase().match(goog.string.numerateCompareRegExp_),e=Math.min(c.length,d.length),f=0;f<e;f++){var g=c[f],h=d[f];if(g!=h)return c=parseInt(g,10),!isNaN(c)&&(d=parseInt(h,10),!isNaN(d)&&c-d)?c-d:g<h?-1:1}return c.length!=d.length?c.length-d.length:a<b?-1:1};goog.string.urlEncode=function(a){return encodeURIComponent(String(a))};
goog.string.urlDecode=function(a){return decodeURIComponent(a.replace(/\+/g," "))};goog.string.newLineToBr=function(a,b){return a.replace(/(\r\n|\r|\n)/g,b?"<br />":"<br>")};
goog.string.htmlEscape=function(a,b){if(b)return a.replace(goog.string.amperRe_,"&amp;").replace(goog.string.ltRe_,"&lt;").replace(goog.string.gtRe_,"&gt;").replace(goog.string.quotRe_,"&quot;").replace(goog.string.singleQuoteRe_,"&#39;");if(!goog.string.allRe_.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(goog.string.amperRe_,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(goog.string.ltRe_,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(goog.string.gtRe_,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(goog.string.quotRe_,
"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(goog.string.singleQuoteRe_,"&#39;"));return a};goog.string.amperRe_=/&/g;goog.string.ltRe_=/</g;goog.string.gtRe_=/>/g;goog.string.quotRe_=/"/g;goog.string.singleQuoteRe_=/'/g;goog.string.allRe_=/[&<>"']/;goog.string.unescapeEntities=function(a){return goog.string.contains(a,"&")?"document"in goog.global?goog.string.unescapeEntitiesUsingDom_(a):goog.string.unescapePureXmlEntities_(a):a};
goog.string.unescapeEntitiesWithDocument=function(a,b){return goog.string.contains(a,"&")?goog.string.unescapeEntitiesUsingDom_(a,b):a};
goog.string.unescapeEntitiesUsingDom_=function(a,b){var c={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'},d;d=b?b.createElement("div"):document.createElement("div");return a.replace(goog.string.HTML_ENTITY_PATTERN_,function(a,b){var g=c[a];if(g)return g;if("#"==b.charAt(0)){var h=Number("0"+b.substr(1));isNaN(h)||(g=String.fromCharCode(h))}g||(d.innerHTML=a+" ",g=d.firstChild.nodeValue.slice(0,-1));return c[a]=g})};
goog.string.unescapePureXmlEntities_=function(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:if("#"==c.charAt(0)){var d=Number("0"+c.substr(1));if(!isNaN(d))return String.fromCharCode(d)}return a}})};goog.string.HTML_ENTITY_PATTERN_=/&([^;\s<&]+);?/g;goog.string.whitespaceEscape=function(a,b){return goog.string.newLineToBr(a.replace(/  /g," &#160;"),b)};
goog.string.stripQuotes=function(a,b){for(var c=b.length,d=0;d<c;d++){var e=1==c?b:b.charAt(d);if(a.charAt(0)==e&&a.charAt(a.length-1)==e)return a.substring(1,a.length-1)}return a};goog.string.truncate=function(a,b,c){c&&(a=goog.string.unescapeEntities(a));a.length>b&&(a=a.substring(0,b-3)+"...");c&&(a=goog.string.htmlEscape(a));return a};
goog.string.truncateMiddle=function(a,b,c,d){c&&(a=goog.string.unescapeEntities(a));if(d&&a.length>b){d>b&&(d=b);var e=a.length-d;a=a.substring(0,b-d)+"..."+a.substring(e)}else a.length>b&&(d=Math.floor(b/2),e=a.length-d,a=a.substring(0,d+b%2)+"..."+a.substring(e));c&&(a=goog.string.htmlEscape(a));return a};goog.string.specialEscapeChars_={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\"};goog.string.jsEscapeCache_={"'":"\\'"};
goog.string.quote=function(a){a=String(a);if(a.quote)return a.quote();for(var b=['"'],c=0;c<a.length;c++){var d=a.charAt(c),e=d.charCodeAt(0);b[c+1]=goog.string.specialEscapeChars_[d]||(31<e&&127>e?d:goog.string.escapeChar(d))}b.push('"');return b.join("")};goog.string.escapeString=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=goog.string.escapeChar(a.charAt(c));return b.join("")};
goog.string.escapeChar=function(a){if(a in goog.string.jsEscapeCache_)return goog.string.jsEscapeCache_[a];if(a in goog.string.specialEscapeChars_)return goog.string.jsEscapeCache_[a]=goog.string.specialEscapeChars_[a];var b=a,c=a.charCodeAt(0);if(31<c&&127>c)b=a;else{if(256>c){if(b="\\x",16>c||256<c)b+="0"}else b="\\u",4096>c&&(b+="0");b+=c.toString(16).toUpperCase()}return goog.string.jsEscapeCache_[a]=b};goog.string.toMap=function(a){for(var b={},c=0;c<a.length;c++)b[a.charAt(c)]=!0;return b};
goog.string.contains=function(a,b){return-1!=a.indexOf(b)};goog.string.caseInsensitiveContains=function(a,b){return goog.string.contains(a.toLowerCase(),b.toLowerCase())};goog.string.countOf=function(a,b){return a&&b?a.split(b).length-1:0};goog.string.removeAt=function(a,b,c){var d=a;0<=b&&b<a.length&&0<c&&(d=a.substr(0,b)+a.substr(b+c,a.length-b-c));return d};goog.string.remove=function(a,b){var c=new RegExp(goog.string.regExpEscape(b),"");return a.replace(c,"")};
goog.string.removeAll=function(a,b){var c=new RegExp(goog.string.regExpEscape(b),"g");return a.replace(c,"")};goog.string.regExpEscape=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};goog.string.repeat=function(a,b){return Array(b+1).join(a)};goog.string.padNumber=function(a,b,c){a=goog.isDef(c)?a.toFixed(c):String(a);c=a.indexOf(".");-1==c&&(c=a.length);return goog.string.repeat("0",Math.max(0,b-c))+a};
goog.string.makeSafe=function(a){return null==a?"":String(a)};goog.string.buildString=function(a){return Array.prototype.join.call(arguments,"")};goog.string.getRandomString=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^goog.now()).toString(36)};
goog.string.compareVersions=function(a,b){for(var c=0,d=goog.string.trim(String(a)).split("."),e=goog.string.trim(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",k=e[g]||"",l=RegExp("(\\d*)(\\D*)","g"),p=RegExp("(\\d*)(\\D*)","g");do{var m=l.exec(h)||["","",""],q=p.exec(k)||["","",""];if(0==m[0].length&&0==q[0].length)break;var c=0==m[1].length?0:parseInt(m[1],10),n=0==q[1].length?0:parseInt(q[1],10),c=goog.string.compareElements_(c,n)||goog.string.compareElements_(0==
m[2].length,0==q[2].length)||goog.string.compareElements_(m[2],q[2])}while(0==c)}return c};goog.string.compareElements_=function(a,b){return a<b?-1:a>b?1:0};goog.string.HASHCODE_MAX_=4294967296;goog.string.hashCode=function(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c),b%=goog.string.HASHCODE_MAX_;return b};goog.string.uniqueStringCounter_=2147483648*Math.random()|0;goog.string.createUniqueString=function(){return"goog_"+goog.string.uniqueStringCounter_++};
goog.string.toNumber=function(a){var b=Number(a);return 0==b&&goog.string.isEmpty(a)?NaN:b};goog.string.isLowerCamelCase=function(a){return/^[a-z]+([A-Z][a-z]*)*$/.test(a)};goog.string.isUpperCamelCase=function(a){return/^([A-Z][a-z]*)+$/.test(a)};goog.string.toCamelCase=function(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})};goog.string.toSelectorCase=function(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()};
goog.string.toTitleCase=function(a,b){var c=goog.isString(b)?goog.string.regExpEscape(b):"\\s";return a.replace(new RegExp("(^"+(c?"|["+c+"]+":"")+")([a-z])","g"),function(a,b,c){return b+c.toUpperCase()})};goog.string.parseInt=function(a){isFinite(a)&&(a=String(a));return goog.isString(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};goog.string.splitLimit=function(a,b,c){a=a.split(b);for(var d=[];0<c&&a.length;)d.push(a.shift()),c--;a.length&&d.push(a.join(b));return d};goog.asserts={};goog.asserts.ENABLE_ASSERTS=goog.DEBUG;goog.asserts.AssertionError=function(a,b){b.unshift(a);goog.debug.Error.call(this,goog.string.subs.apply(null,b));b.shift();this.messagePattern=a};goog.inherits(goog.asserts.AssertionError,goog.debug.Error);goog.asserts.AssertionError.prototype.name="AssertionError";goog.asserts.doAssertFailure_=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new goog.asserts.AssertionError(""+e,f||[]);};
goog.asserts.assert=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!a&&goog.asserts.doAssertFailure_("",null,b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.fail=function(a,b){if(goog.asserts.ENABLE_ASSERTS)throw new goog.asserts.AssertionError("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};
goog.asserts.assertNumber=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isNumber(a)&&goog.asserts.doAssertFailure_("Expected number but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertString=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isString(a)&&goog.asserts.doAssertFailure_("Expected string but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertFunction=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isFunction(a)&&goog.asserts.doAssertFailure_("Expected function but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertObject=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isObject(a)&&goog.asserts.doAssertFailure_("Expected object but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertArray=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isArray(a)&&goog.asserts.doAssertFailure_("Expected array but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertBoolean=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isBoolean(a)&&goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertElement=function(a,b,c){!goog.asserts.ENABLE_ASSERTS||goog.isObject(a)&&a.nodeType==goog.dom.NodeType.ELEMENT||goog.asserts.doAssertFailure_("Expected Element but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertInstanceof=function(a,b,c,d){!goog.asserts.ENABLE_ASSERTS||a instanceof b||goog.asserts.doAssertFailure_("instanceof check failed.",null,c,Array.prototype.slice.call(arguments,3));return a};
goog.asserts.assertObjectPrototypeIsIntact=function(){for(var a in Object.prototype)goog.asserts.fail(a+" should not be enumerable in Object.prototype.")};goog.array={};goog.NATIVE_ARRAY_PROTOTYPES=goog.TRUSTED_SITE;goog.array.ASSUME_NATIVE_FUNCTIONS=!1;goog.array.peek=function(a){return a[a.length-1]};goog.array.ARRAY_PROTOTYPE_=Array.prototype;
goog.array.indexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||goog.array.ARRAY_PROTOTYPE_.indexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(goog.isString(a))return goog.isString(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};
goog.array.lastIndexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||goog.array.ARRAY_PROTOTYPE_.lastIndexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a,b,null==c?a.length-1:c)}:function(a,b,c){c=null==c?a.length-1:c;0>c&&(c=Math.max(0,a.length+c));if(goog.isString(a))return goog.isString(b)&&1==b.length?a.lastIndexOf(b,c):-1;for(;0<=c;c--)if(c in a&&a[c]===b)return c;return-1};
goog.array.forEach=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||goog.array.ARRAY_PROTOTYPE_.forEach)?function(a,b,c){goog.asserts.assert(null!=a.length);goog.array.ARRAY_PROTOTYPE_.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};goog.array.forEachRight=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,d=d-1;0<=d;--d)d in e&&b.call(c,e[d],d,a)};
goog.array.filter=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||goog.array.ARRAY_PROTOTYPE_.filter)?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=goog.isString(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var k=g[h];b.call(c,k,h,a)&&(e[f++]=k)}return e};
goog.array.map=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||goog.array.ARRAY_PROTOTYPE_.map)?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=goog.isString(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e};
goog.array.reduce=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||goog.array.ARRAY_PROTOTYPE_.reduce)?function(a,b,c,d){goog.asserts.assert(null!=a.length);d&&(b=goog.bind(b,d));return goog.array.ARRAY_PROTOTYPE_.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEach(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.reduceRight=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||goog.array.ARRAY_PROTOTYPE_.reduceRight)?function(a,b,c,d){goog.asserts.assert(null!=a.length);d&&(b=goog.bind(b,d));return goog.array.ARRAY_PROTOTYPE_.reduceRight.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEachRight(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.some=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||goog.array.ARRAY_PROTOTYPE_.some)?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1};
goog.array.every=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||goog.array.ARRAY_PROTOTYPE_.every)?function(a,b,c){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};goog.array.count=function(a,b,c){var d=0;goog.array.forEach(a,function(a,f,g){b.call(c,a,f,g)&&++d},c);return d};
goog.array.find=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};goog.array.findIndex=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1};goog.array.findRight=function(a,b,c){b=goog.array.findIndexRight(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};
goog.array.findIndexRight=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,d=d-1;0<=d;d--)if(d in e&&b.call(c,e[d],d,a))return d;return-1};goog.array.contains=function(a,b){return 0<=goog.array.indexOf(a,b)};goog.array.isEmpty=function(a){return 0==a.length};goog.array.clear=function(a){if(!goog.isArray(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0};goog.array.insert=function(a,b){goog.array.contains(a,b)||a.push(b)};
goog.array.insertAt=function(a,b,c){goog.array.splice(a,c,0,b)};goog.array.insertArrayAt=function(a,b,c){goog.partial(goog.array.splice,a,c,0).apply(null,b)};goog.array.insertBefore=function(a,b,c){var d;2==arguments.length||0>(d=goog.array.indexOf(a,c))?a.push(b):goog.array.insertAt(a,b,d)};goog.array.remove=function(a,b){var c=goog.array.indexOf(a,b),d;(d=0<=c)&&goog.array.removeAt(a,c);return d};
goog.array.removeAt=function(a,b){goog.asserts.assert(null!=a.length);return 1==goog.array.ARRAY_PROTOTYPE_.splice.call(a,b,1).length};goog.array.removeIf=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0<=b?(goog.array.removeAt(a,b),!0):!1};goog.array.concat=function(a){return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_,arguments)};goog.array.join=function(a){return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_,arguments)};
goog.array.toArray=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};goog.array.clone=goog.array.toArray;goog.array.extend=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c],e;if(goog.isArray(d)||(e=goog.isArrayLike(d))&&Object.prototype.hasOwnProperty.call(d,"callee"))a.push.apply(a,d);else if(e)for(var f=a.length,g=d.length,h=0;h<g;h++)a[f+h]=d[h];else a.push(d)}};
goog.array.splice=function(a,b,c,d){goog.asserts.assert(null!=a.length);return goog.array.ARRAY_PROTOTYPE_.splice.apply(a,goog.array.slice(arguments,1))};goog.array.slice=function(a,b,c){goog.asserts.assert(null!=a.length);return 2>=arguments.length?goog.array.ARRAY_PROTOTYPE_.slice.call(a,b):goog.array.ARRAY_PROTOTYPE_.slice.call(a,b,c)};
goog.array.removeDuplicates=function(a,b,c){b=b||a;var d=function(a){return goog.isObject(g)?"o"+goog.getUid(g):(typeof g).charAt(0)+g};c=c||d;for(var d={},e=0,f=0;f<a.length;){var g=a[f++],h=c(g);Object.prototype.hasOwnProperty.call(d,h)||(d[h]=!0,b[e++]=g)}b.length=e};goog.array.binarySearch=function(a,b,c){return goog.array.binarySearch_(a,c||goog.array.defaultCompare,!1,b)};goog.array.binarySelect=function(a,b,c){return goog.array.binarySearch_(a,b,!0,void 0,c)};
goog.array.binarySearch_=function(a,b,c,d,e){for(var f=0,g=a.length,h;f<g;){var k=f+g>>1,l;l=c?b.call(e,a[k],k,a):b(d,a[k]);0<l?f=k+1:(g=k,h=!l)}return h?f:~f};goog.array.sort=function(a,b){a.sort(b||goog.array.defaultCompare)};goog.array.stableSort=function(a,b){for(var c=0;c<a.length;c++)a[c]={index:c,value:a[c]};var d=b||goog.array.defaultCompare;goog.array.sort(a,function(a,b){return d(a.value,b.value)||a.index-b.index});for(c=0;c<a.length;c++)a[c]=a[c].value};
goog.array.sortObjectsByKey=function(a,b,c){var d=c||goog.array.defaultCompare;goog.array.sort(a,function(a,c){return d(a[b],c[b])})};goog.array.isSorted=function(a,b,c){b=b||goog.array.defaultCompare;for(var d=1;d<a.length;d++){var e=b(a[d-1],a[d]);if(0<e||0==e&&c)return!1}return!0};goog.array.equals=function(a,b,c){if(!goog.isArrayLike(a)||!goog.isArrayLike(b)||a.length!=b.length)return!1;var d=a.length;c=c||goog.array.defaultCompareEquality;for(var e=0;e<d;e++)if(!c(a[e],b[e]))return!1;return!0};
goog.array.compare3=function(a,b,c){c=c||goog.array.defaultCompare;for(var d=Math.min(a.length,b.length),e=0;e<d;e++){var f=c(a[e],b[e]);if(0!=f)return f}return goog.array.defaultCompare(a.length,b.length)};goog.array.defaultCompare=function(a,b){return a>b?1:a<b?-1:0};goog.array.defaultCompareEquality=function(a,b){return a===b};goog.array.binaryInsert=function(a,b,c){c=goog.array.binarySearch(a,b,c);return 0>c?(goog.array.insertAt(a,b,-(c+1)),!0):!1};
goog.array.binaryRemove=function(a,b,c){b=goog.array.binarySearch(a,b,c);return 0<=b?goog.array.removeAt(a,b):!1};goog.array.bucket=function(a,b,c){for(var d={},e=0;e<a.length;e++){var f=a[e],g=b.call(c,f,e,a);goog.isDef(g)&&(d[g]||(d[g]=[])).push(f)}return d};goog.array.toObject=function(a,b,c){var d={};goog.array.forEach(a,function(e,f){d[b.call(c,e,f,a)]=e});return d};
goog.array.range=function(a,b,c){var d=[],e=0,f=a;c=c||1;void 0!==b&&(e=a,f=b);if(0>c*(f-e))return[];if(0<c)for(a=e;a<f;a+=c)d.push(a);else for(a=e;a>f;a+=c)d.push(a);return d};goog.array.repeat=function(a,b){for(var c=[],d=0;d<b;d++)c[d]=a;return c};goog.array.flatten=function(a){for(var b=[],c=0;c<arguments.length;c++){var d=arguments[c];goog.isArray(d)?b.push.apply(b,goog.array.flatten.apply(null,d)):b.push(d)}return b};
goog.array.rotate=function(a,b){goog.asserts.assert(null!=a.length);a.length&&(b%=a.length,0<b?goog.array.ARRAY_PROTOTYPE_.unshift.apply(a,a.splice(-b,b)):0>b&&goog.array.ARRAY_PROTOTYPE_.push.apply(a,a.splice(0,-b)));return a};goog.array.moveItem=function(a,b,c){goog.asserts.assert(0<=b&&b<a.length);goog.asserts.assert(0<=c&&c<a.length);b=goog.array.ARRAY_PROTOTYPE_.splice.call(a,b,1);goog.array.ARRAY_PROTOTYPE_.splice.call(a,c,0,b[0])};
goog.array.zip=function(a){if(!arguments.length)return[];for(var b=[],c=0;;c++){for(var d=[],e=0;e<arguments.length;e++){var f=arguments[e];if(c>=f.length)return b;d.push(f[c])}b.push(d)}};goog.array.shuffle=function(a,b){for(var c=b||Math.random,d=a.length-1;0<d;d--){var e=Math.floor(c()*(d+1)),f=a[d];a[d]=a[e];a[e]=f}};goog.labs={};goog.labs.userAgent={};goog.labs.userAgent.util={};goog.labs.userAgent.util.getNativeUserAgentString_=function(){var a=goog.labs.userAgent.util.getNavigator_();return a&&(a=a.userAgent)?a:""};goog.labs.userAgent.util.getNavigator_=function(){return goog.global.navigator};goog.labs.userAgent.util.userAgent_=goog.labs.userAgent.util.getNativeUserAgentString_();goog.labs.userAgent.util.setUserAgent=function(a){goog.labs.userAgent.util.userAgent_=a||goog.labs.userAgent.util.getNativeUserAgentString_()};
goog.labs.userAgent.util.getUserAgent=function(){return goog.labs.userAgent.util.userAgent_};goog.labs.userAgent.util.matchUserAgent=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.contains(b,a)};goog.labs.userAgent.util.matchUserAgentIgnoreCase=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.caseInsensitiveContains(b,a)};
goog.labs.userAgent.util.extractVersionTuples=function(a){for(var b=RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?","g"),c=[],d;d=b.exec(a);)c.push([d[1],d[2],d[3]||void 0]);return c};goog.labs.userAgent.browser={};goog.labs.userAgent.browser.matchOpera_=function(){return goog.labs.userAgent.util.matchUserAgent("Opera")||goog.labs.userAgent.util.matchUserAgent("OPR")};goog.labs.userAgent.browser.matchIE_=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.browser.matchFirefox_=function(){return goog.labs.userAgent.util.matchUserAgent("Firefox")};
goog.labs.userAgent.browser.matchSafari_=function(){return goog.labs.userAgent.util.matchUserAgent("Safari")&&!goog.labs.userAgent.util.matchUserAgent("Chrome")&&!goog.labs.userAgent.util.matchUserAgent("CriOS")&&!goog.labs.userAgent.util.matchUserAgent("Android")};goog.labs.userAgent.browser.matchChrome_=function(){return goog.labs.userAgent.util.matchUserAgent("Chrome")||goog.labs.userAgent.util.matchUserAgent("CriOS")};
goog.labs.userAgent.browser.matchAndroidBrowser_=function(){return goog.labs.userAgent.util.matchUserAgent("Android")&&!goog.labs.userAgent.util.matchUserAgent("Chrome")&&!goog.labs.userAgent.util.matchUserAgent("CriOS")};goog.labs.userAgent.browser.isOpera=goog.labs.userAgent.browser.matchOpera_;goog.labs.userAgent.browser.isIE=goog.labs.userAgent.browser.matchIE_;goog.labs.userAgent.browser.isFirefox=goog.labs.userAgent.browser.matchFirefox_;goog.labs.userAgent.browser.isSafari=goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isChrome=goog.labs.userAgent.browser.matchChrome_;goog.labs.userAgent.browser.isAndroidBrowser=goog.labs.userAgent.browser.matchAndroidBrowser_;goog.labs.userAgent.browser.isSilk=function(){return goog.labs.userAgent.util.matchUserAgent("Silk")};
goog.labs.userAgent.browser.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent();if(goog.labs.userAgent.browser.isIE())return goog.labs.userAgent.browser.getIEVersion_(a);if(goog.labs.userAgent.browser.isOpera())return goog.labs.userAgent.browser.getOperaVersion_(a);a=goog.labs.userAgent.util.extractVersionTuples(a);return goog.labs.userAgent.browser.getVersionFromTuples_(a)};
goog.labs.userAgent.browser.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(),a)};goog.labs.userAgent.browser.getIEVersion_=function(a){var b=/rv: *([\d\.]*)/.exec(a);if(b&&b[1])return b[1];var b="",c=/MSIE +([\d\.]+)/.exec(a);if(c&&c[1])if(a=/Trident\/(\d.\d)/.exec(a),"7.0"==c[1])if(a&&a[1])switch(a[1]){case "4.0":b="8.0";break;case "5.0":b="9.0";break;case "6.0":b="10.0";break;case "7.0":b="11.0"}else b="7.0";else b=c[1];return b};
goog.labs.userAgent.browser.getOperaVersion_=function(a){a=goog.labs.userAgent.util.extractVersionTuples(a);var b=goog.array.peek(a);return"OPR"==b[0]&&b[1]?b[1]:goog.labs.userAgent.browser.getVersionFromTuples_(a)};goog.labs.userAgent.browser.getVersionFromTuples_=function(a){goog.asserts.assert(2<a.length,"Couldn't extract version tuple from user agent string");return a[2]&&a[2][1]?a[2][1]:""};goog.labs.userAgent.engine={};goog.labs.userAgent.engine.isPresto=function(){return goog.labs.userAgent.util.matchUserAgent("Presto")};goog.labs.userAgent.engine.isTrident=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.engine.isWebKit=function(){return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit")};
goog.labs.userAgent.engine.isGecko=function(){return goog.labs.userAgent.util.matchUserAgent("Gecko")&&!goog.labs.userAgent.engine.isWebKit()&&!goog.labs.userAgent.engine.isTrident()};goog.labs.userAgent.engine.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent();if(a){var a=goog.labs.userAgent.util.extractVersionTuples(a),b=a[1];if(b)return"Gecko"==b[0]?goog.labs.userAgent.engine.getVersionForKey_(a,"Firefox"):b[1];var a=a[0],c;if(a&&(c=a[2])&&(c=/Trident\/([^\s;]+)/.exec(c)))return c[1]}return""};
goog.labs.userAgent.engine.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(),a)};goog.labs.userAgent.engine.getVersionForKey_=function(a,b){var c=goog.array.find(a,function(a){return b==a[0]});return c&&c[1]||""};goog.userAgent={};goog.userAgent.ASSUME_IE=!1;goog.userAgent.ASSUME_GECKO=!1;goog.userAgent.ASSUME_WEBKIT=!1;goog.userAgent.ASSUME_MOBILE_WEBKIT=!1;goog.userAgent.ASSUME_OPERA=!1;goog.userAgent.ASSUME_ANY_VERSION=!1;goog.userAgent.BROWSER_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_GECKO||goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_OPERA;goog.userAgent.getUserAgentString=function(){return goog.labs.userAgent.util.getUserAgent()};
goog.userAgent.getNavigator=function(){return goog.global.navigator||null};goog.userAgent.OPERA=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_OPERA:goog.labs.userAgent.browser.isOpera();goog.userAgent.IE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_IE:goog.labs.userAgent.browser.isIE();goog.userAgent.GECKO=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_GECKO:goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_MOBILE_WEBKIT:goog.labs.userAgent.engine.isWebKit();goog.userAgent.isMobile_=function(){return goog.userAgent.WEBKIT&&goog.labs.userAgent.util.matchUserAgent("Mobile")};goog.userAgent.MOBILE=goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.isMobile_();goog.userAgent.SAFARI=goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_=function(){var a=goog.userAgent.getNavigator();return a&&a.platform||""};goog.userAgent.PLATFORM=goog.userAgent.determinePlatform_();goog.userAgent.ASSUME_MAC=!1;goog.userAgent.ASSUME_WINDOWS=!1;goog.userAgent.ASSUME_LINUX=!1;goog.userAgent.ASSUME_X11=!1;goog.userAgent.ASSUME_ANDROID=!1;goog.userAgent.ASSUME_IPHONE=!1;goog.userAgent.ASSUME_IPAD=!1;
goog.userAgent.PLATFORM_KNOWN_=goog.userAgent.ASSUME_MAC||goog.userAgent.ASSUME_WINDOWS||goog.userAgent.ASSUME_LINUX||goog.userAgent.ASSUME_X11||goog.userAgent.ASSUME_ANDROID||goog.userAgent.ASSUME_IPHONE||goog.userAgent.ASSUME_IPAD;
goog.userAgent.initPlatform_=function(){goog.userAgent.detectedMac_=goog.string.contains(goog.userAgent.PLATFORM,"Mac");goog.userAgent.detectedWindows_=goog.string.contains(goog.userAgent.PLATFORM,"Win");goog.userAgent.detectedLinux_=goog.string.contains(goog.userAgent.PLATFORM,"Linux");goog.userAgent.detectedX11_=!!goog.userAgent.getNavigator()&&goog.string.contains(goog.userAgent.getNavigator().appVersion||"","X11");var a=goog.userAgent.getUserAgentString();goog.userAgent.detectedAndroid_=!!a&&
goog.string.contains(a,"Android");goog.userAgent.detectedIPhone_=!!a&&goog.string.contains(a,"iPhone");goog.userAgent.detectedIPad_=!!a&&goog.string.contains(a,"iPad")};goog.userAgent.PLATFORM_KNOWN_||goog.userAgent.initPlatform_();goog.userAgent.MAC=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_MAC:goog.userAgent.detectedMac_;goog.userAgent.WINDOWS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_WINDOWS:goog.userAgent.detectedWindows_;
goog.userAgent.LINUX=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_LINUX:goog.userAgent.detectedLinux_;goog.userAgent.X11=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_X11:goog.userAgent.detectedX11_;goog.userAgent.ANDROID=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_ANDROID:goog.userAgent.detectedAndroid_;goog.userAgent.IPHONE=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPHONE:goog.userAgent.detectedIPhone_;
goog.userAgent.IPAD=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPAD:goog.userAgent.detectedIPad_;
goog.userAgent.determineVersion_=function(){var a="",b;if(goog.userAgent.OPERA&&goog.global.opera)return a=goog.global.opera.version,goog.isFunction(a)?a():a;goog.userAgent.GECKO?b=/rv\:([^\);]+)(\)|;)/:goog.userAgent.IE?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:goog.userAgent.WEBKIT&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(goog.userAgent.getUserAgentString()))?a[1]:"");return goog.userAgent.IE&&(b=goog.userAgent.getDocumentMode_(),b>parseFloat(a))?String(b):a};
goog.userAgent.getDocumentMode_=function(){var a=goog.global.document;return a?a.documentMode:void 0};goog.userAgent.VERSION=goog.userAgent.determineVersion_();goog.userAgent.compare=function(a,b){return goog.string.compareVersions(a,b)};goog.userAgent.isVersionOrHigherCache_={};
goog.userAgent.isVersionOrHigher=function(a){return goog.userAgent.ASSUME_ANY_VERSION||goog.userAgent.isVersionOrHigherCache_[a]||(goog.userAgent.isVersionOrHigherCache_[a]=0<=goog.string.compareVersions(goog.userAgent.VERSION,a))};goog.userAgent.isVersion=goog.userAgent.isVersionOrHigher;goog.userAgent.isDocumentModeOrHigher=function(a){return goog.userAgent.IE&&goog.userAgent.DOCUMENT_MODE>=a};goog.userAgent.isDocumentMode=goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE=function(){var a=goog.global.document;return a&&goog.userAgent.IE?goog.userAgent.getDocumentMode_()||("CSS1Compat"==a.compatMode?parseInt(goog.userAgent.VERSION,10):5):void 0}();goog.disposable={};goog.disposable.IDisposable=function(){};goog.Disposable=function(){goog.Disposable.MONITORING_MODE!=goog.Disposable.MonitoringMode.OFF&&(goog.Disposable.INCLUDE_STACK_ON_CREATION&&(this.creationStack=Error().stack),goog.Disposable.instances_[goog.getUid(this)]=this)};goog.Disposable.MonitoringMode={OFF:0,PERMANENT:1,INTERACTIVE:2};goog.Disposable.MONITORING_MODE=0;goog.Disposable.INCLUDE_STACK_ON_CREATION=!0;goog.Disposable.instances_={};
goog.Disposable.getUndisposedObjects=function(){var a=[],b;for(b in goog.Disposable.instances_)goog.Disposable.instances_.hasOwnProperty(b)&&a.push(goog.Disposable.instances_[Number(b)]);return a};goog.Disposable.clearUndisposedObjects=function(){goog.Disposable.instances_={}};goog.Disposable.prototype.disposed_=!1;goog.Disposable.prototype.isDisposed=function(){return this.disposed_};goog.Disposable.prototype.getDisposed=goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose=function(){if(!this.disposed_&&(this.disposed_=!0,this.disposeInternal(),goog.Disposable.MONITORING_MODE!=goog.Disposable.MonitoringMode.OFF)){var a=goog.getUid(this);if(goog.Disposable.MONITORING_MODE==goog.Disposable.MonitoringMode.PERMANENT&&!goog.Disposable.instances_.hasOwnProperty(a))throw Error(this+" did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");delete goog.Disposable.instances_[a]}};
goog.Disposable.prototype.registerDisposable=function(a){this.addOnDisposeCallback(goog.partial(goog.dispose,a))};goog.Disposable.prototype.addOnDisposeCallback=function(a,b){this.onDisposeCallbacks_||(this.onDisposeCallbacks_=[]);this.onDisposeCallbacks_.push(goog.bind(a,b))};goog.Disposable.prototype.disposeInternal=function(){if(this.onDisposeCallbacks_)for(;this.onDisposeCallbacks_.length;)this.onDisposeCallbacks_.shift()()};
goog.Disposable.isDisposed=function(a){return a&&"function"==typeof a.isDisposed?a.isDisposed():!1};goog.dispose=function(a){a&&"function"==typeof a.dispose&&a.dispose()};goog.disposeAll=function(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];goog.isArrayLike(d)?goog.disposeAll.apply(null,d):goog.dispose(d)}};goog.debug.entryPointRegistry={};goog.debug.EntryPointMonitor=function(){};goog.debug.entryPointRegistry.refList_=[];goog.debug.entryPointRegistry.monitors_=[];goog.debug.entryPointRegistry.monitorsMayExist_=!1;goog.debug.entryPointRegistry.register=function(a){goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length]=a;if(goog.debug.entryPointRegistry.monitorsMayExist_)for(var b=goog.debug.entryPointRegistry.monitors_,c=0;c<b.length;c++)a(goog.bind(b[c].wrap,b[c]))};
goog.debug.entryPointRegistry.monitorAll=function(a){goog.debug.entryPointRegistry.monitorsMayExist_=!0;for(var b=goog.bind(a.wrap,a),c=0;c<goog.debug.entryPointRegistry.refList_.length;c++)goog.debug.entryPointRegistry.refList_[c](b);goog.debug.entryPointRegistry.monitors_.push(a)};
goog.debug.entryPointRegistry.unmonitorAllIfPossible=function(a){var b=goog.debug.entryPointRegistry.monitors_;goog.asserts.assert(a==b[b.length-1],"Only the most recent monitor can be unwrapped.");a=goog.bind(a.unwrap,a);for(var c=0;c<goog.debug.entryPointRegistry.refList_.length;c++)goog.debug.entryPointRegistry.refList_[c](a);b.length--};goog.events={};
goog.events.BrowserFeature={HAS_W3C_BUTTON:!goog.userAgent.IE||goog.userAgent.isDocumentModeOrHigher(9),HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE||goog.userAgent.isDocumentModeOrHigher(9),SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE&&!goog.userAgent.isVersionOrHigher("9"),HAS_NAVIGATOR_ONLINE_PROPERTY:!goog.userAgent.WEBKIT||goog.userAgent.isVersionOrHigher("528"),HAS_HTML5_NETWORK_EVENT_SUPPORT:goog.userAgent.GECKO&&goog.userAgent.isVersionOrHigher("1.9b")||goog.userAgent.IE&&goog.userAgent.isVersionOrHigher("8")||
goog.userAgent.OPERA&&goog.userAgent.isVersionOrHigher("9.5")||goog.userAgent.WEBKIT&&goog.userAgent.isVersionOrHigher("528"),HTML5_NETWORK_EVENTS_FIRE_ON_BODY:goog.userAgent.GECKO&&!goog.userAgent.isVersionOrHigher("8")||goog.userAgent.IE&&!goog.userAgent.isVersionOrHigher("9"),TOUCH_ENABLED:"ontouchstart"in goog.global||!!(goog.global.document&&document.documentElement&&"ontouchstart"in document.documentElement)||!(!goog.global.navigator||!goog.global.navigator.msMaxTouchPoints)};goog.events.EventId=function(a){this.id=a};goog.events.EventId.prototype.toString=function(){return this.id};goog.events.Event=function(a,b){this.type=a instanceof goog.events.EventId?String(a):a;this.currentTarget=this.target=b;this.defaultPrevented=this.propagationStopped_=!1;this.returnValue_=!0};goog.events.Event.prototype.disposeInternal=function(){};goog.events.Event.prototype.dispose=function(){};goog.events.Event.prototype.stopPropagation=function(){this.propagationStopped_=!0};goog.events.Event.prototype.preventDefault=function(){this.defaultPrevented=!0;this.returnValue_=!1};
goog.events.Event.stopPropagation=function(a){a.stopPropagation()};goog.events.Event.preventDefault=function(a){a.preventDefault()};goog.events.getVendorPrefixedName_=function(a){return goog.userAgent.WEBKIT?"webkit"+a:goog.userAgent.OPERA?"o"+a.toLowerCase():a.toLowerCase()};
goog.events.EventType={CLICK:"click",DBLCLICK:"dblclick",MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",BLUR:"blur",FOCUS:"focus",DEACTIVATE:"deactivate",FOCUSIN:goog.userAgent.IE?"focusin":"DOMFocusIn",FOCUSOUT:goog.userAgent.IE?"focusout":"DOMFocusOut",CHANGE:"change",SELECT:"select",SUBMIT:"submit",INPUT:"input",PROPERTYCHANGE:"propertychange",
DRAGSTART:"dragstart",DRAG:"drag",DRAGENTER:"dragenter",DRAGOVER:"dragover",DRAGLEAVE:"dragleave",DROP:"drop",DRAGEND:"dragend",TOUCHSTART:"touchstart",TOUCHMOVE:"touchmove",TOUCHEND:"touchend",TOUCHCANCEL:"touchcancel",BEFOREUNLOAD:"beforeunload",CONSOLEMESSAGE:"consolemessage",CONTEXTMENU:"contextmenu",DOMCONTENTLOADED:"DOMContentLoaded",ERROR:"error",HELP:"help",LOAD:"load",LOSECAPTURE:"losecapture",ORIENTATIONCHANGE:"orientationchange",READYSTATECHANGE:"readystatechange",RESIZE:"resize",SCROLL:"scroll",
UNLOAD:"unload",HASHCHANGE:"hashchange",PAGEHIDE:"pagehide",PAGESHOW:"pageshow",POPSTATE:"popstate",COPY:"copy",PASTE:"paste",CUT:"cut",BEFORECOPY:"beforecopy",BEFORECUT:"beforecut",BEFOREPASTE:"beforepaste",ONLINE:"online",OFFLINE:"offline",MESSAGE:"message",CONNECT:"connect",ANIMATIONSTART:goog.events.getVendorPrefixedName_("AnimationStart"),ANIMATIONEND:goog.events.getVendorPrefixedName_("AnimationEnd"),ANIMATIONITERATION:goog.events.getVendorPrefixedName_("AnimationIteration"),TRANSITIONEND:goog.events.getVendorPrefixedName_("TransitionEnd"),
POINTERDOWN:"pointerdown",POINTERUP:"pointerup",POINTERCANCEL:"pointercancel",POINTERMOVE:"pointermove",POINTEROVER:"pointerover",POINTEROUT:"pointerout",POINTERENTER:"pointerenter",POINTERLEAVE:"pointerleave",GOTPOINTERCAPTURE:"gotpointercapture",LOSTPOINTERCAPTURE:"lostpointercapture",MSGESTURECHANGE:"MSGestureChange",MSGESTUREEND:"MSGestureEnd",MSGESTUREHOLD:"MSGestureHold",MSGESTURESTART:"MSGestureStart",MSGESTURETAP:"MSGestureTap",MSGOTPOINTERCAPTURE:"MSGotPointerCapture",MSINERTIASTART:"MSInertiaStart",
MSLOSTPOINTERCAPTURE:"MSLostPointerCapture",MSPOINTERCANCEL:"MSPointerCancel",MSPOINTERDOWN:"MSPointerDown",MSPOINTERENTER:"MSPointerEnter",MSPOINTERHOVER:"MSPointerHover",MSPOINTERLEAVE:"MSPointerLeave",MSPOINTERMOVE:"MSPointerMove",MSPOINTEROUT:"MSPointerOut",MSPOINTEROVER:"MSPointerOver",MSPOINTERUP:"MSPointerUp",TEXTINPUT:"textinput",COMPOSITIONSTART:"compositionstart",COMPOSITIONUPDATE:"compositionupdate",COMPOSITIONEND:"compositionend",EXIT:"exit",LOADABORT:"loadabort",LOADCOMMIT:"loadcommit",
LOADREDIRECT:"loadredirect",LOADSTART:"loadstart",LOADSTOP:"loadstop",RESPONSIVE:"responsive",SIZECHANGED:"sizechanged",UNRESPONSIVE:"unresponsive",VISIBILITYCHANGE:"visibilitychange",STORAGE:"storage",DOMSUBTREEMODIFIED:"DOMSubtreeModified",DOMNODEINSERTED:"DOMNodeInserted",DOMNODEREMOVED:"DOMNodeRemoved",DOMNODEREMOVEDFROMDOCUMENT:"DOMNodeRemovedFromDocument",DOMNODEINSERTEDINTODOCUMENT:"DOMNodeInsertedIntoDocument",DOMATTRMODIFIED:"DOMAttrModified",DOMCHARACTERDATAMODIFIED:"DOMCharacterDataModified"};goog.reflect={};goog.reflect.object=function(a,b){return b};goog.reflect.sinkValue=function(a){goog.reflect.sinkValue[" "](a);return a};goog.reflect.sinkValue[" "]=goog.nullFunction;goog.reflect.canAccessProperty=function(a,b){try{return goog.reflect.sinkValue(a[b]),!0}catch(c){}return!1};goog.events.BrowserEvent=function(a,b){goog.events.Event.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.platformModifierKey=!1;this.event_=null;a&&this.init(a,b)};goog.inherits(goog.events.BrowserEvent,goog.events.Event);
goog.events.BrowserEvent.MouseButton={LEFT:0,MIDDLE:1,RIGHT:2};goog.events.BrowserEvent.IEButtonMap=[1,4,2];
goog.events.BrowserEvent.prototype.init=function(a,b){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;d?goog.userAgent.GECKO&&(goog.reflect.canAccessProperty(d,"nodeName")||(d=null)):c==goog.events.EventType.MOUSEOVER?d=a.fromElement:c==goog.events.EventType.MOUSEOUT&&(d=a.toElement);this.relatedTarget=d;this.offsetX=goog.userAgent.WEBKIT||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=goog.userAgent.WEBKIT||void 0!==a.offsetY?a.offsetY:a.layerY;
this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.platformModifierKey=goog.userAgent.MAC?a.metaKey:a.ctrlKey;this.state=a.state;this.event_=a;a.defaultPrevented&&this.preventDefault()};
goog.events.BrowserEvent.prototype.isButton=function(a){return goog.events.BrowserFeature.HAS_W3C_BUTTON?this.event_.button==a:"click"==this.type?a==goog.events.BrowserEvent.MouseButton.LEFT:!!(this.event_.button&goog.events.BrowserEvent.IEButtonMap[a])};goog.events.BrowserEvent.prototype.isMouseActionButton=function(){return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT)&&!(goog.userAgent.WEBKIT&&goog.userAgent.MAC&&this.ctrlKey)};
goog.events.BrowserEvent.prototype.stopPropagation=function(){goog.events.BrowserEvent.superClass_.stopPropagation.call(this);this.event_.stopPropagation?this.event_.stopPropagation():this.event_.cancelBubble=!0};
goog.events.BrowserEvent.prototype.preventDefault=function(){goog.events.BrowserEvent.superClass_.preventDefault.call(this);var a=this.event_;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};goog.events.BrowserEvent.prototype.getBrowserEvent=function(){return this.event_};goog.events.BrowserEvent.prototype.disposeInternal=function(){};goog.events.Listenable=function(){};goog.events.Listenable.IMPLEMENTED_BY_PROP="closure_listenable_"+(1E6*Math.random()|0);goog.events.Listenable.addImplementation=function(a){a.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP]=!0};goog.events.Listenable.isImplementedBy=function(a){try{return!(!a||!a[goog.events.Listenable.IMPLEMENTED_BY_PROP])}catch(b){return!1}};goog.events.ListenableKey=function(){};goog.events.ListenableKey.counter_=0;goog.events.ListenableKey.reserveKey=function(){return++goog.events.ListenableKey.counter_};goog.events.Listener=function(a,b,c,d,e,f){goog.events.Listener.ENABLE_MONITORING&&(this.creationStack=Error().stack);this.listener=a;this.proxy=b;this.src=c;this.type=d;this.capture=!!e;this.handler=f;this.key=goog.events.ListenableKey.reserveKey();this.removed=this.callOnce=!1};goog.events.Listener.ENABLE_MONITORING=!1;goog.events.Listener.prototype.markAsRemoved=function(){this.removed=!0;this.handler=this.src=this.proxy=this.listener=null};goog.object={};goog.object.forEach=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};goog.object.filter=function(a,b,c){var d={},e;for(e in a)b.call(c,a[e],e,a)&&(d[e]=a[e]);return d};goog.object.map=function(a,b,c){var d={},e;for(e in a)d[e]=b.call(c,a[e],e,a);return d};goog.object.some=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return!0;return!1};goog.object.every=function(a,b,c){for(var d in a)if(!b.call(c,a[d],d,a))return!1;return!0};
goog.object.getCount=function(a){var b=0,c;for(c in a)b++;return b};goog.object.getAnyKey=function(a){for(var b in a)return b};goog.object.getAnyValue=function(a){for(var b in a)return a[b]};goog.object.contains=function(a,b){return goog.object.containsValue(a,b)};goog.object.getValues=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};goog.object.getKeys=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};
goog.object.getValueByKeys=function(a,b){for(var c=goog.isArrayLike(b),d=c?b:arguments,c=c?0:1;c<d.length&&(a=a[d[c]],goog.isDef(a));c++);return a};goog.object.containsKey=function(a,b){return b in a};goog.object.containsValue=function(a,b){for(var c in a)if(a[c]==b)return!0;return!1};goog.object.findKey=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d};goog.object.findValue=function(a,b,c){return(b=goog.object.findKey(a,b,c))&&a[b]};
goog.object.isEmpty=function(a){for(var b in a)return!1;return!0};goog.object.clear=function(a){for(var b in a)delete a[b]};goog.object.remove=function(a,b){var c;(c=b in a)&&delete a[b];return c};goog.object.add=function(a,b,c){if(b in a)throw Error('The object already contains the key "'+b+'"');goog.object.set(a,b,c)};goog.object.get=function(a,b,c){return b in a?a[b]:c};goog.object.set=function(a,b,c){a[b]=c};goog.object.setIfUndefined=function(a,b,c){return b in a?a[b]:a[b]=c};
goog.object.clone=function(a){var b={},c;for(c in a)b[c]=a[c];return b};goog.object.unsafeClone=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.object.unsafeClone(a[c]);return b}return a};goog.object.transpose=function(a){var b={},c;for(c in a)b[a[c]]=c;return b};goog.object.PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<goog.object.PROTOTYPE_FIELDS_.length;f++)c=goog.object.PROTOTYPE_FIELDS_[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};
goog.object.create=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.create.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c};goog.object.createSet=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.createSet.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};
goog.object.createImmutableView=function(a){var b=a;Object.isFrozen&&!Object.isFrozen(a)&&(b=Object.create(a),Object.freeze(b));return b};goog.object.isImmutableView=function(a){return!!Object.isFrozen&&Object.isFrozen(a)};goog.events.ListenerMap=function(a){this.src=a;this.listeners={};this.typeCount_=0};goog.events.ListenerMap.prototype.getTypeCount=function(){return this.typeCount_};goog.events.ListenerMap.prototype.getListenerCount=function(){var a=0,b;for(b in this.listeners)a+=this.listeners[b].length;return a};
goog.events.ListenerMap.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.listeners[f];a||(a=this.listeners[f]=[],this.typeCount_++);var g=goog.events.ListenerMap.findListenerIndex_(a,b,d,e);-1<g?(b=a[g],c||(b.callOnce=!1)):(b=new goog.events.Listener(b,null,this.src,f,!!d,e),b.callOnce=c,a.push(b));return b};
goog.events.ListenerMap.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.listeners))return!1;var e=this.listeners[a];b=goog.events.ListenerMap.findListenerIndex_(e,b,c,d);return-1<b?(e[b].markAsRemoved(),goog.array.removeAt(e,b),0==e.length&&(delete this.listeners[a],this.typeCount_--),!0):!1};
goog.events.ListenerMap.prototype.removeByKey=function(a){var b=a.type;if(!(b in this.listeners))return!1;var c=goog.array.remove(this.listeners[b],a);c&&(a.markAsRemoved(),0==this.listeners[b].length&&(delete this.listeners[b],this.typeCount_--));return c};goog.events.ListenerMap.prototype.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.listeners)if(!a||c==a){for(var d=this.listeners[c],e=0;e<d.length;e++)++b,d[e].markAsRemoved();delete this.listeners[c];this.typeCount_--}return b};
goog.events.ListenerMap.prototype.getListeners=function(a,b){var c=this.listeners[a.toString()],d=[];if(c)for(var e=0;e<c.length;++e){var f=c[e];f.capture==b&&d.push(f)}return d};goog.events.ListenerMap.prototype.getListener=function(a,b,c,d){a=this.listeners[a.toString()];var e=-1;a&&(e=goog.events.ListenerMap.findListenerIndex_(a,b,c,d));return-1<e?a[e]:null};
goog.events.ListenerMap.prototype.hasListener=function(a,b){var c=goog.isDef(a),d=c?a.toString():"",e=goog.isDef(b);return goog.object.some(this.listeners,function(a,g){for(var h=0;h<a.length;++h)if(!(c&&a[h].type!=d||e&&a[h].capture!=b))return!0;return!1})};goog.events.ListenerMap.findListenerIndex_=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.removed&&f.listener==b&&f.capture==!!c&&f.handler==d)return e}return-1};goog.events.listeners_={};goog.events.LISTENER_MAP_PROP_="closure_lm_"+(1E6*Math.random()|0);goog.events.onString_="on";goog.events.onStringMap_={};goog.events.CaptureSimulationMode={OFF_AND_FAIL:0,OFF_AND_SILENT:1,ON:2};goog.events.CAPTURE_SIMULATION_MODE=2;goog.events.listenerCountEstimate_=0;
goog.events.listen=function(a,b,c,d,e){if(goog.isArray(b)){for(var f=0;f<b.length;f++)goog.events.listen(a,b[f],c,d,e);return null}c=goog.events.wrapListener(c);return goog.events.Listenable.isImplementedBy(a)?a.listen(b,c,d,e):goog.events.listen_(a,b,c,!1,d,e)};
goog.events.listen_=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e;if(g&&!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT){if(goog.events.CAPTURE_SIMULATION_MODE==goog.events.CaptureSimulationMode.OFF_AND_FAIL)return goog.asserts.fail("Can not register capture listener in IE8-."),null;if(goog.events.CAPTURE_SIMULATION_MODE==goog.events.CaptureSimulationMode.OFF_AND_SILENT)return null}var h=goog.events.getListenerMap_(a);h||(a[goog.events.LISTENER_MAP_PROP_]=h=new goog.events.ListenerMap(a));
c=h.add(b,c,d,e,f);if(c.proxy)return c;d=goog.events.getProxy();c.proxy=d;d.src=a;d.listener=c;a.addEventListener?a.addEventListener(b.toString(),d,g):a.attachEvent(goog.events.getOnString_(b.toString()),d);goog.events.listenerCountEstimate_++;return c};goog.events.getProxy=function(){var a=goog.events.handleBrowserEvent_,b=goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b};
goog.events.listenOnce=function(a,b,c,d,e){if(goog.isArray(b)){for(var f=0;f<b.length;f++)goog.events.listenOnce(a,b[f],c,d,e);return null}c=goog.events.wrapListener(c);return goog.events.Listenable.isImplementedBy(a)?a.listenOnce(b,c,d,e):goog.events.listen_(a,b,c,!0,d,e)};goog.events.listenWithWrapper=function(a,b,c,d,e){b.listen(a,c,d,e)};
goog.events.unlisten=function(a,b,c,d,e){if(goog.isArray(b)){for(var f=0;f<b.length;f++)goog.events.unlisten(a,b[f],c,d,e);return null}c=goog.events.wrapListener(c);if(goog.events.Listenable.isImplementedBy(a))return a.unlisten(b,c,d,e);if(!a)return!1;d=!!d;if(a=goog.events.getListenerMap_(a))if(b=a.getListener(b,c,d,e))return goog.events.unlistenByKey(b);return!1};
goog.events.unlistenByKey=function(a){if(goog.isNumber(a)||!a||a.removed)return!1;var b=a.src;if(goog.events.Listenable.isImplementedBy(b))return b.unlistenByKey(a);var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent&&b.detachEvent(goog.events.getOnString_(c),d);goog.events.listenerCountEstimate_--;(c=goog.events.getListenerMap_(b))?(c.removeByKey(a),0==c.getTypeCount()&&(c.src=null,b[goog.events.LISTENER_MAP_PROP_]=null)):a.markAsRemoved();return!0};
goog.events.unlistenWithWrapper=function(a,b,c,d,e){b.unlisten(a,c,d,e)};goog.events.removeAll=function(a,b){if(!a)return 0;if(goog.events.Listenable.isImplementedBy(a))return a.removeAllListeners(b);var c=goog.events.getListenerMap_(a);if(!c)return 0;var d=0,e=b&&b.toString(),f;for(f in c.listeners)if(!e||f==e)for(var g=goog.array.clone(c.listeners[f]),h=0;h<g.length;++h)goog.events.unlistenByKey(g[h])&&++d;return d};
goog.events.removeAllNativeListeners=function(){return goog.events.listenerCountEstimate_=0};goog.events.getListeners=function(a,b,c){return goog.events.Listenable.isImplementedBy(a)?a.getListeners(b,c):a?(a=goog.events.getListenerMap_(a))?a.getListeners(b,c):[]:[]};goog.events.getListener=function(a,b,c,d,e){c=goog.events.wrapListener(c);d=!!d;return goog.events.Listenable.isImplementedBy(a)?a.getListener(b,c,d,e):a?(a=goog.events.getListenerMap_(a))?a.getListener(b,c,d,e):null:null};
goog.events.hasListener=function(a,b,c){if(goog.events.Listenable.isImplementedBy(a))return a.hasListener(b,c);a=goog.events.getListenerMap_(a);return!!a&&a.hasListener(b,c)};goog.events.expose=function(a){var b=[],c;for(c in a)a[c]&&a[c].id?b.push(c+" = "+a[c]+" ("+a[c].id+")"):b.push(c+" = "+a[c]);return b.join("\n")};goog.events.getOnString_=function(a){return a in goog.events.onStringMap_?goog.events.onStringMap_[a]:goog.events.onStringMap_[a]=goog.events.onString_+a};
goog.events.fireListeners=function(a,b,c,d){return goog.events.Listenable.isImplementedBy(a)?a.fireListeners(b,c,d):goog.events.fireListeners_(a,b,c,d)};goog.events.fireListeners_=function(a,b,c,d){var e=1;if(a=goog.events.getListenerMap_(a))if(b=a.listeners[b.toString()])for(b=goog.array.clone(b),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.removed&&(e&=!1!==goog.events.fireListener(f,d))}return Boolean(e)};
goog.events.fireListener=function(a,b){var c=a.listener,d=a.handler||a.src;a.callOnce&&goog.events.unlistenByKey(a);return c.call(d,b)};goog.events.getTotalListenerCount=function(){return goog.events.listenerCountEstimate_};goog.events.dispatchEvent=function(a,b){goog.asserts.assert(goog.events.Listenable.isImplementedBy(a),"Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");return a.dispatchEvent(b)};
goog.events.protectBrowserEventEntryPoint=function(a){goog.events.handleBrowserEvent_=a.protectEntryPoint(goog.events.handleBrowserEvent_)};
goog.events.handleBrowserEvent_=function(a,b){if(a.removed)return!0;if(!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT){var c=b||goog.getObjectByName("window.event"),d=new goog.events.BrowserEvent(c,this),e=!0;if(goog.events.CAPTURE_SIMULATION_MODE==goog.events.CaptureSimulationMode.ON){if(!goog.events.isMarkedIeEvent_(c)){goog.events.markIeEvent_(c);for(var c=[],f=d.currentTarget;f;f=f.parentNode)c.push(f);for(var f=a.type,g=c.length-1;!d.propagationStopped_&&0<=g;g--)d.currentTarget=c[g],e&=goog.events.fireListeners_(c[g],
f,!0,d);for(g=0;!d.propagationStopped_&&g<c.length;g++)d.currentTarget=c[g],e&=goog.events.fireListeners_(c[g],f,!1,d)}}else e=goog.events.fireListener(a,d);return e}return goog.events.fireListener(a,new goog.events.BrowserEvent(b,this))};goog.events.markIeEvent_=function(a){var b=!1;if(0==a.keyCode)try{a.keyCode=-1;return}catch(c){b=!0}if(b||void 0==a.returnValue)a.returnValue=!0};goog.events.isMarkedIeEvent_=function(a){return 0>a.keyCode||void 0!=a.returnValue};goog.events.uniqueIdCounter_=0;
goog.events.getUniqueId=function(a){return a+"_"+goog.events.uniqueIdCounter_++};goog.events.getListenerMap_=function(a){a=a[goog.events.LISTENER_MAP_PROP_];return a instanceof goog.events.ListenerMap?a:null};goog.events.LISTENER_WRAPPER_PROP_="__closure_events_fn_"+(1E9*Math.random()>>>0);
goog.events.wrapListener=function(a){goog.asserts.assert(a,"Listener can not be null.");if(goog.isFunction(a))return a;goog.asserts.assert(a.handleEvent,"An object listener must have handleEvent method.");return a[goog.events.LISTENER_WRAPPER_PROP_]||(a[goog.events.LISTENER_WRAPPER_PROP_]=function(b){return a.handleEvent(b)})};goog.debug.entryPointRegistry.register(function(a){goog.events.handleBrowserEvent_=a(goog.events.handleBrowserEvent_)});goog.events.EventTarget=function(){goog.Disposable.call(this);this.eventTargetListeners_=new goog.events.ListenerMap(this);this.actualEventTarget_=this};goog.inherits(goog.events.EventTarget,goog.Disposable);goog.events.Listenable.addImplementation(goog.events.EventTarget);goog.events.EventTarget.MAX_ANCESTORS_=1E3;goog.events.EventTarget.prototype.parentEventTarget_=null;goog.events.EventTarget.prototype.getParentEventTarget=function(){return this.parentEventTarget_};
goog.events.EventTarget.prototype.setParentEventTarget=function(a){this.parentEventTarget_=a};goog.events.EventTarget.prototype.addEventListener=function(a,b,c,d){goog.events.listen(this,a,b,c,d)};goog.events.EventTarget.prototype.removeEventListener=function(a,b,c,d){goog.events.unlisten(this,a,b,c,d)};
goog.events.EventTarget.prototype.dispatchEvent=function(a){this.assertInitialized_();var b,c=this.getParentEventTarget();if(c){b=[];for(var d=1;c;c=c.getParentEventTarget())b.push(c),goog.asserts.assert(++d<goog.events.EventTarget.MAX_ANCESTORS_,"infinite loop")}return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_,a,b)};
goog.events.EventTarget.prototype.disposeInternal=function(){goog.events.EventTarget.superClass_.disposeInternal.call(this);this.removeAllListeners();this.parentEventTarget_=null};goog.events.EventTarget.prototype.listen=function(a,b,c,d){this.assertInitialized_();return this.eventTargetListeners_.add(String(a),b,!1,c,d)};goog.events.EventTarget.prototype.listenOnce=function(a,b,c,d){return this.eventTargetListeners_.add(String(a),b,!0,c,d)};
goog.events.EventTarget.prototype.unlisten=function(a,b,c,d){return this.eventTargetListeners_.remove(String(a),b,c,d)};goog.events.EventTarget.prototype.unlistenByKey=function(a){return this.eventTargetListeners_.removeByKey(a)};goog.events.EventTarget.prototype.removeAllListeners=function(a){return this.eventTargetListeners_?this.eventTargetListeners_.removeAll(a):0};
goog.events.EventTarget.prototype.fireListeners=function(a,b,c){a=this.eventTargetListeners_.listeners[String(a)];if(!a)return!0;a=goog.array.clone(a);for(var d=!0,e=0;e<a.length;++e){var f=a[e];if(f&&!f.removed&&f.capture==b){var g=f.listener,h=f.handler||f.src;f.callOnce&&this.unlistenByKey(f);d=!1!==g.call(h,c)&&d}}return d&&0!=c.returnValue_};goog.events.EventTarget.prototype.getListeners=function(a,b){return this.eventTargetListeners_.getListeners(String(a),b)};
goog.events.EventTarget.prototype.getListener=function(a,b,c,d){return this.eventTargetListeners_.getListener(String(a),b,c,d)};goog.events.EventTarget.prototype.hasListener=function(a,b){var c=goog.isDef(a)?String(a):void 0;return this.eventTargetListeners_.hasListener(c,b)};goog.events.EventTarget.prototype.setTargetForTesting=function(a){this.actualEventTarget_=a};goog.events.EventTarget.prototype.assertInitialized_=function(){goog.asserts.assert(this.eventTargetListeners_,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};
goog.events.EventTarget.dispatchEventInternal_=function(a,b,c){var d=b.type||b;if(goog.isString(b))b=new goog.events.Event(b,a);else if(b instanceof goog.events.Event)b.target=b.target||a;else{var e=b;b=new goog.events.Event(d,a);goog.object.extend(b,e)}var e=!0,f;if(c)for(var g=c.length-1;!b.propagationStopped_&&0<=g;g--)f=b.currentTarget=c[g],e=f.fireListeners(d,!0,b)&&e;b.propagationStopped_||(f=b.currentTarget=a,e=f.fireListeners(d,!0,b)&&e,b.propagationStopped_||(e=f.fireListeners(d,!1,b)&&e));
if(c)for(g=0;!b.propagationStopped_&&g<c.length;g++)f=b.currentTarget=c[g],e=f.fireListeners(d,!1,b)&&e;return e};goog.Timer=function(a,b){goog.events.EventTarget.call(this);this.interval_=a||1;this.timerObject_=b||goog.Timer.defaultTimerObject;this.boundTick_=goog.bind(this.tick_,this);this.last_=goog.now()};goog.inherits(goog.Timer,goog.events.EventTarget);goog.Timer.MAX_TIMEOUT_=2147483647;goog.Timer.prototype.enabled=!1;goog.Timer.defaultTimerObject=goog.global;goog.Timer.intervalScale=.8;goog.Timer.prototype.timer_=null;goog.Timer.prototype.getInterval=function(){return this.interval_};
goog.Timer.prototype.setInterval=function(a){this.interval_=a;this.timer_&&this.enabled?(this.stop(),this.start()):this.timer_&&this.stop()};
goog.Timer.prototype.tick_=function(){if(this.enabled){var a=goog.now()-this.last_;0<a&&a<this.interval_*goog.Timer.intervalScale?this.timer_=this.timerObject_.setTimeout(this.boundTick_,this.interval_-a):(this.timer_&&(this.timerObject_.clearTimeout(this.timer_),this.timer_=null),this.dispatchTick(),this.enabled&&(this.timer_=this.timerObject_.setTimeout(this.boundTick_,this.interval_),this.last_=goog.now()))}};goog.Timer.prototype.dispatchTick=function(){this.dispatchEvent(goog.Timer.TICK)};
goog.Timer.prototype.start=function(){this.enabled=!0;this.timer_||(this.timer_=this.timerObject_.setTimeout(this.boundTick_,this.interval_),this.last_=goog.now())};goog.Timer.prototype.stop=function(){this.enabled=!1;this.timer_&&(this.timerObject_.clearTimeout(this.timer_),this.timer_=null)};goog.Timer.prototype.disposeInternal=function(){goog.Timer.superClass_.disposeInternal.call(this);this.stop();delete this.timerObject_};goog.Timer.TICK="tick";
goog.Timer.callOnce=function(a,b,c){if(goog.isFunction(a))c&&(a=goog.bind(a,c));else if(a&&"function"==typeof a.handleEvent)a=goog.bind(a.handleEvent,a);else throw Error("Invalid listener argument");return b>goog.Timer.MAX_TIMEOUT_?-1:goog.Timer.defaultTimerObject.setTimeout(a,b||0)};goog.Timer.clear=function(a){goog.Timer.defaultTimerObject.clearTimeout(a)};goog.dom.BrowserFeature={CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE||goog.userAgent.isDocumentModeOrHigher(9),CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO&&!goog.userAgent.IE||goog.userAgent.IE&&goog.userAgent.isDocumentModeOrHigher(9)||goog.userAgent.GECKO&&goog.userAgent.isVersionOrHigher("1.9.1"),CAN_USE_INNER_TEXT:goog.userAgent.IE&&!goog.userAgent.isVersionOrHigher("9"),CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE||goog.userAgent.OPERA||goog.userAgent.WEBKIT,INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};goog.dom.TagName={A:"A",ABBR:"ABBR",ACRONYM:"ACRONYM",ADDRESS:"ADDRESS",APPLET:"APPLET",AREA:"AREA",ARTICLE:"ARTICLE",ASIDE:"ASIDE",AUDIO:"AUDIO",B:"B",BASE:"BASE",BASEFONT:"BASEFONT",BDI:"BDI",BDO:"BDO",BIG:"BIG",BLOCKQUOTE:"BLOCKQUOTE",BODY:"BODY",BR:"BR",BUTTON:"BUTTON",CANVAS:"CANVAS",CAPTION:"CAPTION",CENTER:"CENTER",CITE:"CITE",CODE:"CODE",COL:"COL",COLGROUP:"COLGROUP",COMMAND:"COMMAND",DATA:"DATA",DATALIST:"DATALIST",DD:"DD",DEL:"DEL",DETAILS:"DETAILS",DFN:"DFN",DIALOG:"DIALOG",DIR:"DIR",DIV:"DIV",
DL:"DL",DT:"DT",EM:"EM",EMBED:"EMBED",FIELDSET:"FIELDSET",FIGCAPTION:"FIGCAPTION",FIGURE:"FIGURE",FONT:"FONT",FOOTER:"FOOTER",FORM:"FORM",FRAME:"FRAME",FRAMESET:"FRAMESET",H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6",HEAD:"HEAD",HEADER:"HEADER",HGROUP:"HGROUP",HR:"HR",HTML:"HTML",I:"I",IFRAME:"IFRAME",IMG:"IMG",INPUT:"INPUT",INS:"INS",ISINDEX:"ISINDEX",KBD:"KBD",KEYGEN:"KEYGEN",LABEL:"LABEL",LEGEND:"LEGEND",LI:"LI",LINK:"LINK",MAP:"MAP",MARK:"MARK",MATH:"MATH",MENU:"MENU",META:"META",METER:"METER",
NAV:"NAV",NOFRAMES:"NOFRAMES",NOSCRIPT:"NOSCRIPT",OBJECT:"OBJECT",OL:"OL",OPTGROUP:"OPTGROUP",OPTION:"OPTION",OUTPUT:"OUTPUT",P:"P",PARAM:"PARAM",PRE:"PRE",PROGRESS:"PROGRESS",Q:"Q",RP:"RP",RT:"RT",RUBY:"RUBY",S:"S",SAMP:"SAMP",SCRIPT:"SCRIPT",SECTION:"SECTION",SELECT:"SELECT",SMALL:"SMALL",SOURCE:"SOURCE",SPAN:"SPAN",STRIKE:"STRIKE",STRONG:"STRONG",STYLE:"STYLE",SUB:"SUB",SUMMARY:"SUMMARY",SUP:"SUP",SVG:"SVG",TABLE:"TABLE",TBODY:"TBODY",TD:"TD",TEXTAREA:"TEXTAREA",TFOOT:"TFOOT",TH:"TH",THEAD:"THEAD",
TIME:"TIME",TITLE:"TITLE",TR:"TR",TRACK:"TRACK",TT:"TT",U:"U",UL:"UL",VAR:"VAR",VIDEO:"VIDEO",WBR:"WBR"};goog.dom.classes={};goog.dom.classes.set=function(a,b){a.className=b};goog.dom.classes.get=function(a){a=a.className;return goog.isString(a)&&a.match(/\S+/g)||[]};goog.dom.classes.add=function(a,b){var c=goog.dom.classes.get(a),d=goog.array.slice(arguments,1),e=c.length+d.length;goog.dom.classes.add_(c,d);goog.dom.classes.set(a,c.join(" "));return c.length==e};
goog.dom.classes.remove=function(a,b){var c=goog.dom.classes.get(a),d=goog.array.slice(arguments,1),e=goog.dom.classes.getDifference_(c,d);goog.dom.classes.set(a,e.join(" "));return e.length==c.length-d.length};goog.dom.classes.add_=function(a,b){for(var c=0;c<b.length;c++)goog.array.contains(a,b[c])||a.push(b[c])};goog.dom.classes.getDifference_=function(a,b){return goog.array.filter(a,function(a){return!goog.array.contains(b,a)})};
goog.dom.classes.swap=function(a,b,c){for(var d=goog.dom.classes.get(a),e=!1,f=0;f<d.length;f++)d[f]==b&&(goog.array.splice(d,f--,1),e=!0);e&&(d.push(c),goog.dom.classes.set(a,d.join(" ")));return e};goog.dom.classes.addRemove=function(a,b,c){var d=goog.dom.classes.get(a);goog.isString(b)?goog.array.remove(d,b):goog.isArray(b)&&(d=goog.dom.classes.getDifference_(d,b));goog.isString(c)&&!goog.array.contains(d,c)?d.push(c):goog.isArray(c)&&goog.dom.classes.add_(d,c);goog.dom.classes.set(a,d.join(" "))};
goog.dom.classes.has=function(a,b){return goog.array.contains(goog.dom.classes.get(a),b)};goog.dom.classes.enable=function(a,b,c){c?goog.dom.classes.add(a,b):goog.dom.classes.remove(a,b)};goog.dom.classes.toggle=function(a,b){var c=!goog.dom.classes.has(a,b);goog.dom.classes.enable(a,b,c);return c};goog.functions={};goog.functions.constant=function(a){return function(){return a}};goog.functions.FALSE=goog.functions.constant(!1);goog.functions.TRUE=goog.functions.constant(!0);goog.functions.NULL=goog.functions.constant(null);goog.functions.identity=function(a,b){return a};goog.functions.error=function(a){return function(){throw Error(a);}};goog.functions.fail=function(a){return function(){throw a;}};
goog.functions.lock=function(a,b){b=b||0;return function(){return a.apply(this,Array.prototype.slice.call(arguments,0,b))}};goog.functions.nth=function(a){return function(){return arguments[a]}};goog.functions.withReturnValue=function(a,b){return goog.functions.sequence(a,goog.functions.constant(b))};goog.functions.compose=function(a,b){var c=arguments,d=c.length;return function(){var a;d&&(a=c[d-1].apply(this,arguments));for(var b=d-2;0<=b;b--)a=c[b].call(this,a);return a}};
goog.functions.sequence=function(a){var b=arguments,c=b.length;return function(){for(var a,e=0;e<c;e++)a=b[e].apply(this,arguments);return a}};goog.functions.and=function(a){var b=arguments,c=b.length;return function(){for(var a=0;a<c;a++)if(!b[a].apply(this,arguments))return!1;return!0}};goog.functions.or=function(a){var b=arguments,c=b.length;return function(){for(var a=0;a<c;a++)if(b[a].apply(this,arguments))return!0;return!1}};
goog.functions.not=function(a){return function(){return!a.apply(this,arguments)}};goog.functions.create=function(a,b){var c=function(){};c.prototype=a.prototype;c=new c;a.apply(c,Array.prototype.slice.call(arguments,1));return c};goog.functions.CACHE_RETURN_VALUE=!0;goog.functions.cacheReturnValue=function(a){var b=!1,c;return function(){if(!goog.functions.CACHE_RETURN_VALUE)return a();b||(c=a(),b=!0);return c}};goog.math={};goog.math.randomInt=function(a){return Math.floor(Math.random()*a)};goog.math.uniformRandom=function(a,b){return a+Math.random()*(b-a)};goog.math.clamp=function(a,b,c){return Math.min(Math.max(a,b),c)};goog.math.modulo=function(a,b){var c=a%b;return 0>c*b?c+b:c};goog.math.lerp=function(a,b,c){return a+c*(b-a)};goog.math.nearlyEquals=function(a,b,c){return Math.abs(a-b)<=(c||1E-6)};goog.math.standardAngle=function(a){return goog.math.modulo(a,360)};
goog.math.standardAngleInRadians=function(a){return goog.math.modulo(a,2*Math.PI)};goog.math.toRadians=function(a){return a*Math.PI/180};goog.math.toDegrees=function(a){return 180*a/Math.PI};goog.math.angleDx=function(a,b){return b*Math.cos(goog.math.toRadians(a))};goog.math.angleDy=function(a,b){return b*Math.sin(goog.math.toRadians(a))};goog.math.angle=function(a,b,c,d){return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d-b,c-a)))};
goog.math.angleDifference=function(a,b){var c=goog.math.standardAngle(b)-goog.math.standardAngle(a);180<c?c-=360:-180>=c&&(c=360+c);return c};goog.math.sign=function(a){return 0==a?0:0>a?-1:1};
goog.math.longestCommonSubsequence=function(a,b,c,d){c=c||function(a,b){return a==b};d=d||function(b,c){return a[b]};for(var e=a.length,f=b.length,g=[],h=0;h<e+1;h++)g[h]=[],g[h][0]=0;for(var k=0;k<f+1;k++)g[0][k]=0;for(h=1;h<=e;h++)for(k=1;k<=f;k++)c(a[h-1],b[k-1])?g[h][k]=g[h-1][k-1]+1:g[h][k]=Math.max(g[h-1][k],g[h][k-1]);for(var l=[],h=e,k=f;0<h&&0<k;)c(a[h-1],b[k-1])?(l.unshift(d(h-1,k-1)),h--,k--):g[h-1][k]>g[h][k-1]?h--:k--;return l};
goog.math.sum=function(a){return goog.array.reduce(arguments,function(a,c){return a+c},0)};goog.math.average=function(a){return goog.math.sum.apply(null,arguments)/arguments.length};goog.math.sampleVariance=function(a){var b=arguments.length;if(2>b)return 0;var c=goog.math.average.apply(null,arguments);return goog.math.sum.apply(null,goog.array.map(arguments,function(a){return Math.pow(a-c,2)}))/(b-1)};goog.math.standardDeviation=function(a){return Math.sqrt(goog.math.sampleVariance.apply(null,arguments))};
goog.math.isInt=function(a){return isFinite(a)&&0==a%1};goog.math.isFiniteNumber=function(a){return isFinite(a)&&!isNaN(a)};goog.math.log10Floor=function(a){if(0<a){var b=Math.round(Math.log(a)*Math.LOG10E);return b-(parseFloat("1e"+b)>a)}return 0==a?-Infinity:NaN};goog.math.safeFloor=function(a,b){goog.asserts.assert(!goog.isDef(b)||0<b);return Math.floor(a+(b||2E-15))};goog.math.safeCeil=function(a,b){goog.asserts.assert(!goog.isDef(b)||0<b);return Math.ceil(a-(b||2E-15))};goog.math.Coordinate=function(a,b){this.x=goog.isDef(a)?a:0;this.y=goog.isDef(b)?b:0};goog.math.Coordinate.prototype.clone=function(){return new goog.math.Coordinate(this.x,this.y)};goog.DEBUG&&(goog.math.Coordinate.prototype.toString=function(){return"("+this.x+", "+this.y+")"});goog.math.Coordinate.equals=function(a,b){return a==b?!0:a&&b?a.x==b.x&&a.y==b.y:!1};goog.math.Coordinate.distance=function(a,b){var c=a.x-b.x,d=a.y-b.y;return Math.sqrt(c*c+d*d)};
goog.math.Coordinate.magnitude=function(a){return Math.sqrt(a.x*a.x+a.y*a.y)};goog.math.Coordinate.azimuth=function(a){return goog.math.angle(0,0,a.x,a.y)};goog.math.Coordinate.squaredDistance=function(a,b){var c=a.x-b.x,d=a.y-b.y;return c*c+d*d};goog.math.Coordinate.difference=function(a,b){return new goog.math.Coordinate(a.x-b.x,a.y-b.y)};goog.math.Coordinate.sum=function(a,b){return new goog.math.Coordinate(a.x+b.x,a.y+b.y)};
goog.math.Coordinate.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};goog.math.Coordinate.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};goog.math.Coordinate.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};goog.math.Coordinate.prototype.translate=function(a,b){a instanceof goog.math.Coordinate?(this.x+=a.x,this.y+=a.y):(this.x+=a,goog.isNumber(b)&&(this.y+=b));return this};
goog.math.Coordinate.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.x*=a;this.y*=c;return this};goog.math.Coordinate.prototype.rotateRadians=function(a,b){var c=b||new goog.math.Coordinate(0,0),d=this.x,e=this.y,f=Math.cos(a),g=Math.sin(a);this.x=(d-c.x)*f-(e-c.y)*g+c.x;this.y=(d-c.x)*g+(e-c.y)*f+c.y};goog.math.Coordinate.prototype.rotateDegrees=function(a,b){this.rotateRadians(goog.math.toRadians(a),b)};goog.math.Size=function(a,b){this.width=a;this.height=b};goog.math.Size.equals=function(a,b){return a==b?!0:a&&b?a.width==b.width&&a.height==b.height:!1};goog.math.Size.prototype.clone=function(){return new goog.math.Size(this.width,this.height)};goog.DEBUG&&(goog.math.Size.prototype.toString=function(){return"("+this.width+" x "+this.height+")"});goog.math.Size.prototype.getLongest=function(){return Math.max(this.width,this.height)};
goog.math.Size.prototype.getShortest=function(){return Math.min(this.width,this.height)};goog.math.Size.prototype.area=function(){return this.width*this.height};goog.math.Size.prototype.perimeter=function(){return 2*(this.width+this.height)};goog.math.Size.prototype.aspectRatio=function(){return this.width/this.height};goog.math.Size.prototype.isEmpty=function(){return!this.area()};goog.math.Size.prototype.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
goog.math.Size.prototype.fitsInside=function(a){return this.width<=a.width&&this.height<=a.height};goog.math.Size.prototype.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};goog.math.Size.prototype.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};goog.math.Size.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.width*=a;this.height*=c;return this};
goog.math.Size.prototype.scaleToFit=function(a){a=this.aspectRatio()>a.aspectRatio()?a.width/this.width:a.height/this.height;return this.scale(a)};goog.dom.ASSUME_QUIRKS_MODE=!1;goog.dom.ASSUME_STANDARDS_MODE=!1;goog.dom.COMPAT_MODE_KNOWN_=goog.dom.ASSUME_QUIRKS_MODE||goog.dom.ASSUME_STANDARDS_MODE;goog.dom.getDomHelper=function(a){return a?new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)):goog.dom.defaultDomHelper_||(goog.dom.defaultDomHelper_=new goog.dom.DomHelper)};goog.dom.getDocument=function(){return document};goog.dom.getElement=function(a){return goog.dom.getElementHelper_(document,a)};
goog.dom.getElementHelper_=function(a,b){return goog.isString(b)?a.getElementById(b):b};goog.dom.getRequiredElement=function(a){return goog.dom.getRequiredElementHelper_(document,a)};goog.dom.getRequiredElementHelper_=function(a,b){goog.asserts.assertString(b);var c=goog.dom.getElementHelper_(a,b);return c=goog.asserts.assertElement(c,"No element found with id: "+b)};goog.dom.$=goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass=function(a,b,c){return goog.dom.getElementsByTagNameAndClass_(document,a,b,c)};goog.dom.getElementsByClass=function(a,b){var c=b||document;return goog.dom.canUseQuerySelector_(c)?c.querySelectorAll("."+a):goog.dom.getElementsByTagNameAndClass_(document,"*",a,b)};goog.dom.getElementByClass=function(a,b){var c=b||document,d=null;return(d=goog.dom.canUseQuerySelector_(c)?c.querySelector("."+a):goog.dom.getElementsByTagNameAndClass_(document,"*",a,b)[0])||null};
goog.dom.getRequiredElementByClass=function(a,b){var c=goog.dom.getElementByClass(a,b);return goog.asserts.assert(c,"No element found with className: "+a)};goog.dom.canUseQuerySelector_=function(a){return!(!a.querySelectorAll||!a.querySelector)};
goog.dom.getElementsByTagNameAndClass_=function(a,b,c,d){a=d||a;b=b&&"*"!=b?b.toUpperCase():"";if(goog.dom.canUseQuerySelector_(a)&&(b||c))return a.querySelectorAll(b+(c?"."+c:""));if(c&&a.getElementsByClassName){a=a.getElementsByClassName(c);if(b){d={};for(var e=0,f=0,g;g=a[f];f++)b==g.nodeName&&(d[e++]=g);d.length=e;return d}return a}a=a.getElementsByTagName(b||"*");if(c){d={};for(f=e=0;g=a[f];f++)b=g.className,"function"==typeof b.split&&goog.array.contains(b.split(/\s+/),c)&&(d[e++]=g);d.length=
e;return d}return a};goog.dom.$$=goog.dom.getElementsByTagNameAndClass;goog.dom.setProperties=function(a,b){goog.object.forEach(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:d in goog.dom.DIRECT_ATTRIBUTE_MAP_?a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d],b):goog.string.startsWith(d,"aria-")||goog.string.startsWith(d,"data-")?a.setAttribute(d,b):a[d]=b})};
goog.dom.DIRECT_ATTRIBUTE_MAP_={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};goog.dom.getViewportSize=function(a){return goog.dom.getViewportSize_(a||window)};goog.dom.getViewportSize_=function(a){a=a.document;a=goog.dom.isCss1CompatMode_(a)?a.documentElement:a.body;return new goog.math.Size(a.clientWidth,a.clientHeight)};
goog.dom.getDocumentHeight=function(){return goog.dom.getDocumentHeight_(window)};goog.dom.getDocumentHeight_=function(a){var b=a.document,c=0;if(b){a=goog.dom.getViewportSize_(a).height;var c=b.body,d=b.documentElement;if(goog.dom.isCss1CompatMode_(b)&&d.scrollHeight)c=d.scrollHeight!=a?d.scrollHeight:d.offsetHeight;else{var b=d.scrollHeight,e=d.offsetHeight;d.clientHeight!=e&&(b=c.scrollHeight,e=c.offsetHeight);c=b>a?b>e?b:e:b<e?b:e}}return c};
goog.dom.getPageScroll=function(a){return goog.dom.getDomHelper((a||goog.global||window).document).getDocumentScroll()};goog.dom.getDocumentScroll=function(){return goog.dom.getDocumentScroll_(document)};
goog.dom.getDocumentScroll_=function(a){var b=goog.dom.getDocumentScrollElement_(a);a=goog.dom.getWindow_(a);return goog.userAgent.IE&&goog.userAgent.isVersionOrHigher("10")&&a.pageYOffset!=b.scrollTop?new goog.math.Coordinate(b.scrollLeft,b.scrollTop):new goog.math.Coordinate(a.pageXOffset||b.scrollLeft,a.pageYOffset||b.scrollTop)};goog.dom.getDocumentScrollElement=function(){return goog.dom.getDocumentScrollElement_(document)};
goog.dom.getDocumentScrollElement_=function(a){return!goog.userAgent.WEBKIT&&goog.dom.isCss1CompatMode_(a)?a.documentElement:a.body||a.documentElement};goog.dom.getWindow=function(a){return a?goog.dom.getWindow_(a):window};goog.dom.getWindow_=function(a){return a.parentWindow||a.defaultView};goog.dom.createDom=function(a,b,c){return goog.dom.createDom_(document,arguments)};
goog.dom.createDom_=function(a,b){var c=b[0],d=b[1];if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES&&d&&(d.name||d.type)){c=["<",c];d.name&&c.push(' name="',goog.string.htmlEscape(d.name),'"');if(d.type){c.push(' type="',goog.string.htmlEscape(d.type),'"');var e={};goog.object.extend(e,d);delete e.type;d=e}c.push(">");c=c.join("")}c=a.createElement(c);d&&(goog.isString(d)?c.className=d:goog.isArray(d)?goog.dom.classes.add.apply(null,[c].concat(d)):goog.dom.setProperties(c,d));2<b.length&&
goog.dom.append_(a,c,b,2);return c};goog.dom.append_=function(a,b,c,d){function e(c){c&&b.appendChild(goog.isString(c)?a.createTextNode(c):c)}for(;d<c.length;d++){var f=c[d];goog.isArrayLike(f)&&!goog.dom.isNodeLike(f)?goog.array.forEach(goog.dom.isNodeList(f)?goog.array.toArray(f):f,e):e(f)}};goog.dom.$dom=goog.dom.createDom;goog.dom.createElement=function(a){return document.createElement(a)};goog.dom.createTextNode=function(a){return document.createTextNode(String(a))};
goog.dom.createTable=function(a,b,c){return goog.dom.createTable_(document,a,b,!!c)};goog.dom.createTable_=function(a,b,c,d){for(var e=["<tr>"],f=0;f<c;f++)e.push(d?"<td>&nbsp;</td>":"<td></td>");e.push("</tr>");e=e.join("");c=["<table>"];for(f=0;f<b;f++)c.push(e);c.push("</table>");a=a.createElement(goog.dom.TagName.DIV);a.innerHTML=c.join("");return a.removeChild(a.firstChild)};goog.dom.htmlToDocumentFragment=function(a){return goog.dom.htmlToDocumentFragment_(document,a)};
goog.dom.htmlToDocumentFragment_=function(a,b){var c=a.createElement("div");goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT?(c.innerHTML="<br>"+b,c.removeChild(c.firstChild)):c.innerHTML=b;if(1==c.childNodes.length)return c.removeChild(c.firstChild);for(var d=a.createDocumentFragment();c.firstChild;)d.appendChild(c.firstChild);return d};goog.dom.isCss1CompatMode=function(){return goog.dom.isCss1CompatMode_(document)};
goog.dom.isCss1CompatMode_=function(a){return goog.dom.COMPAT_MODE_KNOWN_?goog.dom.ASSUME_STANDARDS_MODE:"CSS1Compat"==a.compatMode};goog.dom.canHaveChildren=function(a){if(a.nodeType!=goog.dom.NodeType.ELEMENT)return!1;switch(a.tagName){case goog.dom.TagName.APPLET:case goog.dom.TagName.AREA:case goog.dom.TagName.BASE:case goog.dom.TagName.BR:case goog.dom.TagName.COL:case goog.dom.TagName.COMMAND:case goog.dom.TagName.EMBED:case goog.dom.TagName.FRAME:case goog.dom.TagName.HR:case goog.dom.TagName.IMG:case goog.dom.TagName.INPUT:case goog.dom.TagName.IFRAME:case goog.dom.TagName.ISINDEX:case goog.dom.TagName.KEYGEN:case goog.dom.TagName.LINK:case goog.dom.TagName.NOFRAMES:case goog.dom.TagName.NOSCRIPT:case goog.dom.TagName.META:case goog.dom.TagName.OBJECT:case goog.dom.TagName.PARAM:case goog.dom.TagName.SCRIPT:case goog.dom.TagName.SOURCE:case goog.dom.TagName.STYLE:case goog.dom.TagName.TRACK:case goog.dom.TagName.WBR:return!1}return!0};
goog.dom.appendChild=function(a,b){a.appendChild(b)};goog.dom.append=function(a,b){goog.dom.append_(goog.dom.getOwnerDocument(a),a,arguments,1)};goog.dom.removeChildren=function(a){for(var b;b=a.firstChild;)a.removeChild(b)};goog.dom.insertSiblingBefore=function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b)};goog.dom.insertSiblingAfter=function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b.nextSibling)};goog.dom.insertChildAt=function(a,b,c){a.insertBefore(b,a.childNodes[c]||null)};
goog.dom.removeNode=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):null};goog.dom.replaceNode=function(a,b){var c=b.parentNode;c&&c.replaceChild(a,b)};goog.dom.flattenElement=function(a){var b,c=a.parentNode;if(c&&c.nodeType!=goog.dom.NodeType.DOCUMENT_FRAGMENT){if(a.removeNode)return a.removeNode(!1);for(;b=a.firstChild;)c.insertBefore(b,a);return goog.dom.removeNode(a)}};
goog.dom.getChildren=function(a){return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE&&void 0!=a.children?a.children:goog.array.filter(a.childNodes,function(a){return a.nodeType==goog.dom.NodeType.ELEMENT})};goog.dom.getFirstElementChild=function(a){return void 0!=a.firstElementChild?a.firstElementChild:goog.dom.getNextElementNode_(a.firstChild,!0)};goog.dom.getLastElementChild=function(a){return void 0!=a.lastElementChild?a.lastElementChild:goog.dom.getNextElementNode_(a.lastChild,!1)};
goog.dom.getNextElementSibling=function(a){return void 0!=a.nextElementSibling?a.nextElementSibling:goog.dom.getNextElementNode_(a.nextSibling,!0)};goog.dom.getPreviousElementSibling=function(a){return void 0!=a.previousElementSibling?a.previousElementSibling:goog.dom.getNextElementNode_(a.previousSibling,!1)};goog.dom.getNextElementNode_=function(a,b){for(;a&&a.nodeType!=goog.dom.NodeType.ELEMENT;)a=b?a.nextSibling:a.previousSibling;return a};
goog.dom.getNextNode=function(a){if(!a)return null;if(a.firstChild)return a.firstChild;for(;a&&!a.nextSibling;)a=a.parentNode;return a?a.nextSibling:null};goog.dom.getPreviousNode=function(a){if(!a)return null;if(!a.previousSibling)return a.parentNode;for(a=a.previousSibling;a&&a.lastChild;)a=a.lastChild;return a};goog.dom.isNodeLike=function(a){return goog.isObject(a)&&0<a.nodeType};goog.dom.isElement=function(a){return goog.isObject(a)&&a.nodeType==goog.dom.NodeType.ELEMENT};
goog.dom.isWindow=function(a){return goog.isObject(a)&&a.window==a};goog.dom.getParentElement=function(a){if(goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY&&!(goog.userAgent.IE&&goog.userAgent.isVersionOrHigher("9")&&!goog.userAgent.isVersionOrHigher("10")&&goog.global.SVGElement&&a instanceof goog.global.SVGElement))return a.parentElement;a=a.parentNode;return goog.dom.isElement(a)?a:null};
goog.dom.contains=function(a,b){if(a.contains&&b.nodeType==goog.dom.NodeType.ELEMENT)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};
goog.dom.compareNodeOrder=function(a,b){if(a==b)return 0;if(a.compareDocumentPosition)return a.compareDocumentPosition(b)&2?1:-1;if(goog.userAgent.IE&&!goog.userAgent.isDocumentModeOrHigher(9)){if(a.nodeType==goog.dom.NodeType.DOCUMENT)return-1;if(b.nodeType==goog.dom.NodeType.DOCUMENT)return 1}if("sourceIndex"in a||a.parentNode&&"sourceIndex"in a.parentNode){var c=a.nodeType==goog.dom.NodeType.ELEMENT,d=b.nodeType==goog.dom.NodeType.ELEMENT;if(c&&d)return a.sourceIndex-b.sourceIndex;var e=a.parentNode,
f=b.parentNode;return e==f?goog.dom.compareSiblingOrder_(a,b):!c&&goog.dom.contains(e,b)?-1*goog.dom.compareParentsDescendantNodeIe_(a,b):!d&&goog.dom.contains(f,a)?goog.dom.compareParentsDescendantNodeIe_(b,a):(c?a.sourceIndex:e.sourceIndex)-(d?b.sourceIndex:f.sourceIndex)}d=goog.dom.getOwnerDocument(a);c=d.createRange();c.selectNode(a);c.collapse(!0);d=d.createRange();d.selectNode(b);d.collapse(!0);return c.compareBoundaryPoints(goog.global.Range.START_TO_END,d)};
goog.dom.compareParentsDescendantNodeIe_=function(a,b){var c=a.parentNode;if(c==b)return-1;for(var d=b;d.parentNode!=c;)d=d.parentNode;return goog.dom.compareSiblingOrder_(d,a)};goog.dom.compareSiblingOrder_=function(a,b){for(var c=b;c=c.previousSibling;)if(c==a)return-1;return 1};
goog.dom.findCommonAncestor=function(a){var b,c=arguments.length;if(!c)return null;if(1==c)return arguments[0];var d=[],e=Infinity;for(b=0;b<c;b++){for(var f=[],g=arguments[b];g;)f.unshift(g),g=g.parentNode;d.push(f);e=Math.min(e,f.length)}f=null;for(b=0;b<e;b++){for(var g=d[0][b],h=1;h<c;h++)if(g!=d[h][b])return f;f=g}return f};goog.dom.getOwnerDocument=function(a){return a.nodeType==goog.dom.NodeType.DOCUMENT?a:a.ownerDocument||a.document};
goog.dom.getFrameContentDocument=function(a){return a.contentDocument||a.contentWindow.document};goog.dom.getFrameContentWindow=function(a){return a.contentWindow||goog.dom.getWindow(goog.dom.getFrameContentDocument(a))};
goog.dom.setTextContent=function(a,b){goog.asserts.assert(null!=a,"goog.dom.setTextContent expects a non-null value for node");if("textContent"in a)a.textContent=b;else if(a.nodeType==goog.dom.NodeType.TEXT)a.data=b;else if(a.firstChild&&a.firstChild.nodeType==goog.dom.NodeType.TEXT){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{goog.dom.removeChildren(a);var c=goog.dom.getOwnerDocument(a);a.appendChild(c.createTextNode(String(b)))}};
goog.dom.getOuterHtml=function(a){if("outerHTML"in a)return a.outerHTML;var b=goog.dom.getOwnerDocument(a).createElement("div");b.appendChild(a.cloneNode(!0));return b.innerHTML};goog.dom.findNode=function(a,b){var c=[];return goog.dom.findNodes_(a,b,c,!0)?c[0]:void 0};goog.dom.findNodes=function(a,b){var c=[];goog.dom.findNodes_(a,b,c,!1);return c};goog.dom.findNodes_=function(a,b,c,d){if(null!=a)for(a=a.firstChild;a;){if(b(a)&&(c.push(a),d)||goog.dom.findNodes_(a,b,c,d))return!0;a=a.nextSibling}return!1};
goog.dom.TAGS_TO_IGNORE_={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1};goog.dom.PREDEFINED_TAG_VALUES_={IMG:" ",BR:"\n"};goog.dom.isFocusableTabIndex=function(a){return goog.dom.hasSpecifiedTabIndex_(a)&&goog.dom.isTabIndexFocusable_(a)};goog.dom.setFocusableTabIndex=function(a,b){b?a.tabIndex=0:(a.tabIndex=-1,a.removeAttribute("tabIndex"))};
goog.dom.isFocusable=function(a){var b;return(b=goog.dom.nativelySupportsFocus_(a)?!a.disabled&&(!goog.dom.hasSpecifiedTabIndex_(a)||goog.dom.isTabIndexFocusable_(a)):goog.dom.isFocusableTabIndex(a))&&goog.userAgent.IE?goog.dom.hasNonZeroBoundingRect_(a):b};goog.dom.hasSpecifiedTabIndex_=function(a){a=a.getAttributeNode("tabindex");return goog.isDefAndNotNull(a)&&a.specified};goog.dom.isTabIndexFocusable_=function(a){a=a.tabIndex;return goog.isNumber(a)&&0<=a&&32768>a};
goog.dom.nativelySupportsFocus_=function(a){return a.tagName==goog.dom.TagName.A||a.tagName==goog.dom.TagName.INPUT||a.tagName==goog.dom.TagName.TEXTAREA||a.tagName==goog.dom.TagName.SELECT||a.tagName==goog.dom.TagName.BUTTON};goog.dom.hasNonZeroBoundingRect_=function(a){a=goog.isFunction(a.getBoundingClientRect)?a.getBoundingClientRect():{height:a.offsetHeight,width:a.offsetWidth};return goog.isDefAndNotNull(a)&&0<a.height&&0<a.width};
goog.dom.getTextContent=function(a){if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT&&"innerText"in a)a=goog.string.canonicalizeNewlines(a.innerText);else{var b=[];goog.dom.getTextContent_(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");goog.dom.BrowserFeature.CAN_USE_INNER_TEXT||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a};goog.dom.getRawTextContent=function(a){var b=[];goog.dom.getTextContent_(a,b,!1);return b.join("")};
goog.dom.getTextContent_=function(a,b,c){if(!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))if(a.nodeType==goog.dom.NodeType.TEXT)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);else for(a=a.firstChild;a;)goog.dom.getTextContent_(a,b,c),a=a.nextSibling};goog.dom.getNodeTextLength=function(a){return goog.dom.getTextContent(a).length};
goog.dom.getNodeTextOffset=function(a,b){for(var c=b||goog.dom.getOwnerDocument(a).body,d=[];a&&a!=c;){for(var e=a;e=e.previousSibling;)d.unshift(goog.dom.getTextContent(e));a=a.parentNode}return goog.string.trimLeft(d.join("")).replace(/ +/g," ").length};
goog.dom.getNodeAtOffset=function(a,b,c){a=[a];for(var d=0,e=null;0<a.length&&d<b;)if(e=a.pop(),!(e.nodeName in goog.dom.TAGS_TO_IGNORE_))if(e.nodeType==goog.dom.NodeType.TEXT)var f=e.nodeValue.replace(/(\r\n|\r|\n)/g,"").replace(/ +/g," "),d=d+f.length;else if(e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)d+=goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;else for(f=e.childNodes.length-1;0<=f;f--)a.push(e.childNodes[f]);goog.isObject(c)&&(c.remainder=e?e.nodeValue.length+b-d-1:0,c.node=e);return e};
goog.dom.isNodeList=function(a){if(a&&"number"==typeof a.length){if(goog.isObject(a))return"function"==typeof a.item||"string"==typeof a.item;if(goog.isFunction(a))return"function"==typeof a.item}return!1};goog.dom.getAncestorByTagNameAndClass=function(a,b,c){if(!b&&!c)return null;var d=b?b.toUpperCase():null;return goog.dom.getAncestor(a,function(a){return(!d||a.nodeName==d)&&(!c||goog.dom.classes.has(a,c))},!0)};
goog.dom.getAncestorByClass=function(a,b){return goog.dom.getAncestorByTagNameAndClass(a,null,b)};goog.dom.getAncestor=function(a,b,c,d){c||(a=a.parentNode);c=null==d;for(var e=0;a&&(c||e<=d);){if(b(a))return a;a=a.parentNode;e++}return null};goog.dom.getActiveElement=function(a){try{return a&&a.activeElement}catch(b){}return null};
goog.dom.getPixelRatio=goog.functions.cacheReturnValue(function(){var a=goog.dom.getWindow(),b=goog.userAgent.GECKO&&goog.userAgent.MOBILE;return goog.isDef(a.devicePixelRatio)&&!b?a.devicePixelRatio:a.matchMedia?goog.dom.matchesPixelRatio_(.75)||goog.dom.matchesPixelRatio_(1.5)||goog.dom.matchesPixelRatio_(2)||goog.dom.matchesPixelRatio_(3)||1:1});
goog.dom.matchesPixelRatio_=function(a){return goog.dom.getWindow().matchMedia("(-webkit-min-device-pixel-ratio: "+a+"),(min--moz-device-pixel-ratio: "+a+"),(min-resolution: "+a+"dppx)").matches?a:0};goog.dom.DomHelper=function(a){this.document_=a||goog.global.document||document};goog.dom.DomHelper.prototype.getDomHelper=goog.dom.getDomHelper;goog.dom.DomHelper.prototype.setDocument=function(a){this.document_=a};goog.dom.DomHelper.prototype.getDocument=function(){return this.document_};
goog.dom.DomHelper.prototype.getElement=function(a){return goog.dom.getElementHelper_(this.document_,a)};goog.dom.DomHelper.prototype.getRequiredElement=function(a){return goog.dom.getRequiredElementHelper_(this.document_,a)};goog.dom.DomHelper.prototype.$=goog.dom.DomHelper.prototype.getElement;goog.dom.DomHelper.prototype.getElementsByTagNameAndClass=function(a,b,c){return goog.dom.getElementsByTagNameAndClass_(this.document_,a,b,c)};
goog.dom.DomHelper.prototype.getElementsByClass=function(a,b){return goog.dom.getElementsByClass(a,b||this.document_)};goog.dom.DomHelper.prototype.getElementByClass=function(a,b){return goog.dom.getElementByClass(a,b||this.document_)};goog.dom.DomHelper.prototype.getRequiredElementByClass=function(a,b){return goog.dom.getRequiredElementByClass(a,b||this.document_)};goog.dom.DomHelper.prototype.$$=goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties=goog.dom.setProperties;goog.dom.DomHelper.prototype.getViewportSize=function(a){return goog.dom.getViewportSize(a||this.getWindow())};goog.dom.DomHelper.prototype.getDocumentHeight=function(){return goog.dom.getDocumentHeight_(this.getWindow())};goog.dom.DomHelper.prototype.createDom=function(a,b,c){return goog.dom.createDom_(this.document_,arguments)};goog.dom.DomHelper.prototype.$dom=goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement=function(a){return this.document_.createElement(a)};goog.dom.DomHelper.prototype.createTextNode=function(a){return this.document_.createTextNode(String(a))};goog.dom.DomHelper.prototype.createTable=function(a,b,c){return goog.dom.createTable_(this.document_,a,b,!!c)};goog.dom.DomHelper.prototype.htmlToDocumentFragment=function(a){return goog.dom.htmlToDocumentFragment_(this.document_,a)};goog.dom.DomHelper.prototype.isCss1CompatMode=function(){return goog.dom.isCss1CompatMode_(this.document_)};
goog.dom.DomHelper.prototype.getWindow=function(){return goog.dom.getWindow_(this.document_)};goog.dom.DomHelper.prototype.getDocumentScrollElement=function(){return goog.dom.getDocumentScrollElement_(this.document_)};goog.dom.DomHelper.prototype.getDocumentScroll=function(){return goog.dom.getDocumentScroll_(this.document_)};goog.dom.DomHelper.prototype.getActiveElement=function(a){return goog.dom.getActiveElement(a||this.document_)};goog.dom.DomHelper.prototype.appendChild=goog.dom.appendChild;
goog.dom.DomHelper.prototype.append=goog.dom.append;goog.dom.DomHelper.prototype.canHaveChildren=goog.dom.canHaveChildren;goog.dom.DomHelper.prototype.removeChildren=goog.dom.removeChildren;goog.dom.DomHelper.prototype.insertSiblingBefore=goog.dom.insertSiblingBefore;goog.dom.DomHelper.prototype.insertSiblingAfter=goog.dom.insertSiblingAfter;goog.dom.DomHelper.prototype.insertChildAt=goog.dom.insertChildAt;goog.dom.DomHelper.prototype.removeNode=goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode=goog.dom.replaceNode;goog.dom.DomHelper.prototype.flattenElement=goog.dom.flattenElement;goog.dom.DomHelper.prototype.getChildren=goog.dom.getChildren;goog.dom.DomHelper.prototype.getFirstElementChild=goog.dom.getFirstElementChild;goog.dom.DomHelper.prototype.getLastElementChild=goog.dom.getLastElementChild;goog.dom.DomHelper.prototype.getNextElementSibling=goog.dom.getNextElementSibling;goog.dom.DomHelper.prototype.getPreviousElementSibling=goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode=goog.dom.getNextNode;goog.dom.DomHelper.prototype.getPreviousNode=goog.dom.getPreviousNode;goog.dom.DomHelper.prototype.isNodeLike=goog.dom.isNodeLike;goog.dom.DomHelper.prototype.isElement=goog.dom.isElement;goog.dom.DomHelper.prototype.isWindow=goog.dom.isWindow;goog.dom.DomHelper.prototype.getParentElement=goog.dom.getParentElement;goog.dom.DomHelper.prototype.contains=goog.dom.contains;goog.dom.DomHelper.prototype.compareNodeOrder=goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor=goog.dom.findCommonAncestor;goog.dom.DomHelper.prototype.getOwnerDocument=goog.dom.getOwnerDocument;goog.dom.DomHelper.prototype.getFrameContentDocument=goog.dom.getFrameContentDocument;goog.dom.DomHelper.prototype.getFrameContentWindow=goog.dom.getFrameContentWindow;goog.dom.DomHelper.prototype.setTextContent=goog.dom.setTextContent;goog.dom.DomHelper.prototype.getOuterHtml=goog.dom.getOuterHtml;goog.dom.DomHelper.prototype.findNode=goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes=goog.dom.findNodes;goog.dom.DomHelper.prototype.isFocusableTabIndex=goog.dom.isFocusableTabIndex;goog.dom.DomHelper.prototype.setFocusableTabIndex=goog.dom.setFocusableTabIndex;goog.dom.DomHelper.prototype.isFocusable=goog.dom.isFocusable;goog.dom.DomHelper.prototype.getTextContent=goog.dom.getTextContent;goog.dom.DomHelper.prototype.getNodeTextLength=goog.dom.getNodeTextLength;goog.dom.DomHelper.prototype.getNodeTextOffset=goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset=goog.dom.getNodeAtOffset;goog.dom.DomHelper.prototype.isNodeList=goog.dom.isNodeList;goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass=goog.dom.getAncestorByTagNameAndClass;goog.dom.DomHelper.prototype.getAncestorByClass=goog.dom.getAncestorByClass;goog.dom.DomHelper.prototype.getAncestor=goog.dom.getAncestor;goog.dom.vendor={};goog.dom.vendor.getVendorJsPrefix=function(){return goog.userAgent.WEBKIT?"Webkit":goog.userAgent.GECKO?"Moz":goog.userAgent.IE?"ms":goog.userAgent.OPERA?"O":null};goog.dom.vendor.getVendorPrefix=function(){return goog.userAgent.WEBKIT?"-webkit":goog.userAgent.GECKO?"-moz":goog.userAgent.IE?"-ms":goog.userAgent.OPERA?"-o":null};
goog.dom.vendor.getPrefixedPropertyName=function(a,b){if(b&&a in b)return a;var c=goog.dom.vendor.getVendorJsPrefix();return c?(c=c.toLowerCase(),c+=goog.string.toTitleCase(a),!goog.isDef(b)||c in b?c:null):null};goog.dom.vendor.getPrefixedEventType=function(a){return((goog.dom.vendor.getVendorJsPrefix()||"")+a).toLowerCase()};goog.math.Box=function(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d};goog.math.Box.boundingBox=function(a){for(var b=new goog.math.Box(arguments[0].y,arguments[0].x,arguments[0].y,arguments[0].x),c=1;c<arguments.length;c++){var d=arguments[c];b.top=Math.min(b.top,d.y);b.right=Math.max(b.right,d.x);b.bottom=Math.max(b.bottom,d.y);b.left=Math.min(b.left,d.x)}return b};goog.math.Box.prototype.clone=function(){return new goog.math.Box(this.top,this.right,this.bottom,this.left)};
goog.DEBUG&&(goog.math.Box.prototype.toString=function(){return"("+this.top+"t, "+this.right+"r, "+this.bottom+"b, "+this.left+"l)"});goog.math.Box.prototype.contains=function(a){return goog.math.Box.contains(this,a)};goog.math.Box.prototype.expand=function(a,b,c,d){goog.isObject(a)?(this.top-=a.top,this.right+=a.right,this.bottom+=a.bottom,this.left-=a.left):(this.top-=a,this.right+=b,this.bottom+=c,this.left-=d);return this};
goog.math.Box.prototype.expandToInclude=function(a){this.left=Math.min(this.left,a.left);this.top=Math.min(this.top,a.top);this.right=Math.max(this.right,a.right);this.bottom=Math.max(this.bottom,a.bottom)};goog.math.Box.equals=function(a,b){return a==b?!0:a&&b?a.top==b.top&&a.right==b.right&&a.bottom==b.bottom&&a.left==b.left:!1};
goog.math.Box.contains=function(a,b){return a&&b?b instanceof goog.math.Box?b.left>=a.left&&b.right<=a.right&&b.top>=a.top&&b.bottom<=a.bottom:b.x>=a.left&&b.x<=a.right&&b.y>=a.top&&b.y<=a.bottom:!1};goog.math.Box.relativePositionX=function(a,b){return b.x<a.left?b.x-a.left:b.x>a.right?b.x-a.right:0};goog.math.Box.relativePositionY=function(a,b){return b.y<a.top?b.y-a.top:b.y>a.bottom?b.y-a.bottom:0};
goog.math.Box.distance=function(a,b){var c=goog.math.Box.relativePositionX(a,b),d=goog.math.Box.relativePositionY(a,b);return Math.sqrt(c*c+d*d)};goog.math.Box.intersects=function(a,b){return a.left<=b.right&&b.left<=a.right&&a.top<=b.bottom&&b.top<=a.bottom};goog.math.Box.intersectsWithPadding=function(a,b,c){return a.left<=b.right+c&&b.left<=a.right+c&&a.top<=b.bottom+c&&b.top<=a.bottom+c};
goog.math.Box.prototype.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};goog.math.Box.prototype.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};
goog.math.Box.prototype.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};goog.math.Box.prototype.translate=function(a,b){a instanceof goog.math.Coordinate?(this.left+=a.x,this.right+=a.x,this.top+=a.y,this.bottom+=a.y):(this.left+=a,this.right+=a,goog.isNumber(b)&&(this.top+=b,this.bottom+=b));return this};
goog.math.Box.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.left*=a;this.right*=a;this.top*=c;this.bottom*=c;return this};goog.math.Rect=function(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d};goog.math.Rect.prototype.clone=function(){return new goog.math.Rect(this.left,this.top,this.width,this.height)};goog.math.Rect.prototype.toBox=function(){return new goog.math.Box(this.top,this.left+this.width,this.top+this.height,this.left)};goog.math.Rect.createFromBox=function(a){return new goog.math.Rect(a.left,a.top,a.right-a.left,a.bottom-a.top)};
goog.DEBUG&&(goog.math.Rect.prototype.toString=function(){return"("+this.left+", "+this.top+" - "+this.width+"w x "+this.height+"h)"});goog.math.Rect.equals=function(a,b){return a==b?!0:a&&b?a.left==b.left&&a.width==b.width&&a.top==b.top&&a.height==b.height:!1};
goog.math.Rect.prototype.intersection=function(a){var b=Math.max(this.left,a.left),c=Math.min(this.left+this.width,a.left+a.width);if(b<=c){var d=Math.max(this.top,a.top);a=Math.min(this.top+this.height,a.top+a.height);if(d<=a)return this.left=b,this.top=d,this.width=c-b,this.height=a-d,!0}return!1};
goog.math.Rect.intersection=function(a,b){var c=Math.max(a.left,b.left),d=Math.min(a.left+a.width,b.left+b.width);if(c<=d){var e=Math.max(a.top,b.top),f=Math.min(a.top+a.height,b.top+b.height);if(e<=f)return new goog.math.Rect(c,e,d-c,f-e)}return null};goog.math.Rect.intersects=function(a,b){return a.left<=b.left+b.width&&b.left<=a.left+a.width&&a.top<=b.top+b.height&&b.top<=a.top+a.height};goog.math.Rect.prototype.intersects=function(a){return goog.math.Rect.intersects(this,a)};
goog.math.Rect.difference=function(a,b){var c=goog.math.Rect.intersection(a,b);if(!c||!c.height||!c.width)return[a.clone()];var c=[],d=a.top,e=a.height,f=a.left+a.width,g=a.top+a.height,h=b.left+b.width,k=b.top+b.height;b.top>a.top&&(c.push(new goog.math.Rect(a.left,a.top,a.width,b.top-a.top)),d=b.top,e-=b.top-a.top);k<g&&(c.push(new goog.math.Rect(a.left,k,a.width,g-k)),e=k-d);b.left>a.left&&c.push(new goog.math.Rect(a.left,d,b.left-a.left,e));h<f&&c.push(new goog.math.Rect(h,d,f-h,e));return c};
goog.math.Rect.prototype.difference=function(a){return goog.math.Rect.difference(this,a)};goog.math.Rect.prototype.boundingRect=function(a){var b=Math.max(this.left+this.width,a.left+a.width),c=Math.max(this.top+this.height,a.top+a.height);this.left=Math.min(this.left,a.left);this.top=Math.min(this.top,a.top);this.width=b-this.left;this.height=c-this.top};goog.math.Rect.boundingRect=function(a,b){if(!a||!b)return null;var c=a.clone();c.boundingRect(b);return c};
goog.math.Rect.prototype.contains=function(a){return a instanceof goog.math.Rect?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};goog.math.Rect.prototype.squaredDistance=function(a){var b=a.x<this.left?this.left-a.x:Math.max(a.x-(this.left+this.width),0);a=a.y<this.top?this.top-a.y:Math.max(a.y-(this.top+this.height),0);return b*b+a*a};
goog.math.Rect.prototype.distance=function(a){return Math.sqrt(this.squaredDistance(a))};goog.math.Rect.prototype.getSize=function(){return new goog.math.Size(this.width,this.height)};goog.math.Rect.prototype.getTopLeft=function(){return new goog.math.Coordinate(this.left,this.top)};goog.math.Rect.prototype.getCenter=function(){return new goog.math.Coordinate(this.left+this.width/2,this.top+this.height/2)};
goog.math.Rect.prototype.getBottomRight=function(){return new goog.math.Coordinate(this.left+this.width,this.top+this.height)};goog.math.Rect.prototype.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};goog.math.Rect.prototype.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
goog.math.Rect.prototype.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};goog.math.Rect.prototype.translate=function(a,b){a instanceof goog.math.Coordinate?(this.left+=a.x,this.top+=a.y):(this.left+=a,goog.isNumber(b)&&(this.top+=b));return this};goog.math.Rect.prototype.scale=function(a,b){var c=goog.isNumber(b)?b:a;this.left*=a;this.width*=a;this.top*=c;this.height*=c;return this};goog.style={};goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS=!1;goog.style.setStyle=function(a,b,c){goog.isString(b)?goog.style.setStyle_(a,c,b):goog.object.forEach(b,goog.partial(goog.style.setStyle_,a))};goog.style.setStyle_=function(a,b,c){(c=goog.style.getVendorJsStyleName_(a,c))&&(a.style[c]=b)};goog.style.getVendorJsStyleName_=function(a,b){var c=goog.string.toCamelCase(b);if(void 0===a.style[c]){var d=goog.dom.vendor.getVendorJsPrefix()+goog.string.toTitleCase(b);if(void 0!==a.style[d])return d}return c};
goog.style.getVendorStyleName_=function(a,b){var c=goog.string.toCamelCase(b);return void 0===a.style[c]&&(c=goog.dom.vendor.getVendorJsPrefix()+goog.string.toTitleCase(b),void 0!==a.style[c])?goog.dom.vendor.getVendorPrefix()+"-"+b:b};goog.style.getStyle=function(a,b){var c=a.style[goog.string.toCamelCase(b)];return"undefined"!==typeof c?c:a.style[goog.style.getVendorJsStyleName_(a,b)]||""};
goog.style.getComputedStyle=function(a,b){var c=goog.dom.getOwnerDocument(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b)||"":""};goog.style.getCascadedStyle=function(a,b){return a.currentStyle?a.currentStyle[b]:null};goog.style.getStyle_=function(a,b){return goog.style.getComputedStyle(a,b)||goog.style.getCascadedStyle(a,b)||a.style&&a.style[b]};
goog.style.getComputedBoxSizing=function(a){return goog.style.getStyle_(a,"boxSizing")||goog.style.getStyle_(a,"MozBoxSizing")||goog.style.getStyle_(a,"WebkitBoxSizing")||null};goog.style.getComputedPosition=function(a){return goog.style.getStyle_(a,"position")};goog.style.getBackgroundColor=function(a){return goog.style.getStyle_(a,"backgroundColor")};goog.style.getComputedOverflowX=function(a){return goog.style.getStyle_(a,"overflowX")};
goog.style.getComputedOverflowY=function(a){return goog.style.getStyle_(a,"overflowY")};goog.style.getComputedZIndex=function(a){return goog.style.getStyle_(a,"zIndex")};goog.style.getComputedTextAlign=function(a){return goog.style.getStyle_(a,"textAlign")};goog.style.getComputedCursor=function(a){return goog.style.getStyle_(a,"cursor")};goog.style.getComputedTransform=function(a){var b=goog.style.getVendorStyleName_(a,"transform");return goog.style.getStyle_(a,b)||goog.style.getStyle_(a,"transform")};
goog.style.setPosition=function(a,b,c){var d,e=goog.userAgent.GECKO&&(goog.userAgent.MAC||goog.userAgent.X11)&&goog.userAgent.isVersionOrHigher("1.9");b instanceof goog.math.Coordinate?(d=b.x,b=b.y):(d=b,b=c);a.style.left=goog.style.getPixelStyleValue_(d,e);a.style.top=goog.style.getPixelStyleValue_(b,e)};goog.style.getPosition=function(a){return new goog.math.Coordinate(a.offsetLeft,a.offsetTop)};
goog.style.getClientViewportElement=function(a){a=a?goog.dom.getOwnerDocument(a):goog.dom.getDocument();return!goog.userAgent.IE||goog.userAgent.isDocumentModeOrHigher(9)||goog.dom.getDomHelper(a).isCss1CompatMode()?a.documentElement:a.body};goog.style.getViewportPageOffset=function(a){var b=a.body;a=a.documentElement;return new goog.math.Coordinate(b.scrollLeft||a.scrollLeft,b.scrollTop||a.scrollTop)};
goog.style.getBoundingClientRect_=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){return{left:0,top:0,right:0,bottom:0}}goog.userAgent.IE&&a.ownerDocument.body&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b};
goog.style.getOffsetParent=function(a){if(goog.userAgent.IE&&!goog.userAgent.isDocumentModeOrHigher(8))return a.offsetParent;var b=goog.dom.getOwnerDocument(a),c=goog.style.getStyle_(a,"position"),d="fixed"==c||"absolute"==c;for(a=a.parentNode;a&&a!=b;a=a.parentNode)if(c=goog.style.getStyle_(a,"position"),d=d&&"static"==c&&a!=b.documentElement&&a!=b.body,!d&&(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight||"fixed"==c||"absolute"==c||"relative"==c))return a;return null};
goog.style.getVisibleRectForElement=function(a){for(var b=new goog.math.Box(0,Infinity,Infinity,0),c=goog.dom.getDomHelper(a),d=c.getDocument().body,e=c.getDocument().documentElement,f=c.getDocumentScrollElement();a=goog.style.getOffsetParent(a);)if(!(goog.userAgent.IE&&0==a.clientWidth||goog.userAgent.WEBKIT&&0==a.clientHeight&&a==d)&&a!=d&&a!=e&&"visible"!=goog.style.getStyle_(a,"overflow")){var g=goog.style.getPageOffset(a),h=goog.style.getClientLeftTop(a);g.x+=h.x;g.y+=h.y;b.top=Math.max(b.top,
g.y);b.right=Math.min(b.right,g.x+a.clientWidth);b.bottom=Math.min(b.bottom,g.y+a.clientHeight);b.left=Math.max(b.left,g.x)}d=f.scrollLeft;f=f.scrollTop;b.left=Math.max(b.left,d);b.top=Math.max(b.top,f);c=c.getViewportSize();b.right=Math.min(b.right,d+c.width);b.bottom=Math.min(b.bottom,f+c.height);return 0<=b.top&&0<=b.left&&b.bottom>b.top&&b.right>b.left?b:null};
goog.style.getContainerOffsetToScrollInto=function(a,b,c){var d=goog.style.getPageOffset(a),e=goog.style.getPageOffset(b),f=goog.style.getBorderBox(b),g=d.x-e.x-f.left,d=d.y-e.y-f.top,e=b.clientWidth-a.offsetWidth;a=b.clientHeight-a.offsetHeight;f=b.scrollLeft;b=b.scrollTop;c?(f+=g-e/2,b+=d-a/2):(f+=Math.min(g,Math.max(g-e,0)),b+=Math.min(d,Math.max(d-a,0)));return new goog.math.Coordinate(f,b)};
goog.style.scrollIntoContainerView=function(a,b,c){a=goog.style.getContainerOffsetToScrollInto(a,b,c);b.scrollLeft=a.x;b.scrollTop=a.y};
goog.style.getClientLeftTop=function(a){if(goog.userAgent.GECKO&&!goog.userAgent.isVersionOrHigher("1.9")){var b=parseFloat(goog.style.getComputedStyle(a,"borderLeftWidth"));if(goog.style.isRightToLeft(a))var c=a.offsetWidth-a.clientWidth-b-parseFloat(goog.style.getComputedStyle(a,"borderRightWidth")),b=b+c;return new goog.math.Coordinate(b,parseFloat(goog.style.getComputedStyle(a,"borderTopWidth")))}return new goog.math.Coordinate(a.clientLeft,a.clientTop)};
goog.style.getPageOffset=function(a){var b,c=goog.dom.getOwnerDocument(a),d=goog.style.getStyle_(a,"position");goog.asserts.assertObject(a,"Parameter is required");var e=!goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS&&goog.userAgent.GECKO&&c.getBoxObjectFor&&!a.getBoundingClientRect&&"absolute"==d&&(b=c.getBoxObjectFor(a))&&(0>b.screenX||0>b.screenY),f=new goog.math.Coordinate(0,0),g=goog.style.getClientViewportElement(c);if(a==g)return f;if(goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS||
a.getBoundingClientRect)b=goog.style.getBoundingClientRect_(a),a=goog.dom.getDomHelper(c).getDocumentScroll(),f.x=b.left+a.x,f.y=b.top+a.y;else if(c.getBoxObjectFor&&!e)b=c.getBoxObjectFor(a),a=c.getBoxObjectFor(g),f.x=b.screenX-a.screenX,f.y=b.screenY-a.screenY;else{b=a;do{f.x+=b.offsetLeft;f.y+=b.offsetTop;b!=a&&(f.x+=b.clientLeft||0,f.y+=b.clientTop||0);if(goog.userAgent.WEBKIT&&"fixed"==goog.style.getComputedPosition(b)){f.x+=c.body.scrollLeft;f.y+=c.body.scrollTop;break}b=b.offsetParent}while(b&&
b!=a);if(goog.userAgent.OPERA||goog.userAgent.WEBKIT&&"absolute"==d)f.y-=c.body.offsetTop;for(b=a;(b=goog.style.getOffsetParent(b))&&b!=c.body&&b!=g;)f.x-=b.scrollLeft,goog.userAgent.OPERA&&"TR"==b.tagName||(f.y-=b.scrollTop)}return f};goog.style.getPageOffsetLeft=function(a){return goog.style.getPageOffset(a).x};goog.style.getPageOffsetTop=function(a){return goog.style.getPageOffset(a).y};
goog.style.getFramedPageOffset=function(a,b){var c=new goog.math.Coordinate(0,0),d=goog.dom.getWindow(goog.dom.getOwnerDocument(a)),e=a;do{var f=d==b?goog.style.getPageOffset(e):goog.style.getClientPositionForElement_(goog.asserts.assert(e));c.x+=f.x;c.y+=f.y}while(d&&d!=b&&(e=d.frameElement)&&(d=d.parent));return c};
goog.style.translateRectForAnotherFrame=function(a,b,c){if(b.getDocument()!=c.getDocument()){var d=b.getDocument().body;c=goog.style.getFramedPageOffset(d,c.getWindow());c=goog.math.Coordinate.difference(c,goog.style.getPageOffset(d));goog.userAgent.IE&&!b.isCss1CompatMode()&&(c=goog.math.Coordinate.difference(c,b.getDocumentScroll()));a.left+=c.x;a.top+=c.y}};
goog.style.getRelativePosition=function(a,b){var c=goog.style.getClientPosition(a),d=goog.style.getClientPosition(b);return new goog.math.Coordinate(c.x-d.x,c.y-d.y)};
goog.style.getClientPositionForElement_=function(a){var b;if(goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS||a.getBoundingClientRect)b=goog.style.getBoundingClientRect_(a),b=new goog.math.Coordinate(b.left,b.top);else{b=goog.dom.getDomHelper(a).getDocumentScroll();var c=goog.style.getPageOffset(a);b=new goog.math.Coordinate(c.x-b.x,c.y-b.y)}return goog.userAgent.GECKO&&!goog.userAgent.isVersionOrHigher(12)?goog.math.Coordinate.sum(b,goog.style.getCssTranslation(a)):b};
goog.style.getClientPosition=function(a){goog.asserts.assert(a);if(a.nodeType==goog.dom.NodeType.ELEMENT)return goog.style.getClientPositionForElement_(a);var b=goog.isFunction(a.getBrowserEvent),c=a;a.targetTouches?c=a.targetTouches[0]:b&&a.getBrowserEvent().targetTouches&&(c=a.getBrowserEvent().targetTouches[0]);return new goog.math.Coordinate(c.clientX,c.clientY)};
goog.style.setPageOffset=function(a,b,c){var d=goog.style.getPageOffset(a);b instanceof goog.math.Coordinate&&(c=b.y,b=b.x);goog.style.setPosition(a,a.offsetLeft+(b-d.x),a.offsetTop+(c-d.y))};goog.style.setSize=function(a,b,c){if(b instanceof goog.math.Size)c=b.height,b=b.width;else if(void 0==c)throw Error("missing height argument");goog.style.setWidth(a,b);goog.style.setHeight(a,c)};goog.style.getPixelStyleValue_=function(a,b){"number"==typeof a&&(a=(b?Math.round(a):a)+"px");return a};
goog.style.setHeight=function(a,b){a.style.height=goog.style.getPixelStyleValue_(b,!0)};goog.style.setWidth=function(a,b){a.style.width=goog.style.getPixelStyleValue_(b,!0)};goog.style.getSize=function(a){return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_,a)};
goog.style.evaluateWithTemporaryDisplay_=function(a,b){if("none"!=goog.style.getStyle_(b,"display"))return a(b);var c=b.style,d=c.display,e=c.visibility,f=c.position;c.visibility="hidden";c.position="absolute";c.display="inline";var g=a(b);c.display=d;c.position=f;c.visibility=e;return g};
goog.style.getSizeWithDisplay_=function(a){var b=a.offsetWidth,c=a.offsetHeight,d=goog.userAgent.WEBKIT&&!b&&!c;return goog.isDef(b)&&!d||!a.getBoundingClientRect?new goog.math.Size(b,c):(a=goog.style.getBoundingClientRect_(a),new goog.math.Size(a.right-a.left,a.bottom-a.top))};goog.style.getTransformedSize=function(a){if(!a.getBoundingClientRect)return null;a=goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_,a);return new goog.math.Size(a.right-a.left,a.bottom-a.top)};
goog.style.getBounds=function(a){var b=goog.style.getPageOffset(a);a=goog.style.getSize(a);return new goog.math.Rect(b.x,b.y,a.width,a.height)};goog.style.toCamelCase=function(a){return goog.string.toCamelCase(String(a))};goog.style.toSelectorCase=function(a){return goog.string.toSelectorCase(a)};
goog.style.getOpacity=function(a){var b=a.style;a="";"opacity"in b?a=b.opacity:"MozOpacity"in b?a=b.MozOpacity:"filter"in b&&(b=b.filter.match(/alpha\(opacity=([\d.]+)\)/))&&(a=String(b[1]/100));return""==a?a:Number(a)};goog.style.setOpacity=function(a,b){var c=a.style;"opacity"in c?c.opacity=b:"MozOpacity"in c?c.MozOpacity=b:"filter"in c&&(c.filter=""===b?"":"alpha(opacity="+100*b+")")};
goog.style.setTransparentBackgroundImage=function(a,b){var c=a.style;goog.userAgent.IE&&!goog.userAgent.isVersionOrHigher("8")?c.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+b+'", sizingMethod="crop")':(c.backgroundImage="url("+b+")",c.backgroundPosition="top left",c.backgroundRepeat="no-repeat")};goog.style.clearTransparentBackgroundImage=function(a){a=a.style;"filter"in a?a.filter="":a.backgroundImage="none"};
goog.style.showElement=function(a,b){goog.style.setElementShown(a,b)};goog.style.setElementShown=function(a,b){a.style.display=b?"":"none"};goog.style.isElementShown=function(a){return"none"!=a.style.display};
goog.style.installStyles=function(a,b){var c=goog.dom.getDomHelper(b),d=null,e=c.getDocument();goog.userAgent.IE&&e.createStyleSheet?(d=e.createStyleSheet(),goog.style.setStyles(d,a)):(e=c.getElementsByTagNameAndClass("head")[0],e||(d=c.getElementsByTagNameAndClass("body")[0],e=c.createDom("head"),d.parentNode.insertBefore(e,d)),d=c.createDom("style"),goog.style.setStyles(d,a),c.appendChild(e,d));return d};goog.style.uninstallStyles=function(a){goog.dom.removeNode(a.ownerNode||a.owningElement||a)};
goog.style.setStyles=function(a,b){goog.userAgent.IE&&goog.isDef(a.cssText)?a.cssText=b:a.innerHTML=b};goog.style.setPreWrap=function(a){a=a.style;goog.userAgent.IE&&!goog.userAgent.isVersionOrHigher("8")?(a.whiteSpace="pre",a.wordWrap="break-word"):a.whiteSpace=goog.userAgent.GECKO?"-moz-pre-wrap":"pre-wrap"};
goog.style.setInlineBlock=function(a){a=a.style;a.position="relative";goog.userAgent.IE&&!goog.userAgent.isVersionOrHigher("8")?(a.zoom="1",a.display="inline"):a.display=goog.userAgent.GECKO?goog.userAgent.isVersionOrHigher("1.9a")?"inline-block":"-moz-inline-box":"inline-block"};goog.style.isRightToLeft=function(a){return"rtl"==goog.style.getStyle_(a,"direction")};goog.style.unselectableStyle_=goog.userAgent.GECKO?"MozUserSelect":goog.userAgent.WEBKIT?"WebkitUserSelect":null;
goog.style.isUnselectable=function(a){return goog.style.unselectableStyle_?"none"==a.style[goog.style.unselectableStyle_].toLowerCase():goog.userAgent.IE||goog.userAgent.OPERA?"on"==a.getAttribute("unselectable"):!1};
goog.style.setUnselectable=function(a,b,c){c=c?null:a.getElementsByTagName("*");var d=goog.style.unselectableStyle_;if(d){if(b=b?"none":"",a.style[d]=b,c){a=0;for(var e;e=c[a];a++)e.style[d]=b}}else if(goog.userAgent.IE||goog.userAgent.OPERA)if(b=b?"on":"",a.setAttribute("unselectable",b),c)for(a=0;e=c[a];a++)e.setAttribute("unselectable",b)};goog.style.getBorderBoxSize=function(a){return new goog.math.Size(a.offsetWidth,a.offsetHeight)};
goog.style.setBorderBoxSize=function(a,b){var c=goog.dom.getOwnerDocument(a),d=goog.dom.getDomHelper(c).isCss1CompatMode();if(!goog.userAgent.IE||d&&goog.userAgent.isVersionOrHigher("8"))goog.style.setBoxSizingSize_(a,b,"border-box");else if(c=a.style,d){var d=goog.style.getPaddingBox(a),e=goog.style.getBorderBox(a);c.pixelWidth=b.width-e.left-d.left-d.right-e.right;c.pixelHeight=b.height-e.top-d.top-d.bottom-e.bottom}else c.pixelWidth=b.width,c.pixelHeight=b.height};
goog.style.getContentBoxSize=function(a){var b=goog.dom.getOwnerDocument(a),c=goog.userAgent.IE&&a.currentStyle;if(c&&goog.dom.getDomHelper(b).isCss1CompatMode()&&"auto"!=c.width&&"auto"!=c.height&&!c.boxSizing)return b=goog.style.getIePixelValue_(a,c.width,"width","pixelWidth"),a=goog.style.getIePixelValue_(a,c.height,"height","pixelHeight"),new goog.math.Size(b,a);c=goog.style.getBorderBoxSize(a);b=goog.style.getPaddingBox(a);a=goog.style.getBorderBox(a);return new goog.math.Size(c.width-a.left-
b.left-b.right-a.right,c.height-a.top-b.top-b.bottom-a.bottom)};
goog.style.setContentBoxSize=function(a,b){var c=goog.dom.getOwnerDocument(a),d=goog.dom.getDomHelper(c).isCss1CompatMode();if(!goog.userAgent.IE||d&&goog.userAgent.isVersionOrHigher("8"))goog.style.setBoxSizingSize_(a,b,"content-box");else if(c=a.style,d)c.pixelWidth=b.width,c.pixelHeight=b.height;else{var d=goog.style.getPaddingBox(a),e=goog.style.getBorderBox(a);c.pixelWidth=b.width+e.left+d.left+d.right+e.right;c.pixelHeight=b.height+e.top+d.top+d.bottom+e.bottom}};
goog.style.setBoxSizingSize_=function(a,b,c){a=a.style;goog.userAgent.GECKO?a.MozBoxSizing=c:goog.userAgent.WEBKIT?a.WebkitBoxSizing=c:a.boxSizing=c;a.width=Math.max(b.width,0)+"px";a.height=Math.max(b.height,0)+"px"};goog.style.getIePixelValue_=function(a,b,c,d){if(/^\d+px?$/.test(b))return parseInt(b,10);var e=a.style[c],f=a.runtimeStyle[c];a.runtimeStyle[c]=a.currentStyle[c];a.style[c]=b;b=a.style[d];a.style[c]=e;a.runtimeStyle[c]=f;return b};
goog.style.getIePixelDistance_=function(a,b){var c=goog.style.getCascadedStyle(a,b);return c?goog.style.getIePixelValue_(a,c,"left","pixelLeft"):0};
goog.style.getBox_=function(a,b){if(goog.userAgent.IE){var c=goog.style.getIePixelDistance_(a,b+"Left"),d=goog.style.getIePixelDistance_(a,b+"Right"),e=goog.style.getIePixelDistance_(a,b+"Top"),f=goog.style.getIePixelDistance_(a,b+"Bottom");return new goog.math.Box(e,d,f,c)}c=goog.style.getComputedStyle(a,b+"Left");d=goog.style.getComputedStyle(a,b+"Right");e=goog.style.getComputedStyle(a,b+"Top");f=goog.style.getComputedStyle(a,b+"Bottom");return new goog.math.Box(parseFloat(e),parseFloat(d),parseFloat(f),
parseFloat(c))};goog.style.getPaddingBox=function(a){return goog.style.getBox_(a,"padding")};goog.style.getMarginBox=function(a){return goog.style.getBox_(a,"margin")};goog.style.ieBorderWidthKeywords_={thin:2,medium:4,thick:6};
goog.style.getIePixelBorder_=function(a,b){if("none"==goog.style.getCascadedStyle(a,b+"Style"))return 0;var c=goog.style.getCascadedStyle(a,b+"Width");return c in goog.style.ieBorderWidthKeywords_?goog.style.ieBorderWidthKeywords_[c]:goog.style.getIePixelValue_(a,c,"left","pixelLeft")};
goog.style.getBorderBox=function(a){if(goog.userAgent.IE&&!goog.userAgent.isDocumentModeOrHigher(9)){var b=goog.style.getIePixelBorder_(a,"borderLeft"),c=goog.style.getIePixelBorder_(a,"borderRight"),d=goog.style.getIePixelBorder_(a,"borderTop");a=goog.style.getIePixelBorder_(a,"borderBottom");return new goog.math.Box(d,c,a,b)}b=goog.style.getComputedStyle(a,"borderLeftWidth");c=goog.style.getComputedStyle(a,"borderRightWidth");d=goog.style.getComputedStyle(a,"borderTopWidth");a=goog.style.getComputedStyle(a,
"borderBottomWidth");return new goog.math.Box(parseFloat(d),parseFloat(c),parseFloat(a),parseFloat(b))};goog.style.getFontFamily=function(a){var b=goog.dom.getOwnerDocument(a),c="";if(b.body.createTextRange){b=b.body.createTextRange();b.moveToElementText(a);try{c=b.queryCommandValue("FontName")}catch(d){c=""}}c||(c=goog.style.getStyle_(a,"fontFamily"));a=c.split(",");1<a.length&&(c=a[0]);return goog.string.stripQuotes(c,"\"'")};goog.style.lengthUnitRegex_=/[^\d]+$/;
goog.style.getLengthUnits=function(a){return(a=a.match(goog.style.lengthUnitRegex_))&&a[0]||null};goog.style.ABSOLUTE_CSS_LENGTH_UNITS_={cm:1,"in":1,mm:1,pc:1,pt:1};goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_={em:1,ex:1};
goog.style.getFontSize=function(a){var b=goog.style.getStyle_(a,"fontSize"),c=goog.style.getLengthUnits(b);if(b&&"px"==c)return parseInt(b,10);if(goog.userAgent.IE){if(c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_)return goog.style.getIePixelValue_(a,b,"left","pixelLeft");if(a.parentNode&&a.parentNode.nodeType==goog.dom.NodeType.ELEMENT&&c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_)return a=a.parentNode,c=goog.style.getStyle_(a,"fontSize"),goog.style.getIePixelValue_(a,b==c?"1em":b,"left","pixelLeft")}c=
goog.dom.createDom("span",{style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});goog.dom.appendChild(a,c);b=c.offsetHeight;goog.dom.removeNode(c);return b};goog.style.parseStyleAttribute=function(a){var b={};goog.array.forEach(a.split(/\s*;\s*/),function(a){a=a.split(/\s*:\s*/);2==a.length&&(b[goog.string.toCamelCase(a[0].toLowerCase())]=a[1])});return b};
goog.style.toStyleAttribute=function(a){var b=[];goog.object.forEach(a,function(a,d){b.push(goog.string.toSelectorCase(d),":",a,";")});return b.join("")};goog.style.setFloat=function(a,b){a.style[goog.userAgent.IE?"styleFloat":"cssFloat"]=b};goog.style.getFloat=function(a){return a.style[goog.userAgent.IE?"styleFloat":"cssFloat"]||""};
goog.style.getScrollbarWidth=function(a){var b=goog.dom.createElement("div");a&&(b.className=a);b.style.cssText="overflow:auto;position:absolute;top:0;width:100px;height:100px";a=goog.dom.createElement("div");goog.style.setSize(a,"200px","200px");b.appendChild(a);goog.dom.appendChild(goog.dom.getDocument().body,b);a=b.offsetWidth-b.clientWidth;goog.dom.removeNode(b);return a};goog.style.MATRIX_TRANSLATION_REGEX_=/matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation=function(a){a=goog.style.getComputedTransform(a);return a?(a=a.match(goog.style.MATRIX_TRANSLATION_REGEX_))?new goog.math.Coordinate(parseFloat(a[1]),parseFloat(a[2])):new goog.math.Coordinate(0,0):new goog.math.Coordinate(0,0)};goog.events.EventHandler=function(a){goog.Disposable.call(this);this.handler_=a;this.keys_={}};goog.inherits(goog.events.EventHandler,goog.Disposable);goog.events.EventHandler.typeArray_=[];goog.events.EventHandler.prototype.listen=function(a,b,c,d){return this.listen_(a,b,c,d)};goog.events.EventHandler.prototype.listenWithScope=function(a,b,c,d,e){return this.listen_(a,b,c,d,e)};
goog.events.EventHandler.prototype.listen_=function(a,b,c,d,e){goog.isArray(b)||(b&&(goog.events.EventHandler.typeArray_[0]=b.toString()),b=goog.events.EventHandler.typeArray_);for(var f=0;f<b.length;f++){var g=goog.events.listen(a,b[f],c||this.handleEvent,d||!1,e||this.handler_||this);if(!g)break;this.keys_[g.key]=g}return this};goog.events.EventHandler.prototype.listenOnce=function(a,b,c,d){return this.listenOnce_(a,b,c,d)};
goog.events.EventHandler.prototype.listenOnceWithScope=function(a,b,c,d,e){return this.listenOnce_(a,b,c,d,e)};goog.events.EventHandler.prototype.listenOnce_=function(a,b,c,d,e){if(goog.isArray(b))for(var f=0;f<b.length;f++)this.listenOnce_(a,b[f],c,d,e);else{a=goog.events.listenOnce(a,b,c||this.handleEvent,d,e||this.handler_||this);if(!a)return this;this.keys_[a.key]=a}return this};goog.events.EventHandler.prototype.listenWithWrapper=function(a,b,c,d){return this.listenWithWrapper_(a,b,c,d)};
goog.events.EventHandler.prototype.listenWithWrapperAndScope=function(a,b,c,d,e){return this.listenWithWrapper_(a,b,c,d,e)};goog.events.EventHandler.prototype.listenWithWrapper_=function(a,b,c,d,e){b.listen(a,c,d,e||this.handler_||this,this);return this};goog.events.EventHandler.prototype.getListenerCount=function(){var a=0,b;for(b in this.keys_)Object.prototype.hasOwnProperty.call(this.keys_,b)&&a++;return a};
goog.events.EventHandler.prototype.unlisten=function(a,b,c,d,e){if(goog.isArray(b))for(var f=0;f<b.length;f++)this.unlisten(a,b[f],c,d,e);else if(a=goog.events.getListener(a,b,c||this.handleEvent,d,e||this.handler_||this))goog.events.unlistenByKey(a),delete this.keys_[a.key];return this};goog.events.EventHandler.prototype.unlistenWithWrapper=function(a,b,c,d,e){b.unlisten(a,c,d,e||this.handler_||this,this);return this};
goog.events.EventHandler.prototype.removeAll=function(){goog.object.forEach(this.keys_,goog.events.unlistenByKey);this.keys_={}};goog.events.EventHandler.prototype.disposeInternal=function(){goog.events.EventHandler.superClass_.disposeInternal.call(this);this.removeAll()};goog.events.EventHandler.prototype.handleEvent=function(a){throw Error("EventHandler.handleEvent not implemented");};goog.ui={};goog.ui.IdGenerator=function(){};goog.addSingletonGetter(goog.ui.IdGenerator);goog.ui.IdGenerator.prototype.nextId_=0;goog.ui.IdGenerator.prototype.getNextUniqueId=function(){return":"+(this.nextId_++).toString(36)};goog.ui.Component=function(a){goog.events.EventTarget.call(this);this.dom_=a||goog.dom.getDomHelper();this.rightToLeft_=goog.ui.Component.defaultRightToLeft_};goog.inherits(goog.ui.Component,goog.events.EventTarget);goog.ui.Component.ALLOW_DETACHED_DECORATION=!1;goog.ui.Component.prototype.idGenerator_=goog.ui.IdGenerator.getInstance();goog.ui.Component.DEFAULT_BIDI_DIR=0;goog.ui.Component.defaultRightToLeft_=1==goog.ui.Component.DEFAULT_BIDI_DIR?!1:-1==goog.ui.Component.DEFAULT_BIDI_DIR?!0:null;
goog.ui.Component.EventType={BEFORE_SHOW:"beforeshow",SHOW:"show",HIDE:"hide",DISABLE:"disable",ENABLE:"enable",HIGHLIGHT:"highlight",UNHIGHLIGHT:"unhighlight",ACTIVATE:"activate",DEACTIVATE:"deactivate",SELECT:"select",UNSELECT:"unselect",CHECK:"check",UNCHECK:"uncheck",FOCUS:"focus",BLUR:"blur",OPEN:"open",CLOSE:"close",ENTER:"enter",LEAVE:"leave",ACTION:"action",CHANGE:"change"};
goog.ui.Component.Error={NOT_SUPPORTED:"Method not supported",DECORATE_INVALID:"Invalid element to decorate",ALREADY_RENDERED:"Component already rendered",PARENT_UNABLE_TO_BE_SET:"Unable to set parent component",CHILD_INDEX_OUT_OF_BOUNDS:"Child component index out of bounds",NOT_OUR_CHILD:"Child is not in parent component",NOT_IN_DOCUMENT:"Operation not supported while component is not in document",STATE_INVALID:"Invalid component state"};
goog.ui.Component.State={ALL:255,DISABLED:1,HOVER:2,ACTIVE:4,SELECTED:8,CHECKED:16,FOCUSED:32,OPENED:64};
goog.ui.Component.getStateTransitionEvent=function(a,b){switch(a){case goog.ui.Component.State.DISABLED:return b?goog.ui.Component.EventType.DISABLE:goog.ui.Component.EventType.ENABLE;case goog.ui.Component.State.HOVER:return b?goog.ui.Component.EventType.HIGHLIGHT:goog.ui.Component.EventType.UNHIGHLIGHT;case goog.ui.Component.State.ACTIVE:return b?goog.ui.Component.EventType.ACTIVATE:goog.ui.Component.EventType.DEACTIVATE;case goog.ui.Component.State.SELECTED:return b?goog.ui.Component.EventType.SELECT:
goog.ui.Component.EventType.UNSELECT;case goog.ui.Component.State.CHECKED:return b?goog.ui.Component.EventType.CHECK:goog.ui.Component.EventType.UNCHECK;case goog.ui.Component.State.FOCUSED:return b?goog.ui.Component.EventType.FOCUS:goog.ui.Component.EventType.BLUR;case goog.ui.Component.State.OPENED:return b?goog.ui.Component.EventType.OPEN:goog.ui.Component.EventType.CLOSE}throw Error(goog.ui.Component.Error.STATE_INVALID);};
goog.ui.Component.setDefaultRightToLeft=function(a){goog.ui.Component.defaultRightToLeft_=a};goog.ui.Component.prototype.id_=null;goog.ui.Component.prototype.inDocument_=!1;goog.ui.Component.prototype.element_=null;goog.ui.Component.prototype.rightToLeft_=null;goog.ui.Component.prototype.model_=null;goog.ui.Component.prototype.parent_=null;goog.ui.Component.prototype.children_=null;goog.ui.Component.prototype.childIndex_=null;goog.ui.Component.prototype.wasDecorated_=!1;
goog.ui.Component.prototype.getId=function(){return this.id_||(this.id_=this.idGenerator_.getNextUniqueId())};goog.ui.Component.prototype.setId=function(a){this.parent_&&this.parent_.childIndex_&&(goog.object.remove(this.parent_.childIndex_,this.id_),goog.object.add(this.parent_.childIndex_,a,this));this.id_=a};goog.ui.Component.prototype.getElement=function(){return this.element_};
goog.ui.Component.prototype.getElementStrict=function(){var a=this.element_;goog.asserts.assert(a,"Can not call getElementStrict before rendering/decorating.");return a};goog.ui.Component.prototype.setElementInternal=function(a){this.element_=a};goog.ui.Component.prototype.getElementsByClass=function(a){return this.element_?this.dom_.getElementsByClass(a,this.element_):[]};goog.ui.Component.prototype.getElementByClass=function(a){return this.element_?this.dom_.getElementByClass(a,this.element_):null};
goog.ui.Component.prototype.getRequiredElementByClass=function(a){var b=this.getElementByClass(a);goog.asserts.assert(b,"Expected element in component with class: %s",a);return b};goog.ui.Component.prototype.getHandler=function(){this.googUiComponentHandler_||(this.googUiComponentHandler_=new goog.events.EventHandler(this));return this.googUiComponentHandler_};
goog.ui.Component.prototype.setParent=function(a){if(this==a)throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);if(a&&this.parent_&&this.id_&&this.parent_.getChild(this.id_)&&this.parent_!=a)throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);this.parent_=a;goog.ui.Component.superClass_.setParentEventTarget.call(this,a)};goog.ui.Component.prototype.getParent=function(){return this.parent_};
goog.ui.Component.prototype.setParentEventTarget=function(a){if(this.parent_&&this.parent_!=a)throw Error(goog.ui.Component.Error.NOT_SUPPORTED);goog.ui.Component.superClass_.setParentEventTarget.call(this,a)};goog.ui.Component.prototype.getDomHelper=function(){return this.dom_};goog.ui.Component.prototype.isInDocument=function(){return this.inDocument_};goog.ui.Component.prototype.createDom=function(){this.element_=this.dom_.createElement("div")};goog.ui.Component.prototype.render=function(a){this.render_(a)};
goog.ui.Component.prototype.renderBefore=function(a){this.render_(a.parentNode,a)};goog.ui.Component.prototype.render_=function(a,b){if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.element_||this.createDom();a?a.insertBefore(this.element_,b||null):this.dom_.getDocument().body.appendChild(this.element_);this.parent_&&!this.parent_.isInDocument()||this.enterDocument()};
goog.ui.Component.prototype.decorate=function(a){if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);if(a&&this.canDecorate(a)){this.wasDecorated_=!0;var b=goog.dom.getOwnerDocument(a);this.dom_&&this.dom_.getDocument()==b||(this.dom_=goog.dom.getDomHelper(a));this.decorateInternal(a);goog.ui.Component.ALLOW_DETACHED_DECORATION&&!goog.dom.contains(b,a)||this.enterDocument()}else throw Error(goog.ui.Component.Error.DECORATE_INVALID);};goog.ui.Component.prototype.canDecorate=function(a){return!0};
goog.ui.Component.prototype.wasDecorated=function(){return this.wasDecorated_};goog.ui.Component.prototype.decorateInternal=function(a){this.element_=a};goog.ui.Component.prototype.enterDocument=function(){this.inDocument_=!0;this.forEachChild(function(a){!a.isInDocument()&&a.getElement()&&a.enterDocument()})};
goog.ui.Component.prototype.exitDocument=function(){this.forEachChild(function(a){a.isInDocument()&&a.exitDocument()});this.googUiComponentHandler_&&this.googUiComponentHandler_.removeAll();this.inDocument_=!1};
goog.ui.Component.prototype.disposeInternal=function(){this.inDocument_&&this.exitDocument();this.googUiComponentHandler_&&(this.googUiComponentHandler_.dispose(),delete this.googUiComponentHandler_);this.forEachChild(function(a){a.dispose()});!this.wasDecorated_&&this.element_&&goog.dom.removeNode(this.element_);this.parent_=this.model_=this.element_=this.childIndex_=this.children_=null;goog.ui.Component.superClass_.disposeInternal.call(this)};
goog.ui.Component.prototype.makeId=function(a){return this.getId()+"."+a};goog.ui.Component.prototype.makeIds=function(a){var b={},c;for(c in a)b[c]=this.makeId(a[c]);return b};goog.ui.Component.prototype.getModel=function(){return this.model_};goog.ui.Component.prototype.setModel=function(a){this.model_=a};goog.ui.Component.prototype.getFragmentFromId=function(a){return a.substring(this.getId().length+1)};
goog.ui.Component.prototype.getElementByFragment=function(a){if(!this.inDocument_)throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);return this.dom_.getElement(this.makeId(a))};goog.ui.Component.prototype.addChild=function(a,b){this.addChildAt(a,this.getChildCount(),b)};
goog.ui.Component.prototype.addChildAt=function(a,b,c){goog.asserts.assert(!!a,"Provided element must not be null.");if(a.inDocument_&&(c||!this.inDocument_))throw Error(goog.ui.Component.Error.ALREADY_RENDERED);if(0>b||b>this.getChildCount())throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);this.childIndex_&&this.children_||(this.childIndex_={},this.children_=[]);a.getParent()==this?(goog.object.set(this.childIndex_,a.getId(),a),goog.array.remove(this.children_,a)):goog.object.add(this.childIndex_,
a.getId(),a);a.setParent(this);goog.array.insertAt(this.children_,a,b);a.inDocument_&&this.inDocument_&&a.getParent()==this?(c=this.getContentElement(),c.insertBefore(a.getElement(),c.childNodes[b]||null)):c?(this.element_||this.createDom(),b=this.getChildAt(b+1),a.render_(this.getContentElement(),b?b.element_:null)):this.inDocument_&&!a.inDocument_&&a.element_&&a.element_.parentNode&&a.element_.parentNode.nodeType==goog.dom.NodeType.ELEMENT&&a.enterDocument()};
goog.ui.Component.prototype.getContentElement=function(){return this.element_};goog.ui.Component.prototype.isRightToLeft=function(){null==this.rightToLeft_&&(this.rightToLeft_=goog.style.isRightToLeft(this.inDocument_?this.element_:this.dom_.getDocument().body));return this.rightToLeft_};goog.ui.Component.prototype.setRightToLeft=function(a){if(this.inDocument_)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.rightToLeft_=a};
goog.ui.Component.prototype.hasChildren=function(){return!!this.children_&&0!=this.children_.length};goog.ui.Component.prototype.getChildCount=function(){return this.children_?this.children_.length:0};goog.ui.Component.prototype.getChildIds=function(){var a=[];this.forEachChild(function(b){a.push(b.getId())});return a};goog.ui.Component.prototype.getChild=function(a){return this.childIndex_&&a?goog.object.get(this.childIndex_,a)||null:null};
goog.ui.Component.prototype.getChildAt=function(a){return this.children_?this.children_[a]||null:null};goog.ui.Component.prototype.forEachChild=function(a,b){this.children_&&goog.array.forEach(this.children_,a,b)};goog.ui.Component.prototype.indexOfChild=function(a){return this.children_&&a?goog.array.indexOf(this.children_,a):-1};
goog.ui.Component.prototype.removeChild=function(a,b){if(a){var c=goog.isString(a)?a:a.getId();a=this.getChild(c);c&&a&&(goog.object.remove(this.childIndex_,c),goog.array.remove(this.children_,a),b&&(a.exitDocument(),a.element_&&goog.dom.removeNode(a.element_)),a.setParent(null))}if(!a)throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);return a};goog.ui.Component.prototype.removeChildAt=function(a,b){return this.removeChild(this.getChildAt(a),b)};
goog.ui.Component.prototype.removeChildren=function(a){for(var b=[];this.hasChildren();)b.push(this.removeChildAt(0,a));return b};goog.a11y={};goog.a11y.aria={};
goog.a11y.aria.Role={ALERT:"alert",ALERTDIALOG:"alertdialog",APPLICATION:"application",ARTICLE:"article",BANNER:"banner",BUTTON:"button",CHECKBOX:"checkbox",COLUMNHEADER:"columnheader",COMBOBOX:"combobox",COMPLEMENTARY:"complementary",CONTENTINFO:"contentinfo",DEFINITION:"definition",DIALOG:"dialog",DIRECTORY:"directory",DOCUMENT:"document",FORM:"form",GRID:"grid",GRIDCELL:"gridcell",GROUP:"group",HEADING:"heading",IMG:"img",LINK:"link",LIST:"list",LISTBOX:"listbox",LISTITEM:"listitem",LOG:"log",
MAIN:"main",MARQUEE:"marquee",MATH:"math",MENU:"menu",MENUBAR:"menubar",MENU_ITEM:"menuitem",MENU_ITEM_CHECKBOX:"menuitemcheckbox",MENU_ITEM_RADIO:"menuitemradio",NAVIGATION:"navigation",NOTE:"note",OPTION:"option",PRESENTATION:"presentation",PROGRESSBAR:"progressbar",RADIO:"radio",RADIOGROUP:"radiogroup",REGION:"region",ROW:"row",ROWGROUP:"rowgroup",ROWHEADER:"rowheader",SCROLLBAR:"scrollbar",SEARCH:"search",SEPARATOR:"separator",SLIDER:"slider",SPINBUTTON:"spinbutton",STATUS:"status",TAB:"tab",
TAB_LIST:"tablist",TAB_PANEL:"tabpanel",TEXTBOX:"textbox",TIMER:"timer",TOOLBAR:"toolbar",TOOLTIP:"tooltip",TREE:"tree",TREEGRID:"treegrid",TREEITEM:"treeitem"};goog.a11y.aria.State={ACTIVEDESCENDANT:"activedescendant",ATOMIC:"atomic",AUTOCOMPLETE:"autocomplete",BUSY:"busy",CHECKED:"checked",CONTROLS:"controls",DESCRIBEDBY:"describedby",DISABLED:"disabled",DROPEFFECT:"dropeffect",EXPANDED:"expanded",FLOWTO:"flowto",GRABBED:"grabbed",HASPOPUP:"haspopup",HIDDEN:"hidden",INVALID:"invalid",LABEL:"label",LABELLEDBY:"labelledby",LEVEL:"level",LIVE:"live",MULTILINE:"multiline",MULTISELECTABLE:"multiselectable",ORIENTATION:"orientation",OWNS:"owns",POSINSET:"posinset",
PRESSED:"pressed",READONLY:"readonly",RELEVANT:"relevant",REQUIRED:"required",SELECTED:"selected",SETSIZE:"setsize",SORT:"sort",VALUEMAX:"valuemax",VALUEMIN:"valuemin",VALUENOW:"valuenow",VALUETEXT:"valuetext"};goog.a11y.aria.AutoCompleteValues={INLINE:"inline",LIST:"list",BOTH:"both",NONE:"none"};goog.a11y.aria.DropEffectValues={COPY:"copy",MOVE:"move",LINK:"link",EXECUTE:"execute",POPUP:"popup",NONE:"none"};goog.a11y.aria.LivePriority={OFF:"off",POLITE:"polite",ASSERTIVE:"assertive"};
goog.a11y.aria.OrientationValues={VERTICAL:"vertical",HORIZONTAL:"horizontal"};goog.a11y.aria.RelevantValues={ADDITIONS:"additions",REMOVALS:"removals",TEXT:"text",ALL:"all"};goog.a11y.aria.SortValues={ASCENDING:"ascending",DESCENDING:"descending",NONE:"none",OTHER:"other"};goog.a11y.aria.CheckedValues={TRUE:"true",FALSE:"false",MIXED:"mixed",UNDEFINED:"undefined"};goog.a11y.aria.ExpandedValues={TRUE:"true",FALSE:"false",UNDEFINED:"undefined"};
goog.a11y.aria.GrabbedValues={TRUE:"true",FALSE:"false",UNDEFINED:"undefined"};goog.a11y.aria.InvalidValues={FALSE:"false",TRUE:"true",GRAMMAR:"grammar",SPELLING:"spelling"};goog.a11y.aria.PressedValues={TRUE:"true",FALSE:"false",MIXED:"mixed",UNDEFINED:"undefined"};goog.a11y.aria.SelectedValues={TRUE:"true",FALSE:"false",UNDEFINED:"undefined"};goog.a11y.aria.datatables={};
goog.a11y.aria.datatables.getDefaultValuesMap=function(){goog.a11y.aria.DefaultStateValueMap_||(goog.a11y.aria.DefaultStateValueMap_=goog.object.create(goog.a11y.aria.State.ATOMIC,!1,goog.a11y.aria.State.AUTOCOMPLETE,"none",goog.a11y.aria.State.DROPEFFECT,"none",goog.a11y.aria.State.HASPOPUP,!1,goog.a11y.aria.State.LIVE,"off",goog.a11y.aria.State.MULTILINE,!1,goog.a11y.aria.State.MULTISELECTABLE,!1,goog.a11y.aria.State.ORIENTATION,"vertical",goog.a11y.aria.State.READONLY,!1,goog.a11y.aria.State.RELEVANT,
"additions text",goog.a11y.aria.State.REQUIRED,!1,goog.a11y.aria.State.SORT,"none",goog.a11y.aria.State.BUSY,!1,goog.a11y.aria.State.DISABLED,!1,goog.a11y.aria.State.HIDDEN,!1,goog.a11y.aria.State.INVALID,"false"));return goog.a11y.aria.DefaultStateValueMap_};goog.a11y.aria.ARIA_PREFIX_="aria-";goog.a11y.aria.ROLE_ATTRIBUTE_="role";goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_=[goog.dom.TagName.A,goog.dom.TagName.AREA,goog.dom.TagName.BUTTON,goog.dom.TagName.HEAD,goog.dom.TagName.INPUT,goog.dom.TagName.LINK,goog.dom.TagName.MENU,goog.dom.TagName.META,goog.dom.TagName.OPTGROUP,goog.dom.TagName.OPTION,goog.dom.TagName.PROGRESS,goog.dom.TagName.STYLE,goog.dom.TagName.SELECT,goog.dom.TagName.SOURCE,goog.dom.TagName.TEXTAREA,goog.dom.TagName.TITLE,goog.dom.TagName.TRACK];
goog.a11y.aria.setRole=function(a,b){b?(goog.asserts.ENABLE_ASSERTS&&goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.Role,b),"No such ARIA role "+b),a.setAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_,b)):goog.a11y.aria.removeRole(a)};goog.a11y.aria.getRole=function(a){return a.getAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_)||null};goog.a11y.aria.removeRole=function(a){a.removeAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_)};
goog.a11y.aria.setState=function(a,b,c){goog.isArrayLike(c)&&(c=c.join(" "));var d=goog.a11y.aria.getAriaAttributeName_(b);""===c||void 0==c?(c=goog.a11y.aria.datatables.getDefaultValuesMap(),b in c?a.setAttribute(d,c[b]):a.removeAttribute(d)):a.setAttribute(d,c)};goog.a11y.aria.removeState=function(a,b){a.removeAttribute(goog.a11y.aria.getAriaAttributeName_(b))};goog.a11y.aria.getState=function(a,b){var c=a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));return null==c||void 0==c?"":String(c)};
goog.a11y.aria.getActiveDescendant=function(a){var b=goog.a11y.aria.getState(a,goog.a11y.aria.State.ACTIVEDESCENDANT);return goog.dom.getOwnerDocument(a).getElementById(b)};goog.a11y.aria.setActiveDescendant=function(a,b){var c="";b&&(c=b.id,goog.asserts.assert(c,"The active element should have an id."));goog.a11y.aria.setState(a,goog.a11y.aria.State.ACTIVEDESCENDANT,c)};goog.a11y.aria.getLabel=function(a){return goog.a11y.aria.getState(a,goog.a11y.aria.State.LABEL)};
goog.a11y.aria.setLabel=function(a,b){goog.a11y.aria.setState(a,goog.a11y.aria.State.LABEL,b)};goog.a11y.aria.assertRoleIsSetInternalUtil=function(a,b){if(!goog.array.contains(goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_,a.tagName)){var c=goog.a11y.aria.getRole(a);goog.asserts.assert(null!=c,"The element ARIA role cannot be null.");goog.asserts.assert(goog.array.contains(b,c),'Non existing or incorrect role set for element.The role set is "'+c+'". The role should be any of "'+b+'". Check the ARIA specification for more details http://www.w3.org/TR/wai-aria/roles.')}};
goog.a11y.aria.getStateBoolean=function(a,b){var c=a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));goog.asserts.assert(goog.isBoolean(c)||null==c||"true"==c||"false"==c);return null==c?c:goog.isBoolean(c)?c:"true"==c};goog.a11y.aria.getStateNumber=function(a,b){var c=a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));goog.asserts.assert((null==c||!isNaN(Number(c)))&&!goog.isBoolean(c));return null==c?null:Number(c)};
goog.a11y.aria.getStateString=function(a,b){var c=a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));goog.asserts.assert((null==c||goog.isString(c))&&isNaN(Number(c))&&"true"!=c&&"false"!=c);return null==c?null:c};goog.a11y.aria.getStringArrayStateInternalUtil=function(a,b){var c=a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));return goog.a11y.aria.splitStringOnWhitespace_(c)};goog.a11y.aria.splitStringOnWhitespace_=function(a){return a?a.split(/\s+/):[]};
goog.a11y.aria.getAriaAttributeName_=function(a){goog.asserts.ENABLE_ASSERTS&&(goog.asserts.assert(a,"ARIA attribute cannot be empty."),goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.State,a),"No such ARIA attribute "+a));return goog.a11y.aria.ARIA_PREFIX_+a};goog.events.KeyCodes={WIN_KEY_FF_LINUX:0,MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,FF_SEMICOLON:59,FF_EQUALS:61,FF_DASH:173,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,
V:86,W:87,X:88,Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SCROLL_LOCK:145,FIRST_MEDIA_KEY:166,LAST_MEDIA_KEY:183,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,
TILDE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,MAC_FF_META:224,MAC_WK_CMD_LEFT:91,MAC_WK_CMD_RIGHT:93,WIN_IME:229,PHANTOM:255};
goog.events.KeyCodes.isTextModifyingKeyEvent=function(a){if(a.altKey&&!a.ctrlKey||a.metaKey||a.keyCode>=goog.events.KeyCodes.F1&&a.keyCode<=goog.events.KeyCodes.F12)return!1;switch(a.keyCode){case goog.events.KeyCodes.ALT:case goog.events.KeyCodes.CAPS_LOCK:case goog.events.KeyCodes.CONTEXT_MENU:case goog.events.KeyCodes.CTRL:case goog.events.KeyCodes.DOWN:case goog.events.KeyCodes.END:case goog.events.KeyCodes.ESC:case goog.events.KeyCodes.HOME:case goog.events.KeyCodes.INSERT:case goog.events.KeyCodes.LEFT:case goog.events.KeyCodes.MAC_FF_META:case goog.events.KeyCodes.META:case goog.events.KeyCodes.NUMLOCK:case goog.events.KeyCodes.NUM_CENTER:case goog.events.KeyCodes.PAGE_DOWN:case goog.events.KeyCodes.PAGE_UP:case goog.events.KeyCodes.PAUSE:case goog.events.KeyCodes.PHANTOM:case goog.events.KeyCodes.PRINT_SCREEN:case goog.events.KeyCodes.RIGHT:case goog.events.KeyCodes.SCROLL_LOCK:case goog.events.KeyCodes.SHIFT:case goog.events.KeyCodes.UP:case goog.events.KeyCodes.WIN_KEY:case goog.events.KeyCodes.WIN_KEY_RIGHT:return!1;case goog.events.KeyCodes.WIN_KEY_FF_LINUX:return!goog.userAgent.GECKO;
default:return a.keyCode<goog.events.KeyCodes.FIRST_MEDIA_KEY||a.keyCode>goog.events.KeyCodes.LAST_MEDIA_KEY}};
goog.events.KeyCodes.firesKeyPressEvent=function(a,b,c,d,e){if(!(goog.userAgent.IE||goog.userAgent.WEBKIT&&goog.userAgent.isVersionOrHigher("525")))return!0;if(goog.userAgent.MAC&&e)return goog.events.KeyCodes.isCharacterKey(a);if(e&&!d)return!1;goog.isNumber(b)&&(b=goog.events.KeyCodes.normalizeKeyCode(b));if(!c&&(b==goog.events.KeyCodes.CTRL||b==goog.events.KeyCodes.ALT||goog.userAgent.MAC&&b==goog.events.KeyCodes.META))return!1;if(goog.userAgent.WEBKIT&&d&&c)switch(a){case goog.events.KeyCodes.BACKSLASH:case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:case goog.events.KeyCodes.TILDE:case goog.events.KeyCodes.SEMICOLON:case goog.events.KeyCodes.DASH:case goog.events.KeyCodes.EQUALS:case goog.events.KeyCodes.COMMA:case goog.events.KeyCodes.PERIOD:case goog.events.KeyCodes.SLASH:case goog.events.KeyCodes.APOSTROPHE:case goog.events.KeyCodes.SINGLE_QUOTE:return!1}if(goog.userAgent.IE&&
d&&b==a)return!1;switch(a){case goog.events.KeyCodes.ENTER:return!(goog.userAgent.IE&&goog.userAgent.isDocumentModeOrHigher(9));case goog.events.KeyCodes.ESC:return!goog.userAgent.WEBKIT}return goog.events.KeyCodes.isCharacterKey(a)};
goog.events.KeyCodes.isCharacterKey=function(a){if(a>=goog.events.KeyCodes.ZERO&&a<=goog.events.KeyCodes.NINE||a>=goog.events.KeyCodes.NUM_ZERO&&a<=goog.events.KeyCodes.NUM_MULTIPLY||a>=goog.events.KeyCodes.A&&a<=goog.events.KeyCodes.Z||goog.userAgent.WEBKIT&&0==a)return!0;switch(a){case goog.events.KeyCodes.SPACE:case goog.events.KeyCodes.QUESTION_MARK:case goog.events.KeyCodes.NUM_PLUS:case goog.events.KeyCodes.NUM_MINUS:case goog.events.KeyCodes.NUM_PERIOD:case goog.events.KeyCodes.NUM_DIVISION:case goog.events.KeyCodes.SEMICOLON:case goog.events.KeyCodes.FF_SEMICOLON:case goog.events.KeyCodes.DASH:case goog.events.KeyCodes.EQUALS:case goog.events.KeyCodes.FF_EQUALS:case goog.events.KeyCodes.COMMA:case goog.events.KeyCodes.PERIOD:case goog.events.KeyCodes.SLASH:case goog.events.KeyCodes.APOSTROPHE:case goog.events.KeyCodes.SINGLE_QUOTE:case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:case goog.events.KeyCodes.BACKSLASH:case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:return!0;
default:return!1}};goog.events.KeyCodes.normalizeKeyCode=function(a){return goog.userAgent.GECKO?goog.events.KeyCodes.normalizeGeckoKeyCode(a):goog.userAgent.MAC&&goog.userAgent.WEBKIT?goog.events.KeyCodes.normalizeMacWebKitKeyCode(a):a};
goog.events.KeyCodes.normalizeGeckoKeyCode=function(a){switch(a){case goog.events.KeyCodes.FF_EQUALS:return goog.events.KeyCodes.EQUALS;case goog.events.KeyCodes.FF_SEMICOLON:return goog.events.KeyCodes.SEMICOLON;case goog.events.KeyCodes.FF_DASH:return goog.events.KeyCodes.DASH;case goog.events.KeyCodes.MAC_FF_META:return goog.events.KeyCodes.META;case goog.events.KeyCodes.WIN_KEY_FF_LINUX:return goog.events.KeyCodes.WIN_KEY;default:return a}};
goog.events.KeyCodes.normalizeMacWebKitKeyCode=function(a){switch(a){case goog.events.KeyCodes.MAC_WK_CMD_RIGHT:return goog.events.KeyCodes.META;default:return a}};goog.events.KeyHandler=function(a,b){goog.events.EventTarget.call(this);a&&this.attach(a,b)};goog.inherits(goog.events.KeyHandler,goog.events.EventTarget);goog.events.KeyHandler.prototype.element_=null;goog.events.KeyHandler.prototype.keyPressKey_=null;goog.events.KeyHandler.prototype.keyDownKey_=null;goog.events.KeyHandler.prototype.keyUpKey_=null;goog.events.KeyHandler.prototype.lastKey_=-1;goog.events.KeyHandler.prototype.keyCode_=-1;goog.events.KeyHandler.prototype.altKey_=!1;
goog.events.KeyHandler.EventType={KEY:"key"};
goog.events.KeyHandler.safariKey_={3:goog.events.KeyCodes.ENTER,12:goog.events.KeyCodes.NUMLOCK,63232:goog.events.KeyCodes.UP,63233:goog.events.KeyCodes.DOWN,63234:goog.events.KeyCodes.LEFT,63235:goog.events.KeyCodes.RIGHT,63236:goog.events.KeyCodes.F1,63237:goog.events.KeyCodes.F2,63238:goog.events.KeyCodes.F3,63239:goog.events.KeyCodes.F4,63240:goog.events.KeyCodes.F5,63241:goog.events.KeyCodes.F6,63242:goog.events.KeyCodes.F7,63243:goog.events.KeyCodes.F8,63244:goog.events.KeyCodes.F9,63245:goog.events.KeyCodes.F10,
63246:goog.events.KeyCodes.F11,63247:goog.events.KeyCodes.F12,63248:goog.events.KeyCodes.PRINT_SCREEN,63272:goog.events.KeyCodes.DELETE,63273:goog.events.KeyCodes.HOME,63275:goog.events.KeyCodes.END,63276:goog.events.KeyCodes.PAGE_UP,63277:goog.events.KeyCodes.PAGE_DOWN,63289:goog.events.KeyCodes.NUMLOCK,63302:goog.events.KeyCodes.INSERT};
goog.events.KeyHandler.keyIdentifier_={Up:goog.events.KeyCodes.UP,Down:goog.events.KeyCodes.DOWN,Left:goog.events.KeyCodes.LEFT,Right:goog.events.KeyCodes.RIGHT,Enter:goog.events.KeyCodes.ENTER,F1:goog.events.KeyCodes.F1,F2:goog.events.KeyCodes.F2,F3:goog.events.KeyCodes.F3,F4:goog.events.KeyCodes.F4,F5:goog.events.KeyCodes.F5,F6:goog.events.KeyCodes.F6,F7:goog.events.KeyCodes.F7,F8:goog.events.KeyCodes.F8,F9:goog.events.KeyCodes.F9,F10:goog.events.KeyCodes.F10,F11:goog.events.KeyCodes.F11,F12:goog.events.KeyCodes.F12,
"U+007F":goog.events.KeyCodes.DELETE,Home:goog.events.KeyCodes.HOME,End:goog.events.KeyCodes.END,PageUp:goog.events.KeyCodes.PAGE_UP,PageDown:goog.events.KeyCodes.PAGE_DOWN,Insert:goog.events.KeyCodes.INSERT};goog.events.KeyHandler.USES_KEYDOWN_=goog.userAgent.IE||goog.userAgent.WEBKIT&&goog.userAgent.isVersionOrHigher("525");goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_=goog.userAgent.MAC&&goog.userAgent.GECKO;
goog.events.KeyHandler.prototype.handleKeyDown_=function(a){goog.userAgent.WEBKIT&&(this.lastKey_==goog.events.KeyCodes.CTRL&&!a.ctrlKey||this.lastKey_==goog.events.KeyCodes.ALT&&!a.altKey||goog.userAgent.MAC&&this.lastKey_==goog.events.KeyCodes.META&&!a.metaKey)&&(this.keyCode_=this.lastKey_=-1);-1==this.lastKey_&&(a.ctrlKey&&a.keyCode!=goog.events.KeyCodes.CTRL?this.lastKey_=goog.events.KeyCodes.CTRL:a.altKey&&a.keyCode!=goog.events.KeyCodes.ALT?this.lastKey_=goog.events.KeyCodes.ALT:a.metaKey&&
a.keyCode!=goog.events.KeyCodes.META&&(this.lastKey_=goog.events.KeyCodes.META));goog.events.KeyHandler.USES_KEYDOWN_&&!goog.events.KeyCodes.firesKeyPressEvent(a.keyCode,this.lastKey_,a.shiftKey,a.ctrlKey,a.altKey)?this.handleEvent(a):(this.keyCode_=goog.events.KeyCodes.normalizeKeyCode(a.keyCode),goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_&&(this.altKey_=a.altKey))};goog.events.KeyHandler.prototype.resetState=function(){this.keyCode_=this.lastKey_=-1};
goog.events.KeyHandler.prototype.handleKeyup_=function(a){this.resetState();this.altKey_=a.altKey};
goog.events.KeyHandler.prototype.handleEvent=function(a){var b=a.getBrowserEvent(),c,d,e=b.altKey;goog.userAgent.IE&&a.type==goog.events.EventType.KEYPRESS?(c=this.keyCode_,d=c!=goog.events.KeyCodes.ENTER&&c!=goog.events.KeyCodes.ESC?b.keyCode:0):goog.userAgent.WEBKIT&&a.type==goog.events.EventType.KEYPRESS?(c=this.keyCode_,d=0<=b.charCode&&63232>b.charCode&&goog.events.KeyCodes.isCharacterKey(c)?b.charCode:0):goog.userAgent.OPERA?(c=this.keyCode_,d=goog.events.KeyCodes.isCharacterKey(c)?b.keyCode:
0):(c=b.keyCode||this.keyCode_,d=b.charCode||0,goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_&&(e=this.altKey_),goog.userAgent.MAC&&d==goog.events.KeyCodes.QUESTION_MARK&&c==goog.events.KeyCodes.WIN_KEY&&(c=goog.events.KeyCodes.SLASH));var f=c=goog.events.KeyCodes.normalizeKeyCode(c),g=b.keyIdentifier;c?63232<=c&&c in goog.events.KeyHandler.safariKey_?f=goog.events.KeyHandler.safariKey_[c]:25==c&&a.shiftKey&&(f=9):g&&g in goog.events.KeyHandler.keyIdentifier_&&(f=goog.events.KeyHandler.keyIdentifier_[g]);
a=f==this.lastKey_;this.lastKey_=f;b=new goog.events.KeyEvent(f,d,a,b);b.altKey=e;this.dispatchEvent(b)};goog.events.KeyHandler.prototype.getElement=function(){return this.element_};
goog.events.KeyHandler.prototype.attach=function(a,b){this.keyUpKey_&&this.detach();this.element_=a;this.keyPressKey_=goog.events.listen(this.element_,goog.events.EventType.KEYPRESS,this,b);this.keyDownKey_=goog.events.listen(this.element_,goog.events.EventType.KEYDOWN,this.handleKeyDown_,b,this);this.keyUpKey_=goog.events.listen(this.element_,goog.events.EventType.KEYUP,this.handleKeyup_,b,this)};
goog.events.KeyHandler.prototype.detach=function(){this.keyPressKey_&&(goog.events.unlistenByKey(this.keyPressKey_),goog.events.unlistenByKey(this.keyDownKey_),goog.events.unlistenByKey(this.keyUpKey_),this.keyUpKey_=this.keyDownKey_=this.keyPressKey_=null);this.element_=null;this.keyCode_=this.lastKey_=-1};goog.events.KeyHandler.prototype.disposeInternal=function(){goog.events.KeyHandler.superClass_.disposeInternal.call(this);this.detach()};
goog.events.KeyEvent=function(a,b,c,d){goog.events.BrowserEvent.call(this,d);this.type=goog.events.KeyHandler.EventType.KEY;this.keyCode=a;this.charCode=b;this.repeat=c};goog.inherits(goog.events.KeyEvent,goog.events.BrowserEvent);goog.dom.classlist={};goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST=!1;goog.dom.classlist.get=function(a){if(goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST||a.classList)return a.classList;a=a.className;return goog.isString(a)&&a.match(/\S+/g)||[]};goog.dom.classlist.set=function(a,b){a.className=b};goog.dom.classlist.contains=function(a,b){return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST||a.classList?a.classList.contains(b):goog.array.contains(goog.dom.classlist.get(a),b)};
goog.dom.classlist.add=function(a,b){goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST||a.classList?a.classList.add(b):goog.dom.classlist.contains(a,b)||(a.className+=0<a.className.length?" "+b:b)};
goog.dom.classlist.addAll=function(a,b){if(goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST||a.classList)goog.array.forEach(b,function(b){goog.dom.classlist.add(a,b)});else{var c={};goog.array.forEach(goog.dom.classlist.get(a),function(a){c[a]=!0});goog.array.forEach(b,function(a){c[a]=!0});a.className="";for(var d in c)a.className+=0<a.className.length?" "+d:d}};
goog.dom.classlist.remove=function(a,b){goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST||a.classList?a.classList.remove(b):goog.dom.classlist.contains(a,b)&&(a.className=goog.array.filter(goog.dom.classlist.get(a),function(a){return a!=b}).join(" "))};
goog.dom.classlist.removeAll=function(a,b){goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST||a.classList?goog.array.forEach(b,function(b){goog.dom.classlist.remove(a,b)}):a.className=goog.array.filter(goog.dom.classlist.get(a),function(a){return!goog.array.contains(b,a)}).join(" ")};goog.dom.classlist.enable=function(a,b,c){c?goog.dom.classlist.add(a,b):goog.dom.classlist.remove(a,b)};goog.dom.classlist.enableAll=function(a,b,c){(c?goog.dom.classlist.addAll:goog.dom.classlist.removeAll)(a,b)};
goog.dom.classlist.swap=function(a,b,c){return goog.dom.classlist.contains(a,b)?(goog.dom.classlist.remove(a,b),goog.dom.classlist.add(a,c),!0):!1};goog.dom.classlist.toggle=function(a,b){var c=!goog.dom.classlist.contains(a,b);goog.dom.classlist.enable(a,b,c);return c};goog.dom.classlist.addRemove=function(a,b,c){goog.dom.classlist.remove(a,b);goog.dom.classlist.add(a,c)};goog.ui.registry={};goog.ui.registry.getDefaultRenderer=function(a){for(var b;a;){b=goog.getUid(a);if(b=goog.ui.registry.defaultRenderers_[b])break;a=a.superClass_?a.superClass_.constructor:null}return b?goog.isFunction(b.getInstance)?b.getInstance():new b:null};
goog.ui.registry.setDefaultRenderer=function(a,b){if(!goog.isFunction(a))throw Error("Invalid component class "+a);if(!goog.isFunction(b))throw Error("Invalid renderer class "+b);var c=goog.getUid(a);goog.ui.registry.defaultRenderers_[c]=b};goog.ui.registry.getDecoratorByClassName=function(a){return a in goog.ui.registry.decoratorFunctions_?goog.ui.registry.decoratorFunctions_[a]():null};
goog.ui.registry.setDecoratorByClassName=function(a,b){if(!a)throw Error("Invalid class name "+a);if(!goog.isFunction(b))throw Error("Invalid decorator function "+b);goog.ui.registry.decoratorFunctions_[a]=b};goog.ui.registry.getDecorator=function(a){goog.asserts.assert(a);for(var b=goog.dom.classlist.get(a),c=0,d=b.length;c<d;c++)if(a=goog.ui.registry.getDecoratorByClassName(b[c]))return a;return null};
goog.ui.registry.reset=function(){goog.ui.registry.defaultRenderers_={};goog.ui.registry.decoratorFunctions_={}};goog.ui.registry.defaultRenderers_={};goog.ui.registry.decoratorFunctions_={};goog.ui.ContainerRenderer=function(a){this.ariaRole_=a};goog.addSingletonGetter(goog.ui.ContainerRenderer);goog.ui.ContainerRenderer.getCustomRenderer=function(a,b){var c=new a;c.getCssClass=function(){return b};return c};goog.ui.ContainerRenderer.CSS_CLASS="goog-container";goog.ui.ContainerRenderer.prototype.getAriaRole=function(){return this.ariaRole_};goog.ui.ContainerRenderer.prototype.enableTabIndex=function(a,b){a&&(a.tabIndex=b?0:-1)};
goog.ui.ContainerRenderer.prototype.createDom=function(a){return a.getDomHelper().createDom("div",this.getClassNames(a).join(" "))};goog.ui.ContainerRenderer.prototype.getContentElement=function(a){return a};goog.ui.ContainerRenderer.prototype.canDecorate=function(a){return"DIV"==a.tagName};
goog.ui.ContainerRenderer.prototype.decorate=function(a,b){b.id&&a.setId(b.id);var c=this.getCssClass(),d=!1,e=goog.dom.classlist.get(b);e&&goog.array.forEach(e,function(b){b==c?d=!0:b&&this.setStateFromClassName(a,b,c)},this);d||goog.dom.classlist.add(b,c);this.decorateChildren(a,this.getContentElement(b));return b};
goog.ui.ContainerRenderer.prototype.setStateFromClassName=function(a,b,c){b==c+"-disabled"?a.setEnabled(!1):b==c+"-horizontal"?a.setOrientation(goog.ui.Container.Orientation.HORIZONTAL):b==c+"-vertical"&&a.setOrientation(goog.ui.Container.Orientation.VERTICAL)};
goog.ui.ContainerRenderer.prototype.decorateChildren=function(a,b,c){if(b){c=c||b.firstChild;for(var d;c&&c.parentNode==b;){d=c.nextSibling;if(c.nodeType==goog.dom.NodeType.ELEMENT){var e=this.getDecoratorForChild(c);e&&(e.setElementInternal(c),a.isEnabled()||e.setEnabled(!1),a.addChild(e),e.decorate(c))}else c.nodeValue&&""!=goog.string.trim(c.nodeValue)||b.removeChild(c);c=d}}};goog.ui.ContainerRenderer.prototype.getDecoratorForChild=function(a){return goog.ui.registry.getDecorator(a)};
goog.ui.ContainerRenderer.prototype.initializeDom=function(a){a=a.getElement();goog.asserts.assert(a,"The container DOM element cannot be null.");goog.style.setUnselectable(a,!0,goog.userAgent.GECKO);goog.userAgent.IE&&(a.hideFocus=!0);var b=this.getAriaRole();b&&goog.a11y.aria.setRole(a,b)};goog.ui.ContainerRenderer.prototype.getKeyEventTarget=function(a){return a.getElement()};goog.ui.ContainerRenderer.prototype.getCssClass=function(){return goog.ui.ContainerRenderer.CSS_CLASS};
goog.ui.ContainerRenderer.prototype.getClassNames=function(a){var b=this.getCssClass(),c=a.getOrientation()==goog.ui.Container.Orientation.HORIZONTAL,c=[b,c?b+"-horizontal":b+"-vertical"];a.isEnabled()||c.push(b+"-disabled");return c};goog.ui.ContainerRenderer.prototype.getDefaultOrientation=function(){return goog.ui.Container.Orientation.VERTICAL};goog.ui.ControlRenderer=function(){};goog.addSingletonGetter(goog.ui.ControlRenderer);goog.ui.ControlRenderer.getCustomRenderer=function(a,b){var c=new a;c.getCssClass=function(){return b};return c};goog.ui.ControlRenderer.CSS_CLASS="goog-control";goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS=[];
goog.ui.ControlRenderer.TOGGLE_ARIA_STATE_MAP_=goog.object.create(goog.a11y.aria.Role.BUTTON,goog.a11y.aria.State.PRESSED,goog.a11y.aria.Role.CHECKBOX,goog.a11y.aria.State.CHECKED,goog.a11y.aria.Role.MENU_ITEM,goog.a11y.aria.State.SELECTED,goog.a11y.aria.Role.MENU_ITEM_CHECKBOX,goog.a11y.aria.State.CHECKED,goog.a11y.aria.Role.MENU_ITEM_RADIO,goog.a11y.aria.State.CHECKED,goog.a11y.aria.Role.RADIO,goog.a11y.aria.State.CHECKED,goog.a11y.aria.Role.TAB,goog.a11y.aria.State.SELECTED,goog.a11y.aria.Role.TREEITEM,
goog.a11y.aria.State.SELECTED);goog.ui.ControlRenderer.prototype.getAriaRole=function(){};goog.ui.ControlRenderer.prototype.createDom=function(a){var b=a.getDomHelper().createDom("div",this.getClassNames(a).join(" "),a.getContent());this.setAriaStates(a,b);return b};goog.ui.ControlRenderer.prototype.getContentElement=function(a){return a};
goog.ui.ControlRenderer.prototype.enableClassName=function(a,b,c){if(a=a.getElement?a.getElement():a){var d=[b];goog.userAgent.IE&&!goog.userAgent.isVersionOrHigher("7")&&(d=this.getAppliedCombinedClassNames_(goog.dom.classlist.get(a),b),d.push(b));goog.dom.classlist.enableAll(a,d,c)}};goog.ui.ControlRenderer.prototype.enableExtraClassName=function(a,b,c){this.enableClassName(a,b,c)};goog.ui.ControlRenderer.prototype.canDecorate=function(a){return!0};
goog.ui.ControlRenderer.prototype.decorate=function(a,b){b.id&&a.setId(b.id);var c=this.getContentElement(b);c&&c.firstChild?a.setContentInternal(c.firstChild.nextSibling?goog.array.clone(c.childNodes):c.firstChild):a.setContentInternal(null);var d=0,e=this.getCssClass(),f=this.getStructuralCssClass(),g=!1,h=!1,c=!1,k=goog.array.toArray(goog.dom.classlist.get(b));goog.array.forEach(k,function(a){g||a!=e?h||a!=f?d|=this.getStateFromClass(a):h=!0:(g=!0,f==e&&(h=!0))},this);a.setStateInternal(d);g||
(k.push(e),f==e&&(h=!0));h||k.push(f);var l=a.getExtraClassNames();l&&k.push.apply(k,l);if(goog.userAgent.IE&&!goog.userAgent.isVersionOrHigher("7")){var p=this.getAppliedCombinedClassNames_(k);0<p.length&&(k.push.apply(k,p),c=!0)}g&&h&&!l&&!c||goog.dom.classlist.set(b,k.join(" "));this.setAriaStates(a,b);return b};goog.ui.ControlRenderer.prototype.initializeDom=function(a){a.isRightToLeft()&&this.setRightToLeft(a.getElement(),!0);a.isEnabled()&&this.setFocusable(a,a.isVisible())};
goog.ui.ControlRenderer.prototype.setAriaRole=function(a,b){var c=b||this.getAriaRole();if(c){goog.asserts.assert(a,"The element passed as a first parameter cannot be null.");var d=goog.a11y.aria.getRole(a);c!=d&&goog.a11y.aria.setRole(a,c)}};
goog.ui.ControlRenderer.prototype.setAriaStates=function(a,b){goog.asserts.assert(a);goog.asserts.assert(b);a.isVisible()||goog.a11y.aria.setState(b,goog.a11y.aria.State.HIDDEN,!a.isVisible());a.isEnabled()||this.updateAriaState(b,goog.ui.Component.State.DISABLED,!a.isEnabled());a.isSupportedState(goog.ui.Component.State.SELECTED)&&this.updateAriaState(b,goog.ui.Component.State.SELECTED,a.isSelected());a.isSupportedState(goog.ui.Component.State.CHECKED)&&this.updateAriaState(b,goog.ui.Component.State.CHECKED,
a.isChecked());a.isSupportedState(goog.ui.Component.State.OPENED)&&this.updateAriaState(b,goog.ui.Component.State.OPENED,a.isOpen())};goog.ui.ControlRenderer.prototype.setAllowTextSelection=function(a,b){goog.style.setUnselectable(a,!b,!goog.userAgent.IE&&!goog.userAgent.OPERA)};goog.ui.ControlRenderer.prototype.setRightToLeft=function(a,b){this.enableClassName(a,this.getStructuralCssClass()+"-rtl",b)};
goog.ui.ControlRenderer.prototype.isFocusable=function(a){var b;return a.isSupportedState(goog.ui.Component.State.FOCUSED)&&(b=a.getKeyEventTarget())?goog.dom.isFocusableTabIndex(b):!1};goog.ui.ControlRenderer.prototype.setFocusable=function(a,b){var c;if(a.isSupportedState(goog.ui.Component.State.FOCUSED)&&(c=a.getKeyEventTarget())){if(!b&&a.isFocused()){try{c.blur()}catch(d){}a.isFocused()&&a.handleBlur(null)}goog.dom.isFocusableTabIndex(c)!=b&&goog.dom.setFocusableTabIndex(c,b)}};
goog.ui.ControlRenderer.prototype.setVisible=function(a,b){goog.style.setElementShown(a,b);a&&goog.a11y.aria.setState(a,goog.a11y.aria.State.HIDDEN,!b)};goog.ui.ControlRenderer.prototype.setState=function(a,b,c){var d=a.getElement();if(d){var e=this.getClassForState(b);e&&this.enableClassName(a,e,c);this.updateAriaState(d,b,c)}};
goog.ui.ControlRenderer.prototype.updateAriaState=function(a,b,c){goog.ui.ControlRenderer.ARIA_ATTRIBUTE_MAP_||(goog.ui.ControlRenderer.ARIA_ATTRIBUTE_MAP_=goog.object.create(goog.ui.Component.State.DISABLED,goog.a11y.aria.State.DISABLED,goog.ui.Component.State.SELECTED,goog.a11y.aria.State.SELECTED,goog.ui.Component.State.CHECKED,goog.a11y.aria.State.CHECKED,goog.ui.Component.State.OPENED,goog.a11y.aria.State.EXPANDED));goog.asserts.assert(a,"The element passed as a first parameter cannot be null.");
(b=goog.ui.ControlRenderer.getAriaStateForAriaRole_(a,goog.ui.ControlRenderer.ARIA_ATTRIBUTE_MAP_[b]))&&goog.a11y.aria.setState(a,b,c)};goog.ui.ControlRenderer.getAriaStateForAriaRole_=function(a,b){var c=goog.a11y.aria.getRole(a);if(!c)return b;c=goog.ui.ControlRenderer.TOGGLE_ARIA_STATE_MAP_[c]||b;return goog.ui.ControlRenderer.isAriaState_(b)?c:b};goog.ui.ControlRenderer.isAriaState_=function(a){return a==goog.a11y.aria.State.CHECKED||a==goog.a11y.aria.State.SELECTED};
goog.ui.ControlRenderer.prototype.setContent=function(a,b){var c=this.getContentElement(a);if(c&&(goog.dom.removeChildren(c),b))if(goog.isString(b))goog.dom.setTextContent(c,b);else{var d=function(a){if(a){var b=goog.dom.getOwnerDocument(c);c.appendChild(goog.isString(a)?b.createTextNode(a):a)}};goog.isArray(b)?goog.array.forEach(b,d):!goog.isArrayLike(b)||"nodeType"in b?d(b):goog.array.forEach(goog.array.clone(b),d)}};goog.ui.ControlRenderer.prototype.getKeyEventTarget=function(a){return a.getElement()};
goog.ui.ControlRenderer.prototype.getCssClass=function(){return goog.ui.ControlRenderer.CSS_CLASS};goog.ui.ControlRenderer.prototype.getIe6ClassCombinations=function(){return[]};goog.ui.ControlRenderer.prototype.getStructuralCssClass=function(){return this.getCssClass()};
goog.ui.ControlRenderer.prototype.getClassNames=function(a){var b=this.getCssClass(),c=[b],d=this.getStructuralCssClass();d!=b&&c.push(d);b=this.getClassNamesForState(a.getState());c.push.apply(c,b);(a=a.getExtraClassNames())&&c.push.apply(c,a);goog.userAgent.IE&&!goog.userAgent.isVersionOrHigher("7")&&c.push.apply(c,this.getAppliedCombinedClassNames_(c));return c};
goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_=function(a,b){var c=[];b&&(a=a.concat([b]));goog.array.forEach(this.getIe6ClassCombinations(),function(d){!goog.array.every(d,goog.partial(goog.array.contains,a))||b&&!goog.array.contains(d,b)||c.push(d.join("_"))});return c};goog.ui.ControlRenderer.prototype.getClassNamesForState=function(a){for(var b=[];a;){var c=a&-a;b.push(this.getClassForState(c));a&=~c}return b};
goog.ui.ControlRenderer.prototype.getClassForState=function(a){this.classByState_||this.createClassByStateMap_();return this.classByState_[a]};goog.ui.ControlRenderer.prototype.getStateFromClass=function(a){this.stateByClass_||this.createStateByClassMap_();a=parseInt(this.stateByClass_[a],10);return isNaN(a)?0:a};
goog.ui.ControlRenderer.prototype.createClassByStateMap_=function(){var a=this.getStructuralCssClass(),b=!goog.string.contains(goog.string.normalizeWhitespace(a)," ");goog.asserts.assert(b,"ControlRenderer has an invalid css class: '"+a+"'");this.classByState_=goog.object.create(goog.ui.Component.State.DISABLED,a+"-disabled",goog.ui.Component.State.HOVER,a+"-hover",goog.ui.Component.State.ACTIVE,a+"-active",goog.ui.Component.State.SELECTED,a+"-selected",goog.ui.Component.State.CHECKED,a+"-checked",
goog.ui.Component.State.FOCUSED,a+"-focused",goog.ui.Component.State.OPENED,a+"-open")};goog.ui.ControlRenderer.prototype.createStateByClassMap_=function(){this.classByState_||this.createClassByStateMap_();this.stateByClass_=goog.object.transpose(this.classByState_)};goog.ui.decorate=function(a){var b=goog.ui.registry.getDecorator(a);b&&b.decorate(a);return b};goog.ui.Control=function(a,b,c){goog.ui.Component.call(this,c);this.renderer_=b||goog.ui.registry.getDefaultRenderer(this.constructor);this.setContentInternal(goog.isDef(a)?a:null)};goog.inherits(goog.ui.Control,goog.ui.Component);goog.ui.Control.registerDecorator=goog.ui.registry.setDecoratorByClassName;goog.ui.Control.getDecorator=goog.ui.registry.getDecorator;goog.ui.Control.decorate=goog.ui.decorate;goog.ui.Control.prototype.content_=null;goog.ui.Control.prototype.state_=0;
goog.ui.Control.prototype.supportedStates_=goog.ui.Component.State.DISABLED|goog.ui.Component.State.HOVER|goog.ui.Component.State.ACTIVE|goog.ui.Component.State.FOCUSED;goog.ui.Control.prototype.autoStates_=goog.ui.Component.State.ALL;goog.ui.Control.prototype.statesWithTransitionEvents_=0;goog.ui.Control.prototype.visible_=!0;goog.ui.Control.prototype.extraClassNames_=null;goog.ui.Control.prototype.handleMouseEvents_=!0;goog.ui.Control.prototype.allowTextSelection_=!1;
goog.ui.Control.prototype.preferredAriaRole_=null;goog.ui.Control.prototype.isHandleMouseEvents=function(){return this.handleMouseEvents_};goog.ui.Control.prototype.setHandleMouseEvents=function(a){this.isInDocument()&&a!=this.handleMouseEvents_&&this.enableMouseEventHandling_(a);this.handleMouseEvents_=a};goog.ui.Control.prototype.getKeyEventTarget=function(){return this.renderer_.getKeyEventTarget(this)};
goog.ui.Control.prototype.getKeyHandler=function(){return this.keyHandler_||(this.keyHandler_=new goog.events.KeyHandler)};goog.ui.Control.prototype.getRenderer=function(){return this.renderer_};goog.ui.Control.prototype.setRenderer=function(a){if(this.isInDocument())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.getElement()&&this.setElementInternal(null);this.renderer_=a};goog.ui.Control.prototype.getExtraClassNames=function(){return this.extraClassNames_};
goog.ui.Control.prototype.addClassName=function(a){a&&(this.extraClassNames_?goog.array.contains(this.extraClassNames_,a)||this.extraClassNames_.push(a):this.extraClassNames_=[a],this.renderer_.enableExtraClassName(this,a,!0))};goog.ui.Control.prototype.removeClassName=function(a){a&&this.extraClassNames_&&goog.array.remove(this.extraClassNames_,a)&&(0==this.extraClassNames_.length&&(this.extraClassNames_=null),this.renderer_.enableExtraClassName(this,a,!1))};
goog.ui.Control.prototype.enableClassName=function(a,b){b?this.addClassName(a):this.removeClassName(a)};goog.ui.Control.prototype.createDom=function(){var a=this.renderer_.createDom(this);this.setElementInternal(a);this.renderer_.setAriaRole(a,this.getPreferredAriaRole());this.isAllowTextSelection()||this.renderer_.setAllowTextSelection(a,!1);this.isVisible()||this.renderer_.setVisible(a,!1)};goog.ui.Control.prototype.getPreferredAriaRole=function(){return this.preferredAriaRole_};
goog.ui.Control.prototype.setPreferredAriaRole=function(a){this.preferredAriaRole_=a};goog.ui.Control.prototype.getContentElement=function(){return this.renderer_.getContentElement(this.getElement())};goog.ui.Control.prototype.canDecorate=function(a){return this.renderer_.canDecorate(a)};
goog.ui.Control.prototype.decorateInternal=function(a){a=this.renderer_.decorate(this,a);this.setElementInternal(a);this.renderer_.setAriaRole(a,this.getPreferredAriaRole());this.isAllowTextSelection()||this.renderer_.setAllowTextSelection(a,!1);this.visible_="none"!=a.style.display};
goog.ui.Control.prototype.enterDocument=function(){goog.ui.Control.superClass_.enterDocument.call(this);this.renderer_.initializeDom(this);if(this.supportedStates_&~goog.ui.Component.State.DISABLED&&(this.isHandleMouseEvents()&&this.enableMouseEventHandling_(!0),this.isSupportedState(goog.ui.Component.State.FOCUSED))){var a=this.getKeyEventTarget();if(a){var b=this.getKeyHandler();b.attach(a);this.getHandler().listen(b,goog.events.KeyHandler.EventType.KEY,this.handleKeyEvent).listen(a,goog.events.EventType.FOCUS,
this.handleFocus).listen(a,goog.events.EventType.BLUR,this.handleBlur)}}};
goog.ui.Control.prototype.enableMouseEventHandling_=function(a){var b=this.getHandler(),c=this.getElement();a?(b.listen(c,goog.events.EventType.MOUSEOVER,this.handleMouseOver).listen(c,goog.events.EventType.MOUSEDOWN,this.handleMouseDown).listen(c,goog.events.EventType.MOUSEUP,this.handleMouseUp).listen(c,goog.events.EventType.MOUSEOUT,this.handleMouseOut),this.handleContextMenu!=goog.nullFunction&&b.listen(c,goog.events.EventType.CONTEXTMENU,this.handleContextMenu),goog.userAgent.IE&&b.listen(c,
goog.events.EventType.DBLCLICK,this.handleDblClick)):(b.unlisten(c,goog.events.EventType.MOUSEOVER,this.handleMouseOver).unlisten(c,goog.events.EventType.MOUSEDOWN,this.handleMouseDown).unlisten(c,goog.events.EventType.MOUSEUP,this.handleMouseUp).unlisten(c,goog.events.EventType.MOUSEOUT,this.handleMouseOut),this.handleContextMenu!=goog.nullFunction&&b.unlisten(c,goog.events.EventType.CONTEXTMENU,this.handleContextMenu),goog.userAgent.IE&&b.unlisten(c,goog.events.EventType.DBLCLICK,this.handleDblClick))};
goog.ui.Control.prototype.exitDocument=function(){goog.ui.Control.superClass_.exitDocument.call(this);this.keyHandler_&&this.keyHandler_.detach();this.isVisible()&&this.isEnabled()&&this.renderer_.setFocusable(this,!1)};goog.ui.Control.prototype.disposeInternal=function(){goog.ui.Control.superClass_.disposeInternal.call(this);this.keyHandler_&&(this.keyHandler_.dispose(),delete this.keyHandler_);delete this.renderer_;this.extraClassNames_=this.content_=null};goog.ui.Control.prototype.getContent=function(){return this.content_};
goog.ui.Control.prototype.setContent=function(a){this.renderer_.setContent(this.getElement(),a);this.setContentInternal(a)};goog.ui.Control.prototype.setContentInternal=function(a){this.content_=a};goog.ui.Control.prototype.getCaption=function(){var a=this.getContent();if(!a)return"";a=goog.isString(a)?a:goog.isArray(a)?goog.array.map(a,goog.dom.getRawTextContent).join(""):goog.dom.getTextContent(a);return goog.string.collapseBreakingSpaces(a)};goog.ui.Control.prototype.setCaption=function(a){this.setContent(a)};
goog.ui.Control.prototype.setRightToLeft=function(a){goog.ui.Control.superClass_.setRightToLeft.call(this,a);var b=this.getElement();b&&this.renderer_.setRightToLeft(b,a)};goog.ui.Control.prototype.isAllowTextSelection=function(){return this.allowTextSelection_};goog.ui.Control.prototype.setAllowTextSelection=function(a){this.allowTextSelection_=a;var b=this.getElement();b&&this.renderer_.setAllowTextSelection(b,a)};goog.ui.Control.prototype.isVisible=function(){return this.visible_};
goog.ui.Control.prototype.setVisible=function(a,b){if(b||this.visible_!=a&&this.dispatchEvent(a?goog.ui.Component.EventType.SHOW:goog.ui.Component.EventType.HIDE)){var c=this.getElement();c&&this.renderer_.setVisible(c,a);this.isEnabled()&&this.renderer_.setFocusable(this,a);this.visible_=a;return!0}return!1};goog.ui.Control.prototype.isEnabled=function(){return!this.hasState(goog.ui.Component.State.DISABLED)};
goog.ui.Control.prototype.isParentDisabled_=function(){var a=this.getParent();return!!a&&"function"==typeof a.isEnabled&&!a.isEnabled()};goog.ui.Control.prototype.setEnabled=function(a){!this.isParentDisabled_()&&this.isTransitionAllowed(goog.ui.Component.State.DISABLED,!a)&&(a||(this.setActive(!1),this.setHighlighted(!1)),this.isVisible()&&this.renderer_.setFocusable(this,a),this.setState(goog.ui.Component.State.DISABLED,!a))};goog.ui.Control.prototype.isHighlighted=function(){return this.hasState(goog.ui.Component.State.HOVER)};
goog.ui.Control.prototype.setHighlighted=function(a){this.isTransitionAllowed(goog.ui.Component.State.HOVER,a)&&this.setState(goog.ui.Component.State.HOVER,a)};goog.ui.Control.prototype.isActive=function(){return this.hasState(goog.ui.Component.State.ACTIVE)};goog.ui.Control.prototype.setActive=function(a){this.isTransitionAllowed(goog.ui.Component.State.ACTIVE,a)&&this.setState(goog.ui.Component.State.ACTIVE,a)};goog.ui.Control.prototype.isSelected=function(){return this.hasState(goog.ui.Component.State.SELECTED)};
goog.ui.Control.prototype.setSelected=function(a){this.isTransitionAllowed(goog.ui.Component.State.SELECTED,a)&&this.setState(goog.ui.Component.State.SELECTED,a)};goog.ui.Control.prototype.isChecked=function(){return this.hasState(goog.ui.Component.State.CHECKED)};goog.ui.Control.prototype.setChecked=function(a){this.isTransitionAllowed(goog.ui.Component.State.CHECKED,a)&&this.setState(goog.ui.Component.State.CHECKED,a)};goog.ui.Control.prototype.isFocused=function(){return this.hasState(goog.ui.Component.State.FOCUSED)};
goog.ui.Control.prototype.setFocused=function(a){this.isTransitionAllowed(goog.ui.Component.State.FOCUSED,a)&&this.setState(goog.ui.Component.State.FOCUSED,a)};goog.ui.Control.prototype.isOpen=function(){return this.hasState(goog.ui.Component.State.OPENED)};goog.ui.Control.prototype.setOpen=function(a){this.isTransitionAllowed(goog.ui.Component.State.OPENED,a)&&this.setState(goog.ui.Component.State.OPENED,a)};goog.ui.Control.prototype.getState=function(){return this.state_};
goog.ui.Control.prototype.hasState=function(a){return!!(this.state_&a)};goog.ui.Control.prototype.setState=function(a,b){this.isSupportedState(a)&&b!=this.hasState(a)&&(this.renderer_.setState(this,a,b),this.state_=b?this.state_|a:this.state_&~a)};goog.ui.Control.prototype.setStateInternal=function(a){this.state_=a};goog.ui.Control.prototype.isSupportedState=function(a){return!!(this.supportedStates_&a)};
goog.ui.Control.prototype.setSupportedState=function(a,b){if(this.isInDocument()&&this.hasState(a)&&!b)throw Error(goog.ui.Component.Error.ALREADY_RENDERED);!b&&this.hasState(a)&&this.setState(a,!1);this.supportedStates_=b?this.supportedStates_|a:this.supportedStates_&~a};goog.ui.Control.prototype.isAutoState=function(a){return!!(this.autoStates_&a)&&this.isSupportedState(a)};goog.ui.Control.prototype.setAutoStates=function(a,b){this.autoStates_=b?this.autoStates_|a:this.autoStates_&~a};
goog.ui.Control.prototype.isDispatchTransitionEvents=function(a){return!!(this.statesWithTransitionEvents_&a)&&this.isSupportedState(a)};goog.ui.Control.prototype.setDispatchTransitionEvents=function(a,b){this.statesWithTransitionEvents_=b?this.statesWithTransitionEvents_|a:this.statesWithTransitionEvents_&~a};
goog.ui.Control.prototype.isTransitionAllowed=function(a,b){return this.isSupportedState(a)&&this.hasState(a)!=b&&(!(this.statesWithTransitionEvents_&a)||this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(a,b)))&&!this.isDisposed()};goog.ui.Control.prototype.handleMouseOver=function(a){!goog.ui.Control.isMouseEventWithinElement_(a,this.getElement())&&this.dispatchEvent(goog.ui.Component.EventType.ENTER)&&this.isEnabled()&&this.isAutoState(goog.ui.Component.State.HOVER)&&this.setHighlighted(!0)};
goog.ui.Control.prototype.handleMouseOut=function(a){!goog.ui.Control.isMouseEventWithinElement_(a,this.getElement())&&this.dispatchEvent(goog.ui.Component.EventType.LEAVE)&&(this.isAutoState(goog.ui.Component.State.ACTIVE)&&this.setActive(!1),this.isAutoState(goog.ui.Component.State.HOVER)&&this.setHighlighted(!1))};goog.ui.Control.prototype.handleContextMenu=goog.nullFunction;goog.ui.Control.isMouseEventWithinElement_=function(a,b){return!!a.relatedTarget&&goog.dom.contains(b,a.relatedTarget)};
goog.ui.Control.prototype.handleMouseDown=function(a){this.isEnabled()&&(this.isAutoState(goog.ui.Component.State.HOVER)&&this.setHighlighted(!0),a.isMouseActionButton()&&(this.isAutoState(goog.ui.Component.State.ACTIVE)&&this.setActive(!0),this.renderer_.isFocusable(this)&&this.getKeyEventTarget().focus()));!this.isAllowTextSelection()&&a.isMouseActionButton()&&a.preventDefault()};
goog.ui.Control.prototype.handleMouseUp=function(a){this.isEnabled()&&(this.isAutoState(goog.ui.Component.State.HOVER)&&this.setHighlighted(!0),this.isActive()&&this.performActionInternal(a)&&this.isAutoState(goog.ui.Component.State.ACTIVE)&&this.setActive(!1))};goog.ui.Control.prototype.handleDblClick=function(a){this.isEnabled()&&this.performActionInternal(a)};
goog.ui.Control.prototype.performActionInternal=function(a){this.isAutoState(goog.ui.Component.State.CHECKED)&&this.setChecked(!this.isChecked());this.isAutoState(goog.ui.Component.State.SELECTED)&&this.setSelected(!0);this.isAutoState(goog.ui.Component.State.OPENED)&&this.setOpen(!this.isOpen());var b=new goog.events.Event(goog.ui.Component.EventType.ACTION,this);a&&(b.altKey=a.altKey,b.ctrlKey=a.ctrlKey,b.metaKey=a.metaKey,b.shiftKey=a.shiftKey,b.platformModifierKey=a.platformModifierKey);return this.dispatchEvent(b)};
goog.ui.Control.prototype.handleFocus=function(a){this.isAutoState(goog.ui.Component.State.FOCUSED)&&this.setFocused(!0)};goog.ui.Control.prototype.handleBlur=function(a){this.isAutoState(goog.ui.Component.State.ACTIVE)&&this.setActive(!1);this.isAutoState(goog.ui.Component.State.FOCUSED)&&this.setFocused(!1)};goog.ui.Control.prototype.handleKeyEvent=function(a){return this.isVisible()&&this.isEnabled()&&this.handleKeyEventInternal(a)?(a.preventDefault(),a.stopPropagation(),!0):!1};
goog.ui.Control.prototype.handleKeyEventInternal=function(a){return a.keyCode==goog.events.KeyCodes.ENTER&&this.performActionInternal(a)};goog.ui.registry.setDefaultRenderer(goog.ui.Control,goog.ui.ControlRenderer);goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS,function(){return new goog.ui.Control(null)});goog.ui.Container=function(a,b,c){goog.ui.Component.call(this,c);this.renderer_=b||goog.ui.ContainerRenderer.getInstance();this.orientation_=a||this.renderer_.getDefaultOrientation()};goog.inherits(goog.ui.Container,goog.ui.Component);goog.ui.Container.EventType={AFTER_SHOW:"aftershow",AFTER_HIDE:"afterhide"};goog.ui.Container.Orientation={HORIZONTAL:"horizontal",VERTICAL:"vertical"};goog.ui.Container.prototype.keyEventTarget_=null;goog.ui.Container.prototype.keyHandler_=null;
goog.ui.Container.prototype.renderer_=null;goog.ui.Container.prototype.orientation_=null;goog.ui.Container.prototype.visible_=!0;goog.ui.Container.prototype.enabled_=!0;goog.ui.Container.prototype.focusable_=!0;goog.ui.Container.prototype.highlightedIndex_=-1;goog.ui.Container.prototype.openItem_=null;goog.ui.Container.prototype.mouseButtonPressed_=!1;goog.ui.Container.prototype.allowFocusableChildren_=!1;goog.ui.Container.prototype.openFollowsHighlight_=!0;
goog.ui.Container.prototype.childElementIdMap_=null;goog.ui.Container.prototype.getKeyEventTarget=function(){return this.keyEventTarget_||this.renderer_.getKeyEventTarget(this)};
goog.ui.Container.prototype.setKeyEventTarget=function(a){if(this.focusable_){var b=this.getKeyEventTarget(),c=this.isInDocument();this.keyEventTarget_=a;var d=this.getKeyEventTarget();c&&(this.keyEventTarget_=b,this.enableFocusHandling_(!1),this.keyEventTarget_=a,this.getKeyHandler().attach(d),this.enableFocusHandling_(!0))}else throw Error("Can't set key event target for container that doesn't support keyboard focus!");};
goog.ui.Container.prototype.getKeyHandler=function(){return this.keyHandler_||(this.keyHandler_=new goog.events.KeyHandler(this.getKeyEventTarget()))};goog.ui.Container.prototype.getRenderer=function(){return this.renderer_};goog.ui.Container.prototype.setRenderer=function(a){if(this.getElement())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.renderer_=a};goog.ui.Container.prototype.createDom=function(){this.setElementInternal(this.renderer_.createDom(this))};
goog.ui.Container.prototype.getContentElement=function(){return this.renderer_.getContentElement(this.getElement())};goog.ui.Container.prototype.canDecorate=function(a){return this.renderer_.canDecorate(a)};goog.ui.Container.prototype.decorateInternal=function(a){this.setElementInternal(this.renderer_.decorate(this,a));"none"==a.style.display&&(this.visible_=!1)};
goog.ui.Container.prototype.enterDocument=function(){goog.ui.Container.superClass_.enterDocument.call(this);this.forEachChild(function(a){a.isInDocument()&&this.registerChildId_(a)},this);var a=this.getElement();this.renderer_.initializeDom(this);this.setVisible(this.visible_,!0);this.getHandler().listen(this,goog.ui.Component.EventType.ENTER,this.handleEnterItem).listen(this,goog.ui.Component.EventType.HIGHLIGHT,this.handleHighlightItem).listen(this,goog.ui.Component.EventType.UNHIGHLIGHT,this.handleUnHighlightItem).listen(this,
goog.ui.Component.EventType.OPEN,this.handleOpenItem).listen(this,goog.ui.Component.EventType.CLOSE,this.handleCloseItem).listen(a,goog.events.EventType.MOUSEDOWN,this.handleMouseDown).listen(goog.dom.getOwnerDocument(a),goog.events.EventType.MOUSEUP,this.handleDocumentMouseUp).listen(a,[goog.events.EventType.MOUSEDOWN,goog.events.EventType.MOUSEUP,goog.events.EventType.MOUSEOVER,goog.events.EventType.MOUSEOUT,goog.events.EventType.CONTEXTMENU],this.handleChildMouseEvents);this.isFocusable()&&this.enableFocusHandling_(!0)};
goog.ui.Container.prototype.enableFocusHandling_=function(a){var b=this.getHandler(),c=this.getKeyEventTarget();a?b.listen(c,goog.events.EventType.FOCUS,this.handleFocus).listen(c,goog.events.EventType.BLUR,this.handleBlur).listen(this.getKeyHandler(),goog.events.KeyHandler.EventType.KEY,this.handleKeyEvent):b.unlisten(c,goog.events.EventType.FOCUS,this.handleFocus).unlisten(c,goog.events.EventType.BLUR,this.handleBlur).unlisten(this.getKeyHandler(),goog.events.KeyHandler.EventType.KEY,this.handleKeyEvent)};
goog.ui.Container.prototype.exitDocument=function(){this.setHighlightedIndex(-1);this.openItem_&&this.openItem_.setOpen(!1);this.mouseButtonPressed_=!1;goog.ui.Container.superClass_.exitDocument.call(this)};goog.ui.Container.prototype.disposeInternal=function(){goog.ui.Container.superClass_.disposeInternal.call(this);this.keyHandler_&&(this.keyHandler_.dispose(),this.keyHandler_=null);this.renderer_=this.openItem_=this.childElementIdMap_=this.keyEventTarget_=null};
goog.ui.Container.prototype.handleEnterItem=function(a){return!0};
goog.ui.Container.prototype.handleHighlightItem=function(a){var b=this.indexOfChild(a.target);if(-1<b&&b!=this.highlightedIndex_){var c=this.getHighlighted();c&&c.setHighlighted(!1);this.highlightedIndex_=b;c=this.getHighlighted();this.isMouseButtonPressed()&&c.setActive(!0);this.openFollowsHighlight_&&this.openItem_&&c!=this.openItem_&&(c.isSupportedState(goog.ui.Component.State.OPENED)?c.setOpen(!0):this.openItem_.setOpen(!1))}b=this.getElement();goog.asserts.assert(b,"The DOM element for the container cannot be null.");
null!=a.target.getElement()&&goog.a11y.aria.setState(b,goog.a11y.aria.State.ACTIVEDESCENDANT,a.target.getElement().id)};goog.ui.Container.prototype.handleUnHighlightItem=function(a){a.target==this.getHighlighted()&&(this.highlightedIndex_=-1);a=this.getElement();goog.asserts.assert(a,"The DOM element for the container cannot be null.");goog.a11y.aria.removeState(a,goog.a11y.aria.State.ACTIVEDESCENDANT)};
goog.ui.Container.prototype.handleOpenItem=function(a){(a=a.target)&&a!=this.openItem_&&a.getParent()==this&&(this.openItem_&&this.openItem_.setOpen(!1),this.openItem_=a)};goog.ui.Container.prototype.handleCloseItem=function(a){a.target==this.openItem_&&(this.openItem_=null)};goog.ui.Container.prototype.handleMouseDown=function(a){this.enabled_&&this.setMouseButtonPressed(!0);var b=this.getKeyEventTarget();b&&goog.dom.isFocusableTabIndex(b)?b.focus():a.preventDefault()};
goog.ui.Container.prototype.handleDocumentMouseUp=function(a){this.setMouseButtonPressed(!1)};goog.ui.Container.prototype.handleChildMouseEvents=function(a){var b=this.getOwnerControl(a.target);if(b)switch(a.type){case goog.events.EventType.MOUSEDOWN:b.handleMouseDown(a);break;case goog.events.EventType.MOUSEUP:b.handleMouseUp(a);break;case goog.events.EventType.MOUSEOVER:b.handleMouseOver(a);break;case goog.events.EventType.MOUSEOUT:b.handleMouseOut(a);break;case goog.events.EventType.CONTEXTMENU:b.handleContextMenu(a)}};
goog.ui.Container.prototype.getOwnerControl=function(a){if(this.childElementIdMap_)for(var b=this.getElement();a&&a!==b;){var c=a.id;if(c in this.childElementIdMap_)return this.childElementIdMap_[c];a=a.parentNode}return null};goog.ui.Container.prototype.handleFocus=function(a){};goog.ui.Container.prototype.handleBlur=function(a){this.setHighlightedIndex(-1);this.setMouseButtonPressed(!1);this.openItem_&&this.openItem_.setOpen(!1)};
goog.ui.Container.prototype.handleKeyEvent=function(a){return this.isEnabled()&&this.isVisible()&&(0!=this.getChildCount()||this.keyEventTarget_)&&this.handleKeyEventInternal(a)?(a.preventDefault(),a.stopPropagation(),!0):!1};
goog.ui.Container.prototype.handleKeyEventInternal=function(a){var b=this.getHighlighted();if(b&&"function"==typeof b.handleKeyEvent&&b.handleKeyEvent(a)||this.openItem_&&this.openItem_!=b&&"function"==typeof this.openItem_.handleKeyEvent&&this.openItem_.handleKeyEvent(a))return!0;if(a.shiftKey||a.ctrlKey||a.metaKey||a.altKey)return!1;switch(a.keyCode){case goog.events.KeyCodes.ESC:if(this.isFocusable())this.getKeyEventTarget().blur();else return!1;break;case goog.events.KeyCodes.HOME:this.highlightFirst();
break;case goog.events.KeyCodes.END:this.highlightLast();break;case goog.events.KeyCodes.UP:if(this.orientation_==goog.ui.Container.Orientation.VERTICAL)this.highlightPrevious();else return!1;break;case goog.events.KeyCodes.LEFT:if(this.orientation_==goog.ui.Container.Orientation.HORIZONTAL)this.isRightToLeft()?this.highlightNext():this.highlightPrevious();else return!1;break;case goog.events.KeyCodes.DOWN:if(this.orientation_==goog.ui.Container.Orientation.VERTICAL)this.highlightNext();else return!1;
break;case goog.events.KeyCodes.RIGHT:if(this.orientation_==goog.ui.Container.Orientation.HORIZONTAL)this.isRightToLeft()?this.highlightPrevious():this.highlightNext();else return!1;break;default:return!1}return!0};goog.ui.Container.prototype.registerChildId_=function(a){var b=a.getElement(),b=b.id||(b.id=a.getId());this.childElementIdMap_||(this.childElementIdMap_={});this.childElementIdMap_[b]=a};
goog.ui.Container.prototype.addChild=function(a,b){goog.asserts.assertInstanceof(a,goog.ui.Control,"The child of a container must be a control");goog.ui.Container.superClass_.addChild.call(this,a,b)};
goog.ui.Container.prototype.addChildAt=function(a,b,c){a.setDispatchTransitionEvents(goog.ui.Component.State.HOVER,!0);a.setDispatchTransitionEvents(goog.ui.Component.State.OPENED,!0);!this.isFocusable()&&this.isFocusableChildrenAllowed()||a.setSupportedState(goog.ui.Component.State.FOCUSED,!1);a.setHandleMouseEvents(!1);goog.ui.Container.superClass_.addChildAt.call(this,a,b,c);a.isInDocument()&&this.isInDocument()&&this.registerChildId_(a);b<=this.highlightedIndex_&&this.highlightedIndex_++};
goog.ui.Container.prototype.removeChild=function(a,b){if(a=goog.isString(a)?this.getChild(a):a){var c=this.indexOfChild(a);-1!=c&&(c==this.highlightedIndex_?(a.setHighlighted(!1),this.highlightedIndex_=-1):c<this.highlightedIndex_&&this.highlightedIndex_--);(c=a.getElement())&&c.id&&this.childElementIdMap_&&goog.object.remove(this.childElementIdMap_,c.id)}a=goog.ui.Container.superClass_.removeChild.call(this,a,b);a.setHandleMouseEvents(!0);return a};goog.ui.Container.prototype.getOrientation=function(){return this.orientation_};
goog.ui.Container.prototype.setOrientation=function(a){if(this.getElement())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.orientation_=a};goog.ui.Container.prototype.isVisible=function(){return this.visible_};
goog.ui.Container.prototype.setVisible=function(a,b){if(b||this.visible_!=a&&this.dispatchEvent(a?goog.ui.Component.EventType.SHOW:goog.ui.Component.EventType.HIDE)){this.visible_=a;var c=this.getElement();c&&(goog.style.setElementShown(c,a),this.isFocusable()&&this.renderer_.enableTabIndex(this.getKeyEventTarget(),this.enabled_&&this.visible_),b||this.dispatchEvent(this.visible_?goog.ui.Container.EventType.AFTER_SHOW:goog.ui.Container.EventType.AFTER_HIDE));return!0}return!1};
goog.ui.Container.prototype.isEnabled=function(){return this.enabled_};
goog.ui.Container.prototype.setEnabled=function(a){this.enabled_!=a&&this.dispatchEvent(a?goog.ui.Component.EventType.ENABLE:goog.ui.Component.EventType.DISABLE)&&(a?(this.enabled_=!0,this.forEachChild(function(a){a.wasDisabled?delete a.wasDisabled:a.setEnabled(!0)})):(this.forEachChild(function(a){a.isEnabled()?a.setEnabled(!1):a.wasDisabled=!0}),this.enabled_=!1,this.setMouseButtonPressed(!1)),this.isFocusable()&&this.renderer_.enableTabIndex(this.getKeyEventTarget(),a&&this.visible_))};
goog.ui.Container.prototype.isFocusable=function(){return this.focusable_};goog.ui.Container.prototype.setFocusable=function(a){a!=this.focusable_&&this.isInDocument()&&this.enableFocusHandling_(a);this.focusable_=a;this.enabled_&&this.visible_&&this.renderer_.enableTabIndex(this.getKeyEventTarget(),a)};goog.ui.Container.prototype.isFocusableChildrenAllowed=function(){return this.allowFocusableChildren_};
goog.ui.Container.prototype.setFocusableChildrenAllowed=function(a){this.allowFocusableChildren_=a};goog.ui.Container.prototype.isOpenFollowsHighlight=function(){return this.openFollowsHighlight_};goog.ui.Container.prototype.setOpenFollowsHighlight=function(a){this.openFollowsHighlight_=a};goog.ui.Container.prototype.getHighlightedIndex=function(){return this.highlightedIndex_};
goog.ui.Container.prototype.setHighlightedIndex=function(a){(a=this.getChildAt(a))?a.setHighlighted(!0):-1<this.highlightedIndex_&&this.getHighlighted().setHighlighted(!1)};goog.ui.Container.prototype.setHighlighted=function(a){this.setHighlightedIndex(this.indexOfChild(a))};goog.ui.Container.prototype.getHighlighted=function(){return this.getChildAt(this.highlightedIndex_)};
goog.ui.Container.prototype.highlightFirst=function(){this.highlightHelper(function(a,b){return(a+1)%b},this.getChildCount()-1)};goog.ui.Container.prototype.highlightLast=function(){this.highlightHelper(function(a,b){a--;return 0>a?b-1:a},0)};goog.ui.Container.prototype.highlightNext=function(){this.highlightHelper(function(a,b){return(a+1)%b},this.highlightedIndex_)};goog.ui.Container.prototype.highlightPrevious=function(){this.highlightHelper(function(a,b){a--;return 0>a?b-1:a},this.highlightedIndex_)};
goog.ui.Container.prototype.highlightHelper=function(a,b){for(var c=0>b?this.indexOfChild(this.openItem_):b,d=this.getChildCount(),c=a.call(this,c,d),e=0;e<=d;){var f=this.getChildAt(c);if(f&&this.canHighlightItem(f))return this.setHighlightedIndexFromKeyEvent(c),!0;e++;c=a.call(this,c,d)}return!1};goog.ui.Container.prototype.canHighlightItem=function(a){return a.isVisible()&&a.isEnabled()&&a.isSupportedState(goog.ui.Component.State.HOVER)};
goog.ui.Container.prototype.setHighlightedIndexFromKeyEvent=function(a){this.setHighlightedIndex(a)};goog.ui.Container.prototype.getOpenItem=function(){return this.openItem_};goog.ui.Container.prototype.isMouseButtonPressed=function(){return this.mouseButtonPressed_};goog.ui.Container.prototype.setMouseButtonPressed=function(a){this.mouseButtonPressed_=a};goog.ui.MenuHeaderRenderer=function(){goog.ui.ControlRenderer.call(this)};goog.inherits(goog.ui.MenuHeaderRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.MenuHeaderRenderer);goog.ui.MenuHeaderRenderer.CSS_CLASS="goog-menuheader";goog.ui.MenuHeaderRenderer.prototype.getCssClass=function(){return goog.ui.MenuHeaderRenderer.CSS_CLASS};goog.ui.MenuHeader=function(a,b,c){goog.ui.Control.call(this,a,c||goog.ui.MenuHeaderRenderer.getInstance(),b);this.setSupportedState(goog.ui.Component.State.DISABLED,!1);this.setSupportedState(goog.ui.Component.State.HOVER,!1);this.setSupportedState(goog.ui.Component.State.ACTIVE,!1);this.setSupportedState(goog.ui.Component.State.FOCUSED,!1);this.setStateInternal(goog.ui.Component.State.DISABLED)};goog.inherits(goog.ui.MenuHeader,goog.ui.Control);
goog.ui.registry.setDecoratorByClassName(goog.ui.MenuHeaderRenderer.CSS_CLASS,function(){return new goog.ui.MenuHeader(null)});goog.ui.MenuItemRenderer=function(){goog.ui.ControlRenderer.call(this);this.classNameCache_=[]};goog.inherits(goog.ui.MenuItemRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.MenuItemRenderer);goog.ui.MenuItemRenderer.CSS_CLASS="goog-menuitem";goog.ui.MenuItemRenderer.CompositeCssClassIndex_={HOVER:0,CHECKBOX:1,CONTENT:2};
goog.ui.MenuItemRenderer.prototype.getCompositeCssClass_=function(a){var b=this.classNameCache_[a];if(!b){switch(a){case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER:b=this.getStructuralCssClass()+"-highlight";break;case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX:b=this.getStructuralCssClass()+"-checkbox";break;case goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT:b=this.getStructuralCssClass()+"-content"}this.classNameCache_[a]=b}return b};
goog.ui.MenuItemRenderer.prototype.getAriaRole=function(){return goog.a11y.aria.Role.MENU_ITEM};goog.ui.MenuItemRenderer.prototype.createDom=function(a){var b=a.getDomHelper().createDom("div",this.getClassNames(a).join(" "),this.createContent(a.getContent(),a.getDomHelper()));this.setEnableCheckBoxStructure(a,b,a.isSupportedState(goog.ui.Component.State.SELECTED)||a.isSupportedState(goog.ui.Component.State.CHECKED));this.setAriaStates(a,b);this.correctAriaRole(a,b);return b};
goog.ui.MenuItemRenderer.prototype.getContentElement=function(a){return a&&a.firstChild};goog.ui.MenuItemRenderer.prototype.decorate=function(a,b){goog.asserts.assert(b);this.hasContentStructure(b)||b.appendChild(this.createContent(b.childNodes,a.getDomHelper()));goog.dom.classlist.contains(b,"goog-option")&&(a.setCheckable(!0),this.setCheckable(a,b,!0));return goog.ui.MenuItemRenderer.superClass_.decorate.call(this,a,b)};
goog.ui.MenuItemRenderer.prototype.setContent=function(a,b){var c=this.getContentElement(a),d=this.hasCheckBoxStructure(a)?c.firstChild:null;goog.ui.MenuItemRenderer.superClass_.setContent.call(this,a,b);d&&!this.hasCheckBoxStructure(a)&&c.insertBefore(d,c.firstChild||null)};
goog.ui.MenuItemRenderer.prototype.hasContentStructure=function(a){a=goog.dom.getFirstElementChild(a);var b=this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);return!!a&&goog.dom.classlist.contains(a,b)};goog.ui.MenuItemRenderer.prototype.createContent=function(a,b){var c=this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CONTENT);return b.createDom("div",c,a)};
goog.ui.MenuItemRenderer.prototype.setSelectable=function(a,b,c){b&&(goog.a11y.aria.setRole(b,c?goog.a11y.aria.Role.MENU_ITEM_RADIO:this.getAriaRole()),this.setEnableCheckBoxStructure(a,b,c))};goog.ui.MenuItemRenderer.prototype.setCheckable=function(a,b,c){b&&(goog.a11y.aria.setRole(b,c?goog.a11y.aria.Role.MENU_ITEM_CHECKBOX:this.getAriaRole()),this.setEnableCheckBoxStructure(a,b,c))};
goog.ui.MenuItemRenderer.prototype.hasCheckBoxStructure=function(a){if(a=this.getContentElement(a)){a=a.firstChild;var b=this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX);return!!a&&goog.dom.isElement(a)&&goog.dom.classlist.contains(a,b)}return!1};
goog.ui.MenuItemRenderer.prototype.setEnableCheckBoxStructure=function(a,b,c){goog.asserts.assert(b);c!=this.hasCheckBoxStructure(b)&&(goog.dom.classlist.enable(b,"goog-option",c),b=this.getContentElement(b),c?(c=this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.CHECKBOX),b.insertBefore(a.getDomHelper().createDom("div",c),b.firstChild||null)):b.removeChild(b.firstChild))};
goog.ui.MenuItemRenderer.prototype.getClassForState=function(a){switch(a){case goog.ui.Component.State.HOVER:return this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);case goog.ui.Component.State.CHECKED:case goog.ui.Component.State.SELECTED:return"goog-option-selected";default:return goog.ui.MenuItemRenderer.superClass_.getClassForState.call(this,a)}};
goog.ui.MenuItemRenderer.prototype.getStateFromClass=function(a){var b=this.getCompositeCssClass_(goog.ui.MenuItemRenderer.CompositeCssClassIndex_.HOVER);switch(a){case "goog-option-selected":return goog.ui.Component.State.CHECKED;case b:return goog.ui.Component.State.HOVER;default:return goog.ui.MenuItemRenderer.superClass_.getStateFromClass.call(this,a)}};goog.ui.MenuItemRenderer.prototype.getCssClass=function(){return goog.ui.MenuItemRenderer.CSS_CLASS};
goog.ui.MenuItemRenderer.prototype.correctAriaRole=function(a,b){(a.isSupportedState(goog.ui.Component.State.SELECTED)||a.isSupportedState(goog.ui.Component.State.CHECKED))&&this.setAriaRole(b,a.isSupportedState(goog.ui.Component.State.CHECKED)?goog.a11y.aria.Role.MENU_ITEM_CHECKBOX:goog.a11y.aria.Role.MENU_ITEM_RADIO)};goog.ui.MenuItem=function(a,b,c,d){goog.ui.Control.call(this,a,d||goog.ui.MenuItemRenderer.getInstance(),c);this.setValue(b)};goog.inherits(goog.ui.MenuItem,goog.ui.Control);goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_="goog-menuitem-mnemonic-separator";goog.ui.MenuItem.ACCELERATOR_CLASS_="goog-menuitem-accel";goog.ui.MenuItem.prototype.getValue=function(){var a=this.getModel();return null!=a?a:this.getCaption()};goog.ui.MenuItem.prototype.setValue=function(a){this.setModel(a)};
goog.ui.MenuItem.prototype.setSelectable=function(a){this.setSupportedState(goog.ui.Component.State.SELECTED,a);this.isChecked()&&!a&&this.setChecked(!1);var b=this.getElement();b&&this.getRenderer().setSelectable(this,b,a)};goog.ui.MenuItem.prototype.setCheckable=function(a){this.setSupportedState(goog.ui.Component.State.CHECKED,a);var b=this.getElement();b&&this.getRenderer().setCheckable(this,b,a)};
goog.ui.MenuItem.prototype.getCaption=function(){var a=this.getContent();if(goog.isArray(a)){var b=goog.ui.MenuItem.ACCELERATOR_CLASS_,c=goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_,a=goog.array.map(a,function(a){return goog.dom.isElement(a)&&(goog.dom.classlist.contains(a,b)||goog.dom.classlist.contains(a,c))?"":goog.dom.getRawTextContent(a)}).join("");return goog.string.collapseBreakingSpaces(a)}return goog.ui.MenuItem.superClass_.getCaption.call(this)};
goog.ui.MenuItem.prototype.handleMouseUp=function(a){var b=this.getParent();if(b){var c=b.openingCoords;b.openingCoords=null;if(c&&goog.isNumber(a.clientX)&&(b=new goog.math.Coordinate(a.clientX,a.clientY),goog.math.Coordinate.equals(c,b)))return}goog.ui.MenuItem.superClass_.handleMouseUp.call(this,a)};goog.ui.MenuItem.prototype.handleKeyEventInternal=function(a){return a.keyCode==this.getMnemonic()&&this.performActionInternal(a)?!0:goog.ui.MenuItem.superClass_.handleKeyEventInternal.call(this,a)};
goog.ui.MenuItem.prototype.setMnemonic=function(a){this.mnemonicKey_=a};goog.ui.MenuItem.prototype.getMnemonic=function(){return this.mnemonicKey_};goog.ui.registry.setDecoratorByClassName(goog.ui.MenuItemRenderer.CSS_CLASS,function(){return new goog.ui.MenuItem(null)});goog.ui.MenuItem.prototype.createDom=function(){goog.ui.MenuItem.superClass_.createDom.call(this);this.getRenderer().correctAriaRole(this,this.getElement())};
goog.ui.MenuItem.prototype.getPreferredAriaRole=function(){return this.isSupportedState(goog.ui.Component.State.CHECKED)?goog.a11y.aria.Role.MENU_ITEM_CHECKBOX:this.isSupportedState(goog.ui.Component.State.SELECTED)?goog.a11y.aria.Role.MENU_ITEM_RADIO:goog.ui.MenuItem.superClass_.getPreferredAriaRole.call(this)};goog.ui.MenuSeparatorRenderer=function(){goog.ui.ControlRenderer.call(this)};goog.inherits(goog.ui.MenuSeparatorRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.MenuSeparatorRenderer);goog.ui.MenuSeparatorRenderer.CSS_CLASS="goog-menuseparator";goog.ui.MenuSeparatorRenderer.prototype.createDom=function(a){return a.getDomHelper().createDom("div",this.getCssClass())};
goog.ui.MenuSeparatorRenderer.prototype.decorate=function(a,b){b.id&&a.setId(b.id);if("HR"==b.tagName){var c=b;b=this.createDom(a);goog.dom.insertSiblingBefore(b,c);goog.dom.removeNode(c)}else goog.dom.classlist.add(b,this.getCssClass());return b};goog.ui.MenuSeparatorRenderer.prototype.setContent=function(a,b){};goog.ui.MenuSeparatorRenderer.prototype.getCssClass=function(){return goog.ui.MenuSeparatorRenderer.CSS_CLASS};goog.ui.Separator=function(a,b){goog.ui.Control.call(this,null,a||goog.ui.MenuSeparatorRenderer.getInstance(),b);this.setSupportedState(goog.ui.Component.State.DISABLED,!1);this.setSupportedState(goog.ui.Component.State.HOVER,!1);this.setSupportedState(goog.ui.Component.State.ACTIVE,!1);this.setSupportedState(goog.ui.Component.State.FOCUSED,!1);this.setStateInternal(goog.ui.Component.State.DISABLED)};goog.inherits(goog.ui.Separator,goog.ui.Control);
goog.ui.Separator.prototype.enterDocument=function(){goog.ui.Separator.superClass_.enterDocument.call(this);var a=this.getElement();goog.asserts.assert(a,"The DOM element for the separator cannot be null.");goog.a11y.aria.setRole(a,"separator")};goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS,function(){return new goog.ui.Separator});goog.ui.MenuRenderer=function(a){goog.ui.ContainerRenderer.call(this,a||goog.a11y.aria.Role.MENU)};goog.inherits(goog.ui.MenuRenderer,goog.ui.ContainerRenderer);goog.addSingletonGetter(goog.ui.MenuRenderer);goog.ui.MenuRenderer.CSS_CLASS="goog-menu";goog.ui.MenuRenderer.prototype.canDecorate=function(a){return"UL"==a.tagName||goog.ui.MenuRenderer.superClass_.canDecorate.call(this,a)};
goog.ui.MenuRenderer.prototype.getDecoratorForChild=function(a){return"HR"==a.tagName?new goog.ui.Separator:goog.ui.MenuRenderer.superClass_.getDecoratorForChild.call(this,a)};goog.ui.MenuRenderer.prototype.containsElement=function(a,b){return goog.dom.contains(a.getElement(),b)};goog.ui.MenuRenderer.prototype.getCssClass=function(){return goog.ui.MenuRenderer.CSS_CLASS};
goog.ui.MenuRenderer.prototype.initializeDom=function(a){goog.ui.MenuRenderer.superClass_.initializeDom.call(this,a);a=a.getElement();goog.asserts.assert(a,"The menu DOM element cannot be null.");goog.a11y.aria.setState(a,goog.a11y.aria.State.HASPOPUP,"true")};goog.ui.MenuSeparator=function(a){goog.ui.Separator.call(this,goog.ui.MenuSeparatorRenderer.getInstance(),a)};goog.inherits(goog.ui.MenuSeparator,goog.ui.Separator);goog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS,function(){return new goog.ui.Separator});goog.ui.Menu=function(a,b){goog.ui.Container.call(this,goog.ui.Container.Orientation.VERTICAL,b||goog.ui.MenuRenderer.getInstance(),a);this.setFocusable(!1)};goog.inherits(goog.ui.Menu,goog.ui.Container);goog.ui.Menu.EventType={BEFORE_SHOW:goog.ui.Component.EventType.BEFORE_SHOW,SHOW:goog.ui.Component.EventType.SHOW,BEFORE_HIDE:goog.ui.Component.EventType.HIDE,HIDE:goog.ui.Component.EventType.HIDE};goog.ui.Menu.CSS_CLASS=goog.ui.MenuRenderer.CSS_CLASS;goog.ui.Menu.prototype.allowAutoFocus_=!0;
goog.ui.Menu.prototype.allowHighlightDisabled_=!1;goog.ui.Menu.prototype.getCssClass=function(){return this.getRenderer().getCssClass()};goog.ui.Menu.prototype.containsElement=function(a){if(this.getRenderer().containsElement(this,a))return!0;for(var b=0,c=this.getChildCount();b<c;b++){var d=this.getChildAt(b);if("function"==typeof d.containsElement&&d.containsElement(a))return!0}return!1};goog.ui.Menu.prototype.addItem=function(a){this.addChild(a,!0)};
goog.ui.Menu.prototype.addItemAt=function(a,b){this.addChildAt(a,b,!0)};goog.ui.Menu.prototype.removeItem=function(a){(a=this.removeChild(a,!0))&&a.dispose()};goog.ui.Menu.prototype.removeItemAt=function(a){(a=this.removeChildAt(a,!0))&&a.dispose()};goog.ui.Menu.prototype.getItemAt=function(a){return this.getChildAt(a)};goog.ui.Menu.prototype.getItemCount=function(){return this.getChildCount()};goog.ui.Menu.prototype.getItems=function(){var a=[];this.forEachChild(function(b){a.push(b)});return a};
goog.ui.Menu.prototype.setPosition=function(a,b){var c=this.isVisible();c||goog.style.setElementShown(this.getElement(),!0);goog.style.setPageOffset(this.getElement(),a,b);c||goog.style.setElementShown(this.getElement(),!1)};goog.ui.Menu.prototype.getPosition=function(){return this.isVisible()?goog.style.getPageOffset(this.getElement()):null};goog.ui.Menu.prototype.setAllowAutoFocus=function(a){(this.allowAutoFocus_=a)&&this.setFocusable(!0)};goog.ui.Menu.prototype.getAllowAutoFocus=function(){return this.allowAutoFocus_};
goog.ui.Menu.prototype.setAllowHighlightDisabled=function(a){this.allowHighlightDisabled_=a};goog.ui.Menu.prototype.getAllowHighlightDisabled=function(){return this.allowHighlightDisabled_};goog.ui.Menu.prototype.setVisible=function(a,b,c){(b=goog.ui.Menu.superClass_.setVisible.call(this,a,b))&&a&&this.isInDocument()&&this.allowAutoFocus_&&this.getKeyEventTarget().focus();a&&c&&goog.isNumber(c.clientX)?this.openingCoords=new goog.math.Coordinate(c.clientX,c.clientY):this.openingCoords=null;return b};
goog.ui.Menu.prototype.handleEnterItem=function(a){this.allowAutoFocus_&&this.getKeyEventTarget().focus();return goog.ui.Menu.superClass_.handleEnterItem.call(this,a)};goog.ui.Menu.prototype.highlightNextPrefix=function(a){var b=new RegExp("^"+goog.string.regExpEscape(a),"i");return this.highlightHelper(function(a,d){var e=0>a?0:a,f=!1;do{++a;a==d&&(a=0,f=!0);var g=this.getChildAt(a).getCaption();if(g&&g.match(b))return a}while(!f||a!=e);return this.getHighlightedIndex()},this.getHighlightedIndex())};
goog.ui.Menu.prototype.canHighlightItem=function(a){return(this.allowHighlightDisabled_||a.isEnabled())&&a.isVisible()&&a.isSupportedState(goog.ui.Component.State.HOVER)};goog.ui.Menu.prototype.decorateInternal=function(a){this.decorateContent(a);goog.ui.Menu.superClass_.decorateInternal.call(this,a)};
goog.ui.Menu.prototype.handleKeyEventInternal=function(a){var b=goog.ui.Menu.superClass_.handleKeyEventInternal.call(this,a);b||this.forEachChild(function(c){!b&&c.getMnemonic&&c.getMnemonic()==a.keyCode&&(this.isEnabled()&&this.setHighlighted(c),b=c.handleKeyEvent(a))},this);return b};goog.ui.Menu.prototype.setHighlightedIndex=function(a){goog.ui.Menu.superClass_.setHighlightedIndex.call(this,a);(a=this.getChildAt(a))&&goog.style.scrollIntoContainerView(a.getElement(),this.getElement())};
goog.ui.Menu.prototype.decorateContent=function(a){var b=this.getRenderer();a=this.getDomHelper().getElementsByTagNameAndClass("div",b.getCssClass()+"-content",a);for(var c=a.length,d=0;d<c;d++)b.decorateChildren(this,a[d])};goog.color={};
goog.color.names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",
darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",
seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};goog.color.parse=function(a){var b={};a=String(a);var c=goog.color.prependHashIfNecessaryHelper(a);if(goog.color.isValidHexColor_(c))return b.hex=goog.color.normalizeHex(c),b.type="hex",b;c=goog.color.isValidRgbColor_(a);if(c.length)return b.hex=goog.color.rgbArrayToHex(c),b.type="rgb",b;if(goog.color.names&&(c=goog.color.names[a.toLowerCase()]))return b.hex=c,b.type="named",b;throw Error(a+" is not a valid color string");};
goog.color.isValidColor=function(a){var b=goog.color.prependHashIfNecessaryHelper(a);return!!(goog.color.isValidHexColor_(b)||goog.color.isValidRgbColor_(a).length||goog.color.names&&goog.color.names[a.toLowerCase()])};goog.color.parseRgb=function(a){var b=goog.color.isValidRgbColor_(a);if(!b.length)throw Error(a+" is not a valid RGB color");return b};goog.color.hexToRgbStyle=function(a){return goog.color.rgbStyle_(goog.color.hexToRgb(a))};goog.color.hexTripletRe_=/#(.)(.)(.)/;
goog.color.normalizeHex=function(a){if(!goog.color.isValidHexColor_(a))throw Error("'"+a+"' is not a valid hex color");4==a.length&&(a=a.replace(goog.color.hexTripletRe_,"#$1$1$2$2$3$3"));return a.toLowerCase()};goog.color.hexToRgb=function(a){a=goog.color.normalizeHex(a);var b=parseInt(a.substr(1,2),16),c=parseInt(a.substr(3,2),16);a=parseInt(a.substr(5,2),16);return[b,c,a]};
goog.color.rgbToHex=function(a,b,c){a=Number(a);b=Number(b);c=Number(c);if(isNaN(a)||0>a||255<a||isNaN(b)||0>b||255<b||isNaN(c)||0>c||255<c)throw Error('"('+a+","+b+","+c+'") is not a valid RGB color');a=goog.color.prependZeroIfNecessaryHelper(a.toString(16));b=goog.color.prependZeroIfNecessaryHelper(b.toString(16));c=goog.color.prependZeroIfNecessaryHelper(c.toString(16));return"#"+a+b+c};goog.color.rgbArrayToHex=function(a){return goog.color.rgbToHex(a[0],a[1],a[2])};
goog.color.rgbToHsl=function(a,b,c){a/=255;b/=255;c/=255;var d=Math.max(a,b,c),e=Math.min(a,b,c),f=0,g=0,h=.5*(d+e);d!=e&&(d==a?f=60*(b-c)/(d-e):d==b?f=60*(c-a)/(d-e)+120:d==c&&(f=60*(a-b)/(d-e)+240),g=0<h&&.5>=h?(d-e)/(2*h):(d-e)/(2-2*h));return[Math.round(f+360)%360,g,h]};goog.color.rgbArrayToHsl=function(a){return goog.color.rgbToHsl(a[0],a[1],a[2])};goog.color.hueToRgb_=function(a,b,c){0>c?c+=1:1<c&&(c-=1);return 1>6*c?a+6*(b-a)*c:1>2*c?b:2>3*c?a+(b-a)*(2/3-c)*6:a};
goog.color.hslToRgb=function(a,b,c){var d=0,e=0,f=0;a/=360;if(0==b)d=e=f=255*c;else var g=f=0,g=.5>c?c*(1+b):c+b-b*c,f=2*c-g,d=255*goog.color.hueToRgb_(f,g,a+1/3),e=255*goog.color.hueToRgb_(f,g,a),f=255*goog.color.hueToRgb_(f,g,a-1/3);return[Math.round(d),Math.round(e),Math.round(f)]};goog.color.hslArrayToRgb=function(a){return goog.color.hslToRgb(a[0],a[1],a[2])};goog.color.validHexColorRe_=/^#(?:[0-9a-f]{3}){1,2}$/i;goog.color.isValidHexColor_=function(a){return goog.color.validHexColorRe_.test(a)};
goog.color.normalizedHexColorRe_=/^#[0-9a-f]{6}$/;goog.color.isNormalizedHexColor_=function(a){return goog.color.normalizedHexColorRe_.test(a)};goog.color.rgbColorRe_=/^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;goog.color.isValidRgbColor_=function(a){var b=a.match(goog.color.rgbColorRe_);if(b){a=Number(b[1]);var c=Number(b[2]),b=Number(b[3]);if(0<=a&&255>=a&&0<=c&&255>=c&&0<=b&&255>=b)return[a,c,b]}return[]};
goog.color.prependZeroIfNecessaryHelper=function(a){return 1==a.length?"0"+a:a};goog.color.prependHashIfNecessaryHelper=function(a){return"#"==a.charAt(0)?a:"#"+a};goog.color.rgbStyle_=function(a){return"rgb("+a.join(",")+")"};
goog.color.hsvToRgb=function(a,b,c){var d=0,e=0,f=0;if(0==b)f=e=d=c;else{var g=Math.floor(a/60),h=a/60-g;a=c*(1-b);var k=c*(1-b*h);b=c*(1-b*(1-h));switch(g){case 1:d=k;e=c;f=a;break;case 2:d=a;e=c;f=b;break;case 3:d=a;e=k;f=c;break;case 4:d=b;e=a;f=c;break;case 5:d=c;e=a;f=k;break;case 6:case 0:d=c,e=b,f=a}}return[Math.floor(d),Math.floor(e),Math.floor(f)]};
goog.color.rgbToHsv=function(a,b,c){var d=Math.max(Math.max(a,b),c),e=Math.min(Math.min(a,b),c);if(e==d)e=a=0;else{var f=d-e,e=f/d;a=60*(a==d?(b-c)/f:b==d?2+(c-a)/f:4+(a-b)/f);0>a&&(a+=360);360<a&&(a-=360)}return[a,e,d]};goog.color.rgbArrayToHsv=function(a){return goog.color.rgbToHsv(a[0],a[1],a[2])};goog.color.hsvArrayToRgb=function(a){return goog.color.hsvToRgb(a[0],a[1],a[2])};goog.color.hexToHsl=function(a){a=goog.color.hexToRgb(a);return goog.color.rgbToHsl(a[0],a[1],a[2])};
goog.color.hslToHex=function(a,b,c){return goog.color.rgbArrayToHex(goog.color.hslToRgb(a,b,c))};goog.color.hslArrayToHex=function(a){return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0],a[1],a[2]))};goog.color.hexToHsv=function(a){return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a))};goog.color.hsvToHex=function(a,b,c){return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a,b,c))};goog.color.hsvArrayToHex=function(a){return goog.color.hsvToHex(a[0],a[1],a[2])};
goog.color.hslDistance=function(a,b){var c,d;c=.5>=a[2]?a[1]*a[2]:a[1]*(1-a[2]);d=.5>=b[2]?b[1]*b[2]:b[1]*(1-b[2]);return(a[2]-b[2])*(a[2]-b[2])+c*c+d*d-2*c*d*Math.cos(2*(a[0]/360-b[0]/360)*Math.PI)};goog.color.blend=function(a,b,c){c=goog.math.clamp(c,0,1);return[Math.round(c*a[0]+(1-c)*b[0]),Math.round(c*a[1]+(1-c)*b[1]),Math.round(c*a[2]+(1-c)*b[2])]};goog.color.darken=function(a,b){return goog.color.blend([0,0,0],a,b)};goog.color.lighten=function(a,b){return goog.color.blend([255,255,255],a,b)};
goog.color.highContrast=function(a,b){for(var c=[],d=0;d<b.length;d++)c.push({color:b[d],diff:goog.color.yiqBrightnessDiff_(b[d],a)+goog.color.colorDiff_(b[d],a)});c.sort(function(a,b){return b.diff-a.diff});return c[0].color};goog.color.yiqBrightness_=function(a){return Math.round((299*a[0]+587*a[1]+114*a[2])/1E3)};goog.color.yiqBrightnessDiff_=function(a,b){return Math.abs(goog.color.yiqBrightness_(a)-goog.color.yiqBrightness_(b))};
goog.color.colorDiff_=function(a,b){return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])+Math.abs(a[2]-b[2])};goog.iter={};goog.iter.StopIteration="StopIteration"in goog.global?goog.global.StopIteration:Error("StopIteration");goog.iter.Iterator=function(){};goog.iter.Iterator.prototype.next=function(){throw goog.iter.StopIteration;};goog.iter.Iterator.prototype.__iterator__=function(a){return this};
goog.iter.toIterator=function(a){if(a instanceof goog.iter.Iterator)return a;if("function"==typeof a.__iterator__)return a.__iterator__(!1);if(goog.isArrayLike(a)){var b=0,c=new goog.iter.Iterator;c.next=function(){for(;;){if(b>=a.length)throw goog.iter.StopIteration;if(b in a)return a[b++];b++}};return c}throw Error("Not implemented");};
goog.iter.forEach=function(a,b,c){if(goog.isArrayLike(a))try{goog.array.forEach(a,b,c)}catch(d){if(d!==goog.iter.StopIteration)throw d;}else{a=goog.iter.toIterator(a);try{for(;;)b.call(c,a.next(),void 0,a)}catch(e){if(e!==goog.iter.StopIteration)throw e;}}};goog.iter.filter=function(a,b,c){var d=goog.iter.toIterator(a);a=new goog.iter.Iterator;a.next=function(){for(;;){var a=d.next();if(b.call(c,a,void 0,d))return a}};return a};
goog.iter.filterFalse=function(a,b,c){return goog.iter.filter(a,goog.functions.not(b),c)};goog.iter.range=function(a,b,c){var d=0,e=a,f=c||1;1<arguments.length&&(d=a,e=b);if(0==f)throw Error("Range step argument must not be zero");var g=new goog.iter.Iterator;g.next=function(){if(0<f&&d>=e||0>f&&d<=e)throw goog.iter.StopIteration;var a=d;d+=f;return a};return g};goog.iter.join=function(a,b){return goog.iter.toArray(a).join(b)};
goog.iter.map=function(a,b,c){var d=goog.iter.toIterator(a);a=new goog.iter.Iterator;a.next=function(){var a=d.next();return b.call(c,a,void 0,d)};return a};goog.iter.reduce=function(a,b,c,d){var e=c;goog.iter.forEach(a,function(a){e=b.call(d,e,a)});return e};goog.iter.some=function(a,b,c){a=goog.iter.toIterator(a);try{for(;;)if(b.call(c,a.next(),void 0,a))return!0}catch(d){if(d!==goog.iter.StopIteration)throw d;}return!1};
goog.iter.every=function(a,b,c){a=goog.iter.toIterator(a);try{for(;;)if(!b.call(c,a.next(),void 0,a))return!1}catch(d){if(d!==goog.iter.StopIteration)throw d;}return!0};goog.iter.chain=function(a){var b=goog.iter.toIterator(arguments),c=new goog.iter.Iterator,d=null;c.next=function(){for(;;){if(null==d){var a=b.next();d=goog.iter.toIterator(a)}try{return d.next()}catch(c){if(c!==goog.iter.StopIteration)throw c;d=null}}};return c};
goog.iter.chainFromIterable=function(a){return goog.iter.chain.apply(void 0,a)};goog.iter.dropWhile=function(a,b,c){var d=goog.iter.toIterator(a);a=new goog.iter.Iterator;var e=!0;a.next=function(){for(;;){var a=d.next();if(!e||!b.call(c,a,void 0,d))return e=!1,a}};return a};goog.iter.takeWhile=function(a,b,c){var d=goog.iter.toIterator(a);a=new goog.iter.Iterator;var e=!0;a.next=function(){for(;;)if(e){var a=d.next();if(b.call(c,a,void 0,d))return a;e=!1}else throw goog.iter.StopIteration;};return a};
goog.iter.toArray=function(a){if(goog.isArrayLike(a))return goog.array.toArray(a);a=goog.iter.toIterator(a);var b=[];goog.iter.forEach(a,function(a){b.push(a)});return b};goog.iter.equals=function(a,b){var c=goog.iter.zipLongest({},a,b);return goog.iter.every(c,function(a){return a[0]==a[1]})};goog.iter.nextOrValue=function(a,b){try{return goog.iter.toIterator(a).next()}catch(c){if(c!=goog.iter.StopIteration)throw c;return b}};
goog.iter.product=function(a){if(goog.array.some(arguments,function(a){return!a.length})||!arguments.length)return new goog.iter.Iterator;var b=new goog.iter.Iterator,c=arguments,d=goog.array.repeat(0,c.length);b.next=function(){if(d){for(var a=goog.array.map(d,function(a,b){return c[b][a]}),b=d.length-1;0<=b;b--){goog.asserts.assert(d);if(d[b]<c[b].length-1){d[b]++;break}if(0==b){d=null;break}d[b]=0}return a}throw goog.iter.StopIteration;};return b};
goog.iter.cycle=function(a){var b=goog.iter.toIterator(a),c=[],d=0;a=new goog.iter.Iterator;var e=!1;a.next=function(){var a=null;if(!e)try{return a=b.next(),c.push(a),a}catch(g){if(g!=goog.iter.StopIteration||goog.array.isEmpty(c))throw g;e=!0}a=c[d];d=(d+1)%c.length;return a};return a};goog.iter.count=function(a,b){var c=a||0,d=goog.isDef(b)?b:1,e=new goog.iter.Iterator;e.next=function(){var a=c;c+=d;return a};return e};
goog.iter.repeat=function(a){var b=new goog.iter.Iterator;b.next=goog.functions.constant(a);return b};goog.iter.accumulate=function(a){var b=goog.iter.toIterator(a),c=0;a=new goog.iter.Iterator;a.next=function(){return c+=b.next()};return a};goog.iter.zip=function(a){var b=arguments,c=new goog.iter.Iterator;if(0<b.length){var d=goog.array.map(b,goog.iter.toIterator);c.next=function(){return goog.array.map(d,function(a){return a.next()})}}return c};
goog.iter.zipLongest=function(a,b){var c=goog.array.slice(arguments,1),d=new goog.iter.Iterator;if(0<c.length){var e=goog.array.map(c,goog.iter.toIterator);d.next=function(){var b=!1,c=goog.array.map(e,function(c){var d;try{d=c.next(),b=!0}catch(e){if(e!==goog.iter.StopIteration)throw e;d=a}return d});if(!b)throw goog.iter.StopIteration;return c}}return d};goog.iter.compress=function(a,b){var c=goog.iter.toIterator(b);return goog.iter.filter(a,function(){return!!c.next()})};
goog.iter.GroupByIterator_=function(a,b){this.iterator=goog.iter.toIterator(a);this.keyFunc=b||goog.functions.identity};goog.inherits(goog.iter.GroupByIterator_,goog.iter.Iterator);goog.iter.GroupByIterator_.prototype.next=function(){for(;this.currentKey==this.targetKey;)this.currentValue=this.iterator.next(),this.currentKey=this.keyFunc(this.currentValue);this.targetKey=this.currentKey;return[this.currentKey,this.groupItems_(this.targetKey)]};
goog.iter.GroupByIterator_.prototype.groupItems_=function(a){for(var b=[];this.currentKey==a;){b.push(this.currentValue);try{this.currentValue=this.iterator.next()}catch(c){if(c!==goog.iter.StopIteration)throw c;break}this.currentKey=this.keyFunc(this.currentValue)}return b};goog.iter.groupBy=function(a,b){return new goog.iter.GroupByIterator_(a,b)};
goog.iter.starMap=function(a,b,c){var d=goog.iter.toIterator(a);a=new goog.iter.Iterator;a.next=function(){var a=goog.iter.toArray(d.next());return b.apply(c,goog.array.concat(a,void 0,d))};return a};
goog.iter.tee=function(a,b){var c=goog.iter.toIterator(a),d=goog.isNumber(b)?b:2,e=goog.array.map(goog.array.range(d),function(){return[]}),f=function(){var a=c.next();goog.array.forEach(e,function(b){b.push(a)})};return goog.array.map(e,function(a){var b=new goog.iter.Iterator;b.next=function(){goog.array.isEmpty(a)&&f();goog.asserts.assert(!goog.array.isEmpty(a));return a.shift()};return b})};goog.iter.enumerate=function(a,b){return goog.iter.zip(goog.iter.count(b),a)};
goog.iter.limit=function(a,b){goog.asserts.assert(goog.math.isInt(b)&&0<=b);var c=goog.iter.toIterator(a),d=new goog.iter.Iterator,e=b;d.next=function(){if(0<e--)return c.next();throw goog.iter.StopIteration;};return d};goog.iter.consume=function(a,b){goog.asserts.assert(goog.math.isInt(b)&&0<=b);for(var c=goog.iter.toIterator(a);0<b--;)goog.iter.nextOrValue(c,null);return c};
goog.iter.slice=function(a,b,c){goog.asserts.assert(goog.math.isInt(b)&&0<=b);a=goog.iter.consume(a,b);goog.isNumber(c)&&(goog.asserts.assert(goog.math.isInt(c)&&c>=b),a=goog.iter.limit(a,c-b));return a};goog.iter.hasDuplicates_=function(a){var b=[];goog.array.removeDuplicates(a,b);return a.length!=b.length};goog.iter.permutations=function(a,b){var c=goog.iter.toArray(a),d=goog.isNumber(b)?b:c.length,c=goog.array.repeat(c,d),c=goog.iter.product.apply(void 0,c);return goog.iter.filter(c,function(a){return!goog.iter.hasDuplicates_(a)})};
goog.iter.combinations=function(a,b){function c(a){return d[a]}var d=goog.iter.toArray(a),e=goog.iter.range(d.length),e=goog.iter.permutations(e,b),f=goog.iter.filter(e,function(a){return goog.array.isSorted(a)}),e=new goog.iter.Iterator;e.next=function(){return goog.array.map(f.next(),c)};return e};
goog.iter.combinationsWithReplacement=function(a,b){function c(a){return d[a]}var d=goog.iter.toArray(a),e=goog.array.range(d.length),e=goog.array.repeat(e,b),e=goog.iter.product.apply(void 0,e),f=goog.iter.filter(e,function(a){return goog.array.isSorted(a)}),e=new goog.iter.Iterator;e.next=function(){return goog.array.map(f.next(),c)};return e};goog.dom.TagWalkType={START_TAG:1,OTHER:0,END_TAG:-1};goog.dom.TagIterator=function(a,b,c,d,e){this.reversed=!!b;a&&this.setPosition(a,d);this.depth=void 0!=e?e:this.tagType||0;this.reversed&&(this.depth*=-1);this.constrained=!c};goog.inherits(goog.dom.TagIterator,goog.iter.Iterator);goog.dom.TagIterator.prototype.node=null;goog.dom.TagIterator.prototype.tagType=goog.dom.TagWalkType.OTHER;goog.dom.TagIterator.prototype.started_=!1;
goog.dom.TagIterator.prototype.setPosition=function(a,b,c){if(this.node=a)goog.isNumber(b)?this.tagType=b:this.tagType=this.node.nodeType!=goog.dom.NodeType.ELEMENT?goog.dom.TagWalkType.OTHER:this.reversed?goog.dom.TagWalkType.END_TAG:goog.dom.TagWalkType.START_TAG;goog.isNumber(c)&&(this.depth=c)};goog.dom.TagIterator.prototype.copyFrom=function(a){this.node=a.node;this.tagType=a.tagType;this.depth=a.depth;this.reversed=a.reversed;this.constrained=a.constrained};
goog.dom.TagIterator.prototype.clone=function(){return new goog.dom.TagIterator(this.node,this.reversed,!this.constrained,this.tagType,this.depth)};goog.dom.TagIterator.prototype.skipTag=function(){var a=this.reversed?goog.dom.TagWalkType.END_TAG:goog.dom.TagWalkType.START_TAG;this.tagType==a&&(this.tagType=-1*a,this.depth+=this.tagType*(this.reversed?-1:1))};
goog.dom.TagIterator.prototype.restartTag=function(){var a=this.reversed?goog.dom.TagWalkType.START_TAG:goog.dom.TagWalkType.END_TAG;this.tagType==a&&(this.tagType=-1*a,this.depth+=this.tagType*(this.reversed?-1:1))};
goog.dom.TagIterator.prototype.next=function(){var a;if(this.started_){if(!this.node||this.constrained&&0==this.depth)throw goog.iter.StopIteration;a=this.node;var b=this.reversed?goog.dom.TagWalkType.END_TAG:goog.dom.TagWalkType.START_TAG;if(this.tagType==b){var c=this.reversed?a.lastChild:a.firstChild;c?this.setPosition(c):this.setPosition(a,-1*b)}else(c=this.reversed?a.previousSibling:a.nextSibling)?this.setPosition(c):this.setPosition(a.parentNode,-1*b);this.depth+=this.tagType*(this.reversed?
-1:1)}else this.started_=!0;a=this.node;if(!this.node)throw goog.iter.StopIteration;return a};goog.dom.TagIterator.prototype.isStarted=function(){return this.started_};goog.dom.TagIterator.prototype.isStartTag=function(){return this.tagType==goog.dom.TagWalkType.START_TAG};goog.dom.TagIterator.prototype.isEndTag=function(){return this.tagType==goog.dom.TagWalkType.END_TAG};goog.dom.TagIterator.prototype.isNonElement=function(){return this.tagType==goog.dom.TagWalkType.OTHER};
goog.dom.TagIterator.prototype.equals=function(a){return a.node==this.node&&(!this.node||a.tagType==this.tagType)};goog.dom.TagIterator.prototype.splice=function(a){var b=this.node;this.restartTag();this.reversed=!this.reversed;goog.dom.TagIterator.prototype.next.call(this);this.reversed=!this.reversed;for(var c=goog.isArrayLike(arguments[0])?arguments[0]:arguments,d=c.length-1;0<=d;d--)goog.dom.insertSiblingAfter(c[d],b);goog.dom.removeNode(b)};goog.dom.NodeIterator=function(a,b,c,d){goog.dom.TagIterator.call(this,a,b,c,null,d)};goog.inherits(goog.dom.NodeIterator,goog.dom.TagIterator);goog.dom.NodeIterator.prototype.next=function(){do goog.dom.NodeIterator.superClass_.next.call(this);while(this.isEndTag());return this.node};goog.ui.PaletteRenderer=function(){goog.ui.ControlRenderer.call(this)};goog.inherits(goog.ui.PaletteRenderer,goog.ui.ControlRenderer);goog.addSingletonGetter(goog.ui.PaletteRenderer);goog.ui.PaletteRenderer.cellId_=0;goog.ui.PaletteRenderer.CSS_CLASS="goog-palette";
goog.ui.PaletteRenderer.prototype.createDom=function(a){var b=this.getClassNames(a);a=a.getDomHelper().createDom(goog.dom.TagName.DIV,b?b.join(" "):null,this.createGrid(a.getContent(),a.getSize(),a.getDomHelper()));goog.a11y.aria.setRole(a,goog.a11y.aria.Role.GRID);return a};
goog.ui.PaletteRenderer.prototype.createGrid=function(a,b,c){for(var d=[],e=0,f=0;e<b.height;e++){for(var g=[],h=0;h<b.width;h++){var k=a&&a[f++];g.push(this.createCell(k,c))}d.push(this.createRow(g,c))}return this.createTable(d,c)};goog.ui.PaletteRenderer.prototype.createTable=function(a,b){var c=b.createDom(goog.dom.TagName.TABLE,this.getCssClass()+"-table",b.createDom(goog.dom.TagName.TBODY,this.getCssClass()+"-body",a));c.cellSpacing=0;c.cellPadding=0;return c};
goog.ui.PaletteRenderer.prototype.createRow=function(a,b){var c=b.createDom(goog.dom.TagName.TR,this.getCssClass()+"-row",a);goog.a11y.aria.setRole(c,goog.a11y.aria.Role.ROW);return c};
goog.ui.PaletteRenderer.prototype.createCell=function(a,b){var c=b.createDom(goog.dom.TagName.TD,{"class":this.getCssClass()+"-cell",id:this.getCssClass()+"-cell-"+goog.ui.PaletteRenderer.cellId_++},a);goog.a11y.aria.setRole(c,goog.a11y.aria.Role.GRIDCELL);goog.a11y.aria.setState(c,goog.a11y.aria.State.SELECTED,!1);if(!goog.dom.getTextContent(c)&&!goog.a11y.aria.getLabel(c)){var d=this.findAriaLabelForCell_(c);d&&goog.a11y.aria.setLabel(c,d)}return c};
goog.ui.PaletteRenderer.prototype.findAriaLabelForCell_=function(a){a=new goog.dom.NodeIterator(a);for(var b="",c;!b&&(c=goog.iter.nextOrValue(a,null));)c.nodeType==goog.dom.NodeType.ELEMENT&&(b=goog.a11y.aria.getLabel(c)||c.title);return b};goog.ui.PaletteRenderer.prototype.canDecorate=function(a){return!1};goog.ui.PaletteRenderer.prototype.decorate=function(a,b){return null};
goog.ui.PaletteRenderer.prototype.setContent=function(a,b){if(a){var c=goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.TBODY,this.getCssClass()+"-body",a)[0];if(c){var d=0;goog.array.forEach(c.rows,function(a){goog.array.forEach(a.cells,function(a){goog.dom.removeChildren(a);if(b){var c=b[d++];c&&goog.dom.appendChild(a,c)}})});if(d<b.length){for(var e=[],f=goog.dom.getDomHelper(a),g=c.rows[0].cells.length;d<b.length;){var h=b[d++];e.push(this.createCell(h,f));e.length==g&&(h=this.createRow(e,
f),goog.dom.appendChild(c,h),e.length=0)}if(0<e.length){for(;e.length<g;)e.push(this.createCell("",f));h=this.createRow(e,f);goog.dom.appendChild(c,h)}}}goog.style.setUnselectable(a,!0,goog.userAgent.GECKO)}};goog.ui.PaletteRenderer.prototype.getContainingItem=function(a,b){for(var c=a.getElement();b&&b.nodeType==goog.dom.NodeType.ELEMENT&&b!=c;){if(b.tagName==goog.dom.TagName.TD&&goog.dom.classlist.contains(b,this.getCssClass()+"-cell"))return b.firstChild;b=b.parentNode}return null};
goog.ui.PaletteRenderer.prototype.highlightCell=function(a,b,c){b&&(b=this.getCellForItem(b),goog.asserts.assert(b),goog.dom.classlist.enable(b,this.getCssClass()+"-cell-hover",c),goog.a11y.aria.setState(a.getElementStrict(),goog.a11y.aria.State.ACTIVEDESCENDANT,b.id))};goog.ui.PaletteRenderer.prototype.getCellForItem=function(a){return a?a.parentNode:null};
goog.ui.PaletteRenderer.prototype.selectCell=function(a,b,c){b&&(a=b.parentNode,goog.dom.classlist.enable(a,this.getCssClass()+"-cell-selected",c),goog.a11y.aria.setState(a,goog.a11y.aria.State.SELECTED,c))};goog.ui.PaletteRenderer.prototype.getCssClass=function(){return goog.ui.PaletteRenderer.CSS_CLASS};goog.ui.SelectionModel=function(a){goog.events.EventTarget.call(this);this.items_=[];this.addItems(a)};goog.inherits(goog.ui.SelectionModel,goog.events.EventTarget);goog.ui.SelectionModel.prototype.selectedItem_=null;goog.ui.SelectionModel.prototype.selectionHandler_=null;goog.ui.SelectionModel.prototype.getSelectionHandler=function(){return this.selectionHandler_};goog.ui.SelectionModel.prototype.setSelectionHandler=function(a){this.selectionHandler_=a};
goog.ui.SelectionModel.prototype.getItemCount=function(){return this.items_.length};goog.ui.SelectionModel.prototype.indexOfItem=function(a){return a?goog.array.indexOf(this.items_,a):-1};goog.ui.SelectionModel.prototype.getFirst=function(){return this.items_[0]};goog.ui.SelectionModel.prototype.getLast=function(){return this.items_[this.items_.length-1]};goog.ui.SelectionModel.prototype.getItemAt=function(a){return this.items_[a]||null};
goog.ui.SelectionModel.prototype.addItems=function(a){a&&(goog.array.forEach(a,function(a){this.selectItem_(a,!1)},this),goog.array.extend(this.items_,a))};goog.ui.SelectionModel.prototype.addItem=function(a){this.addItemAt(a,this.getItemCount())};goog.ui.SelectionModel.prototype.addItemAt=function(a,b){a&&(this.selectItem_(a,!1),goog.array.insertAt(this.items_,a,b))};
goog.ui.SelectionModel.prototype.removeItem=function(a){a&&goog.array.remove(this.items_,a)&&a==this.selectedItem_&&(this.selectedItem_=null,this.dispatchEvent(goog.events.EventType.SELECT))};goog.ui.SelectionModel.prototype.removeItemAt=function(a){this.removeItem(this.getItemAt(a))};goog.ui.SelectionModel.prototype.getSelectedItem=function(){return this.selectedItem_};goog.ui.SelectionModel.prototype.getItems=function(){return goog.array.clone(this.items_)};
goog.ui.SelectionModel.prototype.setSelectedItem=function(a){a!=this.selectedItem_&&(this.selectItem_(this.selectedItem_,!1),this.selectedItem_=a,this.selectItem_(a,!0));this.dispatchEvent(goog.events.EventType.SELECT)};goog.ui.SelectionModel.prototype.getSelectedIndex=function(){return this.indexOfItem(this.selectedItem_)};goog.ui.SelectionModel.prototype.setSelectedIndex=function(a){this.setSelectedItem(this.getItemAt(a))};
goog.ui.SelectionModel.prototype.clear=function(){goog.array.clear(this.items_);this.selectedItem_=null};goog.ui.SelectionModel.prototype.disposeInternal=function(){goog.ui.SelectionModel.superClass_.disposeInternal.call(this);delete this.items_;this.selectedItem_=null};goog.ui.SelectionModel.prototype.selectItem_=function(a,b){a&&("function"==typeof this.selectionHandler_?this.selectionHandler_(a,b):"function"==typeof a.setSelected&&a.setSelected(b))};goog.ui.Palette=function(a,b,c){goog.ui.Control.call(this,a,b||goog.ui.PaletteRenderer.getInstance(),c);this.setAutoStates(goog.ui.Component.State.CHECKED|goog.ui.Component.State.SELECTED|goog.ui.Component.State.OPENED,!1);this.currentCellControl_=new goog.ui.Palette.CurrentCell_;this.currentCellControl_.setParentEventTarget(this);this.lastHighlightedIndex_=-1};goog.inherits(goog.ui.Palette,goog.ui.Control);goog.ui.Palette.EventType={AFTER_HIGHLIGHT:goog.events.getUniqueId("afterhighlight")};
goog.ui.Palette.prototype.size_=null;goog.ui.Palette.prototype.highlightedIndex_=-1;goog.ui.Palette.prototype.selectionModel_=null;goog.ui.Palette.prototype.disposeInternal=function(){goog.ui.Palette.superClass_.disposeInternal.call(this);this.selectionModel_&&(this.selectionModel_.dispose(),this.selectionModel_=null);this.size_=null;this.currentCellControl_.dispose()};
goog.ui.Palette.prototype.setContentInternal=function(a){goog.ui.Palette.superClass_.setContentInternal.call(this,a);this.adjustSize_();this.selectionModel_?(this.selectionModel_.clear(),this.selectionModel_.addItems(a)):(this.selectionModel_=new goog.ui.SelectionModel(a),this.selectionModel_.setSelectionHandler(goog.bind(this.selectItem_,this)),this.getHandler().listen(this.selectionModel_,goog.events.EventType.SELECT,this.handleSelectionChange));this.highlightedIndex_=-1};
goog.ui.Palette.prototype.getCaption=function(){return""};goog.ui.Palette.prototype.setCaption=function(a){};goog.ui.Palette.prototype.handleMouseOver=function(a){goog.ui.Palette.superClass_.handleMouseOver.call(this,a);var b=this.getRenderer().getContainingItem(this,a.target);b&&a.relatedTarget&&goog.dom.contains(b,a.relatedTarget)||b!=this.getHighlightedItem()&&this.setHighlightedItem(b)};
goog.ui.Palette.prototype.handleMouseDown=function(a){goog.ui.Palette.superClass_.handleMouseDown.call(this,a);this.isActive()&&(a=this.getRenderer().getContainingItem(this,a.target),a!=this.getHighlightedItem()&&this.setHighlightedItem(a))};goog.ui.Palette.prototype.performActionInternal=function(a){var b=this.getHighlightedItem();return b?(this.setSelectedItem(b),goog.ui.Palette.superClass_.performActionInternal.call(this,a)):!1};
goog.ui.Palette.prototype.handleKeyEvent=function(a){var b=this.getContent(),b=b?b.length:0,c=this.size_.width;if(0==b||!this.isEnabled())return!1;if(a.keyCode==goog.events.KeyCodes.ENTER||a.keyCode==goog.events.KeyCodes.SPACE)return this.performActionInternal(a);if(a.keyCode==goog.events.KeyCodes.HOME)return this.setHighlightedIndex(0),!0;if(a.keyCode==goog.events.KeyCodes.END)return this.setHighlightedIndex(b-1),!0;var d=0>this.highlightedIndex_?this.getSelectedIndex():this.highlightedIndex_;switch(a.keyCode){case goog.events.KeyCodes.LEFT:if(-1==
d||0==d)d=b;this.setHighlightedIndex(d-1);a.preventDefault();return!0;case goog.events.KeyCodes.RIGHT:return d==b-1&&(d=-1),this.setHighlightedIndex(d+1),a.preventDefault(),!0;case goog.events.KeyCodes.UP:-1==d&&(d=b+c-1);if(d>=c)return this.setHighlightedIndex(d-c),a.preventDefault(),!0;break;case goog.events.KeyCodes.DOWN:if(-1==d&&(d=-c),d<b-c)return this.setHighlightedIndex(d+c),a.preventDefault(),!0}return!1};goog.ui.Palette.prototype.handleSelectionChange=function(a){};
goog.ui.Palette.prototype.getSize=function(){return this.size_};goog.ui.Palette.prototype.setSize=function(a,b){if(this.getElement())throw Error(goog.ui.Component.Error.ALREADY_RENDERED);this.size_=goog.isNumber(a)?new goog.math.Size(a,b):a;this.adjustSize_()};goog.ui.Palette.prototype.getHighlightedIndex=function(){return this.highlightedIndex_};goog.ui.Palette.prototype.getHighlightedItem=function(){var a=this.getContent();return a&&a[this.highlightedIndex_]};
goog.ui.Palette.prototype.getHighlightedCellElement_=function(){return this.getRenderer().getCellForItem(this.getHighlightedItem())};goog.ui.Palette.prototype.setHighlightedIndex=function(a){a!=this.highlightedIndex_&&(this.highlightIndex_(this.highlightedIndex_,!1),this.lastHighlightedIndex_=this.highlightedIndex_,this.highlightedIndex_=a,this.highlightIndex_(a,!0),this.dispatchEvent(goog.ui.Palette.EventType.AFTER_HIGHLIGHT))};
goog.ui.Palette.prototype.setHighlightedItem=function(a){var b=this.getContent();this.setHighlightedIndex(b?goog.array.indexOf(b,a):-1)};goog.ui.Palette.prototype.getSelectedIndex=function(){return this.selectionModel_?this.selectionModel_.getSelectedIndex():-1};goog.ui.Palette.prototype.getSelectedItem=function(){return this.selectionModel_?this.selectionModel_.getSelectedItem():null};goog.ui.Palette.prototype.setSelectedIndex=function(a){this.selectionModel_&&this.selectionModel_.setSelectedIndex(a)};
goog.ui.Palette.prototype.setSelectedItem=function(a){this.selectionModel_&&this.selectionModel_.setSelectedItem(a)};goog.ui.Palette.prototype.highlightIndex_=function(a,b){if(this.getElement()){var c=this.getContent();if(c&&0<=a&&a<c.length){var d=this.getHighlightedCellElement_();this.currentCellControl_.getElement()!=d&&this.currentCellControl_.setElementInternal(d);this.currentCellControl_.tryHighlight(b)&&this.getRenderer().highlightCell(this,c[a],b)}}};
goog.ui.Palette.prototype.setHighlighted=function(a){goog.ui.Palette.superClass_.setHighlighted.call(this,a);a&&-1==this.highlightedIndex_?this.setHighlightedIndex(-1<this.lastHighlightedIndex_?this.lastHighlightedIndex_:0):a||this.setHighlightedIndex(-1)};goog.ui.Palette.prototype.selectItem_=function(a,b){this.getElement()&&this.getRenderer().selectCell(this,a,b)};
goog.ui.Palette.prototype.adjustSize_=function(){var a=this.getContent();if(a)if(this.size_&&this.size_.width){if(a=Math.ceil(a.length/this.size_.width),!goog.isNumber(this.size_.height)||this.size_.height<a)this.size_.height=a}else a=Math.ceil(Math.sqrt(a.length)),this.size_=new goog.math.Size(a,a);else this.size_=new goog.math.Size(0,0)};goog.ui.Palette.CurrentCell_=function(){goog.ui.Control.call(this,null);this.setDispatchTransitionEvents(goog.ui.Component.State.HOVER,!0)};
goog.inherits(goog.ui.Palette.CurrentCell_,goog.ui.Control);goog.ui.Palette.CurrentCell_.prototype.tryHighlight=function(a){this.setHighlighted(a);return this.isHighlighted()==a};goog.ui.ColorPalette=function(a,b,c){this.colors_=a||[];goog.ui.Palette.call(this,null,b||goog.ui.PaletteRenderer.getInstance(),c);this.setColors(this.colors_)};goog.inherits(goog.ui.ColorPalette,goog.ui.Palette);goog.ui.ColorPalette.prototype.normalizedColors_=null;goog.ui.ColorPalette.prototype.labels_=null;goog.ui.ColorPalette.prototype.getColors=function(){return this.colors_};
goog.ui.ColorPalette.prototype.setColors=function(a,b){this.colors_=a;this.labels_=b||null;this.normalizedColors_=null;this.setContent(this.createColorNodes())};goog.ui.ColorPalette.prototype.getSelectedColor=function(){var a=this.getSelectedItem();return a?(a=goog.style.getStyle(a,"background-color"),goog.ui.ColorPalette.parseColor_(a)):null};
goog.ui.ColorPalette.prototype.setSelectedColor=function(a){a=goog.ui.ColorPalette.parseColor_(a);this.normalizedColors_||(this.normalizedColors_=goog.array.map(this.colors_,function(a){return goog.ui.ColorPalette.parseColor_(a)}));this.setSelectedIndex(a?goog.array.indexOf(this.normalizedColors_,a):-1)};
goog.ui.ColorPalette.prototype.createColorNodes=function(){return goog.array.map(this.colors_,function(a,b){var c=this.getDomHelper().createDom("div",{"class":this.getRenderer().getCssClass()+"-colorswatch",style:"background-color:"+a});c.title=this.labels_&&this.labels_[b]?this.labels_[b]:"#"==a.charAt(0)?"RGB ("+goog.color.hexToRgb(a).join(", ")+")":a;return c},this)};goog.ui.ColorPalette.parseColor_=function(a){if(a)try{return goog.color.parse(a).hex}catch(b){}return null};goog.ui.ColorPicker=function(a,b){goog.ui.Component.call(this,a);this.colorPalette_=b||null;this.getHandler().listen(this,goog.ui.Component.EventType.ACTION,this.onColorPaletteAction_)};goog.inherits(goog.ui.ColorPicker,goog.ui.Component);goog.ui.ColorPicker.DEFAULT_NUM_COLS=5;goog.ui.ColorPicker.EventType={CHANGE:"change"};goog.ui.ColorPicker.prototype.focusable_=!0;goog.ui.ColorPicker.prototype.getColors=function(){return this.colorPalette_?this.colorPalette_.getColors():null};
goog.ui.ColorPicker.prototype.setColors=function(a){this.colorPalette_?this.colorPalette_.setColors(a):this.createColorPalette_(a)};goog.ui.ColorPicker.prototype.addColors=function(a){this.setColors(a)};goog.ui.ColorPicker.prototype.setSize=function(a){this.colorPalette_||this.createColorPalette_([]);this.colorPalette_.setSize(a)};goog.ui.ColorPicker.prototype.getSize=function(){return this.colorPalette_?this.colorPalette_.getSize():null};goog.ui.ColorPicker.prototype.setColumnCount=function(a){this.setSize(a)};
goog.ui.ColorPicker.prototype.getSelectedIndex=function(){return this.colorPalette_?this.colorPalette_.getSelectedIndex():-1};goog.ui.ColorPicker.prototype.setSelectedIndex=function(a){this.colorPalette_&&this.colorPalette_.setSelectedIndex(a)};goog.ui.ColorPicker.prototype.getSelectedColor=function(){return this.colorPalette_?this.colorPalette_.getSelectedColor():null};goog.ui.ColorPicker.prototype.setSelectedColor=function(a){this.colorPalette_&&this.colorPalette_.setSelectedColor(a)};
goog.ui.ColorPicker.prototype.isFocusable=function(){return this.focusable_};goog.ui.ColorPicker.prototype.setFocusable=function(a){this.focusable_=a;this.colorPalette_&&this.colorPalette_.setSupportedState(goog.ui.Component.State.FOCUSED,a)};goog.ui.ColorPicker.prototype.canDecorate=function(a){return!1};
goog.ui.ColorPicker.prototype.enterDocument=function(){goog.ui.ColorPicker.superClass_.enterDocument.call(this);this.colorPalette_&&this.colorPalette_.render(this.getElement());this.getElement().unselectable="on"};goog.ui.ColorPicker.prototype.disposeInternal=function(){goog.ui.ColorPicker.superClass_.disposeInternal.call(this);this.colorPalette_&&(this.colorPalette_.dispose(),this.colorPalette_=null)};goog.ui.ColorPicker.prototype.focus=function(){this.colorPalette_&&this.colorPalette_.getElement().focus()};
goog.ui.ColorPicker.prototype.onColorPaletteAction_=function(a){a.stopPropagation();this.dispatchEvent(goog.ui.ColorPicker.EventType.CHANGE)};goog.ui.ColorPicker.prototype.createColorPalette_=function(a){a=new goog.ui.ColorPalette(a,null,this.getDomHelper());a.setSize(goog.ui.ColorPicker.DEFAULT_NUM_COLS);a.setSupportedState(goog.ui.Component.State.FOCUSED,this.focusable_);this.addChild(a);this.colorPalette_=a;this.isInDocument()&&this.colorPalette_.render(this.getElement())};
goog.ui.ColorPicker.createSimpleColorGrid=function(a){a=new goog.ui.ColorPicker(a);a.setSize(7);a.setColors(goog.ui.ColorPicker.SIMPLE_GRID_COLORS);return a};goog.ui.ColorPicker.SIMPLE_GRID_COLORS="#ffffff #cccccc #c0c0c0 #999999 #666666 #333333 #000000 #ffcccc #ff6666 #ff0000 #cc0000 #990000 #660000 #330000 #ffcc99 #ff9966 #ff9900 #ff6600 #cc6600 #993300 #663300 #ffff99 #ffff66 #ffcc66 #ffcc33 #cc9933 #996633 #663333 #ffffcc #ffff33 #ffff00 #ffcc00 #999900 #666600 #333300 #99ff99 #66ff99 #33ff33 #33cc00 #009900 #006600 #003300 #99ffff #33ffff #66cccc #00cccc #339999 #336666 #003333 #ccffff #66ffff #33ccff #3366ff #3333ff #000099 #000066 #ccccff #9999ff #6666cc #6633ff #6600cc #333399 #330099 #ffccff #ff99ff #cc66cc #cc33cc #993399 #663366 #330033".split(" ");goog.dom.tags={};goog.dom.tags.VOID_TAGS_=goog.object.createSet("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));goog.dom.tags.isVoidTag=function(a){return!0===goog.dom.tags.VOID_TAGS_[a]};goog.string.TypedString=function(){};goog.string.Const=function(){this.stringConstValueWithSecurityContract__googStringSecurityPrivate_="";this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_=goog.string.Const.TYPE_MARKER_};goog.string.Const.prototype.implementsGoogStringTypedString=!0;goog.string.Const.prototype.getTypedStringValue=function(){return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_};
goog.string.Const.prototype.toString=function(){return"Const{"+this.stringConstValueWithSecurityContract__googStringSecurityPrivate_+"}"};goog.string.Const.unwrap=function(a){if(a instanceof goog.string.Const&&a.constructor===goog.string.Const&&a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_===goog.string.Const.TYPE_MARKER_)return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;goog.asserts.fail("expected object of type Const, got '"+a+"'");return"type_error:Const"};
goog.string.Const.from=function(a){return goog.string.Const.create__googStringSecurityPrivate_(a)};goog.string.Const.TYPE_MARKER_={};goog.string.Const.create__googStringSecurityPrivate_=function(a){var b=new goog.string.Const;b.stringConstValueWithSecurityContract__googStringSecurityPrivate_=a;return b};goog.html={};goog.html.SafeStyle=function(){this.privateDoNotAccessOrElseSafeStyleWrappedValue_="";this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.SafeStyle.prototype.implementsGoogStringTypedString=!0;
goog.html.SafeStyle.fromConstant=function(a){a=goog.string.Const.unwrap(a);if(0===a.length)return goog.html.SafeStyle.EMPTY;goog.asserts.assert(!/[<>]/.test(a),"Forbidden characters in style string: "+a);goog.asserts.assert(goog.string.endsWith(a,";"),"Last character of style string is not ';': "+a);goog.asserts.assert(goog.string.contains(a,":"),"Style string must contain at least one ':', to specify a \"name: value\" pair: "+a);return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse_(a)};
goog.html.SafeStyle.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeStyleWrappedValue_};goog.DEBUG&&(goog.html.SafeStyle.prototype.toString=function(){return"SafeStyle{"+this.privateDoNotAccessOrElseSafeStyleWrappedValue_+"}"});
goog.html.SafeStyle.unwrap=function(a){if(a instanceof goog.html.SafeStyle&&a.constructor===goog.html.SafeStyle&&a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;goog.asserts.fail("expected object of type SafeStyle, got '"+a+"'");return"type_error:SafeStyle"};
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse_=function(a){var b=new goog.html.SafeStyle;b.privateDoNotAccessOrElseSafeStyleWrappedValue_=a;return b};goog.html.SafeStyle.EMPTY=goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse_("");goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};goog.i18n={};goog.i18n.bidi={};goog.i18n.bidi.FORCE_RTL=!1;
goog.i18n.bidi.IS_RTL=goog.i18n.bidi.FORCE_RTL||("ar"==goog.LOCALE.substring(0,2).toLowerCase()||"fa"==goog.LOCALE.substring(0,2).toLowerCase()||"he"==goog.LOCALE.substring(0,2).toLowerCase()||"iw"==goog.LOCALE.substring(0,2).toLowerCase()||"ps"==goog.LOCALE.substring(0,2).toLowerCase()||"sd"==goog.LOCALE.substring(0,2).toLowerCase()||"ug"==goog.LOCALE.substring(0,2).toLowerCase()||"ur"==goog.LOCALE.substring(0,2).toLowerCase()||"yi"==goog.LOCALE.substring(0,2).toLowerCase())&&(2==goog.LOCALE.length||
"-"==goog.LOCALE.substring(2,3)||"_"==goog.LOCALE.substring(2,3))||3<=goog.LOCALE.length&&"ckb"==goog.LOCALE.substring(0,3).toLowerCase()&&(3==goog.LOCALE.length||"-"==goog.LOCALE.substring(3,4)||"_"==goog.LOCALE.substring(3,4));goog.i18n.bidi.Format={LRE:"\u202a",RLE:"\u202b",PDF:"\u202c",LRM:"\u200e",RLM:"\u200f"};goog.i18n.bidi.Dir={LTR:1,RTL:-1,NEUTRAL:0,UNKNOWN:0};goog.i18n.bidi.RIGHT="right";goog.i18n.bidi.LEFT="left";goog.i18n.bidi.I18N_RIGHT=goog.i18n.bidi.IS_RTL?goog.i18n.bidi.LEFT:goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT=goog.i18n.bidi.IS_RTL?goog.i18n.bidi.RIGHT:goog.i18n.bidi.LEFT;goog.i18n.bidi.toDir=function(a,b){return"number"==typeof a?0<a?goog.i18n.bidi.Dir.LTR:0>a?goog.i18n.bidi.Dir.RTL:b?null:goog.i18n.bidi.Dir.NEUTRAL:null==a?null:a?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR};goog.i18n.bidi.ltrChars_="A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";goog.i18n.bidi.rtlChars_="\u0591-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_=/<[^>]*>|&[^;]+;/g;goog.i18n.bidi.stripHtmlIfNeeded_=function(a,b){return b?a.replace(goog.i18n.bidi.htmlSkipReg_,""):a};goog.i18n.bidi.rtlCharReg_=new RegExp("["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.ltrCharReg_=new RegExp("["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.hasAnyRtl=function(a,b){return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.hasRtlChar=goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr=function(a,b){return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.ltrRe_=new RegExp("^["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.rtlRe_=new RegExp("^["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.isRtlChar=function(a){return goog.i18n.bidi.rtlRe_.test(a)};goog.i18n.bidi.isLtrChar=function(a){return goog.i18n.bidi.ltrRe_.test(a)};goog.i18n.bidi.isNeutralChar=function(a){return!goog.i18n.bidi.isLtrChar(a)&&!goog.i18n.bidi.isRtlChar(a)};
goog.i18n.bidi.ltrDirCheckRe_=new RegExp("^[^"+goog.i18n.bidi.rtlChars_+"]*["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.rtlDirCheckRe_=new RegExp("^[^"+goog.i18n.bidi.ltrChars_+"]*["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.startsWithRtl=function(a,b){return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isRtlText=goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr=function(a,b){return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isLtrText=goog.i18n.bidi.startsWithLtr;goog.i18n.bidi.isRequiredLtrRe_=/^http:\/\/.*/;goog.i18n.bidi.isNeutralText=function(a,b){a=goog.i18n.bidi.stripHtmlIfNeeded_(a,b);return goog.i18n.bidi.isRequiredLtrRe_.test(a)||!goog.i18n.bidi.hasAnyLtr(a)&&!goog.i18n.bidi.hasAnyRtl(a)};
goog.i18n.bidi.ltrExitDirCheckRe_=new RegExp("["+goog.i18n.bidi.ltrChars_+"][^"+goog.i18n.bidi.rtlChars_+"]*$");goog.i18n.bidi.rtlExitDirCheckRe_=new RegExp("["+goog.i18n.bidi.rtlChars_+"][^"+goog.i18n.bidi.ltrChars_+"]*$");goog.i18n.bidi.endsWithLtr=function(a,b){return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isLtrExitText=goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl=function(a,b){return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isRtlExitText=goog.i18n.bidi.endsWithRtl;goog.i18n.bidi.rtlLocalesRe_=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;goog.i18n.bidi.isRtlLanguage=function(a){return goog.i18n.bidi.rtlLocalesRe_.test(a)};goog.i18n.bidi.bracketGuardHtmlRe_=/(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(&lt;.*?(&gt;)+)/g;
goog.i18n.bidi.bracketGuardTextRe_=/(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;goog.i18n.bidi.guardBracketInHtml=function(a,b){return(void 0===b?goog.i18n.bidi.hasAnyRtl(a):b)?a.replace(goog.i18n.bidi.bracketGuardHtmlRe_,"<span dir=rtl>$&</span>"):a.replace(goog.i18n.bidi.bracketGuardHtmlRe_,"<span dir=ltr>$&</span>")};
goog.i18n.bidi.guardBracketInText=function(a,b){var c=(void 0===b?goog.i18n.bidi.hasAnyRtl(a):b)?goog.i18n.bidi.Format.RLM:goog.i18n.bidi.Format.LRM;return a.replace(goog.i18n.bidi.bracketGuardTextRe_,c+"$&"+c)};goog.i18n.bidi.enforceRtlInHtml=function(a){return"<"==a.charAt(0)?a.replace(/<\w+/,"$& dir=rtl"):"\n<span dir=rtl>"+a+"</span>"};goog.i18n.bidi.enforceRtlInText=function(a){return goog.i18n.bidi.Format.RLE+a+goog.i18n.bidi.Format.PDF};
goog.i18n.bidi.enforceLtrInHtml=function(a){return"<"==a.charAt(0)?a.replace(/<\w+/,"$& dir=ltr"):"\n<span dir=ltr>"+a+"</span>"};goog.i18n.bidi.enforceLtrInText=function(a){return goog.i18n.bidi.Format.LRE+a+goog.i18n.bidi.Format.PDF};goog.i18n.bidi.dimensionsRe_=/:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;goog.i18n.bidi.leftRe_=/left/gi;goog.i18n.bidi.rightRe_=/right/gi;goog.i18n.bidi.tempRe_=/%%%%/g;
goog.i18n.bidi.mirrorCSS=function(a){return a.replace(goog.i18n.bidi.dimensionsRe_,":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_,"%%%%").replace(goog.i18n.bidi.rightRe_,goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_,goog.i18n.bidi.RIGHT)};goog.i18n.bidi.doubleQuoteSubstituteRe_=/([\u0591-\u05f2])"/g;goog.i18n.bidi.singleQuoteSubstituteRe_=/([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote=function(a){return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_,"$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_,"$1\u05f3")};goog.i18n.bidi.wordSeparatorRe_=/\s+/;goog.i18n.bidi.hasNumeralsRe_=/\d/;goog.i18n.bidi.rtlDetectionThreshold_=.4;
goog.i18n.bidi.estimateDirection=function(a,b){for(var c=0,d=0,e=!1,f=goog.i18n.bidi.stripHtmlIfNeeded_(a,b).split(goog.i18n.bidi.wordSeparatorRe_),g=0;g<f.length;g++){var h=f[g];goog.i18n.bidi.startsWithRtl(h)?(c++,d++):goog.i18n.bidi.isRequiredLtrRe_.test(h)?e=!0:goog.i18n.bidi.hasAnyLtr(h)?d++:goog.i18n.bidi.hasNumeralsRe_.test(h)&&(e=!0)}return 0==d?e?goog.i18n.bidi.Dir.LTR:goog.i18n.bidi.Dir.NEUTRAL:c/d>goog.i18n.bidi.rtlDetectionThreshold_?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR};
goog.i18n.bidi.detectRtlDirectionality=function(a,b){return goog.i18n.bidi.estimateDirection(a,b)==goog.i18n.bidi.Dir.RTL};goog.i18n.bidi.setElementDirAndAlign=function(a,b){a&&(b=goog.i18n.bidi.toDir(b))&&(a.style.textAlign=b==goog.i18n.bidi.Dir.RTL?"right":"left",a.dir=b==goog.i18n.bidi.Dir.RTL?"rtl":"ltr")};goog.i18n.bidi.DirectionalString=function(){};goog.html.SafeUrl=function(){this.privateDoNotAccessOrElseSafeHtmlWrappedValue_="";this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.SafeUrl.INNOCUOUS_STRING="about:invalid#zClosurez";goog.html.SafeUrl.prototype.implementsGoogStringTypedString=!0;goog.html.SafeUrl.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString=!0;goog.html.SafeUrl.prototype.getDirection=function(){return goog.i18n.bidi.Dir.LTR};goog.DEBUG&&(goog.html.SafeUrl.prototype.toString=function(){return"SafeUrl{"+this.privateDoNotAccessOrElseSafeHtmlWrappedValue_+"}"});
goog.html.SafeUrl.unwrap=function(a){if(a instanceof goog.html.SafeUrl&&a.constructor===goog.html.SafeUrl&&a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;goog.asserts.fail("expected object of type SafeUrl, got '"+a+"'");return"type_error:SafeUrl"};goog.html.SafeUrl.fromConstant=function(a){return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse_(goog.string.Const.unwrap(a))};
goog.html.SAFE_URL_PATTERN_=/^(?:(?:https?|mailto):|[^&:/?#]*(?:[/?#]|$))/i;goog.html.SafeUrl.sanitize=function(a){if(a instanceof goog.html.SafeUrl)return a;a=a.implementsGoogStringTypedString?a.getTypedStringValue():String(a);a=goog.html.SAFE_URL_PATTERN_.test(a)?goog.html.SafeUrl.normalize_(a):goog.html.SafeUrl.INNOCUOUS_STRING;return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse_(a)};
goog.html.SafeUrl.normalize_=function(a){try{var b=encodeURI(a)}catch(c){return goog.html.SafeUrl.INNOCUOUS_STRING}return b.replace(goog.html.SafeUrl.NORMALIZE_MATCHER_,function(a){return goog.html.SafeUrl.NORMALIZE_REPLACER_MAP_[a]})};goog.html.SafeUrl.NORMALIZE_MATCHER_=/[()']|%5B|%5D|%25/g;goog.html.SafeUrl.NORMALIZE_REPLACER_MAP_={"'":"%27","(":"%28",")":"%29","%5B":"[","%5D":"]","%25":"%"};goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse_=function(a){var b=new goog.html.SafeUrl;b.privateDoNotAccessOrElseSafeHtmlWrappedValue_=a;return b};goog.html.SafeHtml=function(){this.privateDoNotAccessOrElseSafeHtmlWrappedValue_="";this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;this.dir_=null};goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString=!0;goog.html.SafeHtml.prototype.getDirection=function(){return this.dir_};goog.html.SafeHtml.prototype.implementsGoogStringTypedString=!0;goog.html.SafeHtml.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_};
goog.DEBUG&&(goog.html.SafeHtml.prototype.toString=function(){return"SafeHtml{"+this.privateDoNotAccessOrElseSafeHtmlWrappedValue_+"}"});goog.html.SafeHtml.unwrap=function(a){if(a instanceof goog.html.SafeHtml&&a.constructor===goog.html.SafeHtml&&a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;goog.asserts.fail("expected object of type SafeHtml, got '"+a+"'");return"type_error:SafeHtml"};
goog.html.SafeHtml.htmlEscape=function(a){var b=null;a.implementsGoogI18nBidiDirectionalString&&(b=a.getDirection());a=a.implementsGoogStringTypedString?a.getTypedStringValue():String(a);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse_(goog.string.htmlEscape(a),b)};
goog.html.SafeHtml.from=function(a){return a instanceof goog.html.SafeHtml?a:a.implementsGoogI18nBidiDirectionalString?goog.html.SafeHtml.htmlEscape(a):a.implementsGoogStringTypedString?goog.html.SafeHtml.htmlEscape(a.getTypedStringValue()):goog.html.SafeHtml.htmlEscape(String(a))};goog.html.SafeHtml.VALID_NAMES_IN_TAG_=/^[a-zA-Z0-9-]+$/;goog.html.SafeHtml.URL_ATTRIBUTES_=goog.object.createSet("action","cite","data","formaction","href","manifest","poster","src");
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_=goog.object.createSet("link","script","style");
goog.html.SafeHtml.create=function(a,b,c){if(!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a))throw Error("Invalid tag name <"+a+">.");if(a.toLowerCase()in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_)throw Error("Tag name <"+a+"> is not allowed for SafeHtml.");var d=null,e="<"+a;if(b)for(var f in b){if(!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(f))throw Error('Invalid attribute name "'+f+'".');var g=b[f];if(null!=g){if(g instanceof goog.string.Const)g=goog.string.Const.unwrap(g);else{if(/^on/i.test(f))throw Error('Attribute "'+
f+'" requires goog.string.Const value, "'+g+'" given.');if(g instanceof goog.html.SafeUrl)g=goog.html.SafeUrl.unwrap(g);else{if(f.toLowerCase()in goog.html.SafeHtml.URL_ATTRIBUTES_)throw Error('Attribute "'+f+'" requires goog.string.Const or goog.html.SafeUrl value, "'+g+'" given.');g instanceof goog.html.SafeStyle&&(goog.asserts.assert("style"==f.toLowerCase(),'goog.html.SafeStyle is only supported in "style" attribute.'),g=goog.html.SafeStyle.unwrap(g))}}e+=" "+f+'="'+goog.string.htmlEscape(g)+
'"'}}goog.isDef(c)?goog.isArray(c)||(c=[c]):c=[];goog.dom.tags.isVoidTag(a.toLowerCase())?(goog.asserts.assert(!c.length,"Void tag <"+a+"> does not allow content."),e+=">"):(d=goog.html.SafeHtml.concat(c),e+=">"+goog.html.SafeHtml.unwrap(d)+"</"+a+">",d=d.getDirection());(a=b&&b.dir)&&(d="ltr"==a.toLowerCase()?goog.i18n.bidi.Dir.LTR:"rtl"==a.toLowerCase()?goog.i18n.bidi.Dir.RTL:null);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse_(e,d)};
goog.html.SafeHtml.concat=function(a){var b=goog.i18n.bidi.Dir.NEUTRAL,c="",d=function(a){goog.isArray(a)?goog.array.forEach(a,d):(a=goog.html.SafeHtml.from(a),c+=goog.html.SafeHtml.unwrap(a),a=a.getDirection(),b==goog.i18n.bidi.Dir.NEUTRAL?b=a:a!=goog.i18n.bidi.Dir.NEUTRAL&&b!=a&&(b=null))};goog.array.forEach(arguments,d);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse_(c,b)};goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse_=function(a,b){var c=new goog.html.SafeHtml;c.privateDoNotAccessOrElseSafeHtmlWrappedValue_=a;c.dir_=b;return c};goog.html.SafeHtml.EMPTY=goog.html.SafeHtml.htmlEscape("");goog.events.FocusHandler=function(a){goog.events.EventTarget.call(this);this.element_=a;a=goog.userAgent.IE?"focusout":"blur";this.listenKeyIn_=goog.events.listen(this.element_,goog.userAgent.IE?"focusin":"focus",this,!goog.userAgent.IE);this.listenKeyOut_=goog.events.listen(this.element_,a,this,!goog.userAgent.IE)};goog.inherits(goog.events.FocusHandler,goog.events.EventTarget);goog.events.FocusHandler.EventType={FOCUSIN:"focusin",FOCUSOUT:"focusout"};
goog.events.FocusHandler.prototype.handleEvent=function(a){var b=a.getBrowserEvent(),b=new goog.events.BrowserEvent(b);b.type="focusin"==a.type||"focus"==a.type?goog.events.FocusHandler.EventType.FOCUSIN:goog.events.FocusHandler.EventType.FOCUSOUT;this.dispatchEvent(b)};goog.events.FocusHandler.prototype.disposeInternal=function(){goog.events.FocusHandler.superClass_.disposeInternal.call(this);goog.events.unlistenByKey(this.listenKeyIn_);goog.events.unlistenByKey(this.listenKeyOut_);delete this.element_};goog.structs={};goog.structs.getCount=function(a){return"function"==typeof a.getCount?a.getCount():goog.isArrayLike(a)||goog.isString(a)?a.length:goog.object.getCount(a)};goog.structs.getValues=function(a){if("function"==typeof a.getValues)return a.getValues();if(goog.isString(a))return a.split("");if(goog.isArrayLike(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return goog.object.getValues(a)};
goog.structs.getKeys=function(a){if("function"==typeof a.getKeys)return a.getKeys();if("function"!=typeof a.getValues){if(goog.isArrayLike(a)||goog.isString(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return goog.object.getKeys(a)}};goog.structs.contains=function(a,b){return"function"==typeof a.contains?a.contains(b):"function"==typeof a.containsValue?a.containsValue(b):goog.isArrayLike(a)||goog.isString(a)?goog.array.contains(a,b):goog.object.containsValue(a,b)};
goog.structs.isEmpty=function(a){return"function"==typeof a.isEmpty?a.isEmpty():goog.isArrayLike(a)||goog.isString(a)?goog.array.isEmpty(a):goog.object.isEmpty(a)};goog.structs.clear=function(a){"function"==typeof a.clear?a.clear():goog.isArrayLike(a)?goog.array.clear(a):goog.object.clear(a)};
goog.structs.forEach=function(a,b,c){if("function"==typeof a.forEach)a.forEach(b,c);else if(goog.isArrayLike(a)||goog.isString(a))goog.array.forEach(a,b,c);else for(var d=goog.structs.getKeys(a),e=goog.structs.getValues(a),f=e.length,g=0;g<f;g++)b.call(c,e[g],d&&d[g],a)};
goog.structs.filter=function(a,b,c){if("function"==typeof a.filter)return a.filter(b,c);if(goog.isArrayLike(a)||goog.isString(a))return goog.array.filter(a,b,c);var d,e=goog.structs.getKeys(a),f=goog.structs.getValues(a),g=f.length;if(e){d={};for(var h=0;h<g;h++)b.call(c,f[h],e[h],a)&&(d[e[h]]=f[h])}else for(d=[],h=0;h<g;h++)b.call(c,f[h],void 0,a)&&d.push(f[h]);return d};
goog.structs.map=function(a,b,c){if("function"==typeof a.map)return a.map(b,c);if(goog.isArrayLike(a)||goog.isString(a))return goog.array.map(a,b,c);var d,e=goog.structs.getKeys(a),f=goog.structs.getValues(a),g=f.length;if(e){d={};for(var h=0;h<g;h++)d[e[h]]=b.call(c,f[h],e[h],a)}else for(d=[],h=0;h<g;h++)d[h]=b.call(c,f[h],void 0,a);return d};
goog.structs.some=function(a,b,c){if("function"==typeof a.some)return a.some(b,c);if(goog.isArrayLike(a)||goog.isString(a))return goog.array.some(a,b,c);for(var d=goog.structs.getKeys(a),e=goog.structs.getValues(a),f=e.length,g=0;g<f;g++)if(b.call(c,e[g],d&&d[g],a))return!0;return!1};
goog.structs.every=function(a,b,c){if("function"==typeof a.every)return a.every(b,c);if(goog.isArrayLike(a)||goog.isString(a))return goog.array.every(a,b,c);for(var d=goog.structs.getKeys(a),e=goog.structs.getValues(a),f=e.length,g=0;g<f;g++)if(!b.call(c,e[g],d&&d[g],a))return!1;return!0};goog.structs.Collection=function(){};goog.structs.Map=function(a,b){this.map_={};this.keys_=[];this.version_=this.count_=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)};goog.structs.Map.prototype.getCount=function(){return this.count_};goog.structs.Map.prototype.getValues=function(){this.cleanupKeysArray_();for(var a=[],b=0;b<this.keys_.length;b++)a.push(this.map_[this.keys_[b]]);return a};
goog.structs.Map.prototype.getKeys=function(){this.cleanupKeysArray_();return this.keys_.concat()};goog.structs.Map.prototype.containsKey=function(a){return goog.structs.Map.hasKey_(this.map_,a)};goog.structs.Map.prototype.containsValue=function(a){for(var b=0;b<this.keys_.length;b++){var c=this.keys_[b];if(goog.structs.Map.hasKey_(this.map_,c)&&this.map_[c]==a)return!0}return!1};
goog.structs.Map.prototype.equals=function(a,b){if(this===a)return!0;if(this.count_!=a.getCount())return!1;var c=b||goog.structs.Map.defaultEquals;this.cleanupKeysArray_();for(var d,e=0;d=this.keys_[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};goog.structs.Map.defaultEquals=function(a,b){return a===b};goog.structs.Map.prototype.isEmpty=function(){return 0==this.count_};goog.structs.Map.prototype.clear=function(){this.map_={};this.version_=this.count_=this.keys_.length=0};
goog.structs.Map.prototype.remove=function(a){return goog.structs.Map.hasKey_(this.map_,a)?(delete this.map_[a],this.count_--,this.version_++,this.keys_.length>2*this.count_&&this.cleanupKeysArray_(),!0):!1};
goog.structs.Map.prototype.cleanupKeysArray_=function(){if(this.count_!=this.keys_.length){for(var a=0,b=0;a<this.keys_.length;){var c=this.keys_[a];goog.structs.Map.hasKey_(this.map_,c)&&(this.keys_[b++]=c);a++}this.keys_.length=b}if(this.count_!=this.keys_.length){for(var d={},b=a=0;a<this.keys_.length;)c=this.keys_[a],goog.structs.Map.hasKey_(d,c)||(this.keys_[b++]=c,d[c]=1),a++;this.keys_.length=b}};
goog.structs.Map.prototype.get=function(a,b){return goog.structs.Map.hasKey_(this.map_,a)?this.map_[a]:b};goog.structs.Map.prototype.set=function(a,b){goog.structs.Map.hasKey_(this.map_,a)||(this.count_++,this.keys_.push(a),this.version_++);this.map_[a]=b};goog.structs.Map.prototype.addAll=function(a){var b;a instanceof goog.structs.Map?(b=a.getKeys(),a=a.getValues()):(b=goog.object.getKeys(a),a=goog.object.getValues(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};
goog.structs.Map.prototype.forEach=function(a,b){for(var c=this.getKeys(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};goog.structs.Map.prototype.clone=function(){return new goog.structs.Map(this)};goog.structs.Map.prototype.transpose=function(){for(var a=new goog.structs.Map,b=0;b<this.keys_.length;b++){var c=this.keys_[b];a.set(this.map_[c],c)}return a};
goog.structs.Map.prototype.toObject=function(){this.cleanupKeysArray_();for(var a={},b=0;b<this.keys_.length;b++){var c=this.keys_[b];a[c]=this.map_[c]}return a};goog.structs.Map.prototype.getKeyIterator=function(){return this.__iterator__(!0)};goog.structs.Map.prototype.getValueIterator=function(){return this.__iterator__(!1)};
goog.structs.Map.prototype.__iterator__=function(a){this.cleanupKeysArray_();var b=0,c=this.keys_,d=this.map_,e=this.version_,f=this,g=new goog.iter.Iterator;g.next=function(){for(;;){if(e!=f.version_)throw Error("The map has changed since the iterator was created");if(b>=c.length)throw goog.iter.StopIteration;var g=c[b++];return a?g:d[g]}};return g};goog.structs.Map.hasKey_=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};goog.structs.Set=function(a){this.map_=new goog.structs.Map;a&&this.addAll(a)};goog.structs.Set.getKey_=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+goog.getUid(a):b.substr(0,1)+a};goog.structs.Set.prototype.getCount=function(){return this.map_.getCount()};goog.structs.Set.prototype.add=function(a){this.map_.set(goog.structs.Set.getKey_(a),a)};goog.structs.Set.prototype.addAll=function(a){a=goog.structs.getValues(a);for(var b=a.length,c=0;c<b;c++)this.add(a[c])};
goog.structs.Set.prototype.removeAll=function(a){a=goog.structs.getValues(a);for(var b=a.length,c=0;c<b;c++)this.remove(a[c])};goog.structs.Set.prototype.remove=function(a){return this.map_.remove(goog.structs.Set.getKey_(a))};goog.structs.Set.prototype.clear=function(){this.map_.clear()};goog.structs.Set.prototype.isEmpty=function(){return this.map_.isEmpty()};goog.structs.Set.prototype.contains=function(a){return this.map_.containsKey(goog.structs.Set.getKey_(a))};
goog.structs.Set.prototype.containsAll=function(a){return goog.structs.every(a,this.contains,this)};goog.structs.Set.prototype.intersection=function(a){var b=new goog.structs.Set;a=goog.structs.getValues(a);for(var c=0;c<a.length;c++){var d=a[c];this.contains(d)&&b.add(d)}return b};goog.structs.Set.prototype.difference=function(a){var b=this.clone();b.removeAll(a);return b};goog.structs.Set.prototype.getValues=function(){return this.map_.getValues()};goog.structs.Set.prototype.clone=function(){return new goog.structs.Set(this)};
goog.structs.Set.prototype.equals=function(a){return this.getCount()==goog.structs.getCount(a)&&this.isSubsetOf(a)};goog.structs.Set.prototype.isSubsetOf=function(a){var b=goog.structs.getCount(a);if(this.getCount()>b)return!1;!(a instanceof goog.structs.Set)&&5<b&&(a=new goog.structs.Set(a));return goog.structs.every(this,function(b){return goog.structs.contains(a,b)})};goog.structs.Set.prototype.__iterator__=function(a){return this.map_.__iterator__(!1)};goog.debug.LOGGING_ENABLED=goog.DEBUG;goog.debug.catchErrors=function(a,b,c){c=c||goog.global;var d=c.onerror,e=!!b;goog.userAgent.WEBKIT&&!goog.userAgent.isVersionOrHigher("535.3")&&(e=!e);c.onerror=function(b,c,h,k,l){d&&d(b,c,h,k,l);a({message:b,fileName:c,line:h,col:k,error:l});return e}};goog.debug.expose=function(a,b){if("undefined"==typeof a)return"undefined";if(null==a)return"NULL";var c=[],d;for(d in a)if(b||!goog.isFunction(a[d])){var e=d+" = ";try{e+=a[d]}catch(f){e+="*** "+f+" ***"}c.push(e)}return c.join("\n")};
goog.debug.deepExpose=function(a,b){var c=[],d=function(a,f,g){var h=f+"  ";g=new goog.structs.Set(g);try{if(goog.isDef(a))if(goog.isNull(a))c.push("NULL");else if(goog.isString(a))c.push('"'+a.replace(/\n/g,"\n"+f)+'"');else if(goog.isFunction(a))c.push(String(a).replace(/\n/g,"\n"+f));else if(goog.isObject(a))if(g.contains(a))c.push("*** reference loop detected ***");else{g.add(a);c.push("{");for(var k in a)if(b||!goog.isFunction(a[k]))c.push("\n"),c.push(h),c.push(k+" = "),d(a[k],h,g);c.push("\n"+
f+"}")}else c.push(a);else c.push("undefined")}catch(l){c.push("*** "+l+" ***")}};d(a,"",new goog.structs.Set);return c.join("")};goog.debug.exposeArray=function(a){for(var b=[],c=0;c<a.length;c++)goog.isArray(a[c])?b.push(goog.debug.exposeArray(a[c])):b.push(a[c]);return"[ "+b.join(", ")+" ]"};
goog.debug.exposeException=function(a,b){try{var c=goog.debug.normalizeErrorObject(a);return"Message: "+goog.string.htmlEscape(c.message)+'\nUrl: <a href="view-source:'+c.fileName+'" target="_new">'+c.fileName+"</a>\nLine: "+c.lineNumber+"\n\nBrowser stack:\n"+goog.string.htmlEscape(c.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+goog.string.htmlEscape(goog.debug.getStacktrace(b)+"-> ")}catch(d){return"Exception trying to expose exception! You win, we lose. "+d}};
goog.debug.normalizeErrorObject=function(a){var b=goog.getObjectByName("window.location.href");if(goog.isString(a))return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c,d,e=!1;try{c=a.lineNumber||a.line||"Not available"}catch(f){c="Not available",e=!0}try{d=a.fileName||a.filename||a.sourceURL||goog.global.$googDebugFname||b}catch(g){d="Not available",e=!0}return!e&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:{message:a.message||"Not available",
name:a.name||"UnknownError",lineNumber:c,fileName:d,stack:a.stack||"Not available"}};goog.debug.enhanceError=function(a,b){var c;"string"==typeof a?(c=Error(a),Error.captureStackTrace&&Error.captureStackTrace(c,goog.debug.enhanceError)):c=a;c.stack||(c.stack=goog.debug.getStacktrace(goog.debug.enhanceError));if(b){for(var d=0;c["message"+d];)++d;c["message"+d]=String(b)}return c};
goog.debug.getStacktraceSimple=function(a){if(goog.STRICT_MODE_COMPATIBLE){var b=goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);if(b)return b}for(var b=[],c=arguments.callee.caller,d=0;c&&(!a||d<a);){b.push(goog.debug.getFunctionName(c));b.push("()\n");try{c=c.caller}catch(e){b.push("[exception trying to get caller]\n");break}d++;if(d>=goog.debug.MAX_STACK_DEPTH){b.push("[...long stack...]");break}}a&&d>=a?b.push("[...reached max depth limit...]"):b.push("[end]");return b.join("")};
goog.debug.MAX_STACK_DEPTH=50;goog.debug.getNativeStackTrace_=function(a){var b=Error();if(Error.captureStackTrace)return Error.captureStackTrace(b,a),String(b.stack);try{throw b;}catch(c){b=c}return(a=b.stack)?String(a):null};goog.debug.getStacktrace=function(a){var b;goog.STRICT_MODE_COMPATIBLE&&(b=goog.debug.getNativeStackTrace_(a||goog.debug.getStacktrace));b||(b=goog.debug.getStacktraceHelper_(a||arguments.callee.caller,[]));return b};
goog.debug.getStacktraceHelper_=function(a,b){var c=[];if(goog.array.contains(b,a))c.push("[...circular reference...]");else if(a&&b.length<goog.debug.MAX_STACK_DEPTH){c.push(goog.debug.getFunctionName(a)+"(");for(var d=a.arguments,e=0;d&&e<d.length;e++){0<e&&c.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=goog.debug.getFunctionName(f))?f:"[fn]";break;
default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");c.push(f)}b.push(a);c.push(")\n");try{c.push(goog.debug.getStacktraceHelper_(a.caller,b))}catch(g){c.push("[exception trying to get caller]\n")}}else a?c.push("[...long stack...]"):c.push("[end]");return c.join("")};goog.debug.setFunctionResolver=function(a){goog.debug.fnNameResolver_=a};
goog.debug.getFunctionName=function(a){if(goog.debug.fnNameCache_[a])return goog.debug.fnNameCache_[a];if(goog.debug.fnNameResolver_){var b=goog.debug.fnNameResolver_(a);if(b)return goog.debug.fnNameCache_[a]=b}a=String(a);goog.debug.fnNameCache_[a]||(b=/function ([^\(]+)/.exec(a),goog.debug.fnNameCache_[a]=b?b[1]:"[Anonymous]");return goog.debug.fnNameCache_[a]};
goog.debug.makeWhitespaceVisible=function(a){return a.replace(/ /g,"[_]").replace(/\f/g,"[f]").replace(/\n/g,"[n]\n").replace(/\r/g,"[r]").replace(/\t/g,"[t]")};goog.debug.fnNameCache_={};goog.debug.LogRecord=function(a,b,c,d,e){this.reset(a,b,c,d,e)};goog.debug.LogRecord.prototype.sequenceNumber_=0;goog.debug.LogRecord.prototype.exception_=null;goog.debug.LogRecord.prototype.exceptionText_=null;goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS=!0;goog.debug.LogRecord.nextSequenceNumber_=0;
goog.debug.LogRecord.prototype.reset=function(a,b,c,d,e){goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS&&(this.sequenceNumber_="number"==typeof e?e:goog.debug.LogRecord.nextSequenceNumber_++);this.time_=d||goog.now();this.level_=a;this.msg_=b;this.loggerName_=c;delete this.exception_;delete this.exceptionText_};goog.debug.LogRecord.prototype.getLoggerName=function(){return this.loggerName_};goog.debug.LogRecord.prototype.getException=function(){return this.exception_};
goog.debug.LogRecord.prototype.setException=function(a){this.exception_=a};goog.debug.LogRecord.prototype.getExceptionText=function(){return this.exceptionText_};goog.debug.LogRecord.prototype.setExceptionText=function(a){this.exceptionText_=a};goog.debug.LogRecord.prototype.setLoggerName=function(a){this.loggerName_=a};goog.debug.LogRecord.prototype.getLevel=function(){return this.level_};goog.debug.LogRecord.prototype.setLevel=function(a){this.level_=a};
goog.debug.LogRecord.prototype.getMessage=function(){return this.msg_};goog.debug.LogRecord.prototype.setMessage=function(a){this.msg_=a};goog.debug.LogRecord.prototype.getMillis=function(){return this.time_};goog.debug.LogRecord.prototype.setMillis=function(a){this.time_=a};goog.debug.LogRecord.prototype.getSequenceNumber=function(){return this.sequenceNumber_};goog.debug.LogBuffer=function(){goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(),"Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");this.clear()};goog.debug.LogBuffer.getInstance=function(){goog.debug.LogBuffer.instance_||(goog.debug.LogBuffer.instance_=new goog.debug.LogBuffer);return goog.debug.LogBuffer.instance_};goog.debug.LogBuffer.CAPACITY=0;
goog.debug.LogBuffer.prototype.addRecord=function(a,b,c){var d=(this.curIndex_+1)%goog.debug.LogBuffer.CAPACITY;this.curIndex_=d;if(this.isFull_)return d=this.buffer_[d],d.reset(a,b,c),d;this.isFull_=d==goog.debug.LogBuffer.CAPACITY-1;return this.buffer_[d]=new goog.debug.LogRecord(a,b,c)};goog.debug.LogBuffer.isBufferingEnabled=function(){return 0<goog.debug.LogBuffer.CAPACITY};
goog.debug.LogBuffer.prototype.clear=function(){this.buffer_=Array(goog.debug.LogBuffer.CAPACITY);this.curIndex_=-1;this.isFull_=!1};goog.debug.LogBuffer.prototype.forEachRecord=function(a){var b=this.buffer_;if(b[0]){var c=this.curIndex_,d=this.isFull_?c:-1;do d=(d+1)%goog.debug.LogBuffer.CAPACITY,a(b[d]);while(d!=c)}};goog.debug.Logger=function(a){this.name_=a;this.handlers_=this.children_=this.level_=this.parent_=null};goog.debug.Logger.ENABLE_HIERARCHY=!0;goog.debug.Logger.ENABLE_HIERARCHY||(goog.debug.Logger.rootHandlers_=[]);goog.debug.Logger.Level=function(a,b){this.name=a;this.value=b};goog.debug.Logger.Level.prototype.toString=function(){return this.name};goog.debug.Logger.Level.OFF=new goog.debug.Logger.Level("OFF",Infinity);goog.debug.Logger.Level.SHOUT=new goog.debug.Logger.Level("SHOUT",1200);
goog.debug.Logger.Level.SEVERE=new goog.debug.Logger.Level("SEVERE",1E3);goog.debug.Logger.Level.WARNING=new goog.debug.Logger.Level("WARNING",900);goog.debug.Logger.Level.INFO=new goog.debug.Logger.Level("INFO",800);goog.debug.Logger.Level.CONFIG=new goog.debug.Logger.Level("CONFIG",700);goog.debug.Logger.Level.FINE=new goog.debug.Logger.Level("FINE",500);goog.debug.Logger.Level.FINER=new goog.debug.Logger.Level("FINER",400);goog.debug.Logger.Level.FINEST=new goog.debug.Logger.Level("FINEST",300);
goog.debug.Logger.Level.ALL=new goog.debug.Logger.Level("ALL",0);goog.debug.Logger.Level.PREDEFINED_LEVELS=[goog.debug.Logger.Level.OFF,goog.debug.Logger.Level.SHOUT,goog.debug.Logger.Level.SEVERE,goog.debug.Logger.Level.WARNING,goog.debug.Logger.Level.INFO,goog.debug.Logger.Level.CONFIG,goog.debug.Logger.Level.FINE,goog.debug.Logger.Level.FINER,goog.debug.Logger.Level.FINEST,goog.debug.Logger.Level.ALL];goog.debug.Logger.Level.predefinedLevelsCache_=null;
goog.debug.Logger.Level.createPredefinedLevelsCache_=function(){goog.debug.Logger.Level.predefinedLevelsCache_={};for(var a=0,b;b=goog.debug.Logger.Level.PREDEFINED_LEVELS[a];a++)goog.debug.Logger.Level.predefinedLevelsCache_[b.value]=b,goog.debug.Logger.Level.predefinedLevelsCache_[b.name]=b};
goog.debug.Logger.Level.getPredefinedLevel=function(a){goog.debug.Logger.Level.predefinedLevelsCache_||goog.debug.Logger.Level.createPredefinedLevelsCache_();return goog.debug.Logger.Level.predefinedLevelsCache_[a]||null};
goog.debug.Logger.Level.getPredefinedLevelByValue=function(a){goog.debug.Logger.Level.predefinedLevelsCache_||goog.debug.Logger.Level.createPredefinedLevelsCache_();if(a in goog.debug.Logger.Level.predefinedLevelsCache_)return goog.debug.Logger.Level.predefinedLevelsCache_[a];for(var b=0;b<goog.debug.Logger.Level.PREDEFINED_LEVELS.length;++b){var c=goog.debug.Logger.Level.PREDEFINED_LEVELS[b];if(c.value<=a)return c}return null};goog.debug.Logger.getLogger=function(a){return goog.debug.LogManager.getLogger(a)};
goog.debug.Logger.logToProfilers=function(a){goog.global.console&&(goog.global.console.timeStamp?goog.global.console.timeStamp(a):goog.global.console.markTimeline&&goog.global.console.markTimeline(a));goog.global.msWriteProfilerMark&&goog.global.msWriteProfilerMark(a)};goog.debug.Logger.prototype.getName=function(){return this.name_};
goog.debug.Logger.prototype.addHandler=function(a){goog.debug.LOGGING_ENABLED&&(goog.debug.Logger.ENABLE_HIERARCHY?(this.handlers_||(this.handlers_=[]),this.handlers_.push(a)):(goog.asserts.assert(!this.name_,"Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."),goog.debug.Logger.rootHandlers_.push(a)))};
goog.debug.Logger.prototype.removeHandler=function(a){if(goog.debug.LOGGING_ENABLED){var b=goog.debug.Logger.ENABLE_HIERARCHY?this.handlers_:goog.debug.Logger.rootHandlers_;return!!b&&goog.array.remove(b,a)}return!1};goog.debug.Logger.prototype.getParent=function(){return this.parent_};goog.debug.Logger.prototype.getChildren=function(){this.children_||(this.children_={});return this.children_};
goog.debug.Logger.prototype.setLevel=function(a){goog.debug.LOGGING_ENABLED&&(goog.debug.Logger.ENABLE_HIERARCHY?this.level_=a:(goog.asserts.assert(!this.name_,"Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."),goog.debug.Logger.rootLevel_=a))};goog.debug.Logger.prototype.getLevel=function(){return goog.debug.LOGGING_ENABLED?this.level_:goog.debug.Logger.Level.OFF};
goog.debug.Logger.prototype.getEffectiveLevel=function(){if(!goog.debug.LOGGING_ENABLED)return goog.debug.Logger.Level.OFF;if(!goog.debug.Logger.ENABLE_HIERARCHY)return goog.debug.Logger.rootLevel_;if(this.level_)return this.level_;if(this.parent_)return this.parent_.getEffectiveLevel();goog.asserts.fail("Root logger has no level set.");return null};goog.debug.Logger.prototype.isLoggable=function(a){return goog.debug.LOGGING_ENABLED&&a.value>=this.getEffectiveLevel().value};
goog.debug.Logger.prototype.log=function(a,b,c){goog.debug.LOGGING_ENABLED&&this.isLoggable(a)&&(goog.isFunction(b)&&(b=b()),this.doLogRecord_(this.getLogRecord(a,b,c,goog.debug.Logger.prototype.log)))};
goog.debug.Logger.prototype.getLogRecord=function(a,b,c,d){a=goog.debug.LogBuffer.isBufferingEnabled()?goog.debug.LogBuffer.getInstance().addRecord(a,b,this.name_):new goog.debug.LogRecord(a,String(b),this.name_);c&&(a.setException(c),a.setExceptionText(goog.debug.exposeException(c,d||goog.debug.Logger.prototype.getLogRecord)));return a};goog.debug.Logger.prototype.shout=function(a,b){goog.debug.LOGGING_ENABLED&&this.log(goog.debug.Logger.Level.SHOUT,a,b)};
goog.debug.Logger.prototype.severe=function(a,b){goog.debug.LOGGING_ENABLED&&this.log(goog.debug.Logger.Level.SEVERE,a,b)};goog.debug.Logger.prototype.warning=function(a,b){goog.debug.LOGGING_ENABLED&&this.log(goog.debug.Logger.Level.WARNING,a,b)};goog.debug.Logger.prototype.info=function(a,b){goog.debug.LOGGING_ENABLED&&this.log(goog.debug.Logger.Level.INFO,a,b)};goog.debug.Logger.prototype.config=function(a,b){goog.debug.LOGGING_ENABLED&&this.log(goog.debug.Logger.Level.CONFIG,a,b)};
goog.debug.Logger.prototype.fine=function(a,b){goog.debug.LOGGING_ENABLED&&this.log(goog.debug.Logger.Level.FINE,a,b)};goog.debug.Logger.prototype.finer=function(a,b){goog.debug.LOGGING_ENABLED&&this.log(goog.debug.Logger.Level.FINER,a,b)};goog.debug.Logger.prototype.finest=function(a,b){goog.debug.LOGGING_ENABLED&&this.log(goog.debug.Logger.Level.FINEST,a,b)};goog.debug.Logger.prototype.logRecord=function(a){goog.debug.LOGGING_ENABLED&&this.isLoggable(a.getLevel())&&this.doLogRecord_(a)};
goog.debug.Logger.prototype.doLogRecord_=function(a){goog.debug.Logger.logToProfilers("log:"+a.getMessage());if(goog.debug.Logger.ENABLE_HIERARCHY)for(var b=this;b;)b.callPublish_(a),b=b.getParent();else for(var b=0,c;c=goog.debug.Logger.rootHandlers_[b++];)c(a)};goog.debug.Logger.prototype.callPublish_=function(a){if(this.handlers_)for(var b=0,c;c=this.handlers_[b];b++)c(a)};goog.debug.Logger.prototype.setParent_=function(a){this.parent_=a};
goog.debug.Logger.prototype.addChild_=function(a,b){this.getChildren()[a]=b};goog.debug.LogManager={};goog.debug.LogManager.loggers_={};goog.debug.LogManager.rootLogger_=null;goog.debug.LogManager.initialize=function(){goog.debug.LogManager.rootLogger_||(goog.debug.LogManager.rootLogger_=new goog.debug.Logger(""),goog.debug.LogManager.loggers_[""]=goog.debug.LogManager.rootLogger_,goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))};goog.debug.LogManager.getLoggers=function(){return goog.debug.LogManager.loggers_};
goog.debug.LogManager.getRoot=function(){goog.debug.LogManager.initialize();return goog.debug.LogManager.rootLogger_};goog.debug.LogManager.getLogger=function(a){goog.debug.LogManager.initialize();return goog.debug.LogManager.loggers_[a]||goog.debug.LogManager.createLogger_(a)};goog.debug.LogManager.createFunctionForCatchErrors=function(a){return function(b){(a||goog.debug.LogManager.getRoot()).severe("Error: "+b.message+" ("+b.fileName+" @ Line: "+b.line+")")}};
goog.debug.LogManager.createLogger_=function(a){var b=new goog.debug.Logger(a);if(goog.debug.Logger.ENABLE_HIERARCHY){var c=a.lastIndexOf("."),d=a.substr(0,c),c=a.substr(c+1),d=goog.debug.LogManager.getLogger(d);d.addChild_(c,b);b.setParent_(d)}return goog.debug.LogManager.loggers_[a]=b};goog.log={};goog.log.ENABLED=goog.debug.LOGGING_ENABLED;goog.log.Logger=goog.debug.Logger;goog.log.Level=goog.debug.Logger.Level;goog.log.LogRecord=goog.debug.LogRecord;goog.log.getLogger=function(a,b){if(goog.log.ENABLED){var c=goog.debug.LogManager.getLogger(a);b&&c&&c.setLevel(b);return c}return null};goog.log.addHandler=function(a,b){goog.log.ENABLED&&a&&a.addHandler(b)};goog.log.removeHandler=function(a,b){return goog.log.ENABLED&&a?a.removeHandler(b):!1};
goog.log.log=function(a,b,c,d){goog.log.ENABLED&&a&&a.log(b,c,d)};goog.log.error=function(a,b,c){goog.log.ENABLED&&a&&a.severe(b,c)};goog.log.warning=function(a,b,c){goog.log.ENABLED&&a&&a.warning(b,c)};goog.log.info=function(a,b,c){goog.log.ENABLED&&a&&a.info(b,c)};goog.log.fine=function(a,b,c){goog.log.ENABLED&&a&&a.fine(b,c)};goog.dom.safe={};goog.dom.safe.setInnerHtml=function(a,b){a.innerHTML=goog.html.SafeHtml.unwrap(b)};goog.dom.safe.documentWrite=function(a,b){a.write(goog.html.SafeHtml.unwrap(b))};goog.dom.safe.setAnchorHref=function(a,b){var c;c=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitize(b);a.href=goog.html.SafeUrl.unwrap(c)};goog.dom.safe.setLocationHref=function(a,b){var c;c=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitize(b);a.href=goog.html.SafeUrl.unwrap(c)};goog.html.TrustedResourceUrl=function(){this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_="";this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString=!0;goog.html.TrustedResourceUrl.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString=!0;goog.html.TrustedResourceUrl.prototype.getDirection=function(){return goog.i18n.bidi.Dir.LTR};goog.DEBUG&&(goog.html.TrustedResourceUrl.prototype.toString=function(){return"TrustedResourceUrl{"+this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_+"}"});
goog.html.TrustedResourceUrl.unwrap=function(a){if(a instanceof goog.html.TrustedResourceUrl&&a.constructor===goog.html.TrustedResourceUrl&&a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;goog.asserts.fail("expected object of type TrustedResourceUrl, got '"+a+"'");return"type_error:TrustedResourceUrl"};goog.html.TrustedResourceUrl.fromConstant=function(a){return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse_(goog.string.Const.unwrap(a))};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse_=function(a){var b=new goog.html.TrustedResourceUrl;b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_=a;return b};goog.html.legacyconversions={};goog.html.legacyconversions.ALLOW_LEGACY_CONVERSIONS=!0;goog.html.legacyconversions.safeHtmlFromString=function(a){goog.html.legacyconversions.throwIfConversionDisallowed_();return goog.html.legacyconversions.createSafeHtmlSecurityPrivateDoNotAccessOrElse_(a)};goog.html.legacyconversions.trustedResourceUrlFromString=function(a){goog.html.legacyconversions.throwIfConversionDisallowed_();return goog.html.legacyconversions.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse_(a)};
goog.html.legacyconversions.safeUrlFromString=function(a){goog.html.legacyconversions.throwIfConversionDisallowed_();return goog.html.legacyconversions.createSafeUrlSecurityPrivateDoNotAccessOrElse_(a)};goog.html.legacyconversions.createSafeHtmlSecurityPrivateDoNotAccessOrElse_=function(a){return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse_(a,null)};goog.html.legacyconversions.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse_=function(a){return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse_(a)};
goog.html.legacyconversions.createSafeUrlSecurityPrivateDoNotAccessOrElse_=function(a){return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse_(a)};goog.html.legacyconversions.throwIfConversionDisallowed_=function(){if(!goog.html.legacyconversions.ALLOW_LEGACY_CONVERSIONS)throw Error("Error: Legacy conversion from string to goog.html types is disabled");};goog.string.StringBuffer=function(a,b){null!=a&&this.append.apply(this,arguments)};goog.string.StringBuffer.prototype.buffer_="";goog.string.StringBuffer.prototype.set=function(a){this.buffer_=""+a};goog.string.StringBuffer.prototype.append=function(a,b,c){this.buffer_+=a;if(null!=b)for(var d=1;d<arguments.length;d++)this.buffer_+=arguments[d];return this};goog.string.StringBuffer.prototype.clear=function(){this.buffer_=""};goog.string.StringBuffer.prototype.getLength=function(){return this.buffer_.length};
goog.string.StringBuffer.prototype.toString=function(){return this.buffer_};goog.ui.tree={};goog.ui.tree.BaseNode=function(a,b,c){goog.ui.Component.call(this,c);this.config_=b||goog.ui.tree.TreeControl.defaultConfig;this.html_=a instanceof goog.html.SafeHtml?a:goog.html.legacyconversions.safeHtmlFromString(a)};goog.inherits(goog.ui.tree.BaseNode,goog.ui.Component);goog.ui.tree.BaseNode.EventType={BEFORE_EXPAND:"beforeexpand",EXPAND:"expand",BEFORE_COLLAPSE:"beforecollapse",COLLAPSE:"collapse"};goog.ui.tree.BaseNode.allNodes={};goog.ui.tree.BaseNode.prototype.selected_=!1;
goog.ui.tree.BaseNode.prototype.expanded_=!1;goog.ui.tree.BaseNode.prototype.toolTip_=null;goog.ui.tree.BaseNode.prototype.afterLabelHtml_=goog.html.SafeHtml.EMPTY;goog.ui.tree.BaseNode.prototype.isUserCollapsible_=!0;goog.ui.tree.BaseNode.prototype.depth_=-1;goog.ui.tree.BaseNode.prototype.disposeInternal=function(){goog.ui.tree.BaseNode.superClass_.disposeInternal.call(this);this.tree&&(this.tree.removeNode(this),this.tree=null);this.setElementInternal(null)};
goog.ui.tree.BaseNode.prototype.initAccessibility=function(){var a=this.getElement();if(a){var b=this.getLabelElement();b&&!b.id&&(b.id=this.getId()+".label");goog.a11y.aria.setRole(a,"treeitem");goog.a11y.aria.setState(a,"selected",!1);goog.a11y.aria.setState(a,"expanded",!1);goog.a11y.aria.setState(a,"level",this.getDepth());b&&goog.a11y.aria.setState(a,"labelledby",b.id);(a=this.getIconElement())&&goog.a11y.aria.setRole(a,"presentation");(a=this.getExpandIconElement())&&goog.a11y.aria.setRole(a,
"presentation");if(a=this.getChildrenElement())if(goog.a11y.aria.setRole(a,"group"),a.hasChildNodes())for(a=this.getChildCount(),b=1;b<=a;b++){var c=this.getChildAt(b-1).getElement();goog.asserts.assert(c,"The child element cannot be null");goog.a11y.aria.setState(c,"setsize",a);goog.a11y.aria.setState(c,"posinset",b)}}};goog.ui.tree.BaseNode.prototype.createDom=function(){var a=this.getDomHelper().htmlToDocumentFragment(goog.html.SafeHtml.unwrap(this.toSafeHtml()));this.setElementInternal(a)};
goog.ui.tree.BaseNode.prototype.enterDocument=function(){goog.ui.tree.BaseNode.superClass_.enterDocument.call(this);goog.ui.tree.BaseNode.allNodes[this.getId()]=this;this.initAccessibility()};goog.ui.tree.BaseNode.prototype.exitDocument=function(){goog.ui.tree.BaseNode.superClass_.exitDocument.call(this);delete goog.ui.tree.BaseNode.allNodes[this.getId()]};
goog.ui.tree.BaseNode.prototype.addChildAt=function(a,b,c){goog.asserts.assert(!a.getParent());goog.asserts.assertInstanceof(a,goog.ui.tree.BaseNode);c=this.getChildAt(b-1);var d=this.getChildAt(b);goog.ui.tree.BaseNode.superClass_.addChildAt.call(this,a,b);a.previousSibling_=c;a.nextSibling_=d;c?c.nextSibling_=a:this.firstChild_=a;d?d.previousSibling_=a:this.lastChild_=a;(b=this.getTree())&&a.setTreeInternal(b);a.setDepth_(this.getDepth()+1);if(this.getElement()&&(this.updateExpandIcon(),this.getExpanded())){b=
this.getChildrenElement();a.getElement()||a.createDom();var e=a.getElement(),f=d&&d.getElement();b.insertBefore(e,f);this.isInDocument()&&a.enterDocument();d||(c?c.updateExpandIcon():(goog.style.setElementShown(b,!0),this.setExpanded(this.getExpanded())))}};goog.ui.tree.BaseNode.prototype.add=function(a,b){goog.asserts.assert(!b||b.getParent()==this,"Can only add nodes before siblings");a.getParent()&&a.getParent().removeChild(a);this.addChildAt(a,b?this.indexOfChild(b):this.getChildCount());return a};
goog.ui.tree.BaseNode.prototype.removeChild=function(a,b){var c=this.getTree(),d=c?c.getSelectedItem():null;if(d==a||a.contains(d))c.hasFocus()?(this.select(),goog.Timer.callOnce(this.onTimeoutSelect_,10,this)):this.select();goog.ui.tree.BaseNode.superClass_.removeChild.call(this,a);this.lastChild_==a&&(this.lastChild_=a.previousSibling_);this.firstChild_==a&&(this.firstChild_=a.nextSibling_);a.previousSibling_&&(a.previousSibling_.nextSibling_=a.nextSibling_);a.nextSibling_&&(a.nextSibling_.previousSibling_=
a.previousSibling_);d=a.isLastSibling();a.tree=null;a.depth_=-1;if(c&&(c.removeNode(this),this.isInDocument())){c=this.getChildrenElement();if(a.isInDocument()){var e=a.getElement();c.removeChild(e);a.exitDocument()}d&&(d=this.getLastChild())&&d.updateExpandIcon();this.hasChildren()||(c.style.display="none",this.updateExpandIcon(),this.updateIcon_())}return a};goog.ui.tree.BaseNode.prototype.remove=goog.ui.tree.BaseNode.prototype.removeChild;goog.ui.tree.BaseNode.prototype.onTimeoutSelect_=function(){this.select()};
goog.ui.tree.BaseNode.prototype.getDepth=function(){var a=this.depth_;0>a&&(a=this.computeDepth_(),this.setDepth_(a));return a};goog.ui.tree.BaseNode.prototype.computeDepth_=function(){var a=this.getParent();return a?a.getDepth()+1:0};goog.ui.tree.BaseNode.prototype.setDepth_=function(a){if(a!=this.depth_){this.depth_=a;var b=this.getRowElement();if(b){var c=this.getPixelIndent_()+"px";this.isRightToLeft()?b.style.paddingRight=c:b.style.paddingLeft=c}this.forEachChild(function(b){b.setDepth_(a+1)})}};
goog.ui.tree.BaseNode.prototype.contains=function(a){for(;a;){if(a==this)return!0;a=a.getParent()}return!1};goog.ui.tree.BaseNode.EMPTY_CHILDREN_=[];goog.ui.tree.BaseNode.prototype.getChildren=function(){var a=[];this.forEachChild(function(b){a.push(b)});return a};goog.ui.tree.BaseNode.prototype.getFirstChild=function(){return this.getChildAt(0)};goog.ui.tree.BaseNode.prototype.getLastChild=function(){return this.getChildAt(this.getChildCount()-1)};
goog.ui.tree.BaseNode.prototype.getPreviousSibling=function(){return this.previousSibling_};goog.ui.tree.BaseNode.prototype.getNextSibling=function(){return this.nextSibling_};goog.ui.tree.BaseNode.prototype.isLastSibling=function(){return!this.nextSibling_};goog.ui.tree.BaseNode.prototype.isSelected=function(){return this.selected_};goog.ui.tree.BaseNode.prototype.select=function(){var a=this.getTree();a&&a.setSelectedItem(this)};goog.ui.tree.BaseNode.prototype.deselect=goog.nullFunction;
goog.ui.tree.BaseNode.prototype.setSelectedInternal=function(a){if(this.selected_!=a){this.selected_=a;this.updateRow();var b=this.getElement();b&&(goog.a11y.aria.setState(b,"selected",a),a&&(a=this.getTree().getElement(),goog.asserts.assert(a,"The DOM element for the tree cannot be null"),goog.a11y.aria.setState(a,"activedescendant",this.getId())))}};goog.ui.tree.BaseNode.prototype.getExpanded=function(){return this.expanded_};
goog.ui.tree.BaseNode.prototype.setExpandedInternal=function(a){this.expanded_=a};
goog.ui.tree.BaseNode.prototype.setExpanded=function(a){var b=a!=this.expanded_;if(!b||this.dispatchEvent(a?goog.ui.tree.BaseNode.EventType.BEFORE_EXPAND:goog.ui.tree.BaseNode.EventType.BEFORE_COLLAPSE)){var c;this.expanded_=a;c=this.getTree();var d=this.getElement();if(this.hasChildren()){if(!a&&c&&this.contains(c.getSelectedItem())&&this.select(),d){if(c=this.getChildrenElement())if(goog.style.setElementShown(c,a),a&&this.isInDocument()&&!c.hasChildNodes()){var e=[];this.forEachChild(function(a){e.push(a.toSafeHtml())});
goog.dom.safe.setInnerHtml(c,goog.html.SafeHtml.concat(e));this.forEachChild(function(a){a.enterDocument()})}this.updateExpandIcon()}}else(c=this.getChildrenElement())&&goog.style.setElementShown(c,!1);d&&(this.updateIcon_(),goog.a11y.aria.setState(d,"expanded",a));b&&this.dispatchEvent(a?goog.ui.tree.BaseNode.EventType.EXPAND:goog.ui.tree.BaseNode.EventType.COLLAPSE)}};goog.ui.tree.BaseNode.prototype.toggle=function(){this.setExpanded(!this.getExpanded())};
goog.ui.tree.BaseNode.prototype.expand=function(){this.setExpanded(!0)};goog.ui.tree.BaseNode.prototype.collapse=function(){this.setExpanded(!1)};goog.ui.tree.BaseNode.prototype.collapseChildren=function(){this.forEachChild(function(a){a.collapseAll()})};goog.ui.tree.BaseNode.prototype.collapseAll=function(){this.collapseChildren();this.collapse()};goog.ui.tree.BaseNode.prototype.expandChildren=function(){this.forEachChild(function(a){a.expandAll()})};
goog.ui.tree.BaseNode.prototype.expandAll=function(){this.expandChildren();this.expand()};goog.ui.tree.BaseNode.prototype.reveal=function(){var a=this.getParent();a&&(a.setExpanded(!0),a.reveal())};goog.ui.tree.BaseNode.prototype.setIsUserCollapsible=function(a){(this.isUserCollapsible_=a)||this.expand();this.getElement()&&this.updateExpandIcon()};goog.ui.tree.BaseNode.prototype.isUserCollapsible=function(){return this.isUserCollapsible_};
goog.ui.tree.BaseNode.prototype.toSafeHtml=function(){var a=this.getTree(),b=!a.getShowLines()||a==this.getParent()&&!a.getShowRootLines()?this.config_.cssChildrenNoLines:this.config_.cssChildren,a=this.getExpanded()&&this.hasChildren(),b={"class":b,style:this.getLineStyle()+(a?"":"display:none;")},c=[];a&&this.forEachChild(function(a){c.push(a.toSafeHtml())});a=goog.html.SafeHtml.create("div",b,c);return goog.html.SafeHtml.create("div",{"class":this.config_.cssItem,id:this.getId()},[this.getRowSafeHtml(),
a])};goog.ui.tree.BaseNode.prototype.getPixelIndent_=function(){return Math.max(0,(this.getDepth()-1)*this.config_.indentWidth)};goog.ui.tree.BaseNode.prototype.getRowSafeHtml=function(){var a="padding-"+(this.isRightToLeft()?"right:":"left:"),a={"class":this.getRowClassName(),style:a+this.getPixelIndent_()+"px"},b=[this.getExpandIconSafeHtml(),this.getIconSafeHtml(),this.getLabelSafeHtml()];return goog.html.SafeHtml.create("div",a,b)};
goog.ui.tree.BaseNode.prototype.getRowClassName=function(){var a;a=this.isSelected()?" "+this.config_.cssSelectedRow:"";return this.config_.cssTreeRow+a};goog.ui.tree.BaseNode.prototype.getLabelSafeHtml=function(){var a=goog.html.SafeHtml.create("span",{"class":this.config_.cssItemLabel,title:this.getToolTip()||null},this.getSafeHtml());return goog.html.SafeHtml.concat(a,goog.html.SafeHtml.create("span",{},this.getAfterLabelSafeHtml()))};goog.ui.tree.BaseNode.prototype.getAfterLabelHtml=function(){return goog.html.SafeHtml.unwrap(this.getAfterLabelSafeHtml())};
goog.ui.tree.BaseNode.prototype.getAfterLabelSafeHtml=function(){return this.afterLabelHtml_};goog.ui.tree.BaseNode.prototype.setAfterLabelHtml=function(a){this.setAfterLabelSafeHtml(goog.html.legacyconversions.safeHtmlFromString(a))};goog.ui.tree.BaseNode.prototype.setAfterLabelSafeHtml=function(a){this.afterLabelHtml_=a;var b=this.getAfterLabelElement();b&&goog.dom.safe.setInnerHtml(b,a)};
goog.ui.tree.BaseNode.prototype.getIconSafeHtml=function(){return goog.html.SafeHtml.create("span",{style:"display:inline-block","class":this.getCalculatedIconClass()})};goog.ui.tree.BaseNode.prototype.getExpandIconSafeHtml=function(){return goog.html.SafeHtml.create("span",{type:"expand",style:"display:inline-block","class":this.getExpandIconClass()})};
goog.ui.tree.BaseNode.prototype.getExpandIconClass=function(){var a=this.getTree(),b=!a.getShowLines()||a==this.getParent()&&!a.getShowRootLines(),c=this.config_,d=new goog.string.StringBuffer;d.append(c.cssTreeIcon," ",c.cssExpandTreeIcon," ");if(this.hasChildren()){var e=0;a.getShowExpandIcons()&&this.isUserCollapsible_&&(e=this.getExpanded()?2:1);b||(e=this.isLastSibling()?e+4:e+8);switch(e){case 1:d.append(c.cssExpandTreeIconPlus);break;case 2:d.append(c.cssExpandTreeIconMinus);break;case 4:d.append(c.cssExpandTreeIconL);
break;case 5:d.append(c.cssExpandTreeIconLPlus);break;case 6:d.append(c.cssExpandTreeIconLMinus);break;case 8:d.append(c.cssExpandTreeIconT);break;case 9:d.append(c.cssExpandTreeIconTPlus);break;case 10:d.append(c.cssExpandTreeIconTMinus);break;default:d.append(c.cssExpandTreeIconBlank)}}else b?d.append(c.cssExpandTreeIconBlank):this.isLastSibling()?d.append(c.cssExpandTreeIconL):d.append(c.cssExpandTreeIconT);return d.toString()};
goog.ui.tree.BaseNode.prototype.getLineStyle=function(){return"background-position:"+this.getLineStyle2()+";"};goog.ui.tree.BaseNode.prototype.getLineStyle2=function(){return(this.isLastSibling()?"-100":(this.getDepth()-1)*this.config_.indentWidth)+"px 0"};goog.ui.tree.BaseNode.prototype.getElement=function(){var a=goog.ui.tree.BaseNode.superClass_.getElement.call(this);a||(a=this.getDomHelper().getElement(this.getId()),this.setElementInternal(a));return a};
goog.ui.tree.BaseNode.prototype.getRowElement=function(){var a=this.getElement();return a?a.firstChild:null};goog.ui.tree.BaseNode.prototype.getExpandIconElement=function(){var a=this.getRowElement();return a?a.firstChild:null};goog.ui.tree.BaseNode.prototype.getIconElement=function(){var a=this.getRowElement();return a?a.childNodes[1]:null};goog.ui.tree.BaseNode.prototype.getLabelElement=function(){var a=this.getRowElement();return a&&a.lastChild?a.lastChild.previousSibling:null};
goog.ui.tree.BaseNode.prototype.getAfterLabelElement=function(){var a=this.getRowElement();return a?a.lastChild:null};goog.ui.tree.BaseNode.prototype.getChildrenElement=function(){var a=this.getElement();return a?a.lastChild:null};goog.ui.tree.BaseNode.prototype.setIconClass=function(a){this.iconClass_=a;this.isInDocument()&&this.updateIcon_()};goog.ui.tree.BaseNode.prototype.getIconClass=function(){return this.iconClass_};
goog.ui.tree.BaseNode.prototype.setExpandedIconClass=function(a){this.expandedIconClass_=a;this.isInDocument()&&this.updateIcon_()};goog.ui.tree.BaseNode.prototype.getExpandedIconClass=function(){return this.expandedIconClass_};goog.ui.tree.BaseNode.prototype.setText=function(a){this.setSafeHtml(goog.html.SafeHtml.htmlEscape(a))};goog.ui.tree.BaseNode.prototype.getText=function(){return goog.string.unescapeEntities(goog.html.SafeHtml.unwrap(this.html_))};goog.ui.tree.BaseNode.prototype.setHtml=function(a){this.setSafeHtml(goog.html.legacyconversions.safeHtmlFromString(a))};
goog.ui.tree.BaseNode.prototype.setSafeHtml=function(a){this.html_=a;var b=this.getLabelElement();b&&goog.dom.safe.setInnerHtml(b,a);(a=this.getTree())&&a.setNode(this)};goog.ui.tree.BaseNode.prototype.getHtml=function(){return goog.html.SafeHtml.unwrap(this.getSafeHtml())};goog.ui.tree.BaseNode.prototype.getSafeHtml=function(){return this.html_};goog.ui.tree.BaseNode.prototype.setToolTip=function(a){this.toolTip_=a;var b=this.getLabelElement();b&&(b.title=a)};
goog.ui.tree.BaseNode.prototype.getToolTip=function(){return this.toolTip_};goog.ui.tree.BaseNode.prototype.updateRow=function(){var a=this.getRowElement();a&&(a.className=this.getRowClassName())};goog.ui.tree.BaseNode.prototype.updateExpandIcon=function(){var a=this.getExpandIconElement();a&&(a.className=this.getExpandIconClass());if(a=this.getChildrenElement())a.style.backgroundPosition=this.getLineStyle2()};
goog.ui.tree.BaseNode.prototype.updateIcon_=function(){this.getIconElement().className=this.getCalculatedIconClass()};goog.ui.tree.BaseNode.prototype.onMouseDown=function(a){"expand"==a.target.getAttribute("type")&&this.hasChildren()?this.isUserCollapsible_&&this.toggle():(this.select(),this.updateRow())};goog.ui.tree.BaseNode.prototype.onClick_=goog.events.Event.preventDefault;
goog.ui.tree.BaseNode.prototype.onDoubleClick_=function(a){"expand"==a.target.getAttribute("type")&&this.hasChildren()||this.isUserCollapsible_&&this.toggle()};
goog.ui.tree.BaseNode.prototype.onKeyDown=function(a){var b=!0;switch(a.keyCode){case goog.events.KeyCodes.RIGHT:if(a.altKey)break;this.hasChildren()&&(this.getExpanded()?this.getFirstChild().select():this.setExpanded(!0));break;case goog.events.KeyCodes.LEFT:if(a.altKey)break;if(this.hasChildren()&&this.getExpanded()&&this.isUserCollapsible_)this.setExpanded(!1);else{var c=this.getParent(),d=this.getTree();c&&(d.getShowRootNode()||c!=d)&&c.select()}break;case goog.events.KeyCodes.DOWN:(c=this.getNextShownNode())&&
c.select();break;case goog.events.KeyCodes.UP:(c=this.getPreviousShownNode())&&c.select();break;default:b=!1}b&&(a.preventDefault(),(d=this.getTree())&&d.clearTypeAhead());return b};goog.ui.tree.BaseNode.prototype.onKeyPress_=function(a){!a.altKey&&a.keyCode>=goog.events.KeyCodes.LEFT&&a.keyCode<=goog.events.KeyCodes.DOWN&&a.preventDefault()};
goog.ui.tree.BaseNode.prototype.getLastShownDescendant=function(){return this.getExpanded()&&this.hasChildren()?this.getLastChild().getLastShownDescendant():this};goog.ui.tree.BaseNode.prototype.getNextShownNode=function(){if(this.hasChildren()&&this.getExpanded())return this.getFirstChild();for(var a=this,b;a!=this.getTree();){b=a.getNextSibling();if(null!=b)return b;a=a.getParent()}return null};
goog.ui.tree.BaseNode.prototype.getPreviousShownNode=function(){var a=this.getPreviousSibling();if(null!=a)return a.getLastShownDescendant();var a=this.getParent(),b=this.getTree();return b.getShowRootNode()||a!=b?a:null};goog.ui.tree.BaseNode.prototype.getClientData=goog.ui.tree.BaseNode.prototype.getModel;goog.ui.tree.BaseNode.prototype.setClientData=goog.ui.tree.BaseNode.prototype.setModel;goog.ui.tree.BaseNode.prototype.getConfig=function(){return this.config_};
goog.ui.tree.BaseNode.prototype.setTreeInternal=function(a){this.tree!=a&&(this.tree=a,a.setNode(this),this.forEachChild(function(b){b.setTreeInternal(a)}))};goog.ui.tree.TreeNode=function(a,b,c){goog.ui.tree.BaseNode.call(this,a,b,c)};goog.inherits(goog.ui.tree.TreeNode,goog.ui.tree.BaseNode);goog.ui.tree.TreeNode.prototype.getTree=function(){if(this.tree)return this.tree;var a=this.getParent();return a&&(a=a.getTree())?(this.setTreeInternal(a),a):null};
goog.ui.tree.TreeNode.prototype.getCalculatedIconClass=function(){var a=this.getExpanded(),b=this.getExpandedIconClass();if(a&&b)return b;b=this.getIconClass();if(!a&&b)return b;b=this.getConfig();if(this.hasChildren()){if(a&&b.cssExpandedFolderIcon)return b.cssTreeIcon+" "+b.cssExpandedFolderIcon;if(!a&&b.cssCollapsedFolderIcon)return b.cssTreeIcon+" "+b.cssCollapsedFolderIcon}else if(b.cssFileIcon)return b.cssTreeIcon+" "+b.cssFileIcon;return""};goog.structs.Trie=function(a){this.value_=void 0;this.childNodes_={};a&&this.setAll(a)};goog.structs.Trie.prototype.set=function(a,b){this.setOrAdd_(a,b,!1)};goog.structs.Trie.prototype.add=function(a,b){this.setOrAdd_(a,b,!0)};
goog.structs.Trie.prototype.setOrAdd_=function(a,b,c){for(var d=this,e=0;e<a.length;e++){var f=a.charAt(e);d.childNodes_[f]||(d.childNodes_[f]=new goog.structs.Trie);d=d.childNodes_[f]}if(c&&void 0!==d.value_)throw Error('The collection already contains the key "'+a+'"');d.value_=b};goog.structs.Trie.prototype.setAll=function(a){var b=goog.structs.getKeys(a);a=goog.structs.getValues(a);for(var c=0;c<b.length;c++)this.set(b[c],a[c])};
goog.structs.Trie.prototype.getChildNode_=function(a){for(var b=this,c=0;c<a.length;c++){var d=a.charAt(c),b=b.childNodes_[d];if(!b)return}return b};goog.structs.Trie.prototype.get=function(a){return(a=this.getChildNode_(a))?a.value_:void 0};goog.structs.Trie.prototype.getKeyAndPrefixes=function(a,b){var c=this,d={},e=b||0;void 0!==c.value_&&(d[e]=c.value_);for(;e<a.length;e++){var f=a.charAt(e);if(!(f in c.childNodes_))break;c=c.childNodes_[f];void 0!==c.value_&&(d[e]=c.value_)}return d};
goog.structs.Trie.prototype.getValues=function(){var a=[];this.getValuesInternal_(a);return a};goog.structs.Trie.prototype.getValuesInternal_=function(a){void 0!==this.value_&&a.push(this.value_);for(var b in this.childNodes_)this.childNodes_[b].getValuesInternal_(a)};goog.structs.Trie.prototype.getKeys=function(a){var b=[];if(a){for(var c=this,d=0;d<a.length;d++){var e=a.charAt(d);if(!c.childNodes_[e])return[];c=c.childNodes_[e]}c.getKeysInternal_(a,b)}else this.getKeysInternal_("",b);return b};
goog.structs.Trie.prototype.getKeysInternal_=function(a,b){void 0!==this.value_&&b.push(a);for(var c in this.childNodes_)this.childNodes_[c].getKeysInternal_(a+c,b)};goog.structs.Trie.prototype.containsKey=function(a){return void 0!==this.get(a)};goog.structs.Trie.prototype.containsPrefix=function(a){return 0==a.length?!this.isEmpty():!!this.getChildNode_(a)};
goog.structs.Trie.prototype.containsValue=function(a){if(this.value_===a)return!0;for(var b in this.childNodes_)if(this.childNodes_[b].containsValue(a))return!0;return!1};goog.structs.Trie.prototype.clear=function(){this.childNodes_={};this.value_=void 0};
goog.structs.Trie.prototype.remove=function(a){for(var b=this,c=[],d=0;d<a.length;d++){var e=a.charAt(d);if(!b.childNodes_[e])throw Error('The collection does not have the key "'+a+'"');c.push([b,e]);b=b.childNodes_[e]}a=b.value_;for(delete b.value_;0<c.length;)if(e=c.pop(),b=e[0],e=e[1],b.childNodes_[e].isEmpty())delete b.childNodes_[e];else break;return a};goog.structs.Trie.prototype.clone=function(){return new goog.structs.Trie(this)};goog.structs.Trie.prototype.getCount=function(){return goog.structs.getCount(this.getValues())};
goog.structs.Trie.prototype.isEmpty=function(){return void 0===this.value_&&goog.object.isEmpty(this.childNodes_)};goog.ui.tree.TypeAhead=function(){this.nodeMap_=new goog.structs.Trie};goog.ui.tree.TypeAhead.prototype.buffer_="";goog.ui.tree.TypeAhead.prototype.matchingLabels_=null;goog.ui.tree.TypeAhead.prototype.matchingNodes_=null;goog.ui.tree.TypeAhead.prototype.matchingLabelIndex_=0;goog.ui.tree.TypeAhead.prototype.matchingNodeIndex_=0;goog.ui.tree.TypeAhead.Offset={DOWN:1,UP:-1};
goog.ui.tree.TypeAhead.prototype.handleNavigation=function(a){var b=!1;switch(a.keyCode){case goog.events.KeyCodes.DOWN:case goog.events.KeyCodes.UP:a.ctrlKey&&(this.jumpTo_(a.keyCode==goog.events.KeyCodes.DOWN?goog.ui.tree.TypeAhead.Offset.DOWN:goog.ui.tree.TypeAhead.Offset.UP),b=!0);break;case goog.events.KeyCodes.BACKSPACE:a=this.buffer_.length-1;b=!0;0<a?(this.buffer_=this.buffer_.substring(0,a),this.jumpToLabel_(this.buffer_)):0==a?this.buffer_="":b=!1;break;case goog.events.KeyCodes.ESC:this.buffer_=
"",b=!0}return b};goog.ui.tree.TypeAhead.prototype.handleTypeAheadChar=function(a){var b=!1;a.ctrlKey||a.altKey||(a=String.fromCharCode(a.charCode||a.keyCode).toLowerCase(),goog.string.isUnicodeChar(a)&&(" "!=a||this.buffer_)&&(this.buffer_+=a,b=this.jumpToLabel_(this.buffer_)));return b};goog.ui.tree.TypeAhead.prototype.setNodeInMap=function(a){var b=a.getText();if(b&&!goog.string.isEmptySafe(b)){var b=b.toLowerCase(),c=this.nodeMap_.get(b);c?c.push(a):this.nodeMap_.set(b,[a])}};
goog.ui.tree.TypeAhead.prototype.removeNodeFromMap=function(a){var b=a.getText();if(b&&!goog.string.isEmptySafe(b)){var b=b.toLowerCase(),c=this.nodeMap_.get(b);c&&(goog.array.remove(c,a),c.length&&this.nodeMap_.remove(b))}};goog.ui.tree.TypeAhead.prototype.jumpToLabel_=function(a){var b=!1;(a=this.nodeMap_.getKeys(a))&&a.length&&(this.matchingLabelIndex_=this.matchingNodeIndex_=0,b=this.nodeMap_.get(a[0]),b=this.selectMatchingNode_(b))&&(this.matchingLabels_=a);return b};
goog.ui.tree.TypeAhead.prototype.jumpTo_=function(a){var b=!1,c=this.matchingLabels_;if(c){var b=null,d=!1;if(this.matchingNodes_){var e=this.matchingNodeIndex_+a;0<=e&&e<this.matchingNodes_.length?(this.matchingNodeIndex_=e,b=this.matchingNodes_):d=!0}b||(e=this.matchingLabelIndex_+a,0<=e&&e<c.length&&(this.matchingLabelIndex_=e),c.length>this.matchingLabelIndex_&&(b=this.nodeMap_.get(c[this.matchingLabelIndex_])),b&&b.length&&d&&(this.matchingNodeIndex_=a==goog.ui.tree.TypeAhead.Offset.UP?b.length-
1:0));if(b=this.selectMatchingNode_(b))this.matchingLabels_=c}return b};goog.ui.tree.TypeAhead.prototype.selectMatchingNode_=function(a){var b;a&&(this.matchingNodeIndex_<a.length&&(b=a[this.matchingNodeIndex_],this.matchingNodes_=a),b&&(b.reveal(),b.select()));return!!b};goog.ui.tree.TypeAhead.prototype.clear=function(){this.buffer_=""};goog.ui.tree.TreeControl=function(a,b,c){goog.ui.tree.BaseNode.call(this,a,b,c);this.setExpandedInternal(!0);this.setSelectedInternal(!0);this.selectedItem_=this;this.typeAhead_=new goog.ui.tree.TypeAhead;if(goog.userAgent.IE)try{document.execCommand("BackgroundImageCache",!1,!0)}catch(d){goog.log.warning(this.logger_,"Failed to enable background image cache")}};goog.inherits(goog.ui.tree.TreeControl,goog.ui.tree.BaseNode);goog.ui.tree.TreeControl.prototype.keyHandler_=null;
goog.ui.tree.TreeControl.prototype.focusHandler_=null;goog.ui.tree.TreeControl.prototype.logger_=goog.log.getLogger("goog.ui.tree.TreeControl");goog.ui.tree.TreeControl.prototype.focused_=!1;goog.ui.tree.TreeControl.prototype.focusedNode_=null;goog.ui.tree.TreeControl.prototype.showLines_=!0;goog.ui.tree.TreeControl.prototype.showExpandIcons_=!0;goog.ui.tree.TreeControl.prototype.showRootNode_=!0;goog.ui.tree.TreeControl.prototype.showRootLines_=!0;goog.ui.tree.TreeControl.prototype.getTree=function(){return this};
goog.ui.tree.TreeControl.prototype.getDepth=function(){return 0};goog.ui.tree.TreeControl.prototype.reveal=function(){};goog.ui.tree.TreeControl.prototype.handleFocus_=function(a){this.focused_=!0;goog.dom.classlist.add(goog.asserts.assert(this.getElement()),"focused");this.selectedItem_&&this.selectedItem_.select()};goog.ui.tree.TreeControl.prototype.handleBlur_=function(a){this.focused_=!1;goog.dom.classlist.remove(goog.asserts.assert(this.getElement()),"focused")};
goog.ui.tree.TreeControl.prototype.hasFocus=function(){return this.focused_};goog.ui.tree.TreeControl.prototype.getExpanded=function(){return!this.showRootNode_||goog.ui.tree.TreeControl.superClass_.getExpanded.call(this)};goog.ui.tree.TreeControl.prototype.setExpanded=function(a){this.showRootNode_?goog.ui.tree.TreeControl.superClass_.setExpanded.call(this,a):this.setExpandedInternal(a)};goog.ui.tree.TreeControl.prototype.getExpandIconSafeHtml=function(){return goog.html.SafeHtml.EMPTY};
goog.ui.tree.TreeControl.prototype.getIconElement=function(){var a=this.getRowElement();return a?a.firstChild:null};goog.ui.tree.TreeControl.prototype.getExpandIconElement=function(){return null};goog.ui.tree.TreeControl.prototype.updateExpandIcon=function(){};goog.ui.tree.TreeControl.prototype.getRowClassName=function(){return goog.ui.tree.TreeControl.superClass_.getRowClassName.call(this)+(this.showRootNode_?"":" "+this.getConfig().cssHideRoot)};
goog.ui.tree.TreeControl.prototype.getCalculatedIconClass=function(){var a=this.getExpanded(),b=this.getExpandedIconClass();if(a&&b)return b;b=this.getIconClass();if(!a&&b)return b;b=this.getConfig();return a&&b.cssExpandedRootIcon?b.cssTreeIcon+" "+b.cssExpandedRootIcon:!a&&b.cssCollapsedRootIcon?b.cssTreeIcon+" "+b.cssCollapsedRootIcon:""};
goog.ui.tree.TreeControl.prototype.setSelectedItem=function(a){if(this.selectedItem_!=a){var b=!1;this.selectedItem_&&(b=this.selectedItem_==this.focusedNode_,this.selectedItem_.setSelectedInternal(!1));if(this.selectedItem_=a)a.setSelectedInternal(!0),b&&a.select();this.dispatchEvent(goog.events.EventType.CHANGE)}};goog.ui.tree.TreeControl.prototype.getSelectedItem=function(){return this.selectedItem_};
goog.ui.tree.TreeControl.prototype.setShowLines=function(a){this.showLines_!=a&&(this.showLines_=a,this.isInDocument()&&this.updateLinesAndExpandIcons_())};goog.ui.tree.TreeControl.prototype.getShowLines=function(){return this.showLines_};
goog.ui.tree.TreeControl.prototype.updateLinesAndExpandIcons_=function(){function a(e){var f=e.getChildrenElement();if(f){var g=!c||b==e.getParent()&&!d?e.getConfig().cssChildrenNoLines:e.getConfig().cssChildren;f.className=g;if(f=e.getExpandIconElement())f.className=e.getExpandIconClass()}e.forEachChild(a)}var b=this,c=b.getShowLines(),d=b.getShowRootLines();a(this)};
goog.ui.tree.TreeControl.prototype.setShowRootLines=function(a){this.showRootLines_!=a&&(this.showRootLines_=a,this.isInDocument()&&this.updateLinesAndExpandIcons_())};goog.ui.tree.TreeControl.prototype.getShowRootLines=function(){return this.showRootLines_};goog.ui.tree.TreeControl.prototype.setShowExpandIcons=function(a){this.showExpandIcons_!=a&&(this.showExpandIcons_=a,this.isInDocument()&&this.updateLinesAndExpandIcons_())};goog.ui.tree.TreeControl.prototype.getShowExpandIcons=function(){return this.showExpandIcons_};
goog.ui.tree.TreeControl.prototype.setShowRootNode=function(a){if(this.showRootNode_!=a){this.showRootNode_=a;if(this.isInDocument()){var b=this.getRowElement();b&&(b.className=this.getRowClassName())}!a&&this.getSelectedItem()==this&&this.getFirstChild()&&this.setSelectedItem(this.getFirstChild())}};goog.ui.tree.TreeControl.prototype.getShowRootNode=function(){return this.showRootNode_};
goog.ui.tree.TreeControl.prototype.initAccessibility=function(){goog.ui.tree.TreeControl.superClass_.initAccessibility.call(this);var a=this.getElement();goog.asserts.assert(a,"The DOM element for the tree cannot be null.");goog.a11y.aria.setRole(a,"tree");goog.a11y.aria.setState(a,"labelledby",this.getLabelElement().id)};
goog.ui.tree.TreeControl.prototype.enterDocument=function(){goog.ui.tree.TreeControl.superClass_.enterDocument.call(this);var a=this.getElement();a.className=this.getConfig().cssRoot;a.setAttribute("hideFocus","true");this.attachEvents_();this.initAccessibility()};goog.ui.tree.TreeControl.prototype.exitDocument=function(){goog.ui.tree.TreeControl.superClass_.exitDocument.call(this);this.detachEvents_()};
goog.ui.tree.TreeControl.prototype.attachEvents_=function(){var a=this.getElement();a.tabIndex=0;var b=this.keyHandler_=new goog.events.KeyHandler(a),c=this.focusHandler_=new goog.events.FocusHandler(a);this.getHandler().listen(c,goog.events.FocusHandler.EventType.FOCUSOUT,this.handleBlur_).listen(c,goog.events.FocusHandler.EventType.FOCUSIN,this.handleFocus_).listen(b,goog.events.KeyHandler.EventType.KEY,this.handleKeyEvent).listen(a,goog.events.EventType.MOUSEDOWN,this.handleMouseEvent_).listen(a,
goog.events.EventType.CLICK,this.handleMouseEvent_).listen(a,goog.events.EventType.DBLCLICK,this.handleMouseEvent_)};goog.ui.tree.TreeControl.prototype.detachEvents_=function(){this.keyHandler_.dispose();this.keyHandler_=null;this.focusHandler_.dispose();this.focusHandler_=null};
goog.ui.tree.TreeControl.prototype.handleMouseEvent_=function(a){goog.log.fine(this.logger_,"Received event "+a.type);var b=this.getNodeFromEvent_(a);if(b)switch(a.type){case goog.events.EventType.MOUSEDOWN:b.onMouseDown(a);break;case goog.events.EventType.CLICK:b.onClick_(a);break;case goog.events.EventType.DBLCLICK:b.onDoubleClick_(a)}};
goog.ui.tree.TreeControl.prototype.handleKeyEvent=function(a){var b=!1;(b=this.typeAhead_.handleNavigation(a)||this.selectedItem_&&this.selectedItem_.onKeyDown(a)||this.typeAhead_.handleTypeAheadChar(a))&&a.preventDefault();return b};goog.ui.tree.TreeControl.prototype.getNodeFromEvent_=function(a){var b=null;for(a=a.target;null!=a;){if(b=goog.ui.tree.BaseNode.allNodes[a.id])return b;if(a==this.getElement())break;a=a.parentNode}return null};
goog.ui.tree.TreeControl.prototype.createNode=function(a){return new goog.ui.tree.TreeNode(a||goog.html.SafeHtml.EMPTY,this.getConfig(),this.getDomHelper())};goog.ui.tree.TreeControl.prototype.setNode=function(a){this.typeAhead_.setNodeInMap(a)};goog.ui.tree.TreeControl.prototype.removeNode=function(a){this.typeAhead_.removeNodeFromMap(a)};goog.ui.tree.TreeControl.prototype.clearTypeAhead=function(){this.typeAhead_.clear()};
goog.ui.tree.TreeControl.defaultConfig={indentWidth:19,cssRoot:"goog-tree-root goog-tree-item",cssHideRoot:"goog-tree-hide-root",cssItem:"goog-tree-item",cssChildren:"goog-tree-children",cssChildrenNoLines:"goog-tree-children-nolines",cssTreeRow:"goog-tree-row",cssItemLabel:"goog-tree-item-label",cssTreeIcon:"goog-tree-icon",cssExpandTreeIcon:"goog-tree-expand-icon",cssExpandTreeIconPlus:"goog-tree-expand-icon-plus",cssExpandTreeIconMinus:"goog-tree-expand-icon-minus",cssExpandTreeIconTPlus:"goog-tree-expand-icon-tplus",
cssExpandTreeIconTMinus:"goog-tree-expand-icon-tminus",cssExpandTreeIconLPlus:"goog-tree-expand-icon-lplus",cssExpandTreeIconLMinus:"goog-tree-expand-icon-lminus",cssExpandTreeIconT:"goog-tree-expand-icon-t",cssExpandTreeIconL:"goog-tree-expand-icon-l",cssExpandTreeIconBlank:"goog-tree-expand-icon-blank",cssExpandedFolderIcon:"goog-tree-expanded-folder-icon",cssCollapsedFolderIcon:"goog-tree-collapsed-folder-icon",cssFileIcon:"goog-tree-file-icon",cssExpandedRootIcon:"goog-tree-expanded-folder-icon",
cssCollapsedRootIcon:"goog-tree-collapsed-folder-icon",cssSelectedRow:"selected"};goog.cssom={};goog.cssom.CssRuleType={STYLE:1,IMPORT:3,MEDIA:4,FONT_FACE:5,PAGE:6,NAMESPACE:7};goog.cssom.getAllCssText=function(a){return goog.cssom.getAllCss_(a||document.styleSheets,!0)};goog.cssom.getAllCssStyleRules=function(a){return goog.cssom.getAllCss_(a||document.styleSheets,!1)};goog.cssom.getCssRulesFromStyleSheet=function(a){var b=null;try{b=a.rules||a.cssRules}catch(c){if(15==c.code)throw c.styleSheet=a,c;}return b};
goog.cssom.getAllCssStyleSheets=function(a,b){var c=[],d=a||document.styleSheets,e=goog.isDef(b)?b:!1;if(d.imports&&d.imports.length)for(var f=0,g=d.imports.length;f<g;f++)goog.array.extend(c,goog.cssom.getAllCssStyleSheets(d.imports[f]));else if(d.length)for(f=0,g=d.length;f<g;f++)goog.array.extend(c,goog.cssom.getAllCssStyleSheets(d[f]));else{var h=goog.cssom.getCssRulesFromStyleSheet(d);if(h&&h.length)for(var f=0,g=h.length,k;f<g;f++)k=h[f],k.styleSheet&&goog.array.extend(c,goog.cssom.getAllCssStyleSheets(k.styleSheet))}!(d.type||
d.rules||d.cssRules)||d.disabled&&!e||c.push(d);return c};goog.cssom.getCssTextFromCssRule=function(a){var b="";a.cssText?b=a.cssText:a.style&&a.style.cssText&&a.selectorText&&(b=a.style.cssText.replace(/\s*-closure-parent-stylesheet:\s*\[object\];?\s*/gi,"").replace(/\s*-closure-rule-index:\s*[\d]+;?\s*/gi,""),b=a.selectorText+" { "+b+" }");return b};
goog.cssom.getCssRuleIndexInParentStyleSheet=function(a,b){if(a.style&&a.style["-closure-rule-index"])return a.style["-closure-rule-index"];var c=b||goog.cssom.getParentStyleSheet(a);if(!c)throw Error("Cannot find a parentStyleSheet.");if((c=goog.cssom.getCssRulesFromStyleSheet(c))&&c.length)for(var d=0,e=c.length,f;d<e;d++)if(f=c[d],f==a)return d;return-1};goog.cssom.getParentStyleSheet=function(a){return a.parentStyleSheet||a.style&&a.style["-closure-parent-stylesheet"]};
goog.cssom.replaceCssRule=function(a,b,c,d){if(c=c||goog.cssom.getParentStyleSheet(a))if(a=0<=d?d:goog.cssom.getCssRuleIndexInParentStyleSheet(a,c),0<=a)goog.cssom.removeCssRule(c,a),goog.cssom.addCssRule(c,b,a);else throw Error("Cannot proceed without the index of the cssRule.");else throw Error("Cannot proceed without the parentStyleSheet.");};
goog.cssom.addCssRule=function(a,b,c){if(0>c||void 0==c)c=(a.cssRules||a.rules).length;if(a.insertRule)a.insertRule(b,c);else if(b=/^([^\{]+)\{([^\{]+)\}/.exec(b),3==b.length)a.addRule(b[1],b[2],c);else throw Error("Your CSSRule appears to be ill-formatted.");};goog.cssom.removeCssRule=function(a,b){a.deleteRule?a.deleteRule(b):a.removeRule(b)};
goog.cssom.addCssText=function(a,b){var c=b?b.getDocument():goog.dom.getDocument(),d=c.createElement("style");d.type="text/css";c.getElementsByTagName("head")[0].appendChild(d);d.styleSheet?d.styleSheet.cssText=a:(c=c.createTextNode(a),d.appendChild(c));return d};goog.cssom.getFileNameFromStyleSheet=function(a){return(a=a.href)?/([^\/\?]+)[^\/]*$/.exec(a)[1]:null};
goog.cssom.getAllCss_=function(a,b){for(var c=[],d=goog.cssom.getAllCssStyleSheets(a),e=0;a=d[e];e++){var f=goog.cssom.getCssRulesFromStyleSheet(a);if(f&&f.length){if(!b)var g=0;for(var h=0,k=f.length,l;h<k;h++)l=f[h],b&&!l.href?(l=goog.cssom.getCssTextFromCssRule(l),c.push(l)):l.href||(l.style&&(l.parentStyleSheet||(l.style["-closure-parent-stylesheet"]=a),l.style["-closure-rule-index"]=g),c.push(l)),b||g++}}return b?c.join(" "):c};
// Copyright 2012 Google Inc.  Apache License 2.0
var Blockly={BlockSvg:function(a){this.block_=a;this.svgGroup_=Blockly.createSvgElement("g",{},null);this.svgPathDark_=Blockly.createSvgElement("path",{"class":"blocklyPathDark",transform:"translate(1, 1)"},this.svgGroup_);this.svgPath_=Blockly.createSvgElement("path",{"class":"blocklyPath"},this.svgGroup_);this.svgPathLight_=Blockly.createSvgElement("path",{"class":"blocklyPathLight"},this.svgGroup_);this.svgPath_.tooltip=this.block_;Blockly.Tooltip.bindMouseEvents(this.svgPath_);this.updateMovable()}};
Blockly.BlockSvg.prototype.height=0;Blockly.BlockSvg.prototype.width=0;Blockly.BlockSvg.INLINE=-1;Blockly.BlockSvg.prototype.init=function(){var a=this.block_;this.updateColour();for(var b=0,c;c=a.inputList[b];b++)c.init();a.mutator&&a.mutator.createIcon()};Blockly.BlockSvg.prototype.updateMovable=function(){this.block_.isMovable()?Blockly.addClass_(this.svgGroup_,"blocklyDraggable"):Blockly.removeClass_(this.svgGroup_,"blocklyDraggable")};Blockly.BlockSvg.prototype.getRootElement=function(){return this.svgGroup_};
Blockly.BlockSvg.SEP_SPACE_X=10;Blockly.BlockSvg.SEP_SPACE_Y=10;Blockly.BlockSvg.INLINE_PADDING_Y=5;Blockly.BlockSvg.MIN_BLOCK_Y=25;Blockly.BlockSvg.TAB_HEIGHT=20;Blockly.BlockSvg.TAB_WIDTH=8;Blockly.BlockSvg.NOTCH_WIDTH=30;Blockly.BlockSvg.CORNER_RADIUS=8;Blockly.BlockSvg.FIELD_HEIGHT=18;Blockly.BlockSvg.DISTANCE_45_INSIDE=(1-Math.SQRT1_2)*(Blockly.BlockSvg.CORNER_RADIUS-1)+1;Blockly.BlockSvg.DISTANCE_45_OUTSIDE=(1-Math.SQRT1_2)*(Blockly.BlockSvg.CORNER_RADIUS+1)-1;
Blockly.BlockSvg.NOTCH_PATH_LEFT="l 6,4 3,0 6,-4";Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT="l 6.5,4 2,0 6.5,-4";Blockly.BlockSvg.NOTCH_PATH_RIGHT="l -6,4 -3,0 -6,-4";Blockly.BlockSvg.JAGGED_TEETH="l 8,0 0,4 8,4 -16,8 8,4";Blockly.BlockSvg.JAGGED_TEETH_HEIGHT=20;Blockly.BlockSvg.JAGGED_TEETH_WIDTH=15;Blockly.BlockSvg.TAB_PATH_DOWN="v 5 c 0,10 -"+Blockly.BlockSvg.TAB_WIDTH+",-8 -"+Blockly.BlockSvg.TAB_WIDTH+",7.5 s "+Blockly.BlockSvg.TAB_WIDTH+",-2.5 "+Blockly.BlockSvg.TAB_WIDTH+",7.5";
Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL="v 6.5 m -"+.98*Blockly.BlockSvg.TAB_WIDTH+",2.5 q -"+.05*Blockly.BlockSvg.TAB_WIDTH+",10 "+.27*Blockly.BlockSvg.TAB_WIDTH+",10 m "+.71*Blockly.BlockSvg.TAB_WIDTH+",-2.5 v 1.5";Blockly.BlockSvg.TOP_LEFT_CORNER_START="m 0,"+Blockly.BlockSvg.CORNER_RADIUS;Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL="m "+Blockly.BlockSvg.DISTANCE_45_INSIDE+","+Blockly.BlockSvg.DISTANCE_45_INSIDE;
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR="m 1,"+(Blockly.BlockSvg.CORNER_RADIUS-1);Blockly.BlockSvg.TOP_LEFT_CORNER="A "+Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS+" 0 0,1 "+Blockly.BlockSvg.CORNER_RADIUS+",0";Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT="A "+(Blockly.BlockSvg.CORNER_RADIUS-1)+","+(Blockly.BlockSvg.CORNER_RADIUS-1)+" 0 0,1 "+Blockly.BlockSvg.CORNER_RADIUS+",1";
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER=Blockly.BlockSvg.NOTCH_PATH_RIGHT+" h -"+(Blockly.BlockSvg.NOTCH_WIDTH-15-Blockly.BlockSvg.CORNER_RADIUS)+" a "+Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS+" 0 0,0 -"+Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS;Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER="a "+Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS+" 0 0,0 "+Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL="a "+(Blockly.BlockSvg.CORNER_RADIUS+1)+","+(Blockly.BlockSvg.CORNER_RADIUS+1)+" 0 0,0 "+(-Blockly.BlockSvg.DISTANCE_45_OUTSIDE-1)+","+(Blockly.BlockSvg.CORNER_RADIUS-Blockly.BlockSvg.DISTANCE_45_OUTSIDE);Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL="a "+(Blockly.BlockSvg.CORNER_RADIUS+1)+","+(Blockly.BlockSvg.CORNER_RADIUS+1)+" 0 0,0 "+(Blockly.BlockSvg.CORNER_RADIUS+1)+","+(Blockly.BlockSvg.CORNER_RADIUS+1);
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR="a "+(Blockly.BlockSvg.CORNER_RADIUS+1)+","+(Blockly.BlockSvg.CORNER_RADIUS+1)+" 0 0,0 "+(Blockly.BlockSvg.CORNER_RADIUS-Blockly.BlockSvg.DISTANCE_45_OUTSIDE)+","+(Blockly.BlockSvg.DISTANCE_45_OUTSIDE+1);Blockly.BlockSvg.prototype.dispose=function(){goog.dom.removeNode(this.svgGroup_);this.block_=this.svgPathDark_=this.svgPathLight_=this.svgPath_=this.svgGroup_=null};
Blockly.BlockSvg.prototype.disposeUiEffect=function(){Blockly.playAudio("delete");var a=Blockly.getSvgXY_(this.svgGroup_),b=this.svgGroup_.cloneNode(!0);b.translateX_=a.x;b.translateY_=a.y;b.setAttribute("transform","translate("+b.translateX_+","+b.translateY_+")");Blockly.svg.appendChild(b);b.bBox_=b.getBBox();b.startDate_=new Date;Blockly.BlockSvg.disposeUiStep_(b)};
Blockly.BlockSvg.disposeUiStep_=function(a){var b=(new Date-a.startDate_)/150;1<b?goog.dom.removeNode(a):(a.setAttribute("transform","translate("+(a.translateX_+(Blockly.RTL?-1:1)*a.bBox_.width/2*b+", "+(a.translateY_+a.bBox_.height*b))+") scale("+(1-b)+")"),window.setTimeout(function(){Blockly.BlockSvg.disposeUiStep_(a)},10))};
Blockly.BlockSvg.prototype.connectionUiEffect=function(){Blockly.playAudio("click");var a=Blockly.getSvgXY_(this.svgGroup_);this.block_.outputConnection?(a.x+=Blockly.RTL?3:-3,a.y+=13):this.block_.previousConnection&&(a.x+=Blockly.RTL?-23:23,a.y+=3);a=Blockly.createSvgElement("circle",{cx:a.x,cy:a.y,r:0,fill:"none",stroke:"#888","stroke-width":10},Blockly.svg);a.startDate_=new Date;Blockly.BlockSvg.connectionUiStep_(a)};
Blockly.BlockSvg.connectionUiStep_=function(a){var b=(new Date-a.startDate_)/150;1<b?goog.dom.removeNode(a):(a.setAttribute("r",25*b),a.style.opacity=1-b,window.setTimeout(function(){Blockly.BlockSvg.connectionUiStep_(a)},10))};
Blockly.BlockSvg.prototype.updateColour=function(){if(!this.block_.disabled){var a=Blockly.makeColour(this.block_.getColour()),b=goog.color.hexToRgb(a),c=goog.color.lighten(b,.3),b=goog.color.darken(b,.4);this.svgPathLight_.setAttribute("stroke",goog.color.rgbArrayToHex(c));this.svgPathDark_.setAttribute("fill",goog.color.rgbArrayToHex(b));this.svgPath_.setAttribute("fill",a)}};
Blockly.BlockSvg.prototype.updateDisabled=function(){this.block_.disabled||this.block_.getInheritedDisabled()?(Blockly.addClass_(this.svgGroup_,"blocklyDisabled"),this.svgPath_.setAttribute("fill","url(#blocklyDisabledPattern)")):(Blockly.removeClass_(this.svgGroup_,"blocklyDisabled"),this.updateColour());for(var a=this.block_.getChildren(),b=0,c;c=a[b];b++)c.svg_.updateDisabled()};Blockly.BlockSvg.prototype.addSelect=function(){Blockly.addClass_(this.svgGroup_,"blocklySelected");this.svgGroup_.parentNode.appendChild(this.svgGroup_)};
Blockly.BlockSvg.prototype.removeSelect=function(){Blockly.removeClass_(this.svgGroup_,"blocklySelected")};Blockly.BlockSvg.prototype.addDragging=function(){Blockly.addClass_(this.svgGroup_,"blocklyDragging")};Blockly.BlockSvg.prototype.removeDragging=function(){Blockly.removeClass_(this.svgGroup_,"blocklyDragging")};
Blockly.BlockSvg.prototype.render=function(){this.block_.rendered=!0;var a=Blockly.BlockSvg.SEP_SPACE_X;Blockly.RTL&&(a=-a);for(var b=this.block_.getIcons(),c=0;c<b.length;c++)a=b[c].renderIcon(a);a+=Blockly.RTL?Blockly.BlockSvg.SEP_SPACE_X:-Blockly.BlockSvg.SEP_SPACE_X;b=this.renderCompute_(a);this.renderDraw_(a,b);(a=this.block_.getParent())?a.render():Blockly.fireUiEvent(window,"resize")};
Blockly.BlockSvg.prototype.renderFields_=function(a,b,c){Blockly.RTL&&(b=-b);for(var d=0,e;e=a[d];d++)Blockly.RTL?(b-=e.renderSep+e.renderWidth,e.getRootElement().setAttribute("transform","translate("+b+", "+c+")"),e.renderWidth&&(b-=Blockly.BlockSvg.SEP_SPACE_X)):(e.getRootElement().setAttribute("transform","translate("+(b+e.renderSep)+", "+c+")"),e.renderWidth&&(b+=e.renderSep+e.renderWidth+Blockly.BlockSvg.SEP_SPACE_X));return Blockly.RTL?-b:b};
Blockly.BlockSvg.prototype.renderCompute_=function(a){var b=this.block_.inputList,c=[];c.rightEdge=a+2*Blockly.BlockSvg.SEP_SPACE_X;if(this.block_.previousConnection||this.block_.nextConnection)c.rightEdge=Math.max(c.rightEdge,Blockly.BlockSvg.NOTCH_WIDTH+Blockly.BlockSvg.SEP_SPACE_X);for(var d=0,e=0,f=!1,g=!1,h=!1,k=void 0,l=this.block_.inputsInline&&!this.block_.isCollapsed(),p=0,m;m=b[p];p++)if(m.isVisible()){var q;l&&k&&k!=Blockly.NEXT_STATEMENT&&m.type!=Blockly.NEXT_STATEMENT?q=c[c.length-1]:
(k=m.type,q=[],q.type=l&&m.type!=Blockly.NEXT_STATEMENT?Blockly.BlockSvg.INLINE:m.type,q.height=0,c.push(q));q.push(m);m.renderHeight=Blockly.BlockSvg.MIN_BLOCK_Y;m.renderWidth=l&&m.type==Blockly.INPUT_VALUE?Blockly.BlockSvg.TAB_WIDTH+1.25*Blockly.BlockSvg.SEP_SPACE_X:0;if(m.connection&&m.connection.targetConnection){var n=m.connection.targetBlock().getHeightWidth();m.renderHeight=Math.max(m.renderHeight,n.height);m.renderWidth=Math.max(m.renderWidth,n.width)}p==b.length-1&&m.renderHeight--;q.height=
Math.max(q.height,m.renderHeight);m.fieldWidth=0;1==c.length&&(m.fieldWidth+=Blockly.RTL?-a:a);for(var n=!1,r=0,s;s=m.fieldRow[r];r++){0!=r&&(m.fieldWidth+=Blockly.BlockSvg.SEP_SPACE_X);var t=s.getSize();s.renderWidth=t.width;s.renderSep=n&&s.EDITABLE?Blockly.BlockSvg.SEP_SPACE_X:0;m.fieldWidth+=s.renderWidth+s.renderSep;q.height=Math.max(q.height,t.height);n=s.EDITABLE}q.type!=Blockly.BlockSvg.INLINE&&(q.type==Blockly.NEXT_STATEMENT?(g=!0,e=Math.max(e,m.fieldWidth)):(q.type==Blockly.INPUT_VALUE?
f=!0:q.type==Blockly.DUMMY_INPUT&&(h=!0),d=Math.max(d,m.fieldWidth)))}for(a=0;q=c[a];a++)if(q.thicker=!1,q.type==Blockly.BlockSvg.INLINE)for(b=0;m=q[b];b++)if(m.type==Blockly.INPUT_VALUE){q.height+=2*Blockly.BlockSvg.INLINE_PADDING_Y;q.thicker=!0;break}c.statementEdge=2*Blockly.BlockSvg.SEP_SPACE_X+e;g&&(c.rightEdge=Math.max(c.rightEdge,c.statementEdge+Blockly.BlockSvg.NOTCH_WIDTH));f?c.rightEdge=Math.max(c.rightEdge,d+2*Blockly.BlockSvg.SEP_SPACE_X+Blockly.BlockSvg.TAB_WIDTH):h&&(c.rightEdge=Math.max(c.rightEdge,
d+2*Blockly.BlockSvg.SEP_SPACE_X));c.hasValue=f;c.hasStatement=g;c.hasDummy=h;return c};
Blockly.BlockSvg.prototype.renderDraw_=function(a,b){if(this.block_.outputConnection)this.squareBottomLeftCorner_=this.squareTopLeftCorner_=!0;else{this.squareBottomLeftCorner_=this.squareTopLeftCorner_=!1;if(this.block_.previousConnection){var c=this.block_.previousConnection.targetBlock();c&&c.getNextBlock()==this.block_&&(this.squareTopLeftCorner_=!0)}this.block_.getNextBlock()&&(this.squareBottomLeftCorner_=!0)}var d=this.block_.getRelativeToSurfaceXY(),e=[],f=[],c=[],g=[];this.renderDrawTop_(e,
c,d,b.rightEdge);var h=this.renderDrawRight_(e,c,f,g,d,b,a);this.renderDrawBottom_(e,c,d,h);this.renderDrawLeft_(e,c,d,h);d=e.join(" ")+"\n"+f.join(" ");this.svgPath_.setAttribute("d",d);this.svgPathDark_.setAttribute("d",d);d=c.join(" ")+"\n"+g.join(" ");this.svgPathLight_.setAttribute("d",d);Blockly.RTL&&(this.svgPath_.setAttribute("transform","scale(-1 1)"),this.svgPathLight_.setAttribute("transform","scale(-1 1)"),this.svgPathDark_.setAttribute("transform","translate(1,1) scale(-1 1)"))};
Blockly.BlockSvg.prototype.renderDrawTop_=function(a,b,c,d){this.squareTopLeftCorner_?(a.push("m 0,0"),b.push("m 1,1")):(a.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START),b.push(Blockly.RTL?Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL:Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR),a.push(Blockly.BlockSvg.TOP_LEFT_CORNER),b.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT));this.block_.previousConnection&&(a.push("H",Blockly.BlockSvg.NOTCH_WIDTH-15),b.push("H",Blockly.BlockSvg.NOTCH_WIDTH-
15),a.push(Blockly.BlockSvg.NOTCH_PATH_LEFT),b.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT),this.block_.previousConnection.moveTo(c.x+(Blockly.RTL?-Blockly.BlockSvg.NOTCH_WIDTH:Blockly.BlockSvg.NOTCH_WIDTH),c.y));a.push("H",d);b.push("H",d+(Blockly.RTL?-1:0));this.width=d};
Blockly.BlockSvg.prototype.renderDrawRight_=function(a,b,c,d,e,f,g){for(var h,k=0,l,p,m=0,q;q=f[m];m++){h=Blockly.BlockSvg.SEP_SPACE_X;0==m&&(h+=Blockly.RTL?-g:g);b.push("M",f.rightEdge-1+","+(k+1));if(this.block_.isCollapsed()){var n=q[0];l=k+Blockly.BlockSvg.FIELD_HEIGHT;this.renderFields_(n.fieldRow,h,l);a.push(Blockly.BlockSvg.JAGGED_TEETH);Blockly.RTL?b.push("l 8,0 0,3.8 7,3.2 m -14.5,9 l 8,4"):b.push("h 8");n=q.height-Blockly.BlockSvg.JAGGED_TEETH_HEIGHT;a.push("v",n);Blockly.RTL&&b.push("v",
n-2);this.width+=Blockly.BlockSvg.JAGGED_TEETH_WIDTH}else if(q.type==Blockly.BlockSvg.INLINE){for(var r=0;n=q[r];r++)l=k+Blockly.BlockSvg.FIELD_HEIGHT,q.thicker&&(l+=Blockly.BlockSvg.INLINE_PADDING_Y),h=this.renderFields_(n.fieldRow,h,l),n.type!=Blockly.DUMMY_INPUT&&(h+=n.renderWidth+Blockly.BlockSvg.SEP_SPACE_X),n.type==Blockly.INPUT_VALUE&&(c.push("M",h-Blockly.BlockSvg.SEP_SPACE_X+","+(k+Blockly.BlockSvg.INLINE_PADDING_Y)),c.push("h",Blockly.BlockSvg.TAB_WIDTH-2-n.renderWidth),c.push(Blockly.BlockSvg.TAB_PATH_DOWN),
c.push("v",n.renderHeight+1-Blockly.BlockSvg.TAB_HEIGHT),c.push("h",n.renderWidth+2-Blockly.BlockSvg.TAB_WIDTH),c.push("z"),Blockly.RTL?(d.push("M",h-Blockly.BlockSvg.SEP_SPACE_X-3+Blockly.BlockSvg.TAB_WIDTH-n.renderWidth+","+(k+Blockly.BlockSvg.INLINE_PADDING_Y+1)),d.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL),d.push("v",n.renderHeight-Blockly.BlockSvg.TAB_HEIGHT+3),d.push("h",n.renderWidth-Blockly.BlockSvg.TAB_WIDTH+1)):(d.push("M",h-Blockly.BlockSvg.SEP_SPACE_X+1+","+(k+Blockly.BlockSvg.INLINE_PADDING_Y+
1)),d.push("v",n.renderHeight+1),d.push("h",Blockly.BlockSvg.TAB_WIDTH-2-n.renderWidth),d.push("M",h-n.renderWidth-Blockly.BlockSvg.SEP_SPACE_X+.8+","+(k+Blockly.BlockSvg.INLINE_PADDING_Y+Blockly.BlockSvg.TAB_HEIGHT-.4)),d.push("l",.42*Blockly.BlockSvg.TAB_WIDTH+",-1.8")),l=Blockly.RTL?e.x-h-Blockly.BlockSvg.TAB_WIDTH+Blockly.BlockSvg.SEP_SPACE_X+n.renderWidth+1:e.x+h+Blockly.BlockSvg.TAB_WIDTH-Blockly.BlockSvg.SEP_SPACE_X-n.renderWidth-1,p=e.y+k+Blockly.BlockSvg.INLINE_PADDING_Y+1,n.connection.moveTo(l,
p),n.connection.targetConnection&&n.connection.tighten_());h=Math.max(h,f.rightEdge);this.width=Math.max(this.width,h);a.push("H",h);b.push("H",h+(Blockly.RTL?-1:0));a.push("v",q.height);Blockly.RTL&&b.push("v",q.height-2)}else q.type==Blockly.INPUT_VALUE?(n=q[0],l=k+Blockly.BlockSvg.FIELD_HEIGHT,n.align!=Blockly.ALIGN_LEFT&&(r=f.rightEdge-n.fieldWidth-Blockly.BlockSvg.TAB_WIDTH-2*Blockly.BlockSvg.SEP_SPACE_X,n.align==Blockly.ALIGN_RIGHT?h+=r:n.align==Blockly.ALIGN_CENTRE&&(h+=(r+h)/2)),this.renderFields_(n.fieldRow,
h,l),a.push(Blockly.BlockSvg.TAB_PATH_DOWN),r=q.height-Blockly.BlockSvg.TAB_HEIGHT,a.push("v",r),Blockly.RTL?(b.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL),b.push("v",r)):(b.push("M",f.rightEdge-4.2+","+(k+Blockly.BlockSvg.TAB_HEIGHT-.4)),b.push("l",.42*Blockly.BlockSvg.TAB_WIDTH+",-1.8")),l=e.x+(Blockly.RTL?-f.rightEdge-1:f.rightEdge+1),p=e.y+k,n.connection.moveTo(l,p),n.connection.targetConnection&&(n.connection.tighten_(),this.width=Math.max(this.width,f.rightEdge+n.connection.targetBlock().getHeightWidth().width-
Blockly.BlockSvg.TAB_WIDTH+1))):q.type==Blockly.DUMMY_INPUT?(n=q[0],l=k+Blockly.BlockSvg.FIELD_HEIGHT,n.align!=Blockly.ALIGN_LEFT&&(r=f.rightEdge-n.fieldWidth-2*Blockly.BlockSvg.SEP_SPACE_X,f.hasValue&&(r-=Blockly.BlockSvg.TAB_WIDTH),n.align==Blockly.ALIGN_RIGHT?h+=r:n.align==Blockly.ALIGN_CENTRE&&(h+=(r+h)/2)),this.renderFields_(n.fieldRow,h,l),a.push("v",q.height),Blockly.RTL&&b.push("v",q.height-2)):q.type==Blockly.NEXT_STATEMENT&&(n=q[0],0==m&&(a.push("v",Blockly.BlockSvg.SEP_SPACE_Y),Blockly.RTL&&
b.push("v",Blockly.BlockSvg.SEP_SPACE_Y-1),k+=Blockly.BlockSvg.SEP_SPACE_Y),l=k+Blockly.BlockSvg.FIELD_HEIGHT,n.align!=Blockly.ALIGN_LEFT&&(r=f.statementEdge-n.fieldWidth-2*Blockly.BlockSvg.SEP_SPACE_X,n.align==Blockly.ALIGN_RIGHT?h+=r:n.align==Blockly.ALIGN_CENTRE&&(h+=(r+h)/2)),this.renderFields_(n.fieldRow,h,l),h=f.statementEdge+Blockly.BlockSvg.NOTCH_WIDTH,a.push("H",h),a.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER),a.push("v",q.height-2*Blockly.BlockSvg.CORNER_RADIUS),a.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER),
a.push("H",f.rightEdge),Blockly.RTL?(b.push("M",h-Blockly.BlockSvg.NOTCH_WIDTH+Blockly.BlockSvg.DISTANCE_45_OUTSIDE+","+(k+Blockly.BlockSvg.DISTANCE_45_OUTSIDE)),b.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL),b.push("v",q.height-2*Blockly.BlockSvg.CORNER_RADIUS),b.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL),b.push("H",f.rightEdge-1)):(b.push("M",h-Blockly.BlockSvg.NOTCH_WIDTH+Blockly.BlockSvg.DISTANCE_45_OUTSIDE+","+(k+q.height-Blockly.BlockSvg.DISTANCE_45_OUTSIDE)),
b.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR),b.push("H",f.rightEdge)),l=e.x+(Blockly.RTL?-h:h),p=e.y+k+1,n.connection.moveTo(l,p),n.connection.targetConnection&&(n.connection.tighten_(),this.width=Math.max(this.width,f.statementEdge+n.connection.targetBlock().getHeightWidth().width)),m==f.length-1||f[m+1].type==Blockly.NEXT_STATEMENT)&&(a.push("v",Blockly.BlockSvg.SEP_SPACE_Y),Blockly.RTL&&b.push("v",Blockly.BlockSvg.SEP_SPACE_Y-1),k+=Blockly.BlockSvg.SEP_SPACE_Y);k+=q.height}f.length||
(k=Blockly.BlockSvg.MIN_BLOCK_Y,a.push("V",k),Blockly.RTL&&b.push("V",k-1));return k};
Blockly.BlockSvg.prototype.renderDrawBottom_=function(a,b,c,d){this.height=d+1;this.block_.nextConnection&&(a.push("H",Blockly.BlockSvg.NOTCH_WIDTH+" "+Blockly.BlockSvg.NOTCH_PATH_RIGHT),this.block_.nextConnection.moveTo(Blockly.RTL?c.x-Blockly.BlockSvg.NOTCH_WIDTH:c.x+Blockly.BlockSvg.NOTCH_WIDTH,c.y+d+1),this.block_.nextConnection.targetConnection&&this.block_.nextConnection.tighten_(),this.height+=4);this.squareBottomLeftCorner_?(a.push("H 0"),Blockly.RTL||b.push("M","1,"+d)):(a.push("H",Blockly.BlockSvg.CORNER_RADIUS),
a.push("a",Blockly.BlockSvg.CORNER_RADIUS+","+Blockly.BlockSvg.CORNER_RADIUS+" 0 0,1 -"+Blockly.BlockSvg.CORNER_RADIUS+",-"+Blockly.BlockSvg.CORNER_RADIUS),Blockly.RTL||(b.push("M",Blockly.BlockSvg.DISTANCE_45_INSIDE+","+(d-Blockly.BlockSvg.DISTANCE_45_INSIDE)),b.push("A",Blockly.BlockSvg.CORNER_RADIUS-1+","+(Blockly.BlockSvg.CORNER_RADIUS-1)+" 0 0,1 1,"+(d-Blockly.BlockSvg.CORNER_RADIUS))))};
Blockly.BlockSvg.prototype.renderDrawLeft_=function(a,b,c,d){this.block_.outputConnection?(this.block_.outputConnection.moveTo(c.x,c.y),a.push("V",Blockly.BlockSvg.TAB_HEIGHT),a.push("c 0,-10 -"+Blockly.BlockSvg.TAB_WIDTH+",8 -"+Blockly.BlockSvg.TAB_WIDTH+",-7.5 s "+Blockly.BlockSvg.TAB_WIDTH+",2.5 "+Blockly.BlockSvg.TAB_WIDTH+",-7.5"),Blockly.RTL?(b.push("M",-.3*Blockly.BlockSvg.TAB_WIDTH+",8.9"),b.push("l",-.45*Blockly.BlockSvg.TAB_WIDTH+",-2.1")):(b.push("V",Blockly.BlockSvg.TAB_HEIGHT-1),b.push("m",
-.92*Blockly.BlockSvg.TAB_WIDTH+",-1 q "+-.19*Blockly.BlockSvg.TAB_WIDTH+",-5.5 0,-11"),b.push("m",.92*Blockly.BlockSvg.TAB_WIDTH+",1 V 1 H 2")),this.width+=Blockly.BlockSvg.TAB_WIDTH):Blockly.RTL||(this.squareTopLeftCorner_?b.push("V",1):b.push("V",Blockly.BlockSvg.CORNER_RADIUS));a.push("z")};
// Copyright 2013 Google Inc.  Apache License 2.0
Blockly.Blocks={};
Blockly.Blocks.addTemplate=function(a){goog.asserts.assert(a.blockName);goog.asserts.assert(Blockly.Blocks[a.blockName],"Blockly.Blocks already has a field named ",a.blockName);goog.asserts.assert(a.message);goog.asserts.assert(a.colour&&"number"==typeof a.colour&&0<=a.colour&&360>a.colour,"details.colour must be a number from 0 to 360 (exclusive)");"undefined"!=a.output&&(goog.asserts.assert(!a.previousStatement,"When details.output is defined, details.previousStatement must not be true."),goog.asserts.assert(!a.nextStatement,
"When details.output is defined, details.nextStatement must not be true."));var b={init:function(){var b=this;this.setColour(a.colour);this.setHelpUrl(a.helpUrl);"string"==typeof a.tooltip?this.setTooltip(a.tooltip):"function"==typeof a.tooltip&&this.setTooltip(function(){return a.tooltip(b)});"undefined"!=a.output?this.setOutput(!0,a.output):(this.setPreviousStatement("undefined"==typeof a.previousStatement?!0:a.previousStatement),this.setNextStatement("undefined"==typeof a.nextStatement?!0:a.nextStatement));
var d=[];d.push(a.text);a.args&&a.args.forEach(function(a){goog.asserts.assert(a.name);goog.asserts.assert("undefined"!=a.check);"undefined"==a.type||a.type==Blockly.INPUT_VALUE?d.push([a.name,a.check,"undefined"==typeof a.align?Blockly.ALIGN_RIGHT:a.align]):goog.asserts.fail("addTemplate() can only handle value inputs.")});d.push(Blockly.ALIGN_RIGHT);a.inline&&this.setInlineInputs(a.inline);Blockly.Block.prototype.interpolateMsg.apply(this,d)}};b.mutationToDom=a.switchable?function(){var b=a.mutationToDomFunc?
a.mutatationToDomFunc():document.createElement("mutation");b.setAttribute("is_statement",this.isStatement||!1);return b}:a.mutationToDomFunc;Blockly.Blocks[a.blockName]=b};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.ScrollbarPair=function(a){this.workspace_=a;this.oldHostMetrics_=null;this.hScroll=new Blockly.Scrollbar(a,!0,!0);this.vScroll=new Blockly.Scrollbar(a,!1,!0);this.corner_=Blockly.createSvgElement("rect",{height:Blockly.Scrollbar.scrollbarThickness,width:Blockly.Scrollbar.scrollbarThickness,style:"fill: #fff"},null);Blockly.Scrollbar.insertAfter_(this.corner_,a.getBubbleCanvas())};
Blockly.ScrollbarPair.prototype.dispose=function(){Blockly.unbindEvent_(this.onResizeWrapper_);this.onResizeWrapper_=null;goog.dom.removeNode(this.corner_);this.oldHostMetrics_=this.workspace_=this.corner_=null;this.hScroll.dispose();this.hScroll=null;this.vScroll.dispose();this.vScroll=null};
Blockly.ScrollbarPair.prototype.resize=function(){var a=this.workspace_.getMetrics();if(a){var b=!1,c=!1;this.oldHostMetrics_&&this.oldHostMetrics_.viewWidth==a.viewWidth&&this.oldHostMetrics_.viewHeight==a.viewHeight&&this.oldHostMetrics_.absoluteTop==a.absoluteTop&&this.oldHostMetrics_.absoluteLeft==a.absoluteLeft?(this.oldHostMetrics_&&this.oldHostMetrics_.contentWidth==a.contentWidth&&this.oldHostMetrics_.viewLeft==a.viewLeft&&this.oldHostMetrics_.contentLeft==a.contentLeft||(b=!0),this.oldHostMetrics_&&
this.oldHostMetrics_.contentHeight==a.contentHeight&&this.oldHostMetrics_.viewTop==a.viewTop&&this.oldHostMetrics_.contentTop==a.contentTop||(c=!0)):c=b=!0;b&&this.hScroll.resize(a);c&&this.vScroll.resize(a);this.oldHostMetrics_&&this.oldHostMetrics_.viewWidth==a.viewWidth&&this.oldHostMetrics_.absoluteLeft==a.absoluteLeft||this.corner_.setAttribute("x",this.vScroll.xCoordinate);this.oldHostMetrics_&&this.oldHostMetrics_.viewHeight==a.viewHeight&&this.oldHostMetrics_.absoluteTop==a.absoluteTop||this.corner_.setAttribute("y",
this.hScroll.yCoordinate);this.oldHostMetrics_=a}};Blockly.ScrollbarPair.prototype.set=function(a,b){this.hScroll.set(a);this.vScroll.set(b)};
Blockly.Scrollbar=function(a,b,c){this.workspace_=a;this.pair_=c||!1;this.horizontal_=b;this.createDom_();b?(this.svgBackground_.setAttribute("height",Blockly.Scrollbar.scrollbarThickness),this.svgKnob_.setAttribute("height",Blockly.Scrollbar.scrollbarThickness-6),this.svgKnob_.setAttribute("y",3)):(this.svgBackground_.setAttribute("width",Blockly.Scrollbar.scrollbarThickness),this.svgKnob_.setAttribute("width",Blockly.Scrollbar.scrollbarThickness-6),this.svgKnob_.setAttribute("x",3));this.onMouseDownBarWrapper_=
Blockly.bindEvent_(this.svgBackground_,"mousedown",this,this.onMouseDownBar_);this.onMouseDownKnobWrapper_=Blockly.bindEvent_(this.svgKnob_,"mousedown",this,this.onMouseDownKnob_)};Blockly.Scrollbar.scrollbarThickness="ontouchstart"in document.documentElement?25:15;
Blockly.Scrollbar.prototype.dispose=function(){this.onMouseUpKnob_();this.onResizeWrapper_&&(Blockly.unbindEvent_(this.onResizeWrapper_),this.onResizeWrapper_=null);Blockly.unbindEvent_(this.onMouseDownBarWrapper_);this.onMouseDownBarWrapper_=null;Blockly.unbindEvent_(this.onMouseDownKnobWrapper_);this.onMouseDownKnobWrapper_=null;goog.dom.removeNode(this.svgGroup_);this.workspace_=this.svgKnob_=this.svgBackground_=this.svgGroup_=null};
Blockly.Scrollbar.prototype.resize=function(a){if(!a&&(a=this.workspace_.getMetrics(),!a))return;if(this.horizontal_){var b=a.viewWidth;this.pair_?b-=Blockly.Scrollbar.scrollbarThickness:this.setVisible(b<a.contentHeight);this.ratio_=b/a.contentWidth;if(-Infinity===this.ratio_||Infinity===this.ratio_||isNaN(this.ratio_))this.ratio_=0;var c=a.viewWidth*this.ratio_,d=(a.viewLeft-a.contentLeft)*this.ratio_;this.svgKnob_.setAttribute("width",Math.max(0,c));this.xCoordinate=a.absoluteLeft;this.pair_&&
Blockly.RTL&&(this.xCoordinate+=a.absoluteLeft+Blockly.Scrollbar.scrollbarThickness);this.yCoordinate=a.absoluteTop+a.viewHeight-Blockly.Scrollbar.scrollbarThickness;this.svgGroup_.setAttribute("transform","translate("+this.xCoordinate+", "+this.yCoordinate+")");this.svgBackground_.setAttribute("width",Math.max(0,b));this.svgKnob_.setAttribute("x",this.constrainKnob_(d))}else{b=a.viewHeight;this.pair_?b-=Blockly.Scrollbar.scrollbarThickness:this.setVisible(b<a.contentHeight);this.ratio_=b/a.contentHeight;
if(-Infinity===this.ratio_||Infinity===this.ratio_||isNaN(this.ratio_))this.ratio_=0;c=a.viewHeight*this.ratio_;d=(a.viewTop-a.contentTop)*this.ratio_;this.svgKnob_.setAttribute("height",Math.max(0,c));this.xCoordinate=a.absoluteLeft;Blockly.RTL||(this.xCoordinate+=a.viewWidth-Blockly.Scrollbar.scrollbarThickness);this.yCoordinate=a.absoluteTop;this.svgGroup_.setAttribute("transform","translate("+this.xCoordinate+", "+this.yCoordinate+")");this.svgBackground_.setAttribute("height",Math.max(0,b));
this.svgKnob_.setAttribute("y",this.constrainKnob_(d))}this.onScroll_()};Blockly.Scrollbar.prototype.createDom_=function(){this.svgGroup_=Blockly.createSvgElement("g",{},null);this.svgBackground_=Blockly.createSvgElement("rect",{"class":"blocklyScrollbarBackground"},this.svgGroup_);var a=Math.floor((Blockly.Scrollbar.scrollbarThickness-6)/2);this.svgKnob_=Blockly.createSvgElement("rect",{"class":"blocklyScrollbarKnob",rx:a,ry:a},this.svgGroup_);Blockly.Scrollbar.insertAfter_(this.svgGroup_,this.workspace_.getBubbleCanvas())};
Blockly.Scrollbar.prototype.isVisible=function(){return"none"!=this.svgGroup_.getAttribute("display")};Blockly.Scrollbar.prototype.setVisible=function(a){if(a!=this.isVisible()){if(this.pair_)throw"Unable to toggle visibility of paired scrollbars.";a?this.svgGroup_.setAttribute("display","block"):(this.workspace_.setMetrics({x:0,y:0}),this.svgGroup_.setAttribute("display","none"))}};
Blockly.Scrollbar.prototype.onMouseDownBar_=function(a){this.onMouseUpKnob_();if(!Blockly.isRightButton(a)){var b=Blockly.mouseToSvg(a),b=this.horizontal_?b.x:b.y,c=Blockly.getSvgXY_(this.svgKnob_),c=this.horizontal_?c.x:c.y,d=parseFloat(this.svgKnob_.getAttribute(this.horizontal_?"width":"height")),e=parseFloat(this.svgKnob_.getAttribute(this.horizontal_?"x":"y")),f=.95*d;b<=c?e-=f:b>=c+d&&(e+=f);this.svgKnob_.setAttribute(this.horizontal_?"x":"y",this.constrainKnob_(e));this.onScroll_()}a.stopPropagation()};
Blockly.Scrollbar.prototype.onMouseDownKnob_=function(a){this.onMouseUpKnob_();Blockly.isRightButton(a)||(this.startDragKnob=parseFloat(this.svgKnob_.getAttribute(this.horizontal_?"x":"y")),this.startDragMouse=this.horizontal_?a.clientX:a.clientY,Blockly.Scrollbar.onMouseUpWrapper_=Blockly.bindEvent_(document,"mouseup",this,this.onMouseUpKnob_),Blockly.Scrollbar.onMouseMoveWrapper_=Blockly.bindEvent_(document,"mousemove",this,this.onMouseMoveKnob_));a.stopPropagation()};
Blockly.Scrollbar.prototype.onMouseMoveKnob_=function(a){this.svgKnob_.setAttribute(this.horizontal_?"x":"y",this.constrainKnob_(this.startDragKnob+((this.horizontal_?a.clientX:a.clientY)-this.startDragMouse)));this.onScroll_()};
Blockly.Scrollbar.prototype.onMouseUpKnob_=function(){Blockly.removeAllRanges();Blockly.hideChaff(!0);Blockly.Scrollbar.onMouseUpWrapper_&&(Blockly.unbindEvent_(Blockly.Scrollbar.onMouseUpWrapper_),Blockly.Scrollbar.onMouseUpWrapper_=null);Blockly.Scrollbar.onMouseMoveWrapper_&&(Blockly.unbindEvent_(Blockly.Scrollbar.onMouseMoveWrapper_),Blockly.Scrollbar.onMouseMoveWrapper_=null)};
Blockly.Scrollbar.prototype.constrainKnob_=function(a){if(0>=a||isNaN(a))a=0;else{var b=this.horizontal_?"width":"height",c=parseFloat(this.svgBackground_.getAttribute(b)),b=parseFloat(this.svgKnob_.getAttribute(b));a=Math.min(a,c-b)}return a};
Blockly.Scrollbar.prototype.onScroll_=function(){var a=parseFloat(this.svgKnob_.getAttribute(this.horizontal_?"x":"y")),b=parseFloat(this.svgBackground_.getAttribute(this.horizontal_?"width":"height")),a=a/b;isNaN(a)&&(a=0);b={};this.horizontal_?b.x=a:b.y=a;this.workspace_.setMetrics(b)};Blockly.Scrollbar.prototype.set=function(a){this.svgKnob_.setAttribute(this.horizontal_?"x":"y",a*this.ratio_);this.onScroll_()};
Blockly.Scrollbar.insertAfter_=function(a,b){var c=b.nextSibling,d=b.parentNode;if(!d)throw"Reference node has no parent.";c?d.insertBefore(a,c):d.appendChild(a)};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.Trashcan=function(a){this.workspace_=a};Blockly.Trashcan.prototype.SPRITE_URL_="media/sprites.png";Blockly.Trashcan.prototype.LID_URL_="media/trashlid.png";Blockly.Trashcan.prototype.WIDTH_=47;Blockly.Trashcan.prototype.BODY_HEIGHT_=45;Blockly.Trashcan.prototype.LID_HEIGHT_=15;Blockly.Trashcan.prototype.MARGIN_BOTTOM_=35;Blockly.Trashcan.prototype.MARGIN_SIDE_=35;Blockly.Trashcan.prototype.MARGIN_HOTSPOT_=25;Blockly.Trashcan.prototype.isOpen=!1;Blockly.Trashcan.prototype.svgGroup_=null;
Blockly.Trashcan.prototype.svgLid_=null;Blockly.Trashcan.prototype.lidTask_=0;Blockly.Trashcan.prototype.lidAngle_=0;Blockly.Trashcan.prototype.left_=0;Blockly.Trashcan.prototype.top_=0;
Blockly.Trashcan.prototype.createDom=function(){this.svgGroup_=Blockly.createSvgElement("g",{filter:"url(#blocklyTrashcanShadowFilter)"},null);var a=Blockly.createSvgElement("clipPath",{id:"blocklyTrashBodyClipPath"},this.svgGroup_);Blockly.createSvgElement("rect",{width:this.WIDTH_,height:this.BODY_HEIGHT_,y:this.LID_HEIGHT_},a);Blockly.createSvgElement("image",{width:Blockly.SPRITE.width,height:Blockly.SPRITE.height,y:-32,"clip-path":"url(#blocklyTrashBodyClipPath)"},this.svgGroup_).setAttributeNS("http://www.w3.org/1999/xlink",
"xlink:href",Blockly.pathToBlockly+Blockly.SPRITE.url);a=Blockly.createSvgElement("clipPath",{id:"blocklyTrashLidClipPath"},this.svgGroup_);Blockly.createSvgElement("rect",{width:this.WIDTH_,height:this.LID_HEIGHT_},a);this.svgLid_=Blockly.createSvgElement("image",{width:Blockly.SPRITE.width,height:Blockly.SPRITE.height,y:-32,"clip-path":"url(#blocklyTrashLidClipPath)"},this.svgGroup_);this.svgLid_.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",Blockly.pathToBlockly+Blockly.SPRITE.url);
return this.svgGroup_};Blockly.Trashcan.prototype.init=function(){this.setOpen_(!1);this.position_();Blockly.bindEvent_(window,"resize",this,this.position_)};Blockly.Trashcan.prototype.dispose=function(){this.svgGroup_&&(goog.dom.removeNode(this.svgGroup_),this.svgGroup_=null);this.workspace_=this.svgLid_=null;goog.Timer.clear(this.lidTask_)};
Blockly.Trashcan.prototype.position_=function(){var a=this.workspace_.getMetrics();a&&(this.left_=Blockly.RTL?this.MARGIN_SIDE_:a.viewWidth+a.absoluteLeft-this.WIDTH_-this.MARGIN_SIDE_,this.top_=a.viewHeight+a.absoluteTop-(this.BODY_HEIGHT_+this.LID_HEIGHT_)-this.MARGIN_BOTTOM_,this.svgGroup_.setAttribute("transform","translate("+this.left_+","+this.top_+")"))};
Blockly.Trashcan.prototype.onMouseMove=function(a){if(this.svgGroup_){a=Blockly.mouseToSvg(a);var b=Blockly.getSvgXY_(this.svgGroup_);a=a.x>b.x-this.MARGIN_HOTSPOT_&&a.x<b.x+this.WIDTH_+this.MARGIN_HOTSPOT_&&a.y>b.y-this.MARGIN_HOTSPOT_&&a.y<b.y+this.BODY_HEIGHT_+this.LID_HEIGHT_+this.MARGIN_HOTSPOT_;this.isOpen!=a&&this.setOpen_(a)}};Blockly.Trashcan.prototype.setOpen_=function(a){this.isOpen!=a&&(goog.Timer.clear(this.lidTask_),this.isOpen=a,this.animateLid_())};
Blockly.Trashcan.prototype.animateLid_=function(){this.lidAngle_+=this.isOpen?10:-10;this.lidAngle_=Math.max(0,this.lidAngle_);this.svgLid_.setAttribute("transform","rotate("+(Blockly.RTL?-this.lidAngle_:this.lidAngle_)+", "+(Blockly.RTL?4:this.WIDTH_-4)+", "+(this.LID_HEIGHT_-2)+")");if(this.isOpen?45>this.lidAngle_:0<this.lidAngle_)this.lidTask_=goog.Timer.callOnce(this.animateLid_,5,this)};Blockly.Trashcan.prototype.close=function(){this.setOpen_(!1)};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Xml={};Blockly.Xml.workspaceToDom=function(a){var b;Blockly.RTL&&(b=a.getMetrics().viewWidth);var c=goog.dom.createDom("xml");a=a.getTopBlocks(!0);for(var d=0,e;e=a[d];d++){var f=Blockly.Xml.blockToDom_(e);e=e.getRelativeToSurfaceXY();f.setAttribute("x",Blockly.RTL?b-e.x:e.x);f.setAttribute("y",e.y);c.appendChild(f)}return c};
Blockly.Xml.blockToDom_=function(a){var b=goog.dom.createDom("block");b.setAttribute("type",a.type);b.setAttribute("id",a.id);if(a.mutationToDom){var c=a.mutationToDom();c&&b.appendChild(c)}for(var d=0;c=a.inputList[d];d++)for(var e=0,f;f=c.fieldRow[e];e++)if(f.name&&f.EDITABLE){var g=goog.dom.createDom("field",null,f.getValue());g.setAttribute("name",f.name);b.appendChild(g)}a.comment&&(c=goog.dom.createDom("comment",null,a.comment.getText()),c.setAttribute("pinned",a.comment.isVisible()),d=a.comment.getBubbleSize(),
c.setAttribute("h",d.height),c.setAttribute("w",d.width),b.appendChild(c));d=!1;for(e=0;c=a.inputList[e];e++){var h;f=!0;c.type!=Blockly.DUMMY_INPUT&&(g=c.connection.targetBlock(),c.type==Blockly.INPUT_VALUE?(h=goog.dom.createDom("value"),d=!0):c.type==Blockly.NEXT_STATEMENT&&(h=goog.dom.createDom("statement")),g&&(h.appendChild(Blockly.Xml.blockToDom_(g)),f=!1),h.setAttribute("name",c.name),f||b.appendChild(h))}d&&b.setAttribute("inline",a.inputsInline);a.isCollapsed()&&b.setAttribute("collapsed",
!0);a.disabled&&b.setAttribute("disabled",!0);a.isDeletable()||b.setAttribute("deletable",!1);a.isMovable()||b.setAttribute("movable",!1);a.isEditable()||b.setAttribute("editable",!1);if(a=a.getNextBlock())h=goog.dom.createDom("next",null,Blockly.Xml.blockToDom_(a)),b.appendChild(h);return b};Blockly.Xml.domToText=function(a){return(new XMLSerializer).serializeToString(a)};
Blockly.Xml.domToPrettyText=function(a){a=Blockly.Xml.domToText(a).split("<");for(var b="",c=1;c<a.length;c++){var d=a[c];"/"==d[0]&&(b=b.substring(2));a[c]=b+"<"+d;"/"!=d[0]&&"/>"!=d.slice(-2)&&(b+="  ")}a=a.join("\n");a=a.replace(/(<(\w+)\b[^>]*>[^\n]*)\n *<\/\2>/g,"$1</$2>");return a.replace(/^\n/,"")};
Blockly.Xml.textToDom=function(a){a=(new DOMParser).parseFromString(a,"text/xml");if(!a||!a.firstChild||"xml"!=a.firstChild.nodeName.toLowerCase()||a.firstChild!==a.lastChild)throw"Blockly.Xml.textToDom did not obtain a valid XML tree.";return a.firstChild};
Blockly.Xml.domToWorkspace=function(a,b){if(Blockly.RTL)var c=a.getMetrics().viewWidth;for(var d=0,e;e=b.childNodes[d];d++)if("block"==e.nodeName.toLowerCase()){var f=Blockly.Xml.domToBlock(a,e),g=parseInt(e.getAttribute("x"),10);e=parseInt(e.getAttribute("y"),10);isNaN(g)||isNaN(e)||f.moveBy(Blockly.RTL?c-g:g,e)}};
Blockly.Xml.domToBlock=function(a,b,c){var d=null,e=b.getAttribute("type");if(!e)throw"Block type unspecified: \n"+b.outerHTML;var f=b.getAttribute("id");if(c&&f){d=Blockly.Block.getById(f,a);if(!d)throw"Couldn't get Block with id: "+f;f=d.getParent();d.workspace&&d.dispose(!0,!1,!0);d.fill(a,e);d.parent_=f}else d=Blockly.Block.obtain(a,e);d.svg_||d.initSvg();(f=b.getAttribute("inline"))&&d.setInputsInline("true"==f);(f=b.getAttribute("disabled"))&&d.setDisabled("true"==f);(f=b.getAttribute("deletable"))&&
d.setDeletable("true"==f);(f=b.getAttribute("movable"))&&d.setMovable("true"==f);(f=b.getAttribute("editable"))&&d.setEditable("true"==f);for(var g=null,f=0,h;h=b.childNodes[f];f++)if(3!=h.nodeType||!h.data.match(/^\s*$/)){for(var g=null,k=0,l;l=h.childNodes[k];k++)3==l.nodeType&&l.data.match(/^\s*$/)||(g=l);k=h.getAttribute("name");switch(h.nodeName.toLowerCase()){case "mutation":d.domToMutation&&d.domToMutation(h);break;case "comment":d.setCommentText(h.textContent);var p=h.getAttribute("pinned");
p&&setTimeout(function(){d.comment.setVisible("true"==p)},1);g=parseInt(h.getAttribute("w"),10);h=parseInt(h.getAttribute("h"),10);isNaN(g)||isNaN(h)||d.comment.setBubbleSize(g,h);break;case "title":case "field":d.setFieldValue(h.textContent,k);break;case "value":case "statement":h=d.getInput(k);if(!h)throw"Input "+k+" does not exist in block "+e;if(g&&"block"==g.nodeName.toLowerCase())if(g=Blockly.Xml.domToBlock(a,g,c),g.outputConnection)h.connection.connect(g.outputConnection);else if(g.previousConnection)h.connection.connect(g.previousConnection);
else throw"Child block does not have output or previous statement.";break;case "next":if(g&&"block"==g.nodeName.toLowerCase()){if(!d.nextConnection)throw"Next statement does not exist.";if(d.nextConnection.targetConnection)throw"Next statement is already connected.";g=Blockly.Xml.domToBlock(a,g,c);if(!g.previousConnection)throw"Next block does not have previous statement.";d.nextConnection.connect(g.previousConnection)}}}(a=b.getAttribute("collapsed"))&&d.setCollapsed("true"==a);(a=d.getNextBlock())?
a.render():d.render();return d};Blockly.Xml.deleteNext=function(a){for(var b=0,c;c=a.childNodes[b];b++)if("next"==c.nodeName.toLowerCase()){a.removeChild(c);break}};window.Blockly||(window.Blockly={});window.Blockly.Xml||(window.Blockly.Xml={});window.Blockly.Xml.domToText=Blockly.Xml.domToText;window.Blockly.Xml.domToWorkspace=Blockly.Xml.domToWorkspace;window.Blockly.Xml.textToDom=Blockly.Xml.textToDom;window.Blockly.Xml.workspaceToDom=Blockly.Xml.workspaceToDom;
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Workspace=function(a,b){this.getMetrics=a;this.setMetrics=b;this.isFlyout=!1;this.topBlocks_=[];this.maxBlocks=Infinity;Blockly.ConnectionDB.init(this)};Blockly.Workspace.SCAN_ANGLE=3;Blockly.Workspace.prototype.dragMode=!1;Blockly.Workspace.prototype.scrollX=0;Blockly.Workspace.prototype.scrollY=0;Blockly.Workspace.prototype.trashcan=null;Blockly.Workspace.prototype.fireChangeEventPid_=null;Blockly.Workspace.prototype.scrollbar=null;
Blockly.Workspace.prototype.createDom=function(){this.svgGroup_=Blockly.createSvgElement("g",{},null);this.svgBlockCanvas_=Blockly.createSvgElement("g",{},this.svgGroup_);this.svgBubbleCanvas_=Blockly.createSvgElement("g",{},this.svgGroup_);this.fireChangeEvent();return this.svgGroup_};
Blockly.Workspace.prototype.dispose=function(){this.svgGroup_&&(goog.dom.removeNode(this.svgGroup_),this.svgGroup_=null);this.svgBubbleCanvas_=this.svgBlockCanvas_=null;this.trashcan&&(this.trashcan.dispose(),this.trashcan=null)};Blockly.Workspace.prototype.addTrashcan=function(){if(Blockly.hasTrashcan&&!Blockly.readOnly){this.trashcan=new Blockly.Trashcan(this);var a=this.trashcan.createDom();this.svgGroup_.insertBefore(a,this.svgBlockCanvas_);this.trashcan.init()}};
Blockly.Workspace.prototype.getCanvas=function(){return this.svgBlockCanvas_};Blockly.Workspace.prototype.getBubbleCanvas=function(){return this.svgBubbleCanvas_};Blockly.Workspace.prototype.addTopBlock=function(a){this.topBlocks_.push(a);Blockly.Realtime.isEnabled()&&this==Blockly.mainWorkspace&&Blockly.Realtime.addTopBlock(a);this.fireChangeEvent()};
Blockly.Workspace.prototype.removeTopBlock=function(a){for(var b=!1,c,d=0;c=this.topBlocks_[d];d++)if(c==a){this.topBlocks_.splice(d,1);b=!0;break}if(!b)throw"Block not present in workspace's list of top-most blocks.";Blockly.Realtime.isEnabled()&&this==Blockly.mainWorkspace&&Blockly.Realtime.removeTopBlock(a);this.fireChangeEvent()};
Blockly.Workspace.prototype.getTopBlocks=function(a){var b=[].concat(this.topBlocks_);if(a&&1<b.length){var c=Math.sin(Blockly.Workspace.SCAN_ANGLE/180*Math.PI);Blockly.RTL&&(c*=-1);b.sort(function(a,b){var f=a.getRelativeToSurfaceXY(),g=b.getRelativeToSurfaceXY();return f.y+c*f.x-(g.y+c*g.x)})}return b};Blockly.Workspace.prototype.getAllBlocks=function(){for(var a=this.getTopBlocks(!1),b=0;b<a.length;b++)a.push.apply(a,a[b].getChildren());return a};Blockly.Workspace.prototype.clear=function(){for(Blockly.hideChaff();this.topBlocks_.length;)this.topBlocks_[0].dispose()};
Blockly.Workspace.prototype.render=function(){for(var a=this.getAllBlocks(),b=0,c;c=a[b];b++)c.getChildren().length||c.render()};Blockly.Workspace.prototype.getBlockById=function(a){for(var b=this.getAllBlocks(),c=0,d;d=b[c];c++)if(d.id==a)return d;return null};
Blockly.Workspace.prototype.traceOn=function(a){this.traceOn_=a;this.traceWrapper_&&(Blockly.unbindEvent_(this.traceWrapper_),this.traceWrapper_=null);a&&(this.traceWrapper_=Blockly.bindEvent_(this.svgBlockCanvas_,"blocklySelectChange",this,function(){this.traceOn_=!1}))};
Blockly.Workspace.prototype.highlightBlock=function(a){this.traceOn_&&0!=Blockly.Block.dragMode_&&this.traceOn(!1);if(this.traceOn_){var b=null;if(a&&(b=this.getBlockById(a),!b))return;this.traceOn(!1);b?b.select():Blockly.selected&&Blockly.selected.unselect();var c=this;setTimeout(function(){c.traceOn(!0)},1)}};
Blockly.Workspace.prototype.fireChangeEvent=function(){this.fireChangeEventPid_&&window.clearTimeout(this.fireChangeEventPid_);var a=this.svgBlockCanvas_;a&&(this.fireChangeEventPid_=window.setTimeout(function(){Blockly.fireUiEvent(a,"blocklyWorkspaceChange")},0))};
Blockly.Workspace.prototype.paste=function(a){if(!(a.getElementsByTagName("block").length>=this.remainingCapacity())){var b=Blockly.Xml.domToBlock(this,a),c=parseInt(a.getAttribute("x"),10);a=parseInt(a.getAttribute("y"),10);if(!isNaN(c)&&!isNaN(a)){Blockly.RTL&&(c=-c);do for(var d=!1,e=this.getAllBlocks(),f=0,g;g=e[f];f++)g=g.getRelativeToSurfaceXY(),1>=Math.abs(c-g.x)&&1>=Math.abs(a-g.y)&&(c=Blockly.RTL?c-Blockly.SNAP_RADIUS:c+Blockly.SNAP_RADIUS,a+=2*Blockly.SNAP_RADIUS,d=!0);while(d);b.moveBy(c,
a)}b.select()}};Blockly.Workspace.prototype.remainingCapacity=function(){return Infinity==this.maxBlocks?Infinity:this.maxBlocks-this.getAllBlocks().length};Blockly.Workspace.prototype.clear=Blockly.Workspace.prototype.clear;
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Bubble=function(a,b,c,d,e,f,g){var h=Blockly.Bubble.ARROW_ANGLE;Blockly.RTL&&(h=-h);this.arrow_radians_=h/360*Math.PI*2;this.workspace_=a;this.content_=b;this.shape_=c;a.getBubbleCanvas().appendChild(this.createDom_(b,!(!f||!g)));this.setAnchorLocation(d,e);f&&g||(a=this.content_.getBBox(),f=a.width+2*Blockly.Bubble.BORDER_WIDTH,g=a.height+2*Blockly.Bubble.BORDER_WIDTH);this.setBubbleSize(f,g);this.positionBubble_();this.renderArrow_();this.rendered_=!0;Blockly.readOnly||(Blockly.bindEvent_(this.bubbleBack_,
"mousedown",this,this.bubbleMouseDown_),this.resizeGroup_&&Blockly.bindEvent_(this.resizeGroup_,"mousedown",this,this.resizeMouseDown_))};Blockly.Bubble.BORDER_WIDTH=6;Blockly.Bubble.ARROW_THICKNESS=10;Blockly.Bubble.ARROW_ANGLE=20;Blockly.Bubble.ARROW_BEND=4;Blockly.Bubble.ANCHOR_RADIUS=8;Blockly.Bubble.onMouseUpWrapper_=null;Blockly.Bubble.onMouseMoveWrapper_=null;
Blockly.Bubble.unbindDragEvents_=function(){Blockly.Bubble.onMouseUpWrapper_&&(Blockly.unbindEvent_(Blockly.Bubble.onMouseUpWrapper_),Blockly.Bubble.onMouseUpWrapper_=null);Blockly.Bubble.onMouseMoveWrapper_&&(Blockly.unbindEvent_(Blockly.Bubble.onMouseMoveWrapper_),Blockly.Bubble.onMouseMoveWrapper_=null)};Blockly.Bubble.prototype.rendered_=!1;Blockly.Bubble.prototype.anchorX_=0;Blockly.Bubble.prototype.anchorY_=0;Blockly.Bubble.prototype.relativeLeft_=0;Blockly.Bubble.prototype.relativeTop_=0;
Blockly.Bubble.prototype.width_=0;Blockly.Bubble.prototype.height_=0;Blockly.Bubble.prototype.autoLayout_=!0;
Blockly.Bubble.prototype.createDom_=function(a,b){this.bubbleGroup_=Blockly.createSvgElement("g",{},null);var c=Blockly.createSvgElement("g",{filter:"url(#blocklyEmboss)"},this.bubbleGroup_);this.bubbleArrow_=Blockly.createSvgElement("path",{},c);this.bubbleBack_=Blockly.createSvgElement("rect",{"class":"blocklyDraggable",x:0,y:0,rx:Blockly.Bubble.BORDER_WIDTH,ry:Blockly.Bubble.BORDER_WIDTH},c);b?(this.resizeGroup_=Blockly.createSvgElement("g",{"class":Blockly.RTL?"blocklyResizeSW":"blocklyResizeSE"},
this.bubbleGroup_),c=2*Blockly.Bubble.BORDER_WIDTH,Blockly.createSvgElement("polygon",{points:"0,x x,x x,0".replace(/x/g,c.toString())},this.resizeGroup_),Blockly.createSvgElement("line",{"class":"blocklyResizeLine",x1:c/3,y1:c-1,x2:c-1,y2:c/3},this.resizeGroup_),Blockly.createSvgElement("line",{"class":"blocklyResizeLine",x1:2*c/3,y1:c-1,x2:c-1,y2:2*c/3},this.resizeGroup_)):this.resizeGroup_=null;this.bubbleGroup_.appendChild(a);return this.bubbleGroup_};
Blockly.Bubble.prototype.bubbleMouseDown_=function(a){this.promote_();Blockly.Bubble.unbindDragEvents_();Blockly.isRightButton(a)||Blockly.isTargetInput_(a)||(Blockly.setCursorHand_(!0),this.dragDeltaX=Blockly.RTL?this.relativeLeft_+a.clientX:this.relativeLeft_-a.clientX,this.dragDeltaY=this.relativeTop_-a.clientY,Blockly.Bubble.onMouseUpWrapper_=Blockly.bindEvent_(document,"mouseup",this,Blockly.Bubble.unbindDragEvents_),Blockly.Bubble.onMouseMoveWrapper_=Blockly.bindEvent_(document,"mousemove",
this,this.bubbleMouseMove_),Blockly.hideChaff(),a.stopPropagation())};Blockly.Bubble.prototype.bubbleMouseMove_=function(a){this.autoLayout_=!1;this.relativeLeft_=Blockly.RTL?this.dragDeltaX-a.clientX:this.dragDeltaX+a.clientX;this.relativeTop_=this.dragDeltaY+a.clientY;this.positionBubble_();this.renderArrow_()};
Blockly.Bubble.prototype.resizeMouseDown_=function(a){this.promote_();Blockly.Bubble.unbindDragEvents_();Blockly.isRightButton(a)||(Blockly.setCursorHand_(!0),this.resizeDeltaWidth=Blockly.RTL?this.width_+a.clientX:this.width_-a.clientX,this.resizeDeltaHeight=this.height_-a.clientY,Blockly.Bubble.onMouseUpWrapper_=Blockly.bindEvent_(document,"mouseup",this,Blockly.Bubble.unbindDragEvents_),Blockly.Bubble.onMouseMoveWrapper_=Blockly.bindEvent_(document,"mousemove",this,this.resizeMouseMove_),Blockly.hideChaff(),
a.stopPropagation())};Blockly.Bubble.prototype.resizeMouseMove_=function(a){this.autoLayout_=!1;var b=this.resizeDeltaWidth,c=this.resizeDeltaHeight+a.clientY,b=Blockly.RTL?b-a.clientX:b+a.clientX;this.setBubbleSize(b,c);Blockly.RTL&&this.positionBubble_()};Blockly.Bubble.prototype.registerResizeEvent=function(a,b){Blockly.bindEvent_(this.bubbleGroup_,"resize",a,b)};Blockly.Bubble.prototype.promote_=function(){this.bubbleGroup_.parentNode.appendChild(this.bubbleGroup_)};
Blockly.Bubble.prototype.setAnchorLocation=function(a,b){this.anchorX_=a;this.anchorY_=b;this.rendered_&&this.positionBubble_()};
Blockly.Bubble.prototype.layoutBubble_=function(){var a=-this.width_/4,b=-this.height_-Blockly.BlockSvg.MIN_BLOCK_Y,c=this.workspace_.getMetrics();Blockly.RTL?this.anchorX_-c.viewLeft-a-this.width_<Blockly.Scrollbar.scrollbarThickness?a=this.anchorX_-c.viewLeft-this.width_-Blockly.Scrollbar.scrollbarThickness:this.anchorX_-c.viewLeft-a>c.viewWidth&&(a=this.anchorX_-c.viewLeft-c.viewWidth):this.anchorX_+a<c.viewLeft?a=c.viewLeft-this.anchorX_:c.viewLeft+c.viewWidth<this.anchorX_+a+this.width_+Blockly.BlockSvg.SEP_SPACE_X+
Blockly.Scrollbar.scrollbarThickness&&(a=c.viewLeft+c.viewWidth-this.anchorX_-this.width_-Blockly.Scrollbar.scrollbarThickness);this.anchorY_+b<c.viewTop&&(b=this.shape_.getBBox().height);this.relativeLeft_=a;this.relativeTop_=b};Blockly.Bubble.prototype.positionBubble_=function(){this.bubbleGroup_.setAttribute("transform","translate("+(Blockly.RTL?this.anchorX_-this.relativeLeft_-this.width_:this.anchorX_+this.relativeLeft_)+", "+(this.relativeTop_+this.anchorY_)+")")};
Blockly.Bubble.prototype.getBubbleSize=function(){return{width:this.width_,height:this.height_}};
Blockly.Bubble.prototype.setBubbleSize=function(a,b){var c=2*Blockly.Bubble.BORDER_WIDTH;a=Math.max(a,c+45);b=Math.max(b,c+Blockly.BlockSvg.FIELD_HEIGHT);this.width_=a;this.height_=b;this.bubbleBack_.setAttribute("width",a);this.bubbleBack_.setAttribute("height",b);this.resizeGroup_&&(Blockly.RTL?this.resizeGroup_.setAttribute("transform","translate("+2*Blockly.Bubble.BORDER_WIDTH+", "+(b-c)+") scale(-1 1)"):this.resizeGroup_.setAttribute("transform","translate("+(a-c)+", "+(b-c)+")"));this.rendered_&&
(this.autoLayout_&&this.layoutBubble_(),this.positionBubble_(),this.renderArrow_());Blockly.fireUiEvent(this.bubbleGroup_,"resize")};
Blockly.Bubble.prototype.renderArrow_=function(){var a=[],b=this.width_/2,c=this.height_/2,d=-this.relativeLeft_,e=-this.relativeTop_;if(b==d&&c==e)a.push("M "+b+","+c);else{e-=c;d-=b;Blockly.RTL&&(d*=-1);var f=Math.sqrt(e*e+d*d),g=Math.acos(d/f);0>e&&(g=2*Math.PI-g);var h=g+Math.PI/2;h>2*Math.PI&&(h-=2*Math.PI);var k=Math.sin(h),l=Math.cos(h),p=this.getBubbleSize(),h=(p.width+p.height)/Blockly.Bubble.ARROW_THICKNESS,h=Math.min(h,p.width,p.height)/2,p=1-Blockly.Bubble.ANCHOR_RADIUS/f,d=b+p*d,e=c+
p*e,p=b+h*l,m=c+h*k,b=b-h*l,c=c-h*k,k=g+this.arrow_radians_;k>2*Math.PI&&(k-=2*Math.PI);g=Math.sin(k)*f/Blockly.Bubble.ARROW_BEND;f=Math.cos(k)*f/Blockly.Bubble.ARROW_BEND;a.push("M"+p+","+m);a.push("C"+(p+f)+","+(m+g)+" "+d+","+e+" "+d+","+e);a.push("C"+d+","+e+" "+(b+f)+","+(c+g)+" "+b+","+c)}a.push("z");this.bubbleArrow_.setAttribute("d",a.join(" "))};Blockly.Bubble.prototype.setColour=function(a){this.bubbleBack_.setAttribute("fill",a);this.bubbleArrow_.setAttribute("fill",a)};
Blockly.Bubble.prototype.dispose=function(){Blockly.Bubble.unbindDragEvents_();goog.dom.removeNode(this.bubbleGroup_);this.shape_=this.content_=this.workspace_=this.bubbleGroup_=null};
// Copyright 2013 Google Inc.  Apache License 2.0
Blockly.Icon=function(a){this.block_=a};Blockly.Icon.RADIUS=8;Blockly.Icon.prototype.bubble_=null;Blockly.Icon.prototype.iconX_=0;Blockly.Icon.prototype.iconY_=0;Blockly.Icon.prototype.createIcon_=function(){this.iconGroup_=Blockly.createSvgElement("g",{},null);this.block_.getSvgRoot().appendChild(this.iconGroup_);Blockly.bindEvent_(this.iconGroup_,"mouseup",this,this.iconClick_);this.updateEditable()};
Blockly.Icon.prototype.dispose=function(){goog.dom.removeNode(this.iconGroup_);this.iconGroup_=null;this.setVisible(!1);this.block_=null};Blockly.Icon.prototype.updateEditable=function(){this.block_.isInFlyout?Blockly.removeClass_(this.iconGroup_,"blocklyIconGroup"):Blockly.addClass_(this.iconGroup_,"blocklyIconGroup")};Blockly.Icon.prototype.isVisible=function(){return!!this.bubble_};Blockly.Icon.prototype.iconClick_=function(a){this.block_.isInFlyout||this.setVisible(!this.isVisible())};
Blockly.Icon.prototype.updateColour=function(){if(this.isVisible()){var a=Blockly.makeColour(this.block_.getColour());this.bubble_.setColour(a)}};
Blockly.Icon.prototype.renderIcon=function(a){if(this.block_.isCollapsed())return this.iconGroup_.setAttribute("display","none"),a;this.iconGroup_.setAttribute("display","block");var b=2*Blockly.Icon.RADIUS;Blockly.RTL&&(a-=b);this.iconGroup_.setAttribute("transform","translate("+a+", 5)");this.computeIconLocation();return a=Blockly.RTL?a-Blockly.BlockSvg.SEP_SPACE_X:a+(b+Blockly.BlockSvg.SEP_SPACE_X)};
Blockly.Icon.prototype.setIconLocation=function(a,b){this.iconX_=a;this.iconY_=b;this.isVisible()&&this.bubble_.setAnchorLocation(a,b)};Blockly.Icon.prototype.computeIconLocation=function(){var a=this.block_.getRelativeToSurfaceXY(),b=Blockly.getRelativeXY_(this.iconGroup_),c=a.x+b.x+Blockly.Icon.RADIUS,a=a.y+b.y+Blockly.Icon.RADIUS;c===this.iconX_&&a===this.iconY_||this.setIconLocation(c,a)};Blockly.Icon.prototype.getIconLocation=function(){return{x:this.iconX_,y:this.iconY_}};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.Comment=function(a){Blockly.Comment.superClass_.constructor.call(this,a);this.createIcon_()};goog.inherits(Blockly.Comment,Blockly.Icon);Blockly.Comment.prototype.text_="";Blockly.Comment.prototype.width_=160;Blockly.Comment.prototype.height_=80;
Blockly.Comment.prototype.createIcon_=function(){Blockly.Icon.prototype.createIcon_.call(this);Blockly.createSvgElement("circle",{"class":"blocklyIconShield",r:Blockly.Icon.RADIUS,cx:Blockly.Icon.RADIUS,cy:Blockly.Icon.RADIUS},this.iconGroup_);this.iconMark_=Blockly.createSvgElement("text",{"class":"blocklyIconMark",x:Blockly.Icon.RADIUS,y:2*Blockly.Icon.RADIUS-3},this.iconGroup_);this.iconMark_.appendChild(document.createTextNode("?"))};
Blockly.Comment.prototype.createEditor_=function(){this.foreignObject_=Blockly.createSvgElement("foreignObject",{x:Blockly.Bubble.BORDER_WIDTH,y:Blockly.Bubble.BORDER_WIDTH},null);var a=document.createElementNS(Blockly.HTML_NS,"body");a.setAttribute("xmlns",Blockly.HTML_NS);a.className="blocklyMinimalBody";this.textarea_=document.createElementNS(Blockly.HTML_NS,"textarea");this.textarea_.className="blocklyCommentTextarea";this.textarea_.setAttribute("dir",Blockly.RTL?"RTL":"LTR");a.appendChild(this.textarea_);
this.foreignObject_.appendChild(a);Blockly.bindEvent_(this.textarea_,"mouseup",this,this.textareaFocus_);return this.foreignObject_};Blockly.Comment.prototype.updateEditable=function(){this.isVisible()&&(this.setVisible(!1),this.setVisible(!0));Blockly.Icon.prototype.updateEditable.call(this)};
Blockly.Comment.prototype.resizeBubble_=function(){var a=this.bubble_.getBubbleSize(),b=2*Blockly.Bubble.BORDER_WIDTH;this.foreignObject_.setAttribute("width",a.width-b);this.foreignObject_.setAttribute("height",a.height-b);this.textarea_.style.width=a.width-b-4+"px";this.textarea_.style.height=a.height-b-4+"px"};
Blockly.Comment.prototype.setVisible=function(a){if(a!=this.isVisible())if(!this.block_.isEditable()&&!this.textarea_||goog.userAgent.IE)Blockly.Warning.prototype.setVisible.call(this,a);else{var b=this.getText(),c=this.getBubbleSize();a?(this.bubble_=new Blockly.Bubble(this.block_.workspace,this.createEditor_(),this.block_.svg_.svgPath_,this.iconX_,this.iconY_,this.width_,this.height_),this.bubble_.registerResizeEvent(this,this.resizeBubble_),this.updateColour(),this.text_=null):(this.bubble_.dispose(),
this.foreignObject_=this.textarea_=this.bubble_=null);this.setText(b);this.setBubbleSize(c.width,c.height)}};Blockly.Comment.prototype.textareaFocus_=function(a){this.bubble_.promote_();this.textarea_.focus()};Blockly.Comment.prototype.getBubbleSize=function(){return this.isVisible()?this.bubble_.getBubbleSize():{width:this.width_,height:this.height_}};Blockly.Comment.prototype.setBubbleSize=function(a,b){this.textarea_?this.bubble_.setBubbleSize(a,b):(this.width_=a,this.height_=b)};
Blockly.Comment.prototype.getText=function(){return this.textarea_?this.textarea_.value:this.text_};Blockly.Comment.prototype.setText=function(a){this.textarea_?this.textarea_.value=a:this.text_=a};Blockly.Comment.prototype.dispose=function(){this.block_.comment=null;Blockly.Icon.prototype.dispose.call(this)};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.Connection=function(a,b){this.sourceBlock_=a;this.targetConnection=null;this.type=b;this.y_=this.x_=0;this.inDB_=!1;this.dbList_=this.sourceBlock_.workspace.connectionDBList};
Blockly.Connection.prototype.dispose=function(){if(this.targetConnection)throw"Disconnect connection before disposing of it.";this.inDB_&&this.dbList_[this.type].removeConnection_(this);this.inDB_=!1;Blockly.highlightedConnection_==this&&(Blockly.highlightedConnection_=null);Blockly.localConnection_==this&&(Blockly.localConnection_=null)};Blockly.Connection.prototype.isSuperior=function(){return this.type==Blockly.INPUT_VALUE||this.type==Blockly.NEXT_STATEMENT};
Blockly.Connection.prototype.connect=function(a){if(this.sourceBlock_==a.sourceBlock_)throw"Attempted to connect a block to itself.";if(this.sourceBlock_.workspace!==a.sourceBlock_.workspace)throw"Blocks are on different workspaces.";if(Blockly.OPPOSITE_TYPE[this.type]!=a.type)throw"Attempt to connect incompatible types.";if(this.type==Blockly.INPUT_VALUE||this.type==Blockly.OUTPUT_VALUE){if(this.targetConnection)throw"Source connection already connected (value).";if(a.targetConnection){var b=a.targetBlock();
b.setParent(null);if(!b.outputConnection)throw"Orphan block does not have an output connection.";for(var c=this.sourceBlock_;c=Blockly.Connection.singleConnection_(c,b);)if(c.targetBlock())c=c.targetBlock();else{c.connect(b.outputConnection);b=null;break}b&&window.setTimeout(function(){b.outputConnection.bumpAwayFrom_(a)},Blockly.BUMP_DELAY)}}else{if(this.targetConnection)throw"Source connection already connected (block).";if(a.targetConnection){if(this.type!=Blockly.PREVIOUS_STATEMENT)throw"Can only do a mid-stack connection with the top of a block.";
b=a.targetBlock();b.setParent(null);if(!b.previousConnection)throw"Orphan block does not have a previous connection.";for(c=this.sourceBlock_;c.nextConnection;)if(c.nextConnection.targetConnection)c=c.getNextBlock();else{c.nextConnection.connect(b.previousConnection);b=null;break}b&&window.setTimeout(function(){b.previousConnection.bumpAwayFrom_(a)},Blockly.BUMP_DELAY)}}var d;this.isSuperior()?(c=this.sourceBlock_,d=a.sourceBlock_):(c=a.sourceBlock_,d=this.sourceBlock_);this.targetConnection=a;a.targetConnection=
this;d.setParent(c);c.rendered&&c.svg_.updateDisabled();d.rendered&&d.svg_.updateDisabled();c.rendered&&d.rendered&&(this.type==Blockly.NEXT_STATEMENT||this.type==Blockly.PREVIOUS_STATEMENT?d.render():c.render())};Blockly.Connection.singleConnection_=function(a,b){for(var c=!1,d=0;d<a.inputList.length;d++){var e=a.inputList[d].connection;if(e&&e.type==Blockly.INPUT_VALUE&&b.outputConnection.checkType_(e)){if(c)return null;c=e}}return c};
Blockly.Connection.prototype.disconnect=function(){var a=this.targetConnection;if(!a)throw"Source connection not connected.";if(a.targetConnection!=this)throw"Target connection not connected to source connection.";this.targetConnection=a.targetConnection=null;var b;this.isSuperior()?(b=this.sourceBlock_,a=a.sourceBlock_):(b=a.sourceBlock_,a=this.sourceBlock_);b.rendered&&b.render();a.rendered&&(a.svg_.updateDisabled(),a.render())};
Blockly.Connection.prototype.targetBlock=function(){return this.targetConnection?this.targetConnection.sourceBlock_:null};
Blockly.Connection.prototype.bumpAwayFrom_=function(a){if(0==Blockly.Block.dragMode_){var b=this.sourceBlock_.getRootBlock();if(!b.isInFlyout){var c=!1;if(!b.isMovable()){b=a.sourceBlock_.getRootBlock();if(!b.isMovable())return;a=this;c=!0}b.getSvgRoot().parentNode.appendChild(b.getSvgRoot());var d=a.x_+Blockly.SNAP_RADIUS-this.x_;a=a.y_+Blockly.SNAP_RADIUS-this.y_;c&&(a=-a);Blockly.RTL&&(d=-d);b.moveBy(d,a)}}};
Blockly.Connection.prototype.moveTo=function(a,b){this.inDB_&&this.dbList_[this.type].removeConnection_(this);this.x_=a;this.y_=b;this.dbList_[this.type].addConnection_(this)};Blockly.Connection.prototype.moveBy=function(a,b){this.moveTo(this.x_+a,this.y_+b)};
Blockly.Connection.prototype.highlight=function(){var a;this.type==Blockly.INPUT_VALUE||this.type==Blockly.OUTPUT_VALUE?(a=Blockly.RTL?-Blockly.BlockSvg.TAB_WIDTH:Blockly.BlockSvg.TAB_WIDTH,a="m 0,0 v 5 c 0,10 "+-a+",-8 "+-a+",7.5 s "+a+",-2.5 "+a+",7.5 v 5"):a=Blockly.RTL?"m 20,0 h -5 l -6,4 -3,0 -6,-4 h -5":"m -20,0 h 5 l 6,4 3,0 6,-4 h 5";var b=this.sourceBlock_.getRelativeToSurfaceXY();Blockly.Connection.highlightedPath_=Blockly.createSvgElement("path",{"class":"blocklyHighlightedConnectionPath",
d:a,transform:"translate("+(this.x_-b.x)+", "+(this.y_-b.y)+")"},this.sourceBlock_.getSvgRoot())};Blockly.Connection.prototype.unhighlight=function(){goog.dom.removeNode(Blockly.Connection.highlightedPath_);delete Blockly.Connection.highlightedPath_};
Blockly.Connection.prototype.tighten_=function(){var a=Math.round(this.targetConnection.x_-this.x_),b=Math.round(this.targetConnection.y_-this.y_);if(0!=a||0!=b){var c=this.targetBlock(),d=c.getSvgRoot();if(!d)throw"block is not rendered.";d=Blockly.getRelativeXY_(d);c.getSvgRoot().setAttribute("transform","translate("+(d.x-a)+", "+(d.y-b)+")");c.moveConnections_(-a,-b)}};
Blockly.Connection.prototype.closest=function(a,b,c){function d(b){var c=e[b];if((c.type==Blockly.OUTPUT_VALUE||c.type==Blockly.PREVIOUS_STATEMENT)&&c.targetConnection||c.type==Blockly.INPUT_VALUE&&c.targetConnection&&!c.targetBlock().isMovable()||!p.checkType_(c))return!0;c=c.sourceBlock_;do{if(l==c)return!0;c=c.getParent()}while(c);var d=f-e[b].x_,c=g-e[b].y_,d=Math.sqrt(d*d+c*c);d<=a&&(k=e[b],a=d);return c<a}if(this.targetConnection)return{connection:null,radius:a};var e=this.dbList_[Blockly.OPPOSITE_TYPE[this.type]],
f=this.x_+b,g=this.y_+c;b=0;for(var h=c=e.length-2;b<h;)e[h].y_<g?b=h:c=h,h=Math.floor((b+c)/2);c=b=h;var k=null,l=this.sourceBlock_,p=this;if(e.length){for(;0<=b&&d(b);)b--;do c++;while(c<e.length&&d(c))}return{connection:k,radius:a}};Blockly.Connection.prototype.checkType_=function(a){if(!this.check_||!a.check_)return!0;for(var b=0;b<this.check_.length;b++)if(-1!=a.check_.indexOf(this.check_[b]))return!0;return!1};
Blockly.Connection.prototype.setCheck=function(a){a?(goog.isArray(a)||(a=[a]),this.check_=a,this.targetConnection&&!this.checkType_(this.targetConnection)&&(this.isSuperior()?this.targetBlock().setParent(null):this.sourceBlock_.setParent(null),this.sourceBlock_.bumpNeighbours_())):this.check_=null;return this};
Blockly.Connection.prototype.neighbours_=function(a){function b(b){var f=d-c[b].x_,g=e-c[b].y_;Math.sqrt(f*f+g*g)<=a&&k.push(c[b]);return g<a}for(var c=this.dbList_[Blockly.OPPOSITE_TYPE[this.type]],d=this.x_,e=this.y_,f=0,g=c.length-2,h=g;f<h;)c[h].y_<e?f=h:g=h,h=Math.floor((f+g)/2);var g=f=h,k=[];if(c.length){for(;0<=f&&b(f);)f--;do g++;while(g<c.length&&b(g))}return k};
Blockly.Connection.prototype.hideAll=function(){this.inDB_&&this.dbList_[this.type].removeConnection_(this);if(this.targetConnection)for(var a=this.targetBlock().getDescendants(),b=0;b<a.length;b++){for(var c=a[b],d=c.getConnections_(!0),e=0;e<d.length;e++){var f=d[e];f.inDB_&&this.dbList_[f.type].removeConnection_(f)}c=c.getIcons();for(d=0;d<c.length;d++)c[d].setVisible(!1)}};
Blockly.Connection.prototype.unhideAll=function(){this.inDB_||this.dbList_[this.type].addConnection_(this);var a=[];if(this.type!=Blockly.INPUT_VALUE&&this.type!=Blockly.NEXT_STATEMENT)return a;var b=this.targetBlock();if(b){var c;b.isCollapsed()?(c=[],b.outputConnection&&c.push(b.outputConnection),b.nextConnection&&c.push(b.nextConnection),b.previousConnection&&c.push(b.previousConnection)):c=b.getConnections_(!0);for(var d=0;d<c.length;d++)a.push.apply(a,c[d].unhideAll());0==a.length&&(a[0]=b)}return a};
Blockly.ConnectionDB=function(){};Blockly.ConnectionDB.prototype=[];Blockly.ConnectionDB.constructor=Blockly.ConnectionDB;Blockly.ConnectionDB.prototype.addConnection_=function(a){if(a.inDB_)throw"Connection already in database.";for(var b=0,c=this.length;b<c;){var d=Math.floor((b+c)/2);if(this[d].y_<a.y_)b=d+1;else if(this[d].y_>a.y_)c=d;else{b=d;break}}this.splice(b,0,a);a.inDB_=!0};
Blockly.ConnectionDB.prototype.removeConnection_=function(a){if(!a.inDB_)throw"Connection not in database.";a.inDB_=!1;for(var b=0,c=this.length-2,d=c;b<d;)this[d].y_<a.y_?b=d:c=d,d=Math.floor((b+c)/2);for(c=b=d;0<=b&&this[b].y_==a.y_;){if(this[b]==a){this.splice(b,1);return}b--}do{if(this[c]==a){this.splice(c,1);return}c++}while(c<this.length&&this[c].y_==a.y_);throw"Unable to find connection in connectionDB.";};
Blockly.ConnectionDB.init=function(a){var b=[];b[Blockly.INPUT_VALUE]=new Blockly.ConnectionDB;b[Blockly.OUTPUT_VALUE]=new Blockly.ConnectionDB;b[Blockly.NEXT_STATEMENT]=new Blockly.ConnectionDB;b[Blockly.PREVIOUS_STATEMENT]=new Blockly.ConnectionDB;a.connectionDBList=b};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.ContextMenu={};Blockly.ContextMenu.currentBlock=null;
Blockly.ContextMenu.show=function(a,b){Blockly.WidgetDiv.show(Blockly.ContextMenu,null);if(b.length){for(var c=new goog.ui.Menu,d=0,e;e=b[d];d++){var f=new goog.ui.MenuItem(e.text);c.addChild(f,!0);f.setEnabled(e.enabled);e.enabled&&goog.events.listen(f,goog.ui.Component.EventType.ACTION,function(a){return function(){Blockly.doCommand(a)}}(e.callback))}goog.events.listen(c,goog.ui.Component.EventType.ACTION,Blockly.ContextMenu.hide);e=goog.dom.getViewportSize();f=goog.style.getViewportPageOffset(document);
c.render(Blockly.WidgetDiv.DIV);var g=c.getElement();Blockly.addClass_(g,"blocklyContextMenu");var h=goog.style.getSize(g),d=a.clientX+f.x,k=a.clientY+f.y;a.clientY+h.height>=e.height&&(k-=h.height);Blockly.RTL?h.width>=a.clientX&&(d+=h.width):a.clientX+h.width>=e.width&&(d-=h.width);Blockly.WidgetDiv.position(d,k,e,f);c.setAllowAutoFocus(!0);setTimeout(function(){g.focus()},1);Blockly.ContextMenu.currentBlock=null}else Blockly.ContextMenu.hide()};
Blockly.ContextMenu.hide=function(){Blockly.WidgetDiv.hideIfOwner(Blockly.ContextMenu);Blockly.ContextMenu.currentBlock=null};Blockly.ContextMenu.callbackFactory=function(a,b){return function(){var c=Blockly.Xml.domToBlock(a.workspace,b),d=a.getRelativeToSurfaceXY();d.x=Blockly.RTL?d.x-Blockly.SNAP_RADIUS:d.x+Blockly.SNAP_RADIUS;d.y+=2*Blockly.SNAP_RADIUS;c.moveBy(d.x,d.y);c.select()}};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Field=function(a){this.sourceBlock_=null;this.fieldGroup_=Blockly.createSvgElement("g",{},null);this.borderRect_=Blockly.createSvgElement("rect",{rx:4,ry:4,x:-Blockly.BlockSvg.SEP_SPACE_X/2,y:-12,height:16},this.fieldGroup_);this.textElement_=Blockly.createSvgElement("text",{"class":"blocklyText"},this.fieldGroup_);this.size_={height:25,width:0};this.setText(a);this.visible_=!0};Blockly.Field.prototype.clone=function(){goog.asserts.fail("There should never be an instance of Field, only its derived classes.")};
Blockly.Field.NBSP="\u00a0";Blockly.Field.prototype.EDITABLE=!0;Blockly.Field.prototype.init=function(a){if(this.sourceBlock_)throw"Field has already been initialized once.";this.sourceBlock_=a;this.updateEditable();a.getSvgRoot().appendChild(this.fieldGroup_);this.mouseUpWrapper_=Blockly.bindEvent_(this.fieldGroup_,"mouseup",this,this.onMouseUp_);this.setText(null)};
Blockly.Field.prototype.dispose=function(){this.mouseUpWrapper_&&(Blockly.unbindEvent_(this.mouseUpWrapper_),this.mouseUpWrapper_=null);this.sourceBlock_=null;goog.dom.removeNode(this.fieldGroup_);this.borderRect_=this.textElement_=this.fieldGroup_=null};
Blockly.Field.prototype.updateEditable=function(){this.EDITABLE&&(this.sourceBlock_.isEditable()?(Blockly.addClass_(this.fieldGroup_,"blocklyEditableText"),Blockly.removeClass_(this.fieldGroup_,"blocklyNoNEditableText"),this.fieldGroup_.style.cursor=this.CURSOR):(Blockly.addClass_(this.fieldGroup_,"blocklyNonEditableText"),Blockly.removeClass_(this.fieldGroup_,"blocklyEditableText"),this.fieldGroup_.style.cursor=""))};Blockly.Field.prototype.isVisible=function(){return this.visible_};
Blockly.Field.prototype.setVisible=function(a){this.visible_=a;this.getRootElement().style.display=a?"block":"none";this.render_()};Blockly.Field.prototype.getRootElement=function(){return this.fieldGroup_};Blockly.Field.prototype.render_=function(){try{var a=this.textElement_.getComputedTextLength()}catch(b){a=8*this.textElement_.childNodes[0].length}this.borderRect_&&this.borderRect_.setAttribute("width",a+Blockly.BlockSvg.SEP_SPACE_X);this.size_.width=a};
Blockly.Field.prototype.getSize=function(){this.size_.width||this.render_();return this.size_};Blockly.Field.prototype.getText=function(){return this.text_};Blockly.Field.prototype.setText=function(a){null!==a&&a!==this.text_&&(this.text_=a,this.updateTextNode_(),this.sourceBlock_&&this.sourceBlock_.rendered&&(this.sourceBlock_.render(),this.sourceBlock_.bumpNeighbours_(),this.sourceBlock_.workspace.fireChangeEvent()))};
Blockly.Field.prototype.updateTextNode_=function(){var a=this.text_;goog.dom.removeChildren(this.textElement_);a=a.replace(/\s/g,Blockly.Field.NBSP);Blockly.RTL&&a&&(a+="\u200f");a||(a=Blockly.Field.NBSP);a=document.createTextNode(a);this.textElement_.appendChild(a);this.size_.width=0};Blockly.Field.prototype.getValue=function(){return this.getText()};Blockly.Field.prototype.setValue=function(a){this.setText(a)};
Blockly.Field.prototype.onMouseUp_=function(a){if(!goog.userAgent.IPHONE&&!goog.userAgent.IPAD||0===a.layerX||0===a.layerY)Blockly.isRightButton(a)||2!=Blockly.Block.dragMode_&&this.sourceBlock_.isEditable()&&this.showEditor_()};Blockly.Field.prototype.setTooltip=function(a){};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.Tooltip={};Blockly.Tooltip.visible=!1;Blockly.Tooltip.LIMIT=50;Blockly.Tooltip.mouseOutPid_=0;Blockly.Tooltip.showPid_=0;Blockly.Tooltip.lastXY_={x:0,y:0};Blockly.Tooltip.element_=null;Blockly.Tooltip.poisonedElement_=null;Blockly.Tooltip.svgGroup_=null;Blockly.Tooltip.svgText_=null;Blockly.Tooltip.svgBackground_=null;Blockly.Tooltip.svgShadow_=null;Blockly.Tooltip.OFFSET_X=0;Blockly.Tooltip.OFFSET_Y=10;Blockly.Tooltip.RADIUS_OK=10;Blockly.Tooltip.HOVER_MS=1E3;Blockly.Tooltip.MARGINS=5;
Blockly.Tooltip.createDom=function(){var a=Blockly.createSvgElement("g",{"class":"blocklyHidden"},null);Blockly.Tooltip.svgGroup_=a;Blockly.Tooltip.svgShadow_=Blockly.createSvgElement("rect",{"class":"blocklyTooltipShadow",x:2,y:2},a);Blockly.Tooltip.svgBackground_=Blockly.createSvgElement("rect",{"class":"blocklyTooltipBackground"},a);Blockly.Tooltip.svgText_=Blockly.createSvgElement("text",{"class":"blocklyTooltipText"},a);return a};
Blockly.Tooltip.bindMouseEvents=function(a){Blockly.bindEvent_(a,"mouseover",null,Blockly.Tooltip.onMouseOver_);Blockly.bindEvent_(a,"mouseout",null,Blockly.Tooltip.onMouseOut_);Blockly.bindEvent_(a,"mousemove",null,Blockly.Tooltip.onMouseMove_)};Blockly.Tooltip.onMouseOver_=function(a){for(a=a.target;!goog.isString(a.tooltip)&&!goog.isFunction(a.tooltip);)a=a.tooltip;Blockly.Tooltip.element_!=a&&(Blockly.Tooltip.hide(),Blockly.Tooltip.poisonedElement_=null,Blockly.Tooltip.element_=a);window.clearTimeout(Blockly.Tooltip.mouseOutPid_)};
Blockly.Tooltip.onMouseOut_=function(a){Blockly.Tooltip.mouseOutPid_=window.setTimeout(function(){Blockly.Tooltip.element_=null;Blockly.Tooltip.poisonedElement_=null;Blockly.Tooltip.hide()},1);window.clearTimeout(Blockly.Tooltip.showPid_)};
Blockly.Tooltip.onMouseMove_=function(a){if(Blockly.Tooltip.element_&&Blockly.Tooltip.element_.tooltip&&0==Blockly.Block.dragMode_&&!Blockly.WidgetDiv.isVisible())if(Blockly.Tooltip.visible){a=Blockly.mouseToSvg(a);var b=Blockly.Tooltip.lastXY_.y-a.y;Math.sqrt(Math.pow(Blockly.Tooltip.lastXY_.x-a.x,2)+Math.pow(b,2))>Blockly.Tooltip.RADIUS_OK&&Blockly.Tooltip.hide()}else Blockly.Tooltip.poisonedElement_!=Blockly.Tooltip.element_&&(window.clearTimeout(Blockly.Tooltip.showPid_),Blockly.Tooltip.lastXY_=
Blockly.mouseToSvg(a),Blockly.Tooltip.showPid_=window.setTimeout(Blockly.Tooltip.show_,Blockly.Tooltip.HOVER_MS))};Blockly.Tooltip.hide=function(){Blockly.Tooltip.visible&&(Blockly.Tooltip.visible=!1,Blockly.Tooltip.svgGroup_&&(Blockly.Tooltip.svgGroup_.style.display="none"));window.clearTimeout(Blockly.Tooltip.showPid_)};
Blockly.Tooltip.show_=function(){Blockly.Tooltip.poisonedElement_=Blockly.Tooltip.element_;if(Blockly.Tooltip.svgGroup_){goog.dom.removeChildren(Blockly.Tooltip.svgText_);var a=Blockly.Tooltip.element_.tooltip;goog.isFunction(a)&&(a=a());for(var a=Blockly.Tooltip.wrap_(a,Blockly.Tooltip.LIMIT),a=a.split("\n"),b=0;b<a.length;b++){var c=Blockly.createSvgElement("tspan",{dy:"1em",x:Blockly.Tooltip.MARGINS},Blockly.Tooltip.svgText_),d=document.createTextNode(a[b]);c.appendChild(d)}Blockly.Tooltip.visible=
!0;Blockly.Tooltip.svgGroup_.style.display="block";a=Blockly.Tooltip.svgText_.getBBox();b=2*Blockly.Tooltip.MARGINS+a.width;c=a.height;Blockly.Tooltip.svgBackground_.setAttribute("width",b);Blockly.Tooltip.svgBackground_.setAttribute("height",c);Blockly.Tooltip.svgShadow_.setAttribute("width",b);Blockly.Tooltip.svgShadow_.setAttribute("height",c);if(Blockly.RTL)for(var c=a.width,d=0,e;e=Blockly.Tooltip.svgText_.childNodes[d];d++)e.setAttribute("text-anchor","end"),e.setAttribute("x",c+Blockly.Tooltip.MARGINS);
c=Blockly.Tooltip.lastXY_.x;c=Blockly.RTL?c-(Blockly.Tooltip.OFFSET_X+b):c+Blockly.Tooltip.OFFSET_X;b=Blockly.Tooltip.lastXY_.y+Blockly.Tooltip.OFFSET_Y;d=Blockly.svgSize();b+a.height>d.height&&(b-=a.height+2*Blockly.Tooltip.OFFSET_Y);Blockly.RTL?c=Math.max(Blockly.Tooltip.MARGINS,c):c+a.width>d.width-2*Blockly.Tooltip.MARGINS&&(c=d.width-a.width-2*Blockly.Tooltip.MARGINS);Blockly.Tooltip.svgGroup_.setAttribute("transform","translate("+c+","+b+")")}};
Blockly.Tooltip.wrap_=function(a,b){if(a.length<=b)return a;for(var c=a.trim().split(/\s+/),d=0;d<c.length;d++)c[d].length>b&&(b=c[d].length);var e,d=-Infinity,f,g=1;do{e=d;f=a;for(var h=[],k=c.length/g,l=1,d=0;d<c.length-1;d++)l<(d+1.5)/k?(l++,h[d]=!0):h[d]=!1;h=Blockly.Tooltip.wrapMutate_(c,h,b);d=Blockly.Tooltip.wrapScore_(c,h,b);a=Blockly.Tooltip.wrapToText_(c,h);g++}while(d>e);return f};
Blockly.Tooltip.wrapScore_=function(a,b,c){for(var d=[0],e=[],f=0;f<a.length;f++)d[d.length-1]+=a[f].length,!0===b[f]?(d.push(0),e.push(a[f].charAt(a[f].length-1))):!1===b[f]&&d[d.length-1]++;a=Math.max.apply(Math,d);for(f=b=0;f<d.length;f++)b-=2*Math.pow(Math.abs(c-d[f]),1.5),b-=Math.pow(a-d[f],1.5),-1!=".?!".indexOf(e[f])?b+=c/3:-1!=",;)]}".indexOf(e[f])&&(b+=c/4);1<d.length&&d[d.length-1]<=d[d.length-2]&&(b+=.5);return b};
Blockly.Tooltip.wrapMutate_=function(a,b,c){for(var d=Blockly.Tooltip.wrapScore_(a,b,c),e,f=0;f<b.length-1;f++)if(b[f]!=b[f+1]){var g=[].concat(b);g[f]=!g[f];g[f+1]=!g[f+1];var h=Blockly.Tooltip.wrapScore_(a,g,c);h>d&&(d=h,e=g)}return e?Blockly.Tooltip.wrapMutate_(a,e,c):b};Blockly.Tooltip.wrapToText_=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),void 0!==b[d]&&c.push(b[d]?"\n":" ");return c.join("")};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.FieldLabel=function(a){this.sourceBlock_=null;this.textElement_=Blockly.createSvgElement("text",{"class":"blocklyText"},null);this.size_={height:25,width:0};this.setText(a)};goog.inherits(Blockly.FieldLabel,Blockly.Field);Blockly.FieldLabel.prototype.clone=function(){return new Blockly.FieldLabel(this.getText())};Blockly.FieldLabel.prototype.EDITABLE=!1;
Blockly.FieldLabel.prototype.init=function(a){if(this.sourceBlock_)throw"Text has already been initialized once.";this.sourceBlock_=a;a.getSvgRoot().appendChild(this.textElement_);this.textElement_.tooltip=this.sourceBlock_;Blockly.Tooltip.bindMouseEvents(this.textElement_)};Blockly.FieldLabel.prototype.dispose=function(){goog.dom.removeNode(this.textElement_);this.textElement_=null};Blockly.FieldLabel.prototype.getRootElement=function(){return this.textElement_};
Blockly.FieldLabel.prototype.setTooltip=function(a){this.textElement_.tooltip=a};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Input=function(a,b,c,d){this.type=a;this.name=b;this.sourceBlock_=c;this.connection=d;this.fieldRow=[];this.align=Blockly.ALIGN_LEFT;this.visible_=!0};
Blockly.Input.prototype.appendField=function(a,b){if(!a&&!b)return this;goog.isString(a)&&(a=new Blockly.FieldLabel(a));this.sourceBlock_.svg_&&a.init(this.sourceBlock_);a.name=b;a.prefixField&&this.appendField(a.prefixField);this.fieldRow.push(a);a.suffixField&&this.appendField(a.suffixField);this.sourceBlock_.rendered&&(this.sourceBlock_.render(),this.sourceBlock_.bumpNeighbours_());return this};
Blockly.Input.prototype.appendTitle=function(a,b){console.log("Deprecated call to appendTitle, use appendField instead.");return this.appendField(a,b)};Blockly.Input.prototype.removeField=function(a){for(var b=0,c;c=this.fieldRow[b];b++)if(c.name===a){c.dispose();this.fieldRow.splice(b,1);this.sourceBlock_.rendered&&(this.sourceBlock_.render(),this.sourceBlock_.bumpNeighbours_());return}goog.asserts.fail('Field "%s" not found.',a)};Blockly.Input.prototype.isVisible=function(){return this.visible_};
Blockly.Input.prototype.setVisible=function(a){var b=[];if(this.visible_==a)return b;for(var c=(this.visible_=a)?"block":"none",d=0,e;e=this.fieldRow[d];d++)e.setVisible(a);this.connection&&(a?b=this.connection.unhideAll():this.connection.hideAll(),d=this.connection.targetBlock())&&(d.svg_.getRootElement().style.display=c,a||(d.rendered=!1));return b};Blockly.Input.prototype.setCheck=function(a){if(!this.connection)throw"This input does not have a connection.";this.connection.setCheck(a);return this};
Blockly.Input.prototype.setAlign=function(a){this.align=a;this.sourceBlock_.rendered&&this.sourceBlock_.render();return this};Blockly.Input.prototype.init=function(){for(var a=0;a<this.fieldRow.length;a++)this.fieldRow[a].init(this.sourceBlock_)};Blockly.Input.prototype.dispose=function(){for(var a=0,b;b=this.fieldRow[a];a++)b.dispose();this.connection&&this.connection.dispose();this.sourceBlock_=null};
// Copyright 2013 Google Inc.  Apache License 2.0
Blockly.Msg={};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Mutator=function(a){Blockly.Mutator.superClass_.constructor.call(this,null);this.quarkXml_=[];for(var b=0;b<a.length;b++){var c=goog.dom.createDom("block",{type:a[b]});this.quarkXml_[b]=c}};goog.inherits(Blockly.Mutator,Blockly.Icon);Blockly.Mutator.prototype.workspaceWidth_=0;Blockly.Mutator.prototype.workspaceHeight_=0;
Blockly.Mutator.prototype.createIcon=function(){Blockly.Icon.prototype.createIcon_.call(this);var a=Blockly.Icon.RADIUS/2;Blockly.createSvgElement("rect",{"class":"blocklyIconShield",width:4*a,height:4*a,rx:a,ry:a},this.iconGroup_);this.iconMark_=Blockly.createSvgElement("text",{"class":"blocklyIconMark",x:Blockly.Icon.RADIUS,y:2*Blockly.Icon.RADIUS-4},this.iconGroup_);this.iconMark_.appendChild(document.createTextNode("\u2605"))};
Blockly.Mutator.prototype.iconClick_=function(a){this.block_.isEditable()&&Blockly.Icon.prototype.iconClick_.call(this,a)};
Blockly.Mutator.prototype.createEditor_=function(){this.svgDialog_=Blockly.createSvgElement("svg",{x:Blockly.Bubble.BORDER_WIDTH,y:Blockly.Bubble.BORDER_WIDTH},null);Blockly.createSvgElement("rect",{"class":"blocklyMutatorBackground",height:"100%",width:"100%"},this.svgDialog_);var a=this;this.workspace_=new Blockly.Workspace(function(){return a.getFlyoutMetrics_()},null);this.flyout_=new Blockly.Flyout;this.flyout_.autoClose=!1;this.svgDialog_.appendChild(this.flyout_.createDom());this.svgDialog_.appendChild(this.workspace_.createDom());
return this.svgDialog_};Blockly.Mutator.prototype.updateEditable=function(){this.block_.isEditable()?Blockly.Icon.prototype.updateEditable.call(this):(this.setVisible(!1),Blockly.removeClass_(this.iconGroup_,"blocklyIconGroup"))};
Blockly.Mutator.prototype.resizeBubble_=function(){var a=2*Blockly.Bubble.BORDER_WIDTH,b=this.workspace_.getCanvas().getBBox(),c=this.flyout_.getMetrics_(),d;d=Blockly.RTL?-b.x:b.width+b.x;b=Math.max(b.height+3*a,c.contentHeight+20);d+=3*a;if(Math.abs(this.workspaceWidth_-d)>a||Math.abs(this.workspaceHeight_-b)>a)this.workspaceWidth_=d,this.workspaceHeight_=b,this.bubble_.setBubbleSize(d+a,b+a),this.svgDialog_.setAttribute("width",this.workspaceWidth_),this.svgDialog_.setAttribute("height",this.workspaceHeight_);
Blockly.RTL&&(a="translate("+this.workspaceWidth_+",0)",this.workspace_.getCanvas().setAttribute("transform",a))};
Blockly.Mutator.prototype.setVisible=function(a){if(a!=this.isVisible())if(a){this.bubble_=new Blockly.Bubble(this.block_.workspace,this.createEditor_(),this.block_.svg_.svgPath_,this.iconX_,this.iconY_,null,null);var b=this;this.flyout_.init(this.workspace_);this.flyout_.show(this.quarkXml_);this.rootBlock_=this.block_.decompose(this.workspace_);a=this.rootBlock_.getDescendants();for(var c=0,d;d=a[c];c++)d.render();this.rootBlock_.setMovable(!1);this.rootBlock_.setDeletable(!1);a=2*this.flyout_.CORNER_RADIUS;
c=this.flyout_.width_+a;Blockly.RTL&&(c=-c);this.rootBlock_.moveBy(c,a);this.block_.saveConnections&&(this.block_.saveConnections(this.rootBlock_),this.sourceListener_=Blockly.bindEvent_(this.block_.workspace.getCanvas(),"blocklyWorkspaceChange",this.block_,function(){b.block_.saveConnections(b.rootBlock_)}));this.resizeBubble_();Blockly.bindEvent_(this.workspace_.getCanvas(),"blocklyWorkspaceChange",this.block_,function(){b.workspaceChanged_()});this.updateColour()}else this.svgDialog_=null,this.flyout_.dispose(),
this.flyout_=null,this.workspace_.dispose(),this.rootBlock_=this.workspace_=null,this.bubble_.dispose(),this.bubble_=null,this.workspaceHeight_=this.workspaceWidth_=0,this.sourceListener_&&(Blockly.unbindEvent_(this.sourceListener_),this.sourceListener_=null)};
Blockly.Mutator.prototype.workspaceChanged_=function(){if(0==Blockly.Block.dragMode_)for(var a=this.workspace_.getTopBlocks(!1),b=0,c;c=a[b];b++){var d=c.getRelativeToSurfaceXY(),e=c.getHeightWidth();c.isDeletable()&&(Blockly.RTL?d.x>-this.flyout_.width_+20:d.x<this.flyout_.width_-20)?c.dispose(!1,!0):20>d.y+e.height&&c.moveBy(0,20-e.height-d.y)}this.rootBlock_.workspace==this.workspace_&&(a=this.block_.rendered,this.block_.rendered=!1,this.block_.compose(this.rootBlock_),this.block_.rendered=a,this.block_.rendered&&
this.block_.render(),this.resizeBubble_(),this.block_.workspace.fireChangeEvent())};Blockly.Mutator.prototype.getFlyoutMetrics_=function(){var a=0;Blockly.RTL&&(a+=this.workspaceWidth_);return{viewHeight:this.workspaceHeight_,viewWidth:0,absoluteTop:0,absoluteLeft:a}};Blockly.Mutator.prototype.dispose=function(){this.block_.mutator=null;Blockly.Icon.prototype.dispose.call(this)};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Warning=function(a){Blockly.Warning.superClass_.constructor.call(this,a);this.createIcon_()};goog.inherits(Blockly.Warning,Blockly.Icon);Blockly.Warning.textToDom_=function(a){var b=Blockly.createSvgElement("text",{"class":"blocklyText blocklyBubbleText",y:Blockly.Bubble.BORDER_WIDTH},null);a=a.split("\n");for(var c=0;c<a.length;c++){var d=Blockly.createSvgElement("tspan",{dy:"1em",x:Blockly.Bubble.BORDER_WIDTH},b),e=document.createTextNode(a[c]);d.appendChild(e)}return b};
Blockly.Warning.prototype.text_="";Blockly.Warning.prototype.createIcon_=function(){Blockly.Icon.prototype.createIcon_.call(this);Blockly.createSvgElement("path",{"class":"blocklyIconShield",d:"M 2,15 Q -1,15 0.5,12 L 6.5,1.7 Q 8,-1 9.5,1.7 L 15.5,12 Q 17,15 14,15 z"},this.iconGroup_);this.iconMark_=Blockly.createSvgElement("text",{"class":"blocklyIconMark",x:Blockly.Icon.RADIUS,y:2*Blockly.Icon.RADIUS-3},this.iconGroup_);this.iconMark_.appendChild(document.createTextNode("!"))};
Blockly.Warning.prototype.setVisible=function(a){if(a!=this.isVisible())if(a){a=Blockly.Warning.textToDom_(this.text_);this.bubble_=new Blockly.Bubble(this.block_.workspace,a,this.block_.svg_.svgPath_,this.iconX_,this.iconY_,null,null);if(Blockly.RTL)for(var b=a.getBBox().width,c=0,d;d=a.childNodes[c];c++)d.setAttribute("text-anchor","end"),d.setAttribute("x",b+Blockly.Bubble.BORDER_WIDTH);this.updateColour();a=this.bubble_.getBubbleSize();this.bubble_.setBubbleSize(a.width,a.height)}else this.bubble_.dispose(),
this.body_=this.bubble_=null};Blockly.Warning.prototype.bodyFocus_=function(a){this.bubble_.promote_()};Blockly.Warning.prototype.setText=function(a){this.text_!=a&&(this.text_=a,this.isVisible()&&(this.setVisible(!1),this.setVisible(!0)))};Blockly.Warning.prototype.dispose=function(){this.block_.warning=null;Blockly.Icon.prototype.dispose.call(this)};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.uidCounter_=0;Blockly.getUidCounter=function(){return Blockly.uidCounter_};Blockly.setUidCounter=function(a){Blockly.uidCounter_=a};Blockly.genUid=function(){var a=(++Blockly.uidCounter_).toString();return Blockly.Realtime.isEnabled()?Blockly.Realtime.genUid(a):a};Blockly.Block=function(){goog.asserts.assert(0==arguments.length,"Please use Blockly.Block.obtain.")};
Blockly.Block.obtain=function(a,b){if(Blockly.Realtime.isEnabled())return Blockly.Realtime.obtainBlock(a,b);var c=new Blockly.Block;c.initialize(a,b);return c};Blockly.Block.prototype.initialize=function(a,b){this.id=Blockly.genUid();a.addTopBlock(this);this.fill(a,b);goog.isFunction(this.onchange)&&Blockly.bindEvent_(a.getCanvas(),"blocklyWorkspaceChange",this,this.onchange)};
Blockly.Block.prototype.fill=function(a,b){this.previousConnection=this.nextConnection=this.outputConnection=null;this.inputList=[];this.disabled=this.rendered=this.inputsInline=!1;this.tooltip="";this.contextMenu=!0;this.parentBlock_=null;this.childBlocks_=[];this.editable_=this.movable_=this.deletable_=!0;this.collapsed_=!1;this.workspace=a;this.isInFlyout=a.isFlyout;if(b){this.type=b;var c=Blockly.Blocks[b];goog.asserts.assertObject(c,'Error: "%s" is an unknown language block.',b);goog.mixin(this,
c)}goog.isFunction(this.init)&&this.init()};Blockly.Block.getById=function(a,b){return Blockly.Realtime.isEnabled()?Blockly.Realtime.getBlockById(a):b.getBlockById(a)};Blockly.Block.prototype.svg_=null;Blockly.Block.prototype.mutator=null;Blockly.Block.prototype.comment=null;Blockly.Block.prototype.warning=null;Blockly.Block.prototype.getIcons=function(){var a=[];this.mutator&&a.push(this.mutator);this.comment&&a.push(this.comment);this.warning&&a.push(this.warning);return a};
Blockly.Block.prototype.initSvg=function(){this.svg_=new Blockly.BlockSvg(this);this.svg_.init();Blockly.readOnly||Blockly.bindEvent_(this.svg_.getRootElement(),"mousedown",this,this.onMouseDown_);this.workspace.getCanvas().appendChild(this.svg_.getRootElement())};Blockly.Block.prototype.getSvgRoot=function(){return this.svg_&&this.svg_.getRootElement()};Blockly.Block.dragMode_=0;Blockly.Block.onMouseUpWrapper_=null;Blockly.Block.onMouseMoveWrapper_=null;
Blockly.Block.terminateDrag_=function(){Blockly.Block.onMouseUpWrapper_&&(Blockly.unbindEvent_(Blockly.Block.onMouseUpWrapper_),Blockly.Block.onMouseUpWrapper_=null);Blockly.Block.onMouseMoveWrapper_&&(Blockly.unbindEvent_(Blockly.Block.onMouseMoveWrapper_),Blockly.Block.onMouseMoveWrapper_=null);var a=Blockly.selected;if(2==Blockly.Block.dragMode_&&a){var b=a.getRelativeToSurfaceXY();a.moveConnections_(b.x-a.startDragX,b.y-a.startDragY);delete a.draggedBubbles_;a.setDragging_(!1);a.render();goog.Timer.callOnce(a.bumpNeighbours_,
Blockly.BUMP_DELAY,a);Blockly.fireUiEvent(window,"resize")}a&&a.workspace.fireChangeEvent();Blockly.Block.dragMode_=0};Blockly.Block.prototype.select=function(){goog.asserts.assertObject(this.svg_,"Block is not rendered.");Blockly.selected&&Blockly.selected.unselect();Blockly.selected=this;this.svg_.addSelect();Blockly.fireUiEvent(this.workspace.getCanvas(),"blocklySelectChange")};
Blockly.Block.prototype.unselect=function(){goog.asserts.assertObject(this.svg_,"Block is not rendered.");Blockly.selected=null;this.svg_.removeSelect();Blockly.fireUiEvent(this.workspace.getCanvas(),"blocklySelectChange")};
Blockly.Block.prototype.dispose=function(a,b,c){this.rendered=!1;this.unplug(a,!1);b&&this.svg_&&this.svg_.disposeUiEffect();this.workspace&&!c&&(this.workspace.removeTopBlock(this),this.workspace=null);Blockly.selected==this&&(Blockly.selected=null,Blockly.terminateDrag_());Blockly.ContextMenu.currentBlock==this&&Blockly.ContextMenu.hide();for(a=this.childBlocks_.length-1;0<=a;a--)this.childBlocks_[a].dispose(!1);b=this.getIcons();for(a=0;a<b.length;a++)b[a].dispose();for(a=0;b=this.inputList[a];a++)b.dispose();
this.inputList=[];b=this.getConnections_(!0);for(a=0;a<b.length;a++)c=b[a],c.targetConnection&&c.disconnect(),b[a].dispose();this.svg_&&(this.svg_.dispose(),this.svg_=null);Blockly.Realtime.isEnabled()&&!Blockly.Realtime.withinSync&&Blockly.Realtime.removeBlock(this)};
Blockly.Block.prototype.unplug=function(a,b){b=b&&!!this.getParent();if(this.outputConnection)this.outputConnection.targetConnection&&this.setParent(null);else{var c=null;this.previousConnection&&this.previousConnection.targetConnection&&(c=this.previousConnection.targetConnection,this.setParent(null));var d=this.getNextBlock();if(a&&d){var e=this.nextConnection.targetConnection;d.setParent(null);c&&c.connect(e)}}b&&this.moveBy(Blockly.SNAP_RADIUS*(Blockly.RTL?-1:1),2*Blockly.SNAP_RADIUS)};
Blockly.Block.prototype.getRelativeToSurfaceXY=function(){var a=0,b=0;if(this.svg_){var c=this.svg_.getRootElement();do var d=Blockly.getRelativeXY_(c),a=a+d.x,b=b+d.y,c=c.parentNode;while(c&&c!=this.workspace.getCanvas())}return{x:a,y:b}};Blockly.Block.prototype.moveBy=function(a,b){var c=this.getRelativeToSurfaceXY();this.svg_.getRootElement().setAttribute("transform","translate("+(c.x+a)+", "+(c.y+b)+")");this.moveConnections_(a,b);Blockly.Realtime.blockChanged(this)};
Blockly.Block.prototype.getHeightWidth=function(){var a=this.svg_.height,b=this.svg_.width,c=this.getNextBlock();c&&(c=c.getHeightWidth(),a+=c.height-4,b=Math.max(b,c.width));return{height:a,width:b}};
Blockly.Block.prototype.onMouseDown_=function(a){if(!this.isInFlyout){Blockly.svgResize();Blockly.terminateDrag_();this.select();Blockly.hideChaff();if(Blockly.isRightButton(a))this.showContextMenu_(a);else if(this.isMovable()){Blockly.removeAllRanges();Blockly.setCursorHand_(!0);var b=this.getRelativeToSurfaceXY();this.startDragX=b.x;this.startDragY=b.y;this.startDragMouseX=a.clientX;this.startDragMouseY=a.clientY;Blockly.Block.dragMode_=1;Blockly.Block.onMouseUpWrapper_=Blockly.bindEvent_(document,
"mouseup",this,this.onMouseUp_);Blockly.Block.onMouseMoveWrapper_=Blockly.bindEvent_(document,"mousemove",this,this.onMouseMove_);this.draggedBubbles_=[];for(var b=this.getDescendants(),c=0,d;d=b[c];c++){d=d.getIcons();for(var e=0;e<d.length;e++){var f=d[e].getIconLocation();f.bubble=d[e];this.draggedBubbles_.push(f)}}}else return;a.stopPropagation()}};
Blockly.Block.prototype.onMouseUp_=function(a){var b=this;Blockly.doCommand(function(){Blockly.terminateDrag_();if(Blockly.selected&&Blockly.highlightedConnection_)Blockly.localConnection_.connect(Blockly.highlightedConnection_),b.svg_&&(Blockly.localConnection_.isSuperior()?Blockly.highlightedConnection_:Blockly.localConnection_).sourceBlock_.svg_.connectionUiEffect(),b.workspace.trashcan&&b.workspace.trashcan.isOpen&&b.workspace.trashcan.close();else if(b.workspace.trashcan&&b.workspace.trashcan.isOpen){var a=
b.workspace.trashcan;goog.Timer.callOnce(a.close,100,a);Blockly.selected.dispose(!1,!0);Blockly.fireUiEvent(window,"resize")}Blockly.highlightedConnection_&&(Blockly.highlightedConnection_.unhighlight(),Blockly.highlightedConnection_=null)})};Blockly.Block.prototype.showHelp_=function(){var a=goog.isFunction(this.helpUrl)?this.helpUrl():this.helpUrl;a&&window.open(a)};
Blockly.Block.prototype.duplicate_=function(){var a=Blockly.Xml.blockToDom_(this);Blockly.Xml.deleteNext(a);var a=Blockly.Xml.domToBlock(this.workspace,a),b=this.getRelativeToSurfaceXY();b.x=Blockly.RTL?b.x-Blockly.SNAP_RADIUS:b.x+Blockly.SNAP_RADIUS;b.y+=2*Blockly.SNAP_RADIUS;a.moveBy(b.x,b.y);a.select();return a};
Blockly.Block.prototype.showContextMenu_=function(a){if(!Blockly.readOnly&&this.contextMenu){var b=this,c=[];if(this.isDeletable()&&this.isMovable()&&!b.isInFlyout){var d={text:Blockly.Msg.DUPLICATE_BLOCK,enabled:!0,callback:function(){b.duplicate_()}};this.getDescendants().length>this.workspace.remainingCapacity()&&(d.enabled=!1);c.push(d);this.isEditable()&&!this.collapsed_&&Blockly.comments&&(d={enabled:!0},this.comment?(d.text=Blockly.Msg.REMOVE_COMMENT,d.callback=function(){b.setCommentText(null)}):
(d.text=Blockly.Msg.ADD_COMMENT,d.callback=function(){b.setCommentText("")}),c.push(d));if(!this.collapsed_)for(d=0;d<this.inputList.length;d++)if(this.inputList[d].type==Blockly.INPUT_VALUE){d={enabled:!0};d.text=this.inputsInline?Blockly.Msg.EXTERNAL_INPUTS:Blockly.Msg.INLINE_INPUTS;d.callback=function(){b.setInputsInline(!b.inputsInline)};c.push(d);break}Blockly.collapse&&(this.collapsed_?(d={enabled:!0},d.text=Blockly.Msg.EXPAND_BLOCK,d.callback=function(){b.setCollapsed(!1)}):(d={enabled:!0},
d.text=Blockly.Msg.COLLAPSE_BLOCK,d.callback=function(){b.setCollapsed(!0)}),c.push(d));Blockly.disable&&(d={text:this.disabled?Blockly.Msg.ENABLE_BLOCK:Blockly.Msg.DISABLE_BLOCK,enabled:!this.getInheritedDisabled(),callback:function(){b.setDisabled(!b.disabled)}},c.push(d));var d=this.getDescendants().length,e=this.getNextBlock();e&&(d-=e.getDescendants().length);d={text:1==d?Blockly.Msg.DELETE_BLOCK:Blockly.Msg.DELETE_X_BLOCKS.replace("%1",String(d)),enabled:!0,callback:function(){b.dispose(!0,
!0)}};c.push(d)}d={enabled:!(goog.isFunction(this.helpUrl)?!this.helpUrl():!this.helpUrl)};d.text=Blockly.Msg.HELP;d.callback=function(){b.showHelp_()};c.push(d);this.customContextMenu&&!b.isInFlyout&&this.customContextMenu(c);Blockly.ContextMenu.show(a,c);Blockly.ContextMenu.currentBlock=this}};
Blockly.Block.prototype.getConnections_=function(a){var b=[];if(a||this.rendered)if(this.outputConnection&&b.push(this.outputConnection),this.nextConnection&&b.push(this.nextConnection),this.previousConnection&&b.push(this.previousConnection),a||!this.collapsed_){a=0;for(var c;c=this.inputList[a];a++)c.connection&&b.push(c.connection)}return b};
Blockly.Block.prototype.moveConnections_=function(a,b){if(this.rendered){for(var c=this.getConnections_(!1),d=0;d<c.length;d++)c[d].moveBy(a,b);c=this.getIcons();for(d=0;d<c.length;d++)c[d].computeIconLocation();for(d=0;d<this.childBlocks_.length;d++)this.childBlocks_[d].moveConnections_(a,b)}};Blockly.Block.prototype.setDragging_=function(a){a?this.svg_.addDragging():this.svg_.removeDragging();for(var b=0;b<this.childBlocks_.length;b++)this.childBlocks_[b].setDragging_(a)};
Blockly.Block.prototype.onMouseMove_=function(a){var b=this;Blockly.doCommand(function(){if(!("mousemove"==a.type&&1>=a.clientX&&0==a.clientY&&0==a.button)){Blockly.removeAllRanges();var c=a.clientX-b.startDragMouseX,d=a.clientY-b.startDragMouseY;1==Blockly.Block.dragMode_&&Math.sqrt(Math.pow(c,2)+Math.pow(d,2))>Blockly.DRAG_RADIUS&&(Blockly.Block.dragMode_=2,b.setParent(null),b.setDragging_(!0));if(2==Blockly.Block.dragMode_){var e=b.startDragX+c,f=b.startDragY+d;b.svg_.getRootElement().setAttribute("transform",
"translate("+e+", "+f+")");for(e=0;e<b.draggedBubbles_.length;e++)f=b.draggedBubbles_[e],f.bubble.setIconLocation(f.x+c,f.y+d);for(var f=b.getConnections_(!1),g=null,h=null,k=Blockly.SNAP_RADIUS,e=0;e<f.length;e++){var l=f[e],p=l.closest(k,c,d);p.connection&&(g=p.connection,h=l,k=p.radius)}Blockly.highlightedConnection_&&Blockly.highlightedConnection_!=g&&(Blockly.highlightedConnection_.unhighlight(),Blockly.highlightedConnection_=null,Blockly.localConnection_=null);g&&g!=Blockly.highlightedConnection_&&
(g.highlight(),Blockly.highlightedConnection_=g,Blockly.localConnection_=h);if(b.workspace.trashcan&&b.isDeletable())b.workspace.trashcan.onMouseMove(a)}}a.stopPropagation()})};
Blockly.Block.prototype.bumpNeighbours_=function(){if(0==Blockly.Block.dragMode_){var a=this.getRootBlock();if(!a.isInFlyout)for(var b=this.getConnections_(!1),c=0;c<b.length;c++){var d=b[c];d.targetConnection&&d.isSuperior()&&d.targetBlock().bumpNeighbours_();for(var e=d.neighbours_(Blockly.SNAP_RADIUS),f=0;f<e.length;f++){var g=e[f];d.targetConnection&&g.targetConnection||g.sourceBlock_.getRootBlock()!=a&&(d.isSuperior()?g.bumpAwayFrom_(d):d.bumpAwayFrom_(g))}}}};
Blockly.Block.prototype.getParent=function(){return this.parentBlock_};Blockly.Block.prototype.getSurroundParent=function(){for(var a=this;;){do{var b=a,a=a.getParent();if(!a)return null}while(a.getNextBlock()==b);return a}};Blockly.Block.prototype.getNextBlock=function(){return this.nextConnection&&this.nextConnection.targetBlock()};Blockly.Block.prototype.getRootBlock=function(){var a,b=this;do a=b,b=a.parentBlock_;while(b);return a};Blockly.Block.prototype.getChildren=function(){return this.childBlocks_};
Blockly.Block.prototype.setParent=function(a){if(this.parentBlock_){for(var b=this.parentBlock_.childBlocks_,c,d=0;c=b[d];d++)if(c==this){b.splice(d,1);break}b=this.getRelativeToSurfaceXY();this.workspace.getCanvas().appendChild(this.svg_.getRootElement());this.svg_.getRootElement().setAttribute("transform","translate("+b.x+", "+b.y+")");this.parentBlock_=null;this.previousConnection&&this.previousConnection.targetConnection&&this.previousConnection.disconnect();this.outputConnection&&this.outputConnection.targetConnection&&
this.outputConnection.disconnect()}else goog.array.contains(this.workspace.getTopBlocks(!1),this)&&this.workspace.removeTopBlock(this);(this.parentBlock_=a)?(a.childBlocks_.push(this),b=this.getRelativeToSurfaceXY(),a.svg_&&this.svg_&&a.svg_.getRootElement().appendChild(this.svg_.getRootElement()),a=this.getRelativeToSurfaceXY(),this.moveConnections_(a.x-b.x,a.y-b.y)):this.workspace.addTopBlock(this)};
Blockly.Block.prototype.getDescendants=function(){for(var a=[this],b,c=0;b=this.childBlocks_[c];c++)a.push.apply(a,b.getDescendants());return a};Blockly.Block.prototype.isDeletable=function(){return this.deletable_&&!Blockly.readOnly};Blockly.Block.prototype.setDeletable=function(a){this.deletable_=a;this.svg_&&this.svg_.updateMovable()};Blockly.Block.prototype.isMovable=function(){return this.movable_&&!Blockly.readOnly};Blockly.Block.prototype.setMovable=function(a){this.movable_=a};
Blockly.Block.prototype.isEditable=function(){return this.editable_&&!Blockly.readOnly};Blockly.Block.prototype.setEditable=function(a){this.editable_=a;a=0;for(var b;b=this.inputList[a];a++)for(var c=0,d;d=b.fieldRow[c];c++)d.updateEditable();b=this.getIcons();for(a=0;a<b.length;a++)b[a].updateEditable()};Blockly.Block.prototype.setHelpUrl=function(a){this.helpUrl=a};Blockly.Block.prototype.getColour=function(){return this.colourHue_};
Blockly.Block.prototype.setColour=function(a){this.colourHue_=a;this.svg_&&this.svg_.updateColour();var b=this.getIcons();for(a=0;a<b.length;a++)b[a].updateColour();if(this.rendered){for(a=0;b=this.inputList[a];a++)for(var c=0,d;d=b.fieldRow[c];c++)d.setText(null);this.render()}};Blockly.Block.prototype.getField_=function(a){for(var b=0,c;c=this.inputList[b];b++)for(var d=0,e;e=c.fieldRow[d];d++)if(e.name===a)return e;return null};
Blockly.Block.prototype.getFieldValue=function(a){return(a=this.getField_(a))?a.getValue():null};Blockly.Block.prototype.getTitleValue=function(a){console.log("Deprecated call to getTitleValue, use getFieldValue instead.");return this.getFieldValue(a)};Blockly.Block.prototype.setFieldValue=function(a,b){var c=this.getField_(b);goog.asserts.assertObject(c,'Field "%s" not found.',b);c.setValue(a)};
Blockly.Block.prototype.setTitleValue=function(a,b){console.log("Deprecated call to setTitleValue, use setFieldValue instead.");this.setFieldValue(a,b)};Blockly.Block.prototype.setTooltip=function(a){this.tooltip=a};
Blockly.Block.prototype.setPreviousStatement=function(a,b){this.previousConnection&&(goog.asserts.assert(!this.previousConnection.targetConnection,"Must disconnect previous statement before removing connection."),this.previousConnection.dispose(),this.previousConnection=null);a&&(goog.asserts.assert(!this.outputConnection,"Remove output connection prior to adding previous connection."),void 0===b&&(b=null),this.previousConnection=new Blockly.Connection(this,Blockly.PREVIOUS_STATEMENT),this.previousConnection.setCheck(b));
this.rendered&&(this.render(),this.bumpNeighbours_())};Blockly.Block.prototype.setNextStatement=function(a,b){this.nextConnection&&(goog.asserts.assert(!this.nextConnection.targetConnection,"Must disconnect next statement before removing connection."),this.nextConnection.dispose(),this.nextConnection=null);a&&(void 0===b&&(b=null),this.nextConnection=new Blockly.Connection(this,Blockly.NEXT_STATEMENT),this.nextConnection.setCheck(b));this.rendered&&(this.render(),this.bumpNeighbours_())};
Blockly.Block.prototype.setOutput=function(a,b){this.outputConnection&&(goog.asserts.assert(!this.outputConnection.targetConnection,"Must disconnect output value before removing connection."),this.outputConnection.dispose(),this.outputConnection=null);a&&(goog.asserts.assert(!this.previousConnection,"Remove previous connection prior to adding output connection."),void 0===b&&(b=null),this.outputConnection=new Blockly.Connection(this,Blockly.OUTPUT_VALUE),this.outputConnection.setCheck(b));this.rendered&&
(this.render(),this.bumpNeighbours_())};Blockly.Block.prototype.changeOutput=function(a){goog.asserts.assert(this.outputConnection,"Only use changeOutput() on blocks that already have an output.");this.outputConnection.setCheck(a)};Blockly.Block.prototype.setInputsInline=function(a){this.inputsInline=a;this.rendered&&(this.render(),this.bumpNeighbours_(),this.workspace.fireChangeEvent())};
Blockly.Block.prototype.setDisabled=function(a){this.disabled!=a&&(this.disabled=a,this.svg_.updateDisabled(),this.workspace.fireChangeEvent())};Blockly.Block.prototype.getInheritedDisabled=function(){for(var a=this;;){a=a.getSurroundParent();if(!a)return!1;if(a.disabled)return!0}};Blockly.Block.prototype.isCollapsed=function(){return this.collapsed_};
Blockly.Block.prototype.setCollapsed=function(a){if(this.collapsed_!=a){this.collapsed_=a;for(var b=[],c=0,d;d=this.inputList[c];c++)b.push.apply(b,d.setVisible(!a));if(a){a=this.getIcons();for(c=0;c<a.length;c++)a[c].setVisible(!1);c=this.toString(Blockly.COLLAPSE_CHARS);this.appendDummyInput("_TEMP_COLLAPSED_INPUT").appendField(c)}else this.removeInput("_TEMP_COLLAPSED_INPUT");b.length||(b[0]=this);if(this.rendered){for(c=0;a=b[c];c++)a.render();this.bumpNeighbours_()}}};
Blockly.Block.prototype.toString=function(a){for(var b=[],c=0,d;d=this.inputList[c];c++){for(var e=0,f;f=d.fieldRow[e];e++)b.push(f.getText());d.connection&&((d=d.connection.targetBlock())?b.push(d.toString()):b.push("?"))}b=goog.string.trim(b.join(" "))||"???";a&&(b=goog.string.truncate(b,a));return b};Blockly.Block.prototype.appendValueInput=function(a){return this.appendInput_(Blockly.INPUT_VALUE,a)};
Blockly.Block.prototype.appendStatementInput=function(a){return this.appendInput_(Blockly.NEXT_STATEMENT,a)};Blockly.Block.prototype.appendDummyInput=function(a){return this.appendInput_(Blockly.DUMMY_INPUT,a||"")};
Blockly.Block.prototype.interpolateMsg=function(a,b){function c(a){a instanceof Blockly.Field?this.appendField(a):(goog.asserts.assert(goog.isArray(a)),this.appendField(a[1],a[0]))}goog.asserts.assertString(a);var d=arguments[arguments.length-1];goog.asserts.assert(d===Blockly.ALIGN_LEFT||d===Blockly.ALIGN_CENTRE||d===Blockly.ALIGN_RIGHT,'Illegal final argument "%d" is not an alignment.',d);arguments.length-=1;for(var e=a.split(this.interpolateMsg.SPLIT_REGEX_),f=[],g=0;g<e.length;g+=2){var h=goog.string.trim(e[g]),
k=void 0;h&&f.push(new Blockly.FieldLabel(h));if((h=e[g+1])&&"%"==h.charAt(0)){var l=parseInt(h.substring(1),10),p=arguments[l];goog.asserts.assertArray(p,'Message symbol "%s" is out of range.',h);goog.asserts.assertArray(p,'Argument "%s" is not a tuple.',h);p[1]instanceof Blockly.Field?f.push([p[0],p[1]]):k=this.appendValueInput(p[0]).setCheck(p[1]).setAlign(p[2]);arguments[l]=null}else"\n"==h&&f.length&&(k=this.appendDummyInput());k&&f.length&&(f.forEach(c,k),f=[])}f.length&&(k=this.appendDummyInput().setAlign(d),
f.forEach(c,k));for(g=1;g<arguments.length-1;g++)goog.asserts.assert(null===arguments[g],'Input "%%s" not used in message: "%s"',g,a);this.setInputsInline(!a.match(this.interpolateMsg.INLINE_REGEX_))};Blockly.Block.prototype.interpolateMsg.SPLIT_REGEX_=/(%\d+|\n)/;Blockly.Block.prototype.interpolateMsg.INLINE_REGEX_=/%1\s*$/;
Blockly.Block.prototype.appendInput_=function(a,b){var c=null;if(a==Blockly.INPUT_VALUE||a==Blockly.NEXT_STATEMENT)c=new Blockly.Connection(this,a);c=new Blockly.Input(a,b,this,c);this.inputList.push(c);this.rendered&&(this.render(),this.bumpNeighbours_());return c};
Blockly.Block.prototype.moveInputBefore=function(a,b){if(a!=b){for(var c=-1,d=b?-1:this.inputList.length,e=0,f;f=this.inputList[e];e++)if(f.name==a){if(c=e,-1!=d)break}else if(b&&f.name==b&&(d=e,-1!=c))break;goog.asserts.assert(-1!=c,'Named input "%s" not found.',a);goog.asserts.assert(-1!=d,'Reference input "%s" not found.',b);this.moveNumberedInputBefore(c,d)}};
Blockly.Block.prototype.moveNumberedInputBefore=function(a,b){goog.asserts.assert(a!=b,"Can't move input to itself.");goog.asserts.assert(a<this.inputList.length,"Input index "+a+" out of bounds.");goog.asserts.assert(b<=this.inputList.length,"Reference input "+b+" out of bounds.");var c=this.inputList[a];this.inputList.splice(a,1);a<b&&b--;this.inputList.splice(b,0,c);this.rendered&&(this.render(),this.bumpNeighbours_())};
Blockly.Block.prototype.removeInput=function(a,b){for(var c=0,d;d=this.inputList[c];c++)if(d.name==a){d.connection&&d.connection.targetConnection&&d.connection.targetBlock().setParent(null);d.dispose();this.inputList.splice(c,1);this.rendered&&(this.render(),this.bumpNeighbours_());return}b||goog.asserts.fail('Input "%s" not found.',a)};Blockly.Block.prototype.getInput=function(a){for(var b=0,c;c=this.inputList[b];b++)if(c.name==a)return c;return null};
Blockly.Block.prototype.getInputTargetBlock=function(a){return(a=this.getInput(a))&&a.connection&&a.connection.targetBlock()};Blockly.Block.prototype.setMutator=function(a){this.mutator&&this.mutator!==a&&this.mutator.dispose();a&&(a.block_=this,this.mutator=a,this.svg_&&a.createIcon())};Blockly.Block.prototype.getCommentText=function(){return this.comment?this.comment.getText().replace(/\s+$/,"").replace(/ +\n/g,"\n"):""};
Blockly.Block.prototype.setCommentText=function(a){var b=!1;goog.isString(a)?(this.comment||(this.comment=new Blockly.Comment(this),b=!0),this.comment.setText(a)):this.comment&&(this.comment.dispose(),b=!0);this.rendered&&(this.render(),b&&this.bumpNeighbours_())};
Blockly.Block.prototype.setWarningText=function(a){this.isInFlyout&&(a=null);var b=!1;goog.isString(a)?(this.warning||(this.warning=new Blockly.Warning(this),b=!0),this.warning.setText(a)):this.warning&&(this.warning.dispose(),b=!0);b&&this.rendered&&(this.render(),this.bumpNeighbours_())};Blockly.Block.prototype.render=function(){goog.asserts.assertObject(this.svg_,"Uninitialized block cannot be rendered.  Call block.initSvg()");this.svg_.render();Blockly.Realtime.blockChanged(this)};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.FieldTextInput=function(a,b){Blockly.FieldTextInput.superClass_.constructor.call(this,a);this.changeHandler_=b};goog.inherits(Blockly.FieldTextInput,Blockly.Field);Blockly.FieldTextInput.prototype.clone=function(){return new Blockly.FieldTextInput(this.getText(),this.changeHandler_)};Blockly.FieldTextInput.prototype.CURSOR="text";Blockly.FieldTextInput.prototype.dispose=function(){Blockly.WidgetDiv.hideIfOwner(this);Blockly.FieldTextInput.superClass_.dispose.call(this)};
Blockly.FieldTextInput.prototype.setText=function(a){if(null!==a){if(this.changeHandler_){var b=this.changeHandler_(a);null!==b&&void 0!==b&&(a=b)}Blockly.Field.prototype.setText.call(this,a)}};
Blockly.FieldTextInput.prototype.showEditor_=function(a){var b=a||!1;if(!b&&(goog.userAgent.MOBILE||goog.userAgent.ANDROID||goog.userAgent.IPAD))a=window.prompt(Blockly.Msg.CHANGE_VALUE_TITLE,this.text_),this.changeHandler_&&(b=this.changeHandler_(a),void 0!==b&&(a=b)),null!==a&&this.setText(a);else{Blockly.WidgetDiv.show(this,this.widgetDispose_());var c=Blockly.WidgetDiv.DIV;a=goog.dom.createDom("input","blocklyHtmlInput");Blockly.FieldTextInput.htmlInput_=a;c.appendChild(a);a.value=a.defaultValue=
this.text_;a.oldValue_=null;this.validate_();this.resizeEditor_();b||(a.focus(),a.select());a.onKeyUpWrapper_=Blockly.bindEvent_(a,"keyup",this,this.onHtmlInputChange_);a.onKeyPressWrapper_=Blockly.bindEvent_(a,"keypress",this,this.onHtmlInputChange_);b=this.sourceBlock_.workspace.getCanvas();a.onWorkspaceChangeWrapper_=Blockly.bindEvent_(b,"blocklyWorkspaceChange",this,this.resizeEditor_)}};
Blockly.FieldTextInput.prototype.onHtmlInputChange_=function(a){var b=Blockly.FieldTextInput.htmlInput_;13==a.keyCode?Blockly.WidgetDiv.hide():27==a.keyCode?(this.setText(b.defaultValue),Blockly.WidgetDiv.hide()):(a=b.value,a!==b.oldValue_?(b.oldValue_=a,this.setText(a),this.validate_()):goog.userAgent.WEBKIT&&this.sourceBlock_.render())};
Blockly.FieldTextInput.prototype.validate_=function(){var a=!0;goog.asserts.assertObject(Blockly.FieldTextInput.htmlInput_);var b=Blockly.FieldTextInput.htmlInput_;this.changeHandler_&&(a=this.changeHandler_(b.value));null===a?Blockly.addClass_(b,"blocklyInvalidInput"):Blockly.removeClass_(b,"blocklyInvalidInput")};
Blockly.FieldTextInput.prototype.resizeEditor_=function(){var a=Blockly.WidgetDiv.DIV,b=this.fieldGroup_.getBBox();a.style.width=b.width+"px";b=Blockly.getAbsoluteXY_(this.borderRect_);if(Blockly.RTL){var c=this.borderRect_.getBBox();b.x+=c.width;b.x-=a.offsetWidth}b.y+=1;goog.userAgent.WEBKIT&&(b.y-=3);a.style.left=b.x+"px";a.style.top=b.y+"px"};
Blockly.FieldTextInput.prototype.widgetDispose_=function(){var a=this;return function(){var b=Blockly.FieldTextInput.htmlInput_,c=b.value;a.changeHandler_&&(c=a.changeHandler_(c),null===c&&(c=b.defaultValue));a.setText(c);a.sourceBlock_.rendered&&a.sourceBlock_.render();Blockly.unbindEvent_(b.onKeyUpWrapper_);Blockly.unbindEvent_(b.onKeyPressWrapper_);Blockly.unbindEvent_(b.onWorkspaceChangeWrapper_);Blockly.FieldTextInput.htmlInput_=null;Blockly.WidgetDiv.DIV.style.width="auto"}};
Blockly.FieldTextInput.numberValidator=function(a){a=a.replace(/O/ig,"0");a=a.replace(/,/g,"");a=parseFloat(a||0);return isNaN(a)?null:String(a)};Blockly.FieldTextInput.nonnegativeIntegerValidator=function(a){(a=Blockly.FieldTextInput.numberValidator(a))&&(a=String(Math.max(0,Math.floor(a))));return a};
// Copyright 2013 Google Inc.  Apache License 2.0
Blockly.FieldAngle=function(a,b){var c;if(b){var d=this;c=function(a){a=Blockly.FieldAngle.angleValidator.call(d,a);null!==a&&b.call(d,a);return a}}else c=Blockly.FieldAngle.angleValidator;this.symbol_=Blockly.createSvgElement("tspan",{},null);this.symbol_.appendChild(document.createTextNode("\u00b0"));Blockly.FieldAngle.superClass_.constructor.call(this,a,c)};goog.inherits(Blockly.FieldAngle,Blockly.FieldTextInput);
Blockly.FieldAngle.prototype.clone=function(){return new Blockly.FieldAngle(this.getText(),this.changeHandler_)};Blockly.FieldAngle.ROUND=15;Blockly.FieldAngle.HALF=50;Blockly.FieldAngle.RADIUS=Blockly.FieldAngle.HALF-1;Blockly.FieldAngle.prototype.dispose_=function(){var a=this;return function(){Blockly.FieldAngle.superClass_.dispose_.call(a)();a.gauge_=null;a.clickWrapper_&&Blockly.unbindEvent_(a.clickWrapper_);a.moveWrapper1_&&Blockly.unbindEvent_(a.moveWrapper1_);a.moveWrapper2_&&Blockly.unbindEvent_(a.moveWrapper2_)}};
Blockly.FieldAngle.prototype.showEditor_=function(){Blockly.FieldAngle.superClass_.showEditor_.call(this,goog.userAgent.MOBILE||goog.userAgent.ANDROID||goog.userAgent.IPAD);var a=Blockly.WidgetDiv.DIV;if(a.firstChild){var a=Blockly.createSvgElement("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:html":"http://www.w3.org/1999/xhtml","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",height:2*Blockly.FieldAngle.HALF+"px",width:2*Blockly.FieldAngle.HALF+"px"},a),b=Blockly.createSvgElement("circle",
{cx:Blockly.FieldAngle.HALF,cy:Blockly.FieldAngle.HALF,r:Blockly.FieldAngle.RADIUS,"class":"blocklyAngleCircle"},a);this.gauge_=Blockly.createSvgElement("path",{"class":"blocklyAngleGauge"},a);this.line_=Blockly.createSvgElement("line",{x1:Blockly.FieldAngle.HALF,y1:Blockly.FieldAngle.HALF,"class":"blocklyAngleLine"},a);for(var c=0;360>c;c+=15)Blockly.createSvgElement("line",{x1:Blockly.FieldAngle.HALF+Blockly.FieldAngle.RADIUS,y1:Blockly.FieldAngle.HALF,x2:Blockly.FieldAngle.HALF+Blockly.FieldAngle.RADIUS-
(0==c%45?10:5),y2:Blockly.FieldAngle.HALF,"class":"blocklyAngleMarks",transform:"rotate("+c+", "+Blockly.FieldAngle.HALF+", "+Blockly.FieldAngle.HALF+")"},a);a.style.marginLeft="-35px";this.clickWrapper_=Blockly.bindEvent_(a,"click",this,Blockly.WidgetDiv.hide);this.moveWrapper1_=Blockly.bindEvent_(b,"mousemove",this,this.onMouseMove);this.moveWrapper2_=Blockly.bindEvent_(this.gauge_,"mousemove",this,this.onMouseMove);this.updateGraph_()}};
Blockly.FieldAngle.prototype.onMouseMove=function(a){var b=this.gauge_.ownerSVGElement.getBoundingClientRect(),c=a.clientX-b.left-Blockly.FieldAngle.HALF;a=a.clientY-b.top-Blockly.FieldAngle.HALF;b=Math.atan(-a/c);isNaN(b)||(b=b/Math.PI*180,0>c?b+=180:0<a&&(b+=360),Blockly.FieldAngle.ROUND&&(b=Math.round(b/Blockly.FieldAngle.ROUND)*Blockly.FieldAngle.ROUND),360<=b&&(b-=360),b=String(b),Blockly.FieldTextInput.htmlInput_.value=b,this.setText(b))};
Blockly.FieldAngle.prototype.setText=function(a){Blockly.FieldAngle.superClass_.setText.call(this,a);this.updateGraph_();Blockly.RTL?this.textElement_.insertBefore(this.symbol_,this.textElement_.firstChild):this.textElement_.appendChild(this.symbol_);this.size_.width=0};
Blockly.FieldAngle.prototype.updateGraph_=function(){if(this.gauge_){var a=Number(this.getText())/180*Math.PI;if(isNaN(a))this.gauge_.setAttribute("d","M "+Blockly.FieldAngle.HALF+", "+Blockly.FieldAngle.HALF),this.line_.setAttribute("x2",Blockly.FieldAngle.HALF),this.line_.setAttribute("y2",Blockly.FieldAngle.HALF);else{var b=Blockly.FieldAngle.HALF+Math.cos(a)*Blockly.FieldAngle.RADIUS,c=Blockly.FieldAngle.HALF+Math.sin(a)*-Blockly.FieldAngle.RADIUS;this.gauge_.setAttribute("d","M "+Blockly.FieldAngle.HALF+
", "+Blockly.FieldAngle.HALF+" h "+Blockly.FieldAngle.RADIUS+" A "+Blockly.FieldAngle.RADIUS+","+Blockly.FieldAngle.RADIUS+" 0 "+(a>Math.PI?1:0)+" 0 "+b+","+c+" z");this.line_.setAttribute("x2",b);this.line_.setAttribute("y2",c)}}};Blockly.FieldAngle.angleValidator=function(a){a=Blockly.FieldTextInput.numberValidator(a);null!==a&&(a%=360,0>a&&(a+=360),a=String(a));return a};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.FieldCheckbox=function(a,b){Blockly.FieldCheckbox.superClass_.constructor.call(this,"");this.changeHandler_=b;this.checkElement_=Blockly.createSvgElement("text",{"class":"blocklyText",x:-3},this.fieldGroup_);var c=document.createTextNode("\u2713");this.checkElement_.appendChild(c);this.setValue(a)};goog.inherits(Blockly.FieldCheckbox,Blockly.Field);Blockly.FieldCheckbox.prototype.clone=function(){return new Blockly.FieldCheckbox(this.getValue(),this.changeHandler_)};
Blockly.FieldCheckbox.prototype.CURSOR="default";Blockly.FieldCheckbox.prototype.getValue=function(){return String(this.state_).toUpperCase()};Blockly.FieldCheckbox.prototype.setValue=function(a){a="TRUE"==a;this.state_!==a&&(this.state_=a,this.checkElement_.style.display=a?"block":"none",this.sourceBlock_&&this.sourceBlock_.rendered&&this.sourceBlock_.workspace.fireChangeEvent())};
Blockly.FieldCheckbox.prototype.showEditor_=function(){var a=!this.state_;if(this.changeHandler_){var b=this.changeHandler_(a);void 0!==b&&(a=b)}null!==a&&this.setValue(String(a).toUpperCase())};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.FieldColour=function(a,b){Blockly.FieldColour.superClass_.constructor.call(this,"\u00a0\u00a0\u00a0");this.changeHandler_=b;this.borderRect_.style.fillOpacity=1;this.setValue(a)};goog.inherits(Blockly.FieldColour,Blockly.Field);Blockly.FieldColour.prototype.clone=function(){return new Blockly.FieldColour(this.getValue(),this.changeHandler_)};Blockly.FieldColour.prototype.CURSOR="default";Blockly.FieldColour.prototype.dispose=function(){Blockly.WidgetDiv.hideIfOwner(this);Blockly.FieldColour.superClass_.dispose.call(this)};
Blockly.FieldColour.prototype.getValue=function(){return this.colour_};Blockly.FieldColour.prototype.setValue=function(a){this.colour_=a;this.borderRect_.style.fill=a;this.sourceBlock_&&this.sourceBlock_.rendered&&(Blockly.Realtime.blockChanged(this.sourceBlock_),this.sourceBlock_.workspace.fireChangeEvent())};Blockly.FieldColour.COLOURS=goog.ui.ColorPicker.SIMPLE_GRID_COLORS;Blockly.FieldColour.COLUMNS=7;
Blockly.FieldColour.prototype.showEditor_=function(){Blockly.WidgetDiv.show(this,Blockly.FieldColour.widgetDispose_);var a=new goog.ui.ColorPicker;a.setSize(Blockly.FieldColour.COLUMNS);a.setColors(Blockly.FieldColour.COLOURS);var b=goog.dom.getViewportSize(),c=goog.style.getViewportPageOffset(document),d=Blockly.getAbsoluteXY_(this.borderRect_),e=this.borderRect_.getBBox();a.render(Blockly.WidgetDiv.DIV);a.setSelectedColor(this.getValue());var f=goog.style.getSize(a.getElement());d.y=d.y+f.height+
e.height>=b.height+c.y?d.y-(f.height-1):d.y+(e.height-1);Blockly.RTL?(d.x+=e.width,d.x-=f.width,d.x<c.x&&(d.x=c.x)):d.x>b.width+c.x-f.width&&(d.x=b.width+c.x-f.width);Blockly.WidgetDiv.position(d.x,d.y,b,c);var g=this;Blockly.FieldColour.changeEventKey_=goog.events.listen(a,goog.ui.ColorPicker.EventType.CHANGE,function(a){a=a.target.getSelectedColor()||"#000000";Blockly.WidgetDiv.hide();if(g.changeHandler_){var b=g.changeHandler_(a);void 0!==b&&(a=b)}null!==a&&g.setValue(a)})};
Blockly.FieldColour.widgetDispose_=function(){Blockly.FieldColour.changeEventKey_&&goog.events.unlistenByKey(Blockly.FieldColour.changeEventKey_)};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.FieldDropdown=function(a,b){this.menuGenerator_=a;this.changeHandler_=b;this.trimOptions_();var c=this.getOptions_()[0];this.value_=c[1];this.arrow_=Blockly.createSvgElement("tspan",{},null);this.arrow_.appendChild(document.createTextNode(Blockly.RTL?Blockly.FieldDropdown.ARROW_CHAR+" ":" "+Blockly.FieldDropdown.ARROW_CHAR));Blockly.FieldDropdown.superClass_.constructor.call(this,c[0])};goog.inherits(Blockly.FieldDropdown,Blockly.Field);Blockly.FieldDropdown.CHECKMARK_OVERHANG=25;
Blockly.FieldDropdown.ARROW_CHAR=goog.userAgent.ANDROID?"\u25bc":"\u25be";Blockly.FieldDropdown.prototype.clone=function(){return new Blockly.FieldDropdown(this.menuGenerator_,this.changeHandler_)};Blockly.FieldDropdown.prototype.CURSOR="default";
Blockly.FieldDropdown.prototype.showEditor_=function(){Blockly.WidgetDiv.show(this,null);for(var a=this,b=new goog.ui.Menu,c=this.getOptions_(),d=0;d<c.length;d++){var e=c[d][1],f=new goog.ui.MenuItem(c[d][0]);f.setValue(e);f.setCheckable(!0);b.addChild(f,!0);f.setChecked(e==this.value_)}goog.events.listen(b,goog.ui.Component.EventType.ACTION,function(b){if(b=b.target){b=b.getValue();if(a.changeHandler_){var c=a.changeHandler_(b);void 0!==c&&(b=c)}null!==b&&a.setValue(b)}Blockly.WidgetDiv.hideIfOwner(a)});
b.getHandler().listen(b.getElement(),goog.events.EventType.TOUCHSTART,function(a){this.getOwnerControl(a.target).handleMouseDown(a)});b.getHandler().listen(b.getElement(),goog.events.EventType.TOUCHEND,function(a){this.getOwnerControl(a.target).performActionInternal(a)});c=goog.dom.getViewportSize();d=goog.style.getViewportPageOffset(document);e=Blockly.getAbsoluteXY_(this.borderRect_);f=this.borderRect_.getBBox();b.render(Blockly.WidgetDiv.DIV);var g=b.getElement();Blockly.addClass_(g,"blocklyDropdownMenu");
var h=goog.style.getSize(g);e.y=e.y+h.height+f.height>=c.height+d.y?e.y-h.height:e.y+f.height;Blockly.RTL?(e.x+=f.width,e.x+=Blockly.FieldDropdown.CHECKMARK_OVERHANG,e.x<d.x+h.width&&(e.x=d.x+h.width)):(e.x-=Blockly.FieldDropdown.CHECKMARK_OVERHANG,e.x>c.width+d.x-h.width&&(e.x=c.width+d.x-h.width));Blockly.WidgetDiv.position(e.x,e.y,c,d);b.setAllowAutoFocus(!0);g.focus()};
Blockly.FieldDropdown.prototype.trimOptions_=function(){this.suffixField=this.prefixField=null;var a=this.menuGenerator_;if(goog.isArray(a)&&!(2>a.length)){var b=a.map(function(a){return a[0]}),c=Blockly.shortestStringLength(b),d=Blockly.commonWordPrefix(b,c),e=Blockly.commonWordSuffix(b,c);if((d||e)&&!(c<=d+e)){d&&(this.prefixField=b[0].substring(0,d-1));e&&(this.suffixField=b[0].substr(1-e));b=[];for(c=0;c<a.length;c++){var f=a[c][0],g=a[c][1],f=f.substring(d,f.length-e);b[c]=[f,g]}this.menuGenerator_=
b}}};Blockly.FieldDropdown.prototype.getOptions_=function(){return goog.isFunction(this.menuGenerator_)?this.menuGenerator_.call(this):this.menuGenerator_};Blockly.FieldDropdown.prototype.getValue=function(){return this.value_};Blockly.FieldDropdown.prototype.setValue=function(a){this.value_=a;for(var b=this.getOptions_(),c=0;c<b.length;c++)if(b[c][1]==a){this.setText(b[c][0]);return}this.setText(a)};
Blockly.FieldDropdown.prototype.setText=function(a){this.sourceBlock_&&(this.arrow_.style.fill=Blockly.makeColour(this.sourceBlock_.getColour()));null!==a&&a!==this.text_&&(this.text_=a,this.updateTextNode_(),Blockly.RTL?this.textElement_.insertBefore(this.arrow_,this.textElement_.firstChild):this.textElement_.appendChild(this.arrow_),this.sourceBlock_&&this.sourceBlock_.rendered&&(this.sourceBlock_.render(),this.sourceBlock_.bumpNeighbours_(),this.sourceBlock_.workspace.fireChangeEvent()))};
Blockly.FieldDropdown.prototype.dispose=function(){Blockly.WidgetDiv.hideIfOwner(this);Blockly.FieldDropdown.superClass_.dispose.call(this)};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.FieldImage=function(a,b,c,d){this.sourceBlock_=null;this.height_=Number(c);this.width_=Number(b);this.size_={height:this.height_+10,width:this.width_};this.text_=d||"";b=6-Blockly.BlockSvg.FIELD_HEIGHT;this.fieldGroup_=Blockly.createSvgElement("g",{},null);this.imageElement_=Blockly.createSvgElement("image",{height:this.height_+"px",width:this.width_+"px",y:b},this.fieldGroup_);this.setValue(a);goog.userAgent.GECKO&&(this.rectElement_=Blockly.createSvgElement("rect",{height:this.height_+"px",
width:this.width_+"px",y:b,"fill-opacity":0},this.fieldGroup_))};goog.inherits(Blockly.FieldImage,Blockly.Field);Blockly.FieldImage.prototype.clone=function(){return new Blockly.FieldImage(this.getSrc(),this.width_,this.height_,this.getText())};Blockly.FieldImage.prototype.rectElement_=null;Blockly.FieldImage.prototype.EDITABLE=!1;
Blockly.FieldImage.prototype.init=function(a){if(this.sourceBlock_)throw"Image has already been initialized once.";this.sourceBlock_=a;a.getSvgRoot().appendChild(this.fieldGroup_);a=this.rectElement_||this.imageElement_;a.tooltip=this.sourceBlock_;Blockly.Tooltip.bindMouseEvents(a)};Blockly.FieldImage.prototype.dispose=function(){goog.dom.removeNode(this.fieldGroup_);this.rectElement_=this.imageElement_=this.fieldGroup_=null};
Blockly.FieldImage.prototype.setTooltip=function(a){(this.rectElement_||this.imageElement_).tooltip=a};Blockly.FieldImage.prototype.getValue=function(){return this.src_};Blockly.FieldImage.prototype.setValue=function(a){null!==a&&(this.src_=a,this.imageElement_.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",goog.isString(a)?a:""))};Blockly.FieldImage.prototype.setText=function(a){null!==a&&(this.text_=a)};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.Flyout=function(){var a=this;this.workspace_=new Blockly.Workspace(function(){return a.getMetrics_()},function(b){return a.setMetrics_(b)});this.workspace_.isFlyout=!0;this.eventWrappers_=[];this.height_=this.width_=0;this.buttons_=[];this.listeners_=[]};Blockly.Flyout.prototype.autoClose=!0;Blockly.Flyout.prototype.CORNER_RADIUS=8;
Blockly.Flyout.prototype.createDom=function(){this.svgGroup_=Blockly.createSvgElement("g",{},null);this.svgBackground_=Blockly.createSvgElement("path",{"class":"blocklyFlyoutBackground"},this.svgGroup_);this.svgGroup_.appendChild(this.workspace_.createDom());return this.svgGroup_};
Blockly.Flyout.prototype.dispose=function(){this.hide();Blockly.unbindEvent_(this.eventWrappers_);this.eventWrappers_.length=0;this.scrollbar_&&(this.scrollbar_.dispose(),this.scrollbar_=null);this.workspace_=null;this.svgGroup_&&(goog.dom.removeNode(this.svgGroup_),this.svgGroup_=null);this.targetWorkspace_=this.svgBackground_=null};
Blockly.Flyout.prototype.getMetrics_=function(){if(!this.isVisible())return null;var a=this.height_-2*this.CORNER_RADIUS,b=this.width_;try{var c=this.workspace_.getCanvas().getBBox()}catch(d){c={height:0,y:0}}return{viewHeight:a,viewWidth:b,contentHeight:c.height+c.y,viewTop:-this.workspace_.scrollY,contentTop:0,absoluteTop:this.CORNER_RADIUS,absoluteLeft:0}};
Blockly.Flyout.prototype.setMetrics_=function(a){var b=this.getMetrics_();b&&(goog.isNumber(a.y)&&(this.workspace_.scrollY=-b.contentHeight*a.y-b.contentTop),a=this.workspace_.scrollY+b.absoluteTop,this.workspace_.getCanvas().setAttribute("transform","translate(0,"+a+")"))};
Blockly.Flyout.prototype.init=function(a){this.targetWorkspace_=a;this.scrollbar_=new Blockly.Scrollbar(this.workspace_,!1,!1);this.hide();this.eventWrappers_.concat(Blockly.bindEvent_(window,goog.events.EventType.RESIZE,this,this.position_));this.position_();this.eventWrappers_.concat(Blockly.bindEvent_(this.svgGroup_,"wheel",this,this.wheel_));this.eventWrappers_.concat(Blockly.bindEvent_(this.svgGroup_,"mousewheel",this,this.wheel_));this.eventWrappers_.concat(Blockly.bindEvent_(this.targetWorkspace_.getCanvas(),
"blocklyWorkspaceChange",this,this.filterForCapacity_));this.eventWrappers_.concat(Blockly.bindEvent_(this.svgGroup_,"mousedown",this,this.onMouseDown_))};
Blockly.Flyout.prototype.position_=function(){if(this.isVisible()){var a=this.targetWorkspace_.getMetrics();if(a){var b=this.width_-this.CORNER_RADIUS;Blockly.RTL&&(b*=-1);var c=["M "+(Blockly.RTL?this.width_:0)+",0"];c.push("h",b);c.push("a",this.CORNER_RADIUS,this.CORNER_RADIUS,0,0,Blockly.RTL?0:1,Blockly.RTL?-this.CORNER_RADIUS:this.CORNER_RADIUS,this.CORNER_RADIUS);c.push("v",Math.max(0,a.viewHeight-2*this.CORNER_RADIUS));c.push("a",this.CORNER_RADIUS,this.CORNER_RADIUS,0,0,Blockly.RTL?0:1,Blockly.RTL?
this.CORNER_RADIUS:-this.CORNER_RADIUS,this.CORNER_RADIUS);c.push("h",-b);c.push("z");this.svgBackground_.setAttribute("d",c.join(" "));b=a.absoluteLeft;Blockly.RTL&&(b+=a.viewWidth,b-=this.width_);this.svgGroup_.setAttribute("transform","translate("+b+","+a.absoluteTop+")");this.height_=a.viewHeight;this.scrollbar_&&this.scrollbar_.resize()}}};
Blockly.Flyout.prototype.wheel_=function(a){var b=a.deltaY||-a.wheelDeltaY;if(b){goog.userAgent.GECKO&&(b*=10);var c=this.getMetrics_(),b=c.viewTop+b,b=Math.min(b,c.contentHeight-c.viewHeight),b=Math.max(b,0);this.scrollbar_.set(b);a.preventDefault()}};Blockly.Flyout.prototype.isVisible=function(){return this.svgGroup_&&"block"==this.svgGroup_.style.display};
Blockly.Flyout.prototype.hide=function(){if(this.isVisible()){this.svgGroup_.style.display="none";for(var a=0,b;b=this.listeners_[a];a++)Blockly.unbindEvent_(b);this.listeners_.length=0;this.reflowWrapper_&&(Blockly.unbindEvent_(this.reflowWrapper_),this.reflowWrapper_=null)}};
Blockly.Flyout.prototype.show=function(a){this.hide();for(var b=this.workspace_.getTopBlocks(!1),c=0,d;d=b[c];c++)d.workspace==this.workspace_&&d.dispose(!1,!1);for(var c=0,e;e=this.buttons_[c];c++)goog.dom.removeNode(e);this.buttons_.length=0;var f=this.CORNER_RADIUS;this.svgGroup_.style.display="block";var b=[],g=[];if(a==Blockly.Variables.NAME_TYPE)Blockly.Variables.flyoutCategory(b,g,f,this.workspace_);else if(a==Blockly.Procedures.NAME_TYPE)Blockly.Procedures.flyoutCategory(b,g,f,this.workspace_);
else for(var h=0;d=a[h];h++)d.tagName&&"BLOCK"==d.tagName.toUpperCase()&&(d=Blockly.Xml.domToBlock(this.workspace_,d),b.push(d),g.push(3*f));a=f;for(h=0;d=b[h];h++){c=d.getDescendants();e=0;for(var k;k=c[e];e++)k.isInFlyout=!0,k.setCommentText(null);d.render();k=d.getSvgRoot();e=d.getHeightWidth();c=Blockly.RTL?0:f+Blockly.BlockSvg.TAB_WIDTH;d.moveBy(c,a);a+=e.height+g[h];e=Blockly.createSvgElement("rect",{"fill-opacity":0},null);this.workspace_.getCanvas().insertBefore(e,d.getSvgRoot());d.flyoutRect_=
e;this.buttons_[h]=e;this.autoClose?this.listeners_.push(Blockly.bindEvent_(k,"mousedown",null,this.createBlockFunc_(d))):this.listeners_.push(Blockly.bindEvent_(k,"mousedown",null,this.blockMouseDown_(d)));this.listeners_.push(Blockly.bindEvent_(k,"mouseover",d.svg_,d.svg_.addSelect));this.listeners_.push(Blockly.bindEvent_(k,"mouseout",d.svg_,d.svg_.removeSelect));this.listeners_.push(Blockly.bindEvent_(e,"mousedown",null,this.createBlockFunc_(d)));this.listeners_.push(Blockly.bindEvent_(e,"mouseover",
d.svg_,d.svg_.addSelect));this.listeners_.push(Blockly.bindEvent_(e,"mouseout",d.svg_,d.svg_.removeSelect))}this.listeners_.push(Blockly.bindEvent_(this.svgBackground_,"mouseover",this,function(a){a=this.workspace_.getTopBlocks(!1);for(var b=0,c;c=a[b];b++)c.svg_.removeSelect()}));this.width_=0;this.reflow();this.filterForCapacity_();Blockly.fireUiEventNow(window,"resize");this.reflowWrapper_=Blockly.bindEvent_(this.workspace_.getCanvas(),"blocklyWorkspaceChange",this,this.reflow);this.workspace_.fireChangeEvent()};
Blockly.Flyout.prototype.reflow=function(){for(var a=0,b=this.CORNER_RADIUS,c=this.workspace_.getTopBlocks(!1),d=0,e;e=c[d];d++){e.getSvgRoot();var f=e.getHeightWidth(),a=Math.max(a,f.width)}a+=b+Blockly.BlockSvg.TAB_WIDTH+b/2+Blockly.Scrollbar.scrollbarThickness;if(this.width_!=a){for(d=0;e=c[d];d++){var f=e.getHeightWidth(),g=e.getRelativeToSurfaceXY();if(Blockly.RTL){var h=a-b-Blockly.BlockSvg.TAB_WIDTH-g.x;e.moveBy(h,0);g.x+=h}e.flyoutRect_&&(e.flyoutRect_.setAttribute("width",f.width),e.flyoutRect_.setAttribute("height",
f.height),e.flyoutRect_.setAttribute("x",Blockly.RTL?g.x-f.width:g.x),e.flyoutRect_.setAttribute("y",g.y))}this.width_=a;Blockly.fireUiEvent(window,"resize")}};Blockly.Block.prototype.moveTo=function(a,b){var c=this.getRelativeToSurfaceXY();this.svg_.getRootElement().setAttribute("transform","translate("+a+", "+b+")");this.moveConnections_(a-c.x,b-c.y)};
Blockly.Flyout.prototype.blockMouseDown_=function(a){var b=this;return function(c){Blockly.terminateDrag_();Blockly.hideChaff();Blockly.isRightButton(c)?a.showContextMenu_(c):(Blockly.removeAllRanges(),Blockly.setCursorHand_(!0),Blockly.Flyout.startDownEvent_=c,Blockly.Flyout.startBlock_=a,Blockly.Flyout.startFlyout_=b,Blockly.Flyout.onMouseUpWrapper_=Blockly.bindEvent_(document,"mouseup",this,Blockly.terminateDrag_),Blockly.Flyout.onMouseMoveBlockWrapper_=Blockly.bindEvent_(document,"mousemove",
this,b.onMouseMoveBlock_));c.stopPropagation()}};Blockly.Flyout.prototype.onMouseDown_=function(a){Blockly.isRightButton(a)||(Blockly.hideChaff(!0),Blockly.Flyout.terminateDrag_(),this.startDragMouseY_=a.clientY,Blockly.Flyout.onMouseMoveWrapper_=Blockly.bindEvent_(document,"mousemove",this,this.onMouseMove_),Blockly.Flyout.onMouseUpWrapper_=Blockly.bindEvent_(document,"mouseup",this,Blockly.Flyout.terminateDrag_),a.preventDefault(),a.stopPropagation())};
Blockly.Flyout.prototype.onMouseMove_=function(a){var b=a.clientY-this.startDragMouseY_;this.startDragMouseY_=a.clientY;a=this.getMetrics_();b=a.viewTop-b;b=Math.min(b,a.contentHeight-a.viewHeight);b=Math.max(b,0);this.scrollbar_.set(b)};
Blockly.Flyout.prototype.onMouseMoveBlock_=function(a){if("mousemove"==a.type&&1>=a.clientX&&0==a.clientY&&0==a.button)a.stopPropagation();else{Blockly.removeAllRanges();var b=a.clientY-Blockly.Flyout.startDownEvent_.clientY;Math.sqrt(Math.pow(a.clientX-Blockly.Flyout.startDownEvent_.clientX,2)+Math.pow(b,2))>Blockly.DRAG_RADIUS&&Blockly.Flyout.startFlyout_.createBlockFunc_(Blockly.Flyout.startBlock_)(Blockly.Flyout.startDownEvent_)}};
Blockly.Flyout.prototype.createBlockFunc_=function(a){var b=this;return function(c){if(!Blockly.isRightButton(c)&&!a.disabled){var d=Blockly.Xml.blockToDom_(a),d=Blockly.Xml.domToBlock(b.targetWorkspace_,d),e=a.getSvgRoot();if(!e)throw"originBlock is not rendered.";var e=Blockly.getSvgXY_(e),f=d.getSvgRoot();if(!f)throw"block is not rendered.";f=Blockly.getSvgXY_(f);d.moveBy(e.x-f.x,e.y-f.y);b.autoClose?b.hide():b.filterForCapacity_();d.onMouseDown_(c)}}};
Blockly.Flyout.prototype.filterForCapacity_=function(){for(var a=this.targetWorkspace_.remainingCapacity(),b=this.workspace_.getTopBlocks(!1),c=0,d;d=b[c];c++){var e=d.getDescendants().length>a;d.setDisabled(e)}};
Blockly.Flyout.terminateDrag_=function(){Blockly.Flyout.onMouseUpWrapper_&&(Blockly.unbindEvent_(Blockly.Flyout.onMouseUpWrapper_),Blockly.Flyout.onMouseUpWrapper_=null);Blockly.Flyout.onMouseMoveBlockWrapper_&&(Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveBlockWrapper_),Blockly.Flyout.onMouseMoveBlockWrapper_=null);Blockly.Flyout.onMouseMoveWrapper_&&(Blockly.unbindEvent_(Blockly.Flyout.onMouseMoveWrapper_),Blockly.Flyout.onMouseMoveWrapper_=null);Blockly.Flyout.onMouseUpWrapper_&&(Blockly.unbindEvent_(Blockly.Flyout.onMouseUpWrapper_),
Blockly.Flyout.onMouseUpWrapper_=null);Blockly.Flyout.startDownEvent_=null;Blockly.Flyout.startBlock_=null;Blockly.Flyout.startFlyout_=null};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.Toolbox={};Blockly.Toolbox.width=0;Blockly.Toolbox.selectedOption_=null;Blockly.Toolbox.CONFIG_={indentWidth:19,cssRoot:"blocklyTreeRoot",cssHideRoot:"blocklyHidden",cssItem:"",cssTreeRow:"blocklyTreeRow",cssItemLabel:"blocklyTreeLabel",cssTreeIcon:"blocklyTreeIcon",cssExpandedFolderIcon:"blocklyTreeIconOpen",cssFileIcon:"blocklyTreeIconNone",cssSelectedRow:"blocklyTreeSelected"};
Blockly.Toolbox.createDom=function(a,b){Blockly.Toolbox.HtmlDiv=goog.dom.createDom("div","blocklyToolboxDiv");Blockly.Toolbox.HtmlDiv.setAttribute("dir",Blockly.RTL?"RTL":"LTR");b.appendChild(Blockly.Toolbox.HtmlDiv);Blockly.Toolbox.flyout_=new Blockly.Flyout;a.appendChild(Blockly.Toolbox.flyout_.createDom());Blockly.bindEvent_(Blockly.Toolbox.HtmlDiv,"mousedown",null,function(a){Blockly.isRightButton(a)||a.target==Blockly.Toolbox.HtmlDiv?Blockly.hideChaff(!1):Blockly.hideChaff(!0)})};
Blockly.Toolbox.init=function(){Blockly.Toolbox.CONFIG_.cleardotPath=Blockly.pathToBlockly+"media/1x1.gif";Blockly.Toolbox.CONFIG_.cssCollapsedFolderIcon="blocklyTreeIconClosed"+(Blockly.RTL?"Rtl":"Ltr");var a=new Blockly.Toolbox.TreeControl(goog.html.SafeHtml.EMPTY,Blockly.Toolbox.CONFIG_);Blockly.Toolbox.tree_=a;a.setShowRootNode(!1);a.setShowLines(!1);a.setShowExpandIcons(!1);a.setSelectedItem(null);Blockly.Toolbox.HtmlDiv.style.display="block";Blockly.Toolbox.flyout_.init(Blockly.mainWorkspace);
Blockly.Toolbox.populate_();a.render(Blockly.Toolbox.HtmlDiv);goog.events.listen(window,goog.events.EventType.RESIZE,Blockly.Toolbox.position_);Blockly.Toolbox.position_()};
Blockly.Toolbox.position_=function(){var a=Blockly.Toolbox.HtmlDiv,b=goog.style.getBorderBox(Blockly.svg),c=Blockly.svgSize();Blockly.RTL?(b=Blockly.convertCoordinates(0,0,!1),a.style.left=b.x+c.width-a.offsetWidth+"px"):a.style.marginLeft=b.left;a.style.height=c.height+1+"px";Blockly.Toolbox.width=a.offsetWidth;Blockly.RTL||(Blockly.Toolbox.width-=1)};
Blockly.Toolbox.populate_=function(){function a(c,d){for(var e=0,f;f=c.childNodes[e];e++)if(f.tagName){var g=f.tagName.toUpperCase();if("CATEGORY"==g){g=b.createNode(f.getAttribute("name"));g.blocks=[];d.add(g);var h=f.getAttribute("custom");h?g.blocks=h:a(f,g)}else"BLOCK"==g&&d.blocks.push(f)}}var b=Blockly.Toolbox.tree_;b.removeChildren();b.blocks=[];a(Blockly.languageTree,Blockly.Toolbox.tree_);if(b.blocks.length)throw"Toolbox cannot have both blocks and categories in the root level.";Blockly.fireUiEvent(window,
"resize")};Blockly.Toolbox.clearSelection=function(){Blockly.Toolbox.tree_.setSelectedItem(null)};Blockly.Toolbox.TreeControl=function(a,b,c){goog.ui.tree.TreeControl.call(this,a,b,c)};goog.inherits(Blockly.Toolbox.TreeControl,goog.ui.tree.TreeControl);
Blockly.Toolbox.TreeControl.prototype.enterDocument=function(){Blockly.Toolbox.TreeControl.superClass_.enterDocument.call(this);if(goog.events.BrowserFeature.TOUCH_ENABLED){var a=this.getElement();Blockly.bindEvent_(a,goog.events.EventType.TOUCHSTART,this,this.handleTouchEvent_)}};Blockly.Toolbox.TreeControl.prototype.handleTouchEvent_=function(a){a.preventDefault();var b=this.getNodeFromEvent_(a);b&&a.type===goog.events.EventType.TOUCHSTART&&window.setTimeout(function(){b.onMouseDown(a)},1)};
Blockly.Toolbox.TreeControl.prototype.createNode=function(a){return new Blockly.Toolbox.TreeNode(a?goog.html.SafeHtml.htmlEscape(a):goog.html.SafeHtml.EMPTY,this.getConfig(),this.getDomHelper())};Blockly.Toolbox.TreeControl.prototype.setSelectedItem=function(a){this.selectedItem_!=a&&(goog.ui.tree.TreeControl.prototype.setSelectedItem.call(this,a),a&&a.blocks&&a.blocks.length?Blockly.Toolbox.flyout_.show(a.blocks):Blockly.Toolbox.flyout_.hide())};
Blockly.Toolbox.TreeNode=function(a,b,c){goog.ui.tree.TreeNode.call(this,a,b,c);a=function(){Blockly.fireUiEvent(window,"resize")};goog.events.listen(Blockly.Toolbox.tree_,goog.ui.tree.BaseNode.EventType.EXPAND,a);goog.events.listen(Blockly.Toolbox.tree_,goog.ui.tree.BaseNode.EventType.COLLAPSE,a)};goog.inherits(Blockly.Toolbox.TreeNode,goog.ui.tree.TreeNode);goog.ui.tree.BaseNode.prototype.getExpandIconSafeHtml=function(){return goog.html.SafeHtml.create("span")};
Blockly.Toolbox.TreeNode.prototype.onMouseDown=function(a){this.hasChildren()&&this.isUserCollapsible_?(this.toggle(),this.select()):this.isSelected()?this.getTree().setSelectedItem(null):this.select();this.updateRow()};Blockly.Toolbox.TreeNode.prototype.onDoubleClick_=function(a){};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Variables={};Blockly.Variables.NAME_TYPE="VARIABLE";Blockly.Variables.allVariables=function(a){var b;b=a?a.getDescendants():Blockly.mainWorkspace.getAllBlocks();a=Object.create(null);for(var c=0;c<b.length;c++){var d=b[c].getVars;if(d)for(var d=d.call(b[c]),e=0;e<d.length;e++){var f=d[e];f&&(a[f.toLowerCase()]=f)}}b=[];for(var g in a)b.push(a[g]);return b};
Blockly.Variables.renameVariable=function(a,b){for(var c=Blockly.mainWorkspace.getAllBlocks(),d=0;d<c.length;d++){var e=c[d].renameVar;e&&e.call(c[d],a,b)}};
Blockly.Variables.flyoutCategory=function(a,b,c,d){var e=Blockly.Variables.allVariables();e.sort(goog.string.caseInsensitiveCompare);e.unshift(null);for(var f=void 0,g=0;g<e.length;g++)if(e[g]!==f){var h=Blockly.Blocks.variables_get?Blockly.Block.obtain(d,"variables_get"):null;h&&h.initSvg();var k=Blockly.Blocks.variables_set?Blockly.Block.obtain(d,"variables_set"):null;k&&k.initSvg();null===e[g]?f=(h||k).getVars()[0]:(h&&h.setFieldValue(e[g],"VAR"),k&&k.setFieldValue(e[g],"VAR"));k&&a.push(k);h&&
a.push(h);h&&k?b.push(c,3*c):b.push(2*c)}};Blockly.Variables.generateUniqueName=function(){var a=Blockly.Variables.allVariables(),b="";if(a.length){a.sort(goog.string.caseInsensitiveCompare);for(var c=0,d="i",e=0,f=!1;!b;){e=0;for(f=!1;e<a.length&&!f;)a[e].toLowerCase()==d&&(f=!0),e++;f?("z"===d[0]?(c++,d="a"):(d=String.fromCharCode(d.charCodeAt(0)+1),"l"==d[0]&&(d=String.fromCharCode(d.charCodeAt(0)+1))),0<c&&(d+=c)):b=d}}else b="i";return b};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.FieldVariable=function(a,b){var c;if(b){var d=this;c=function(a){var c=Blockly.FieldVariable.dropdownChange.call(d,a);a=void 0===c?a:null===c?d.getValue():c;b.call(d,a);return c}}else c=Blockly.FieldVariable.dropdownChange;Blockly.FieldVariable.superClass_.constructor.call(this,Blockly.FieldVariable.dropdownCreate,c);a?this.setValue(a):this.setValue(Blockly.Variables.generateUniqueName())};goog.inherits(Blockly.FieldVariable,Blockly.FieldDropdown);
Blockly.FieldVariable.prototype.clone=function(){return new Blockly.FieldVariable(this.getValue(),this.changeHandler_)};Blockly.FieldVariable.prototype.getValue=function(){return this.getText()};Blockly.FieldVariable.prototype.setValue=function(a){this.value_=a;this.setText(a)};
Blockly.FieldVariable.dropdownCreate=function(){var a=Blockly.Variables.allVariables(),b=this.getText();b&&-1==a.indexOf(b)&&a.push(b);a.sort(goog.string.caseInsensitiveCompare);a.push(Blockly.Msg.RENAME_VARIABLE);a.push(Blockly.Msg.NEW_VARIABLE);for(var b=[],c=0;c<a.length;c++)b[c]=[a[c],a[c]];return b};
Blockly.FieldVariable.dropdownChange=function(a){function b(a,b){Blockly.hideChaff();var c=window.prompt(a,b);return c&&c.replace(/[\s\xa0]+/g," ").replace(/^ | $/g,"")}if(a==Blockly.Msg.RENAME_VARIABLE){var c=this.getText();(a=b(Blockly.Msg.RENAME_VARIABLE_TITLE.replace("%1",c),c))&&Blockly.Variables.renameVariable(c,a);return null}if(a==Blockly.Msg.NEW_VARIABLE)return(a=b(Blockly.Msg.NEW_VARIABLE_TITLE,""))?(Blockly.Variables.renameVariable(a,a),a):null};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Generator=function(a){this.name_=a;this.RESERVED_WORDS_="";this.FUNCTION_NAME_PLACEHOLDER_REGEXP_=new RegExp(this.FUNCTION_NAME_PLACEHOLDER_,"g")};Blockly.Generator.NAME_TYPE="generated_function";Blockly.Generator.prototype.INFINITE_LOOP_TRAP=null;Blockly.Generator.prototype.STATEMENT_PREFIX=null;
Blockly.Generator.prototype.workspaceToCode=function(){var a=[];this.init();for(var b=Blockly.mainWorkspace.getTopBlocks(!0),c=0,d;d=b[c];c++){var e=this.blockToCode(d);goog.isArray(e)&&(e=e[0]);e&&(d.outputConnection&&this.scrubNakedValue&&(e=this.scrubNakedValue(e)),a.push(e))}a=a.join("\n");a=this.finish(a);a=a.replace(/^\s+\n/,"");a=a.replace(/\n\s+$/,"\n");return a=a.replace(/[ \t]+\n/g,"\n")};Blockly.Generator.prototype.prefixLines=function(a,b){return b+a.replace(/\n(.)/g,"\n"+b+"$1")};
Blockly.Generator.prototype.allNestedComments=function(a){var b=[];a=a.getDescendants();for(var c=0;c<a.length;c++){var d=a[c].getCommentText();d&&b.push(d)}b.length&&b.push("");return b.join("\n")};
Blockly.Generator.prototype.blockToCode=function(a){if(!a)return"";if(a.disabled)return this.blockToCode(a.getNextBlock());var b=this[a.type];if(!b)throw'Language "'+this.name_+'" does not know how to generate code for block type "'+a.type+'".';b=b.call(a,a);if(goog.isArray(b))return[this.scrub_(a,b[0]),b[1]];if(goog.isString(b))return this.STATEMENT_PREFIX&&(b=this.STATEMENT_PREFIX.replace(/%1/g,"'"+a.id+"'")+b),this.scrub_(a,b);if(null===b)return"";throw"Invalid code generated: "+b;};
Blockly.Generator.prototype.valueToCode=function(a,b,c){if(isNaN(c))throw'Expecting valid order from block "'+a.type+'".';a=a.getInputTargetBlock(b);if(!a)return"";var d=this.blockToCode(a);if(""===d)return"";if(!goog.isArray(d))throw'Expecting tuple from value block "'+a.type+'".';b=d[0];d=d[1];if(isNaN(d))throw'Expecting valid order from value block "'+a.type+'".';b&&c<=d&&c!=d&&0!=c&&99!=c&&(b="("+b+")");return b};
Blockly.Generator.prototype.statementToCode=function(a,b){var c=a.getInputTargetBlock(b),d=this.blockToCode(c);if(!goog.isString(d))throw'Expecting code from statement block "'+c.type+'".';d&&(d=this.prefixLines(d,this.INDENT));return d};Blockly.Generator.prototype.addLoopTrap=function(a,b){this.INFINITE_LOOP_TRAP&&(a=this.INFINITE_LOOP_TRAP.replace(/%1/g,"'"+b+"'")+a);this.STATEMENT_PREFIX&&(a+=this.prefixLines(this.STATEMENT_PREFIX.replace(/%1/g,"'"+b+"'"),this.INDENT));return a};
Blockly.Generator.prototype.INDENT="  ";Blockly.Generator.prototype.addReservedWords=function(a){this.RESERVED_WORDS_+=a+","};Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_="{leCUI8hutHZI4480Dc}";Blockly.Generator.prototype.provideFunction_=function(a,b){if(!this.definitions_[a]){var c=this.variableDB_.getDistinctName(a,this.NAME_TYPE);this.functionNames_[a]=c;this.definitions_[a]=b.join("\n").replace(this.FUNCTION_NAME_PLACEHOLDER_REGEXP_,c)}return this.functionNames_[a]};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Names=function(a){this.reservedDict_=Object.create(null);if(a){a=a.split(",");for(var b=0;b<a.length;b++)this.reservedDict_[a[b]]=!0}this.reset()};Blockly.Names.prototype.reset=function(){this.db_=Object.create(null);this.dbReverse_=Object.create(null)};Blockly.Names.prototype.getName=function(a,b){var c=a.toLowerCase()+"_"+b;if(c in this.db_)return this.db_[c];var d=this.getDistinctName(a,b);return this.db_[c]=d};
Blockly.Names.prototype.getDistinctName=function(a,b){for(var c=this.safeName_(a),d="";this.dbReverse_[c+d]||c+d in this.reservedDict_;)d=d?d+1:2;c+=d;this.dbReverse_[c]=!0;return c};Blockly.Names.prototype.safeName_=function(a){a?(a=encodeURI(a.replace(/ /g,"_")).replace(/[^\w]/g,"_"),-1!="0123456789".indexOf(a[0])&&(a="my_"+a)):a="unnamed";return a};Blockly.Names.equals=function(a,b){return a.toLowerCase()==b.toLowerCase()};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Procedures={};Blockly.Procedures.NAME_TYPE="PROCEDURE";Blockly.Procedures.allProcedures=function(){for(var a=Blockly.mainWorkspace.getAllBlocks(),b=[],c=[],d=0;d<a.length;d++){var e=a[d].getProcedureDef;e&&(e=e.call(a[d]))&&(e[2]?b.push(e):c.push(e))}c.sort(Blockly.Procedures.procTupleComparator_);b.sort(Blockly.Procedures.procTupleComparator_);return[c,b]};Blockly.Procedures.procTupleComparator_=function(a,b){var c=a[0].toLowerCase(),d=b[0].toLowerCase();return c>d?1:c<d?-1:0};
Blockly.Procedures.findLegalName=function(a,b){if(b.isInFlyout)return a;for(;!Blockly.Procedures.isLegalName(a,b.workspace,b);){var c=a.match(/^(.*?)(\d+)$/);a=c?c[1]+(parseInt(c[2],10)+1):a+"2"}return a};Blockly.Procedures.isLegalName=function(a,b,c){b=b.getAllBlocks();for(var d=0;d<b.length;d++)if(b[d]!=c){var e=b[d].getProcedureDef;if(e&&(e=e.call(b[d]),Blockly.Names.equals(e[0],a)))return!1}return!0};
Blockly.Procedures.rename=function(a){a=a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"");a=Blockly.Procedures.findLegalName(a,this.sourceBlock_);for(var b=this.sourceBlock_.workspace.getAllBlocks(),c=0;c<b.length;c++){var d=b[c].renameProcedure;d&&d.call(b[c],this.text_,a)}return a};
Blockly.Procedures.flyoutCategory=function(a,b,c,d){function e(e,f){for(var k=0;k<e.length;k++){var l=Blockly.Block.obtain(d,f);l.setFieldValue(e[k][0],"NAME");for(var p=[],m=0;m<e[k][1].length;m++)p[m]="ARG"+m;l.setProcedureParameters(e[k][1],p);l.initSvg();a.push(l);b.push(2*c)}}if(Blockly.Blocks.procedures_defnoreturn){var f=Blockly.Block.obtain(d,"procedures_defnoreturn");f.initSvg();a.push(f);b.push(2*c)}Blockly.Blocks.procedures_defreturn&&(f=Blockly.Block.obtain(d,"procedures_defreturn"),f.initSvg(),
a.push(f),b.push(2*c));Blockly.Blocks.procedures_ifreturn&&(f=Blockly.Block.obtain(d,"procedures_ifreturn"),f.initSvg(),a.push(f),b.push(2*c));b.length&&(b[b.length-1]=3*c);f=Blockly.Procedures.allProcedures();e(f[0],"procedures_callnoreturn");e(f[1],"procedures_callreturn")};Blockly.Procedures.getCallers=function(a,b){for(var c=[],d=b.getAllBlocks(),e=0;e<d.length;e++){var f=d[e].getProcedureCall;f&&(f=f.call(d[e]))&&Blockly.Names.equals(f,a)&&c.push(d[e])}return c};
Blockly.Procedures.disposeCallers=function(a,b){for(var c=Blockly.Procedures.getCallers(a,b),d=0;d<c.length;d++)c[d].dispose(!0,!1)};Blockly.Procedures.mutateCallers=function(a,b,c,d){a=Blockly.Procedures.getCallers(a,b);for(b=0;b<a.length;b++)a[b].setProcedureParameters(c,d)};Blockly.Procedures.getDefinition=function(a,b){for(var c=b.getAllBlocks(),d=0;d<c.length;d++){var e=c[d].getProcedureDef;if(e&&(e=e.call(c[d]))&&Blockly.Names.equals(e[0],a))return c[d]}return null};
// Copyright 2013 Google Inc.  Apache License 2.0
var rtclient={INSTALL_SCOPE:"https://www.googleapis.com/auth/drive.install",FILE_SCOPE:"https://www.googleapis.com/auth/drive.file",APPDATA_SCOPE:"https://www.googleapis.com/auth/drive.appdata",OPENID_SCOPE:"openid",REALTIME_MIMETYPE:"application/vnd.google-apps.drive-sdk",FOLDER_KEY:"folderId",getParams:function(){function a(a){a=a.slice(1).split("&");for(var c=0;c<a.length;c++){var f=a[c].split("=");b[decodeURIComponent(f[0])]=decodeURIComponent(f[1])}}var b={},c=window.location.hash;c&&a(c);(c=
window.location.search)&&a(c);return b}};rtclient.params=rtclient.getParams();rtclient.getOption=function(a,b,c){if(a.hasOwnProperty(b))return a[b];void 0===c&&console.error(b+" should be present in the options.");return c};rtclient.Authorizer=function(a){this.clientId=rtclient.getOption(a,"clientId");this.userId=rtclient.params.userId;this.authButton=document.getElementById(rtclient.getOption(a,"authButtonElementId"));this.authDiv=document.getElementById(rtclient.getOption(a,"authDivElementId"))};
rtclient.Authorizer.prototype.start=function(a){var b=this;gapi.load("auth:client,drive-realtime,drive-share",function(){b.authorize(a)})};
rtclient.Authorizer.prototype.authorize=function(a){var b=this.clientId,c=this.userId,d=this,e=function(b){b&&!b.error?(d.authButton.disabled=!0,d.fetchUserId(a),d.authDiv.style.display="none"):(d.authButton.disabled=!1,d.authButton.onclick=f,d.authDiv.style.display="block")},f=function(){gapi.auth.authorize({client_id:b,scope:[rtclient.INSTALL_SCOPE,rtclient.FILE_SCOPE,rtclient.OPENID_SCOPE,rtclient.APPDATA_SCOPE],user_id:c,immediate:!1},e)};gapi.auth.authorize({client_id:b,scope:[rtclient.INSTALL_SCOPE,
rtclient.FILE_SCOPE,rtclient.OPENID_SCOPE,rtclient.APPDATA_SCOPE],user_id:c,immediate:!0},e)};rtclient.Authorizer.prototype.fetchUserId=function(a){var b=this;gapi.client.load("oauth2","v2",function(){gapi.client.oauth2.userinfo.get().execute(function(c){c.id&&(b.userId=c.id);a&&a()})})};
rtclient.createRealtimeFile=function(a,b,c,d){function e(c){gapi.client.drive.files.insert({resource:{mimeType:b,title:a,parents:[{id:c}]}}).execute(d)}function f(){function a(b){gapi.client.drive.properties.insert({fileId:"appdata",resource:{key:rtclient.FOLDER_KEY,value:b}}).execute(function(a){e(b)})}function b(){gapi.client.drive.files.insert({resource:{mimeType:"application/vnd.google-apps.folder",title:c}}).execute(function(b){a(b.id)})}gapi.client.drive.properties.get({fileId:"appdata",propertyKey:rtclient.FOLDER_KEY}).execute(function(d){if(d.error)c?
b():a("root");else{var f=d.result.value;gapi.client.drive.files.get({fileId:f}).execute(function(a){a.error||a.labels.trashed?b():e(f)})}})}gapi.client.load("drive","v2",function(){f()})};rtclient.getFileMetadata=function(a,b){gapi.client.load("drive","v2",function(){gapi.client.drive.files.get({fileId:a}).execute(b)})};rtclient.parseState=function(a){try{return JSON.parse(a)}catch(b){return null}};
rtclient.RealtimeLoader=function(a){this.onFileLoaded=rtclient.getOption(a,"onFileLoaded");this.newFileMimeType=rtclient.getOption(a,"newFileMimeType",rtclient.REALTIME_MIMETYPE);this.initializeModel=rtclient.getOption(a,"initializeModel");this.registerTypes=rtclient.getOption(a,"registerTypes",function(){});this.afterAuth=rtclient.getOption(a,"afterAuth",function(){});this.autoCreate=rtclient.getOption(a,"autoCreate",!1);this.defaultTitle=rtclient.getOption(a,"defaultTitle","New Realtime File");
this.defaultFolderTitle=rtclient.getOption(a,"defaultFolderTitle","");this.afterCreate=rtclient.getOption(a,"afterCreate",function(){});this.authorizer=new rtclient.Authorizer(a)};
rtclient.RealtimeLoader.prototype.redirectTo=function(a,b){var c=[];a&&c.push("fileIds="+a.join(","));b&&c.push("userId="+b);c=0==c.length?window.location.pathname:window.location.pathname+"#"+c.join("&");window.history&&window.history.replaceState?window.history.replaceState("Google Drive Realtime API Playground","Google Drive Realtime API Playground",c):window.location.href=c;rtclient.params=rtclient.getParams();for(var d in a)gapi.drive.realtime.load(a[d],this.onFileLoaded,this.initializeModel,
this.handleErrors)};rtclient.RealtimeLoader.prototype.start=function(){var a=this;this.authorizer.start(function(){a.registerTypes&&a.registerTypes();a.afterAuth&&a.afterAuth();a.load()})};
rtclient.RealtimeLoader.prototype.handleErrors=function(a){a.type==gapi.drive.realtime.ErrorType.TOKEN_REFRESH_REQUIRED?this.authorizer.authorize():a.type==gapi.drive.realtime.ErrorType.CLIENT_ERROR?(alert("An Error happened: "+a.message),window.location.href="/"):a.type==gapi.drive.realtime.ErrorType.NOT_FOUND&&(alert("The file was not found. It does not exist or you do not have read access to the file."),window.location.href="/")};
rtclient.RealtimeLoader.prototype.load=function(){var a=rtclient.params.fileIds;a&&(a=a.split(","));var b=this.authorizer.userId,b=rtclient.params.state;if(a)for(var c in a)gapi.drive.realtime.load(a[c],this.onFileLoaded,this.initializeModel,this.handleErrors);else{if(b&&(c=rtclient.parseState(b),"open"==c.action)){a=c.ids;b=c.userId;this.redirectTo(a,b);return}this.autoCreate&&this.createNewFileAndRedirect()}};
rtclient.RealtimeLoader.prototype.createNewFileAndRedirect=function(){var a=this;rtclient.createRealtimeFile(this.defaultTitle,this.newFileMimeType,this.defaultFolderTitle,function(b){b.id?(a.afterCreate&&a.afterCreate(b.id),a.redirectTo([b.id],a.authorizer.userId)):(console.error("Error creating file."),console.error(b))})};
// Copyright 2014 Google Inc.  Apache License 2.0
Blockly.Realtime={};Blockly.Realtime.PROGRESS_URL_="media/progress.gif";Blockly.Realtime.enabled_=!1;Blockly.Realtime.document_=null;Blockly.Realtime.model_=null;Blockly.Realtime.sessionId_=null;Blockly.Realtime.initUi_=null;Blockly.Realtime.blocksMap_=null;Blockly.Realtime.withinSync=!1;Blockly.Realtime.realtimeLoader_=null;Blockly.Realtime.chatBoxElementId_=null;Blockly.Realtime.chatBoxInitialText_=null;Blockly.Realtime.withinUndo_=!1;Blockly.Realtime.isEnabled=function(){return Blockly.Realtime.enabled_};
Blockly.Realtime.undoElementId_=null;Blockly.Realtime.redoElementId_=null;Blockly.Realtime.PROGRESS_URL_="media/progress.gif";Blockly.Realtime.ANONYMOUS_URL_="media/anon.jpeg";Blockly.Realtime.initializeModel_=function(a){Blockly.Realtime.model_=a;var b=a.createMap();a.getRoot().set("blocks",b);b=a.createList();a.getRoot().set("topBlocks",b);Blockly.Realtime.chatBoxElementId_&&a.getRoot().set(Blockly.Realtime.chatBoxElementId_,a.createString(Blockly.Realtime.chatBoxInitialText_))};
Blockly.Realtime.removeBlock=function(a){Blockly.Realtime.blocksMap_["delete"](a.id.toString())};Blockly.Realtime.addTopBlock=function(a){-1==Blockly.Realtime.topBlocks_.indexOf(a)&&Blockly.Realtime.topBlocks_.push(a)};Blockly.Realtime.removeTopBlock=function(a){Blockly.Realtime.topBlocks_.removeValue(a)};Blockly.Realtime.obtainBlock=function(a,b){return Blockly.Realtime.model_.create(Blockly.Block,a,b)};Blockly.Realtime.getBlockById=function(a){return Blockly.Realtime.blocksMap_.get(a)};
Blockly.Realtime.logEvent_=function(a){console.log("Object event:");console.log("  id: "+a.target.id);console.log("  type: "+a.type);if(a=a.events)for(var b=a.length,c=0;c<b;c++){var d=a[c];console.log("  child event:");console.log("    id: "+d.target.id);console.log("    type: "+d.type)}};
Blockly.Realtime.onObjectChange_=function(a){var b=a.events;a=a.events.length;for(var c=0;c<a;c++){var d=b[c];if(!d.isLocal||Blockly.Realtime.withinUndo_){var e=d.target;"value_changed"==d.type&&("xmlDom"==d.property?Blockly.Realtime.doWithinSync_(function(){Blockly.Realtime.placeBlockOnWorkspace_(e,!1);Blockly.Realtime.moveBlock_(e)}):"relativeX"!=d.property&&"relativeY"!=d.property||Blockly.Realtime.doWithinSync_(function(){e.svg_||Blockly.Realtime.placeBlockOnWorkspace_(e,!1);Blockly.Realtime.moveBlock_(e)}))}}};
Blockly.Realtime.onBlocksMapChange_=function(a){if(!a.isLocal||Blockly.Realtime.withinUndo_){var b=a.newValue;b?Blockly.Realtime.placeBlockOnWorkspace_(b,!a.oldValue):(b=a.oldValue,Blockly.Realtime.deleteBlock(b))}};Blockly.Realtime.doWithinSync_=function(a){if(Blockly.Realtime.withinSync)a();else try{Blockly.Realtime.withinSync=!0,a()}finally{Blockly.Realtime.withinSync=!1}};
Blockly.Realtime.placeBlockOnWorkspace_=function(a,b){Blockly.Realtime.doWithinSync_(function(){var c=Blockly.Xml.textToDom(a.xmlDom).firstChild;if(c=Blockly.Xml.domToBlock(Blockly.mainWorkspace,c,!0))b&&c.workspace.addTopBlock(c),(b||goog.array.contains(Blockly.Realtime.topBlocks_,c))&&Blockly.Realtime.moveBlock_(c)})};
Blockly.Realtime.moveBlock_=function(a){if(!isNaN(a.relativeX)&&!isNaN(a.relativeY)){var b=Blockly.svgSize().width,c=a.getRelativeToSurfaceXY(),d=a.relativeX-c.x;a.moveBy(Blockly.RTL?b-d:d,a.relativeY-c.y)}};Blockly.Realtime.deleteBlock=function(a){Blockly.Realtime.doWithinSync_(function(){a.dispose(!0,!0,!0)})};Blockly.Realtime.loadBlocks_=function(){for(var a=Blockly.Realtime.topBlocks_,b=0;b<a.length;b++){var c=a.get(b);Blockly.Realtime.placeBlockOnWorkspace_(c,!0)}};
Blockly.Realtime.blockChanged=function(a){if(a.workspace==Blockly.mainWorkspace&&Blockly.Realtime.isEnabled()&&!Blockly.Realtime.withinSync){a=a.getRootBlock();var b=a.getRelativeToSurfaceXY(),c=!1,d=Blockly.Xml.blockToDom_(a);d.setAttribute("id",a.id);var e=goog.dom.createDom("xml");e.appendChild(d);d=Blockly.Xml.domToText(e);d!=a.xmlDom&&(c=!0,a.xmlDom=d);if(a.relativeX!=b.x||a.relativeY!=b.y)a.relativeX=b.x,a.relativeY=b.y,c=!0;c&&Blockly.Realtime.blocksMap_.set(a.id.toString(),a)}};
Blockly.Realtime.onFileLoaded_=function(a){Blockly.Realtime.document_=a;Blockly.Realtime.sessionId_=Blockly.Realtime.getSessionId_(a);Blockly.Realtime.model_=a.getModel();Blockly.Realtime.blocksMap_=Blockly.Realtime.model_.getRoot().get("blocks");Blockly.Realtime.topBlocks_=Blockly.Realtime.model_.getRoot().get("topBlocks");Blockly.Realtime.model_.getRoot().addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED,Blockly.Realtime.onObjectChange_);Blockly.Realtime.blocksMap_.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED,
Blockly.Realtime.onBlocksMapChange_);Blockly.Realtime.initUi_();a.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_JOINED,Blockly.Realtime.onCollaboratorJoined_);a.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_LEFT,Blockly.Realtime.onCollaboratorLeft_);Blockly.Realtime.updateCollabUi_();Blockly.Realtime.loadBlocks_()};Blockly.Realtime.getSessionId_=function(a){a=a.getCollaborators();for(var b=0;b<a.length;b++){var c=a[b];if(c.isMe)return c.sessionId}};
Blockly.Realtime.registerTypes_=function(){var a=gapi.drive.realtime.custom;a.registerType(Blockly.Block,"Block");Blockly.Block.prototype.id=a.collaborativeField("id");Blockly.Block.prototype.xmlDom=a.collaborativeField("xmlDom");Blockly.Block.prototype.relativeX=a.collaborativeField("relativeX");Blockly.Block.prototype.relativeY=a.collaborativeField("relativeY");a.setInitializer(Blockly.Block,Blockly.Block.prototype.initialize)};Blockly.Realtime.REAUTH_INTERVAL_IN_MILLISECONDS_=18E5;
Blockly.Realtime.afterAuth_=function(){window.setTimeout(function(){Blockly.Realtime.realtimeLoader_.authorizer.authorize(Blockly.Realtime.afterAuth_)},Blockly.Realtime.REAUTH_INTERVAL_IN_MILLISECONDS_)};
Blockly.Realtime.afterCreate_=function(a){var b=gapi.client.drive.permissions.insert({fileId:a,resource:{type:"anyone",role:"writer",value:"default",withLink:!0}});b.execute(function(c){c.error&&Blockly.Realtime.getUserDomain(a,function(c){b=gapi.client.drive.permissions.insert({fileId:a,resource:{type:"domain",role:"writer",value:c,withLink:!0}});b.execute(function(a){})})})};
Blockly.Realtime.getUserDomain=function(a,b){gapi.client.drive.permissions.list({fileId:a}).execute(function(a){for(var d=0;d<a.items.length;d++){var e=a.items[d];if("owner"==e.role){b(e.domain);break}}})};
Blockly.Realtime.rtclientOptions_={clientId:null,authButtonElementId:"authorizeButton",authDivElementId:"authButtonDiv",initializeModel:Blockly.Realtime.initializeModel_,autoCreate:!0,defaultTitle:"Realtime Blockly File",defaultFolderTitle:"Realtime Blockly Folder",newFileMimeType:null,onFileLoaded:Blockly.Realtime.onFileLoaded_,registerTypes:Blockly.Realtime.registerTypes_,afterAuth:Blockly.Realtime.afterAuth_,afterCreate:Blockly.Realtime.afterCreate_};
Blockly.Realtime.parseOptions_=function(a){var b=rtclient.getOption(a,"chatbox");b&&(Blockly.Realtime.chatBoxElementId_=rtclient.getOption(b,"elementId"),Blockly.Realtime.chatBoxInitialText_=rtclient.getOption(b,"initText",Blockly.Msg.CHAT));Blockly.Realtime.rtclientOptions_.clientId=rtclient.getOption(a,"clientId");Blockly.Realtime.collabElementId=rtclient.getOption(a,"collabElementId")};
Blockly.Realtime.startRealtime=function(a,b,c){Blockly.Realtime.parseOptions_(c);Blockly.Realtime.enabled_=!0;Blockly.Realtime.addAuthUi_(b);Blockly.Realtime.initUi_=function(){a();if(Blockly.Realtime.chatBoxElementId_){var b=Blockly.Realtime.model_.getRoot().get(Blockly.Realtime.chatBoxElementId_),c=document.getElementById(Blockly.Realtime.chatBoxElementId_);gapi.drive.realtime.databinding.bindString(b,c);c.disabled=!1}};Blockly.Realtime.realtimeLoader_=new rtclient.RealtimeLoader(Blockly.Realtime.rtclientOptions_);
Blockly.Realtime.realtimeLoader_.start()};
Blockly.Realtime.addAuthUi_=function(a){a.style.background="url("+Blockly.pathToBlockly+Blockly.Realtime.PROGRESS_URL_+") no-repeat center center";var b=goog.style.getBounds(a),c=goog.dom.createDom("div");c.id=Blockly.Realtime.rtclientOptions_.authDivElementId;var d=goog.dom.createDom("p",null,Blockly.Msg.AUTH);c.appendChild(d);d=goog.dom.createDom("button",null,"Authorize");d.id=Blockly.Realtime.rtclientOptions_.authButtonElementId;c.appendChild(d);a.appendChild(c);c.style.display="none";c.style.position=
"relative";c.style.textAlign="center";c.style.border="1px solid";c.style.backgroundColor="#f6f9ff";c.style.borderRadius="15px";c.style.boxShadow="10px 10px 5px #888";c.style.width=b.width/3+"px";a=goog.style.getBounds(c);c.style.left=(b.width-a.width)/3+"px";c.style.top=(b.height-a.height)/4+"px";return c};
Blockly.Realtime.updateCollabUi_=function(){if(Blockly.Realtime.collabElementId){var a=goog.dom.getElement(Blockly.Realtime.collabElementId);goog.dom.removeChildren(a);for(var b=Blockly.Realtime.document_.getCollaborators(),c=0;c<b.length;c++){var d=b[c],e=goog.dom.createDom("img",{src:d.photoUrl||Blockly.pathToBlockly+Blockly.Realtime.ANONYMOUS_URL_,alt:d.displayName,title:d.displayName+(d.isMe?" ("+Blockly.Msg.ME+")":"")});e.style.backgroundColor=d.color;goog.dom.appendChild(a,e)}}};
Blockly.Realtime.onCollaboratorJoined_=function(a){Blockly.Realtime.updateCollabUi_()};Blockly.Realtime.onCollaboratorLeft_=function(a){Blockly.Realtime.updateCollabUi_()};Blockly.Realtime.doCommand=function(a){a()};Blockly.Realtime.genUid=function(a){var b=Blockly.Realtime.sessionId_+"-"+a;return Blockly.Realtime.blocksMap_.has(b)?Blockly.Realtime.genUid("-"+a):b};
// Copyright 2013 Google Inc.  Apache License 2.0
Blockly.Css={};Blockly.Css.inject=function(){var a=Blockly.Css.CONTENT.join("\n"),b=Blockly.pathToBlockly.replace(/[\\\/]$/,""),a=a.replace(/<<<PATH>>>/g,b);goog.cssom.addCssText(a)};
Blockly.Css.CONTENT=[".blocklySvg {","  background-color: #fff;","  border: 1px solid #ddd;","  overflow: hidden;","}",".blocklyWidgetDiv {","  position: absolute;","  display: none;","  z-index: 999;","}",".blocklyDraggable {","  cursor: url(<<<PATH>>>/media/handopen.cur) 8 5, auto;","}",".blocklyResizeSE {","  fill: #aaa;","  cursor: se-resize;","}",".blocklyResizeSW {","  fill: #aaa;","  cursor: sw-resize;","}",".blocklyResizeLine {","  stroke-width: 1;","  stroke: #888;","}",".blocklyHighlightedConnectionPath {",
"  stroke-width: 4px;","  stroke: #fc3;","  fill: none;","}",".blocklyPathLight {","  fill: none;","  stroke-width: 2;","  stroke-linecap: round;","}",".blocklySelected>.blocklyPath {","  stroke-width: 3px;","  stroke: #fc3;","}",".blocklySelected>.blocklyPathLight {","  display: none;","}",".blocklyDragging>.blocklyPath,",".blocklyDragging>.blocklyPathLight {","  fill-opacity: .8;","  stroke-opacity: .8;","}",".blocklyDragging>.blocklyPathDark {","  display: none;","}",".blocklyDisabled>.blocklyPath {",
"  fill-opacity: .5;","  stroke-opacity: .5;","}",".blocklyDisabled>.blocklyPathLight,",".blocklyDisabled>.blocklyPathDark {","  display: none;","}",".blocklyText {","  cursor: default;","  font-family: sans-serif;","  font-size: 11pt;","  fill: #fff;","}",".blocklyNonEditableText>text {","  pointer-events: none;","}",".blocklyNonEditableText>rect,",".blocklyEditableText>rect {","  fill: #fff;","  fill-opacity: .6;","}",".blocklyNonEditableText>text,",".blocklyEditableText>text {","  fill: #000;",
"}",".blocklyEditableText:hover>rect {","  stroke-width: 2;","  stroke: #fff;","}",".blocklyBubbleText {","  fill: #000;","}",".blocklySvg text {","  -moz-user-select: none;","  -webkit-user-select: none;","  user-select: none;","  cursor: inherit;","}",".blocklyHidden {","  display: none;","}",".blocklyFieldDropdown:not(.blocklyHidden) {","  display: block;","}",".blocklyTooltipBackground {","  fill: #ffffc7;","  stroke-width: 1px;","  stroke: #d8d8d8;","}",".blocklyTooltipShadow,",".blocklyDropdownMenuShadow {",
"  fill: #bbb;","  filter: url(#blocklyShadowFilter);","}",".blocklyTooltipText {","  font-family: sans-serif;","  font-size: 9pt;","  fill: #000;","}",".blocklyIconShield {","  cursor: default;","  fill: #00c;","  stroke-width: 1px;","  stroke: #ccc;","}",".blocklyIconGroup:hover>.blocklyIconShield {","  fill: #00f;","  stroke: #fff;","}",".blocklyIconGroup:hover>.blocklyIconMark {","  fill: #fff;","}",".blocklyIconMark {","  cursor: default !important;","  font-family: sans-serif;","  font-size: 9pt;",
"  font-weight: bold;","  fill: #ccc;","  text-anchor: middle;","}",".blocklyWarningBody {","}",".blocklyMinimalBody {","  margin: 0;","  padding: 0;","}",".blocklyCommentTextarea {","  margin: 0;","  padding: 2px;","  border: 0;","  resize: none;","  background-color: #ffc;","}",".blocklyHtmlInput {","  font-family: sans-serif;","  font-size: 11pt;","  border: none;","  outline: none;","  width: 100%","}",".blocklyMutatorBackground {","  fill: #fff;","  stroke-width: 1;","  stroke: #ddd;","}",".blocklyFlyoutBackground {",
"  fill: #ddd;","  fill-opacity: .8;","}",".blocklyColourBackground {","  fill: #666;","}",".blocklyScrollbarBackground {","  fill: #fff;","  stroke-width: 1;","  stroke: #e4e4e4;","}",".blocklyScrollbarKnob {","  fill: #ccc;","}",".blocklyScrollbarBackground:hover+.blocklyScrollbarKnob,",".blocklyScrollbarKnob:hover {","  fill: #bbb;","}",".blocklyInvalidInput {","  background: #faa;","}",".blocklyAngleCircle {","  stroke: #444;","  stroke-width: 1;","  fill: #ddd;","  fill-opacity: .8;","}",".blocklyAngleMarks {",
"  stroke: #444;","  stroke-width: 1;","}",".blocklyAngleGauge {","  fill: #f88;","  fill-opacity: .8;  ","}",".blocklyAngleLine {","  stroke: #f00;","  stroke-width: 2;","  stroke-linecap: round;","}",".blocklyContextMenu {","  border-radius: 4px;","}",".blocklyDropdownMenu {","  padding: 0 !important;","}",".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,",".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {","  background: url(<<<PATH>>>/media/sprites.png) no-repeat -48px -16px !important;",
"}",".blocklyToolboxDiv {","  background-color: #ddd;","  display: none;","  overflow-x: visible;","  overflow-y: auto;","  position: absolute;","}",".blocklyTreeRoot {","  padding: 4px 0;","}",".blocklyTreeRoot:focus {","  outline: none;","}",".blocklyTreeRow {","  line-height: 22px;","  height: 22px;","  padding-right: 1em;","  white-space: nowrap;","}",'.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {',"  padding-right: 0;","  padding-left: 1em !important;","}",".blocklyTreeRow:hover {","  background-color: #e4e4e4;",
"}",".blocklyTreeIcon {","  height: 16px;","  width: 16px;","  vertical-align: middle;","  background-image: url(<<<PATH>>>/media/sprites.png);","}",".blocklyTreeIconClosedLtr {","  background-position: -32px -1px;","}",".blocklyTreeIconClosedRtl {","  background-position: 0px -1px;","}",".blocklyTreeIconOpen {","  background-position: -16px -1px;","}",".blocklyTreeSelected>.blocklyTreeIconClosedLtr {","  background-position: -32px -17px;","}",".blocklyTreeSelected>.blocklyTreeIconClosedRtl {","  background-position: 0px -17px;",
"}",".blocklyTreeSelected>.blocklyTreeIconOpen {","  background-position: -16px -17px;","}",".blocklyTreeIconNone,",".blocklyTreeSelected>.blocklyTreeIconNone {","  background-position: -48px -1px;","}",".blocklyTreeLabel {","  cursor: default;","  font-family: sans-serif;","  font-size: 16px;","  padding: 0 3px;","  vertical-align: middle;","}",".blocklyTreeSelected  {","  background-color: #57e !important;","}",".blocklyTreeSelected .blocklyTreeLabel {","  color: #fff;","}",".blocklyWidgetDiv .goog-palette {",
"  outline: none;","  cursor: default;","}",".blocklyWidgetDiv .goog-palette-table {","  border: 1px solid #666;","  border-collapse: collapse;","}",".blocklyWidgetDiv .goog-palette-cell {","  height: 13px;","  width: 15px;","  margin: 0;","  border: 0;","  text-align: center;","  vertical-align: middle;","  border-right: 1px solid #666;","  font-size: 1px;","}",".blocklyWidgetDiv .goog-palette-colorswatch {","  position: relative;","  height: 13px;","  width: 15px;","  border: 1px solid #666;","}",
".blocklyWidgetDiv .goog-palette-cell-hover .goog-palette-colorswatch {","  border: 1px solid #FFF;","}",".blocklyWidgetDiv .goog-palette-cell-selected .goog-palette-colorswatch {","  border: 1px solid #000;","  color: #fff;","}",".blocklyWidgetDiv .goog-menu {","  background: #fff;","  border-color: #ccc #666 #666 #ccc;","  border-style: solid;","  border-width: 1px;","  cursor: default;","  font: normal 13px Arial, sans-serif;","  margin: 0;","  outline: none;","  padding: 4px 0;","  position: absolute;",
"  z-index: 20000;","}",".blocklyWidgetDiv .goog-menuitem {","  color: #000;","  font: normal 13px Arial, sans-serif;","  list-style: none;","  margin: 0;","  padding: 4px 7em 4px 28px;","  white-space: nowrap;","}",".blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl {","  padding-left: 7em;","  padding-right: 28px;","}",".blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,",".blocklyWidgetDiv .goog-menu-noicon .goog-menuitem {","  padding-left: 12px;","}",".blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem {",
"  padding-right: 20px;","}",".blocklyWidgetDiv .goog-menuitem-content {","  color: #000;","  font: normal 13px Arial, sans-serif;","}",".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,",".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content {","  color: #ccc !important;","}",".blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon {","  opacity: 0.3;","  -moz-opacity: 0.3;","  filter: alpha(opacity=30);","}",".blocklyWidgetDiv .goog-menuitem-highlight,",".blocklyWidgetDiv .goog-menuitem-hover {",
"  background-color: #d6e9f8;","  border-color: #d6e9f8;","  border-style: dotted;","  border-width: 1px 0;","  padding-bottom: 3px;","  padding-top: 3px;","}",".blocklyWidgetDiv .goog-menuitem-checkbox,",".blocklyWidgetDiv .goog-menuitem-icon {","  background-repeat: no-repeat;","  height: 16px;","  left: 6px;","  position: absolute;","  right: auto;","  vertical-align: middle;","  width: 16px;","}",".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,",".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon {",
"  left: auto;","  right: 6px;","}",".blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,",".blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {","  background: url(//ssl.gstatic.com/editor/editortoolbar.png) no-repeat -512px 0;","}",".blocklyWidgetDiv .goog-menuitem-accel {","  color: #999;","  direction: ltr;","  left: auto;","  padding: 0 6px;","  position: absolute;","  right: 0;","  text-align: right;","}",".blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel {","  left: 0;",
"  right: auto;","  text-align: left;","}",".blocklyWidgetDiv .goog-menuitem-mnemonic-hint {","  text-decoration: underline;","}",".blocklyWidgetDiv .goog-menuitem-mnemonic-separator {","  color: #999;","  font-size: 12px;","  padding-left: 4px;","}",".blocklyWidgetDiv .goog-menuseparator {","  border-top: 1px solid #ccc;","  margin: 4px 0;","  padding: 0;","}",""];
// Copyright 2013 Google Inc.  Apache License 2.0
Blockly.WidgetDiv={};Blockly.WidgetDiv.DIV=null;Blockly.WidgetDiv.owner_=null;Blockly.WidgetDiv.dispose_=null;Blockly.WidgetDiv.show=function(a,b){Blockly.WidgetDiv.hide();Blockly.WidgetDiv.owner_=a;Blockly.WidgetDiv.dispose_=b;Blockly.WidgetDiv.DIV.style.display="block"};Blockly.WidgetDiv.hide=function(){Blockly.WidgetDiv.owner_&&(Blockly.WidgetDiv.DIV.style.display="none",Blockly.WidgetDiv.dispose_&&Blockly.WidgetDiv.dispose_(),Blockly.WidgetDiv.owner_=null,Blockly.WidgetDiv.dispose_=null,goog.dom.removeChildren(Blockly.WidgetDiv.DIV))};
Blockly.WidgetDiv.isVisible=function(){return!!Blockly.WidgetDiv.owner_};Blockly.WidgetDiv.hideIfOwner=function(a){Blockly.WidgetDiv.owner_==a&&Blockly.WidgetDiv.hide()};Blockly.WidgetDiv.position=function(a,b,c,d){b<d.y&&(b=d.y);Blockly.RTL?a>c.width+d.x&&(a=c.width+d.x):a<d.x&&(a=d.x);Blockly.WidgetDiv.DIV.style.left=a+"px";Blockly.WidgetDiv.DIV.style.top=b+"px"};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.inject=function(a,b){if(!goog.dom.contains(document,a))throw"Error: container is not in current document.";b&&Blockly.parseOptions_(b);var c=function(){Blockly.createDom_(a);Blockly.init_()};if(Blockly.enableRealtime){var d=document.getElementById("realtime");d&&(d.style.display="block");Blockly.Realtime.startRealtime(c,a,Blockly.realtimeOptions)}else c()};
Blockly.parseToolboxTree_=function(a){a?("string"!=typeof a&&"undefined"==typeof XSLTProcessor&&(a=a.outerHTML),"string"==typeof a&&(a=Blockly.Xml.textToDom(a))):a=null;return a};
Blockly.parseOptions_=function(a){var b=!!a.readOnly;if(b)var c=!1,d=!1,e=!1,f=!1,g=!1,h=null;else h=Blockly.parseToolboxTree_(a.toolbox),c=Boolean(h&&h.getElementsByTagName("category").length),d=a.trashcan,void 0===d&&(d=c),e=a.collapse,void 0===e&&(e=c),f=a.comments,void 0===f&&(f=c),g=a.disable,void 0===g&&(g=c);if(h&&!c)var k=!1;else k=a.scrollbars,void 0===k&&(k=!0);var l=a.sounds;void 0===l&&(l=!0);var p=!!a.realtime,m=p?a.realtimeOptions:void 0;Blockly.RTL=!!a.rtl;Blockly.collapse=e;Blockly.comments=
f;Blockly.disable=g;Blockly.readOnly=b;Blockly.maxBlocks=a.maxBlocks||Infinity;Blockly.pathToBlockly=a.path||"./";Blockly.hasCategories=c;Blockly.hasScrollbars=k;Blockly.hasTrashcan=d;Blockly.hasSounds=l;Blockly.languageTree=h;Blockly.enableRealtime=p;Blockly.realtimeOptions=m};
Blockly.createDom_=function(a){a.setAttribute("dir","LTR");goog.ui.Component.setDefaultRightToLeft(Blockly.RTL);Blockly.Css.inject();var b=Blockly.createSvgElement("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:html":"http://www.w3.org/1999/xhtml","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1","class":"blocklySvg"},null),c=Blockly.createSvgElement("defs",{},b),d,e;d=Blockly.createSvgElement("filter",{id:"blocklyEmboss"},c);Blockly.createSvgElement("feGaussianBlur",{"in":"SourceAlpha",
stdDeviation:1,result:"blur"},d);e=Blockly.createSvgElement("feSpecularLighting",{"in":"blur",surfaceScale:1,specularConstant:.5,specularExponent:10,"lighting-color":"white",result:"specOut"},d);Blockly.createSvgElement("fePointLight",{x:-5E3,y:-1E4,z:2E4},e);Blockly.createSvgElement("feComposite",{"in":"specOut",in2:"SourceAlpha",operator:"in",result:"specOut"},d);Blockly.createSvgElement("feComposite",{"in":"SourceGraphic",in2:"specOut",operator:"arithmetic",k1:0,k2:1,k3:1,k4:0},d);d=Blockly.createSvgElement("filter",
{id:"blocklyTrashcanShadowFilter"},c);Blockly.createSvgElement("feGaussianBlur",{"in":"SourceAlpha",stdDeviation:2,result:"blur"},d);Blockly.createSvgElement("feOffset",{"in":"blur",dx:1,dy:1,result:"offsetBlur"},d);d=Blockly.createSvgElement("feMerge",{},d);Blockly.createSvgElement("feMergeNode",{"in":"offsetBlur"},d);Blockly.createSvgElement("feMergeNode",{"in":"SourceGraphic"},d);d=Blockly.createSvgElement("filter",{id:"blocklyShadowFilter"},c);Blockly.createSvgElement("feGaussianBlur",{stdDeviation:2},
d);c=Blockly.createSvgElement("pattern",{id:"blocklyDisabledPattern",patternUnits:"userSpaceOnUse",width:10,height:10},c);Blockly.createSvgElement("rect",{width:10,height:10,fill:"#aaa"},c);Blockly.createSvgElement("path",{d:"M 0 0 L 10 10 M 10 0 L 0 10",stroke:"#cc0"},c);Blockly.mainWorkspace=new Blockly.Workspace(Blockly.getMainWorkspaceMetrics_,Blockly.setMainWorkspaceMetrics_);b.appendChild(Blockly.mainWorkspace.createDom());Blockly.mainWorkspace.maxBlocks=Blockly.maxBlocks;Blockly.readOnly||
(Blockly.hasCategories?Blockly.Toolbox.createDom(b,a):(Blockly.mainWorkspace.flyout_=new Blockly.Flyout,c=Blockly.mainWorkspace.flyout_,d=c.createDom(),c.autoClose=!1,goog.dom.insertSiblingBefore(d,Blockly.mainWorkspace.svgGroup_),Blockly.addChangeListener(function(){if(0==Blockly.Block.dragMode_){var a=Blockly.mainWorkspace.getMetrics();if(0>a.contentTop||a.contentTop+a.contentHeight>a.viewHeight+a.viewTop||a.contentLeft<(Blockly.RTL?a.viewLeft:0)||a.contentLeft+a.contentWidth>(Blockly.RTL?a.viewWidth:
a.viewWidth+a.viewLeft))for(var b=Blockly.mainWorkspace.getTopBlocks(!1),c=0,d;d=b[c];c++){var e=d.getRelativeToSurfaceXY(),p=d.getHeightWidth(),m=a.viewTop+25-p.height-e.y;0<m&&d.moveBy(0,m);m=a.viewTop+a.viewHeight-25-e.y;0>m&&d.moveBy(0,m);m=25+a.viewLeft-e.x-(Blockly.RTL?0:p.width);0<m&&d.moveBy(m,0);m=a.viewLeft+a.viewWidth-25-e.x+(Blockly.RTL?p.width:0);0>m&&d.moveBy(m,0);d.isDeletable()&&50<(Blockly.RTL?e.x-a.viewWidth:-e.x)&&d.dispose(!1,!0)}}})));b.appendChild(Blockly.Tooltip.createDom());
a.appendChild(b);Blockly.svg=b;Blockly.svgResize();Blockly.WidgetDiv.DIV=goog.dom.createDom("div","blocklyWidgetDiv");Blockly.WidgetDiv.DIV.style.direction=Blockly.RTL?"rtl":"ltr";document.body.appendChild(Blockly.WidgetDiv.DIV)};
Blockly.init_=function(){Blockly.bindEvent_(Blockly.svg,"mousedown",null,Blockly.onMouseDown_);Blockly.bindEvent_(Blockly.svg,"contextmenu",null,Blockly.onContextMenu_);Blockly.bindEvent_(Blockly.WidgetDiv.DIV,"contextmenu",null,Blockly.onContextMenu_);Blockly.documentEventsBound_||(Blockly.bindEvent_(window,"resize",document,Blockly.svgResize),Blockly.bindEvent_(document,"keydown",null,Blockly.onKeyDown_),document.addEventListener("mouseup",Blockly.onMouseUp_,!1),goog.userAgent.IPAD&&Blockly.bindEvent_(window,
"orientationchange",document,function(){Blockly.fireUiEvent(window,"resize")}),Blockly.documentEventsBound_=!0);if(Blockly.languageTree)if(Blockly.hasCategories)Blockly.Toolbox.init();else{Blockly.mainWorkspace.flyout_.init(Blockly.mainWorkspace);Blockly.mainWorkspace.flyout_.show(Blockly.languageTree.childNodes);Blockly.mainWorkspace.scrollX=Blockly.mainWorkspace.flyout_.width_;Blockly.RTL&&(Blockly.mainWorkspace.scrollX*=-1);var a="translate("+Blockly.mainWorkspace.scrollX+", 0)";Blockly.mainWorkspace.getCanvas().setAttribute("transform",
a);Blockly.mainWorkspace.getBubbleCanvas().setAttribute("transform",a)}Blockly.hasScrollbars&&(Blockly.mainWorkspace.scrollbar=new Blockly.ScrollbarPair(Blockly.mainWorkspace),Blockly.mainWorkspace.scrollbar.resize());Blockly.mainWorkspace.addTrashcan();if(Blockly.hasSounds){Blockly.loadAudio_(["media/click.mp3","media/click.wav","media/click.ogg"],"click");Blockly.loadAudio_(["media/delete.mp3","media/delete.ogg","media/delete.wav"],"delete");var b=[],a=function(){for(;b.length;)Blockly.unbindEvent_(b.pop());
Blockly.preloadAudio_()};b.push(Blockly.bindEvent_(document,"mousemove",null,a));b.push(Blockly.bindEvent_(document,"touchstart",null,a))}};
Blockly.updateToolbox=function(a){if(a=Blockly.parseToolboxTree_(a)){if(!Blockly.languageTree)throw"Existing toolbox is null.  Can't create new toolbox.";if(a.getElementsByTagName("category").length){if(!Blockly.hasCategories)throw"Existing toolbox has no categories.  Can't change mode.";Blockly.languageTree=a;Blockly.Toolbox.populate_()}else{if(Blockly.hasCategories)throw"Existing toolbox has categories.  Can't change mode.";Blockly.languageTree=a;Blockly.mainWorkspace.flyout_.show(Blockly.languageTree.childNodes)}}else if(Blockly.languageTree)throw"Can't nullify an existing toolbox.";
};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.utils={};Blockly.addClass_=function(a,b){var c=a.getAttribute("class")||"";-1==(" "+c+" ").indexOf(" "+b+" ")&&(c&&(c+=" "),a.setAttribute("class",c+b))};Blockly.removeClass_=function(a,b){var c=a.getAttribute("class");if(-1!=(" "+c+" ").indexOf(" "+b+" ")){for(var c=c.split(/\s+/),d=0;d<c.length;d++)c[d]&&c[d]!=b||(c.splice(d,1),d--);c.length?a.setAttribute("class",c.join(" ")):a.removeAttribute("class")}};
Blockly.bindEvent_=function(a,b,c,d){var e=function(a){d.apply(c,arguments)};a.addEventListener(b,e,!1);var f=[[a,b,e]];if(b in Blockly.bindEvent_.TOUCH_MAP)for(var e=function(a){if(1==a.changedTouches.length){var b=a.changedTouches[0];a.clientX=b.clientX;a.clientY=b.clientY}d.apply(c,arguments);a.preventDefault()},g=0,h;h=Blockly.bindEvent_.TOUCH_MAP[b][g];g++)a.addEventListener(h,e,!1),f.push([a,h,e]);return f};Blockly.bindEvent_.TOUCH_MAP={};
"ontouchstart"in document.documentElement&&(Blockly.bindEvent_.TOUCH_MAP={mousedown:["touchstart"],mousemove:["touchmove"],mouseup:["touchend","touchcancel"]});Blockly.unbindEvent_=function(a){for(;a.length;){var b=a.pop(),c=b[2];b[0].removeEventListener(b[1],c,!1)}return c};
Blockly.fireUiEventNow=function(a,b){var c=document;if(c.createEvent)c=c.createEvent("UIEvents"),c.initEvent(b,!0,!0),a.dispatchEvent(c);else if(c.createEventObject)c=c.createEventObject(),a.fireEvent("on"+b,c);else throw"FireEvent: No event creation mechanism.";};Blockly.fireUiEvent=function(a,b){setTimeout(function(){Blockly.fireUiEventNow(a,b)},0)};Blockly.noEvent=function(a){a.preventDefault();a.stopPropagation()};
Blockly.getRelativeXY_=function(a){var b={x:0,y:0},c=a.getAttribute("x");c&&(b.x=parseInt(c,10));if(c=a.getAttribute("y"))b.y=parseInt(c,10);if(a=(a=a.getAttribute("transform"))&&a.match(/translate\(\s*([-\d.]+)([ ,]\s*([-\d.]+)\s*\))?/))b.x+=parseInt(a[1],10),a[3]&&(b.y+=parseInt(a[3],10));return b};Blockly.getSvgXY_=function(a){var b=0,c=0;do{var d=Blockly.getRelativeXY_(a),b=b+d.x,c=c+d.y;a=a.parentNode}while(a&&a!=Blockly.svg);return{x:b,y:c}};
Blockly.getAbsoluteXY_=function(a){a=Blockly.getSvgXY_(a);return Blockly.convertCoordinates(a.x,a.y,!1)};Blockly.createSvgElement=function(a,b,c){a=document.createElementNS(Blockly.SVG_NS,a);for(var d in b)a.setAttribute(d,b[d]);document.body.runtimeStyle&&(a.runtimeStyle=a.currentStyle=a.style);c&&c.appendChild(a);return a};Blockly.isRightButton=function(a){return 2==a.button||a.ctrlKey};
Blockly.convertCoordinates=function(a,b,c){c&&(a-=window.scrollX||window.pageXOffset,b-=window.scrollY||window.pageYOffset);var d=Blockly.svg.createSVGPoint();d.x=a;d.y=b;a=Blockly.svg.getScreenCTM();c&&(a=a.inverse());d=d.matrixTransform(a);c||(d.x+=window.scrollX||window.pageXOffset,d.y+=window.scrollY||window.pageYOffset);return d};Blockly.mouseToSvg=function(a){return Blockly.convertCoordinates(a.clientX+(window.scrollX||window.pageXOffset),a.clientY+(window.scrollY||window.pageYOffset),!0)};
Blockly.shortestStringLength=function(a){if(!a.length)return 0;for(var b=a[0].length,c=1;c<a.length;c++)b=Math.min(b,a[c].length);return b};Blockly.commonWordPrefix=function(a,b){if(!a.length)return 0;if(1==a.length)return a[0].length;for(var c=0,d=b||Blockly.shortestStringLength(a),e=0;e<d;e++){for(var f=a[0][e],g=1;g<a.length;g++)if(f!=a[g][e])return c;" "==f&&(c=e+1)}for(g=1;g<a.length;g++)if((f=a[g][e])&&" "!=f)return c;return d};
Blockly.commonWordSuffix=function(a,b){if(!a.length)return 0;if(1==a.length)return a[0].length;for(var c=0,d=b||Blockly.shortestStringLength(a),e=0;e<d;e++){for(var f=a[0].substr(-e-1,1),g=1;g<a.length;g++)if(f!=a[g].substr(-e-1,1))return c;" "==f&&(c=e+1)}for(g=1;g<a.length;g++)if((f=a[g].charAt(a[g].length-e-1))&&" "!=f)return c;return d};Blockly.isNumber=function(a){return!!a.match(/^\s*-?\d+(\.\d+)?\s*$/)};
// Copyright 2011 Google Inc.  Apache License 2.0
Blockly.pathToBlockly="./";Blockly.SVG_NS="http://www.w3.org/2000/svg";Blockly.HTML_NS="http://www.w3.org/1999/xhtml";Blockly.HSV_SATURATION=.45;Blockly.HSV_VALUE=.65;Blockly.SPRITE={width:64,height:92,url:"media/sprites.png"};Blockly.makeColour=function(a){return goog.color.hsvToHex(a,Blockly.HSV_SATURATION,256*Blockly.HSV_VALUE)};Blockly.INPUT_VALUE=1;Blockly.OUTPUT_VALUE=2;Blockly.NEXT_STATEMENT=3;Blockly.PREVIOUS_STATEMENT=4;Blockly.DUMMY_INPUT=5;Blockly.ALIGN_LEFT=-1;Blockly.ALIGN_CENTRE=0;
Blockly.ALIGN_RIGHT=1;Blockly.OPPOSITE_TYPE=[];Blockly.OPPOSITE_TYPE[Blockly.INPUT_VALUE]=Blockly.OUTPUT_VALUE;Blockly.OPPOSITE_TYPE[Blockly.OUTPUT_VALUE]=Blockly.INPUT_VALUE;Blockly.OPPOSITE_TYPE[Blockly.NEXT_STATEMENT]=Blockly.PREVIOUS_STATEMENT;Blockly.OPPOSITE_TYPE[Blockly.PREVIOUS_STATEMENT]=Blockly.NEXT_STATEMENT;Blockly.SOUNDS_=Object.create(null);Blockly.selected=null;Blockly.readOnly=!1;Blockly.highlightedConnection_=null;Blockly.localConnection_=null;Blockly.DRAG_RADIUS=5;
Blockly.SNAP_RADIUS=20;Blockly.BUMP_DELAY=250;Blockly.COLLAPSE_CHARS=30;Blockly.mainWorkspace=null;Blockly.clipboard_=null;Blockly.onTouchUpWrapper_=null;Blockly.svgSize=function(){return{width:Blockly.svg.cachedWidth_,height:Blockly.svg.cachedHeight_}};
Blockly.svgResize=function(){var a=Blockly.svg,b=a.parentNode,c=b.offsetWidth,b=b.offsetHeight;a.cachedWidth_!=c&&(a.setAttribute("width",c+"px"),a.cachedWidth_=c);a.cachedHeight_!=b&&(a.setAttribute("height",b+"px"),a.cachedHeight_=b);Blockly.mainWorkspace.scrollbar&&Blockly.mainWorkspace.scrollbar.resize()};
Blockly.onMouseDown_=function(a){Blockly.svgResize();Blockly.terminateDrag_();Blockly.hideChaff();var b=a.target&&a.target.nodeName&&"svg"==a.target.nodeName.toLowerCase();!Blockly.readOnly&&Blockly.selected&&b&&Blockly.selected.unselect();a.target==Blockly.svg&&Blockly.isRightButton(a)?Blockly.showContextMenu_(a):(Blockly.readOnly||b)&&Blockly.mainWorkspace.scrollbar&&(Blockly.mainWorkspace.dragMode=!0,Blockly.mainWorkspace.startDragMouseX=a.clientX,Blockly.mainWorkspace.startDragMouseY=a.clientY,
Blockly.mainWorkspace.startDragMetrics=Blockly.mainWorkspace.getMetrics(),Blockly.mainWorkspace.startScrollX=Blockly.mainWorkspace.scrollX,Blockly.mainWorkspace.startScrollY=Blockly.mainWorkspace.scrollY,"mouseup"in Blockly.bindEvent_.TOUCH_MAP&&(Blockly.onTouchUpWrapper_=Blockly.bindEvent_(document,"mouseup",null,Blockly.onMouseUp_)),Blockly.onMouseMoveWrapper_=Blockly.bindEvent_(document,"mousemove",null,Blockly.onMouseMove_))};
Blockly.onMouseUp_=function(a){Blockly.setCursorHand_(!1);Blockly.mainWorkspace.dragMode=!1;Blockly.onTouchUpWrapper_&&(Blockly.unbindEvent_(Blockly.onTouchUpWrapper_),Blockly.onTouchUpWrapper_=null);Blockly.onMouseMoveWrapper_&&(Blockly.unbindEvent_(Blockly.onMouseMoveWrapper_),Blockly.onMouseMoveWrapper_=null)};
Blockly.onMouseMove_=function(a){if(Blockly.mainWorkspace.dragMode){Blockly.removeAllRanges();var b=Blockly.mainWorkspace.startDragMetrics,c=Blockly.mainWorkspace.startScrollX+(a.clientX-Blockly.mainWorkspace.startDragMouseX),d=Blockly.mainWorkspace.startScrollY+(a.clientY-Blockly.mainWorkspace.startDragMouseY),c=Math.min(c,-b.contentLeft),d=Math.min(d,-b.contentTop),c=Math.max(c,b.viewWidth-b.contentLeft-b.contentWidth),d=Math.max(d,b.viewHeight-b.contentTop-b.contentHeight);Blockly.mainWorkspace.scrollbar.set(-c-
b.contentLeft,-d-b.contentTop);a.stopPropagation()}};
Blockly.onKeyDown_=function(a){if(!Blockly.isTargetInput_(a))if(27==a.keyCode)Blockly.hideChaff();else if(8==a.keyCode||46==a.keyCode)try{Blockly.selected&&Blockly.selected.isDeletable()&&(Blockly.hideChaff(),Blockly.selected.dispose(!0,!0))}finally{a.preventDefault()}else if(a.altKey||a.ctrlKey||a.metaKey)Blockly.selected&&Blockly.selected.isDeletable()&&Blockly.selected.isMovable()&&Blockly.selected.workspace==Blockly.mainWorkspace&&(Blockly.hideChaff(),67==a.keyCode?Blockly.copy_(Blockly.selected):
88==a.keyCode&&(Blockly.copy_(Blockly.selected),Blockly.selected.dispose(!0,!0))),86==a.keyCode&&Blockly.clipboard_&&Blockly.mainWorkspace.paste(Blockly.clipboard_)};Blockly.terminateDrag_=function(){Blockly.Block.terminateDrag_();Blockly.Flyout.terminateDrag_()};Blockly.copy_=function(a){var b=Blockly.Xml.blockToDom_(a);Blockly.Xml.deleteNext(b);a=a.getRelativeToSurfaceXY();b.setAttribute("x",Blockly.RTL?-a.x:a.x);b.setAttribute("y",a.y);Blockly.clipboard_=b};
Blockly.showContextMenu_=function(a){if(!Blockly.readOnly){var b=[];if(Blockly.collapse){for(var c=!1,d=!1,e=Blockly.mainWorkspace.getTopBlocks(!1),f=0;f<e.length;f++)for(var g=e[f];g;)g.isCollapsed()?c=!0:d=!0,g=g.getNextBlock();d={enabled:d};d.text=Blockly.Msg.COLLAPSE_ALL;d.callback=function(){for(var a=0,b=0;b<e.length;b++)for(var c=e[b];c;)setTimeout(c.setCollapsed.bind(c,!0),a),c=c.getNextBlock(),a+=10};b.push(d);c={enabled:c};c.text=Blockly.Msg.EXPAND_ALL;c.callback=function(){for(var a=0,
b=0;b<e.length;b++)for(var c=e[b];c;)setTimeout(c.setCollapsed.bind(c,!1),a),c=c.getNextBlock(),a+=10};b.push(c)}Blockly.ContextMenu.show(a,b)}};Blockly.onContextMenu_=function(a){Blockly.isTargetInput_(a)||a.preventDefault()};Blockly.hideChaff=function(a){Blockly.Tooltip.hide();Blockly.WidgetDiv.hide();!a&&Blockly.Toolbox.flyout_&&Blockly.Toolbox.flyout_.autoClose&&Blockly.Toolbox.clearSelection()};
Blockly.removeAllRanges=function(){if(window.getSelection){var a=window.getSelection();a&&a.removeAllRanges&&(a.removeAllRanges(),window.setTimeout(function(){try{window.getSelection().removeAllRanges()}catch(a){}},0))}};Blockly.isTargetInput_=function(a){return"textarea"==a.target.type||"text"==a.target.type};
Blockly.loadAudio_=function(a,b){if(window.Audio&&a.length){for(var c,d=new window.Audio,e=0;e<a.length;e++){var f=a[e],g=f.match(/\.(\w+)$/);if(g&&d.canPlayType("audio/"+g[1])){c=new window.Audio(Blockly.pathToBlockly+f);break}}c&&c.play&&(Blockly.SOUNDS_[b]=c)}};Blockly.preloadAudio_=function(){for(var a in Blockly.SOUNDS_){var b=Blockly.SOUNDS_[a];b.volume=.01;b.play();b.pause();if(goog.userAgent.IPAD||goog.userAgent.IPHONE)break}};
Blockly.playAudio=function(a,b){var c=Blockly.SOUNDS_[a];c&&(c=goog.userAgent.DOCUMENT_MODE&&9===goog.userAgent.DOCUMENT_MODE||goog.userAgent.IPAD||goog.userAgent.ANDROID?c:c.cloneNode(),c.volume=void 0===b?1:b,c.play())};Blockly.setCursorHand_=function(a){if(!Blockly.readOnly){var b="";a&&(b="url("+Blockly.pathToBlockly+"media/handclosed.cur) 7 3, auto");Blockly.selected&&(Blockly.selected.getSvgRoot().style.cursor=b);Blockly.svg.style.cursor=b}};
Blockly.getMainWorkspaceMetrics_=function(){var a=Blockly.svgSize();a.width-=Blockly.Toolbox.width;var b=a.width-Blockly.Scrollbar.scrollbarThickness,c=a.height-Blockly.Scrollbar.scrollbarThickness;try{var d=Blockly.mainWorkspace.getCanvas().getBBox()}catch(e){return null}if(Blockly.mainWorkspace.scrollbar)var f=Math.min(d.x-b/2,d.x+d.width-b),b=Math.max(d.x+d.width+b/2,d.x+b),g=Math.min(d.y-c/2,d.y+d.height-c),c=Math.max(d.y+d.height+c/2,d.y+c);else f=d.x,b=f+d.width,g=d.y,c=g+d.height;return{viewHeight:a.height,
viewWidth:a.width,contentHeight:c-g,contentWidth:b-f,viewTop:-Blockly.mainWorkspace.scrollY,viewLeft:-Blockly.mainWorkspace.scrollX,contentTop:g,contentLeft:f,absoluteTop:0,absoluteLeft:Blockly.RTL?0:Blockly.Toolbox.width}};
Blockly.setMainWorkspaceMetrics_=function(a){if(!Blockly.mainWorkspace.scrollbar)throw"Attempt to set main workspace scroll without scrollbars.";var b=Blockly.getMainWorkspaceMetrics_();goog.isNumber(a.x)&&(Blockly.mainWorkspace.scrollX=-b.contentWidth*a.x-b.contentLeft);goog.isNumber(a.y)&&(Blockly.mainWorkspace.scrollY=-b.contentHeight*a.y-b.contentTop);a="translate("+(Blockly.mainWorkspace.scrollX+b.absoluteLeft)+","+(Blockly.mainWorkspace.scrollY+b.absoluteTop)+")";Blockly.mainWorkspace.getCanvas().setAttribute("transform",
a);Blockly.mainWorkspace.getBubbleCanvas().setAttribute("transform",a)};Blockly.doCommand=function(a){Blockly.Realtime.isEnabled?Blockly.Realtime.doCommand(a):a()};Blockly.addChangeListener=function(a){return Blockly.bindEvent_(Blockly.mainWorkspace.getCanvas(),"blocklyWorkspaceChange",null,a)};Blockly.removeChangeListener=function(a){Blockly.unbindEvent_(a)};Blockly.getMainWorkspace=function(){return Blockly.mainWorkspace};window.Blockly||(window.Blockly={});window.Blockly.getMainWorkspace=Blockly.getMainWorkspace;
window.Blockly.addChangeListener=Blockly.addChangeListener;window.Blockly.removeChangeListener=Blockly.removeChangeListener;
// Do not edit this file; automatically generated by build.py.
"use strict";


// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Blocks.colour={};Blockly.Blocks.colour_picker={init:function(){this.setHelpUrl(Blockly.Msg.COLOUR_PICKER_HELPURL);this.setColour(20);this.appendDummyInput().appendField(new Blockly.FieldColour("#ff0000"),"COLOUR");this.setOutput(!0,"Colour");this.setTooltip(Blockly.Msg.COLOUR_PICKER_TOOLTIP)}};
Blockly.Blocks.colour_random={init:function(){this.setHelpUrl(Blockly.Msg.COLOUR_RANDOM_HELPURL);this.setColour(20);this.appendDummyInput().appendField(Blockly.Msg.COLOUR_RANDOM_TITLE);this.setOutput(!0,"Colour");this.setTooltip(Blockly.Msg.COLOUR_RANDOM_TOOLTIP)}};
Blockly.Blocks.colour_rgb={init:function(){this.setHelpUrl(Blockly.Msg.COLOUR_RGB_HELPURL);this.setColour(20);this.appendValueInput("RED").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_RGB_TITLE).appendField(Blockly.Msg.COLOUR_RGB_RED);this.appendValueInput("GREEN").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_RGB_GREEN);this.appendValueInput("BLUE").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_RGB_BLUE);
this.setOutput(!0,"Colour");this.setTooltip(Blockly.Msg.COLOUR_RGB_TOOLTIP)}};
Blockly.Blocks.colour_blend={init:function(){this.setHelpUrl(Blockly.Msg.COLOUR_BLEND_HELPURL);this.setColour(20);this.appendValueInput("COLOUR1").setCheck("Colour").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_BLEND_TITLE).appendField(Blockly.Msg.COLOUR_BLEND_COLOUR1);this.appendValueInput("COLOUR2").setCheck("Colour").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_BLEND_COLOUR2);this.appendValueInput("RATIO").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_BLEND_RATIO);this.setOutput(!0,
"Colour");this.setTooltip(Blockly.Msg.COLOUR_BLEND_TOOLTIP)}};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Blocks.lists={};Blockly.Blocks.lists_create_empty={init:function(){this.setHelpUrl(Blockly.Msg.LISTS_CREATE_EMPTY_HELPURL);this.setColour(260);this.setOutput(!0,"Array");this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);this.setTooltip(Blockly.Msg.LISTS_CREATE_EMPTY_TOOLTIP)}};
Blockly.Blocks.lists_create_with={init:function(){this.setColour(260);this.appendValueInput("ADD0").appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);this.appendValueInput("ADD1");this.appendValueInput("ADD2");this.setOutput(!0,"Array");this.setMutator(new Blockly.Mutator(["lists_create_with_item"]));this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);this.itemCount_=3},mutationToDom:function(){var a=document.createElement("mutation");a.setAttribute("items",this.itemCount_);return a},domToMutation:function(a){for(var b=
0;b<this.itemCount_;b++)this.removeInput("ADD"+b);this.itemCount_=parseInt(a.getAttribute("items"),10);for(b=0;b<this.itemCount_;b++)a=this.appendValueInput("ADD"+b),0==b&&a.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);0==this.itemCount_&&this.appendDummyInput("EMPTY").appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE)},decompose:function(a){var b=Blockly.Block.obtain(a,"lists_create_with_container");b.initSvg();for(var c=b.getInput("STACK").connection,d=0;d<this.itemCount_;d++){var e=Blockly.Block.obtain(a,
"lists_create_with_item");e.initSvg();c.connect(e.previousConnection);c=e.nextConnection}return b},compose:function(a){if(0==this.itemCount_)this.removeInput("EMPTY");else for(var b=this.itemCount_-1;0<=b;b--)this.removeInput("ADD"+b);this.itemCount_=0;for(a=a.getInputTargetBlock("STACK");a;)b=this.appendValueInput("ADD"+this.itemCount_),0==this.itemCount_&&b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH),a.valueConnection_&&b.connection.connect(a.valueConnection_),this.itemCount_++,a=a.nextConnection&&
a.nextConnection.targetBlock();0==this.itemCount_&&this.appendDummyInput("EMPTY").appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE)},saveConnections:function(a){a=a.getInputTargetBlock("STACK");for(var b=0;a;){var c=this.getInput("ADD"+b);a.valueConnection_=c&&c.connection.targetConnection;b++;a=a.nextConnection&&a.nextConnection.targetBlock()}}};
Blockly.Blocks.lists_create_with_container={init:function(){this.setColour(260);this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);this.appendStatementInput("STACK");this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);this.contextMenu=!1}};
Blockly.Blocks.lists_create_with_item={init:function(){this.setColour(260);this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);this.setPreviousStatement(!0);this.setNextStatement(!0);this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);this.contextMenu=!1}};
Blockly.Blocks.lists_repeat={init:function(){this.setHelpUrl(Blockly.Msg.LISTS_REPEAT_HELPURL);this.setColour(260);this.setOutput(!0,"Array");this.interpolateMsg(Blockly.Msg.LISTS_REPEAT_TITLE,["ITEM",null,Blockly.ALIGN_RIGHT],["NUM","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setTooltip(Blockly.Msg.LISTS_REPEAT_TOOLTIP)}};
Blockly.Blocks.lists_length={init:function(){this.setHelpUrl(Blockly.Msg.LISTS_LENGTH_HELPURL);this.setColour(260);this.interpolateMsg(Blockly.Msg.LISTS_LENGTH_TITLE,["VALUE",["Array","String"],Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setOutput(!0,"Number");this.setTooltip(Blockly.Msg.LISTS_LENGTH_TOOLTIP)}};
Blockly.Blocks.lists_isEmpty={init:function(){this.setHelpUrl(Blockly.Msg.LISTS_IS_EMPTY_HELPURL);this.setColour(260);this.interpolateMsg(Blockly.Msg.LISTS_IS_EMPTY_TITLE,["VALUE",["Array","String"],Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setInputsInline(!0);this.setOutput(!0,"Boolean");this.setTooltip(Blockly.Msg.LISTS_TOOLTIP)}};
Blockly.Blocks.lists_indexOf={init:function(){var a=[[Blockly.Msg.LISTS_INDEX_OF_FIRST,"FIRST"],[Blockly.Msg.LISTS_INDEX_OF_LAST,"LAST"]];this.setHelpUrl(Blockly.Msg.LISTS_INDEX_OF_HELPURL);this.setColour(260);this.setOutput(!0,"Number");this.appendValueInput("VALUE").setCheck("Array").appendField(Blockly.Msg.LISTS_INDEX_OF_INPUT_IN_LIST);this.appendValueInput("FIND").appendField(new Blockly.FieldDropdown(a),"END");this.setInputsInline(!0);this.setTooltip(Blockly.Msg.LISTS_INDEX_OF_TOOLTIP)}};
Blockly.Blocks.lists_getIndex={init:function(){var a=[[Blockly.Msg.LISTS_GET_INDEX_GET,"GET"],[Blockly.Msg.LISTS_GET_INDEX_GET_REMOVE,"GET_REMOVE"],[Blockly.Msg.LISTS_GET_INDEX_REMOVE,"REMOVE"]];this.WHERE_OPTIONS=[[Blockly.Msg.LISTS_GET_INDEX_FROM_START,"FROM_START"],[Blockly.Msg.LISTS_GET_INDEX_FROM_END,"FROM_END"],[Blockly.Msg.LISTS_GET_INDEX_FIRST,"FIRST"],[Blockly.Msg.LISTS_GET_INDEX_LAST,"LAST"],[Blockly.Msg.LISTS_GET_INDEX_RANDOM,"RANDOM"]];this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
this.setColour(260);a=new Blockly.FieldDropdown(a,function(a){this.sourceBlock_.updateStatement_("REMOVE"==a)});this.appendValueInput("VALUE").setCheck("Array").appendField(Blockly.Msg.LISTS_GET_INDEX_INPUT_IN_LIST);this.appendDummyInput().appendField(a,"MODE").appendField("","SPACE");this.appendDummyInput("AT");Blockly.Msg.LISTS_GET_INDEX_TAIL&&this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);this.setInputsInline(!0);this.setOutput(!0);this.updateAt_(!0);var b=this;this.setTooltip(function(){var a=
b.getFieldValue("MODE")+"_"+b.getFieldValue("WHERE");return Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_"+a]})},mutationToDom:function(){var a=document.createElement("mutation");a.setAttribute("statement",!this.outputConnection);var b=this.getInput("AT").type==Blockly.INPUT_VALUE;a.setAttribute("at",b);return a},domToMutation:function(a){var b="true"==a.getAttribute("statement");this.updateStatement_(b);a="false"!=a.getAttribute("at");this.updateAt_(a)},updateStatement_:function(a){a!=!this.outputConnection&&
(this.unplug(!0,!0),a?(this.setOutput(!1),this.setPreviousStatement(!0),this.setNextStatement(!0)):(this.setPreviousStatement(!1),this.setNextStatement(!1),this.setOutput(!0)))},updateAt_:function(a){this.removeInput("AT");this.removeInput("ORDINAL",!0);a?(this.appendValueInput("AT").setCheck("Number"),Blockly.Msg.ORDINAL_NUMBER_SUFFIX&&this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)):this.appendDummyInput("AT");var b=new Blockly.FieldDropdown(this.WHERE_OPTIONS,function(b){var d=
"FROM_START"==b||"FROM_END"==b;if(d!=a){var e=this.sourceBlock_;e.updateAt_(d);e.setFieldValue(b,"WHERE");return null}});this.getInput("AT").appendField(b,"WHERE");Blockly.Msg.LISTS_GET_INDEX_TAIL&&this.moveInputBefore("TAIL",null)}};
Blockly.Blocks.lists_setIndex={init:function(){var a=[[Blockly.Msg.LISTS_SET_INDEX_SET,"SET"],[Blockly.Msg.LISTS_SET_INDEX_INSERT,"INSERT"]];this.WHERE_OPTIONS=[[Blockly.Msg.LISTS_GET_INDEX_FROM_START,"FROM_START"],[Blockly.Msg.LISTS_GET_INDEX_FROM_END,"FROM_END"],[Blockly.Msg.LISTS_GET_INDEX_FIRST,"FIRST"],[Blockly.Msg.LISTS_GET_INDEX_LAST,"LAST"],[Blockly.Msg.LISTS_GET_INDEX_RANDOM,"RANDOM"]];this.setHelpUrl(Blockly.Msg.LISTS_SET_INDEX_HELPURL);this.setColour(260);this.appendValueInput("LIST").setCheck("Array").appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_IN_LIST);
this.appendDummyInput().appendField(new Blockly.FieldDropdown(a),"MODE").appendField("","SPACE");this.appendDummyInput("AT");this.appendValueInput("TO").appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_TO);this.setInputsInline(!0);this.setPreviousStatement(!0);this.setNextStatement(!0);this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP);this.updateAt_(!0);var b=this;this.setTooltip(function(){var a=b.getFieldValue("MODE")+"_"+b.getFieldValue("WHERE");return Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_"+a]})},
mutationToDom:function(){var a=document.createElement("mutation"),b=this.getInput("AT").type==Blockly.INPUT_VALUE;a.setAttribute("at",b);return a},domToMutation:function(a){a="false"!=a.getAttribute("at");this.updateAt_(a)},updateAt_:function(a){this.removeInput("AT");this.removeInput("ORDINAL",!0);a?(this.appendValueInput("AT").setCheck("Number"),Blockly.Msg.ORDINAL_NUMBER_SUFFIX&&this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)):this.appendDummyInput("AT");var b=new Blockly.FieldDropdown(this.WHERE_OPTIONS,
function(b){var d="FROM_START"==b||"FROM_END"==b;if(d!=a){var e=this.sourceBlock_;e.updateAt_(d);e.setFieldValue(b,"WHERE");return null}});this.moveInputBefore("AT","TO");this.getInput("ORDINAL")&&this.moveInputBefore("ORDINAL","TO");this.getInput("AT").appendField(b,"WHERE")}};
Blockly.Blocks.lists_getSublist={init:function(){this.WHERE_OPTIONS_1=[[Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_START,"FROM_START"],[Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_END,"FROM_END"],[Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST,"FIRST"]];this.WHERE_OPTIONS_2=[[Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START,"FROM_START"],[Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END,"FROM_END"],[Blockly.Msg.LISTS_GET_SUBLIST_END_LAST,"LAST"]];this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);this.setColour(260);
this.appendValueInput("LIST").setCheck("Array").appendField(Blockly.Msg.LISTS_GET_SUBLIST_INPUT_IN_LIST);this.appendDummyInput("AT1");this.appendDummyInput("AT2");Blockly.Msg.LISTS_GET_SUBLIST_TAIL&&this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);this.setInputsInline(!0);this.setOutput(!0,"Array");this.updateAt_(1,!0);this.updateAt_(2,!0);this.setTooltip(Blockly.Msg.LISTS_GET_SUBLIST_TOOLTIP)},mutationToDom:function(){var a=document.createElement("mutation"),b=this.getInput("AT1").type==
Blockly.INPUT_VALUE;a.setAttribute("at1",b);b=this.getInput("AT2").type==Blockly.INPUT_VALUE;a.setAttribute("at2",b);return a},domToMutation:function(a){var b="true"==a.getAttribute("at1");a="true"==a.getAttribute("at2");this.updateAt_(1,b);this.updateAt_(2,a)},updateAt_:function(a,b){this.removeInput("AT"+a);this.removeInput("ORDINAL"+a,!0);b?(this.appendValueInput("AT"+a).setCheck("Number"),Blockly.Msg.ORDINAL_NUMBER_SUFFIX&&this.appendDummyInput("ORDINAL"+a).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)):
this.appendDummyInput("AT"+a);var c=new Blockly.FieldDropdown(this["WHERE_OPTIONS_"+a],function(c){var e="FROM_START"==c||"FROM_END"==c;if(e!=b){var f=this.sourceBlock_;f.updateAt_(a,e);f.setFieldValue(c,"WHERE"+a);return null}});this.getInput("AT"+a).appendField(c,"WHERE"+a);1==a&&(this.moveInputBefore("AT1","AT2"),this.getInput("ORDINAL1")&&this.moveInputBefore("ORDINAL1","AT2"));Blockly.Msg.LISTS_GET_SUBLIST_TAIL&&this.moveInputBefore("TAIL",null)}};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Blocks.logic={};
Blockly.Blocks.controls_if={init:function(){this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);this.setColour(210);this.appendValueInput("IF0").setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);this.appendStatementInput("DO0").appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);this.setPreviousStatement(!0);this.setNextStatement(!0);this.setMutator(new Blockly.Mutator(["controls_if_elseif","controls_if_else"]));var a=this;this.setTooltip(function(){if(a.elseifCount_||a.elseCount_){if(!a.elseifCount_&&
a.elseCount_)return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;if(a.elseifCount_&&!a.elseCount_)return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;if(a.elseifCount_&&a.elseCount_)return Blockly.Msg.CONTROLS_IF_TOOLTIP_4}else return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;return""});this.elseCount_=this.elseifCount_=0},mutationToDom:function(){if(!this.elseifCount_&&!this.elseCount_)return null;var a=document.createElement("mutation");this.elseifCount_&&a.setAttribute("elseif",this.elseifCount_);this.elseCount_&&a.setAttribute("else",
1);return a},domToMutation:function(a){this.elseifCount_=parseInt(a.getAttribute("elseif"),10);this.elseCount_=parseInt(a.getAttribute("else"),10);for(a=1;a<=this.elseifCount_;a++)this.appendValueInput("IF"+a).setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF),this.appendStatementInput("DO"+a).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);this.elseCount_&&this.appendStatementInput("ELSE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)},decompose:function(a){var b=Blockly.Block.obtain(a,
"controls_if_if");b.initSvg();for(var c=b.getInput("STACK").connection,d=1;d<=this.elseifCount_;d++){var e=Blockly.Block.obtain(a,"controls_if_elseif");e.initSvg();c.connect(e.previousConnection);c=e.nextConnection}this.elseCount_&&(a=Blockly.Block.obtain(a,"controls_if_else"),a.initSvg(),c.connect(a.previousConnection));return b},compose:function(a){this.elseCount_&&this.removeInput("ELSE");this.elseCount_=0;for(var b=this.elseifCount_;0<b;b--)this.removeInput("IF"+b),this.removeInput("DO"+b);this.elseifCount_=
0;for(a=a.getInputTargetBlock("STACK");a;){switch(a.type){case "controls_if_elseif":this.elseifCount_++;var b=this.appendValueInput("IF"+this.elseifCount_).setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF),c=this.appendStatementInput("DO"+this.elseifCount_);c.appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);a.valueConnection_&&b.connection.connect(a.valueConnection_);a.statementConnection_&&c.connection.connect(a.statementConnection_);break;case "controls_if_else":this.elseCount_++;
b=this.appendStatementInput("ELSE");b.appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);a.statementConnection_&&b.connection.connect(a.statementConnection_);break;default:throw"Unknown block type.";}a=a.nextConnection&&a.nextConnection.targetBlock()}},saveConnections:function(a){a=a.getInputTargetBlock("STACK");for(var b=1;a;){switch(a.type){case "controls_if_elseif":var c=this.getInput("IF"+b),d=this.getInput("DO"+b);a.valueConnection_=c&&c.connection.targetConnection;a.statementConnection_=d&&d.connection.targetConnection;
b++;break;case "controls_if_else":d=this.getInput("ELSE");a.statementConnection_=d&&d.connection.targetConnection;break;default:throw"Unknown block type.";}a=a.nextConnection&&a.nextConnection.targetBlock()}}};Blockly.Blocks.controls_if_if={init:function(){this.setColour(210);this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);this.appendStatementInput("STACK");this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);this.contextMenu=!1}};
Blockly.Blocks.controls_if_elseif={init:function(){this.setColour(210);this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);this.setPreviousStatement(!0);this.setNextStatement(!0);this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);this.contextMenu=!1}};
Blockly.Blocks.controls_if_else={init:function(){this.setColour(210);this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);this.setPreviousStatement(!0);this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);this.contextMenu=!1}};
Blockly.Blocks.logic_compare={init:function(){var a=Blockly.RTL?[["=","EQ"],["\u2260","NEQ"],[">","LT"],["\u2265","LTE"],["<","GT"],["\u2264","GTE"]]:[["=","EQ"],["\u2260","NEQ"],["<","LT"],["\u2264","LTE"],[">","GT"],["\u2265","GTE"]];this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);this.setColour(210);this.setOutput(!0,"Boolean");this.appendValueInput("A");this.appendValueInput("B").appendField(new Blockly.FieldDropdown(a),"OP");this.setInputsInline(!0);var b=this;this.setTooltip(function(){var a=
b.getFieldValue("OP");return{EQ:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,NEQ:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,LT:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,LTE:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,GT:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,GTE:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE}[a]})}};
Blockly.Blocks.logic_operation={init:function(){var a=[[Blockly.Msg.LOGIC_OPERATION_AND,"AND"],[Blockly.Msg.LOGIC_OPERATION_OR,"OR"]];this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);this.setColour(210);this.setOutput(!0,"Boolean");this.appendValueInput("A").setCheck("Boolean");this.appendValueInput("B").setCheck("Boolean").appendField(new Blockly.FieldDropdown(a),"OP");this.setInputsInline(!0);var b=this;this.setTooltip(function(){var a=b.getFieldValue("OP");return{AND:Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
OR:Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR}[a]})}};Blockly.Blocks.logic_negate={init:function(){this.setHelpUrl(Blockly.Msg.LOGIC_NEGATE_HELPURL);this.setColour(210);this.setOutput(!0,"Boolean");this.interpolateMsg(Blockly.Msg.LOGIC_NEGATE_TITLE,["BOOL","Boolean",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP)}};
Blockly.Blocks.logic_boolean={init:function(){var a=[[Blockly.Msg.LOGIC_BOOLEAN_TRUE,"TRUE"],[Blockly.Msg.LOGIC_BOOLEAN_FALSE,"FALSE"]];this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);this.setColour(210);this.setOutput(!0,"Boolean");this.appendDummyInput().appendField(new Blockly.FieldDropdown(a),"BOOL");this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP)}};
Blockly.Blocks.logic_null={init:function(){this.setHelpUrl(Blockly.Msg.LOGIC_NULL_HELPURL);this.setColour(210);this.setOutput(!0);this.appendDummyInput().appendField(Blockly.Msg.LOGIC_NULL);this.setTooltip(Blockly.Msg.LOGIC_NULL_TOOLTIP)}};
Blockly.Blocks.logic_ternary={init:function(){this.setHelpUrl(Blockly.Msg.LOGIC_TERNARY_HELPURL);this.setColour(210);this.appendValueInput("IF").setCheck("Boolean").appendField(Blockly.Msg.LOGIC_TERNARY_CONDITION);this.appendValueInput("THEN").appendField(Blockly.Msg.LOGIC_TERNARY_IF_TRUE);this.appendValueInput("ELSE").appendField(Blockly.Msg.LOGIC_TERNARY_IF_FALSE);this.setOutput(!0);this.setTooltip(Blockly.Msg.LOGIC_TERNARY_TOOLTIP)}};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Blocks.loops={};
Blockly.Blocks.controls_repeat={init:function(){this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);this.setColour(120);this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT).appendField(new Blockly.FieldTextInput("10",Blockly.FieldTextInput.nonnegativeIntegerValidator),"TIMES").appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_TIMES);this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);this.setPreviousStatement(!0);this.setNextStatement(!0);this.setTooltip(Blockly.Msg.CONTROLS_REPEAT_TOOLTIP)}};
Blockly.Blocks.controls_repeat_ext={init:function(){this.setHelpUrl(Blockly.Msg.CONTROLS_REPEAT_HELPURL);this.setColour(120);this.interpolateMsg(Blockly.Msg.CONTROLS_REPEAT_TITLE,["TIMES","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);this.setPreviousStatement(!0);this.setNextStatement(!0);this.setInputsInline(!0);this.setTooltip(Blockly.Msg.CONTROLS_REPEAT_TOOLTIP)}};
Blockly.Blocks.controls_whileUntil={init:function(){var a=[[Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE,"WHILE"],[Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL,"UNTIL"]];this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);this.setColour(120);this.appendValueInput("BOOL").setCheck("Boolean").appendField(new Blockly.FieldDropdown(a),"MODE");this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);this.setPreviousStatement(!0);this.setNextStatement(!0);var b=this;
this.setTooltip(function(){var a=b.getFieldValue("MODE");return{WHILE:Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,UNTIL:Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL}[a]})}};
Blockly.Blocks.controls_for={init:function(){this.setHelpUrl(Blockly.Msg.CONTROLS_FOR_HELPURL);this.setColour(120);this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH).appendField(new Blockly.FieldVariable(null),"VAR");this.interpolateMsg(Blockly.Msg.CONTROLS_FOR_INPUT_FROM_TO_BY,["FROM","Number",Blockly.ALIGN_RIGHT],["TO","Number",Blockly.ALIGN_RIGHT],["BY","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_FOR_INPUT_DO);
this.setPreviousStatement(!0);this.setNextStatement(!0);this.setInputsInline(!0);var a=this;this.setTooltip(function(){return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace("%1",a.getFieldValue("VAR"))})},getVars:function(){return[this.getFieldValue("VAR")]},renameVar:function(a,b){Blockly.Names.equals(a,this.getFieldValue("VAR"))&&this.setFieldValue(b,"VAR")},customContextMenu:function(a){if(!this.isCollapsed()){var b={enabled:!0},c=this.getFieldValue("VAR");b.text=Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1",
c);c=goog.dom.createDom("field",null,c);c.setAttribute("name","VAR");c=goog.dom.createDom("block",null,c);c.setAttribute("type","variables_get");b.callback=Blockly.ContextMenu.callbackFactory(this,c);a.push(b)}}};
Blockly.Blocks.controls_forEach={init:function(){this.setHelpUrl(Blockly.Msg.CONTROLS_FOREACH_HELPURL);this.setColour(120);this.appendValueInput("LIST").setCheck("Array").appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_ITEM).appendField(new Blockly.FieldVariable(null),"VAR").appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST);Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL&&(this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL),this.setInputsInline(!0));this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_DO);
this.setPreviousStatement(!0);this.setNextStatement(!0);var a=this;this.setTooltip(function(){return Blockly.Msg.CONTROLS_FOREACH_TOOLTIP.replace("%1",a.getFieldValue("VAR"))})},getVars:function(){return[this.getFieldValue("VAR")]},renameVar:function(a,b){Blockly.Names.equals(a,this.getFieldValue("VAR"))&&this.setFieldValue(b,"VAR")},customContextMenu:Blockly.Blocks.controls_for.customContextMenu};
Blockly.Blocks.controls_flow_statements={init:function(){var a=[[Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK,"BREAK"],[Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE,"CONTINUE"]];this.setHelpUrl(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_HELPURL);this.setColour(120);this.appendDummyInput().appendField(new Blockly.FieldDropdown(a),"FLOW");this.setPreviousStatement(!0);var b=this;this.setTooltip(function(){var a=b.getFieldValue("FLOW");return{BREAK:Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
CONTINUE:Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE}[a]})},onchange:function(){if(this.workspace){var a=!1,b=this;do{if("controls_repeat"==b.type||"controls_repeat_ext"==b.type||"controls_forEach"==b.type||"controls_for"==b.type||"controls_whileUntil"==b.type){a=!0;break}b=b.getSurroundParent()}while(b);a?this.setWarningText(null):this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING)}}};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Blocks.math={};Blockly.Blocks.math_number={init:function(){this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);this.setColour(230);this.appendDummyInput().appendField(new Blockly.FieldTextInput("0",Blockly.FieldTextInput.numberValidator),"NUM");this.setOutput(!0,"Number");this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP)}};
Blockly.Blocks.math_arithmetic={init:function(){var a=[[Blockly.Msg.MATH_ADDITION_SYMBOL,"ADD"],[Blockly.Msg.MATH_SUBTRACTION_SYMBOL,"MINUS"],[Blockly.Msg.MATH_MULTIPLICATION_SYMBOL,"MULTIPLY"],[Blockly.Msg.MATH_DIVISION_SYMBOL,"DIVIDE"],[Blockly.Msg.MATH_POWER_SYMBOL,"POWER"]];this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);this.setColour(230);this.setOutput(!0,"Number");this.appendValueInput("A").setCheck("Number");this.appendValueInput("B").setCheck("Number").appendField(new Blockly.FieldDropdown(a),
"OP");this.setInputsInline(!0);var b=this;this.setTooltip(function(){var a=b.getFieldValue("OP");return{ADD:Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,MINUS:Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,MULTIPLY:Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,DIVIDE:Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,POWER:Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER}[a]})}};
Blockly.Blocks.math_single={init:function(){var a=[[Blockly.Msg.MATH_SINGLE_OP_ROOT,"ROOT"],[Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE,"ABS"],["-","NEG"],["ln","LN"],["log10","LOG10"],["e^","EXP"],["10^","POW10"]];this.setHelpUrl(Blockly.Msg.MATH_SINGLE_HELPURL);this.setColour(230);this.setOutput(!0,"Number");this.interpolateMsg("%1 %2",["OP",new Blockly.FieldDropdown(a)],["NUM","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);var b=this;this.setTooltip(function(){var a=b.getFieldValue("OP");return{ROOT:Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,
ABS:Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,NEG:Blockly.Msg.MATH_SINGLE_TOOLTIP_NEG,LN:Blockly.Msg.MATH_SINGLE_TOOLTIP_LN,LOG10:Blockly.Msg.MATH_SINGLE_TOOLTIP_LOG10,EXP:Blockly.Msg.MATH_SINGLE_TOOLTIP_EXP,POW10:Blockly.Msg.MATH_SINGLE_TOOLTIP_POW10}[a]})}};
Blockly.Blocks.math_trig={init:function(){var a=[[Blockly.Msg.MATH_TRIG_SIN,"SIN"],[Blockly.Msg.MATH_TRIG_COS,"COS"],[Blockly.Msg.MATH_TRIG_TAN,"TAN"],[Blockly.Msg.MATH_TRIG_ASIN,"ASIN"],[Blockly.Msg.MATH_TRIG_ACOS,"ACOS"],[Blockly.Msg.MATH_TRIG_ATAN,"ATAN"]];this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);this.setColour(230);this.setOutput(!0,"Number");this.appendValueInput("NUM").setCheck("Number").appendField(new Blockly.FieldDropdown(a),"OP");var b=this;this.setTooltip(function(){var a=b.getFieldValue("OP");
return{SIN:Blockly.Msg.MATH_TRIG_TOOLTIP_SIN,COS:Blockly.Msg.MATH_TRIG_TOOLTIP_COS,TAN:Blockly.Msg.MATH_TRIG_TOOLTIP_TAN,ASIN:Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN,ACOS:Blockly.Msg.MATH_TRIG_TOOLTIP_ACOS,ATAN:Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN}[a]})}};
Blockly.Blocks.math_constant={init:function(){this.setHelpUrl(Blockly.Msg.MATH_CONSTANT_HELPURL);this.setColour(230);this.setOutput(!0,"Number");this.appendDummyInput().appendField(new Blockly.FieldDropdown([["\u03c0","PI"],["e","E"],["\u03c6","GOLDEN_RATIO"],["sqrt(2)","SQRT2"],["sqrt(\u00bd)","SQRT1_2"],["\u221e","INFINITY"]]),"CONSTANT");this.setTooltip(Blockly.Msg.MATH_CONSTANT_TOOLTIP)}};
Blockly.Blocks.math_number_property={init:function(){var a=[[Blockly.Msg.MATH_IS_EVEN,"EVEN"],[Blockly.Msg.MATH_IS_ODD,"ODD"],[Blockly.Msg.MATH_IS_PRIME,"PRIME"],[Blockly.Msg.MATH_IS_WHOLE,"WHOLE"],[Blockly.Msg.MATH_IS_POSITIVE,"POSITIVE"],[Blockly.Msg.MATH_IS_NEGATIVE,"NEGATIVE"],[Blockly.Msg.MATH_IS_DIVISIBLE_BY,"DIVISIBLE_BY"]];this.setColour(230);this.appendValueInput("NUMBER_TO_CHECK").setCheck("Number");a=new Blockly.FieldDropdown(a,function(a){this.sourceBlock_.updateShape_("DIVISIBLE_BY"==
a)});this.appendDummyInput().appendField(a,"PROPERTY");this.setInputsInline(!0);this.setOutput(!0,"Boolean");this.setTooltip(Blockly.Msg.MATH_IS_TOOLTIP)},mutationToDom:function(){var a=document.createElement("mutation"),b="DIVISIBLE_BY"==this.getFieldValue("PROPERTY");a.setAttribute("divisor_input",b);return a},domToMutation:function(a){a="true"==a.getAttribute("divisor_input");this.updateShape_(a)},updateShape_:function(a){var b=this.getInput("DIVISOR");a?b||this.appendValueInput("DIVISOR").setCheck("Number"):
b&&this.removeInput("DIVISOR")}};
Blockly.Blocks.math_change={init:function(){this.setHelpUrl(Blockly.Msg.MATH_CHANGE_HELPURL);this.setColour(230);this.interpolateMsg(Blockly.Msg.MATH_CHANGE_TITLE_CHANGE+" %1 "+Blockly.Msg.MATH_CHANGE_INPUT_BY+" %2",["VAR",new Blockly.FieldVariable(Blockly.Msg.MATH_CHANGE_TITLE_ITEM)],["DELTA","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setPreviousStatement(!0);this.setNextStatement(!0);var a=this;this.setTooltip(function(){return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace("%1",a.getFieldValue("VAR"))})},
getVars:function(){return[this.getFieldValue("VAR")]},renameVar:function(a,b){Blockly.Names.equals(a,this.getFieldValue("VAR"))&&this.setFieldValue(b,"VAR")}};
Blockly.Blocks.math_round={init:function(){var a=[[Blockly.Msg.MATH_ROUND_OPERATOR_ROUND,"ROUND"],[Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDUP,"ROUNDUP"],[Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDDOWN,"ROUNDDOWN"]];this.setHelpUrl(Blockly.Msg.MATH_ROUND_HELPURL);this.setColour(230);this.setOutput(!0,"Number");this.appendValueInput("NUM").setCheck("Number").appendField(new Blockly.FieldDropdown(a),"OP");this.setTooltip(Blockly.Msg.MATH_ROUND_TOOLTIP)}};
Blockly.Blocks.math_on_list={init:function(){var a=[[Blockly.Msg.MATH_ONLIST_OPERATOR_SUM,"SUM"],[Blockly.Msg.MATH_ONLIST_OPERATOR_MIN,"MIN"],[Blockly.Msg.MATH_ONLIST_OPERATOR_MAX,"MAX"],[Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE,"AVERAGE"],[Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN,"MEDIAN"],[Blockly.Msg.MATH_ONLIST_OPERATOR_MODE,"MODE"],[Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV,"STD_DEV"],[Blockly.Msg.MATH_ONLIST_OPERATOR_RANDOM,"RANDOM"]],b=this;this.setHelpUrl(Blockly.Msg.MATH_ONLIST_HELPURL);this.setColour(230);
this.setOutput(!0,"Number");a=new Blockly.FieldDropdown(a,function(a){"MODE"==a?b.outputConnection.setCheck("Array"):b.outputConnection.setCheck("Number")});this.appendValueInput("LIST").setCheck("Array").appendField(a,"OP");this.setTooltip(function(){var a=b.getFieldValue("OP");return{SUM:Blockly.Msg.MATH_ONLIST_TOOLTIP_SUM,MIN:Blockly.Msg.MATH_ONLIST_TOOLTIP_MIN,MAX:Blockly.Msg.MATH_ONLIST_TOOLTIP_MAX,AVERAGE:Blockly.Msg.MATH_ONLIST_TOOLTIP_AVERAGE,MEDIAN:Blockly.Msg.MATH_ONLIST_TOOLTIP_MEDIAN,
MODE:Blockly.Msg.MATH_ONLIST_TOOLTIP_MODE,STD_DEV:Blockly.Msg.MATH_ONLIST_TOOLTIP_STD_DEV,RANDOM:Blockly.Msg.MATH_ONLIST_TOOLTIP_RANDOM}[a]})}};Blockly.Blocks.math_modulo={init:function(){this.setHelpUrl(Blockly.Msg.MATH_MODULO_HELPURL);this.setColour(230);this.setOutput(!0,"Number");this.interpolateMsg(Blockly.Msg.MATH_MODULO_TITLE,["DIVIDEND","Number",Blockly.ALIGN_RIGHT],["DIVISOR","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setInputsInline(!0);this.setTooltip(Blockly.Msg.MATH_MODULO_TOOLTIP)}};
Blockly.Blocks.math_constrain={init:function(){this.setHelpUrl(Blockly.Msg.MATH_CONSTRAIN_HELPURL);this.setColour(230);this.setOutput(!0,"Number");this.interpolateMsg(Blockly.Msg.MATH_CONSTRAIN_TITLE,["VALUE","Number",Blockly.ALIGN_RIGHT],["LOW","Number",Blockly.ALIGN_RIGHT],["HIGH","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setInputsInline(!0);this.setTooltip(Blockly.Msg.MATH_CONSTRAIN_TOOLTIP)}};
Blockly.Blocks.math_random_int={init:function(){this.setHelpUrl(Blockly.Msg.MATH_RANDOM_INT_HELPURL);this.setColour(230);this.setOutput(!0,"Number");this.interpolateMsg(Blockly.Msg.MATH_RANDOM_INT_TITLE,["FROM","Number",Blockly.ALIGN_RIGHT],["TO","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setInputsInline(!0);this.setTooltip(Blockly.Msg.MATH_RANDOM_INT_TOOLTIP)}};
Blockly.Blocks.math_random_float={init:function(){this.setHelpUrl(Blockly.Msg.MATH_RANDOM_FLOAT_HELPURL);this.setColour(230);this.setOutput(!0,"Number");this.appendDummyInput().appendField(Blockly.Msg.MATH_RANDOM_FLOAT_TITLE_RANDOM);this.setTooltip(Blockly.Msg.MATH_RANDOM_FLOAT_TOOLTIP)}};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Blocks.procedures={};
Blockly.Blocks.procedures_defnoreturn={init:function(){this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);this.setColour(290);var a=Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE,this);this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE).appendField(new Blockly.FieldTextInput(a,Blockly.Procedures.rename),"NAME").appendField("","PARAMS");this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);this.arguments_=
[];this.setStatements_(!0);this.statementConnection_=null},setStatements_:function(a){this.hasStatements_!==a&&(a?(this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO),this.getInput("RETURN")&&this.moveInputBefore("STACK","RETURN")):this.removeInput("STACK",!0),this.hasStatements_=a)},updateParams_:function(){for(var a=!1,b={},c=0;c<this.arguments_.length;c++){if(b["arg_"+this.arguments_[c].toLowerCase()]){a=!0;break}b["arg_"+this.arguments_[c].toLowerCase()]=!0}a?
this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING):this.setWarningText(null);a="";this.arguments_.length&&(a=Blockly.Msg.PROCEDURES_BEFORE_PARAMS+" "+this.arguments_.join(", "));this.setFieldValue(a,"PARAMS")},mutationToDom:function(){for(var a=document.createElement("mutation"),b=0;b<this.arguments_.length;b++){var c=document.createElement("arg");c.setAttribute("name",this.arguments_[b]);a.appendChild(c)}this.hasStatements_||a.setAttribute("statements","false");return a},domToMutation:function(a){this.arguments_=
[];for(var b=0,c;c=a.childNodes[b];b++)"arg"==c.nodeName.toLowerCase()&&this.arguments_.push(c.getAttribute("name"));this.updateParams_();this.setStatements_("false"!==a.getAttribute("statements"))},decompose:function(a){var b=Blockly.Block.obtain(a,"procedures_mutatorcontainer");b.initSvg();this.getInput("RETURN")?b.setFieldValue(this.hasStatements_?"TRUE":"FALSE","STATEMENTS"):b.getInput("STATEMENT_INPUT").setVisible(!1);for(var c=b.getInput("STACK").connection,d=0;d<this.arguments_.length;d++){var e=
Blockly.Block.obtain(a,"procedures_mutatorarg");e.initSvg();e.setFieldValue(this.arguments_[d],"NAME");e.oldLocation=d;c.connect(e.previousConnection);c=e.nextConnection}Blockly.Procedures.mutateCallers(this.getFieldValue("NAME"),this.workspace,this.arguments_,null);return b},compose:function(a){this.arguments_=[];this.paramIds_=[];for(var b=a.getInputTargetBlock("STACK");b;)this.arguments_.push(b.getFieldValue("NAME")),this.paramIds_.push(b.id),b=b.nextConnection&&b.nextConnection.targetBlock();
this.updateParams_();Blockly.Procedures.mutateCallers(this.getFieldValue("NAME"),this.workspace,this.arguments_,this.paramIds_);a=a.getFieldValue("STATEMENTS");if(null!==a&&(a="TRUE"==a,this.hasStatements_!=a))if(a)this.setStatements_(!0),a=this.getInput("STACK").connection,a.targetConnection||!this.statementConnection_||this.statementConnection_.targetConnection||this.statementConnection_.sourceBlock_.workspace!=this.workspace?this.statementConnection_=null:a.connect(this.statementConnection_);else{a=
this.getInput("STACK").connection;if(this.statementConnection_=a.targetConnection)a=a.targetBlock(),a.setParent(null),a.bumpNeighbours_();this.setStatements_(!1)}},dispose:function(){var a=this.getFieldValue("NAME");Blockly.Procedures.disposeCallers(a,this.workspace);Blockly.Block.prototype.dispose.apply(this,arguments)},getProcedureDef:function(){return[this.getFieldValue("NAME"),this.arguments_,!1]},getVars:function(){return this.arguments_},renameVar:function(a,b){for(var c=!1,d=0;d<this.arguments_.length;d++)Blockly.Names.equals(a,
this.arguments_[d])&&(this.arguments_[d]=b,c=!0);if(c&&(this.updateParams_(),this.mutator.isVisible_()))for(var c=this.mutator.workspace_.getAllBlocks(),d=0,e;e=c[d];d++)"procedures_mutatorarg"==e.type&&Blockly.Names.equals(a,e.getFieldValue("NAME"))&&e.setFieldValue(b,"NAME")},customContextMenu:function(a){var b={enabled:!0},c=this.getFieldValue("NAME");b.text=Blockly.Msg.PROCEDURES_CREATE_DO.replace("%1",c);var d=goog.dom.createDom("mutation");d.setAttribute("name",c);for(var e=0;e<this.arguments_.length;e++)c=
goog.dom.createDom("arg"),c.setAttribute("name",this.arguments_[e]),d.appendChild(c);d=goog.dom.createDom("block",null,d);d.setAttribute("type",this.callType_);b.callback=Blockly.ContextMenu.callbackFactory(this,d);a.push(b);if(!this.isCollapsed())for(e=0;e<this.arguments_.length;e++)b={enabled:!0},c=this.arguments_[e],b.text=Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1",c),d=goog.dom.createDom("field",null,c),d.setAttribute("name","VAR"),d=goog.dom.createDom("block",null,d),d.setAttribute("type",
"variables_get"),b.callback=Blockly.ContextMenu.callbackFactory(this,d),a.push(b)},callType_:"procedures_callnoreturn"};
Blockly.Blocks.procedures_defreturn={init:function(){this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);this.setColour(290);var a=Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE,this);this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE).appendField(new Blockly.FieldTextInput(a,Blockly.Procedures.rename),"NAME").appendField("","PARAMS");this.appendValueInput("RETURN").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);this.arguments_=[];this.setStatements_(!0);this.statementConnection_=null},setStatements_:Blockly.Blocks.procedures_defnoreturn.setStatements_,updateParams_:Blockly.Blocks.procedures_defnoreturn.updateParams_,mutationToDom:Blockly.Blocks.procedures_defnoreturn.mutationToDom,domToMutation:Blockly.Blocks.procedures_defnoreturn.domToMutation,decompose:Blockly.Blocks.procedures_defnoreturn.decompose,
compose:Blockly.Blocks.procedures_defnoreturn.compose,dispose:Blockly.Blocks.procedures_defnoreturn.dispose,getProcedureDef:function(){return[this.getFieldValue("NAME"),this.arguments_,!0]},getVars:Blockly.Blocks.procedures_defnoreturn.getVars,renameVar:Blockly.Blocks.procedures_defnoreturn.renameVar,customContextMenu:Blockly.Blocks.procedures_defnoreturn.customContextMenu,callType_:"procedures_callreturn"};
Blockly.Blocks.procedures_mutatorcontainer={init:function(){this.setColour(290);this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);this.appendStatementInput("STACK");this.appendDummyInput("STATEMENT_INPUT").appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS).appendField(new Blockly.FieldCheckbox("TRUE"),"STATEMENTS");this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);this.contextMenu=!1}};
Blockly.Blocks.procedures_mutatorarg={init:function(){this.setColour(290);this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE).appendField(new Blockly.FieldTextInput("x",this.validator_),"NAME");this.setPreviousStatement(!0);this.setNextStatement(!0);this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);this.contextMenu=!1},validator_:function(a){return(a=a.replace(/[\s\xa0]+/g," ").replace(/^ | $/g,""))||null}};
Blockly.Blocks.procedures_callnoreturn={init:function(){this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);this.setColour(290);this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALLNORETURN_CALL).appendField("","NAME").appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS,"WITH");this.setPreviousStatement(!0);this.setNextStatement(!0);this.arguments_=[];this.quarkArguments_=this.quarkConnections_=null},getProcedureCall:function(){return this.getFieldValue("NAME")},renameProcedure:function(a,
b){Blockly.Names.equals(a,this.getProcedureCall())&&(this.setFieldValue(b,"NAME"),this.setTooltip((this.outputConnection?Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP:Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace("%1",b)))},setProcedureParameters:function(a,b){if(b){if(b.length!=a.length)throw"Error: paramNames and paramIds must be the same length.";this.quarkArguments_||(this.quarkConnections_={},a.join("\n")==this.arguments_.join("\n")?this.quarkArguments_=b:this.quarkArguments_=[]);var c=this.rendered;
this.rendered=!1;for(var d=this.arguments_.length-1;0<=d;d--){var e=this.getInput("ARG"+d);if(e){var f=e.connection.targetConnection;this.quarkConnections_[this.quarkArguments_[d]]=f;this.removeInput("ARG"+d)}}this.arguments_=[].concat(a);this.quarkArguments_=b;for(d=0;d<this.arguments_.length;d++)if(e=this.appendValueInput("ARG"+d).setAlign(Blockly.ALIGN_RIGHT).appendField(this.arguments_[d]),this.quarkArguments_){var g=this.quarkArguments_[d];g in this.quarkConnections_&&(f=this.quarkConnections_[g],
!f||f.targetConnection||f.sourceBlock_.workspace!=this.workspace?delete this.quarkConnections_[g]:e.connection.connect(f))}this.getField_("WITH").setVisible(!!this.arguments_.length);(this.rendered=c)&&this.render()}else this.quarkConnections_={},this.quarkArguments_=null},mutationToDom:function(){var a=document.createElement("mutation");a.setAttribute("name",this.getProcedureCall());for(var b=0;b<this.arguments_.length;b++){var c=document.createElement("arg");c.setAttribute("name",this.arguments_[b]);
a.appendChild(c)}return a},domToMutation:function(a){var b=a.getAttribute("name");this.setFieldValue(b,"NAME");this.setTooltip((this.outputConnection?Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP:Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace("%1",b));if((b=Blockly.Procedures.getDefinition(b,this.workspace))&&b.mutator.isVisible())this.setProcedureParameters(b.arguments_,b.paramIds_);else{this.arguments_=[];for(var b=0,c;c=a.childNodes[b];b++)"arg"==c.nodeName.toLowerCase()&&this.arguments_.push(c.getAttribute("name"));
this.setProcedureParameters(this.arguments_,this.arguments_)}},renameVar:function(a,b){for(var c=0;c<this.arguments_.length;c++)Blockly.Names.equals(a,this.arguments_[c])&&(this.arguments_[c]=b,this.getInput("ARG"+c).fieldRow[0].setText(b))},customContextMenu:function(a){var b={enabled:!0};b.text=Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;var c=this.getProcedureCall(),d=this.workspace;b.callback=function(){var a=Blockly.Procedures.getDefinition(c,d);a&&a.select()};a.push(b)}};
Blockly.Blocks.procedures_callreturn={init:function(){this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);this.setColour(290);this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALLRETURN_CALL).appendField("","NAME").appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS,"WITH");this.setOutput(!0);this.arguments_=[];this.quarkArguments_=this.quarkConnections_=null},getProcedureCall:Blockly.Blocks.procedures_callnoreturn.getProcedureCall,renameProcedure:Blockly.Blocks.procedures_callnoreturn.renameProcedure,
setProcedureParameters:Blockly.Blocks.procedures_callnoreturn.setProcedureParameters,mutationToDom:Blockly.Blocks.procedures_callnoreturn.mutationToDom,domToMutation:Blockly.Blocks.procedures_callnoreturn.domToMutation,renameVar:Blockly.Blocks.procedures_callnoreturn.renameVar,customContextMenu:Blockly.Blocks.procedures_callnoreturn.customContextMenu};
Blockly.Blocks.procedures_ifreturn={init:function(){this.setHelpUrl("http://c2.com/cgi/wiki?GuardClause");this.setColour(290);this.appendValueInput("CONDITION").setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);this.setInputsInline(!0);this.setPreviousStatement(!0);this.setNextStatement(!0);this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);this.hasReturnValue_=!0},mutationToDom:function(){var a=
document.createElement("mutation");a.setAttribute("value",Number(this.hasReturnValue_));return a},domToMutation:function(a){this.hasReturnValue_=1==a.getAttribute("value");this.hasReturnValue_||(this.removeInput("VALUE"),this.appendDummyInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN))},onchange:function(){if(this.workspace){var a=!1,b=this;do{if("procedures_defnoreturn"==b.type||"procedures_defreturn"==b.type){a=!0;break}b=b.getSurroundParent()}while(b);a?("procedures_defnoreturn"==
b.type&&this.hasReturnValue_?(this.removeInput("VALUE"),this.appendDummyInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN),this.hasReturnValue_=!1):"procedures_defreturn"!=b.type||this.hasReturnValue_||(this.removeInput("VALUE"),this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN),this.hasReturnValue_=!0),this.setWarningText(null)):this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING)}}};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Blocks.text={};Blockly.Blocks.text={init:function(){this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);this.setColour(160);this.appendDummyInput().appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""),"TEXT").appendField(this.newQuote_(!1));this.setOutput(!0,"String");this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP)},newQuote_:function(a){return new Blockly.FieldImage(Blockly.pathToBlockly+"media/"+(a==Blockly.RTL?"quote1.png":"quote0.png"),12,12,'"')}};
Blockly.Blocks.text_join={init:function(){this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);this.setColour(160);this.appendValueInput("ADD0").appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH);this.appendValueInput("ADD1");this.setOutput(!0,"String");this.setMutator(new Blockly.Mutator(["text_create_join_item"]));this.setTooltip(Blockly.Msg.TEXT_JOIN_TOOLTIP);this.itemCount_=2},mutationToDom:function(){var a=document.createElement("mutation");a.setAttribute("items",this.itemCount_);return a},domToMutation:function(a){for(var b=
0;b<this.itemCount_;b++)this.removeInput("ADD"+b);this.itemCount_=parseInt(a.getAttribute("items"),10);for(b=0;b<this.itemCount_;b++)a=this.appendValueInput("ADD"+b),0==b&&a.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH);0==this.itemCount_&&this.appendDummyInput("EMPTY").appendField(new Blockly.FieldImage(Blockly.pathToBlockly+"media/quote0.png",12,12,'"')).appendField(new Blockly.FieldImage(Blockly.pathToBlockly+"media/quote1.png",12,12,'"'))},decompose:function(a){var b=Blockly.Block.obtain(a,
"text_create_join_container");b.initSvg();for(var c=b.getInput("STACK").connection,d=0;d<this.itemCount_;d++){var e=Blockly.Block.obtain(a,"text_create_join_item");e.initSvg();c.connect(e.previousConnection);c=e.nextConnection}return b},compose:function(a){if(0==this.itemCount_)this.removeInput("EMPTY");else for(var b=this.itemCount_-1;0<=b;b--)this.removeInput("ADD"+b);this.itemCount_=0;for(a=a.getInputTargetBlock("STACK");a;)b=this.appendValueInput("ADD"+this.itemCount_),0==this.itemCount_&&b.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH),
a.valueConnection_&&b.connection.connect(a.valueConnection_),this.itemCount_++,a=a.nextConnection&&a.nextConnection.targetBlock();0==this.itemCount_&&this.appendDummyInput("EMPTY").appendField(new Blockly.FieldImage(Blockly.pathToBlockly+"media/quote0.png",12,12,'"')).appendField(new Blockly.FieldImage(Blockly.pathToBlockly+"media/quote1.png",12,12,'"'))},saveConnections:function(a){a=a.getInputTargetBlock("STACK");for(var b=0;a;){var c=this.getInput("ADD"+b);a.valueConnection_=c&&c.connection.targetConnection;
b++;a=a.nextConnection&&a.nextConnection.targetBlock()}}};Blockly.Blocks.text_create_join_container={init:function(){this.setColour(160);this.appendDummyInput().appendField(Blockly.Msg.TEXT_CREATE_JOIN_TITLE_JOIN);this.appendStatementInput("STACK");this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);this.contextMenu=!1}};
Blockly.Blocks.text_create_join_item={init:function(){this.setColour(160);this.appendDummyInput().appendField(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);this.setPreviousStatement(!0);this.setNextStatement(!0);this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TOOLTIP);this.contextMenu=!1}};
Blockly.Blocks.text_append={init:function(){this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);this.setColour(160);this.appendValueInput("TEXT").appendField(Blockly.Msg.TEXT_APPEND_TO).appendField(new Blockly.FieldVariable(Blockly.Msg.TEXT_APPEND_VARIABLE),"VAR").appendField(Blockly.Msg.TEXT_APPEND_APPENDTEXT);this.setPreviousStatement(!0);this.setNextStatement(!0);var a=this;this.setTooltip(function(){return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace("%1",a.getFieldValue("VAR"))})},getVars:function(){return[this.getFieldValue("VAR")]},
renameVar:function(a,b){Blockly.Names.equals(a,this.getFieldValue("VAR"))&&this.setFieldValue(b,"VAR")}};Blockly.Blocks.text_length={init:function(){this.setHelpUrl(Blockly.Msg.TEXT_LENGTH_HELPURL);this.setColour(160);this.interpolateMsg(Blockly.Msg.TEXT_LENGTH_TITLE,["VALUE",["String","Array"],Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setOutput(!0,"Number");this.setTooltip(Blockly.Msg.TEXT_LENGTH_TOOLTIP)}};
Blockly.Blocks.text_isEmpty={init:function(){this.setHelpUrl(Blockly.Msg.TEXT_ISEMPTY_HELPURL);this.setColour(160);this.interpolateMsg(Blockly.Msg.TEXT_ISEMPTY_TITLE,["VALUE",["String","Array"],Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setOutput(!0,"Boolean");this.setTooltip(Blockly.Msg.TEXT_ISEMPTY_TOOLTIP)}};
Blockly.Blocks.text_indexOf={init:function(){var a=[[Blockly.Msg.TEXT_INDEXOF_OPERATOR_FIRST,"FIRST"],[Blockly.Msg.TEXT_INDEXOF_OPERATOR_LAST,"LAST"]];this.setHelpUrl(Blockly.Msg.TEXT_INDEXOF_HELPURL);this.setColour(160);this.setOutput(!0,"Number");this.appendValueInput("VALUE").setCheck("String").appendField(Blockly.Msg.TEXT_INDEXOF_INPUT_INTEXT);this.appendValueInput("FIND").setCheck("String").appendField(new Blockly.FieldDropdown(a),"END");Blockly.Msg.TEXT_INDEXOF_TAIL&&this.appendDummyInput().appendField(Blockly.Msg.TEXT_INDEXOF_TAIL);
this.setInputsInline(!0);this.setTooltip(Blockly.Msg.TEXT_INDEXOF_TOOLTIP)}};
Blockly.Blocks.text_charAt={init:function(){this.WHERE_OPTIONS=[[Blockly.Msg.TEXT_CHARAT_FROM_START,"FROM_START"],[Blockly.Msg.TEXT_CHARAT_FROM_END,"FROM_END"],[Blockly.Msg.TEXT_CHARAT_FIRST,"FIRST"],[Blockly.Msg.TEXT_CHARAT_LAST,"LAST"],[Blockly.Msg.TEXT_CHARAT_RANDOM,"RANDOM"]];this.setHelpUrl(Blockly.Msg.TEXT_CHARAT_HELPURL);this.setColour(160);this.setOutput(!0,"String");this.appendValueInput("VALUE").setCheck("String").appendField(Blockly.Msg.TEXT_CHARAT_INPUT_INTEXT);this.appendDummyInput("AT");
this.setInputsInline(!0);this.updateAt_(!0);this.setTooltip(Blockly.Msg.TEXT_CHARAT_TOOLTIP)},mutationToDom:function(){var a=document.createElement("mutation"),b=this.getInput("AT").type==Blockly.INPUT_VALUE;a.setAttribute("at",b);return a},domToMutation:function(a){a="false"!=a.getAttribute("at");this.updateAt_(a)},updateAt_:function(a){this.removeInput("AT");this.removeInput("ORDINAL",!0);a?(this.appendValueInput("AT").setCheck("Number"),Blockly.Msg.ORDINAL_NUMBER_SUFFIX&&this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)):
this.appendDummyInput("AT");Blockly.Msg.TEXT_CHARAT_TAIL&&(this.removeInput("TAIL",!0),this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_CHARAT_TAIL));var b=new Blockly.FieldDropdown(this.WHERE_OPTIONS,function(b){var d="FROM_START"==b||"FROM_END"==b;if(d!=a){var e=this.sourceBlock_;e.updateAt_(d);e.setFieldValue(b,"WHERE");return null}});this.getInput("AT").appendField(b,"WHERE")}};
Blockly.Blocks.text_getSubstring={init:function(){this.WHERE_OPTIONS_1=[[Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START,"FROM_START"],[Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END,"FROM_END"],[Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST,"FIRST"]];this.WHERE_OPTIONS_2=[[Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START,"FROM_START"],[Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END,"FROM_END"],[Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST,"LAST"]];this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);this.setColour(160);
this.appendValueInput("STRING").setCheck("String").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);this.appendDummyInput("AT1");this.appendDummyInput("AT2");Blockly.Msg.TEXT_GET_SUBSTRING_TAIL&&this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);this.setInputsInline(!0);this.setOutput(!0,"String");this.updateAt_(1,!0);this.updateAt_(2,!0);this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP)},mutationToDom:function(){var a=document.createElement("mutation"),
b=this.getInput("AT1").type==Blockly.INPUT_VALUE;a.setAttribute("at1",b);b=this.getInput("AT2").type==Blockly.INPUT_VALUE;a.setAttribute("at2",b);return a},domToMutation:function(a){var b="true"==a.getAttribute("at1");a="true"==a.getAttribute("at2");this.updateAt_(1,b);this.updateAt_(2,a)},updateAt_:function(a,b){this.removeInput("AT"+a);this.removeInput("ORDINAL"+a,!0);b?(this.appendValueInput("AT"+a).setCheck("Number"),Blockly.Msg.ORDINAL_NUMBER_SUFFIX&&this.appendDummyInput("ORDINAL"+a).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)):
this.appendDummyInput("AT"+a);2==a&&Blockly.Msg.TEXT_GET_SUBSTRING_TAIL&&(this.removeInput("TAIL",!0),this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL));var c=new Blockly.FieldDropdown(this["WHERE_OPTIONS_"+a],function(c){var e="FROM_START"==c||"FROM_END"==c;if(e!=b){var f=this.sourceBlock_;f.updateAt_(a,e);f.setFieldValue(c,"WHERE"+a);return null}});this.getInput("AT"+a).appendField(c,"WHERE"+a);1==a&&this.moveInputBefore("AT1","AT2")}};
Blockly.Blocks.text_changeCase={init:function(){var a=[[Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE,"UPPERCASE"],[Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE,"LOWERCASE"],[Blockly.Msg.TEXT_CHANGECASE_OPERATOR_TITLECASE,"TITLECASE"]];this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);this.setColour(160);this.appendValueInput("TEXT").setCheck("String").appendField(new Blockly.FieldDropdown(a),"CASE");this.setOutput(!0,"String");this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP)}};
Blockly.Blocks.text_trim={init:function(){var a=[[Blockly.Msg.TEXT_TRIM_OPERATOR_BOTH,"BOTH"],[Blockly.Msg.TEXT_TRIM_OPERATOR_LEFT,"LEFT"],[Blockly.Msg.TEXT_TRIM_OPERATOR_RIGHT,"RIGHT"]];this.setHelpUrl(Blockly.Msg.TEXT_TRIM_HELPURL);this.setColour(160);this.appendValueInput("TEXT").setCheck("String").appendField(new Blockly.FieldDropdown(a),"MODE");this.setOutput(!0,"String");this.setTooltip(Blockly.Msg.TEXT_TRIM_TOOLTIP)}};
Blockly.Blocks.text_print={init:function(){this.setHelpUrl(Blockly.Msg.TEXT_PRINT_HELPURL);this.setColour(160);this.interpolateMsg(Blockly.Msg.TEXT_PRINT_TITLE,["TEXT",null,Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setPreviousStatement(!0);this.setNextStatement(!0);this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP)}};
Blockly.Blocks.text_prompt={init:function(){var a=[[Blockly.Msg.TEXT_PROMPT_TYPE_TEXT,"TEXT"],[Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER,"NUMBER"]],b=this;this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);this.setColour(160);a=new Blockly.FieldDropdown(a,function(a){"NUMBER"==a?b.changeOutput("Number"):b.changeOutput("String")});this.appendDummyInput().appendField(a,"TYPE").appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""),"TEXT").appendField(this.newQuote_(!1));this.setOutput(!0,
"String");b=this;this.setTooltip(function(){return"TEXT"==b.getFieldValue("TYPE")?Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT:Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER})},newQuote_:Blockly.Blocks.text.newQuote_};
Blockly.Blocks.text_prompt_ext={init:function(){var a=[[Blockly.Msg.TEXT_PROMPT_TYPE_TEXT,"TEXT"],[Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER,"NUMBER"]],b=this;this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);this.setColour(160);a=new Blockly.FieldDropdown(a,function(a){"NUMBER"==a?b.changeOutput("Number"):b.changeOutput("String")});this.appendValueInput("TEXT").appendField(a,"TYPE");this.setOutput(!0,"String");b=this;this.setTooltip(function(){return"TEXT"==b.getFieldValue("TYPE")?Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT:
Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER})}};
// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Blocks.variables={};
Blockly.Blocks.variables_get={init:function(){this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);this.setColour(330);this.appendDummyInput().appendField(Blockly.Msg.VARIABLES_GET_TITLE).appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_GET_ITEM),"VAR").appendField(Blockly.Msg.VARIABLES_GET_TAIL);this.setOutput(!0);this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);this.contextMenuMsg_=Blockly.Msg.VARIABLES_GET_CREATE_SET;this.contextMenuType_="variables_set"},getVars:function(){return[this.getFieldValue("VAR")]},
renameVar:function(a,b){Blockly.Names.equals(a,this.getFieldValue("VAR"))&&this.setFieldValue(b,"VAR")},customContextMenu:function(a){var b={enabled:!0},c=this.getFieldValue("VAR");b.text=this.contextMenuMsg_.replace("%1",c);c=goog.dom.createDom("field",null,c);c.setAttribute("name","VAR");c=goog.dom.createDom("block",null,c);c.setAttribute("type",this.contextMenuType_);b.callback=Blockly.ContextMenu.callbackFactory(this,c);a.push(b)}};
Blockly.Blocks.variables_set={init:function(){this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);this.setColour(330);this.interpolateMsg(Blockly.Msg.VARIABLES_SET_TITLE+" %1 "+Blockly.Msg.VARIABLES_SET_TAIL+" %2",["VAR",new Blockly.FieldVariable(Blockly.Msg.VARIABLES_SET_ITEM)],["VALUE",null,Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);this.setPreviousStatement(!0);this.setNextStatement(!0);this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);this.contextMenuMsg_=Blockly.Msg.VARIABLES_SET_CREATE_GET;this.contextMenuType_=
"variables_get"},getVars:function(){return[this.getFieldValue("VAR")]},renameVar:function(a,b){Blockly.Names.equals(a,this.getFieldValue("VAR"))&&this.setFieldValue(b,"VAR")},customContextMenu:Blockly.Blocks.variables_get.customContextMenu};
jQuery(function() {
  $("a[rel~=popover], .has-popover").popover();
  $("a[rel~=tooltip], .has-tooltip").tooltip();
});
(function() {
  jQuery(function() {
    $("a[rel~=popover], .has-popover").popover();
    return $("a[rel~=tooltip], .has-tooltip").tooltip();
  });

}).call(this);
// This file was automatically generated.  Do not modify.

'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');

Blockly.Msg.ADD_COMMENT = "Add Comment";
Blockly.Msg.AUTH = "Please authorize this app to enable your work to be saved and to allow it to be shared by you.";
Blockly.Msg.CHANGE_VALUE_TITLE = "Change value:";
Blockly.Msg.CHAT = "Chat with your collaborator by typing in this box!";
Blockly.Msg.COLLAPSE_ALL = "Collapse Blocks";
Blockly.Msg.COLLAPSE_BLOCK = "Collapse Block";
Blockly.Msg.COLOUR_BLEND_COLOUR1 = "colour 1";
Blockly.Msg.COLOUR_BLEND_COLOUR2 = "colour 2";
Blockly.Msg.COLOUR_BLEND_HELPURL = "http://meyerweb.com/eric/tools/color-blend/";
Blockly.Msg.COLOUR_BLEND_RATIO = "ratio";
Blockly.Msg.COLOUR_BLEND_TITLE = "blend";
Blockly.Msg.COLOUR_BLEND_TOOLTIP = "Blends two colours together with a given ratio (0.0 - 1.0).";
Blockly.Msg.COLOUR_PICKER_HELPURL = "https://en.wikipedia.org/wiki/Color";
Blockly.Msg.COLOUR_PICKER_TOOLTIP = "Choose a colour from the palette.";
Blockly.Msg.COLOUR_RANDOM_HELPURL = "http://randomcolour.com";
Blockly.Msg.COLOUR_RANDOM_TITLE = "random colour";
Blockly.Msg.COLOUR_RANDOM_TOOLTIP = "Choose a colour at random.";
Blockly.Msg.COLOUR_RGB_BLUE = "blue";
Blockly.Msg.COLOUR_RGB_GREEN = "green";
Blockly.Msg.COLOUR_RGB_HELPURL = "http://www.december.com/html/spec/colorper.html";
Blockly.Msg.COLOUR_RGB_RED = "red";
Blockly.Msg.COLOUR_RGB_TITLE = "colour with";
Blockly.Msg.COLOUR_RGB_TOOLTIP = "Create a colour with the specified amount of red, green, and blue.  All values must be between 0 and 100.";
Blockly.Msg.CONTROLS_FLOW_STATEMENTS_HELPURL = "https://github.com/google/blockly/wiki/Loops#Loop_Termination_Blocks";
Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK = "break out of loop";
Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE = "continue with next iteration of loop";
Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK = "Break out of the containing loop.";
Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE = "Skip the rest of this loop, and continue with the next iteration.";
Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING = "Warning: This block may only be used within a loop.";
Blockly.Msg.CONTROLS_FOREACH_HELPURL = "https://github.com/google/blockly/wiki/Loops#for_each for each block";
Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST = "in list";
Blockly.Msg.CONTROLS_FOREACH_INPUT_INLIST_TAIL = "";
Blockly.Msg.CONTROLS_FOREACH_INPUT_ITEM = "for each item";
Blockly.Msg.CONTROLS_FOREACH_TOOLTIP = "For each item in a list, set the variable '%1' to the item, and then do some statements.";
Blockly.Msg.CONTROLS_FOR_HELPURL = "https://github.com/google/blockly/wiki/Loops#count_with";
Blockly.Msg.CONTROLS_FOR_INPUT_FROM_TO_BY = "from %1 to %2 by %3";
Blockly.Msg.CONTROLS_FOR_INPUT_WITH = "count with";
Blockly.Msg.CONTROLS_FOR_TOOLTIP = "Have the variable %1 take on the values from the start number to the end number, counting by the specified interval, and do the specified blocks.";
Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP = "Add a condition to the if block.";
Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP = "Add a final, catch-all condition to the if block.";
Blockly.Msg.CONTROLS_IF_HELPURL = "https://github.com/google/blockly/wiki/If_Then";
Blockly.Msg.CONTROLS_IF_IF_TOOLTIP = "Add, remove, or reorder sections to reconfigure this if block.";
Blockly.Msg.CONTROLS_IF_MSG_ELSE = "else";
Blockly.Msg.CONTROLS_IF_MSG_ELSEIF = "else if";
Blockly.Msg.CONTROLS_IF_MSG_IF = "if";
Blockly.Msg.CONTROLS_IF_TOOLTIP_1 = "If a value is true, then do some statements.";
Blockly.Msg.CONTROLS_IF_TOOLTIP_2 = "If a value is true, then do the first block of statements.  Otherwise, do the second block of statements.";
Blockly.Msg.CONTROLS_IF_TOOLTIP_3 = "If the first value is true, then do the first block of statements.  Otherwise, if the second value is true, do the second block of statements.";
Blockly.Msg.CONTROLS_IF_TOOLTIP_4 = "If the first value is true, then do the first block of statements.  Otherwise, if the second value is true, do the second block of statements.  If none of the values are true, do the last block of statements.";
Blockly.Msg.CONTROLS_REPEAT_HELPURL = "https://en.wikipedia.org/wiki/For_loop";
Blockly.Msg.CONTROLS_REPEAT_INPUT_DO = "do";
Blockly.Msg.CONTROLS_REPEAT_TITLE = "repeat %1 times";
Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT = "repeat";
Blockly.Msg.CONTROLS_REPEAT_TITLE_TIMES = "times";
Blockly.Msg.CONTROLS_REPEAT_TOOLTIP = "Do some statements several times.";
Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL = "https://github.com/google/blockly/wiki/Loops#repeat";
Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL = "repeat until";
Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE = "repeat while";
Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL = "While a value is false, then do some statements.";
Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE = "While a value is true, then do some statements.";
Blockly.Msg.DELETE_BLOCK = "Delete Block";
Blockly.Msg.DELETE_X_BLOCKS = "Delete %1 Blocks";
Blockly.Msg.DISABLE_BLOCK = "Disable Block";
Blockly.Msg.DUPLICATE_BLOCK = "Duplicate";
Blockly.Msg.ENABLE_BLOCK = "Enable Block";
Blockly.Msg.EXPAND_ALL = "Expand Blocks";
Blockly.Msg.EXPAND_BLOCK = "Expand Block";
Blockly.Msg.EXTERNAL_INPUTS = "External Inputs";
Blockly.Msg.HELP = "Help";
Blockly.Msg.INLINE_INPUTS = "Inline Inputs";
Blockly.Msg.LISTS_CREATE_EMPTY_HELPURL = "https://en.wikipedia.org/wiki/Linked_list#Empty_lists";
Blockly.Msg.LISTS_CREATE_EMPTY_TITLE = "create empty list";
Blockly.Msg.LISTS_CREATE_EMPTY_TOOLTIP = "Returns a list, of length 0, containing no data records";
Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD = "list";
Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP = "Add, remove, or reorder sections to reconfigure this list block.";
Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH = "create list with";
Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP = "Add an item to the list.";
Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP = "Create a list with any number of items.";
Blockly.Msg.LISTS_GET_INDEX_FIRST = "first";
Blockly.Msg.LISTS_GET_INDEX_FROM_END = "# from end";
Blockly.Msg.LISTS_GET_INDEX_FROM_START = "#";
Blockly.Msg.LISTS_GET_INDEX_GET = "get";
Blockly.Msg.LISTS_GET_INDEX_GET_REMOVE = "get and remove";
Blockly.Msg.LISTS_GET_INDEX_LAST = "last";
Blockly.Msg.LISTS_GET_INDEX_RANDOM = "random";
Blockly.Msg.LISTS_GET_INDEX_REMOVE = "remove";
Blockly.Msg.LISTS_GET_INDEX_TAIL = "";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FIRST = "Returns the first item in a list.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM_END = "Returns the item at the specified position in a list.  #1 is the last item.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM_START = "Returns the item at the specified position in a list.  #1 is the first item.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_LAST = "Returns the last item in a list.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM = "Returns a random item in a list.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST = "Removes and returns the first item in a list.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM_END = "Removes and returns the item at the specified position in a list.  #1 is the last item.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM_START = "Removes and returns the item at the specified position in a list.  #1 is the first item.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST = "Removes and returns the last item in a list.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM = "Removes and returns a random item in a list.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST = "Removes the first item in a list.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM_END = "Removes the item at the specified position in a list.  #1 is the last item.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM_START = "Removes the item at the specified position in a list.  #1 is the first item.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST = "Removes the last item in a list.";
Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM = "Removes a random item in a list.";
Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END = "to # from end";
Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START = "to #";
Blockly.Msg.LISTS_GET_SUBLIST_END_LAST = "to last";
Blockly.Msg.LISTS_GET_SUBLIST_HELPURL = "https://github.com/google/blockly/wiki/Lists#Getting_a_sublist";
Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST = "get sub-list from first";
Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_END = "get sub-list from # from end";
Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_START = "get sub-list from #";
Blockly.Msg.LISTS_GET_SUBLIST_TAIL = "";
Blockly.Msg.LISTS_GET_SUBLIST_TOOLTIP = "Creates a copy of the specified portion of a list.";
Blockly.Msg.LISTS_INDEX_OF_FIRST = "find first occurrence of item";
Blockly.Msg.LISTS_INDEX_OF_HELPURL = "https://github.com/google/blockly/wiki/Lists#Getting_Items_from_a_List";
Blockly.Msg.LISTS_INDEX_OF_LAST = "find last occurrence of item";
Blockly.Msg.LISTS_INDEX_OF_TOOLTIP = "Returns the index of the first/last occurrence of the item in the list.  Returns 0 if text is not found.";
Blockly.Msg.LISTS_INLIST = "in list";
Blockly.Msg.LISTS_IS_EMPTY_HELPURL = "https://github.com/google/blockly/wiki/Lists#is_empty";
Blockly.Msg.LISTS_IS_EMPTY_TITLE = "%1 is empty";
Blockly.Msg.LISTS_LENGTH_HELPURL = "https://github.com/google/blockly/wiki/Lists#length_of";
Blockly.Msg.LISTS_LENGTH_TITLE = "length of %1";
Blockly.Msg.LISTS_LENGTH_TOOLTIP = "Returns the length of a list.";
Blockly.Msg.LISTS_REPEAT_HELPURL = "https://github.com/google/blockly/wiki/Lists#create_list_with";
Blockly.Msg.LISTS_REPEAT_TITLE = "create list with item %1 repeated %2 times";
Blockly.Msg.LISTS_REPEAT_TOOLTIP = "Creates a list consisting of the given value repeated the specified number of times.";
Blockly.Msg.LISTS_SET_INDEX_HELPURL = "https://github.com/google/blockly/wiki/Lists#in_list_..._set";
Blockly.Msg.LISTS_SET_INDEX_INPUT_TO = "as";
Blockly.Msg.LISTS_SET_INDEX_INSERT = "insert at";
Blockly.Msg.LISTS_SET_INDEX_SET = "set";
Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST = "Inserts the item at the start of a list.";
Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_FROM_END = "Inserts the item at the specified position in a list.  #1 is the last item.";
Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_FROM_START = "Inserts the item at the specified position in a list.  #1 is the first item.";
Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_LAST = "Append the item to the end of a list.";
Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM = "Inserts the item randomly in a list.";
Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_FIRST = "Sets the first item in a list.";
Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_FROM_END = "Sets the item at the specified position in a list.  #1 is the last item.";
Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_FROM_START = "Sets the item at the specified position in a list.  #1 is the first item.";
Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_LAST = "Sets the last item in a list.";
Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_RANDOM = "Sets a random item in a list.";
Blockly.Msg.LISTS_TOOLTIP = "Returns true if the list is empty.";
Blockly.Msg.LOGIC_BOOLEAN_FALSE = "false";
Blockly.Msg.LOGIC_BOOLEAN_HELPURL = "https://github.com/google/blockly/wiki/Logic#values";
Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP = "Returns either true or false.";
Blockly.Msg.LOGIC_BOOLEAN_TRUE = "true";
Blockly.Msg.LOGIC_COMPARE_HELPURL = "https://en.wikipedia.org/wiki/Inequality_(mathematics)";
Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ = "Return true if both inputs equal each other.";
Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT = "Return true if the first input is greater than the second input.";
Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE = "Return true if the first input is greater than or equal to the second input.";
Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT = "Return true if the first input is smaller than the second input.";
Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE = "Return true if the first input is smaller than or equal to the second input.";
Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ = "Return true if both inputs are not equal to each other.";
Blockly.Msg.LOGIC_NEGATE_HELPURL = "https://github.com/google/blockly/wiki/Logic#not";
Blockly.Msg.LOGIC_NEGATE_TITLE = "not %1";
Blockly.Msg.LOGIC_NEGATE_TOOLTIP = "Returns true if the input is false.  Returns false if the input is true.";
Blockly.Msg.LOGIC_NULL = "null";
Blockly.Msg.LOGIC_NULL_HELPURL = "https://en.wikipedia.org/wiki/Nullable_type";
Blockly.Msg.LOGIC_NULL_TOOLTIP = "Returns null.";
Blockly.Msg.LOGIC_OPERATION_AND = "and";
Blockly.Msg.LOGIC_OPERATION_HELPURL = "https://github.com/google/blockly/wiki/Logic#logical-operations";
Blockly.Msg.LOGIC_OPERATION_OR = "or";
Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND = "Return true if both inputs are true.";
Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR = "Return true if at least one of the inputs is true.";
Blockly.Msg.LOGIC_TERNARY_CONDITION = "test";
Blockly.Msg.LOGIC_TERNARY_HELPURL = "https://en.wikipedia.org/wiki/%3F:";
Blockly.Msg.LOGIC_TERNARY_IF_FALSE = "if false";
Blockly.Msg.LOGIC_TERNARY_IF_TRUE = "if true";
Blockly.Msg.LOGIC_TERNARY_TOOLTIP = "Check the condition in 'test'. If the condition is true, returns the 'if true' value; otherwise returns the 'if false' value.";
Blockly.Msg.MATH_ADDITION_SYMBOL = "+";
Blockly.Msg.MATH_ARITHMETIC_HELPURL = "https://en.wikipedia.org/wiki/Arithmetic";
Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD = "Return the sum of the two numbers.";
Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE = "Return the quotient of the two numbers.";
Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS = "Return the difference of the two numbers.";
Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY = "Return the product of the two numbers.";
Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER = "Return the first number raised to the power of the second number.";
Blockly.Msg.MATH_CHANGE_HELPURL = "https://en.wikipedia.org/wiki/Programming_idiom#Incrementing_a_counter";
Blockly.Msg.MATH_CHANGE_INPUT_BY = "by";
Blockly.Msg.MATH_CHANGE_TITLE_CHANGE = "change";
Blockly.Msg.MATH_CHANGE_TOOLTIP = "Add a number to variable '%1'.";
Blockly.Msg.MATH_CONSTANT_HELPURL = "https://en.wikipedia.org/wiki/Mathematical_constant";
Blockly.Msg.MATH_CONSTANT_TOOLTIP = "Return one of the common constants: π (3.141…), e (2.718…), φ (1.618…), sqrt(2) (1.414…), sqrt(½) (0.707…), or ∞ (infinity).";
Blockly.Msg.MATH_CONSTRAIN_HELPURL = "https://en.wikipedia.org/wiki/Clamping_%28graphics%29";
Blockly.Msg.MATH_CONSTRAIN_TITLE = "constrain %1 low %2 high %3";
Blockly.Msg.MATH_CONSTRAIN_TOOLTIP = "Constrain a number to be between the specified limits (inclusive).";
Blockly.Msg.MATH_DIVISION_SYMBOL = "÷";
Blockly.Msg.MATH_IS_DIVISIBLE_BY = "is divisible by";
Blockly.Msg.MATH_IS_EVEN = "is even";
Blockly.Msg.MATH_IS_NEGATIVE = "is negative";
Blockly.Msg.MATH_IS_ODD = "is odd";
Blockly.Msg.MATH_IS_POSITIVE = "is positive";
Blockly.Msg.MATH_IS_PRIME = "is prime";
Blockly.Msg.MATH_IS_TOOLTIP = "Check if a number is an even, odd, prime, whole, positive, negative, or if it is divisible by certain number.  Returns true or false.";
Blockly.Msg.MATH_IS_WHOLE = "is whole";
Blockly.Msg.MATH_MODULO_HELPURL = "https://en.wikipedia.org/wiki/Modulo_operation";
Blockly.Msg.MATH_MODULO_TITLE = "remainder of %1 ÷ %2";
Blockly.Msg.MATH_MODULO_TOOLTIP = "Return the remainder from dividing the two numbers.";
Blockly.Msg.MATH_MULTIPLICATION_SYMBOL = "×";
Blockly.Msg.MATH_NUMBER_HELPURL = "https://en.wikipedia.org/wiki/Number";
Blockly.Msg.MATH_NUMBER_TOOLTIP = "A number.";
Blockly.Msg.MATH_ONLIST_HELPURL = "";
Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE = "average of list";
Blockly.Msg.MATH_ONLIST_OPERATOR_MAX = "max of list";
Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN = "median of list";
Blockly.Msg.MATH_ONLIST_OPERATOR_MIN = "min of list";
Blockly.Msg.MATH_ONLIST_OPERATOR_MODE = "modes of list";
Blockly.Msg.MATH_ONLIST_OPERATOR_RANDOM = "random item of list";
Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV = "standard deviation of list";
Blockly.Msg.MATH_ONLIST_OPERATOR_SUM = "sum of list";
Blockly.Msg.MATH_ONLIST_TOOLTIP_AVERAGE = "Return the average (arithmetic mean) of the numeric values in the list.";
Blockly.Msg.MATH_ONLIST_TOOLTIP_MAX = "Return the largest number in the list.";
Blockly.Msg.MATH_ONLIST_TOOLTIP_MEDIAN = "Return the median number in the list.";
Blockly.Msg.MATH_ONLIST_TOOLTIP_MIN = "Return the smallest number in the list.";
Blockly.Msg.MATH_ONLIST_TOOLTIP_MODE = "Return a list of the most common item(s) in the list.";
Blockly.Msg.MATH_ONLIST_TOOLTIP_RANDOM = "Return a random element from the list.";
Blockly.Msg.MATH_ONLIST_TOOLTIP_STD_DEV = "Return the standard deviation of the list.";
Blockly.Msg.MATH_ONLIST_TOOLTIP_SUM = "Return the sum of all the numbers in the list.";
Blockly.Msg.MATH_POWER_SYMBOL = "^";
Blockly.Msg.MATH_RANDOM_FLOAT_HELPURL = "https://en.wikipedia.org/wiki/Random_number_generation";
Blockly.Msg.MATH_RANDOM_FLOAT_TITLE_RANDOM = "random fraction";
Blockly.Msg.MATH_RANDOM_FLOAT_TOOLTIP = "Return a random fraction between 0.0 (inclusive) and 1.0 (exclusive).";
Blockly.Msg.MATH_RANDOM_INT_HELPURL = "https://en.wikipedia.org/wiki/Random_number_generation";
Blockly.Msg.MATH_RANDOM_INT_TITLE = "random integer from %1 to %2";
Blockly.Msg.MATH_RANDOM_INT_TOOLTIP = "Return a random integer between the two specified limits, inclusive.";
Blockly.Msg.MATH_ROUND_HELPURL = "https://en.wikipedia.org/wiki/Rounding";
Blockly.Msg.MATH_ROUND_OPERATOR_ROUND = "round";
Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDDOWN = "round down";
Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDUP = "round up";
Blockly.Msg.MATH_ROUND_TOOLTIP = "Round a number up or down.";
Blockly.Msg.MATH_SINGLE_HELPURL = "https://en.wikipedia.org/wiki/Square_root";
Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE = "absolute";
Blockly.Msg.MATH_SINGLE_OP_ROOT = "square root";
Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS = "Return the absolute value of a number.";
Blockly.Msg.MATH_SINGLE_TOOLTIP_EXP = "Return e to the power of a number.";
Blockly.Msg.MATH_SINGLE_TOOLTIP_LN = "Return the natural logarithm of a number.";
Blockly.Msg.MATH_SINGLE_TOOLTIP_LOG10 = "Return the base 10 logarithm of a number.";
Blockly.Msg.MATH_SINGLE_TOOLTIP_NEG = "Return the negation of a number.";
Blockly.Msg.MATH_SINGLE_TOOLTIP_POW10 = "Return 10 to the power of a number.";
Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT = "Return the square root of a number.";
Blockly.Msg.MATH_SUBTRACTION_SYMBOL = "-";
Blockly.Msg.MATH_TRIG_ACOS = "acos";
Blockly.Msg.MATH_TRIG_ASIN = "asin";
Blockly.Msg.MATH_TRIG_ATAN = "atan";
Blockly.Msg.MATH_TRIG_COS = "cos";
Blockly.Msg.MATH_TRIG_HELPURL = "https://en.wikipedia.org/wiki/Trigonometric_functions";
Blockly.Msg.MATH_TRIG_SIN = "sin";
Blockly.Msg.MATH_TRIG_TAN = "tan";
Blockly.Msg.MATH_TRIG_TOOLTIP_ACOS = "Return the arccosine of a number.";
Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN = "Return the arcsine of a number.";
Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN = "Return the arctangent of a number.";
Blockly.Msg.MATH_TRIG_TOOLTIP_COS = "Return the cosine of a degree (not radian).";
Blockly.Msg.MATH_TRIG_TOOLTIP_SIN = "Return the sine of a degree (not radian).";
Blockly.Msg.MATH_TRIG_TOOLTIP_TAN = "Return the tangent of a degree (not radian).";
Blockly.Msg.ME = "Me";
Blockly.Msg.NEW_VARIABLE = "New variable...";
Blockly.Msg.NEW_VARIABLE_TITLE = "New variable name:";
Blockly.Msg.ORDINAL_NUMBER_SUFFIX = "";
Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS = "allow statements";
Blockly.Msg.PROCEDURES_BEFORE_PARAMS = "with:";
Blockly.Msg.PROCEDURES_CALLNORETURN_CALL = "";
Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL = "https://en.wikipedia.org/wiki/Procedure_%28computer_science%29";
Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP = "Run the user-defined function '%1'.";
Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL = "https://en.wikipedia.org/wiki/Procedure_%28computer_science%29";
Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP = "Run the user-defined function '%1' and use its output.";
Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS = "with:";
Blockly.Msg.PROCEDURES_CREATE_DO = "Create '%1'";
Blockly.Msg.PROCEDURES_DEFNORETURN_DO = "";
Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL = "https://en.wikipedia.org/wiki/Procedure_%28computer_science%29";
Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE = "do something";
Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = "to";
Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP = "Creates a function with no output.";
Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL = "https://en.wikipedia.org/wiki/Procedure_%28computer_science%29";
Blockly.Msg.PROCEDURES_DEFRETURN_RETURN = "return";
Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP = "Creates a function with an output.";
Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING = "Warning: This function has duplicate parameters.";
Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF = "Highlight function definition";
Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP = "If a value is true, then return a second value.";
Blockly.Msg.PROCEDURES_IFRETURN_WARNING = "Warning: This block may be used only within a function definition.";
Blockly.Msg.PROCEDURES_MUTATORARG_TITLE = "input name:";
Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP = "Add an input to the function.";
Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE = "inputs";
Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP = "Add, remove, or reorder inputs to this function.";
Blockly.Msg.REMOVE_COMMENT = "Remove Comment";
Blockly.Msg.RENAME_VARIABLE = "Rename variable...";
Blockly.Msg.RENAME_VARIABLE_TITLE = "Rename all '%1' variables to:";
Blockly.Msg.TEXT_APPEND_APPENDTEXT = "append text";
Blockly.Msg.TEXT_APPEND_HELPURL = "https://github.com/google/blockly/wiki/Text#Text_modification";
Blockly.Msg.TEXT_APPEND_TO = "to";
Blockly.Msg.TEXT_APPEND_TOOLTIP = "Append some text to variable '%1'.";
Blockly.Msg.TEXT_CHANGECASE_HELPURL = "https://github.com/google/blockly/wiki/Text#Adjusting_text_case";
Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE = "to lower case";
Blockly.Msg.TEXT_CHANGECASE_OPERATOR_TITLECASE = "to Title Case";
Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE = "to UPPER CASE";
Blockly.Msg.TEXT_CHANGECASE_TOOLTIP = "Return a copy of the text in a different case.";
Blockly.Msg.TEXT_CHARAT_FIRST = "get first letter";
Blockly.Msg.TEXT_CHARAT_FROM_END = "get letter # from end";
Blockly.Msg.TEXT_CHARAT_FROM_START = "get letter #";
Blockly.Msg.TEXT_CHARAT_HELPURL = "https://github.com/google/blockly/wiki/Text#Extracting_text";
Blockly.Msg.TEXT_CHARAT_INPUT_INTEXT = "in text";
Blockly.Msg.TEXT_CHARAT_LAST = "get last letter";
Blockly.Msg.TEXT_CHARAT_RANDOM = "get random letter";
Blockly.Msg.TEXT_CHARAT_TAIL = "";
Blockly.Msg.TEXT_CHARAT_TOOLTIP = "Returns the letter at the specified position.";
Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TOOLTIP = "Add an item to the text.";
Blockly.Msg.TEXT_CREATE_JOIN_TITLE_JOIN = "join";
Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP = "Add, remove, or reorder sections to reconfigure this text block.";
Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END = "to letter # from end";
Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START = "to letter #";
Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST = "to last letter";
Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL = "https://github.com/google/blockly/wiki/Text#Extracting_a_region_of_text";
Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT = "in text";
Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST = "get substring from first letter";
Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END = "get substring from letter # from end";
Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START = "get substring from letter #";
Blockly.Msg.TEXT_GET_SUBSTRING_TAIL = "";
Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP = "Returns a specified portion of the text.";
Blockly.Msg.TEXT_INDEXOF_HELPURL = "https://github.com/google/blockly/wiki/Text#Finding_text";
Blockly.Msg.TEXT_INDEXOF_INPUT_INTEXT = "in text";
Blockly.Msg.TEXT_INDEXOF_OPERATOR_FIRST = "find first occurrence of text";
Blockly.Msg.TEXT_INDEXOF_OPERATOR_LAST = "find last occurrence of text";
Blockly.Msg.TEXT_INDEXOF_TAIL = "";
Blockly.Msg.TEXT_INDEXOF_TOOLTIP = "Returns the index of the first/last occurrence of first text in the second text.  Returns 0 if text is not found.";
Blockly.Msg.TEXT_ISEMPTY_HELPURL = "https://github.com/google/blockly/wiki/Text#Checking_for_empty_text";
Blockly.Msg.TEXT_ISEMPTY_TITLE = "%1 is empty";
Blockly.Msg.TEXT_ISEMPTY_TOOLTIP = "Returns true if the provided text is empty.";
Blockly.Msg.TEXT_JOIN_HELPURL = "https://github.com/google/blockly/wiki/Text#Text_creation";
Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH = "create text with";
Blockly.Msg.TEXT_JOIN_TOOLTIP = "Create a piece of text by joining together any number of items.";
Blockly.Msg.TEXT_LENGTH_HELPURL = "https://github.com/google/blockly/wiki/Text#Text_modification";
Blockly.Msg.TEXT_LENGTH_TITLE = "length of %1";
Blockly.Msg.TEXT_LENGTH_TOOLTIP = "Returns the number of letters (including spaces) in the provided text.";
Blockly.Msg.TEXT_PRINT_HELPURL = "https://github.com/google/blockly/wiki/Text#Printing_text";
Blockly.Msg.TEXT_PRINT_TITLE = "print %1";
Blockly.Msg.TEXT_PRINT_TOOLTIP = "Print the specified text, number or other value.";
Blockly.Msg.TEXT_PROMPT_HELPURL = "https://github.com/google/blockly/wiki/Text#Getting_input_from_the_user";
Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER = "Prompt for user for a number.";
Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT = "Prompt for user for some text.";
Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER = "prompt for number with message";
Blockly.Msg.TEXT_PROMPT_TYPE_TEXT = "prompt for text with message";
Blockly.Msg.TEXT_TEXT_HELPURL = "https://en.wikipedia.org/wiki/String_(computer_science)";
Blockly.Msg.TEXT_TEXT_TOOLTIP = "A letter, word, or line of text.";
Blockly.Msg.TEXT_TRIM_HELPURL = "https://github.com/google/blockly/wiki/Text#Trimming_%28removing%29_spaces";
Blockly.Msg.TEXT_TRIM_OPERATOR_BOTH = "trim spaces from both sides of";
Blockly.Msg.TEXT_TRIM_OPERATOR_LEFT = "trim spaces from left side of";
Blockly.Msg.TEXT_TRIM_OPERATOR_RIGHT = "trim spaces from right side of";
Blockly.Msg.TEXT_TRIM_TOOLTIP = "Return a copy of the text with spaces removed from one or both ends.";
Blockly.Msg.VARIABLES_DEFAULT_NAME = "item";
Blockly.Msg.VARIABLES_GET_CREATE_SET = "Create 'set %1'";
Blockly.Msg.VARIABLES_GET_HELPURL = "https://github.com/google/blockly/wiki/Variables#Get";
Blockly.Msg.VARIABLES_GET_TAIL = "";
Blockly.Msg.VARIABLES_GET_TITLE = "";
Blockly.Msg.VARIABLES_GET_TOOLTIP = "Returns the value of this variable.";
Blockly.Msg.VARIABLES_SET_CREATE_GET = "Create 'get %1'";
Blockly.Msg.VARIABLES_SET_HELPURL = "https://github.com/google/blockly/wiki/Variables#Set";
Blockly.Msg.VARIABLES_SET_TAIL = "to";
Blockly.Msg.VARIABLES_SET_TITLE = "set";
Blockly.Msg.VARIABLES_SET_TOOLTIP = "Sets this variable to be equal to the input.";
Blockly.Msg.PROCEDURES_DEFRETURN_TITLE = Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE;
Blockly.Msg.LISTS_GET_SUBLIST_INPUT_IN_LIST = Blockly.Msg.LISTS_INLIST;
Blockly.Msg.LISTS_SET_INDEX_INPUT_IN_LIST = Blockly.Msg.LISTS_INLIST;
Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE = Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE;
Blockly.Msg.VARIABLES_SET_ITEM = Blockly.Msg.VARIABLES_DEFAULT_NAME;
Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE = Blockly.Msg.VARIABLES_DEFAULT_NAME;
Blockly.Msg.MATH_CHANGE_TITLE_ITEM = Blockly.Msg.VARIABLES_DEFAULT_NAME;
Blockly.Msg.VARIABLES_GET_ITEM = Blockly.Msg.VARIABLES_DEFAULT_NAME;
Blockly.Msg.PROCEDURES_DEFRETURN_DO = Blockly.Msg.PROCEDURES_DEFNORETURN_DO;
Blockly.Msg.LISTS_GET_INDEX_HELPURL = Blockly.Msg.LISTS_INDEX_OF_HELPURL;
Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TITLE_ITEM = Blockly.Msg.VARIABLES_DEFAULT_NAME;
Blockly.Msg.CONTROLS_IF_MSG_THEN = Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
Blockly.Msg.LISTS_INDEX_OF_INPUT_IN_LIST = Blockly.Msg.LISTS_INLIST;
Blockly.Msg.PROCEDURES_CALLRETURN_CALL = Blockly.Msg.PROCEDURES_CALLNORETURN_CALL;
Blockly.Msg.LISTS_GET_INDEX_INPUT_IN_LIST = Blockly.Msg.LISTS_INLIST;
Blockly.Msg.CONTROLS_FOR_INPUT_DO = Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
Blockly.Msg.CONTROLS_FOREACH_INPUT_DO = Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
Blockly.Msg.CONTROLS_IF_IF_TITLE_IF = Blockly.Msg.CONTROLS_IF_MSG_IF;
Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO = Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF = Blockly.Msg.CONTROLS_IF_MSG_ELSEIF;
Blockly.Msg.TEXT_APPEND_VARIABLE = Blockly.Msg.VARIABLES_DEFAULT_NAME;
Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE = Blockly.Msg.CONTROLS_IF_MSG_ELSE;
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  $(document).ready(function() {
    this.myMazeLayout = new MazeLayout('mazebuilder', "", 50, 5, 5, "new");
    this.myMazeLayout.updateJSON('#maze_layout');
    $(document).on('click', this.myMazeLayout.canvas, function(event) {
      var col, map, rect, row, x, y;
      if (event.type === "touchstart") {
        return this.myMazeLayout.touchToggleColor(event);
      } else {
        map = JSON.parse($("#maze_layout").val());
        rect = $("#mazebuilder .maze")[0].getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
        col = Math.floor(x / 50);
        row = Math.floor(y / 50);
        console.log(col + " " + row + " " + map[0][1]);
        if (map[row][col] === 1) {
          map[row][col] = 0;
        } else {
          map[row][col] = 1;
        }
        $("#maze_layout").val(JSON.stringify(map));
        $("#mazebuilder .maze").remove();
        return this.myMazeLayout = new MazeLayout('mazebuilder', JSON.parse($("#maze_layout").val()), 50, 5, 5, "new");
      }
    });
    return $(".mazelayout").on('click', function(event) {
      $("#maze_layout").val(this.children[0].value);
      $("#mazebuilder .maze").remove();
      return this.myMazeLayout = new MazeLayout('mazebuilder', JSON.parse($("#maze_layout").val()), 50, 5, 5, "new");
    });
  });

  this.MazeLayout = (function() {
    MazeLayout.prototype.currentCell = null;

    MazeLayout.prototype.numCols = 5;

    MazeLayout.prototype.numRows = 5;

    MazeLayout.prototype.cellSize = 50;

    MazeLayout.prototype.canvas = null;

    MazeLayout.prototype.drawingContext = null;

    MazeLayout.prototype.layoutmap = null;

    MazeLayout.prototype.containerID = null;

    function MazeLayout(containerID, map, cellSize, nrows, ncols, type) {
      var col, color, row, _i, _j, _ref, _ref1;
      if (map !== "") {
        this.numCols = map.length;
        this.numRows = map[0].length;
        this.layoutmap = map;
      } else {
        this.layoutmap = [];
      }
      this.numRows = nrows;
      this.numCols = ncols;
      this.cellSize = cellSize;
      this.containerID = containerID;
      this.createCanvas();
      this.createDrawingContext();
      this.drawingContext.fillRect(0, 0, this.cellSize, this.cellSize);
      this.currentCell = [];
      for (row = _i = 0, _ref = this.numRows - 1; _i <= _ref; row = _i += 1) {
        this.currentCell[row] = [];
        if (map === "") {
          this.layoutmap[row] = [];
        }
        for (col = _j = 0, _ref1 = this.numCols - 1; _j <= _ref1; col = _j += 1) {
          if (map !== "") {
            if (map[row][col] === 1) {
              color = "white";
            } else {
              color = "black";
            }
          } else {
            color = "white";
            this.layoutmap[row][col] = 1;
          }
          this.currentCell[row][col] = this.createCell(row, col, color);
          this.drawCell(this.currentCell[row][col]);
        }
      }
    }

    MazeLayout.prototype.createCanvas = function() {
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'maze';
      this.canvas.height = this.cellSize * this.numRows;
      this.canvas.width = this.cellSize * this.numCols;
      return document.getElementById(this.containerID).appendChild(this.canvas);
    };

    MazeLayout.prototype.createDrawingContext = function() {
      return this.drawingContext = this.canvas.getContext('2d');
    };

    MazeLayout.prototype.drawCell = function(cell) {
      var color, fillStyle, x, y;
      x = cell.col * this.cellSize;
      y = cell.row * this.cellSize;
      color = cell.color;
      this.drawingContext.strokeStyle = 'rgba(0, 0, 0, 1)';
      this.drawingContext.strokeRect(x, y, this.cellSize, this.cellSize);
      if (color === "white") {
        fillStyle = 'rgb(255,255,255)';
      } else {
        fillStyle = 'rgb(0,0,0)';
      }
      this.drawingContext.fillStyle = fillStyle;
      return this.drawingContext.fillRect(x, y, this.cellSize, this.cellSize);
    };

    MazeLayout.prototype.createCell = function(row, col, color) {
      return {
        row: row,
        col: col,
        color: color
      };
    };

    MazeLayout.prototype.toggleColor = function(event) {
      return this.toggle(event.clientX, event.clientY);
    };

    MazeLayout.prototype.touchToggleColor = function(event) {
      var touch;
      touch = event.originalEvent.targetTouches[0];
      return this.toggle(touch.pageX, touch.pageY);
    };

    MazeLayout.prototype.toggle = function(clientX, clientY) {
      var cell, col, rect, row, x, y;
      rect = this.canvas.getBoundingClientRect();
      x = clientX - rect.left;
      y = clientY - rect.top;
      col = Math.floor(x / 50);
      row = Math.floor(y / 50);
      cell = this.currentCell[row][col];
      if (cell.color === "black") {
        cell.color = "white";
        this.layoutmap[row][col] = 1;
      } else {
        cell.color = "black";
        this.layoutmap[row][col] = 0;
      }
      return this.drawCell(cell);
    };

    MazeLayout.prototype.updateJSON = function(map_id) {
      console.log(map_id);
      console.log(JSON.stringify(this.layoutmap));
      console.log("");
      $(map_id).val(JSON.stringify(this.layoutmap));
      return console.log($(map_id).val());
    };

    return MazeLayout;

  })();

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//





$(function(){
});
