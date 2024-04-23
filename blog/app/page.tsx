"use client";
import { useRef } from "react";
import Link from "next/link";
import styles from "./LinkStyles.module.css"; // CSSモジュールをインポート
import { useEarthBackground } from "@/hooks/useEarthBackground";

export default function Page() {
  const mountRef = useRef(null);
  useEarthBackground(mountRef);

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
