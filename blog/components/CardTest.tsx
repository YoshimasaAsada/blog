import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

export const CardTest = () => {
  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: "black",
        color: "white",
      }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}>
        <Typography
          variant="h5"
          sx={{ borderBottom: "1px solid white" }}
          gutterBottom>
          Profile
        </Typography>
        <Avatar
          alt="Remy Sharp"
          src="/images/942831A9-9E6A-46F0-B9C0-5992CC219822_1_102_o.jpeg"
          sx={{ width: 70, height: 50, margin: "auto" }}
        />
        <Typography component="div">麻田</Typography>
        <Typography sx={{ mb: 1.5 }}>エンジニア</Typography>
        <Typography variant="body2">よろしくお願いします</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center", // 水平方向の中央揃え
          alignItems: "center", // 垂直方向の中央揃え（必要に応じて）
          height: "100%", // 親要素の高さが指定されている場合、この設定が中央揃えに影響を与える
        }}>
        <Link href={"/profile"}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // 水平方向の中央揃え
              alignItems: "center", // 垂直方向の中央揃え（必要に応じて）
              height: "100%", // 親要素の高さが指定されている場合、この設定が中央揃えに影響を与える
            }}>
            <Button
              size="small"
              sx={{
                color: "black", // テキスト色を白に
                backgroundColor: "white", // ボタンの背景色（テーマのプライマリーカラーを使用）
                ":hover": {
                  backgroundColor: "gray", // ホバー時の背景色を少し暗く
                },
                borderRadius: "20px", // 丸みを帯びたボーダー
              }}>
              Show Profile
            </Button>
          </Box>
        </Link>
      </CardActions>
    </Card>
  );
};
