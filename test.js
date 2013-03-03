function run( canvas ) {
	var width = canvas.width;
	var height = canvas.height;
	var r = 25;
	var ctx = canvas.getContext( "2d" );
	
	var points = [];
	for( var i=0; i<10;i++ ) {
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
			if( point.collide ) {
				ctx.strokeStyle = "red";
			} else {
				ctx.strokeStyle = "black";
			}
			ctx.beginPath();
			ctx.arc( point.x, point.y, r, 0, 2*Math.PI );
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

	var collide = function( points ) {
		var i;
		for( i=0; i<points.length; i++ ) {
			points[i].collide = false;
		}
		for( i=0; i<points.length; i++ ) {
			var p1 = points[i];
			for( var j=i+1; j<points.length; j++ ) {
				var p2 = points[j];
				var dx = p2.x-p1.x;
				var dy = p2.y-p1.y;
				var len = Math.sqrt( dx*dx + dy*dy );
				if( len < 2 * r ) {
					p1.collide = true;
					p2.collide = true;
				}
			}
		}
	};
	
	var animate = function( points ) {
		for( var i=0; i<points.length; i++ ) {
			var point = points[i];
			point.x += point.vx;
			point.y += point.vy;
			bounds( point );
		}
		collide( points );
	}
	
	var processFrame = function() {
		animate( points );
		draw( ctx, points, width, height );
		setTimeout( processFrame, 10 );
	};
	processFrame();
	
}
