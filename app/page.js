'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { Urbanist } from "next/font/google";
import { AirplaneIcon, MailboxIcon, RobotIcon, StudentIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
const urbanist = Urbanist({ subsets: ["latin"] });

export default function Home() {
  const tod = ["Morning", "Afternoon", "Evening", "Night"];
  const gettod = function () {
    const hour = new Date().getHours();
    if (hour > 5 && hour < 12) {
      return 0;
    } else if (hour >= 12 && hour < 16) {
      return 1;
    } else if (hour >= 16 && hour < 21) {
      return 2;
    } else {
      return 3;
    }
  }
  const [time, setTime] = useState(gettod());
  const [curTime, setCurTime] = useState(new Date().toLocaleTimeString());
  const [wdata, setWdata] = useState("Getting Weather Data...");
  const [compData, setCompData] = useState("Loading...");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurTime(new Date().toLocaleTimeString());
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(gettod());
    }, 1000 * 60 * 60); // Update every hour
    fetch("https://wttr.in/Sanpada?format=j1")
    .then((response)=> response.json())
    .then((data) => {
      setWdata(data.current_condition[0].temp_C);
      setCompData(data);
    });
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={` ${urbanist.className} justify-center items-center h-screen snap-y snap-mandatory overflow-y-scroll`}>
      <section className=" justify-center items-center flex flex-col h-screen snap-start" id="main_section">
      <header className="flex-1/12 justify-center items-center top-0">
        <div className="text-[96px] font-semibold uppercase">Good {tod[time]} </div>
      </header>
      <main className="flex flex-5/6 flex-col items-center justify-center gap-0 align-middle">
        <div className="flex uppercase font-extralight text-2xl">The time is</div>
        <div className="flex uppercase font-black text-[200px]">{curTime}</div>
      </main>
      <footer className="flex-1/12 bottom-0 w-full text-center">
        <div className=" text-2xl">IT IS {wdata} °C OUTSIDE</div>
      </footer>
      </section>
      <section className="flex flex-col items-center justify-center h-screen snap-start" id="favourites_section">
        <header className="flex-1/12 justify-center items-center top-0">
          <div className="text-[72px] font-semibold uppercase">Your Favourites</div>
        </header>
        <div className="flex-11/12 items-center justify-center place-content-center">
        <div className="grid grid-cols-3 grid-rows-2 gap-6 ">
          <Link href="https://www.youtube.com" target="_blank" className="flex items-center justify-center p-16 rounded-2xl aspect-square shadow-inner shadow-white hover:bg-stone-950">
            <div>
              <YoutubeLogoIcon size={128} weight="fill"/>
              <div className="text-2xl font-semibold self-center text-center">YouTube</div>
            </div>
          </Link>
          <Link href="https://mail.google.com" target="_blank" className="flex items-center justify-center p-16 rounded-2xl aspect-square shadow-inner shadow-white hover:shadow-slate-300">
            <div>
              <MailboxIcon size={128} weight="fill"/>
              <div className="text-2xl font-semibold self-center text-center">GMail</div>
            </div>
          </Link>
          <Link href="https://www.perplexity.ai/" target="_blank" className="flex items-center justify-center p-16 rounded-2xl aspect-square shadow-inner shadow-white hover:shadow-slate-300">
            <div>
              <RobotIcon size={128} weight="fill"/>
              <div className="text-2xl font-semibold self-center text-center">Perplexity</div>
            </div>
          </Link>
          <Link href="https://www.github.com/" target="_blank" className="flex items-center justify-center p-16 rounded-2xl aspect-square shadow-inner shadow-white hover:shadow-slate-300">
            <div>
              <GithubLogoIcon size={128} weight="fill"/>
              <div className="text-2xl font-semibold self-center text-center">GitHub</div>
            </div>
          </Link>
          <Link href="https://emirates.com/in/english" target="_blank" className="flex items-center justify-center p-16 rounded-2xl aspect-square shadow-inner shadow-white hover:shadow-slate-300">
            <div>
              <AirplaneIcon size={128} weight="fill"/>
              <div className="text-2xl font-semibold self-center text-center">Emirates</div>
            </div>
          </Link>
          <Link href="https://sis.jhu.edu" target="_blank" className="flex items-center justify-center p-16 rounded-2xl aspect-square shadow-inner shadow-white hover:shadow-slate-300">
            <div>
              <StudentIcon size={128} weight="fill"/>
              <div className="text-2xl font-semibold self-center text-center">SIS JHU</div>
            </div>
          </Link>
        </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center h-screen snap-start" id="weather_section">
        <header className="flex-1/12 justify-center items-center top-0">
          <div className="text-[72px] font-semibold uppercase">Weather Dashboard</div>
        </header>
        <div className="flex-11/12 items-center justify-center place-content-center grid grid-cols-6 grid-rows-6 gap-3 border-2 p-2">
          <div className="text-2xl font-semibold flex flex-col border-2 col-start-1 col-end-2 row-span-2 bg-blue-300 h-full w-full">
            <div>
              {wdata} °C
            </div>
            <div>
              {compData.temp_F} °F
            </div>
          </div>
          <div className="text-2xl font-extralight col-start-2 col-end-7 row-span-6 border-2 h-full overflow-auto">
            {JSON.stringify(compData)}
          </div>
          <div className="border-2"></div>
        </div>
      </section>
    </div>
  );
}
