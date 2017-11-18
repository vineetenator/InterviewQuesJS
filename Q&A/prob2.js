/*
Problem : 2
=========================================================================================================

Write a program to find pairs of positive integers (A,B) whose sum is equal to the input number N (N < 10 power 6).

The conditions to be satisfied by A & B are:
● A has at least two digits and starts with a non-zero digit 
● B always has one digit less than A 
● B can start with 0 
● B is obtained from A by leaving out one digit.

The output should also indicate the number of such pairs. For example, if we input 1002 to the program, the output should be as follows: 

4 pairs found: 
906 + 96 = 1002 
911 + 91 = 1002 
951 + 51 = 1002 
1001 + 001 = 1002

--------------------------------------------------------------------------

Assuming input is provided in testdata.in with the following contents:
2
1002
11

Line 1: Number of test cases
Line 2 Onwards: The Number itself

Print the output in the following format.
---------------------------------------------------------------------------
TEST #1
4 pairs found
906 + 96 = 1002
911 + 91 = 1002
951 + 51 = 1002
TEST #2
1 pair found
10 + 1 = 11

Link to test file: https://dl.dropboxusercontent.com/s/fb85x5m8ycenpgb/testdata.in?dl=

*/

  function findBforA(a, sum){
    if(a < 10){ 
      return -1;
    }
    var strA = a.toString(),
        alen = strA.length,
        possibleB = -1;

    for(var i = 0; i < alen; i++){
      var newB = strA.slice(0, i)+strA.slice(i+1, alen);     
      if(Number(newB)+a == sum){
        possibleB = newB;
        break;
      }
    }
    return possibleB;
  }
function showPairs(pairsCount, pairs, caseNum){
  console.log("Test #"+caseNum);
  console.log(pairsCount+" pair found");
  if(pairsCount>0){
    for(var i = 0; i < pairsCount; i++){
      console.log(pairs[i].a+" + "+pairs[i].b+" = "+pairs[i].sum);
    }
  }
}
function findPair(sum, caseNumber){
  if(sum<10){ 
    return -1;
  }
  if(sum > Math.pow(10,6) ){
    console.warn("Number "+sum+" ( > 10 power 6) is too large.");
    return -1;
  }
  var m = Math.round(sum/2),
      pairsCount = 0,
      pairs = [];
  
  for(var a = sum; a>m; a--){
    var b = findBforA(a, sum);
    if(b != -1){
      pairsCount++;
      pairs.push({"a":a, "b":b, "sum":sum});
    }
  }
  
  showPairs(pairsCount, pairs, caseNumber);
}


findPair(1002, 1);

var request = require('request');
request.get('https://dl.dropboxusercontent.com/s/fb85x5m8ycenpgb/testdata.in?dl=', function (error, response, data) {
    if (!error && response.statusCode == 200) {
        //console.log(data);
        var lines = data.split('\n');
        var dataCount = lines[0];
        for(var i = 1;i < lines.length;i++){
            //console.log(lines[i]);
          findPair(parseInt(lines[i]), i);
        }
        console.info("All test Executed...");
    }
});

