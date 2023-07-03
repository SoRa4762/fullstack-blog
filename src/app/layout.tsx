import "./globals.css";
import { Lato } from "next/font/google";
import Navbar from "@components/navbar/navbar";
import Footer from "@components/footer/footer";
import { ThemeProvider } from "@context/ThemeContext";
import AuthProvider from "@components/AuthProvider/AuthProvider";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Sore Zore",
  description: "Learn Full Stack with Nextjs with Next Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className="container">
              <Navbar />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
