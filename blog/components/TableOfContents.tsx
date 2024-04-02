"use client";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// スクロール位置を監視するカスタムフック
const useScrollPosition = (ref) => {
  const [isSticky, setSticky] = useState(false);

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

export const TableOfContents = ({ toc }) => {
  const [isExpanded, setExpanded] = useState<boolean>(true);
  const boxRef = useRef(null); // Boxコンポーネントへの参照
  const isSticky = useScrollPosition(boxRef);

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
        top: isSticky ? "70px" : "0px", // ヘッダーの高さに合わせて調整
        maxWidth: 360,
        width: "100%",
        zIndex: 2,
        overflow: "auto",
        height: isSticky ? `calc(100vh - 70px)` : "auto",
        boxShadow: isSticky ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
      }}>
      <Typography variant="h6" sx={{ m: 2 }}>
        目次
      </Typography>
      <IconButton onClick={handleDrawerToggle} sx={{ m: 2 }}>
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
      {isExpanded && (
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
      )}
    </Box>
  );
};

export default TableOfContents;
