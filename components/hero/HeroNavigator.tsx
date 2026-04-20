"use client";

import styles from "./HeroNavigator.module.css";

export default function HeroNavigator() {
  return (
    <div className="pointer-events-none relative mx-auto h-full w-full select-none" aria-hidden="true">
      <div className={styles.wrapper}>
        <div className={styles.glow} />

        <div className={`${styles.dotParticle} ${styles.p1}`} />
        <div className={`${styles.dotParticle} ${styles.p2}`} />
        <div className={`${styles.dotParticle} ${styles.p3}`} />

        <div className={styles.imgFloat}>
          <img src="/infografia-copilot.png" alt="Copilot 1.0 infografia" className={styles.imgCore} draggable={false} />
        </div>
      </div>
    </div>
  );
}
