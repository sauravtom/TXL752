var container;

var camera, scene, renderer, controls;
var x_arr=[];
var y_arr=[];
var noOfLayers = 3
var noOfPieBy2 = 10
function createXnY(){
  for (var i = 0; i<100 ; i++)
  {
      phi = 0.558 + (noOfPieBy2*3.14/2 - 0.558)/100*i
      //console.log()
      x_arr[i]=x(phi)*100;
      y_arr[i]=y(phi)*100;
      console.log(x(phi));
  }
}
createXnY();
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
	info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> angle-interlock webgl - geometry extrude shapes';
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
	var a=45,ar=1
	var b = a/ar


	var fpi = .216+2.694307
	var bpi = .216+2.694307
	var interLayerDistance = (4*b)


	//stuffers
var spd = (.216+2.694307)*100/2

	for (var i=0; i<5 ; i++ )
	{
    var stufferPoints = []
		for(var j=0; j<1 ; j++)
		{
            //var pts=x_arr
    //  pts=pts.concat(curve.getPoints(10))
      //2D to 3D conversion
      var points3d=[]
      for(var k=0;k<x_arr.length;k++)
      {
        if (i%2 == 0)
        {
          points3d = points3d.concat([new THREE.Vector3(x_arr[k],y_arr[k] + spd,spd*i)])
        }
        else
        {
          points3d = points3d.concat([new THREE.Vector3(x_arr[k],y_arr[k],spd*i)])
        }
      }

      stufferPoints = stufferPoints.concat(points3d)

      var closedSpline = new THREE.SplineCurve3(stufferPoints);
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
  //fillers
  var fpd = (.216+2.694307)*100/2

  for (var i=0; i<5 ; i++ )
  {
    var fillerPoints = []
    for(var j=0; j<1 ; j++)
    {
            //var pts=x_arr
    //  pts=pts.concat(curve.getPoints(10))
      //2D to 3D conversion
      var points3d=[]
      for(var k=0;k<x_arr.length;k++)
      {
        if (i%2 == 0)
        {
          points3d = points3d.concat([new THREE.Vector3(x_arr[k]-fpd*3/2,fpd*i+fpd/2,y_arr[k] - fpd/2)])
        }
        else
        {
          points3d = points3d.concat([new THREE.Vector3(x_arr[k]+fpd*3/2,fpd*i+fpd/2,y_arr[k]+fpd/2)])
        }
      }

      fillerPoints = fillerPoints.concat(points3d)

      var closedSpline = new THREE.SplineCurve3(fillerPoints);
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




}
function integrate(dif,a,b,precision)
{
    newSum = (b-a)*(dif(a) + dif(b))/2
    sum = 0
    n = 1
    // console.log(newSum);
    do
    {
        sum = newSum
        newSum =0
        n = n*2
        for (var i = 0; i < n; i++)
        {

            newSum += (b-a)/n * (dif(a+(b-a)*i/n) + dif(a+(b-a)*(i+1)/n))/2
            // console.log((b-a)/n * (dif(a+(b-a)*i/n) + dif(a+(b-a)*(i+1)/n))/2);
            // process.exit()
        }
    }while(math.abs(newSum - sum) > precision)
    return newSum
}


function chotaF(phi)
{
    return 1/math.sqrt(1 - 0.75*0.75*math.pow(math.sin(phi),2))
}

function FF(phi)
{
    return integrate(chotaF,0,phi,0.0001)
}
function chotaE(phi)
{
    return math.sqrt(1 - 0.75*0.75*math.pow(math.sin(phi),2))
}

function E(phiB)
{
    return integrate(chotaE,0,phiB,0.0001)
}

function x(phi)
{
    return 2*0.75*math.cos(phi)
}
function y(phi)
{
    return FF(3.14/2) - FF(phi) - 2*(E(3.14/2) - E(phi))
}

function psiToPhi(psi)
 {
     return math.asin(math.sin(3.14/4 + psi/2)/0.75)
}


function animate() {

	requestAnimationFrame( animate );

	controls.update();

	renderer.render( scene, camera );

}
