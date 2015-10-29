
var container;

var camera, scene, renderer, controls;

init();
animate();

function init() {

	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.style.color = '#fff';
	info.style.link = '#f80';
	info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> warp-interlock webgl - geometry extrude shapes';
	document.body.appendChild( info );

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0x222222 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 0, 0, 1000 );

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.minDistance = 20;
	controls.maxDistance = 2200;

	scene.add( new THREE.AmbientLight( 0xeee) );

	var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	scene.add( light );


	         	// angleOfBinder
	var a=22,ar=2
	var b = a/ar
	var minorBinderRad = b
	var majorBinderRad = b

	var fpi = 1/(2*majorBinderRad + 2*a)
	var bpi = 1/(2*majorBinderRad + 2*a)
	var interLayerDistance = (4*b)
	var noOfLayers = 3
	var noOfRepeats = 7

	console.log(find_x(minorBinderRad,b)+ " sd")
	var x=find_x(minorBinderRad,b)-a/(b*4)
	//x=Math.PI/6
	console.log(x + " angle")
	//stuffers
var y = math.acot((a/b)*math.tan(x))
var lambda= (b*math.sin(y)/math.tan(x))-(a-a*math.cos(y))
console.log(8*lambda)
console.log(a)
console.log(y)
console.log(math.sin(x))
console.log(math.csc(x))
var spi = 1/(2*(a+minorBinderRad*math.csc(x)))

	for (var i=0; i<noOfLayers ; i++ )
	{
		for(var j=0; j<noOfRepeats ; j++)
		{
			if(i%2==0){
			var closedSpline = new THREE.SplineCurve3( [
				new THREE.Vector3( 1/spi*j, interLayerDistance*i, -a ),
				new THREE.Vector3( 1/spi*j, interLayerDistance*i, (noOfRepeats-1)/fpi + a)
			] );
			}else{
			var closedSpline = new THREE.SplineCurve3( [
				new THREE.Vector3( 1/spi*j + a+minorBinderRad*math.csc(x), interLayerDistance*i, -a ),
				new THREE.Vector3( 1/spi*j +a+minorBinderRad*math.csc(x), interLayerDistance*i, (noOfRepeats-1)/fpi + a)
			] );
			}
			var extrudeSettings = {
				steps			: 100,
				bevelEnabled	: false,
				extrudePath		: closedSpline
			};

			var shape = new THREE.Shape();
			shape.moveTo(0,a);
			shape.quadraticCurveTo( b,a, b,0 );
			shape.quadraticCurveTo( b,-a, 0,-a);
			shape.quadraticCurveTo(-b,-a, -b,0 );
			shape.quadraticCurveTo( -b,a, 0,a);


			var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings);

			var material = new THREE.MeshLambertMaterial( { color: 0xff00ff, wireframe: false } );

			var mesh = new THREE.Mesh( geometry, material );

			scene.add( mesh );

		}
	}
	var hypo=minorBinderRad/math.sin(x+y)
	var z= Math.PI/2-x;
	var ex_x=(a*math.cos(y)+minorBinderRad*math.sin(x))
	var ex_y=(b*math.sin(y)+minorBinderRad*math.cos(x))
	// binders
	// for(var i=0 ; i<noOfRepeats-1 ; i++)
