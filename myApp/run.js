var http = require('http');
var math = require('mathjs');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
var math = require('mathjs');
var hrstart = process.hrtime();


function calc(x)
{
    return math.cot(x) - math.sin(x)/4
}
function find_x()
{
    var start = 0
    var end = Math.PI/2

    var precision = 0.001
    start = start + precision
    end = end - precision

    while (end - start > precision)
    {
        var mid = (start + end)/2
        console.log((mid));
        if(calc(mid)<0)
        {
            end = mid
        }
        else
        {
            start = mid
        }
        console.log(mid);
    }
    return mid
}
// find_x()
var hrend = process.hrtime(hrstart);
console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000)

 function dif(x)
 {
     return math.sin(x)
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
var x_arr= []
var y_arr= []
for (var i = 0; i<100 ; i++)
{
    phi = 0.558 + (6*3.14/2 - 0.558)/100*i
    x_arr.push(phi);
    y_arr.push(phi);
    console.log(x(phi));
}
