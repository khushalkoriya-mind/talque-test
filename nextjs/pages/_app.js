// import { Suspense } from "react";
import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import LanguageProvider from "@/context/LanguageContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ErrorBoundary from "./500";

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Layout>
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Component {...pageProps} />
          {/* </Suspense> */}
        </Layout>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
