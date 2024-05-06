import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { sendInquiry } from "@/utils/sendInquiry";

export default function InquiryPage() {
  return (
    <Container maxWidth="sm">
      {/* <Paper elevation={4} sx={{ p: 4, backgroundColor: "grey.200" }}> */}
      <Typography
        component="h3"
        variant="h3"
        sx={{ paddingTop: "20px" }}
        style={{
          textDecoration: "underline",
          textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
          textDecorationThickness: "2px", // 下線の太さを調整
        }}>
        お問い合わせ
      </Typography>
      <form action={sendInquiry}>
        <Grid container spacing={3}>
          {/* 名前フィールド */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              label="名前"
              variant="outlined"
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                sx: {
                  color: "white",
                  backgroundColor: "gray",
                },
              }}
            />
          </Grid>

          {/* メールアドレスフィールド */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="メールアドレス"
              type="email"
              variant="outlined"
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                sx: {
                  color: "white",
                  backgroundColor: "gray",
                },
              }}
            />
          </Grid>

          {/* メッセージフィールド */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="message"
              name="message"
              label="メッセージ"
              multiline
              rows={4}
              variant="outlined"
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                sx: {
                  color: "white",
                  backgroundColor: "gray",
                },
              }}
            />
          </Grid>

          {/* 送信ボタン */}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              送信
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* </Paper> */}
    </Container>
  );
}
