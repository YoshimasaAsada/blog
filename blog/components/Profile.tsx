import { Box, Typography } from "@mui/material";

export const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <h2>本業</h2>
      SaaS企業のエンジニア
      情シス、フロントエンド、バックエンド、インフラを担当しております
      多分フルスタックエンジニアです。
      <h3>情シス</h3>
      アカウント権限管理（AWSのIAM、Git、Backlog、踏み台サーバーなど、、）、クライアントとの外部共有ドライブ管理、
      <h3>フロントエンド</h3>
      ...自社サービスの開発(React,Typescript)
      <h3>バックエンド</h3>
      ...自社サービスの開発(NestJS,Typescript)
      <h3>インフラ</h3>
      ...新製品三つの立ち上げに伴うインフラの構築（さくらサーバーにOS導入から環境構築、死活監視ツール導入、Nginx周りの設定など）とインフラでトラブった時の対応＜＝一応これがメイン業務です。
      <h2>副業</h2>
      プログラミングスクールでメンターをやってます。 Ruby on
      Rails、AWSを教えています。
    </>
  );
};
