"use client";
import { useEffect, useRef, useState } from "react";
import { client } from "@/libs/client";
import parse from "html-react-parser";
import { Blog } from "@/types/blog";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { renderToc } from "../../../libs/render-toc";
import TableOfContents from "@/components/TableOfContents";

interface PageProps {
  params: {
    id: string;
  };
}

interface TocItem {
  text: string;
  id: string;
}

export default function Page({ params }: PageProps) {
  const tocContainerRef = useRef(null);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.getListDetail({
        endpoint: "blogs",
        contentId: params.id,
      });
      setBlog(data);

      const toc = renderToc(data.content);
      setToc(toc);
    };

    if (params && params.id) {
      fetchData();
    }
  }, [params.id]);

  return (
    <main>
      <Container>
        <Grid container spacing={2}>
          {/* メインコンテンツ */}
          <Grid item xs={12} md={9}>
            <h1 className="title">{blog?.title}</h1>
            <div className="blog">
              {blog?.content ? parse(blog?.content) : null}
            </div>
          </Grid>
          {/* TOCサイドバー */}
          <Grid item xs={12} md={3}>
            <Card sx={{ minWidth: 275 }} ref={tocContainerRef}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  {/* be{bull}nev{bull}o{bull}lent */}
                  test
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            <TableOfContents toc={toc} containerRef={tocContainerRef} />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
