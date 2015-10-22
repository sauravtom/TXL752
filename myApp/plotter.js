
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
	info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> webgl - geometry extrude shapes';
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


	var a=22,ar=2
	var b = a/ar
	var spi = 1/(2*(a+a/ar))
	var fpi = 1/(4*a)
	var bpi = 1/(4*a)
	var interLayerDistance = (4*b)
	var noOfLayers = 3
	var noOfRepeats = 7
	//stuffers

	for (var i=0; i<noOfLayers ; i++ )
	{

		for(var j=0; j<noOfRepeats ; j++)
		{
			var closedSpline = new THREE.SplineCurve3( [
				new THREE.Vector3( 1/spi*j, interLayerDistance*i, -a ),
				new THREE.Vector3( 1/spi*j, interLayerDistance*i, (noOfRepeats+1)/spi)
			] );

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


	// binders
	// for(var i=0 ; i<noOfRepeats-1 ; i++)
for(var i=0 ; i<noOfRepeats-1; i++)
	{
		var binderPoints = []


		// for(var j=0; j<=(noOfRepeats-1)/2 ; j++)
		for(var j=0; j<(noOfRepeats-1)/2 ; j++)
		{

			var dist = 4*b

			if(i%2 == 0)
			{
				var curve = new THREE.EllipseCurve( 2/spi*j, 0, // ax, aY
								a+b, 2*b, // xRadius, yRadius
							 Math.PI,0,// aStartAngle, aEndAngle
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
				points3d = points3d.concat([new THREE.Vector3(a+b + 2/spi*j, 2*b ,2*a + 1/(bpi)*i),
					new THREE.Vector3(a+b + 2/spi*j, (noOfLayers-1)*(4*b) - 2*b ,2*a + 1/(bpi)*i)])


				var curve2 = new THREE.EllipseCurve( (2*a+2*b)*(1) + 2/spi*j, (noOfLayers-1)*(4*b), // ax, aY
								a+b, 2*b, // xRadius, yRadius
							 Math.PI,0,// aStartAngle, aEndAngle
								true, // aClockwise
								0 // aRotation
								)
				var pts2=[]
				pts2=pts2.concat(curve2.getPoints(10))

				for(var k=0;k<11;k++)
				{
					points3d = points3d.concat([new THREE.Vector3(pts2[k].x,pts2[k].y,2*a + 1/(bpi)*i)])
				}

				points3d = points3d.concat([ new THREE.Vector3(3*(a+b) + 2/spi*j, (noOfLayers-1)*(4*b) - 2*b ,2*a + 1/(bpi)*i),
					new THREE.Vector3(3*(a+b) + 2/spi*j,2*b, 2*a + 1/(bpi)*i)])



binderPoints = binderPoints.concat(points3d)

			}
			else
			{
				var curve = new THREE.EllipseCurve( 2/spi*j, (noOfLayers-1)*4*b, // ax, aY
								a+b, 2*b, // xRadius, yRadius
							 Math.PI,0,// aStartAngle, aEndAngle
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

				points3d = points3d.concat([new THREE.Vector3(a+b + 2/spi*j, (noOfLayers-1)*(4*b) - 2*b ,2*a + 1/(bpi)*i),new THREE.Vector3(a+b + 2/spi*j, 2*b ,2*a + 1/(bpi)*i)])


				var curve2 = new THREE.EllipseCurve( (2*a+2*b)*(1)+2/spi*j, 0, // ax, aY
								a+b, 2*b, // xRadius, yRadius
							 Math.PI,0,// aStartAngle, aEndAngle
								false, // aClockwise
								0 // aRotation
								)
				var pts2=[]
				pts2=pts2.concat(curve2.getPoints(10))

				for(var k=0;k<11;k++)
				{
					points3d = points3d.concat([new THREE.Vector3(pts2[k].x,pts2[k].y,2*a + 1/(bpi)*i)])
				}

				points3d = points3d.concat([
					new THREE.Vector3(3*(a+b) + 2/spi*j,2*b, 2*a + 1/(bpi)*i)],new THREE.Vector3(3*(a+b) + 2/spi*j, (noOfLayers-1)*(4*b) - 2*b ,2*a + 1/(bpi)*i))


binderPoints = binderPoints.concat(points3d)
/*
				binderPoints = binderPoints.concat( new THREE.QuadraticBezierCurve3(
					new THREE.Vector3(-(a+b) + 2/spi*j, (noOfLayers-1)*(4*b) , 2*a + 1/(bpi)*i),
					new THREE.Vector3(0 + 2/spi*j, (noOfLayers-1)*(4*b) + dist,2*a + 1/(bpi)*i),
					new THREE.Vector3((a+b) + 2/spi*j ,(noOfLayers-1)*(4*b) ,2*a + 1/(bpi)*i)
				).getPoints(20).slice(1,18))

				binderPoints = binderPoints.concat([ new THREE.Vector3(a+b + 2/spi*j, (noOfLayers-1)*(4*b) - b/4,2*a + 1/(bpi)*i),
					new THREE.Vector3(a+b + 2/spi*j,b/4, 2*a + 1/(bpi)*i)])



				binderPoints = binderPoints.concat(new THREE.QuadraticBezierCurve3(
					new THREE.Vector3(a+b + 2/spi*j,  0 ,2*a + 1/(bpi)*i),
					new THREE.Vector3(2*(a+b) + 2/spi*j, -(dist),2*a + 1/(bpi)*i) ,
					new THREE.Vector3(3*(a+b) + 2/spi*j ,0,2*a + 1/(bpi)*i)
				).getPoints(20).slice(1,18))

				binderPoints = binderPoints.concat([new THREE.Vector3(3*(a+b) + 2/spi*j,-b/4, 2*a + 1/(bpi)*i),
					new THREE.Vector3(3*(a+b) + 2/spi*j, (noOfLayers-1)*(4*b) -b/4,2*a + 1/(bpi)*i)])


				binderPoints = binderPoints.concat(new THREE.QuadraticBezierCurve3(
					new THREE.Vector3(3*(a+b) + 2/spi*j, (noOfLayers-1)*(4*b)  ,2*a + 1/(bpi)*i),
					new THREE.Vector3(4*(a+b) + 2/spi*j,(noOfLayers-1)*(4*b)+ dist,2*a + 1/(bpi)*i) ,
					new THREE.Vector3(5*(a+b) + 2/spi*j ,(noOfLayers-1)*(4*b)  ,2*a + 1/(bpi)*i)
				).getPoints(20).slice(1,18))
				*/
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
/*

		var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings);
		//
		// var material = new THREE.MeshLambertMaterial( { color: 0x00ff00, wireframe: false } );
		//
		// var mesh = new THREE.Mesh( geometry, material );
		//
		// scene.add( mesh );
		// First we want to clone our original geometry.
// Just in case we want to get the low poly version back.
		var smooth = geometry.clone()

		// Next, we need to merge vertices to clean up any unwanted vertex.
		smooth.mergeVertices();

		var subdiv = 2;
    var modifier = new THREE.SubdivisionModifier( subdiv );

		// Apply the modifier to our cloned geometry.
		modifier.modify( smooth );

		// Finally, add our new detailed geometry to a mesh object and add it to our scene.
		var mesh = new THREE.Mesh( smooth, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ) );
		scene.add( mesh );
*/

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


function animate() {

	requestAnimationFrame( animate );

	controls.update();

	renderer.render( scene, camera );

}
