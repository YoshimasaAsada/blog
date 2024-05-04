import { getAllCategories } from "@/libs/client";
import { Box, Chip, Typography } from "@mui/material";
import Link from "next/link";

export const CategoryList = async () => {
  const categories = await getAllCategories();

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
          <Link key={category.id} href={`/category/${category.id}`} passHref>
            <Chip
              label={category.name}
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
        );
      })}
    </Box>
  );
};
