import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui'


/**
 * サウンドビジュアライザー
 */
/** フーリエ変換を行う分割数。2の乗数でなくてはならない */
// const FFT_SIZE = 512;

// // HTML要素
// const containerElement = document.querySelector(".container");

// const audioElement = document.querySelector("#audio");
// audioElement.addEventListener("play", init);

// // -------------------------------------
// // HTML要素の初期化
// // -------------------------------------

// /** @type {HTMLElement[]} */
// const boxes = [];
// // div要素の配置
// for (let i = 0; i < FFT_SIZE / 2; i++) { // FFT_SIZE / 2 は 64
//   const div = document.createElement("div");
//   div.classList.add("box");
//   containerElement.append(div);

//   boxes[i] = div; // 配列に保存
// }

// /**
//  * サウンドを再生します
//  */
// function init() {
//   // --------------------------------
//   // アナライザーの設定を行います
//   // --------------------------------
//   const context = new AudioContext();

//   // アナライザーを生成
//   const nodeAnalyser = context.createAnalyser();
//   // フーリエ変換を行う分割数。2の乗数でなくてはならない
//   nodeAnalyser.fftSize = FFT_SIZE;
//   // 0～1の範囲でデータの動きの速さ 0だともっとも速く、1に近づくほど遅くなる
//   nodeAnalyser.smoothingTimeConstant = 0.85;
//   // オーディオの出力先を設定
//   nodeAnalyser.connect(context.destination);

//   // audio 要素と紐付ける
//   const nodeSource = context.createMediaElementSource(audioElement);
//   nodeSource.connect(nodeAnalyser);

//   // --------------------------------
//   // 繰り返し処理
//   // --------------------------------
//   loop();

//   /** 描画します */
//   function loop() {
//     requestAnimationFrame(loop);

//     // 波形データを格納する配列の生成
//     const freqByteData = new Uint8Array(FFT_SIZE / 2);
//     // それぞれの周波数の振幅を取得
//     nodeAnalyser.getByteFrequencyData(freqByteData);

//     // 高さの更新
//     for (let i = 0; i < freqByteData.length; i++) {
//       const freqSum = freqByteData[i];
//       // 値は256段階で取得できるので正規化して 0.0 〜 1.0 の値にする
//       const scale = freqSum / 256;

//       // Y軸のスケールを変更
//       const div = boxes[i];
//       div.style.scale = `1 ${scale}`;
//     }
//   }
// }



//UIデバッグ
const gui = new GUI();

//サイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('three-particle').appendChild(renderer.domElement);

/**
 * テクスチャ設定
 */
const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load('/assets/textures/particles/1.png');

/**
 * パーティクルを作ってみよう
 */
//ジオメトリ
const particlesGeometry = new THREE.BufferGeometry();
const count = 10000;

const positionArray = new Float32Array(count * 3); //3つの座標もってるから3必要
const colorArray = new Float32Array(count * 3);

for( let i = 0; i < count * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 10;//-0.5で座標系の真ん中にパーティクルが表現される
  colorArray[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
)

particlesGeometry.setAttribute(
  "color",
  new THREE.BufferAttribute(colorArray, 3)
)

//球を作成してみる（depthTest: false）を指定した時のバグ検証
const cube = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshNormalMaterial()
)

//マテリアル
const pointMaterial = new THREE.PointsMaterial({
  size: 0.15,
  sizeAttenuation: true,
  transparent: true, //パーティクルを透明にしてからalphaMap指定する
  alphaMap: particlesTexture,
  //パーティクルのエッジのバグ修正
  // alphaTest: 0.001,
  // depthTest: false,
  depthWrite: false,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
})
// pointMaterial.map = particlesTexture;
pointMaterial.color.set("pink") //pointMaterial.color = new THREE.Color("pink")


//メッシュ化
const particles = new THREE.Points(particlesGeometry, pointMaterial);
scene.add(particles);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  for(let i = 0; i < count; i++) {
    const i3 = i * 3;

    const x = particlesGeometry.attributes.position.array[i3 + 0];
    const z = particlesGeometry.attributes.position.array[i3 + 2];
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x
      );
  }

  particlesGeometry.attributes.position.needsUpdate = true;

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
}

animate();
