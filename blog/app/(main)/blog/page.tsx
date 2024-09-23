'use client'
// ライブラリ関連
import { Container, Grid, Pagination, Typography } from '@mui/material'

// 型定義とかその辺
import { getAllBlogs, getAllCategories } from '@/libs/client'

// コンポーネント
import { CategoryList } from '@/components/CategoryList'
import { BlogCard } from '@/components/BlogCard'
import { SetStateAction, useEffect, useState } from 'react'
import { Blog } from '@/types/blog'
import { Category } from '@/types/category'
import Loading from '@/app/loading'

/**
 * ブログの一覧ページ
 * @returns
 */
export default function Page() {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([])
  const [displayBlogs, setDisplayBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [postsPerPage] = useState(4)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const blogsData = await getAllBlogs()
        const categoriesData = await getAllCategories()
        setAllBlogs(blogsData)
        setDisplayBlogs(blogsData)
        setCategories(categoriesData)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      const filteredBlogs = allBlogs.filter((blog) =>
        blog.category.some((cat) => cat.id === selectedCategory)
      )
      setDisplayBlogs(filteredBlogs)
    } else {
      setDisplayBlogs(allBlogs)
    }
  }, [allBlogs, selectedCategory])

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const resetFilter = () => {
    setSelectedCategory(null)
  }

  const paginate = (_: any, value: SetStateAction<number>) => {
    setCurrentPage(value)
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = displayBlogs.slice(indexOfFirstPost, indexOfLastPost)

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        style={{ paddingTop: '20px', paddingBottom: '20px' }}
      >
        <Grid item xs={10} md={7}>
          <Typography
            variant="h3"
            component="h3"
            style={{
              textDecoration: 'underline',
              textUnderlineOffset: '8px',
              textDecorationThickness: '2px',
            }}
          >
            Blogs
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'right' }}>
          <div
            className="to-blog-animation"
            style={{
              cursor: 'pointer',
            }}
            onClick={resetFilter}
          >
            All Blogs
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
          />
        </Grid>
      </Grid>
    </Container>
  )
}
