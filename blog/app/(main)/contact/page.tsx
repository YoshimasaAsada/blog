import React from "react";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import { sendInquiry } from "@/utils/sendInquiry";

export default function InquiryPage() {
  return (
    <Container maxWidth="sm">
      <Typography
        component="h3"
        variant="h3"
        sx={{ paddingTop: "20px", paddingBottom: "20px" }}
        style={{
          textDecoration: "underline",
          textUnderlineOffset: "8px",
          textDecorationThickness: "2px",
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
                  backgroundColor: "#666666",
                },
              }}
              sx={{
                color: "white",
                "& label.Mui-focused": {
                  color: "#fff",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#0000ff",
                },
                "& .MuiOutlinedInput-root": {
                  // "& fieldset": {
                  //   borderColor: "#fff",
                  // },
                  // "&:hover fieldset": {
                  //   borderColor: "#ffff",
                  // },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray",
                  },
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
                  backgroundColor: "#666666",
                },
              }}
              sx={{
                color: "white",
                "& label.Mui-focused": {
                  color: "#fff",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#0000ff",
                },
                "& .MuiOutlinedInput-root": {
                  // "& fieldset": {
                  //   borderColor: "#fff",
                  // },
                  // "&:hover fieldset": {
                  //   borderColor: "#ffff",
                  // },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray",
                  },
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
              label="問い合わせ内容"
              multiline
              rows={4}
              variant="outlined"
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                sx: {
                  color: "white",
                  backgroundColor: "#666666",
                },
              }}
              sx={{
                color: "white",
                "& label.Mui-focused": {
                  color: "#fff",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#0000ff",
                },
                "& .MuiOutlinedInput-root": {
                  // "& fieldset": {
                  //   borderColor: "#fff",
                  // },
                  // "&:hover fieldset": {
                  //   borderColor: "#ffff",
                  // },
                  "&.Mui-focused fieldset": {
                    borderColor: "gray",
                  },
                },
              }}
            />
          </Grid>

          {/* 送信ボタン */}
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: "#333333",
                color: "white",
                borderRadius: 5,
                ":hover": { background: "#666666" },
              }}>
              送信
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
