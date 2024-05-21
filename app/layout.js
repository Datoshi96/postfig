import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PostFig",
  description: "Página de post",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{backgroundColor:'#ffeba1'}} className={`${styles.main} ${inter.className}`}>
      <StoreProvider>
        {children}
      </StoreProvider>
      </body>
    </html>
  );
}
