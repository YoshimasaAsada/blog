import Header from '@/components/Header';
import { Box } from '@mui/material';
import Footer from '@/components/Footer';
import { useMemo } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const memoizedChildren = useMemo(() => children, [children]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // ないとページの高さが足離ない場合、フッターの下に変なスペースが入る
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box sx={{ flex: 1, mt: '70px', mb: '70px' }}>{memoizedChildren}</Box>
      <Footer />
    </Box>
  );
}
