var resource = 0
var marsResource = 0
var mars = false
var martianHappiness = 100
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
    multiplier: 100,
  },
  excavator: {
    price: 2000,
    quantity: 0,
    multiplier: 500,
  }
}

var clickUpgradesMars = {
  lazerDrill: {
    price: 1000,
    quantity: 0,
    multiplier: 50,
  },
  martianExcavator: {
    price: 5000,
    quantity: 0,
    multiplier: 200,
  }

}
var autoUpgradesMars = {
  beamMiner: {
    price: 10000,
    quantity: 0,
    multiplier: 500,
  },
  martianTeam: {
    price: 20000,
    quantity: 0,
    multiplier: 1000,
  }
}

update()

function mine() {
  resource += 1 + (clickUpgrades.pickaxe.quantity * clickUpgrades.pickaxe.multiplier) + (clickUpgrades.jackhammer.quantity * clickUpgrades.jackhammer.multiplier)
  saveGame()
}

function mineMars() {
  marsResource += 1 + (clickUpgradesMars.lazerDrill.quantity * clickUpgradesMars.lazerDrill.multiplier) + (clickUpgradesMars.martianExcavator.quantity * clickUpgradesMars.martianExcavator.multiplier)
  saveGame()
}

function buyPickaxe() {
  if (resource >= clickUpgrades.pickaxe.price) {
    clickUpgrades.pickaxe.quantity++
    resource -= clickUpgrades.pickaxe.price
    clickUpgrades.pickaxe.price += 20
    saveGame()
  }
}

function buyJackhammer() {
  if (resource >= clickUpgrades.jackhammer.price) {
    clickUpgrades.jackhammer.quantity++
    resource -= clickUpgrades.jackhammer.price
    clickUpgrades.jackhammer.price += 200
    saveGame()
  }
}

function buyDigger() {
  if (resource >= autoUpgrades.digger.price) {
    autoUpgrades.digger.quantity++
    resource -= autoUpgrades.digger.price
    autoUpgrades.digger.price += 500
    saveGame()
  }
}

function buyExcavator() {
  if (resource >= autoUpgrades.excavator.price) {
    autoUpgrades.excavator.quantity++
    resource -= autoUpgrades.excavator.price
    autoUpgrades.excavator.price += 2000
    saveGame()
  }
}

function buyLazerDrill() {
  if (marsResource >= clickUpgradesMars.lazerDrill.price) {
    clickUpgradesMars.lazerDrill.quantity++
    marsResource -= clickUpgradesMars.lazerDrill.price
    clickUpgradesMars.lazerDrill.price += 200
    saveGame()
  }
}

function buyMartianExcavator() {
  if (marsResource >= clickUpgradesMars.martianExcavator.price) {
    clickUpgradesMars.martianExcavator.quantity++
    marsResource -= clickUpgradesMars.martianExcavator.price
    clickUpgradesMars.martianExcavator.price += 300
    saveGame()
  }
}

function buyBeamMiner() {
  if (marsResource >= autoUpgradesMars.beamMiner.price) {
    autoUpgradesMars.beamMiner.quantity++
    marsResource -= autoUpgradesMars.beamMiner.price
    autoUpgradesMars.beamMiner.price += 2000
    saveGame()
  }
}

function buyMartianTeam() {
  if (marsResource >= autoUpgradesMars.martianTeam.price) {
    autoUpgradesMars.martianTeam.quantity++
    marsResource -= autoUpgradesMars.martianTeam.price
    autoUpgradesMars.martianTeam.price += 5000
    saveGame()
  }
}


function collectAutoUpgrades() {
  for (let key in autoUpgrades){
    resource += autoUpgrades[key].quantity * autoUpgrades[key].multiplier
  }
  for (let key in autoUpgradesMars){
    marsResource += autoUpgradesMars[key].quantity * autoUpgradesMars[key].multiplier
  }
  saveGame()
}

function buyMars(){
  if (resource >= 1000000 && mars == false){
    mars = true
    document.getElementById("buy-mars").classList.add("d-none")
    document.getElementById("mars").classList.remove("d-none")
    resource -= 1000000
    saveGame()
    startIntervalHappiness()
  }
  else if (mars == true){
    document.getElementById("buy-mars").classList.add("d-none")
    document.getElementById("mars").classList.remove("d-none")
    saveGame()
    startIntervalHappiness()
  }
}

function exchange(){
  if (resource >= 100000){
  resource -= 100000
  marsResource += 1000
  saveGame()
  }
  alert("Insufficent funds")
}

