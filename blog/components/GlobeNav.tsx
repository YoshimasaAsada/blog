'use client';

// ライブラリ関連
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 型定義とかその辺
import styles from './GlobeNav.module.css';

/** 地球儀の半径。カメラ距離などは全てこの値を基準にする */
const RADIUS = 100;

/** 地球儀上に置くリンク。lat/lonで配置位置を決める */
const NAV_ITEMS = [
  { href: '/blog', label: 'Blog', lat: 24, lon: 0 },
  { href: '/profile', label: 'Profile', lat: -6, lon: 120 },
  { href: '/contact', label: 'Contact', lat: 30, lon: 240 },
] as const;

/**
 * 緯度経度から球面上の座標を求める
 */
function toSpherePosition(lat: number, lon: number, radius: number) {
  return new THREE.Vector3().setFromSphericalCoords(
    radius,
    THREE.MathUtils.degToRad(90 - lat),
    THREE.MathUtils.degToRad(lon)
  );
}

/**
 * 経線・緯線のワイヤーフレームを作る
 */
function createGrid(radius: number) {
  const group = new THREE.Group();

  const material = new THREE.LineBasicMaterial({
    color: 0xa8c8ff,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });

  const circlePoints = (segments: number) => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)));
    }
    return points;
  };

  const base = circlePoints(96);

  // 緯線
  for (let lat = -60; lat <= 60; lat += 30) {
    const phi = THREE.MathUtils.degToRad(lat);
    const scale = Math.cos(phi) * radius;
    const y = Math.sin(phi) * radius;

    const geometry = new THREE.BufferGeometry().setFromPoints(
      base.map((p) => new THREE.Vector3(p.x * scale, y, p.z * scale))
    );
    group.add(new THREE.Line(geometry, material));
  }

  // 経線
  for (let i = 0; i < 12; i++) {
    const geometry = new THREE.BufferGeometry().setFromPoints(
      base.map((p) => new THREE.Vector3(p.x * radius, p.z * radius, 0))
    );
    const line = new THREE.Line(geometry, material);
    line.rotation.y = (i / 12) * Math.PI;
    group.add(line);
  }

  return { group, material };
}

/**
 * リング用のテクスチャ。中心からの距離で濃淡が変わる同心円
 */
