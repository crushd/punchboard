var fs = require("fs");
const axios = require('axios');

let simulations = process.argv[2];

if (simulations == null) {
    simulations = 1;
}

console.log(simulations);

let punchHoles = 100;
let punchCount = 0;
let simulationCount = 0;

let health = 3;

const rollMin = 1;
const rollMax = 10000; // 10000

// rolls between 1 to 1500
const healthProb  = 0.15; // 0.15
const healthMin = rollMin ; // 1
const healthMax = healthProb * rollMax; // 0.15 * 10000 = 1500
console.log(" ")
console.log("Health:  " + healthMin + " to " + healthMax);

// rolls between 1501 to 4500
const damageProb  = 0.30; // 0.30
const damageMin = healthMax + 1; // 1500 + 1 = 1501 
const damageMax = (rollMax * damageProb) + healthMax; // (10000 * 0.30) + 1500 = 4500
console.log("Damage:  " + damageMin + " to " + damageMax);

// rolls between 4501 to 7500
const itemProb    = 0.30; // 0.30
const itemMin = damageMax + 1; // 4500 + 1 = 4501 
const itemMax = (rollMax * itemProb) + damageMax; // (10000 * 0.30) + 4500 = 7500
console.log("Item:    " + itemMin + " to " + itemMax);

// rolls between 7501 to 10000
const nothingProb = 0.25; // 0.25
const nothingMin = itemMax + 1; // 7500 + 1 = 7501 
const nothingMax = (rollMax * nothingProb) + itemMax; // (10000 * 0.25) + 7500 = 10000
console.log("Nothing: " + nothingMin + " to " + nothingMax);

getCoin = (coinId) => {
    axios.get('https://api.coingecko.com/api/v3/coins/' + coinId)
    .then(function (response) {
        // handle success
        coinPrice = response.data.market_data.current_price.usd
        console.log(coinId + ": " + coinPrice);
      })
    .catch(function (error) {
        // handle error
        console.log(error);
      })
    // .finally(function () {
    //     // always executed
    //     console.log("finally")
    // });
  }



playRoll = (min,max) => {
    return Math.floor(Math.random() * max) + min;
}

buffRoll = () => {

    const buffs = ["bonusHeart","doubleSatoshi","reduceTransferFee50"];
    const buffIndex = Math.floor(Math.random() * buffs.length)
    const randomBuff = buffs[buffIndex];

    console.log(" - " + randomBuff + " (Id: " + buffIndex + ") ");

}

objectRoll = () => {

    const objects = ["red_gem","blue_gem","green_gem","yellow_gem","purple_gem","black_gem"];
    const objectIndex = Math.floor(Math.random() * objects.length)
    const randomObject = objects[objectIndex];

    console.log(" - " + randomObject + " (Id: " + objectIndex + ") ");

}

coinRoll = () => {

    const coins = ["bitcoin","ethereum","ripple","dogecoin","litecoin"];
    const coinIndex = Math.floor(Math.random() * coins.length)
    const randomCoin = coins[coinIndex];
    getCoin(randomCoin);
    
    let winAmount = (Math.random() * (0.0075 - 0.0001) + 0.0001).toFixed(4)

    console.log(" - " + winAmount + " USD in " + randomCoin + " (Id: " + coinIndex + ") ");

}

itemDrop = () => {

    let itemRoll =  playRoll(rollMin,rollMax); // returns a random integer from rollMin to rollMax
    console.log("Item roll: " + itemRoll)

    if (itemRoll >= 1 && itemRoll <= 8500) {
        console.log("-- A Shiny Object!")
        //console.log(itemRoll)
        objectRoll();
    } else if (itemRoll > 8501 && itemRoll <= 9750) {
        console.log("-- Some Coin!")
        //console.log(itemRoll)
        coinRoll();
    } else {
        console.log("-- A rare buff!")
        //console.log(itemRoll)
        buffRoll();
    }

}

    while (simulationCount < simulations) {

    simulationCount++;

    console.log("");
    console.log("");
    console.log("======================================");
    console.log("Simulation: " + simulationCount);
    console.log("======================================");

    // reset the simulator
    let punchHoles = 100;
    let punchCount = 0;
    let health = 3;

    while (punchCount < punchHoles && health > 0) {

        const randomRoll = playRoll(rollMin,rollMax);  // returns a random integer from rollMin to rollMax
        
        console.log(" ")
        console.log("Punch: " + punchCount);
        console.log("Your Roll: " + randomRoll);

        if (randomRoll >= healthMin && randomRoll <= healthMax) {
            console.log("You found a heart!");
            health++;
            punchCount++;
        } else if (randomRoll > damageMin && randomRoll <= damageMax) {
            console.log("Ouch! You took Damage!");
            health--;
            punchCount++;
        } else if (randomRoll > itemMin && randomRoll <= itemMax) {
            console.log("You found an item!");
            punchCount++;
            itemDrop();

        } else if (randomRoll > nothingMin && randomRoll <= nothingMax) {
            console.log("You found nothing.");
            punchCount++;
        } else {
            console.log("Something else happened.")
        }

        console.log("Your Health: " + health);    
    }
}

