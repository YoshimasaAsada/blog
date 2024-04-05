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
  level: number;
};

type TableOfContentsProps = {
  toc: TocProps[];
  containerRef: React.RefObject<HTMLDivElement>;
};

/**
 * スクロール位置を監視して、上まで行けばTOCをヘッダー手前で固定するためのisStickyのフラグを返す
 * @param ref
 * @returns
 */
const useScrollPosition = (ref: React.RefObject<HTMLDivElement>) => {
  // TOCを固定するかどうかフラグ
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const boxTop = ref.current ? ref.current.getBoundingClientRect().top : 0;
    const headerHeight = 70;
    const initialTopPosition = boxTop - headerHeight;

    const handleScroll = () => {
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
  const boxRef = useRef<HTMLDivElement | null>(null);
  const isSticky = useScrollPosition(boxRef);
  const [activeId, setActiveId] = useState("");

  const containerWidth = containerRef.current
    ? containerRef.current.offsetWidth
    : "100%";

  const smoothScrollTo = (id: string) => {
    const headerOffset = 70;
    const elementPosition = document.getElementById(id)?.offsetTop || 0;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    let isScrolling: number; // `number`型として宣言

    const handleScroll = () => {
      window.clearTimeout(isScrolling);

      isScrolling = window.setTimeout(() => {
        // タイプスクリプト環境での`setTimeout`はグローバルではなく`window`オブジェクト経由でアクセスするのが一般的
        // スクロールが一定時間停止したとみなされたら実行
        setActiveId(id); // スクロール終了時にハイライトを更新

        // このスクロールハンドラを削除
        window.removeEventListener("scroll", handleScroll);
      }, 66); // 66ミリ秒間隔でスクロールイベントの発生がなければ、スクロールが終了したとみなす
    };

    window.addEventListener("scroll", handleScroll);
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    event.preventDefault();
    smoothScrollTo(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      let foundSectionId = "";
      for (const section of toc) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const headerOffset = 70;
          if (rect.top - headerOffset < 0) {
            foundSectionId = section.id;
          } else {
            break;
          }
        }
      }

      if (foundSectionId !== activeId) {
        setActiveId(foundSectionId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc, activeId]);

  return (
    <Box
      ref={boxRef}
      sx={{
        position: isSticky ? "fixed" : "static",
        top: isSticky ? "70px" : "0px",
        width: containerWidth,
        zIndex: 2,
        overflow: "auto",
        height: "auto",
        borderRadius: "4px",
        border: "1px solid #888",
      }}>
      <Typography variant="h6" sx={{ m: 2, borderBottom: "1px solid #ccc" }}>
        目次
      </Typography>
      <List>
        {toc.map((data) => (
          <ListItem
            key={data.id}
            component="div"
            onClick={(e) => handleLinkClick(e, data.id)}
            sx={{
              display: "block",
              paddingTop: "0px", // 上のパディングを減らす
              paddingBottom: "0px", // 下のパディングを減らす
            }}>
            <ListItemButton
              sx={{
                pl: `${data.level * 15}px`, // 階層に基づく左側のパディング
                pr: "8px", // 右側のパディングを設定
                minHeight: "36px", // ボタンの最小高さを設定して縦のスペースを減らす
                color: activeId === data.id ? "primary.main" : "inherit",
                borderLeft: activeId === data.id ? "4px solid" : "", // アクティブ時の左側ボーダー
                borderColor: activeId === data.id ? "primary.main" : "",
                backgroundColor: activeId === data.id ? "action.hover" : "",
                "&:hover": {
                  color: "primary.light",
                  borderLeft: "4px solid", // ホバー時の左側ボーダー
                  borderColor: "primary.main", // ホバー時のボーダー色
                  backgroundColor: "action.hover", // ホバー時の背景色変更
                },
              }}>
              <ListItemText primary={data.text} sx={{ m: 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TableOfContents;
