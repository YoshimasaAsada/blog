// "use client";
// import { useEffect, useState, Suspense } from "react";
// import { usePathname, useSearchParams } from "next/navigation";
// import Script from "next/script";
// import { IS_GATAG, GA_TAG_ID, pageview } from "../libs/gtag";
// import Loading from "@/app/loading";

// const LoadSearchParams = () => {
//   const searchParams = useSearchParams();
//   return searchParams.toString();
// };

// const GoogleAnalytics = () => {
//   const pathname = usePathname();
//   const [searchParams, setSearchParams] = useState("");

//   useEffect(() => {
//     if (!IS_GATAG) {
//       return;
//     }
//     const url = pathname + searchParams;
//     pageview(url);
//   }, [pathname, searchParams]);

//   return (
//     <>
//       <Suspense fallback={<Loading />}>
//         <LoadSearchParamsWrapper setSearchParams={setSearchParams} />
//       </Suspense>
//       <Script
//         strategy="lazyOnload"
//         src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}`}
//       />
//       <Script id="gtag-init" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', '${GA_TAG_ID}', {
//             page_path: window.location.pathname,
//           });
//         `}
//       </Script>
//     </>
//   );
// };

// const LoadSearchParamsWrapper = ({ setSearchParams }: any) => {
//   const searchParamsString = LoadSearchParams();
//   useEffect(() => {
//     setSearchParams(searchParamsString);
//   }, [searchParamsString]);

//   return null;
// };

// export default GoogleAnalytics;
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { existsGaId, GA_MEASUREMENT_ID, pageview } from "../libs/gtag";

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }
    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
