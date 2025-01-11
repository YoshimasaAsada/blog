// ライブラリ関連
import Image from 'next/image';
import {
  Box,
  Button,
  Chip,
  Container,
  Fade,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import SyncIcon from '@mui/icons-material/Sync';
import * as cheerio from 'cheerio';
import XIcon from '@mui/icons-material/X';

// 型定義とかその辺
import { getAllBlogs, getBlogById } from '@/libs/client';
import { Blog } from '@/types/blog';
import { renderToc } from '../../../../libs/render-toc';
import { processBlogContent } from '@/utils/processBlogContent';

// コンポーネント
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import { Metadata } from 'next';

/**
 * ビルド時に詳細ページを作成させる
 * @returns
 */
export async function generateStaticParams() {
  const contents = await getAllBlogs();
  const paths = contents.map((blog: any) => {
    return { id: blog.id };
  });
  return [...paths];
}

/**
 * ビルド時にメタデータを作成させる
 * @param param0
 * @returns
 */
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const blog = await getBlogById(params);
  const $ = cheerio.load(blog.content);
  const text = $('body').text();
  const description = text.slice(0, 100).replace(/\s+/g, ' ').trim();
  const eyecatchUrl = blog.eyecatch.url;

  return {
    title: blog.title,
    description: description,
    alternates: {
      canonical: `https://yasdtech.com/blog/${blog.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: description,
      images: [eyecatchUrl],
    },
    openGraph: {
      title: blog.title,
      description: description,
      locale: 'ja_JP',
      type: 'article',
      url: `https://yasdtech.com/blog/${blog.id}`,
      images: [
        {
          url: eyecatchUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  };
}

/**
 * 各ブログのページ
 * @param params ブログのID
 * @returns
 */
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const blog: Blog = await getBlogById(params);
  const toc = renderToc(blog.content);
  const highlightedContent = await processBlogContent(blog.content);

  return (
    <Fade in={true} timeout={400}>
      <Container>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ paddingTop: '5px' }}
          >
            {blog.category.map((category, index: number) => (
              <Chip
                key={index}
                label={`# ${category.name}`}
                variant="outlined"
                sx={{ color: 'white' }}
              />
            ))}
          </Stack>
        </Box>
        <h1 className="title">{blog.title}</h1>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ padding: '5px' }}
          >
            <AccessTimeRoundedIcon />
            <Typography suppressHydrationWarning={true}>
              投稿日：
              {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ padding: '5px' }}
          >
            <SyncIcon />
            <Typography suppressHydrationWarning={true}>
              更新日：
              {new Date(blog.updatedAt).toLocaleDateString('ja-JP')}
            </Typography>
          </Stack>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                style={{
                  marginBottom: '10px',
                  marginTop: '10px',
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover', // 画像が縮小されすぎないようにカバー
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                }}
                // placeholder="blur"
                priority
                src={blog.eyecatch.url}
                width={100}
                height={200}
                alt="ttitleImage"
                sizes="(min-width: 1024px) 100vw, 60vw"
                className="titleImage"
              />
            </Box>
            <Box
              className="blog"
              dangerouslySetInnerHTML={{ __html: highlightedContent }}
            />
          </Grid>
          <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
            <TableOfContents toc={toc} />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // スマホで縦に並ぶように調整
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: '20px',
            gap: '12px', // ボタン間のスペースを十分に確保
          }}
        >
          <Link href="/blog" passHref>
            <Button
              fullWidth
              variant="contained"
              sx={{
                padding: '12px 24px', // 内部パディングでタップ領域を拡大
                width: { xs: '100%', sm: '300px' }, // スマホでは幅を100%に
                height: '56px', // 高さを48px以上に
                background: '#666666',
                color: 'white',
                borderRadius: 5,
                ':hover': { background: '#333' },
              }}
            >
              All Blogs
            </Button>
          </Link>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              `https://yasdtech.com/blog/${blog.id}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <Button
              fullWidth
              variant="contained"
              sx={{
                padding: '12px 24px',
                width: { xs: '100%', sm: '200px' },
                height: '56px',
                background: '#1DA1F2',
                color: 'white',
                borderRadius: 5,
                ':hover': { background: '#0d95e8' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <XIcon sx={{ marginRight: '8px', fontSize: '24px' }} />
              シェアする
            </Button>
          </Link>
        </Box>
      </Container>
    </Fade>
  );
}
