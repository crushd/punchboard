import React from 'react';
import './App.css';

const rollMin = 1;
const rollMax = 10000;

let health = 3;
let punchHoles = 100;
let punchCount = 0;

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

class Box extends React.Component {
  
  playRoll = (min,max) => {
    return Math.floor(Math.random() * max) + min;
  }

  itemDrop = () => {
    const itemRoll = this.playRoll(1,5);
    const satoshiRoll = this.playRoll(1,3);

    if (itemRoll === 1) {
      //Bitcoin
      let coinName = "Bitcoin";
      console.log(satoshiRoll +" "+ coinName + " satoshi");
    } else if (itemRoll === 2) {
      //Ethereum
      let coinName = "Ethereum";
      console.log(satoshiRoll +" "+ coinName + " satoshi");
    } else if (itemRoll === 3) {
      //XRP
      let coinName = "XRP";
      console.log(satoshiRoll +" "+ coinName + " satoshi");
    } else if (itemRoll === 4) {
      //Litecoin
      let coinName = "Litecoin";
      console.log(satoshiRoll +" "+ coinName + " satoshi");
    } else if (itemRoll === 5) {
      //Dogecoin
      let coinName = "Dogecoin";
      console.log(satoshiRoll +" "+ coinName + " satoshi");
    } 
    
  }

  punchLoot = (boxNum) => {

    //console.log("");
    //console.log("Punch Loot");

    let randomRoll =  this.playRoll(rollMin,rollMax); // returns a random integer from rollMin to rollMax
    
    console.log("");
    console.log("Roll: " + randomRoll)

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
        this.itemDrop();
    } else if (randomRoll > nothingMin && randomRoll <= nothingMax) {
        console.log("You found nothing.");
        punchCount++;
    } else {
        console.log("Something else happened.")
    }
    console.log("Health: " + health);
    console.log("Punchcount: " + punchCount);
  }

  selectBox = () => {
    //alert(this.props.boxNum)
    //this.props.selectBox(this.props.row, this.props.col)
    this.punchLoot(this.props.boxNum);
  }
  
  render() {
    return (
		<div
			className={this.props.boxClass}
			id={this.props.id}
			onClick={this.selectBox}
			style={{textAlign:"center"}}
		>
        <i 
          className="fas fa-bullseye" 
          style={{paddingTop:"7px"}}>
        </i>
      </div>
    );
  }
}



class Grid extends React.Component {
  render() {
    const width = this.props.cols * 31;
    var rowsArr = []

    var boxClass = "";
    let boxNum = 1;

    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            boxNum={boxNum}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );

      boxNum++;
      }
    }

    return (
      <div className="grid" style={{width:width}}>
        {rowsArr}
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 20;
    this.cols = 20;
    this.health = 3;
    this.state = {
      generation:0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  render() {
    return (
      <div className="App">
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
      </div>
    );
  }
}

export default App;
