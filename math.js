// math.js (expxorts a function)
function add (a , b){
    if (typeof a!== 'number' || typeof b!== 'number' ){
        throw new Error ('Inputs must be a number!');
    }
    return a + b;
}

function Subtract (a,b){
    return a - b;
}

module.exports = {add, subtract}; //Export objects 