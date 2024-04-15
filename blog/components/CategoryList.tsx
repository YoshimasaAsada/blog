"use client";
import { client } from "@/libs/client";
import { Category } from "@/types/category";
import { Box, Chip, Container, Typography } from "@mui/material";
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

  return (
    <>
      <Typography
        variant="h2"
        component="h2"
        style={{
          textDecoration: "underline",
          textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
          textDecorationThickness: "2px", // 下線の太さを調整
        }}>
        Category
      </Typography>

      <Box>
        {categories?.map((category: any) => {
          return (
            <>
              <Link href={`/blog?category=${category.id}`}>
                <Chip
                  key={category.id}
                  label={category.name}
                  variant="outlined"
                  style={{ color: "white", borderColor: "white" }}
                />
              </Link>
            </>
          );
        })}
      </Box>
    </>
  );
};
