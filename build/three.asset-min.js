"undefined"!=typeof THREE&&function(a){a.Asset=function(){a.Loader.call(this)},a.Asset.prototype={constructor:a.Asset,load:function(t,n){var e,o,s,c=this;switch(this._callback=n,s=t.substr(t.lastIndexOf(".")+1),o=t.substr(0,t.lastIndexOf(".")),s){case"bin":e=new a.BinaryLoader(!0),e.load(o+".js",function(){c._loaded.apply(c,arguments)});break;case"obj":var l=t,d=o+".mtl";e=new a.OBJMTLLoader,e.load(l,d,function(){c._loaded.apply(c,arguments)});break;case"js":e=new a.JSONLoader(!0),e.load(t,function(){c._loaded.apply(c,arguments)})}},parse:function(){},_loaded:function(a,t){"function"==typeof this._callback&&this._callback(a,t)}}}(THREE);