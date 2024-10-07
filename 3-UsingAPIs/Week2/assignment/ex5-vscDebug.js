/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-5-using-the-vscode-debugger

Use the VSCode Debugger to fix the bugs
--------------------------------------------------------------- --------------*/
async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function renderLaureate({ knownName, birth, death }) {
  console.log(`\nName: ${knownName.en}`);

  const birthPlace = birth.place && birth.place.locationString && birth.place.locationString.en
    ? birth.place.locationString.en
    : "Unknown location";

  console.log(`Birth: ${birth.date}, ${birthPlace}`);

  if (death) {
    const deathPlace = death.place && death.place.locationString && death.place.locationString.en
      ? death.place.locationString.en
      : "Unknown location";

    console.log(`Death: ${death.date}, ${deathPlace}`);
    
  } else {
    console.log("Still alive");
  }
}

function renderLaureates(laureates) {
  laureates.forEach(renderLaureate);
}

async function fetchAndRender() {
  try {
    const data = await getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
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

fetchAndRender();
