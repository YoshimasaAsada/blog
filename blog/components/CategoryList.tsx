// ライブラリ関連
import { Box, Chip, Typography } from "@mui/material";
import Link from "next/link";

// 型定義とかその辺
import { getAllCategories } from "@/libs/client";
import { CategoryInContents } from "@/types/category";

/**
 * カテゴリー一覧のテンプレート
 * @returns
 */
export const CategoryList = ({ contents }: CategoryInContents) => {

  return (
    <Box>
      <Typography
        variant="h3"
        component="h3"
        style={{
          textDecoration: "underline",
          textUnderlineOffset: "8px",
          textDecorationThickness: "2px",
        }}>
        Categories
      </Typography>
      {contents.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`} passHref>
          <Chip
            label={`# ${category.name}`}
            clickable
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              margin: "2px",
              "&:hover": {
                backgroundColor: "white",
                color: "gray",
              },
            }}
          />
        </Link>
      ))}
    </Box>
  );
};
