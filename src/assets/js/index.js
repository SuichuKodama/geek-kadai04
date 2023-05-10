const $rClick = document.getElementById('rClick');

$rClick.addEventListener('click', clickEvent);

function clickEvent() {
  let $janken = ['ぐー', 'ちょき', 'ぱー'];
  let $jankenRandom = Math.floor( Math.random() * 3 );

  let $playerJanken = ['ぐー', 'ちょき', 'ぱー'];
  let $playerJankenRandom = Math.floor( Math.random() * 3);

  let $resultEnd = document.querySelector('.js-result')
  let $playerSelect = document.querySelector('.js-player-janken')
  let $comSelect = document.querySelector('.js-janken')

  $playerSelect.innerHTML = $playerJanken[$jankenRandom];
  $comSelect.innerHTML = $janken[$playerJankenRandom];

  if ($jankenRandom === $playerJankenRandom) {
    $resultEnd.innerHTML = 'あいこ';
  } else if ($playerJankenRandom === 0 && $jankenRandom === 1) {
    $resultEnd.innerHTML = '勝ち';
  } else if ($playerJankenRandom === 1 && $jankenRandom === 2) {
    $resultEnd.innerHTML = '勝ち';
  } else if ($playerJankenRandom === 2 && $jankenRandom === 0) {
    $resultEnd.innerHTML = '勝ち';
  } else {
    $resultEnd.innerHTML = '負け';
  }

}



