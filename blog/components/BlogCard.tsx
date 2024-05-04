import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Link from "next/link";

export const BlogCard = ({ content }: any) => {
  return (
    <Link href={`/blog/${content.id}`} passHref>
      <Card
        sx={{
          position: "relative",
          height: 350,
          overflow: "hidden",
          transition: "box-shadow ease-in-out",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#fff",
            boxShadow: "0 0 20px 0 rgba(255, 255, 255, 0.5)",
          },
          "&:hover .hover-overlay": {
            display: "flex",
          },
          "&:hover .MuiCardMedia-root": {
            transform: "scale(1.05)",
            transition: "transform 0.2s ease-in-out",
          },
        }}>
        <CardActionArea
          className="hover-overlay"
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            display: "none",
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
            suppressHydrationWarning={true}>
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
    </Link>
  );
};
