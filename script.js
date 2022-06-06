// Chart and Guages Api fetch and rendering
const url = "https://cto-reading-api.herokuapp.com/post";


// Fetching Current Dataset of Readings
const fetchCurrentData = async () => {
  try {
    const response = await fetch(`${url}/current`);
    const currentDataSet = await response.json();

    const currentData = currentDataSet.map(({ current }) => current);

    return currentData;
  } catch (error) {
    console.log(error);
  }
};

// Displaying Readings in Chart
const currentGuage = async () => {
  const currentData = await fetchCurrentData();
  const current = currentData[currentData.length - 1];
  let numberOfDecimals = 3;

  let data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: current,
      number: { valueformat: numberOfDecimals, suffix: "wh" },
      title: { text: "Current" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 99.9], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "green" },
        bgcolor: "lightgray",
        borderwidth: 2,
        bordercolor: "gray",
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 999,
        },
      },
    },
  ];

  let layout = {
    height: 300,
    margin: { t: 0, b: 0 },
    paper_bgcolor: "lavender",
  };
  Plotly.newPlot("current-gauge", data, layout);
};
currentGuage();

// Fetching voltage Dataset of Readings
const fetchVoltageData = async () => {
  try {
    const response = await fetch(`${url}/voltage`);
    const voltageDataSet = await response.json();

    const voltageData = voltageDataSet.map(({ voltage }) => voltage);

    return voltageData;
  } catch (error) {
    console.log(error);
  }
};

// Displaying Readings in Chart
const voltageGuage = async () => {
  const voltageData = await fetchVoltageData();
  const voltage = voltageData[voltageData.length - 1];
  let numberOfDecimals = 3;

  let data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: voltage,
      number: { valueformat: numberOfDecimals, suffix: "wh" },
      title: { text: "Voltage" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 999], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "green" },
        bgcolor: "lightgray",
        borderwidth: 2,
        bordercolor: "gray",
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 999,
        },
      },
    },
  ];

  let layout = {
    height: 300,
    margin: { t: 0, b: 0 },
    paper_bgcolor: "lavender",
  };
  Plotly.newPlot("voltage-gauge", data, layout);
};
voltageGuage();

// Fetching power Dataset of Readings
const fetchPowerData = async () => {
  try {
    const response = await fetch(`${url}/power`);
    const powerDataSet = await response.json();

    const powerData = powerDataSet.map(({ power }) => power);
    return powerData;
  } catch (error) {
    console.log(error);
  }
};

// Displaying Readings in Chart
const powerGuage = async () => {
  const powerData = await fetchPowerData();
  const power = powerData[powerData.length - 1];
  let numberOfDecimals = 3

  let data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: power,
      number: { valueformat: numberOfDecimals, suffix: "wh" },
      title: { text: "Power" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 999.9], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "green" },
        bgcolor: "lightgray",
        borderwidth: 2,
        bordercolor: "gray",
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 99999.9,
        },
      },
    },
  ];

  let layout = {
    height: 300,
    margin: { t: 0, b: 0 },
    paper_bgcolor: "lavender",
  };
  Plotly.newPlot("power-gauge", data, layout);
};
powerGuage();

// Fetching energy Dataset of Readings
const fetchEnergyData = async () => {
  try {
    const response = await fetch(`${url}/energy`);
    const energySet = await response.json();

    const energyLast30Readings = energySet.slice(-30)

    const energyDataSet = energyLast30Readings.map(({ energy }) => energy);
    const time = energyLast30Readings.map(({ createdAt }) => createdAt.slice(0, 10));

    const energy = { energyDataSet, time };

    return energy;
  } catch (error) {
    console.log(error);
  }
};

// Displaying Readings in Gauge
const energyGuage = async () => {
  const { energyDataSet } = await fetchEnergyData();
  const energy = energyDataSet[energyDataSet.length - 1];

  let numberOfDecimals = 3;

  let data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: energy,
      number: { valueformat: numberOfDecimals, suffix: "wh" },
      title: { text: "Energy" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0.0, 999.99], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "green" },
        bgcolor: "lightgray",
        borderwidth: 2,
        bordercolor: "gray",
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 9999.99,
        },
      },
    },
  ];

  let layout = {
    height: 300,
    margin: { t: 0, b: 0 },
    paper_bgcolor: "lavender",
  };
  Plotly.setPlotConfig({ locale: "de-CH" });
  Plotly.newPlot("energy-gauge", data, layout);
};
energyGuage();

let myChart = null
const createChart = (energyDataSet, time) => {
  const labels = [...time];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Energy dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        state: "0.01",
        data: [...energyDataSet],
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      plugins: {
        datalabels: {
          anchor: "end",
          align: "top",
          font: {
            weight: "bold",
            size: 10,
          },
        },
      },
    },
  };

  Chart.register(ChartDataLabels);
  const ctx = document.getElementById("energy-chart");
  if (myChart != null) {
    myChart.update()
  }
  myChart = new Chart(ctx, config);
}

// const destoryChart = () => {
//   myChart.destory()
// }

// Displaying Readings in Chart
const energyChart = async () => {
  const { energyDataSet, time } = await fetchEnergyData();
  
  createChart(energyDataSet, time)
};

energyChart();


// Set Charts and Guage to auto reload 
setInterval(() => {
  currentGuage();
  voltageGuage();
  powerGuage();
  energyGuage();
  // energyChart();  
}, 5000);


// Login Validation and access
const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.forms["myForm"]["name"].value;
  const password = document.forms["myForm"]["password"].value;

  if (name == "" || password == "") {
    alert("Fill all fields");
    return false;
  }
  if (name !== 'enerymeter01') {
    alert("Invalid User");
    return false;
  }
  if (password !== 'meter001') {
    alert("Invalid Password");
    return false;
  }

  return (window.location.href = "./chart.html");
});
