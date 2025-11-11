import "../styles/globals.css";
import "../styles/front_page.css";
import "../styles/logo_animation.css";
import "../styles/about.css";
import "../styles/anim.css";
import "../styles/timeline.css";
import '../styles/skills.css';
import '../styles/portfolio.css';
import '../styles/blog.css';

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
