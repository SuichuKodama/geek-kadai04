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

setInterval(timeClock, 1000);
