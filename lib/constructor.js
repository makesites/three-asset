THREE.Asset = function () {

	THREE.Loader.call( this );

};

THREE.Asset.prototype = {

	constructor: THREE.Asset,

	load: function ( source, callback ) {
		// variables
		var self = this;
		this.loaded = 0;
		// level of detail
		this.lod = new THREE.LOD();
		// save callback for later...
		this._callback = ( typeof callback == "function" ) ? callback : function(){};
		// sources should be an array
		this.sources = ( source instanceof Array ) ? source : [source];
		// exit now if no sources
		if( !this.sources.length ) return this._callback( this.lod );
		for(var i in this.sources ){
			var file = this.sources[i];
			this.loadSource(file, this._bind( this, this.parse ) );
		}

	},

	parse: function( geometry, materials ){
		var object = this.getObject( geometry, materials );
		var loaded = this.loaded;
		var distance = 10; // distance between each LOD level (make this variable...)
		this.lod.addLevel( object, loaded*distance);
		this.loaded++;
		// exit if all done
		if( this.loaded == this.sources.length ){
			this._callback( this.lod );
		}
	},

	loadSource: function ( file, callback ) {
		// variables
		var self = this;
		var loader, src, ext;
		//
		ext = file.substr( file.lastIndexOf(".")+1 );
		src = file.substr( 0, file.lastIndexOf(".") );
		// based on the extension initiate the appropriate loader
		switch( ext ){
			case "bin":
				loader = new THREE.BinaryLoader( true );
				loader.load( src+'.js', this._bind(this, callback) );
			break;
			case "obj":
				var obj = file;
				var mtl = src+'.mtl';
				loader = new THREE.OBJMTLLoader();
				loader.load( obj, mtl, this._bind(this, callback) );
			break;
			case "js":
				// assume this is the uncompressed version (lookup for a bin to make sure?)
				loader = new THREE.JSONLoader( true );
				loader.load( file, this._bind(this, callback) );
			break;
		}

	},

	getObject: function ( geometry, materials ) {

		var object = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(materials) );

		return object;
	},


	_bind:function ( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}

};