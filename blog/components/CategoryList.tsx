"use client";
import { client } from "@/libs/client";
import { Category } from "@/types/category";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.get({
        endpoint: "categories",
      });
      setCategories(data.contents || []);
    };

    fetchData();
  }, []);

  console.log(categories);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // 通常時のスタイルとホバー時のスタイル
  const normalStyle = {
    color: "white",
    borderColor: "white",
    margin: "2px",
  };

  const hoverStyle = {
    color: "white", // ホバー時の文字色を変更
    borderColor: "gray", // ホバー時の境界線の色を変更
    backgroundColor: "gray", // ホバー時の背景色を変更
    margin: "2px",
  };

  return (
    <>
      <Box>
        <Typography
          variant="h3"
          component="h3"
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
            textDecorationThickness: "2px", // 下線の太さを調整
          }}>
          Categories
        </Typography>
        {categories?.map((category: any) => {
          return (
            <Link key={category.id} href={`/blog?category=${category.id}`}>
              <Chip
                label={category.name}
                clickable
                variant="outlined"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={
                  hoveredCategory === category.id ? hoverStyle : normalStyle
                }
              />
            </Link>
          );
        })}
      </Box>
    </>
  );
};
