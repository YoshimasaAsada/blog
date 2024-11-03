import Header from '@/components/Header';
import { Box } from '@mui/material';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <Box sx={{ flex: 1, mt: '70px', mb: '70px' }}>{children}</Box>
      <Footer />
    </Box>
  );
}
