import { useEffect } from "react";
import * as THREE from "three";

/**
 * Homeページで使ってる背景
 * @param ref 
 */
export function useEarthBackground(ref: any) {
  useEffect(() => {
    if (!ref.current) return;

    const currentRef = ref.current;
    const width = currentRef.clientWidth;
    const height = currentRef.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];

    for (let i = 0; i < 10000; i++) {
      starVertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
      starVertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
      starVertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
    const starField = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(starField);
    camera.position.z = 1000;

    function animate() {
      requestAnimationFrame(animate);
      starField.rotation.x += 0.001;
      starField.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      currentRef.removeChild(renderer.domElement);
    };
  }, [ref]);
}
