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
var phiB = math.asin(math.sqrt(0.75)/math.sqrt(2))
var phiArray = []
phiB=0.558
for (var i = 0; i<100 ; i++)
{
    phi = phiB + (10*3.14/2 - phiB)/100*i
    x_arr.push(x(phi));
    y_arr.push(y(phi));
    phiArray.push(phi);
}
function findPeriod()
{
    zeroes = []
    for (var i = 0; i < x_arr.length; i++)
    {

        if (x_arr[i]>0 && x_arr[i+1]<0)
        {
            phi1 = phiArray[i]
            phi2 = phiArray[i+1]
            mid = (phi1+phi2)/2

            //console.log(y_arr[i]);
            //console.log(y_arr[i+1]);
            while(math.abs(x(mid))>0.01){
                if (x(mid)>0)
                {
                    phi1=mid
                }
                else {
                    phi2=mid
                }
                mid = (phi1+phi2)/2
            }
            zeroes.push(y(mid))
            if(zeroes.length==2)
            {
                break
            }
        }
    }
    //console.log(diff[0]-diff[1]);
    return zeroes[1]-zeroes[0]

}
console.log(x_arr.length);
console.log(findPeriod() + " add")
//var h1 = FF(3.14/2) - FF(3.14/6) - 2*(E(3.14/2) - E(3.14/6))
