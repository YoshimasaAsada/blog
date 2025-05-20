// ライブラリ関連
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="#ffffff" mt={1}>
      {'Copyright © yasdtech'}
      {new Date().getFullYear()}
    </Typography>
  );
}

/**
 * フッターのテンプレート
 * @returns
 */
export default function Footer() {
  return (
    <AppBar
      component="footer"
      position="static"
      sx={{
        backgroundColor: '#1a1a1a',
        borderTop: '1px solid', // ここで borderTop を設定
        borderColor: '#333333',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            {' '}
            <Stack direction="row" justifyContent="left" spacing={1} useFlexGap>
              <IconButton
                color="inherit"
                href="https://github.com/YoshimasaAsada"
                aria-label="GitHub"
                sx={{ alignSelf: 'center' }}
              >
                <GitHubIcon sx={{ fontSize: 50 }} />
              </IconButton>
            </Stack>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Link color="#ffffff" href="/">
              ホーム
            </Link>
            <Link color="#ffffff" href="/profile">
              プロフィール
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Link color="#ffffff" href="/privacy_poricy">
              プライバシーポリシー
            </Link>
            <Link color="#ffffff" href="/contact">
              お問い合わせ
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Copyright />
          </div>
        </Box>
      </Container>
    </AppBar>
  );
}
