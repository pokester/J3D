J3D.BuiltinShaders = (function() {
	
	var shaders = {};

	var fetch = function(n) {
		if (!shaders[n]) {
			j3dlog("ERROR. Built-in shader " + n + " doesn't exist");
			return null;
		} else {
			return shaders[n].clone();
		}
	}

	var p = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Phong);
	p.color = J3D.Color.white;
    //p.su.specularIntensity = 0;
    //p.su.shininess = 0;
	p.hasColorTexture = false;
	shaders.Phong = p;
	
	var g = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Gouraud);
	g.color = J3D.Color.white;
    g.emissive = J3D.Color.black;
	//g.su.specularIntensity = 0;
	//g.su.shininess = 0;
	g.hasColorTexture = false;
	shaders.Gouraud = g;
	
	var l =  J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Lightmap);
	l.setup = function(shader, transform) {
	    for (var s in shader.uniforms) {
			if (s == "lightmapTexture") {
				J3D.ShaderUtil.setTexture(shader, 1, "lightmapTexture", J3D.LightmapAtlas[transform.lightmapIndex].tex);
			} else if(s == "lightmapAtlas") {
				gl.uniform4fv(shader.uniforms.lightmapAtlas.location, transform.lightmapTileOffset);
			}
	    }
		
		J3D.Shader.prototype.setup.call(this, shader, transform);
	}
	shaders.Lightmap = l;
	
	shaders.Reflective =  J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Reflective);
	shaders.Skybox =  J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Skybox);
	
	shaders.Normal2Color = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Normal2Color);

    var s = J3D.ShaderUtil.parseGLSL(J3D.ShaderSource.Selflit);
    s.color = J3D.Color.white;
    shaders.Selflit = s;

	return { shaders:shaders, fetch:fetch };
}());
