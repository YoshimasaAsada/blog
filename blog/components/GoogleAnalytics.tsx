"use client";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { IS_GATAG, GA_TAG_ID, pageview } from "../libs/gtag";
import Loading from "@/app/loading";

const LoadSearchParams = () => {
  const searchParams = useSearchParams();
  return searchParams.toString();
};

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    if (!IS_GATAG) {
      return;
    }
    const url = pathname + searchParams;
    pageview(url);
  }, [pathname, searchParams]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <LoadSearchParamsWrapper setSearchParams={setSearchParams} />
      </Suspense>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TAG_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

const LoadSearchParamsWrapper = ({ setSearchParams }: any) => {
  const searchParamsString = LoadSearchParams(); // This calls useSearchParams internally
  useEffect(() => {
    setSearchParams(searchParamsString);
  }, [searchParamsString]);

  return null;
};

export default GoogleAnalytics;
