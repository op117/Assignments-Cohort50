/*
Full description at:https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-6-using-the-browser-debugger
*/

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}

function addTableRow(table, label, value) {
  const tr = createAndAppend('tr', table);
  createAndAppend('th', tr, { text: label });
  createAndAppend('td', tr, { text: value });
}

function renderLaureate(ul, { knownName, birth, death }) {
  const li = createAndAppend('li', ul);
  const table = createAndAppend('table', li);

  addTableRow(table, 'Name', knownName.en);
  const birthPlace = birth.place && birth.place.locationString && birth.place.locationString.en
    ? birth.place.locationString.en
    : "Unknown location";
  addTableRow(table, 'Birth', `${birth.date}, ${birthPlace}`);

  if (death) {
    const deathPlace = death.place && death.place.locationString && death.place.locationString.en
      ? death.place.locationString.en
      : "Unknown location";
    addTableRow(table, 'Death', `${death.date}, ${deathPlace}`);
  } else {
    addTableRow(table, 'Death', 'Still alive');
  }
}

function renderLaureates(laureates) {
  const ul = createAndAppend('ul', document.body);
  laureates.forEach((laureate) => renderLaureate(ul, laureate));
}

async function fetchAndRender() {
  try {
    const data = await getData(
      'https://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    if (data && Array.isArray(data.laureates)) {
      renderLaureates(data.laureates);
    } else {
      console.error('Laureates data is not available or is not an array.');
    }
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

window.addEventListener('load', fetchAndRender);