function createRingTexture(): THREE.Texture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d')!;
  const center = size / 2;

  for (let r = center; r > 0; r -= 1) {
    const t = r / center;
    const band = 0.45 + 0.55 * Math.sin(t * 46) * Math.sin(t * 13);
    const fade = Math.sin(Math.min(Math.max((t - 0.52) / 0.42, 0), 1) * Math.PI);
    const alpha = Math.max(band, 0) * fade * 0.5;

    ctx.beginPath();
    ctx.arc(center, center, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(198, 216, 255, ${alpha.toFixed(3)})`;
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const GLOBE_VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GLOBE_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uLightDirection;
  uniform vec3 uColorDeep;
  uniform vec3 uColorLight;
  uniform vec3 uRimColor;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 normal = normalize(vNormal);

    // 緯度方向の縞模様
    float bands = sin(vPosition.y * 0.055 + sin(vPosition.x * 0.03 + uTime * 0.06) * 1.2);
    vec3 base = mix(uColorDeep, uColorLight, smoothstep(-1.2, 1.2, bands));

    float diffuse = clamp(dot(normal, normalize(uLightDirection)), 0.0, 1.0);
    vec3 color = base * (0.26 + 0.74 * pow(diffuse, 0.65));

    float rim = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 3.0);
    color += uRimColor * rim * 0.65;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const ATMOSPHERE_VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMOSPHERE_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;

  varying vec3 vNormal;

  void main() {
    float intensity = pow(0.58 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
    gl_FragColor = vec4(uColor, 1.0) * clamp(intensity, 0.0, 1.0);
  }
`;

/**
 * ドラッグで回せる地球儀型のナビゲーション。
 * three.jsで球体とマーカーを描画し、ラベルだけはHTMLの<a>を
 * 3D座標に投影して重ねている（クリック・キーボード操作をそのまま活かすため）。
 */
export default function GlobeNav() {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    let width = host.clientWidth || 1;
    let height = host.clientHeight || 1;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearAlpha(0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
    camera.position.set(0, 60, 460);

    // -------------------------------------------------------------
    // 本体
    // -------------------------------------------------------------
    const globeGeometry = new THREE.SphereGeometry(RADIUS, 64, 64);
    const globeMaterial = new THREE.ShaderMaterial({
      vertexShader: GLOBE_VERTEX_SHADER,
      fragmentShader: GLOBE_FRAGMENT_SHADER,
      uniforms: {
        uLightDirection: { value: new THREE.Vector3(-0.6, 0.45, 0.75) },
        uColorDeep: { value: new THREE.Color('#18265f') },
        uColorLight: { value: new THREE.Color('#4a6ddb') },
        uRimColor: { value: new THREE.Color('#7fb2ff') },
        uTime: { value: 0 },
      },
    });
    scene.add(new THREE.Mesh(globeGeometry, globeMaterial));

    const { group: grid, material: gridMaterial } = createGrid(RADIUS * 1.002);
    scene.add(grid);

    const atmosphereGeometry = new THREE.SphereGeometry(RADIUS * 1.2, 48, 48);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: ATMOSPHERE_VERTEX_SHADER,
      fragmentShader: ATMOSPHERE_FRAGMENT_SHADER,
      uniforms: { uColor: { value: new THREE.Color('#4d8bff') } },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));

    const ringTexture = createRingTexture();
    const ringGeometry = new THREE.RingGeometry(RADIUS * 1.4, RADIUS * 1.78, 160);
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI * 0.42;
    ring.rotation.y = 0.18;
    scene.add(ring);

    // -------------------------------------------------------------
    // マーカー（ピン + 光点）
    // -------------------------------------------------------------
    const markerGeometry = new THREE.SphereGeometry(3.4, 20, 20);
    const haloGeometry = new THREE.SphereGeometry(6.4, 20, 20);
    const pinMaterial = new THREE.LineBasicMaterial({
      color: 0x9fd0ff,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });

    const markers = NAV_ITEMS.map((item) => {
      const surface = toSpherePosition(item.lat, item.lon, RADIUS);
      const anchor = toSpherePosition(item.lat, item.lon, RADIUS * 1.28);
      const normal = surface.clone().normalize();

      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xcfe6ff,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const dot = new THREE.Mesh(markerGeometry, markerMaterial);
      dot.position.copy(surface);
      scene.add(dot);

      const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0x6fb0ff,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      halo.position.copy(surface);
      scene.add(halo);

      const pinGeometry = new THREE.BufferGeometry().setFromPoints([
        surface,
        anchor.clone().multiplyScalar(0.96),
      ]);
      scene.add(new THREE.Line(pinGeometry, pinMaterial));

      return {
        anchor,
        normal,
        halo,
        haloMaterial,
        markerMaterial,
        pinGeometry,
      };
    });

    // -------------------------------------------------------------
    // 操作（ドラッグで回転 / 放っておくと自動回転）
    // -------------------------------------------------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.55;
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 0.7;
    controls.minPolarAngle = Math.PI * 0.22;
    controls.maxPolarAngle = Math.PI * 0.78;

    // 触っている間は自動回転を止める
    const handleStart = () => {
      controls.autoRotate = false;
    };
    const handleEnd = () => {
      controls.autoRotate = !prefersReducedMotion;
    };
    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    // -------------------------------------------------------------
    // 描画ループ
    // -------------------------------------------------------------
    const clock = new THREE.Clock();
    const projected = new THREE.Vector3();
    const cameraDirection = new THREE.Vector3();
    let frameId = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();

      controls.update();
      globeMaterial.uniforms.uTime.value = elapsed;
      ring.rotation.z = elapsed * 0.03;

      cameraDirection.copy(camera.position).normalize();

      markers.forEach((marker, index) => {
        // 手前を向いているマーカーほど強調する
        const facing = marker.normal.dot(cameraDirection);
        const front = THREE.MathUtils.clamp((facing + 0.25) / 1.1, 0, 1);

        const pulse = 1 + Math.sin(elapsed * 2 + index) * 0.12;
        marker.halo.scale.setScalar(pulse * (0.85 + front * 0.45));
        marker.haloMaterial.opacity = 0.12 + front * 0.42;
        marker.markerMaterial.opacity = 0.35 + front * 0.65;

        const el = labelRefs.current[index];
        if (!el) return;

        projected.copy(marker.anchor).project(camera);
        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;

        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
          1
        )}px, 0) translate(-50%, -50%) scale(${(0.86 + front * 0.14).toFixed(
          3
        )})`;
        el.style.opacity = (0.22 + front * 0.78).toFixed(3);
        el.style.zIndex = String(Math.round(front * 100));
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    // -------------------------------------------------------------
    // リサイズ
    // -------------------------------------------------------------
    const resizeObserver = new ResizeObserver(() => {
      width = host.clientWidth || 1;
      height = host.clientHeight || 1;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(host);

    // -------------------------------------------------------------
    // 後片付け
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();

      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
      controls.dispose();

      markers.forEach((marker) => {
        marker.markerMaterial.dispose();
        marker.haloMaterial.dispose();
        marker.pinGeometry.dispose();
      });
      markerGeometry.dispose();
      haloGeometry.dispose();
      pinMaterial.dispose();
      grid.children.forEach((child) => {
        (child as THREE.Line).geometry.dispose();
      });
      gridMaterial.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringTexture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.canvasHost} ref={canvasHostRef} />

      {NAV_ITEMS.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={styles.label}
          ref={(el) => {
            labelRefs.current[index] = el;
          }}
        >
          <span className={styles.labelIndex}>
            {String(index + 1).padStart(2, '0')}
          </span>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
