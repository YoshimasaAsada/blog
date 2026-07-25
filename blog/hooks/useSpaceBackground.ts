import { RefObject, useEffect } from 'react';
import * as THREE from 'three';

/** 星のレイヤー定義。奥ほど数が多く、小さく、動きが遅い */
const STAR_LAYERS = [
  { count: 1600, spread: 2400, size: 2.2, speed: 0.2, opacity: 0.65 },
  { count: 700, spread: 1500, size: 3.6, speed: 0.5, opacity: 0.8 },
  { count: 220, spread: 900, size: 6.0, speed: 1.0, opacity: 1.0 },
] as const;

/** 星の色。白 / 青白 / 淡いオレンジを混ぜて宇宙っぽさを出す */
const STAR_COLORS = [
  new THREE.Color('#ffffff'),
  new THREE.Color('#cfe3ff'),
  new THREE.Color('#9db9ff'),
  new THREE.Color('#ffd9a8'),
];

/**
 * 丸い光点のテクスチャを生成する（点をそのまま描くと四角くなるため）
 */
function createStarTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  gradient.addColorStop(0.6, 'rgba(255,255,255,0.15)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * ホーム画面の宇宙背景。
 * 多層の星フィールドを描画し、ポインタ位置に応じて
 * カメラを僅かに動かして視差を出す。
 *
 * @param ref canvasを差し込むコンテナ要素のref
 */
export function useSpaceBackground(ref: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // WebGLが使えない環境ではCSSの背景だけで成立させる
      return;
    }

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearAlpha(0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 6000);
    camera.position.set(0, 0, 620);

    // ---------------------------------------------------------------
    // 星フィールド
    // ---------------------------------------------------------------
    const starTexture = createStarTexture();
    const starFields = STAR_LAYERS.map((layer) => {
      const positions = new Float32Array(layer.count * 3);
      const colors = new Float32Array(layer.count * 3);

      for (let i = 0; i < layer.count; i++) {
        positions[i * 3] = THREE.MathUtils.randFloatSpread(layer.spread * 2);
        positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(layer.spread);
        positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(layer.spread);

        const color =
          STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        const brightness = 0.55 + Math.random() * 0.45;
        colors[i * 3] = color.r * brightness;
        colors[i * 3 + 1] = color.g * brightness;
        colors[i * 3 + 2] = color.b * brightness;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: layer.size,
        map: starTexture,
        vertexColors: true,
        transparent: true,
        opacity: layer.opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      return { points, material, geometry, config: layer };
    });

    // ---------------------------------------------------------------
    // ポインタ視差
    // ---------------------------------------------------------------
    const pointer = { x: 0, y: 0 };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });
    }

    // ---------------------------------------------------------------
    // 描画ループ
    // ---------------------------------------------------------------
    const clock = new THREE.Clock();
    let frameId = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();

      starFields.forEach(({ points, material, config }, index) => {
        points.rotation.y = elapsed * 0.008 * config.speed;
        points.rotation.x = elapsed * 0.004 * config.speed;
        // 層ごとに位相をずらして瞬きを表現
        material.opacity =
          config.opacity * (0.82 + 0.18 * Math.sin(elapsed * 0.9 + index * 2));
      });

      camera.position.x += (pointer.x * 55 - camera.position.x) * 0.025;
      camera.position.y += (-pointer.y * 35 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    if (prefersReducedMotion) {
      // アニメーションを止め、静止画として1フレームだけ描画する
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    } else {
      frameId = requestAnimationFrame(render);
    }

    // ---------------------------------------------------------------
    // リサイズ
    // ---------------------------------------------------------------
    const handleResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);

      if (prefersReducedMotion) renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);

    // ---------------------------------------------------------------
    // 後片付け
    // ---------------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);

      starFields.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      starTexture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [ref]);
}