function startInterval() {
  let interval = setInterval(collectAutoUpgrades, 5000)
}

function giveGifts(){
  if (martianHappiness > 0){
    martianHappiness += 10
    resource -= 100000
    saveGame()
  } 
  else {
    alert("they burnt your gift")
    resource -= 100000
    saveGame()
  }
}

function deployTroops(){
  if (martianHappiness == 0){
    martianHappiness = 50
    resource -= 1000000
    saveGame()
  }
  else if (martianHappiness > 0){
    martianHappiness = 0
    resource -= 1000000
    saveGame()
  }
}

function happinessIncrement(){
  if (martianHappiness == 0){
    document.getElementById("at-war").classList.remove("d-none")
    marsResource -= 100000
    saveGame()
  } 
  else if (martianHappiness > 0){document.getElementById("at-war").classList.add("d-none")
  martianHappiness--
  saveGame()
  }
}

function startIntervalHappiness() {
  let interval = setInterval(happinessIncrement, 5000)
}

function update() {
  loadGame()
  document.getElementById("resource").innerHTML = `${resource}`
  document.getElementById("mars-resource").innerHTML = `${marsResource}`
  document.getElementById("martian-happiness").innerHTML = `${martianHappiness}`
  document.getElementById("pickaxe-price").innerHTML = `${clickUpgrades.pickaxe.price}`
  document.getElementById("pickaxes").innerHTML = `${clickUpgrades.pickaxe.quantity}`
  document.getElementById("jackhammer-price").innerHTML = `${clickUpgrades.jackhammer.price}`
  document.getElementById("jackhammers").innerHTML = `${clickUpgrades.jackhammer.quantity}`
  document.getElementById("digger-price").innerHTML = `${autoUpgrades.digger.price}`
  document.getElementById("diggers").innerHTML = `${autoUpgrades.digger.quantity}`
  document.getElementById("excavator-price").innerHTML = `${autoUpgrades.excavator.price}`
  document.getElementById("excavators").innerHTML = `${autoUpgrades.excavator.quantity}`
  document.getElementById("lazerDrill-price").innerHTML = `${clickUpgradesMars.lazerDrill.price}`
  document.getElementById("lazerDrills").innerHTML = `${clickUpgradesMars.lazerDrill.quantity}`
  document.getElementById("martianExcavator-price").innerHTML = `${clickUpgradesMars.martianExcavator.price}`
  document.getElementById("martianExcavators").innerHTML = `${clickUpgradesMars.martianExcavator.quantity}`
  document.getElementById("beamMiner-price").innerHTML = `${autoUpgradesMars.beamMiner.price}`
  document.getElementById("beamMiners").innerHTML = `${autoUpgradesMars.beamMiner.quantity}`
  document.getElementById("martianTeam-price").innerHTML = `${autoUpgradesMars.martianTeam.price}`
  document.getElementById("martianTeams").innerHTML = `${autoUpgradesMars.martianTeam.quantity}`
}

function saveGame() {
  window.localStorage.setItem("resource", JSON.stringify(resource))
  window.localStorage.setItem("clickUpgrades", JSON.stringify(clickUpgrades))
  window.localStorage.setItem("autoUpgrades", JSON.stringify(autoUpgrades))
  window.localStorage.setItem("marsResource", JSON.stringify(marsResource))
  window.localStorage.setItem("clickUpgradesMars", JSON.stringify(clickUpgradesMars))
  window.localStorage.setItem("autoUpgradesMars", JSON.stringify(autoUpgradesMars))
  window.localStorage.setItem("mars", JSON.stringify(mars))
  window.localStorage.setItem("martianHappiness", JSON.stringify(martianHappiness))
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
  let loadedMarsResource = JSON.parse(window.localStorage.getItem("marsResource"))
  if (loadedMarsResource) {
    marsResource = loadedMarsResource
  }
  let loadedCUpgradesMars = JSON.parse(window.localStorage.getItem("clickUpgradesMars"))
  if (loadedCUpgradesMars) {
    clickUpgradesMars = loadedCUpgradesMars
  }
  let loadedAUpgradesMars = JSON.parse(window.localStorage.getItem("autoUpgradesMars"))
  if (loadedAUpgradesMars) {
    autoUpgradesMars = loadedAUpgradesMars
  }
  let loadedMars = JSON.parse(window.localStorage.getItem("mars"))
  if (loadedMars) {
    mars = loadedMars
  }
  let loadedHappiness = JSON.parse(window.localStorage.getItem("martianHappiness"))
  if (loadedHappiness) {
    martianHappiness = loadedHappiness
  }
}

startInterval()
