import { Container } from "@mui/material";

export default function Page() {
  return (
    // TODO：あとでデザイン修正する
    <Container
      style={{
        width: "100%",
        height: "100vh",
        padding: 0,
      }}>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSc0rzwjNjDRJSZw5zEG5GfrfcWmunwnMSXUoxykl2BM5C8edg/viewform?embedded=true"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}>
        読み込んでいます…
      </iframe>
    </Container>
  );
}
