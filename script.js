let card1 = document.querySelector("#card1");
let card2 = document.querySelector("#card2");
let card3 = document.querySelector("#card3");
let afterClickUI = document.querySelector("#afterClickUI")
let afterRedoBtnClickUI = document.querySelector("#redoClickUI")
let afterRedoBtnClickUI2 = document.querySelector("#redoClickUI2")
let afterRedoBtnClickUI3 = document.querySelector("#redoClickUI3")

const selectedValues = {};
const selectedValues2 = {};
const selectedValues3 = {};

// This function adds the values and text in the tags using tepmlate tag then append it in card
async function calculateFunc(cardId) {
  let card;
  let selectedValuesObj;
  let templateOfUiAfterRedo;
  let applyingEventsFunc;
  if (cardId === "1") {
    selectedValuesObj = selectedValues;
    templateOfUiAfterRedo = afterRedoBtnClickUI.content.cloneNode(true);
    card = card1;
    applyingEventsFunc = applyingEvents1
  } else if (cardId === "2") {
    selectedValuesObj = selectedValues2;
    templateOfUiAfterRedo = afterRedoBtnClickUI2.content.cloneNode(true);
    card = card2
    applyingEventsFunc = applyingEvents2
  } else if (cardId === "3") {
    selectedValuesObj = selectedValues3;
    templateOfUiAfterRedo = afterRedoBtnClickUI3.content.cloneNode(true);
    card = card3
    applyingEventsFunc = applyingEvents3
  }

  if (Object.keys(selectedValuesObj).length === 0) {
    alert("Please select all thing")
  } else {
    const { carNewOrOdd, carVendor, carName, carResidential, carDeposit, carTenure, carDelievery } = selectedValuesObj

    // Getting the data about car
    let carDetails = await gettingCarData(carName);
    const { engine, price } = carDetails

    // calculation car values
    let tenure = Number(carTenure) * 12;
    let securityDeposit = Math.ceil(Number(price) * (Number(carDeposit) / 100))
    let upfront = securityDeposit + 3100;
    let rentPerMonthValue = rentPerMonth(price, upfront, tenure, engine)

    let templateOfUIAfterClick = afterClickUI.content.cloneNode(true);

    templateOfUIAfterClick.querySelector("#carName").textContent = `${carName} ${engine}cc`
    templateOfUIAfterClick.querySelector("#carPrice").textContent = `Rs.${price}`
    templateOfUIAfterClick.querySelector("#tenure").textContent = `${tenure}`
    templateOfUIAfterClick.querySelector("#residential").textContent = `${carResidential}%`
    templateOfUIAfterClick.querySelector("#securityDeposit").textContent = `Rs. ${securityDeposit}(${carDeposit}%)`
    templateOfUIAfterClick.querySelector("#upfront").textContent = `Rs.${upfront}`
    templateOfUIAfterClick.querySelector("#rentPerMonth").textContent = `Rs.${rentPerMonthValue}`
    templateOfUIAfterClick.querySelector("#redoBtn").addEventListener("click", () => {

      templateOfUiAfterRedo.querySelector(".calculate__btn").addEventListener("click", () => {
        calculateFunc(cardId)

      })
      card.innerHTML = ""
      card.appendChild(templateOfUiAfterRedo)
      applyingEventsFunc()
    })
    card.innerHTML = ""
    card.appendChild(templateOfUIAfterClick)
  }
}
//  Selecting all the dropdowns and adding the event listeners on it  to add it value in object
function applyingEvents1() {
  let dropdown__Divs = document.querySelector(".dropdowns_div")
  let carVendor1 = document.querySelector("#car__vendor1");
  let carName1 = document.querySelector("#car__name1");
  let carTenure1 = document.querySelector("#car__tenure1");
  let carDeposit1 = document.querySelector("#car__deposit1");
  let carResidential1 = document.querySelector("#car__residential1");
  let carDelievery1 = document.querySelector("#car__delievery1");
  let carField1 = document.querySelector("#car__field1");

  carField1.addEventListener("change", (e) => {
    selectedValues["carNewOrOdd"] = e.target.value;
    if (selectedValues["carNewOrOdd"] === "old") {
      const lastChild = dropdown__Divs.lastElementChild;
      if (lastChild.id === "car__delievery1") {
        dropdown__Divs.removeChild(lastChild)
      } else {
        console.log("Not matched");
      }
    } else if (selectedValues["carNewOrOdd"] === "new") {
      if (!(dropdown__Divs.contains(carDelievery1))) {
        dropdown__Divs.appendChild(carDelievery1)
      }
    }
  })
  carVendor1.addEventListener("change", async (e) => {
    selectedValues["carVendor"] = e.target.value;
    let id = Number(carVendor1.parentElement.getAttribute("data-id"))
    await fetchingData(e.target.value, id)
  })
  carName1.addEventListener("change", (e) => {
    selectedValues["carName"] = e.target.value;
  })
  carResidential1.addEventListener("change", (e) => {
    selectedValues["carResidential"] = e.target.value;
  })
  carDeposit1.addEventListener("change", (e) => {
    selectedValues["carDeposit"] = e.target.value;
  })
  carTenure1.addEventListener("change", (e) => {
    selectedValues["carTenure"] = e.target.value;
  })
  carDelievery1.addEventListener("change", (e) => {
    selectedValues["carDelievery"] = e.target.value;
  })
}
function applyingEvents2() {
  let dropdown__Divs2 = document.querySelector(".dropdowns_div2")
  let carVendor2 = document.querySelector("#car__vendor2");
  let carName2 = document.querySelector("#car__name2");
  let carTenure2 = document.querySelector("#car__tenure2");
  let carDeposit2 = document.querySelector("#car__deposit2");
  let carResidential2 = document.querySelector("#car__residential2");
  let carDelievery2 = document.querySelector("#car__delievery2");
  let carField2 = document.querySelector("#car__field2");

  carField2.addEventListener("change", (e) => {
    selectedValues2["carNewOrOdd"] = e.target.value;
    if (selectedValues2["carNewOrOdd"] === "old") {
      const lastChild = dropdown__Divs2.lastElementChild;
      console.log(lastChild);
      if (lastChild.id === "car__delievery2") {
        dropdown__Divs2.removeChild(lastChild)
      } else {
        console.log("Not matched");
      }
    } else if (selectedValues2["carNewOrOdd"] === "new") {
      if (!(dropdown__Divs2.contains(carDelievery2))) {
        dropdown__Divs2.appendChild(carDelievery2)
      }
    }
  })
  carVendor2.addEventListener("change", async (e) => {
    selectedValues2["carVendor"] = e.target.value;
    let id = Number(carVendor2.parentElement.getAttribute("data-id"))
    await fetchingData(e.target.value, id)
  })
  carName2.addEventListener("change", (e) => {
    selectedValues2["carName"] = e.target.value;
  })
  carResidential2.addEventListener("change", (e) => {
    selectedValues2["carResidential"] = e.target.value;
  })
  carDeposit2.addEventListener("change", (e) => {
    selectedValues2["carDeposit"] = e.target.value;
  })
  carTenure2.addEventListener("change", (e) => {
    selectedValues2["carTenure"] = e.target.value;
  })
  carDelievery2.addEventListener("change", (e) => {
    selectedValues2["carDelievery"] = e.target.value;
  })

}

