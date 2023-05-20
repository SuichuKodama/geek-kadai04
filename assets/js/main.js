import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, pointLight, controls;

window.addEventListener('load', init);

function init() {
  //シーンを追加
  scene = new THREE.Scene();

  //カメラを追加
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 500)

  //レンダラー追加
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  document.getElementById('three-test').appendChild(renderer.domElement);

  //テクスチャーを追加
  let texture = new THREE.TextureLoader().load("/assets/img/earth.jpg")

  //ジオメトリを作成
  let ballGeometry = new THREE.SphereGeometry(100, 64, 32);

  //マテリアルを作成
  let ballMaterial = new THREE.MeshPhysicalMaterial({ map: texture });

  //メッシュ化してみる
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial)
  scene.add(ballMesh);

  //平行光源を追加
  let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight);

  //ポイント光源を追加してみよう
  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  //ポイント光源がどこにあるのかを特定する
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  //マウス操作がでいるようにする
  controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', onWindowResize)

  animate();
}

//ブラウザのリサイズに対応させる
function onWindowResize() {
  //レンダラーのサイズを随時更新
  renderer.setSize(window.innerWidth, window.innerHeight)

  //カメラのアスペクト比を正す
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

function animate() {
  //ポイント光源を球の周りを巡回させよう
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );

    //レンダリングしてみよう
  renderer.render(scene, camera);
  requestAnimationFrame(animate)
}



