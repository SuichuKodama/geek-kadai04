import * as THREE from "https://unpkg.com/three/build/three.module.js"

let scene, camera, renderer, pointLight;

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
document.getElementById('three-test').appendChild(renderer.domElement);


//ジオメトリを作成
let ballGeometry = new THREE.SphereGeometry(100, 64, 32);

//マテリアルを作成
let ballMaterial = new THREE.MeshPhysicalMaterial({});

//メッシュ化してみる
let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial)
scene.add(ballMesh);

//平行光源を追加
let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight);

//ポイント光源を追加してみよう
pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-200, -200, -200)
scene.add(pointLight);

//ポイント光源がどこにあるのかを特定する
let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
scene.add(pointLightHelper)

//レンダリングしてみよう
renderer.render(scene, camera);
