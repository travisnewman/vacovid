// US Data
let usCases = 0;
let usHosps = 0;
let usDeaths = 0;
let usCasesChange = 0;
let usHospsChange = 0;
let usDeathsChange = 0;
let usUpdatedRaw = "";
let usUpdated = "";

$.ajax({
  url: "https://api.covidtracking.com/v1/us/current.json",
  type: "GET"
}).done(function(data) {
  usCases = data[0].positive;
  usHosps = data[0].hospitalizedCumulative;
  usDeaths = data[0].death;
  usCasesChange = data[0].positiveIncrease;
  usHospsChange = data[0].hospitalizedIncrease;
  usDeathsChange = data[0].deathIncrease;
  usUpdatedRaw += data[0].date;
  usUpdated = usUpdatedRaw.slice(0,4) + "-" + usUpdatedRaw.slice(4,6) + "-" + usUpdatedRaw.slice(6,8);

  $('#us-cases').html(usCases.toLocaleString() + ' (+' + usCasesChange.toLocaleString() + ')');
  $('#us-death').html(usDeaths.toLocaleString() + ' (+' + usDeathsChange.toLocaleString() + ')');
  $('#us-hosp').html(usHosps.toLocaleString() + ' (+' + usHospsChange.toLocaleString() + ')');
  $('#us-updated').html(usUpdated);
});

// Virginia state data
let vaCases = 0;
let vaHosps = 0;
let vaDeaths = 0;
let vaCasesYest = 0;
let vaHospsYest = 0;
let vaDeathsYest = 0;
let vaCasesChange = 0;
let vaHospsChange = 0;
let vaDeathsChange = 0;
let vaUpdated = "";

$.ajax({
  url: "https://data.virginia.gov/resource/uqs3-x7zh.json",
  type: "GET",
  data: {
    "$limit" : 4,
    "$$app_token" : VA_TOKEN
  }
}).done(function(data) {
  $.each(data, function(index, element) {
    // alert(element.number_of_cases);
    if (index === 0 || index === 1) { // 0 and 1 are today's confirmed and probable cases
      vaCases = vaCases + (element.number_of_cases * 1);
      vaHosps = vaHosps + (element.number_of_hospitalizations * 1);
      vaDeaths = vaDeaths + (element.number_of_deaths * 1);
      vaUpdated = element.report_date.slice(0,10);
    } else if (index === 2 || index === 3) { // 2 and 3 are yeasterday's confirmed and probable cases
      vaCasesYest = vaCasesYest + (element.number_of_cases * 1);
      vaHospsYest = vaHospsYest + (element.number_of_hospitalizations * 1);
      vaDeathsYest = vaDeathsYest + (element.number_of_deaths * 1);
    }
  });
  vaCasesChange = vaCases - vaCasesYest;
  vaHospsChange = vaHosps - vaHospsYest;
  vaDeathsChange = vaDeaths - vaDeathsYest;

  $('#va-cases').html(vaCases.toLocaleString() + ' (+' + vaCasesChange.toLocaleString() + ')');
  $('#va-death').html(vaDeaths.toLocaleString() + ' (+' + vaDeathsChange.toLocaleString() + ')');
  $('#va-hosp').html(vaHosps.toLocaleString() + ' (+' + vaHospsChange.toLocaleString() + ')');
  $('#va-updated').html(vaUpdated);
});

// Virginia locality data

let template = {
  name: '',
  counter: 0,
  todayTotal: 0,
  todayHosp: 0,
  todayDeath: 0,
  yestTotal: 0,
  yestHosp: 0,
  yestDeath: 0,
  changeTotal: 0,
  changeHosp: 0,
  changeDeath: 0,
  updated: ''
}

let ourLocs = {}

$.each(COVID_LOCS, function(index, loc) {
  ourLocs[index] = JSON.parse(JSON.stringify(template));
  ourLocs[index].name = loc;
});

$.ajax({
  url: "https://data.virginia.gov/resource/bre9-aqqr.json",
  type: "GET",
  data: {
    "$limit" : 300,
    "$$app_token" : VA_TOKEN
  }
}).done(function(data) {
  $.each(data, function(index, element) {
    $.each(ourLocs, function(code, info) {
      if (element.locality === info.name) {
        if (ourLocs[code].counter === 0) {
          ourLocs[code].todayTotal = element.total_cases;
          ourLocs[code].todayHosp = element.hospitalizations;
          ourLocs[code].todayDeath = element.deaths;
          ourLocs[code].counter++;
          ourLocs[code].updated = element.report_date.slice(0,10);
        } else if (ourLocs[code].counter === 1) {
          ourLocs[code].yestTotal = element.total_cases;
          ourLocs[code].yestHosp = element.hospitalizations;
          ourLocs[code].yestDeath = element.deaths;
        }
      }
      ourLocs[code].changeTotal = ourLocs[code].todayTotal - ourLocs[code].yestTotal;
      ourLocs[code].changeHosp = ourLocs[code].todayHosp - ourLocs[code].yestHosp;
      ourLocs[code].changeDeath = ourLocs[code].todayDeath - ourLocs[code].yestDeath;
    });
  });
  $.each(ourLocs, function(code, info) {
    $('#covid-table').append(
      '<tr>' +
        '<th>' + info.name + '</th>' +
        '<td data-label="Cases">' +
          info.todayTotal.toLocaleString() + ' (+' + info.changeTotal.toLocaleString() + ')' +
        '</td>' +
        '<td data-label="Hospitalizations">' +
          info.todayHosp.toLocaleString() + ' (+' + info.changeHosp.toLocaleString() + ')' +
        '</td>' +
        '<td data-label="Deaths">' +
          info.todayDeath.toLocaleString() + ' (+' + info.changeDeath.toLocaleString() + ')' +
        '</td>' +
        '<td data-label="Updated">' + info.updated + '</td>' +
      '</tr>'
    );
  });
});


