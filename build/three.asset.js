/**
 * @name three.asset
 * @author makesites
 * Homepage: https://github.com/makesites/three-asset
 * Version: 0.0.2 (Fri, 29 Mar 2013 06:45:55 GMT)
 * @license MIT license
 */

if(typeof THREE !== "undefined") (function(THREE) {

THREE.Asset = function () {

	THREE.EventTarget.call( this );

};

THREE.Asset.prototype = {
	
	constructor: THREE.Asset,
	
	load: function ( url ) { 
	
	},
	
	parse: function ( json ) {
		
	}
	
};
	
})(THREE);
