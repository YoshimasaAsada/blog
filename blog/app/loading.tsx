/**
 * ロード中のに出すやつ
 */
import { LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="LoadMain">
      <div className="progressBarContainer">
        <h2>Now Loading・・・</h2>
        <LinearProgress />
      </div>
    </div>
  );
}
