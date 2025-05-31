// ライブラリ関連
import { Container, Typography } from '@mui/material';
import { Cookie } from 'next/font/google';

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
        <br />・本人のご了解がある場合
        <br />・法令等への協力のため、開示が必要となる場合
      </p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        3.個人情報の開示、訂正、追加、削除、利用停止
      </Typography>
      <p>
        ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
      </p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        4.広告の配信について
      </Typography>
      <p>
        当ブログでは、第三者配信の広告サービス「
        <a href="https://www.google.co.jp/adsense/start/" target="_blank" rel="noopener noreferrer">
          Google Adsense グーグルアドセンス
        </a>
        」「
        <a href="https://www.a8.net/" target="_blank" rel="noopener noreferrer">
          A8.net
        </a>
        」を利用しています。
        このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。
        クッキーを使用することで当ブログはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
        Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は「
        <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">
          広告 – ポリシーと規約 – Google
        </a>
        」をご覧ください。
      </p>
      <p>
        注記）クッキー（Cookie）とは：当ブログや他サイトへのアクセスに関する情報で、氏名、住所、メールアドレス、電話番号は含まれていません。
        また、当ブログは、「
        <a href="https://www.amazon.co.jp/" target="_blank" rel="noopener noreferrer">
          Amazon.co.jp
        </a>
        」を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、
        Amazonアソシエイトプログラムの参加者です。
        第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookie（クッキー）を設定したりこれを認識したりする場合があります。
      </p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        5.アクセス解析ツールについて
      </Typography>
      <p>当ブログでは、Googleによるアクセス解析ツール「
        <a href="https://marketingplatform.google.com/intl/ja/about/analytics/" target="_blank">Googleアナリティクス</a>
        」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はクッキー（Cookie）を無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは
        <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank">こちら</a>
        をクリックしてください。</p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        6.お問い合わせフォームについて
      </Typography>
      <p>当ブログでは、お問い合わせフォームからお問い合わせいただく際に、お名前とメールアドレス等の個人情報をご登録いただいています。これらの個人情報は質問に対する回答を電子メールなどでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。</p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        7.著作権・肖像権について
      </Typography>
      <p>当ブログで掲載している文章や画像などにつきましては、著作権は放棄しておりません。当ブログに存在する、文章・画像・動画等の著作物の情報を無断転載することを禁止します。引用の範囲を超えるものについては、法的処置を行います。転載を希望される方は、「お問い合わせ」よりご連絡をお願いします。また、当ブログは著作権の侵害を目的とするものではありません。使用している版権物の知的所有権はそれぞれの著作者・団体に帰属しております。著作権や肖像権に関して問題がありましたら御連絡下さい。著作権所有者様からの警告及び修正・撤去のご連絡があった場合は迅速に対処または削除致します。</p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        8.リンクについて
      </Typography>

      <p>当ブログは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。ただし、当ブログに掲載されている画像への直リンクや、インラインフレームによる当ブログのコンテンツの使用はご遠慮ください。</p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        9.免責事項
      </Typography>
      <p>
        当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡下さい。確認後、対応させて頂きます。
        当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
        当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。情報の正確性・完全性を保証するものではございませんので、予めご了承ください。
        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        当サイトを閲覧する際の推奨ブラウザは、「Google Chrome」、「Mozilla
        Firefox」の各最新版となります。その他のブラウザで閲覧した場合、表示が崩れたり、正常に動作しない場合がございますので、予めご了承ください。
      </p>
      <Typography
        component="h5"
        variant="h5"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        10.当ブログのプライバシーポリシー・免責事項の変更について
      </Typography>
      <p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシー及び免責事項の内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーと免責事項は常に本ページにて開示されます。</p>
    </Container >
  );
}
