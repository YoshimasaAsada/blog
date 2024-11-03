'use client';
// ライブラリ関連
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

type TocProps = {
  text: string;
  id: string;
  level: number;
};

type TableOfContentsProps = {
  toc: TocProps[];
};

/**
 * ブログのTOCのコンポーネント
 * @param param0
 * @returns
 */
export const TableOfContents = ({ toc }: TableOfContentsProps) => {
  // 現在見られているコンテンツの位置を保持する
  const [activeId, setActiveId] = useState('');

  /**
   * TOCが押された時のアクション
   * @param id
   */
  const smoothScrollTo = (id: string) => {
    // ヘッダーの位置を考慮して該当コンテンツにスクロール
    const headerOffset = 70;
    const elementPosition = document.getElementById(id)?.offsetTop || 0;
    const offsetPosition = elementPosition - headerOffset;

    // TOCで該当項目にいく時いい感じにゆっくりスクロールさせる
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    let isScrolling: number;

    const handleScroll = () => {
      window.clearTimeout(isScrolling);

      // ボタンを押してスクロールした後、見てる項目にハイライト当てる
      isScrolling = window.setTimeout(() => {
        setActiveId(id);
        window.removeEventListener('scroll', handleScroll);
      }, 66);
    };

    window.addEventListener('scroll', handleScroll);
  };

  /**
   * 目次の項目が押された時のアクション
   * @param event
   * @param id
   */
  const handleLinkClick = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    event.preventDefault();
    smoothScrollTo(id);
  };

  useEffect(() => {
    /**
     * スクロールを監視して、該当項目に辿り着いたらTOCのハイライト更新
     */
    const handleScroll = () => {
      let foundSectionId = '';
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc, activeId]);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '80px',
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'auto',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mr: 2,
          ml: 2,
          borderBottom: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FormatListNumberedIcon fontSize="large" />
        Index
      </Typography>
      <List>
        {toc.map((data) => (
          <ListItem
            key={data.id}
            component="div"
            onClick={(e) => handleLinkClick(e, data.id)}
            sx={{
              display: 'block',
              paddingTop: '0px',
              paddingBottom: '0px',
            }}
          >
            <ListItemButton
              sx={{
                pl: `${data.level * 15}px`,
                pr: '8px',
                minHeight: '36px',
                borderLeft: activeId === data.id ? '4px solid' : '',
                borderColor: activeId === data.id ? '#6c6873' : '',
                '&:hover': {
                  borderLeft: '4px solid',
                  borderColor: '#6c6873',
                },
              }}
            >
              <ListItemText primary={data.text} sx={{ m: 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TableOfContents;
