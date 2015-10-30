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
    console.log(newSum);
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

console.log(integrate(dif,0,3.14,0.01))
