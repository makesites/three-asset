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
		src = file.substr( 0, file.lastIndexOf(".") );
		// based on the extension initiate the appropriate loader
		switch( ext ){
			case "bin":
				loader = new THREE.BinaryLoader( true );
				loader.load( src+'.js', this._loaded);
			break;
			case "obj":
				var obj = file;
				var mtl = src+'.mtl';
				loader = new THREE.OBJMTLLoader();
				loader.load( obj, mtl, this._loaded);
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