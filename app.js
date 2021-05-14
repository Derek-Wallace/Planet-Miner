var resource = 0
var moonResource = 0
var clickUpgrades = {
  pickaxe: {
    price: 10,
    quantity: 0,
    multiplier: 1,
  },
  jackhammer: {
    price: 50,
    quantity: 0,
    multiplier: 5,
  }
}
var autoUpgrades = {
  digger: {
    price: 500,
    quantity: 0,
    multiplier: 10,
  },
  excavator: {
    price: 2000,
    quantity: 0,
    multiplier: 100,
  }
}
update()

function mine(){
  resource += 1 + (clickUpgrades.pickaxe.quantity * clickUpgrades.pickaxe.multiplier) + (clickUpgrades.jackhammer.quantity * clickUpgrades.jackhammer.multiplier)
  saveGame()
}

function mineMoon(){
  resource += 1 + (clickUpgrades.pickaxe.quantity * clickUpgrades.pickaxe.multiplier) + (clickUpgrades.jackhammer.quantity * clickUpgrades.jackhammer.multiplier)
  saveGame()
}

function buyPickaxe(){
  if (resource >= clickUpgrades.pickaxe.price){
    clickUpgrades.pickaxe.quantity++
    resource -= clickUpgrades.pickaxe.price
    console.log("purchased pickaxe")
    clickUpgrades.pickaxe.price += 20
    saveGame()
  }
}

function buyJackhammer(){
  if (resource >= clickUpgrades.jackhammer.price){
    clickUpgrades.jackhammer.quantity++
    resource -= clickUpgrades.jackhammer.price
    console.log("purchased Jackhammer")
    clickUpgrades.jackhammer.price += 200
    saveGame()
  }
}

function buyDigger(){
  if (resource >= autoUpgrades.digger.price){
    autoUpgrades.digger.quantity++
    resource -= autoUpgrades.digger.price
    console.log("purchased Digger")
    autoUpgrades.digger.price += 500
    saveGame()
  }
}

function buyExcavator(){
  if (resource >= autoUpgrades.excavator.price){
    autoUpgrades.excavator.quantity++
    resource -= autoUpgrades.excavator.price
    console.log("purchased Excavator")
    autoUpgrades.excavator.price += 2000
    saveGame()
  }
}


function collectAutoUpgrades(){
  for (let key in autoUpgrades)
  resource += autoUpgrades[key].quantity * autoUpgrades[key].multiplier
  saveGame()
}

function startInterval(){
  let interval = setInterval(collectAutoUpgrades, 5000)
}

function update(){
  loadGame()
  document.getElementById("resource").innerHTML = `${resource}`
  document.getElementById("pickaxe-price").innerHTML = `${clickUpgrades.pickaxe.price}`
  document.getElementById("pickaxes").innerHTML = `${clickUpgrades.pickaxe.quantity}`
  document.getElementById("jackhammer-price").innerHTML = `${clickUpgrades.jackhammer.price}`
  document.getElementById("jackhammers").innerHTML = `${clickUpgrades.jackhammer.quantity}`
  document.getElementById("digger-price").innerHTML = `${autoUpgrades.digger.price}`
  document.getElementById("diggers").innerHTML = `${autoUpgrades.digger.quantity}`
  document.getElementById("excavator-price").innerHTML = `${autoUpgrades.excavator.price}`
  document.getElementById("excavators").innerHTML = `${autoUpgrades.excavator.quantity}`
}

function saveGame() {
  window.localStorage.setItem("resource", JSON.stringify(resource))
  window.localStorage.setItem("clickUpgrades", JSON.stringify(clickUpgrades))
  window.localStorage.setItem("autoUpgrades", JSON.stringify(autoUpgrades))
  update()
}

function loadGame() {
  let loadedProgress = JSON.parse(window.localStorage.getItem("resource"))
  if (loadedProgress) {
    resource = loadedProgress
  }
  let loadedCUpgrades = JSON.parse(window.localStorage.getItem("clickUpgrades"))
  if (loadedCUpgrades) {
    clickUpgrades = loadedCUpgrades
  }
  let loadedAUpgrades = JSON.parse(window.localStorage.getItem("autoUpgrades"))
  if (loadedAUpgrades) {
    autoUpgrades = loadedAUpgrades
  }
}
startInterval()