for(var i=0 ; i<6; i++)
	{
		var binderPoints = []


		// for(var j=0; j<=(noOfRepeats-1)/4 ; j++)
		for(var j=0; j<(noOfRepeats-1)/4 ; j++)
		{

			var dist = 4*b

			if(i%4 == 0 )
			{

								var curve = new THREE.EllipseCurve( 4/spi*j, 0, // ax, aY
												a+minorBinderRad, 2*minorBinderRad, // xRadius, yRadius
											 y+Math.PI,-y,// aStartAngle, aEndAngle
												false, // aClockwise
												0 // aRotation
												)
								var pts=[]
								pts=pts.concat(curve.getPoints(10))
								//2D to 3D conversion
								var points3d=[]
								for(var k=0;k<11;k++)
								{
									points3d = points3d.concat([new THREE.Vector3(pts[k].x,pts[k].y,2*a + 1/(bpi)*i)])
								}
//[new THREE.Vector3(pts[10].x,pts[10].y,2*a + 1/(bpi)*i),new THREE.Vector3()]

//points3d = points3d.concat([new THREE.Vector3(ex_x+ 4/spi*j,-ex_y+ 0,2*a + 1/(bpi)*i)])

points3d = points3d.concat([new THREE.Vector3(a+minorBinderRad*math.csc(x)+b/2 + 4/spi*j, b/2,2*a + 1/(bpi)*i),
									new THREE.Vector3(3*a+3*minorBinderRad*math.csc(x)-b/2 + 4/spi*j, (noOfLayers-1)*(4*b) -b/2,2*a + 1/(bpi)*i)])

//points3d = points3d.concat([new THREE.Vector3(-ex_x +4*a+4*minorBinderRad*math.csc(x) + 4/spi*j, (noOfLayers-1)*(4*b)+ex_y ,2*a + 1/(bpi)*i)])

									var curve2 = new THREE.EllipseCurve( (2*a+2*minorBinderRad*math.csc(x))*(2)+4/spi*j, (noOfLayers-1)*(4*b), // ax, aY
													a+minorBinderRad, 2*minorBinderRad, // xRadius, yRadius
												 -y+Math.PI,y,// aStartAngle, aEndAngle
													true, // aClockwise
													0 // aRotation
													)
					var pts2=[]
					pts2=pts2.concat(curve2.getPoints(10))
					//2D to 3D conversion
					//var points3d=[]
					for(var k=0;k<11;k++)
					{
						points3d = points3d.concat([new THREE.Vector3(pts2[k].x,pts2[k].y,2*a + 1/(bpi)*i)])
					}
				//	points3d = points3d.concat([						new THREE.Vector3(ex_x +4*(a+minorBinderRad*math.csc(x))+4/spi*j, (noOfLayers-1)*(4*b) + ex_y ,2*a + 1/(bpi)*i)])
						points3d = points3d.concat([new THREE.Vector3(5*(a+minorBinderRad*math.csc(x))+b/2 + 4/spi*j, (noOfLayers-1)*(4*b)-b/2,2*a + 1/(bpi)*i),
															new THREE.Vector3(7*a+7*minorBinderRad*math.csc(x)-b/2 + 4/spi*j, 0+b/2 ,2*a + 1/(bpi)*i)])
					//	points3d = points3d.concat([new THREE.Vector3(-ex_x+8*(a+minorBinderRad*math.csc(x)) +4/spi*j, -ex_y ,2*a + 1/(bpi)*i)])


//


//
binderPoints = binderPoints.concat(points3d)

			}
			else if(i%4==1)
			{
				var points3d=[]
				if(j!=0){
				var curve = new THREE.EllipseCurve( (2*a + 2*minorBinderRad*math.csc(x))*(-1)+4/spi*j, (noOfLayers-1)*(4*b), // ax, aY
								a+minorBinderRad, 2*minorBinderRad, // xRadius, yRadius
							 -y+Math.PI,y,// aStartAngle, aEndAngle
								true, // aClockwise
								0 // aRotation
								)
				var pts=[]
				pts=pts.concat(curve.getPoints(10))
				//2D to 3D conversion

				for(var k=0;k<11;k++)
				{
					points3d = points3d.concat([new THREE.Vector3(pts[k].x,pts[k].y,2*a + 1/(bpi)*i)])
				}
}
			//	points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+ex_x + 4/spi*j, (noOfLayers-1)*(4*b)+ex_y,2*a + 1/(bpi)*i)])
points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+a+minorBinderRad*math.csc(x)+b/2 + 4/spi*j,(noOfLayers-1)*(4*b)-b/2,2*a + 1/(bpi)*i),
	new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+3*a+3*minorBinderRad*math.csc(x)-b/2 + 4/spi*j, 0 +b/2 ,2*a + 1/(bpi)*i)])

				//	points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)-ex_x +4*a+4*minorBinderRad*math.csc(x) + 4/spi*j, -ex_y  ,2*a + 1/(bpi)*i)])

					var curve2 = new THREE.EllipseCurve( (2*a + 2*minorBinderRad*math.csc(x))*(-1)+(2*a+2*minorBinderRad*math.csc(x))*(2)+4/spi*j, 0, // ax, aY
									a+minorBinderRad, 2*minorBinderRad, // xRadius, yRadius
								 y+Math.PI,-y,// aStartAngle, aEndAngle
									false, // aClockwise
									0 // aRotation
									)
				var pts2=[]
				pts2=pts2.concat(curve2.getPoints(10))
				//2D to 3D conversion
				//var points3d=[]
				for(var k=0;k<11;k++)
				{
				points3d = points3d.concat([new THREE.Vector3(pts2[k].x,pts2[k].y,2*a + 1/(bpi)*i)])
				}
				//points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+ex_x +4*(a+minorBinderRad*math.csc(x))+4/spi*j, -ex_y ,2*a + 1/(bpi)*i)])
