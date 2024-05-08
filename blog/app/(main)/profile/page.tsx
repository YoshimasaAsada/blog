import { Box, Container, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import SchoolIcon from "@mui/icons-material/School";
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
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Container>
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
        {/* <Profile /> */}
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
              <Typography variant="h4" marginBottom={2}>
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
              <Typography variant="h4" marginBottom={2}>
                某大手プログラミングスクールのメンター（2021/4~現在）
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
              <Typography variant="h4" marginBottom={2}>
                EC系SaaSミドルベンチャー[新卒入社]（2023/4~現在）
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
              <Typography variant="h5" marginBottom={1} marginTop={1}>
                情シス
              </Typography>
              <p>
                業務で使っている各種アカウントの発行、権限付与など。
                AWSのIAM、Githubのリポジトリ権限管理とかを色々いじいじしています。
                あとは業務効率化ツールの作成したり、GMV算出したりしてます。
              </p>
              <Typography variant="h5" marginBottom={1} marginTop={1}>
                インフラ
              </Typography>
              <p>
                新製品（4種類）の新規開発に伴うインフラの設計、構築を行いました(4種全部)。
                費用面でAWSは使わなかったですが、サーバーの新規契約からドメイン取得、セキュリティ設定、OS導入、環境構築、死活監視ツール導入、Nginx周りの設定、バックアップの設定など運用に至るまでの全工程を行いました。
                一応今のところインフラ起因のバグはないのでいいかんじにいけてて嬉しいです。
                でもやっぱりAWS使いたかったなぁ。。。
              </p>
              <Typography variant="h5" marginBottom={1} marginTop={1}>
                フロントエンド
              </Typography>
              <p>
                Reactで不正検知アプリの管理画面の作成。初めてTypescript使ったんですけどマジでいいですね。
                静的型付け言語の沼にハマりそうです。
              </p>
              <Typography variant="h5" marginBottom={1} marginTop={1}>
                バックエンド
              </Typography>
              <p>
                NestJSで不正検知アプリのAPI開発。これも同様初めてTypescript。
                Railsと比較すると開発速度は落ちますが、チーム開発とか大規模開発やるなら圧倒的静的片付け言語だなと思いました！
                あとはコメント残すのほんと大事ですね。
              </p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
        <Typography
          component="h3"
          variant="h3"
          sx={{ paddingTop: "20px", paddingBottom: "20px" }}
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
            textDecorationThickness: "2px", // 下線の太さを調整
          }}>
          Skils
        </Typography>
        <TsIcon width={100} height={100} />
        <ReactIcon width={100} height={100} />
        <NestIcon width={100} height={100} />
        <CentosIcon width={100} height={100} />
        <AwsIcon width={100} height={100} />
        <LinuxIcon width={100} height={100} />
        <RubyIcon width={100} height={100} />
        <RailsIcon width={100} height={100} />
        <DockerIcon width={100} height={100} />
        <NginxIcon width={100} height={100} />
        <PythonIcon width={100} height={100} />
        <NextIcon width={100} height={100} />
        <Typography
          component="h3"
          variant="h3"
          sx={{ paddingTop: "20px", paddingBottom: "20px" }}
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
            textDecorationThickness: "2px", // 下線の太さを調整
          }}>
          qualification
        </Typography>
        <Image src="/images/SAA.png" alt="SAAIcon" width={150} height={150} />
      </Container>
    </>
  );
}
