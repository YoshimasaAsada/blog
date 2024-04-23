"use client";
import { Container } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";

const Earth = () => {
  // return <PeriodicTable />;
  return (
    <>
      <Container>
        麻田祥正 1999年生まれ
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
                <LaptopChromebookIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h2>インフラトップトップ（2021/4~現在）</h2>
              DMM WEB
              Cammpというプログラミングスクールでメンターを行なっています。 Ruby
              on Rails, AWSをメインに教えています。
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
              <h2>テモナ株式会社（2023/4~現在）</h2>
              新卒で入りました。
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
        <h2>Skils</h2>
        Rails,React,NestJS,Next.JS,Ruby,Typescript,Python,sh
        <h2>qualification</h2>
        AWS Certified Solutions Architect - Associate
      </Container>
    </>
  );
};

export default Earth;
