'use client';
// ライブラリ関連
import { Box, Chip, Container, Grid, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import ProfileSection from '@/components/ProfileSection';
import { SkillsSection } from '@/components/SkillsSection';
import { CareerSection } from '@/components/CareerSection';

/**
 * プロフィールページ作成
 * @returns
 */
export default function Page() {
  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{ marginTop: 4, marginBottom: 4 }}
      >
        <ProfileSection />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            こんにちは〜
            <br />
            EC系のSaaSミドルベンチャーでエンジニアをやりつつ、副業でプログラミングスクールのメンターをしている新卒二年目のエンジニアです！
            <br />
            現職ではフロントエンド開発、バックエンド開発、インフラ、情シスと全部やっています。
            部署的にはインフラの部署なので、インフラよりのフルスタックエンジニアです。
            器用貧乏になりそうなのが心配です。
            <br />
            最近の趣味はこのブログを立ち上げたこともあり、おしゃれな個人のTechブログを探すのにハマっています。
            探せば意外とオシャレでいけてる個人テックブログがあってびっくりします！
            Qitaのドメインマジで強すぎだろ、、とSEOについて悩む日々です。
            あとはこの前フットサルに行ったらめちゃくちゃ楽しかったので、個サルにも通いたいです。
            <Typography variant="h5" paddingTop={2} paddingBottom={1}>
              今後の展望
            </Typography>
            直近2-3年でフルスタックのtechリードを目指したいと思っています。
            そこからはあまり詳細には考えていないですが、AIの発展状況とかもみつつ何をするかは考えたいですね！
          </motion.div>
        </Grid>
        <SkillsSection />
      </Grid>
      <CareerSection />
    </Container>
  );
}
