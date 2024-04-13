"use client";
import { client } from "@/libs/client";
import { Category } from "@/types/category";
import { Chip, Container } from "@mui/material";
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
      <div>
        <h2>Category</h2>
      </div>
      <div>
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
      </div>
    </>
  );
};
