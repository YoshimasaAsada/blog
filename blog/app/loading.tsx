/**
 * ロード中のに出すやつ
 */
import { LinearProgress } from '@mui/material';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.LoadMain}>
      <div className="progressBarContainer">
        <h2>Now Loading・・・</h2>
        <LinearProgress />
      </div>
    </div>
  );
}
