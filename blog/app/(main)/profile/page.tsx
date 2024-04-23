"use client";
import { Container, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import SchoolIcon from "@mui/icons-material/School";

export default function Page() {
  return (
    <>
      <Container>
        <Typography
          component="h3"
          variant="h3"
          sx={{ paddingTop: "20px" }}
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
          }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <SchoolIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h2>大学卒業（2019/4〜2023/4）</h2>
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
              <h2>某大手プログラミングスクール（2021/4~現在）</h2>
              学生時代からプログラミングスクールのメンターを行なっています(現在も副業で継続中)。
              <br />
              Ruby on Rails, AWSをメインに教えています。
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
              <h2>EC系SaaSミドルベンチャー（2023/4~現在）</h2>
              新卒で入りました。
              <br />
              情シス、インフラ構築,保守,運用(AlmaLinux)、バックエンド開発(Nestjs×Typescript)、フロントエンド開発(React×Typescript)をやってます。
              <h3>情シス</h3>
              主にアクセス権の付与。AWSのIAM、Githubのリポジトリ権限管理など
              <h3>インフラ</h3>
              既存製品の保守、運用と新製品(4種)の開発に伴うインフラの構築(さくらサーバーにOS導入から環境構築、死活監視ツール導入、Nginx周りの設定、バックアップの設定など）を行いました。
              <h3>フロントエンド</h3>
              Reactで管理画面の作成
              <h3>バックエンド</h3>
              NestJSでAPI開発
            </TimelineContent>
          </TimelineItem>
        </Timeline>
        <Typography
          component="h3"
          variant="h3"
          sx={{ paddingTop: "20px" }}
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
            textDecorationThickness: "2px", // 下線の太さを調整
          }}>
          Skils
        </Typography>
        <h2>Rails,React,NestJS,Next.JS,Ruby,Typescript,Python,sh</h2>
        <Typography
          component="h3"
          variant="h3"
          sx={{ paddingTop: "20px" }}
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "8px", // 下線とテキストの間の距離を調整
            textDecorationThickness: "2px", // 下線の太さを調整
          }}>
          qualification
        </Typography>
        <h2>AWS Certified Solutions Architect - Associate</h2>
      </Container>
    </>
  );
}
