const $rock = document.getElementById('rock');
const $scissors = document.getElementById('scissors');
const $paper = document.getElementById('paper');
const $jankenList = document.querySelector('.janken-btn-list')

$rock.addEventListener('click', function() {
    clickEvent(0);
    $jankenList.classList.add('rock')
    $jankenList.classList.remove('scissors')
    $jankenList.classList.remove('paper')
});

$scissors.addEventListener('click', function() {
    clickEvent(1);
    $jankenList.classList.remove('rock')
    $jankenList.classList.add('scissors')
    $jankenList.classList.remove('paper')
});

$paper.addEventListener('click', function() {
    clickEvent(2);
    $jankenList.classList.remove('rock')
    $jankenList.classList.remove('scissors')
    $jankenList.classList.add('paper')
});

// const $jankenBtn = document.querySelectorAll('.js-janken-btn');

// for (let i = 0; i < $jankenBtn.length; i++) {
//     $jankenBtn[i].addEventListener('click', clickEvent);
// }


function clickEvent($playerJankenRandom) {
  const $janken = ['ぐー', 'ちょき', 'ぱー'];
  const $jankenRandom = Math.floor( Math.random() * 3 );
  const $playerJanken = ['ぐー', 'ちょき', 'ぱー'];

  const $comImgSrc = ['rock', 'scissors', 'paper'];


  const $resultEnd = document.querySelector('.js-result')
//   const $comSelect = document.querySelector('.js-janken')
//   const $playerSelect = document.querySelector('.js-player-janken')
  const $comImg = document.querySelector('.com-img')

//   $playerSelect.innerHTML = $playerJanken[$playerJankenRandom];
//   $comSelect.innerHTML = $janken[$jankenRandom];

  $comImg.src = '/assets/img/' + $comImgSrc[$jankenRandom] + '.png';

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






