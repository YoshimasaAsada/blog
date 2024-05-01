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
};

export const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState("");

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
      sx={{
        position: "sticky",
        top: "80px", // ヘッダーの高さが70pxなので、10px下に固定する
        maxHeight: "calc(100vh - 80px)", // ビューポート高さからtopの値を引いた高さを最大高さとする
        overflowY: "auto", // コンテンツが多い場合にスクロールバーを表示
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
                // color: activeId === data.id ? "#6c6873" : "inherit",
                borderLeft: activeId === data.id ? "4px solid" : "", // アクティブ時の左側ボーダー
                borderColor: activeId === data.id ? "#6c6873" : "",
                "&:hover": {
                  // color: "#6c6873",
                  borderLeft: "4px solid", // ホバー時の左側ボーダー
                  borderColor: "#6c6873", // ホバー時のボーダー色
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
