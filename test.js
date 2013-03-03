function run( canvas ) {
	var width = canvas.width;
	var height = canvas.height;
	var r = 15;
	var ctx = canvas.getContext( "2d" );
	
	var points = [];
	for( var i=0; i<40;i++ ) {
		var point = {
			x: Math.random() * width,
			y: Math.random() * height,
			vx: Math.random() * 2 - 1,
			vy: Math.random() * 2 - 1
		};
		points.push( point );
	}
	
	var draw = function( ctx, points ) {
		ctx.clearRect(0,0,width,height);
		for( var i=0; i<points.length; i++ ) {
			var point = points[i];
			ctx.beginPath();
			ctx.arc( point.x - r, point.y-r, r*2, r*2, 0, Math.PI*2, true );
			ctx.closePath();
			ctx.stroke();
		}
	};
	
	var bounds = function( point ) {
		if( point.x >= width && point.vx > 0
			|| point.x <= 0 && point.vx < 0 ) {
			point.vx = -point.vx;
		}
		if( point.y >= height && point.vy > 0
			|| point.y <= 0 && point.vy < 0 ) {
			point.vy = -point.vy;
		}
	};

	var animate = function( points ) {
		for( var i=0; i<points.length; i++ ) {
			var point = points[i];
			point.x += point.vx;
			point.y += point.vy;
			bounds( point );
		}
	}
	
	var processFrame = function() {
		animate( points );
		draw( ctx, points, width, height );
		setTimeout( processFrame, 10 );
	};
	processFrame();
	
}
