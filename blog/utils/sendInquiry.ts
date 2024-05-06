import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { redirect } from "next/navigation";

export async function sendInquiry(data: FormData) {
  "use server";

  const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ];
  const sheetId = process.env.NEXT_PUBLIC_SHEET_ID;
  const clientEmail = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(
    /\\n/gm,
    "\n"
  );

  const jwt = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  // envファイルからの読み込みが問題ないかバリデーション
  if (
    typeof sheetId === "undefined" ||
    typeof clientEmail === "undefined" ||
    typeof privateKey === "undefined"
  ) {
    console.error(
      'env "SHEET_ID", "GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_PRIVATE_KEY" are required.'
    );
    process.exit(1);
  }

  const doc = new GoogleSpreadsheet(sheetId, jwt);

  console.log(doc);

  await doc.loadInfo();
  const inquirySheet = doc.sheetsByTitle["inquiry"];

  const newRow = {
    name: data.get("name") as string,
    email: data.get("email") as string,
    message: data.get("message") as string,
  };
  await inquirySheet.addRow(newRow);
  redirect("/contact/compleate");
}
