//script written 2019/01 Computer_newwork, Final project

var myImage = document.querySelector('img');
var header = document.querySelector('header');	
var section = document.querySelector('section');	


myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/bg.jpeg') {
      myImage.setAttribute ('src','images/bg2.jpeg');
    } else {
      myImage.setAttribute ('src','images/bg.jpeg');
    }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName() {
  var myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.innerHTML = 'Girls are waiting for you, ' + myName;
}

if(!localStorage.getItem('name')) {
  setUserName();
}
else {
  var storedName = localStorage.getItem('name');
  myHeading.innerHTML = 'Girls are waiting for you, ' + storedName;
}

myButton.onclick = function() {
  setUserName();
}

/*
document.querySelector('html').onclick = function() {
    alert('Ouch! Stop poking me!');
}
*/

var requestURL14 = 'https://iot.martinintw.com/api/v1/data/12345614?date_filter=2019-01-14%2013:00:49+-+2019-01-21%2013:00:51.json';
var request14 = new XMLHttpRequest();

var requestURL15 = 'https://iot.martinintw.com/api/v1/data/12345615?date_filter=2019-01-14%2013:00:49+-+2019-01-21%2013:00:51.json';
var request15 = new XMLHttpRequest();

var requestURL16 = 'https://iot.martinintw.com/api/v1/data/12345616?date_filter=2019-01-14%2013:00:49+-+2019-01-21%2013:00:51.json';
var request16 = new XMLHttpRequest();
//12345614跑步機, 12345615飛輪, 12345616舉重器材

var day = new Array(8);  //7am ~ 10pm in a day;
var week = new Array(8); //Monday~next Monday in a week;
var percentage_day = new Array(8); //total day sum === 1;
var percentage_week = new Array(8);//total week sum === 1;

if (request14) {
    request14.open('GET', requestURL14);

    request14.responseType = 'json';
    request14.send();

    request14.onload = function () {
        var lora = request14.response;
        populateHeader();
        countData(lora);
        //Showlora(lora);
    }
}

if(request15){
    request15.open('GET', requestURL15);

    request15.responseType = 'json';
    request15.send();

    request15.onload = function() {
        var lora = request15.response;
        //populateHeader();
        countData(lora);
        //Showlora(lora);
    }
}


if (request16) {
    request16.open('GET', requestURL16);

    request16.responseType = 'json';
    request16.send();

    request16.onload = function () {
        var lora = request16.response;
        //populateHeader();
        countData(lora);
        //Showlora(lora);
    }
}


function populateHeader() {
  var myH1 = document.createElement('h1');
  myH1.textContent = 'Here we go!';
  header.appendChild(myH1);

  var myPara = document.createElement('p');
  myPara.textContent = 'Working out with hot girls';
  header.appendChild(myPara);

}

