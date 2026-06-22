import { Suspense } from "react";
import MainNewsSection from "../components/mainPage/MainNewsSection";

export default function Home() {
  return (
    <div className="container w-full flex items-center justify-center">
      <Suspense fallback={<div className="min-h-screen bg-amber-50 text-black flex items-center justify-center">Загрузка ленты Oxu.az...</div>}>
        <MainNewsSection />
      </Suspense>
    </div>
  );
}
