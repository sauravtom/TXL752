var math = require('mathjs');
var start = 0
var end = Math.PI/2


function calc(x)
{
    return math.cot(x) - math.sin(x)/4
}


var precision = 0.01
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
