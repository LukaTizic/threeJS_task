const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const randomColor = () => Math.random() * 0xffffff;

function addCube(x, y, z, color) {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  scene.add(cube);
}

const light = new THREE.PointLight(0xffffff, 1, 200);
light.position.set(0, 5, 10);
scene.add(light);

camera.position.z = 6;

async function fetchCubes() {
  try {
    const response = await fetch(
      "https://mocki.io/v1/d724deff-74a0-4dfa-b1e8-e4461522557c"
    );
    const data = await response.json();
    console.log(data);
    const gridSize = data.gridSize;
    const spacing = 1.4;

    const positionX = -(gridSize * spacing) / 2 + spacing / 2;
    const positionY = -(gridSize * spacing) / 2 + spacing / 2;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = positionX + i * spacing;
        const y = positionY + j * spacing;
        const z = 0;

        // This line can go above line 44 as well
        const color = randomColor();
        addCube(x, y, z, color);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
fetchCubes();

const animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};

animate();
