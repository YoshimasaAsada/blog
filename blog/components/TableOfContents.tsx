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

// TOCをクリックした時にその位置まで動かすやつ
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
    setActiveId(id); // クリックされたセクションIDをアクティブに設定

    const headerOffset = 70;
    const elementPosition = document.getElementById(id)?.offsetTop || 0;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  // 目次に対してどこを見ているか追従させ、ハイライトを当てる
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      let foundSectionId = "";
      for (const section of toc) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const headerOffset = 70;
          // セクションがビューポートの上端より上にある場合
          if (rect.top - headerOffset < 0) {
            foundSectionId = section.id;
          } else {
            // ビューポートの上端に最も近いセクションが見つかったらループを抜ける
            break;
          }
        }
      }

      // 見つかったセクションが現在のアクティブなセクションと異なる場合、アクティブなセクションを更新
      if (foundSectionId !== activeId) {
        setActiveId(foundSectionId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc, activeId]); // 依存配列にtocとactiveIdを追加

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
        {toc.map((data) => (
          <ListItem
            key={data.id}
            component="div"
            onClick={(e) => handleLinkClick(e, data.id)}
            sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                pl: `${data.level * 8}px`,
                color: activeId === data.id ? "primary.main" : "inherit", // アクティブなセクションに基づいて背景色を変更
                "&:hover": { color: "primary.light" },
              }}>
              <ListItemText primary={data.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TableOfContents;
