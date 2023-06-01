//毎秒更新させてる時間
function timeClock() {
  const timeTarget = document.querySelector(".js-time");
  const dateTarget = document.querySelector(".js-date");

  let weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const now = new Date();

  const year =  now.getFullYear();
  const month =  now.getMonth() + 1;
  const date =  now.getDate();
  const iWeek =  now.getDay();

  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  if( hour < 10 ) {
    hour = '0' + hour;
  }
  if( minute < 10 ) {
    minute = '0' + minute;
  }
  if (second < 10 ) {
    second = '0' + second;
  }

  timeTarget.innerHTML = hour + ":" + minute + ":" + second;
  dateTarget.innerHTML = weeks[iWeek] + "." + date + "." + month + "." + year;
}
window.addEventListener('load', timeClock)
setInterval(timeClock, 1000);

//瞬間の時間を静的に取得
window.addEventListener('load', function() {
  const loginData = document.querySelector('.js-login-data')

  const ua = window.navigator.userAgent;

  let weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const today = new Date();

  const month =  today.getMonth();
  const date =  today.getDate();
  const iWeek =  today.getDay();

  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  if( hour < 10 ) {
    hour = '0' + hour;
  }
  if( minute < 10 ) {
    minute = '0' + minute;
  }
  if (second < 10 ) {
    second = '0' + second;
  }

  loginData.innerHTML = "Last login: " + weeks[iWeek] + " " + months[month] + " " + date + " " + hour + ":" + minute + ":" + second + " " + ua;
})

//input部分に常のカーソル当てる
document.getElementById('command').focus();


//input、outputの取得
const input = document.getElementById('command');
const output = document.getElementById('output');

//Enterキーでイベント発火！
input.addEventListener('keypress', enterEvent);

function enterEvent(e) {

  if (e.keyCode === 13) {
    output.innerHTML += `
    <p>geek-academy@Free PC ~ %  ${input.value}</p>
    <p>${input.value}</p>
    `;

    localStorage.setItem(localStorage.length.toString(), input.value);
    input.value = '';   
    return false;  
	} 
}

//コマンドラインの中身
let cli = [
  {
    "command": "最新の報告書から、小規模事業者や起業家がApp Storeで世界的な成功を収めていることが浮き彫りに",
    "output": "https://www.apple.com/jp/newsroom/2022/05/new-report-highlights-global-success-of-small-businesses-on-the-app-store/"
  },
  {
    "command": "Appleの世界開発者会議、6月6日（日本時間6月7日）に基調講演で開幕",
    "output": "https://www.apple.com/jp/newsroom/2022/05/apples-worldwide-developers-conference-kicks-off-june-6-with-keynote-address/"
  },
  {
    "command": "Apple、新しいApple Watchプライドエディションのバンドを発表",
    "output": "https://www.apple.com/jp/newsroom/2022/05/apple-unveils-new-apple-watch-pride-edition-bands/"
  }
];
