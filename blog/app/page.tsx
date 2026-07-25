'use client';

// ライブラリ関連
import { useRef } from 'react';
import Link from 'next/link';

// 型定義とかその辺
import GlobeNav from '@/components/GlobeNav';
import { useSpaceBackground } from '@/hooks/useSpaceBackground';
import styles from './page.module.css';

export default function Page() {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  useSpaceBackground(canvasHostRef);

  return (
    <main className={styles.page}>
      {/* 背景 : three.jsの星空 + CSSの星雲 */}
      <div className={styles.background} aria-hidden="true">
        <div ref={canvasHostRef} className={styles.canvasHost} />
        <div className={styles.nebula} />
        <div className={`${styles.shootingStar} ${styles.shootingStar1}`} />
        <div className={`${styles.shootingStar} ${styles.shootingStar2}`} />
        <div className={`${styles.shootingStar} ${styles.shootingStar3}`} />
        <div className={styles.vignette} />
      </div>

      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <p className={`${styles.badge} ${styles.rise}`}>
              <span className={styles.badgeDot} />
              Welcome to yasdtech.com
            </p>

            <h1 className={`${styles.title} ${styles.rise} ${styles.delay1}`}>
              <span className={styles.titleLine}>YASD</span>
              <span className={styles.titleLine}>
                TECH<span className={styles.titleAccent}>.</span>
              </span>
            </h1>

            <p className={`${styles.lead} ${styles.rise} ${styles.delay2}`}>
              広い宇宙の片隅から、フロントエンドからバックエンドまでの学びを少しずつ書き残しているテックブログです。
            </p>
          </div>

          {/* ドラッグで回せる地球儀型のナビゲーション */}
          <div className={`${styles.globe} ${styles.rise} ${styles.delay3}`}>
            <GlobeNav />
            <p className={styles.hint}>Drag to explore — ドラッグして回せます</p>
          </div>
        </div>

        <div className={`${styles.footer} ${styles.rise} ${styles.delay4}`}>
          <span>© {new Date().getFullYear()} YASD TECH</span>
          <span className={styles.footerRule} />
          <Link href="/privacy_poricy" className={styles.footerLink}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