points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+5*(a+minorBinderRad*math.csc(x))+4/spi*j+b/2,0+b/2 ,2*a + 1/(bpi)*i),
	new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+7*(a+minorBinderRad*math.csc(x)) -b/2+4/spi*j, (noOfLayers-1)*(4*b) -b/2 ,2*a + 1/(bpi)*i)])
				//points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)-ex_x+8*(a+minorBinderRad*math.csc(x)) +4/spi*j, (noOfLayers-1)*(4*b) + ex_y ,2*a + 1/(bpi)*i)])

//
binderPoints = binderPoints.concat(points3d)
			}			else if(i%4==2)
						{

							var curve = new THREE.EllipseCurve( 4/spi*j, (noOfLayers-1)*(4*b), // ax, aY
											a+minorBinderRad, 2*minorBinderRad, // xRadius, yRadius
										 -y+Math.PI,y,// aStartAngle, aEndAngle
											true, // aClockwise
											0 // aRotation
											)
							var pts=[]
							pts=pts.concat(curve.getPoints(10))
							//2D to 3D conversion
							var points3d=[]
							for(var k=0;k<11;k++)
							{
								points3d = points3d.concat([new THREE.Vector3(pts[k].x,pts[k].y,2*a + 1/(bpi)*i)])
							}
						//	points3d = points3d.concat([new THREE.Vector3(ex_x + 4/spi*j, (noOfLayers-1)*(4*b)+ex_y ,2*a + 1/(bpi)*i)])

							points3d = points3d.concat([new THREE.Vector3(a+minorBinderRad*math.csc(x)+4/spi*j+b/2, (noOfLayers-1)*(4*b)-b/2 ,2*a + 1/(bpi)*i),
								new THREE.Vector3( 3*a+3*minorBinderRad*math.csc(x)-b/2 + 4/spi*j, 0+b/2 ,2*a + 1/(bpi)*i)])
						//	points3d = points3d.concat([new THREE.Vector3(-ex_x +4*a+4*minorBinderRad*math.csc(x) + 4/spi*j, -ex_y ,2*a + 1/(bpi)*i)])

												var curve2 = new THREE.EllipseCurve( (2*a+2*minorBinderRad*math.csc(x))*(2)+4/spi*j, 0, // ax, aY
																a+minorBinderRad, 2*minorBinderRad, // xRadius, yRadius
															 y+Math.PI,-y,// aStartAngle, aEndAngle
																false, // aClockwise
																0 // aRotation
																)
								var pts2=[]
								pts2=pts2.concat(curve2.getPoints(10))
								//2D to 3D conversion
								//var points3d=[]
								for(var k=0;k<11;k++)
								{
									points3d = points3d.concat([new THREE.Vector3(pts2[k].x,pts2[k].y,2*a + 1/(bpi)*i)])
								}
							//	points3d = points3d.concat([new THREE.Vector3(ex_x +4*(a+minorBinderRad*math.csc(x))+4/spi*j, -ex_y ,2*a + 1/(bpi)*i)])
									points3d = points3d.concat([
										new THREE.Vector3(5*(a+minorBinderRad*math.csc(x))+4/spi*j+b/2, 0+b/2 ,2*a + 1/(bpi)*i),
										new THREE.Vector3(7*(a+minorBinderRad*math.csc(x)) +4/spi*j-b/2, (noOfLayers-1)*(4*b) -b/2,2*a + 1/(bpi)*i)])
								//	points3d = points3d.concat([new THREE.Vector3(-ex_x+8*(a+minorBinderRad*math.csc(x)) +4/spi*j, (noOfLayers-1)*(4*b) + ex_y ,2*a + 1/(bpi)*i)])


			binderPoints = binderPoints.concat(points3d)
		}			else if(i%4==3)
									{
										var points3d=[]
										if(j!=0){
										var curve = new THREE.EllipseCurve( (2*a + 2*minorBinderRad*math.csc(x))*(-1)+4/spi*j, 0, // ax, aY
														a+minorBinderRad, 2*minorBinderRad, // xRadius, yRadius
													 y+Math.PI,-y,// aStartAngle, aEndAngle
														false, // aClockwise
														0 // aRotation
														)
										var pts=[]
										pts=pts.concat(curve.getPoints(10))
										//2D to 3D conversion
									//	var points3d=[]
										for(var k=0;k<11;k++)
										{
											points3d = points3d.concat([new THREE.Vector3(pts[k].x,pts[k].y,2*a + 1/(bpi)*i)])
										}
}
					//	points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+ex_x + 4/spi*j, -ex_y ,2*a + 1/(bpi)*i)])
						points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+a+minorBinderRad*math.csc(x)+b/2 + 4/spi*j, 0+b/2 ,2*a + 1/(bpi)*i),
											new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1) +3*a+3*minorBinderRad*math.csc(x) + 4/spi*j-b/2, (noOfLayers-1)*(4*b) -b/2,2*a + 1/(bpi)*i)])

						//		points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)-ex_x +4*a+4*minorBinderRad*math.csc(x) + 4/spi*j, (noOfLayers-1)*(4*b)+ex_y ,2*a + 1/(bpi)*i)])

											var curve2 = new THREE.EllipseCurve( (2*a + 2*minorBinderRad*math.csc(x))*(-1)+(2*a+2*minorBinderRad*math.csc(x))*(2)+4/spi*j, (noOfLayers-1)*(4*b), // ax, aY
															a+minorBinderRad, 2*minorBinderRad, // xRadius, yRadius
														 -y+Math.PI,y,// aStartAngle, aEndAngle
															true, // aClockwise
															0 // aRotation
															)
							var pts2=[]
							pts2=pts2.concat(curve2.getPoints(10))
							//2D to 3D conversion
							//var points3d=[]
							for(var k=0;k<11;k++)
							{
								points3d = points3d.concat([new THREE.Vector3(pts2[k].x,pts2[k].y,2*a + 1/(bpi)*i)])
							}
							//points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+ex_x +4*(a+minorBinderRad*math.csc(x))+4/spi*j, (noOfLayers-1)*(4*b) + ex_y ,2*a + 1/(bpi)*i)])
								points3d = points3d.concat([
									new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+5*(a+minorBinderRad*math.csc(x))+4/spi*j+b/2, (noOfLayers-1)*(4*b)-b/2  ,2*a + 1/(bpi)*i),
									new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)+7*(a+minorBinderRad*math.csc(x)) +4/spi*j-b/2, 0+b/2,2*a + 1/(bpi)*i)])


								//	points3d = points3d.concat([new THREE.Vector3((2*a + 2*minorBinderRad*math.csc(x))*(-1)-ex_x+8*(a+minorBinderRad*math.csc(x)) +4/spi*j, -ex_y ,2*a + 1/(bpi)*i)])

						binderPoints = binderPoints.concat(points3d)
									}
		}
		var closedSpline = new THREE.SplineCurve3(binderPoints);

		var extrudeSettings = {
			steps			: 400,
			bevelEnabled	: false,
			extrudePath		: closedSpline
		};

		var shape = new THREE.Shape();
		shape.moveTo(0,b);
		shape.quadraticCurveTo( a,b, a,0 );
		shape.quadraticCurveTo( a,-b, 0,-b);
		shape.quadraticCurveTo( -a,-b, -a,0 );
		shape.quadraticCurveTo( -a,b, 0,b);


		var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings);

		var material = new THREE.MeshLambertMaterial( { color: 0x00ff00, wireframe: false } );

		var mesh = new THREE.Mesh( geometry, material );

		scene.add( mesh );


	}


	//fillers

	for (var i=0; i<noOfRepeats ; i++ )
	{
		for(var j=0; j<noOfLayers - 1 ; j++)
		{
			var closedSpline = new THREE.SplineCurve3( [
				new THREE.Vector3( -(a), interLayerDistance*j+2*b, 1/fpi*i ),
				new THREE.Vector3( (noOfRepeats-1)/spi, interLayerDistance*j+2*b, 1/fpi*i)
			] );

			var extrudeSettings = {
				steps			: 100,
				bevelEnabled	: false,
				extrudePath		: closedSpline
			};

			var shape = new THREE.Shape();
			shape.moveTo(0,b);
			shape.quadraticCurveTo( a,b, a,0 );
			shape.quadraticCurveTo( a,-b, 0,-b);
			shape.quadraticCurveTo( -a,-b, -a,0 );
			shape.quadraticCurveTo( -a,b, 0,b);


			var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings);

			var material = new THREE.MeshLambertMaterial( { color: 0x0000ff, wireframe: false } );

			var mesh = new THREE.Mesh( geometry, material );

			scene.add( mesh );

		}
	}


}
function calc(x,d,b)
{
    return math.cot(x) - d/b*math.sin(x)/4
}
function find_x(d,b){
var start = 0
var end = Math.PI/2

var precision = 0.00001
start = start + precision
end = end - precision

while (end - start > precision)
{
    var mid = (start + end)/2
    //console.log((mid));
    if(calc(mid,d,b)<0)
    {
        end = mid
    }
    else
    {
        start = mid
    }


}
return mid
}

function animate() {

	requestAnimationFrame( animate );

	controls.update();

	renderer.render( scene, camera );

}
