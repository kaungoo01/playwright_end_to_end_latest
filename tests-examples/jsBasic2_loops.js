//Loop --If condition TRUE it will run ONE TIME
const flag = true;

if(!flag){   //Note: I didn't change the value BUT the condition!
    console.log('Condition Satisfied!')
}

else{
    console.log('Condition NOT Satisfied!')
}

//While Loop --If condition TRUE it will run FOREVER
let a = 1
while(a < 10){
    a++
    console.log(a)
    
}

//do while -- one round of loop will RUN before the while loop comes in.

//For Loop -- 
for(let k =10; k <=20; k++){
    console.log(k);
}

//NOTE: Use For Loop, When we know how many times we need to loop.
//NOTE: Use While Loop, When we dont really know how many times to loop.
//While Loop will use if want to evaluated, any kind of expression.

console.log('###############2468and10#######################')

//From 1 to 10, give me commom multipler of 10
//1st just get 2,4,6,8,10

for(let k = 1; k <=10 ; k++){
    if(k%2 == 0){
        console.log(k)
    }
}

console.log('################AND######################')

//From 1 to 10, give me commom multipler of 10
// just get 2 and 10, USE AND operator

for(let k = 1; k <=10 ; k++){
    if(k%2 == 0 && k%5 == 0){  //&& = AND 
        console.log(k)
    }
}

console.log('################OR######################')

//From 1 to 10, give me commom multipler of 10
// just get 2 OR 10, USE OR || operator

for(let k = 1; k <=10 ; k++){
    if(k%2 == 0 || k%5 == 0){  //&& = AND 
        console.log(k)
    }
}

console.log('################AND first 3######################')

//From 1 to 10, give me commom multipler of 10
// just get 2 and 10, USE AND operator

//Create a counter
n =0;

for(let k = 1; k <= 100 ; k++){
    if(k%2 == 0 && k%5 == 0){  //&& = AND 
        console.log(k)
        
        n++ //start counting
        //Add a condition
        if(n==3)
            break
    }
}