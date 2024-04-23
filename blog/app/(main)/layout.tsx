import { Header } from "@/components/Header";
import { Box } from "@mui/material";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Box sx={{ marginTop: "70px", marginBottom: "70px" }}>{children}</Box>
      <Footer />
    </>
  );
}
