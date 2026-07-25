'use client';
// ライブラリ関連
import { Container, Grid, Pagination, Typography } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

// 型定義とかその辺
import { Blog } from '@/types/blog';
import { Category } from '@/types/category';

// コンポーネント
import { CategoryList } from '@/components/CategoryList';
import { BlogCard } from '@/components/BlogCard';

type PropsType = {
  blogs: Blog[];
  categories: Category[];
};

/**
 * ブログ一覧の表示・カテゴリ絞り込み・ページネーションを行うコンポーネント
 * @param param0 サーバー側で取得した全ブログと全カテゴリ
 * @returns
 */
export const BlogList = ({ blogs, categories }: PropsType) => {
  const [displayBlogs, setDisplayBlogs] = useState<Blog[]>(blogs);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [postsPerPage] = useState(4);
  const [displayCategory, setDisplayCategory] = useState<string>('All Blogs');

  useEffect(() => {
    if (selectedCategory) {
      const filteredBlogs = blogs.filter((blog) =>
        blog.category.some((cat) => cat.id === selectedCategory)
      );
      setDisplayBlogs(filteredBlogs);
    } else {
      setDisplayBlogs(blogs);
    }
    setCurrentPage(1);
  }, [blogs, selectedCategory]);

  const handleSelectCategory = (categoryId: string, categoryName: string) => {
    setSelectedCategory(categoryId);
    setDisplayCategory(categoryName);
  };

  const resetFilter = () => {
    setSelectedCategory(null);
    setDisplayCategory('All Blogs');
  };

  const paginate = (_: any, value: SetStateAction<number>) => {
    setCurrentPage(value);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = displayBlogs.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        style={{ paddingTop: '20px', paddingBottom: '20px' }}
      >
        <Grid item xs={12} md={9}>
          <div data-filename="" className="code-container">
            <div className="code-bar">
              <div className="circle" data-color="red"></div>
              <div className="circle" data-color="yellow"></div>
              <div className="circle" data-color="green"></div>
              <div className="search-name">
                <SearchIcon />
                <p className="category-name">{displayCategory}</p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {currentPosts.length > 0 ? (
              currentPosts.map((content) => (
                <Grid item xs={12} sm={12} md={6} key={content.id}>
                  <BlogCard content={content} />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" color="white" style={{ margin: '20px' }}>
                検索結果がありません。
              </Typography>
            )}
          </Grid>
          {displayBlogs.length > 0 && (
            <Pagination
              count={Math.ceil(displayBlogs.length / postsPerPage)}
              page={currentPage}
              onChange={paginate}
              color="primary"
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  },
                },
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <CategoryList
            contents={categories}
            onSelectCategory={handleSelectCategory}
            resetFilter={resetFilter}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
