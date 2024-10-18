import "@/styles/globals.css";
import "@/styles/front_page.css";
import "@/styles/logo_animation.css"
import "tailwindcss/tailwind.css";
import "@/styles/about.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
