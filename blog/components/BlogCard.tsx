import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export const BlogCard = ({ content }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/blog/${content.id}`}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: 300,
          backgroundColor: isHovered ? "#000" : "#fff",
          color: isHovered ? "#fff" : "inherit",
          overflow: "hidden",
          boxShadow: isHovered
            ? "0 0 20px 0 rgba(255, 255, 255, 0.5)" // マウスホバー時の影
            : "none",
          transition: "box-shadow ease-in-out", // 影の変化にトランジションを追加
          "&:hover .MuiCardMedia-root": {
            transform: "scale(1.05)",
            transition: "transform 0.2s ease-in-out",
          },
        }}>
        {isHovered ? (
          <>
            <Card
              sx={{
                position: "relative",
                filter: "grayscale(100%)",
                height: "100%",
              }}>
              <CardActionArea
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: 2,
                }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "white", textAlign: "center" }}>
                  View
                </Typography>
              </CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={content.eyecatch?.url}
                alt={content.title}
                sx={{
                  transition: "transform 0.5s ease-in-out",
                }}
              />
              <CardContent
                sx={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "60%",
                }}>
                <Typography variant="h6" component="div" color="text.secondary">
                  {content.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  suppressHydrationWarning>
                  投稿日：
                  {new Date(content.publishedAt).toLocaleDateString("ja-JP")}
                </Typography>
                <Typography color="text.secondary" display="inline">
                  タグ：
                </Typography>
                {content.category.map((category: any, index: number) => (
                  <Chip key={index} label={category?.name} variant="outlined" />
                ))}
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <CardMedia
              component="img"
              height="140"
              image={content.eyecatch?.url}
              alt={content.title}
              sx={{
                transition: "transform 0.5s ease-in-out",
              }}
            />
            <CardContent
              sx={{
                flexDirection: "column",
                justifyContent: "space-between",
                height: "60%", // カードの残りの高さを埋める
              }}>
              <Typography variant="h6" component="div" color="text.secondary">
                {content.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                suppressHydrationWarning>
                投稿日：
                {new Date(content.publishedAt).toLocaleDateString("ja-JP")}
              </Typography>
              <Typography color="text.secondary" display="inline">
                タグ：
              </Typography>
              {content.category.map((category: any, index: number) => (
                <Chip key={index} label={category?.name} variant="outlined" />
              ))}
            </CardContent>
          </>
        )}
      </Card>
    </Link>
  );
};
