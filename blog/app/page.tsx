"use client";
import { useRef } from "react";
import Link from "next/link";
import { Box, Typography, Fade } from "@mui/material";
import { useEarthBackground } from "@/hooks/useEarthBackground";
import styles from "./page.module.css";

export default function Page() {
  const mountRef = useRef(null);
  useEarthBackground(mountRef);

  return (
    <Box
      ref={mountRef}
      sx={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: -1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent overflow issues
      }}>
      <Typography
        variant="h3"
        className={styles.welcome}
        sx={{
          mb: { xs: 5, sm: 10 }, // More margin on smaller screens
          animation: "fadeInGlow 4s ease-out forwards",
          textAlign: "center", // Ensure text is centered on all screen sizes
        }}>
        Welcome to YASD TECH
      </Typography>
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: { xs: "30vh", sm: "0" }, // Increase padding on smaller screens to lower the links
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
              alignItems: "center",
              justifyContent: "center", // Center the links horizontally
            }}>
            <Link href="/blog" passHref>
              <Typography className={styles.link}>Blog</Typography>
            </Link>
            <Link href="/profile" passHref>
              <Typography className={styles.link}>Profile</Typography>
            </Link>
            <Link href="/contact" passHref>
              <Typography className={styles.link}>Contact</Typography>
            </Link>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
}
