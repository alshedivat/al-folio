const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
    // initialize MindAR
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body, 
        imageTargetSrc: "./targets.mind"
    });
    const {renderer, scene, camera} = mindarThree;

    // Create a ball for the AR objects
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({color : 0xffffff, transparent: true, opacity: 1.0});
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    // sphere.rotation.x = -Math.PI / 2;
    sphere.name = "sphere";

    // add texture to the sphere
    const texture = new THREE.TextureLoader().load("./../../../assets/textures/texture_hexa.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    sphere.material.map = texture;
    sphere.material.needsUpdate = true;

    // double sphere size
    sphere.scale.set(4, 4, 4);

    // add bounces animation back and forth using three js
    const bounce = () => {
        const t = Date.now() * 0.01;
        sphere.position.z = Math.sin(t) * 0.1 + 0.3;
    }
    setInterval(bounce, 1000 / 60);

    // create anchor
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(sphere); // THREE.Group


    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
    }
    start();
});