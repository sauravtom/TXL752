var math = require('mathjs');
var hrstart = process.hrtime();


function calc(x)
{
    return math.cot(x) - d/b*math.sin(x)/4
}
function find_x(){
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


}
return mid
}
var hrend = process.hrtime(hrstart);
 console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000)
