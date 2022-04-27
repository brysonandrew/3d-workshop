precision highp float;
varying vec2 uv;

vec3 cc(vec3 color, float factor, float factor2) // color modifier
{
	float w = color.x + color.y + color.z;
	return mix(color, vec3(w) * factor, w *factor2);
}

void main()
{
	float t = 49.068 * 20.0;
	vec3 c = vec3(0.0);
	float l = 0.0, z = t;
	for(int i = 0; i < 3; i++) {
		vec2 p = uv.xy;
		p -= 0.5;
		z += 0.03;
		l = length(p);
		p += p / (l * (sin(z) + 1.5) * max(0.2, abs(sin(l - z  * 2.0))));
        float j = float(i);
        float k = 0.005 * (mix(4.0 - j, j + 1.0, (sin(t / 1.1e1) + 1.0) / 2.0));
		c[i] = (cos(t / 2.1) + 1.01) * k / length((mod(p, 1.0) - 0.5));
	}

	c = cc(c, 2.0, 0.25);

  gl_FragColor = vec4( vec3(c.r), 0.04 );
}
