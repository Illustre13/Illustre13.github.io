import "../styles/globals.css";
import "../styles/front_page.css";
import "../styles/logo_animation.css";
import "../styles/about.css";
import "../styles/anim.css";
import "../styles/timeline.css";
import '../styles/skills.css';
import '../styles/portfolio.css';
import '../styles/blog.css';
import '../styles/contact.css';
import '../styles/footer.css';
import '../styles/admin.css';
import '../styles/dashboard.css';

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
