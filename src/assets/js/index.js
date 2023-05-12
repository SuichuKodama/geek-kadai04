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
    $resultEnd.innerHTML = 'かち';
  } else if ($playerJankenRandom === 1 && $jankenRandom === 2) {
    $resultEnd.innerHTML = 'かち';
  } else if ($playerJankenRandom === 2 && $jankenRandom === 0) {
    $resultEnd.innerHTML = 'かち';
  } else {
    $resultEnd.innerHTML = 'まけ';
  }

}


document.addEventListener('DOMContentLoaded', function() {
  const $tabItems = document.querySelectorAll('.tab-item')

  for (let i = 0; i < $tabItems.length; i++) {
    $tabItems[i].addEventListener('click', tabSwitch, false)
  }

  function tabSwitch() {
    document.getElementsByClassName('crnt')[0].classList.remove('crnt')
    this.classList.add('crnt')
  
    document.getElementsByClassName('is-show')[0].classList.remove('is-show')
    const arrayTabs = Array.prototype.slice.call($tabItems)
    const index = arrayTabs.indexOf(this)
    document.getElementsByClassName('js-item-container')[index].classList.add('is-show')
  }

}, false);



/** フーリエ変換を行う分割数。2の乗数でなくてはならない */
const FFT_SIZE = 512;

// HTML要素
const containerElement = document.querySelector(".container");

const audioElement = document.querySelector("#audio");
audioElement.addEventListener("play", init);

// -------------------------------------
// HTML要素の初期化
// -------------------------------------

/** @type {HTMLElement[]} */
const boxes = [];
// div要素の配置
for (let i = 0; i < FFT_SIZE / 2; i++) { // FFT_SIZE / 2 は 64
  const div = document.createElement("div");
  div.classList.add("box");
  containerElement.append(div);

  boxes[i] = div; // 配列に保存
}

/**
 * サウンドを再生します
 */
function init() {
  // --------------------------------
  // アナライザーの設定を行います
  // --------------------------------
  const context = new AudioContext();

  // アナライザーを生成
  const nodeAnalyser = context.createAnalyser();
  // フーリエ変換を行う分割数。2の乗数でなくてはならない
  nodeAnalyser.fftSize = FFT_SIZE;
  // 0～1の範囲でデータの動きの速さ 0だともっとも速く、1に近づくほど遅くなる
  nodeAnalyser.smoothingTimeConstant = 0.85;
  // オーディオの出力先を設定
  nodeAnalyser.connect(context.destination);

  // audio 要素と紐付ける
  const nodeSource = context.createMediaElementSource(audioElement);
  nodeSource.connect(nodeAnalyser);

  // --------------------------------
  // 繰り返し処理
  // --------------------------------
  loop();

  /** 描画します */
  function loop() {
    requestAnimationFrame(loop);

    // 波形データを格納する配列の生成
    const freqByteData = new Uint8Array(FFT_SIZE / 2);
    // それぞれの周波数の振幅を取得
    nodeAnalyser.getByteFrequencyData(freqByteData);

    // 高さの更新
    for (let i = 0; i < freqByteData.length; i++) {
      const freqSum = freqByteData[i];
      // 値は256段階で取得できるので正規化して 0.0 〜 1.0 の値にする
      const scale = freqSum / 256;

      // Y軸のスケールを変更
      const div = boxes[i];
      div.style.scale = `1 ${scale}`;
    }
  }
}







