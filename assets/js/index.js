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


//getItem
let history = load();

console.log(history)

function load() {
  const it = localStorage.getItem('history');
  if (it) {
    return it.split('\n');
  }
  return [];
}

//setItem
function save(history) {
  localStorage.setItem('history', history.join('\n'));
}


//Enterキーでイベント発火！
input.addEventListener('keypress', enterEvent);

function enterEvent(e) {
  if (e.keyCode === 13) {

    if (input.value === 'history') {
      output.innerHTML += `
      <p>geek-academy@Free PC ~ %  ${input.value}</p>
      `;
      renderHistory();
    } else if (input.value === 'open') {
      output.innerHTML += `
      <p>geek-academy@Free PC ~ %  ${input.value}</p>
      <p>${input.value}</p>
      `;
      window.open('https://poolsuite.net/');
    } else if (input.value === 'cat') {
      output.innerHTML += `
      <p>geek-academy@Free PC ~ %  ${input.value}</p>
      <p>
      　　 　　　/ﾞﾐヽ､,,___,,／ﾞヽ<br>
      　　 　　　i ノ　　 川　｀ヽ'<br>
      　　 　　　/　｀　・　 ． ・　i､<br>
      　　 　　彡,　　 ミ(_,人_)彡ミ<br>
      　∩, 　/　ヽ､,　　 　　　ノ<br>
      　丶ニ|　　　 '"''''''''"´　ﾉ<br>
      　　　　∪⌒∪"￣￣∪<br>
      </p>
      `;
    } else if (input.value === 'cow') {
      output.innerHTML += `
      <p>geek-academy@Free PC ~ %  ${input.value}</p>
      <p>
      　　　　　　　　Ａ_Ａ　　　　 Ａ_Ａ　__<br>
      　　　./⌒▼⊂　・ ・つ　⊂・ ・　⊃▼⌒丶　<br>
      　*～|●　 （ （＿_ω）　（ω＿_） ）　　●|～*<br>
      　　　.∪∪～U U　　　　　　 U U. ～- 'U<br>
      </p>
      `;
    } else {
      output.innerHTML += `
      <p>geek-academy@Free PC ~ %  ${input.value}</p>
      <p>${input.value}</p>
      `;
    }


    addHistory(input.value);
    input.value = '';   
    return false;
	} 
}

//コマンド入力
function addHistory(cmd) {
  history = history.concat(cmd);
  save(history);
  // renderHistory();
}

//historyレンダリング
function renderHistory() {
  const historyCli = document.getElementById('history');
  historyCli.innerHTML = '';
  
  for (const item of history) {
    const li = document.createElement('li');
    li.textContent = item;
    historyCli.appendChild(li);
  } 
}

// renderHistory();

