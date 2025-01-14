import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen bg-black text-white">
       <div className="p-4">
       <Navbar/>
       {children}
       </div>
        <Footer/>
      </body>
    </html>
  );
}
