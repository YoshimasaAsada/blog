'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';

export async function sendEmail(formData: FormData) {
  // トランスポーターの設定
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL, // Gmailのアカウント
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD, // アプリパスワード（のちに作成します）
    },
  });

  // フォームデータの取得
  const data = {
    // 件名
    subject: 'ブログからの問い合わせ',
    // メール内容
    text: formData.get('message') as string,
    replyTo: formData.get('email') as string,
  };

  // メール送信オプション
  const mailOptions = {
    // from: 'yasdtech@gmail.com',
    to: process.env.NEXT_PUBLIC_EMAIL,
    ...data,
  };

  console.log(mailOptions);

  // メール送信
  const res = await transporter.sendMail(mailOptions);
  console.log(res);

  if (res) {
    revalidatePath('/', 'layout');
    redirect('contact/compleat');
  } else {
    revalidatePath('/', 'layout');
    redirect('contact/compleat');
  }
}
