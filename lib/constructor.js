THREE.Asset = function () {

	THREE.EventTarget.call( this );

};

THREE.Asset.prototype = {

	constructor: THREE.Asset,

	load: function ( file, callback ) {
		// variables
		var loader, src, ext;
		// save callback for later...
		this._callback = callback;
		ext = file.substr( file.lastIndexOf(".")+1 );
		// based on the extension initiate the appropriate loader
		switch( file ){
			case "bin":
				loader = new THREE.BinaryLoader( true );
				loader.load( file, this._loaded);
			break;
			case "obj":
				loader = new THREE.OBJMTLLoader();
				loader.load( file, file.substr(0, file.length-3) +'mtl', this._loaded);
			break;
			case "js":
				// assume this is the uncompressed version (lookup for a bin to make sure?)
				loader = new THREE.JSONLoader( true );
				loader.load( file, this._loaded);
			break;
		}

	},

	parse: function ( json ) {

	},

	_loaded: function ( object ) {
		if( typeof this._callback == "function" ) this._callback( object );
	}

};