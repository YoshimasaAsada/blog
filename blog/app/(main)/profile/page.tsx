// ライブラリ関連
import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import SchoolIcon from "@mui/icons-material/School";
import Image from "next/image";

// コンポーネント
import {
  AwsIcon,
  CentosIcon,
  DockerIcon,
  LinuxIcon,
  NestIcon,
  NextIcon,
  NginxIcon,
  PostgreIcon,
  PythonIcon,
  RailsIcon,
  ReactIcon,
  RubyIcon,
  TsIcon,
} from "@/components/SvgIcon";

/**
 * プロフィールページ作成
 * @returns 
 */
export default function Page() {
  return (
      <Container>
        <Typography
          component="h3"
          variant="h3"
          sx={{ paddingTop: "20px", paddingBottom: "20px" }}
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
            textDecorationThickness: "2px", // 下線の太さを調整
          }}>
          Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            こんにちは〜
            <br />
            EC系のSssSミドルベンチャーでエンジニアをやりつつ、副業でプログラミングスクールのメンターをしている新卒二年目のエンジニアです！
            <br />
            現職ではフロントエンド開発、バックエンド開発、インフラ、情シスと全部やっています
            俗にいうフルスタックエンジニアなのかなと思っています。
            器用貧乏になりそうなのが心配です。。
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
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              component="h4"
              variant="h4"
              sx={{ paddingBottom: "20px" }}
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
                textDecorationThickness: "2px", // 下線の太さを調整
              }}>
              Skils
            </Typography>
            <TsIcon width={50} height={50} />
            <ReactIcon width={50} height={50} />
            <NestIcon width={50} height={50} />
            <CentosIcon width={50} height={50} />
            <AwsIcon width={50} height={50} />
            <LinuxIcon width={50} height={50} />
            <RubyIcon width={50} height={50} />
            <RailsIcon width={50} height={50} />
            <DockerIcon width={50} height={50} />
            <NginxIcon width={50} height={50} />
            <PythonIcon width={50} height={50} />
            <NextIcon width={50} height={50} />
            <Typography
              component="h4"
              variant="h4"
              sx={{ paddingTop: "20px", paddingBottom: "20px" }}
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
                textDecorationThickness: "2px", // 下線の太さを調整
              }}>
              qualification
            </Typography>
            <Image
              src="/images/SAA.png"
              alt="SAAIcon"
              width={100}
              height={100}
            />
          </Grid>
        </Grid>
        <Typography
          component="h3"
          variant="h3"
          sx={{ marginBottom: "20px", paddingTop: "20px" }}
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
            textDecorationThickness: "2px", // 下線の太さを調整
          }}>
          Career
        </Typography>
        <Timeline
          sx={{
            padding: 0,
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
            [`& .${timelineItemClasses.root}`]: {
              marginBottom: "20px", // Increase this value to add more space
            },
          }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <SchoolIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h5" marginBottom={2}>
                大学卒業（2019/4〜2023/4）
              </Typography>
              経営学部卒
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <LaptopChromebookIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h5" marginBottom={2}>
                某大手プログラミングスクールのメンター（2021/4~）
                <Chip
                  label="現在"
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    marginBottom: 1,
                  }}
                />
              </Typography>
              <Box marginBottom="10px">
                <RubyIcon width={50} height={50} />
                <RailsIcon width={50} height={50} />
                <AwsIcon width={50} height={50} />
              </Box>
              <p>
                学生時代からプログラミングスクールのメンターを行なっています(現在も副業で継続中)。
              </p>
              <p>
                エンジニア転職をしたい型向けにRuby on Rails,
                AWSをメインに教えています。
              </p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <LaptopChromebookIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="h5"
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                EC系SaaSミドルベンチャー[新卒入社]（2023/4〜）
                <Chip
                  label="現在"
                  sx={{
                    color: "black",
                    backgroundColor: "white",
                    marginBottom: 1,
                  }}
                />
              </Typography>

              <Box marginBottom="10px">
                <TsIcon width={50} height={50} />
                <ReactIcon width={50} height={50} />
                <NestIcon width={50} height={50} />
                <CentosIcon width={50} height={50} />
                <AwsIcon width={50} height={50} />
                <LinuxIcon width={50} height={50} />
                <DockerIcon width={50} height={50} />
                <NginxIcon width={50} height={50} />
                <PostgreIcon width={50} height={50} />
                <PythonIcon width={50} height={50} />
              </Box>
              <p>
                情シス、インフラ構築,保守,運用、バックエンド開発、フロントエンド開発をやってます。
                <br />
                フルスタックエンジニアです😃
              </p>
              <Typography variant="h6" marginBottom={1} marginTop={1}>
                情シス
              </Typography>
              <p>
                業務で使っている各種アカウントの発行、権限付与など。
                AWSのIAM、Githubのリポジトリ権限管理とかを色々いじいじしています。
                あとは業務効率化ツールの作成したり、GMV算出したりしてます。
              </p>
              <Typography variant="h6" marginBottom={1} marginTop={1}>
                インフラ
              </Typography>
              <p>
                新製品（4種類）の新規開発に伴うインフラの設計、構築を行いました(4種全部)。
                費用面でAWSは使わなかったですが、サーバーの新規契約からドメイン取得、セキュリティ設定、OS導入、環境構築、死活監視ツール導入、Nginx周りの設定、バックアップの設定など運用に至るまでの全工程を行いました。
                保守運用も行なっており、サーバー移行、バグ対応も行なっています。
              </p>
              <Typography variant="h6" marginBottom={1} marginTop={1}>
                フロントエンド
              </Typography>
              <p>
                Reactで不正検知アプリの管理画面の作成。ライブラリとしてReactAdmin、MUIを利用しています。
              </p>
              <Typography variant="h6" marginBottom={1} marginTop={1}>
                バックエンド
              </Typography>
              <p>NestJSで不正検知アプリのAPI開発。</p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Container>
  );
}
