// ライブラリ関連
import { Container, Typography } from '@mui/material';

/**
 * プライバシーポリシーのページ
 * @returns
 */
export default function Page() {
  return (
    <Container>
      <Typography
        component="h3"
        variant="h3"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
        style={{
          textDecoration: 'underline',
          textUnderlineOffset: '8px',
          textDecorationThickness: '2px',
        }}
      >
        プライバシーポリシー
      </Typography>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        1.個人情報の利用目的
      </Typography>
      <p>
        当サイトでは、メールでのお問い合わせ、メールマガジンへの登録などの際に、名前、メールアドレス等の個人情報をご登録いただく場合がございます。これらの個人情報は質問に対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。
      </p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        2.個人情報の第三者への開示
      </Typography>
      <p>
        当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
        本人のご了解がある場合 法令等への協力のため、開示が必要となる場合
      </p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        3.アクセス解析ツールについて
      </Typography>
      <p>
        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくはこちらをご参照ください。
      </p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        4.免責事項
      </Typography>
      <p>
        当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡下さい。確認後、対応させて頂きます。
        当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
        当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。情報の正確性・完全性を保証するものではございませんので、予めご了承ください。
        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        当サイトを閲覧する際の推奨ブラウザは、「Google Chrome」、「Mozilla
        Firefox」の各最新版となります。その他のブラウザで閲覧した場合、表示が崩れたり、正常に動作しない場合がございますので、予めご了承ください。
      </p>
    </Container>
  );
}