function countData(jsonObj) {
    day[0] = day[1] = day[2] = day[3] = day[4] = day[5] = day[6] = day[7] = 0;
    week[0] = week[1] = week[2] = week[3] = week[4] = week[5] = week[6] = week[7] = 0;

    for (var i = 0; i < jsonObj.length; i++) {
        var n = jsonObj[i].created_at[8] + jsonObj[i].created_at[9] + jsonObj[i].created_at[11] + jsonObj[i].created_at[12] + jsonObj[i].created_at[14] + jsonObj[i].created_at[15] ;

        if (n[2] + n[3] === '07' || n[2] + n[3] == '08') {
            day[0] += 1;
        }
        else if (n[2] + n[3] === '09' || n[2] + n[3] == '10') {
            day[1] += 1;
        }
        else if (n[2] + n[3] === '11' || n[2] + n[3] == '12') {
            day[2] += 1;
        }
        else if (n[2] + n[3] === '13' || n[2] + n[3] == '14') {
            day[3] += 1;
        }
        else if (n[2] + n[3] === '15' || n[2] + n[3] == '16') {
            day[4] += 1;
        }
        else if (n[2] + n[3] === '17' || n[2] + n[3] == '18') {
            day[5] +=1 ;
        }
        else if (n[2] + n[3] === '19' || n[2] + n[3] == '20') {
            day[6] += 1;
        }
        else if (n[2] + n[3] === '21' || n[2] + n[3] == '22') {
            day[7] += 1;
        }

        
        if (n[0] + n[1] === '14') {
            week[0] += 1;
        }
        else if (n[0] + n[1] == '15') {
            week[1] += 1;
        }
        else if (n[0] + n[1] === '16') {
            week[2] += 1;
        }
        else if (n[0] + n[1] === '17') {
            week[3] += 1;
        }
        else if (n[0] + n[1] === '18') {
            week[44] += 1;
        }
        else if (n[0] + n[1] === '19') {
            week[5] += 1;
        }
        else if (n[0] + n[1] === '20') {
            week[6] += 1;
        }
        else if (n[0] + n[1] === '21') {
            week[7] += 1;
        }
        
    }

    console.log(day);
    console.log(week);
    ShowPercentage(day, week);
    console.log('percentage_day: ' + percentage_day);
    console.log('percentage_week: '+ percentage_week);
}

function ShowPercentage(day, week) {
    var sumDay = day[0] + day[1] + day[2] + day[3] + day[4] + day[5] + day[6] + day[7];
    percentage_day[0] = Math.floor(day[0]*100 / sumDay);
    percentage_day[1] = Math.floor(day[1]*100 / sumDay);
    percentage_day[2] = Math.floor(day[2]*100 / sumDay);
    percentage_day[3] = Math.floor(day[3]*100 / sumDay);
    percentage_day[4] = Math.floor(day[4]*100 / sumDay);
    percentage_day[5] = Math.floor(day[5]*100 / sumDay);
    percentage_day[6] = Math.floor(day[6]*100 / sumDay);
    percentage_day[7] = Math.floor(day[7]*100 / sumDay);

    var sumWeek = week[0] + week[1] + week[2] + week[3] + week[4] + week[5] + week[6] + week[7];
    percentage_week[0] = Math.floor(week[0]*100 / sumWeek);
    percentage_week[1] = Math.floor(week[1]*100 / sumWeek);
    percentage_week[2] = Math.floor(week[2]*100 / sumWeek);
    percentage_week[3] = Math.floor(week[3]*100 / sumWeek);
    percentage_week[4] = Math.floor(week[4]*100 / sumWeek);
    percentage_week[5] = Math.floor(week[5]*100 / sumWeek);
    percentage_week[6] = Math.floor(week[6]*100 / sumWeek);
    percentage_week[7] = Math.floor(week[7]*100 / sumWeek);
}


function Showlora(jsonObj) {
    	
    for (var i = 0; i < jsonObj.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');

        if (jsonObj[i].macaddr == 12345614){
            myH2.textContent = 'Running Machine';
        }
        else if (jsonObj[i].macaddr == 12345615){
            myH2.textContent = 'Flyer';
        }
        else if (jsonObj[i].macaddr == 12345616) {
            myH2.textContent = 'Lifter';
        }

        myPara1.textContent = 'UseRate: 7~9:' + day[0] + ', 9~11:' + day[1] + ', 11~13:' + day[2]+ ', 13~15:' + day[3] + ', 15~17:' + day[4] + ', 17~19:' + day[5] + ', 19~21:' + day[6] + ', 21~23:' + day[7]; 
        myPara2.textContent = 'Shaking Number:     ' + parseInt(jsonObj[i].created_at[8]) + parseInt(jsonObj[i].created_at[9]) + parseInt(jsonObj[i].created_at[11]) + parseInt(jsonObj[i].created_at[12]) + parseInt(jsonObj[i].created_at[14]) + parseInt(jsonObj[i].created_at[15]);


        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        
        section.appendChild(myArticle);
    }
    
}

