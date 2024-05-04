import { getAllCategories } from "@/libs/client";
import { Box, Chip, Typography } from "@mui/material";
import Link from "next/link";

export const CategoryList = async () => {
  const categories = await getAllCategories();

  const normalStyle = {
    color: "white",
    borderColor: "white",
    margin: "2px",
  };

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
      {categories?.map((category: any) => {
        return (
          <Link key={category.id} href={`/category/${category.id}`}>
            <Chip
              label={category.name}
              clickable
              variant="outlined"
              style={normalStyle}
            />
          </Link>
        );
      })}
    </Box>
  );
};
