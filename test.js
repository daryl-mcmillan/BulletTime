function run( canvas ) {

  var each = function( list, action ) {
    for( var i=0; i<list.length; i++ ) {
      action( list[i] );
    }
  };

	var width = canvas.width;
	var height = canvas.height;
	var r = 25;
	var ctx = canvas.getContext( "2d" );

	var points = [];
	for( var i=0; i<10;i++ ) {
		var point = {
			x: Math.random() * width,
			y: Math.random() * height,
			vx: Math.random() * 6 - 3,
			vy: Math.random() * 6 - 3,
			t: 1
		};
		points.push( point );
	}

	var draw = function( ctx, points ) {
		ctx.clearRect(0,0,width,height);
		each( points, function( point ) {
			if( point.collide ) {
				ctx.strokeStyle = "red";
			} else {
				ctx.strokeStyle = "black";
			}
			ctx.beginPath();
			ctx.arc( point.x, point.y, r, 0, 2*Math.PI );
			ctx.closePath();
			ctx.stroke();
		});
	};

	var applyBounds = function( point ) {
		if( point.x + r >= width && point.vx > 0
			|| point.x - r  <= 0 && point.vx < 0 ) {
			point.vx = -point.vx;
		}
		if( point.y + r >= height && point.vy > 0
			|| point.y -r <= 0 && point.vy < 0 ) {
			point.vy = -point.vy;
		}
	};

	var getForce = function( ratio ) {
		var inverse, curve;
		if( ratio < 0 ) {
			inverse = 1 + ratio;
			curve = inverse * inverse * inverse;
			return curve;
		} else {
			inverse = 1 - ratio;
			curve = inverse * inverse * inverse;
			return -curve;
		}
	};

	var applyCollisions = function( points ) {
		var i;
		each( points, function( point ) {
		  var nearest = 100000;
		  each( points, function( other ) {
		    if( point === other ) {
		      return;
		    }
				var dx = other.x-point.x;
				var dy = other.y-point.y;
				var len = Math.sqrt( dx*dx + dy*dy );
				nearest = Math.min( nearest, len );
				if( len < 2 * r ) {
					var ax = getForce( dx / 2 / r ) * 0.2;
					var ay = getForce( dy / 2 / r ) * 0.2;
					point.vx += ax;
					point.vy += ay;
				}
		  });
		  point.collide = nearest < 2 * r;
		  if( nearest < 4 * r ) {
		    point.t = 0.1;
		  } else {
		    point.t = 1.0;
		  }
		});
	};

	var animate = function( points ) {
		applyCollisions( points );
		for( var i=0; i<points.length; i++ ) {
			var point = points[i];
			applyBounds( point );
			point.x += point.vx * point.t;
			point.y += point.vy * point.t;
		}
	}

	var processFrame = function() {
		animate( points );
		draw( ctx, points, width, height );
		setTimeout( processFrame, 10 );
	};
	processFrame();

}
