/**
 * @name three.asset
 * @author makesites
 * Homepage: https://github.com/makesites/three-asset
 * Version: 0.0.2 (Thu, 31 Jul 2014 01:15:16 GMT)
 * @license MIT license
 */

if(typeof THREE !== "undefined") (function(THREE) {

THREE.Asset = function () {

	THREE.Loader.call( this );

};

THREE.Asset.prototype = {

	constructor: THREE.Asset,

	load: function ( source, callback ) {
		// variables
		var loader, src, ext;
		var self = this;
		// save callback for later...
		this._callback = callback;
		// get file
		var file = ( source instanceof Array ) ? source[0]: source;

		ext = file.substr( file.lastIndexOf(".")+1 );
		src = file.substr( 0, file.lastIndexOf(".") );
		// based on the extension initiate the appropriate loader
		switch( ext ){
			case "bin":
				loader = new THREE.BinaryLoader( true );
				loader.load( src+'.js', function(){ self._loaded.apply(self, arguments); });
			break;
			case "obj":
				var obj = file;
				var mtl = src+'.mtl';
				loader = new THREE.OBJMTLLoader();
				loader.load( obj, mtl, function(){ self._loaded.apply(self, arguments); });
			break;
			case "js":
				// assume this is the uncompressed version (lookup for a bin to make sure?)
				loader = new THREE.JSONLoader( true );
				loader.load( file, function(){ self._loaded.apply(self, arguments); });
			break;
		}

	},

	parse: function ( json ) {

	},

	_loaded: function ( object, materials ) {
		if( typeof this._callback == "function" ) this._callback( object, materials );
	}

};
	
})(THREE);