function applyingEvents3() {
  let dropdown__Divs3 = document.querySelector(".dropdowns_div3")
  let carVendor3 = document.querySelector("#car__vendor3");
  let carName3 = document.querySelector("#car__name3");
  let carTenure3 = document.querySelector("#car__tenure3");
  let carDeposit3 = document.querySelector("#car__deposit3");
  let carResidential3 = document.querySelector("#car__residential3");
  let carDelievery3 = document.querySelector("#car__delievery3");
  let carField3 = document.querySelector("#car__field3");

  carField3.addEventListener("change", (e) => {
    selectedValues3["carNewOrOdd"] = e.target.value;
    if (selectedValues3["carNewOrOdd"] === "old") {
      const lastChild = dropdown__Divs3.lastElementChild;
      if (lastChild.id === "car__delievery3") {
        dropdown__Divs3.removeChild(lastChild)
      } else {
        console.log("Not matched");
      }
    } else if (selectedValues3["carNewOrOdd"] === "new") {
      if (!(dropdown__Divs3.contains(carDelievery3))) {
        dropdown__Divs3.appendChild(carDelievery3)
      }
    }
  })
  carVendor3.addEventListener("change", async (e) => {
    selectedValues3["carVendor"] = e.target.value;
    let id = Number(carVendor3.parentElement.getAttribute("data-id"))
    await fetchingData(e.target.value, id)
  })
  carName3.addEventListener("change", (e) => {
    selectedValues3["carName"] = e.target.value;
  })
  carResidential3.addEventListener("change", (e) => {
    selectedValues3["carResidential"] = e.target.value;
  })
  carDeposit3.addEventListener("change", (e) => {
    selectedValues3["carDeposit"] = e.target.value;
  })
  carTenure3.addEventListener("change", (e) => {
    selectedValues3["carTenure"] = e.target.value;
  })
  carDelievery3.addEventListener("change", (e) => {
    selectedValues3["carDelievery"] = e.target.value;
  })
}

function applyingEvents() {
  applyingEvents1();
  applyingEvents2();
  applyingEvents3();
}

// Applying Events on all three calculate Buttons
function applyingCalculateEvent() {
  document.querySelectorAll(".calculate__btn").forEach((elem) => {
    elem.addEventListener("click", () => {
      calculateFunc(elem.dataset.card)
    })
  })
}

applyingEvents();
applyingCalculateEvent();

// Getting data about car by passing it name as an argument.
async function gettingCarData(carName) {
  let res = await fetch("cars.json");
  let data = await res.json();
  let filterData = data.find((elem) => elem.name === carName)
  return filterData;
}

// calculating rent Month function
function rentPerMonth(price, upfront, totalMonths, cc) {
  if (cc < 1500) {
    return Math.ceil(((price - upfront) / totalMonths) * 0.15) //0.15 and 0.25 is the charges of bank which is also known as sood.
  } else if (cc > 1500) {
    return Math.ceil(((price - upfront) / totalMonths) * 0.25)
  }
}

// data fetching function based upon the vendor selected
async function fetchingData(carVendor, dropdownNo) {
  let res = await fetch("cars.json");
  let data = await res.json();
  let filterData = data.filter((elem) => elem.make === carVendor)
  let dropdown = document.querySelector(`#car__name${dropdownNo} select`)
  dropdown.innerHTML = ""

  let option = document.createElement("option");
  option.innerText = "Select car";

  dropdown.appendChild(option)
  filterData.forEach((elem) => {
    let option = document.createElement("option");
    option.setAttribute("value", elem.name)
    option.innerText = elem.name;
    dropdown.appendChild(option)
  })
}
// At Completion of code, lines are 380 and now it is 271.