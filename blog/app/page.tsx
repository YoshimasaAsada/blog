"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./LinkStyles.module.css"; // CSSモジュールをインポート

export default function Page() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentRef = mountRef.current;
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
      if (currentRef) {
        currentRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: -1,
      }}>
      <div className={styles.welcome}>Welcome to YASD TECH</div>
      <div className={styles.slider}>
        <Link href="/blog" className={`${styles.link} ${styles.blog}`}>
          Blog
        </Link>
        <Link href="/profile" className={`${styles.link} ${styles.profile}`}>
          Profile
        </Link>
        <Link href="/contact" className={`${styles.link} ${styles.contact}`}>
          Contact
        </Link>
      </div>
    </div>
  );
}
