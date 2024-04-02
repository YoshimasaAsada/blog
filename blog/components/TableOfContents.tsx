"use client";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

type TocProps = {
  text: string;
  id: string;
};

type TableOfContentsProps = {
  toc: TocProps[];
  containerRef: React.RefObject<HTMLDivElement>;
};

/**
 * スクロール位置を監視し、ヘッダー位置までTOCが上がったらtrue,そうでなければfalse
 * @param ref reactのrefオブジェクト
 * @returns
 */
const useScrollPosition = (ref: React.RefObject<HTMLDivElement>) => {
  const [isSticky, setSticky] = useState(false); // TOCを固定するかしないかを判定する

  useEffect(() => {
    const boxTop = ref.current ? ref.current.getBoundingClientRect().top : 0;
    const headerHeight = 70; // ヘッダーの高さを定義
    const initialTopPosition = boxTop - headerHeight; // コンポーネントが固定されるべき初期位置を計算

    const handleScroll = () => {
      // スクロール位置がコンポーネントの初期位置を超えたかどうかを判定
      const isOverInitialPosition = window.scrollY >= initialTopPosition;
      setSticky(isOverInitialPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return isSticky;
};

export const TableOfContents = ({
  toc,
  containerRef,
}: TableOfContentsProps) => {
  const [isExpanded, setExpanded] = useState<boolean>(true);
  const boxRef = useRef<HTMLDivElement | null>(null); // Boxコンポーネントへの参照
  const isSticky = useScrollPosition(boxRef);

  // 親コンテナの幅を動的に取得し、固定表示時に適用
  // fixが適用された時にレイアウトが崩れるため
  const containerWidth = containerRef.current
    ? containerRef.current.offsetWidth
    : "100%";

  const handleLinkClick = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    event.preventDefault();
    const headerOffset = 70; // ヘッダーの高さを考慮
    const elementPosition = document.getElementById(id)?.offsetTop || 0;
    const offsetPosition = elementPosition - headerOffset - 20; // 追加のオフセット

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const handleDrawerToggle = () => {
    setExpanded(!isExpanded);
  };

  return (
    <Box
      ref={boxRef}
      sx={{
        position: isSticky ? "fixed" : "static",
        top: isSticky ? "70px" : "0px",
        width: containerWidth, // 親コンテナの幅を適用
        zIndex: 2,
        overflow: "auto",
        height: isSticky ? `calc(100vh - 70px)` : "auto",
      }}>
      <Typography variant="h6" sx={{ m: 2 }}>
        目次
      </Typography>
      <List>
        {toc.map((data: any) => (
          <ListItem
            key={data.id}
            component="div"
            onClick={(e) => handleLinkClick(e, data.id)}
            sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                pl: data.tag === "h2" ? 2 : data.tag === "h3" ? 4 : 1,
              }}>
              <ListItemText
                primary={data.tag === "h1" ? data.text : "-" + data.text}
                primaryTypographyProps={{
                  sx: {
                    "&:hover": { bgcolor: "gray.500", borderRadius: "4px" },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TableOfContents;
