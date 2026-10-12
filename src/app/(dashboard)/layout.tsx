import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import TopNavbar from "@/components/Navbar/TopNavbar";

export const metadata: Metadata = {
  title: "ABOUMAKI",
  description: "SPORTS MARKETPLACE",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="w-full overflow-y-auto bg-[#F6F6F6]">
        <TopNavbar />
        <div className="p-6 mt-24">{children}</div>
      </div>
    </div>
  );
}

