// ライブラリ関連
import { Box, Chip, Typography } from '@mui/material';

// 型定義とかその辺
import { Category } from '@/types/category';

type PropsType = {
  contents: Category[];
  onSelectCategory: (categoryId: string, categoryName: string) => void;
  resetFilter: () => void;
};

/**
 * カテゴリー一覧のテンプレート
 * @returns
 */
export const CategoryList = ({ contents, onSelectCategory, resetFilter }: PropsType) => {
  return (
    <div>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          textDecoration: 'underline',
          textUnderlineOffset: '8px',
          textDecorationThickness: '2px',
        }}
      >
        Categories
      </Typography>
      <Chip
        label="All Blogs"
        clickable
        variant="outlined"
        sx={{
          color: 'white',
          borderColor: 'white',
          margin: '2px',
          '&:hover': { backgroundColor: 'white', color: 'gray' },
        }}
        onClick={() => resetFilter()}
      />
      {contents.map((category) => (
        <Chip
          key={category.id}
          label={category.name}
          clickable
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'white',
            margin: '2px',
            '&:hover': { backgroundColor: 'white', color: 'gray' },
          }}
          onClick={() => onSelectCategory(category.id, category.name)}
        />
      ))}
    </div>
  );
};
