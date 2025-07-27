'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { Urbanist } from "next/font/google";
import { AirplaneIcon, MailboxIcon, RobotIcon, StudentIcon, YoutubeLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
const urbanist = Urbanist({ subsets: ["latin"] });

// Weather code mapping for condition and icons
const wCodes = [
  { WeatherCode: 395, Condition: "Moderate or heavy snow in area with thunder", DayIcon: "wsymbol_0012_heavy_snow_showers", NightIcon: "wsymbol_0028_heavy_snow_showers_night" },
  { WeatherCode: 392, Condition: "Patchy light snow in area with thunder", DayIcon: "wsymbol_0016_thundery_showers", NightIcon: "wsymbol_0032_thundery_showers_night" },
  { WeatherCode: 389, Condition: "Moderate or heavy rain in area with thunder", DayIcon: "wsymbol_0024_thunderstorms", NightIcon: "wsymbol_0040_thunderstorms_night" },
  { WeatherCode: 386, Condition: "Patchy light rain in area with thunder", DayIcon: "wsymbol_0016_thundery_showers", NightIcon: "wsymbol_0032_thundery_showers_night" },
  { WeatherCode: 377, Condition: "Moderate or heavy showers of ice pellets", DayIcon: "wsymbol_0021_cloudy_with_sleet", NightIcon: "wsymbol_0037_cloudy_with_sleet_night" },
  { WeatherCode: 374, Condition: "Light showers of ice pellets", DayIcon: "wsymbol_0013_sleet_showers", NightIcon: "wsymbol_0029_sleet_showers_night" },
  { WeatherCode: 371, Condition: "Moderate or heavy snow showers", DayIcon: "wsymbol_0012_heavy_snow_showers", NightIcon: "wsymbol_0028_heavy_snow_showers_night" },
  { WeatherCode: 368, Condition: "Light snow showers", DayIcon: "wsymbol_0011_light_snow_showers", NightIcon: "wsymbol_0027_light_snow_showers_night" },
  { WeatherCode: 365, Condition: "Moderate or heavy sleet showers", DayIcon: "wsymbol_0013_sleet_showers", NightIcon: "wsymbol_0029_sleet_showers_night" },
  { WeatherCode: 362, Condition: "Light sleet showers", DayIcon: "wsymbol_0013_sleet_showers", NightIcon: "wsymbol_0029_sleet_showers_night" },
  { WeatherCode: 359, Condition: "Torrential rain shower", DayIcon: "wsymbol_0018_cloudy_with_heavy_rain", NightIcon: "wsymbol_0034_cloudy_with_heavy_rain_night" },
  { WeatherCode: 356, Condition: "Moderate or heavy rain shower", DayIcon: "wsymbol_0010_heavy_rain_showers", NightIcon: "wsymbol_0026_heavy_rain_showers_night" },
  { WeatherCode: 353, Condition: "Light rain shower", DayIcon: "wsymbol_0009_light_rain_showers", NightIcon: "wsymbol_0025_light_rain_showers_night" },
  { WeatherCode: 350, Condition: "Ice pellets", DayIcon: "wsymbol_0021_cloudy_with_sleet", NightIcon: "wsymbol_0037_cloudy_with_sleet_night" },
  { WeatherCode: 338, Condition: "Heavy snow", DayIcon: "wsymbol_0020_cloudy_with_heavy_snow", NightIcon: "wsymbol_0036_cloudy_with_heavy_snow_night" },
  { WeatherCode: 335, Condition: "Patchy heavy snow", DayIcon: "wsymbol_0012_heavy_snow_showers", NightIcon: "wsymbol_0028_heavy_snow_showers_night" },
  { WeatherCode: 332, Condition: "Moderate snow", DayIcon: "wsymbol_0020_cloudy_with_heavy_snow", NightIcon: "wsymbol_0036_cloudy_with_heavy_snow_night" },
  { WeatherCode: 329, Condition: "Patchy moderate snow", DayIcon: "wsymbol_0020_cloudy_with_heavy_snow", NightIcon: "wsymbol_0036_cloudy_with_heavy_snow_night" },
  { WeatherCode: 326, Condition: "Light snow", DayIcon: "wsymbol_0011_light_snow_showers", NightIcon: "wsymbol_0027_light_snow_showers_night" },
  { WeatherCode: 323, Condition: "Patchy light snow", DayIcon: "wsymbol_0011_light_snow_showers", NightIcon: "wsymbol_0027_light_snow_showers_night" },
  { WeatherCode: 320, Condition: "Moderate or heavy sleet", DayIcon: "wsymbol_0019_cloudy_with_light_snow", NightIcon: "wsymbol_0035_cloudy_with_light_snow_night" },
  { WeatherCode: 317, Condition: "Light sleet", DayIcon: "wsymbol_0021_cloudy_with_sleet", NightIcon: "wsymbol_0037_cloudy_with_sleet_night" },
  { WeatherCode: 314, Condition: "Moderate or Heavy freezing rain", DayIcon: "wsymbol_0021_cloudy_with_sleet", NightIcon: "wsymbol_0037_cloudy_with_sleet_night" },
  { WeatherCode: 311, Condition: "Light freezing rain", DayIcon: "wsymbol_0021_cloudy_with_sleet", NightIcon: "wsymbol_0037_cloudy_with_sleet_night" },
  { WeatherCode: 308, Condition: "Heavy rain", DayIcon: "wsymbol_0018_cloudy_with_heavy_rain", NightIcon: "wsymbol_0034_cloudy_with_heavy_rain_night" },
  { WeatherCode: 305, Condition: "Heavy rain at times", DayIcon: "wsymbol_0010_heavy_rain_showers", NightIcon: "wsymbol_0026_heavy_rain_showers_night" },
  { WeatherCode: 302, Condition: "Moderate rain", DayIcon: "wsymbol_0018_cloudy_with_heavy_rain", NightIcon: "wsymbol_0034_cloudy_with_heavy_rain_night" },
  { WeatherCode: 299, Condition: "Moderate rain at times", DayIcon: "wsymbol_0010_heavy_rain_showers", NightIcon: "wsymbol_0026_heavy_rain_showers_night" },
  { WeatherCode: 296, Condition: "Light rain", DayIcon: "wsymbol_0017_cloudy_with_light_rain", NightIcon: "wsymbol_0025_light_rain_showers_night" },
  { WeatherCode: 293, Condition: "Patchy light rain", DayIcon: "wsymbol_0017_cloudy_with_light_rain", NightIcon: "wsymbol_0033_cloudy_with_light_rain_night" },
  { WeatherCode: 284, Condition: "Heavy freezing drizzle", DayIcon: "wsymbol_0021_cloudy_with_sleet", NightIcon: "wsymbol_0037_cloudy_with_sleet_night" },
  { WeatherCode: 281, Condition: "Freezing drizzle", DayIcon: "wsymbol_0021_cloudy_with_sleet", NightIcon: "wsymbol_0037_cloudy_with_sleet_night" },
  { WeatherCode: 266, Condition: "Light drizzle", DayIcon: "wsymbol_0017_cloudy_with_light_rain", NightIcon: "wsymbol_0033_cloudy_with_light_rain_night" },
  { WeatherCode: 263, Condition: "Patchy light drizzle", DayIcon: "wsymbol_0009_light_rain_showers", NightIcon: "wsymbol_0025_light_rain_showers_night" },
  { WeatherCode: 260, Condition: "Freezing fog", DayIcon: "wsymbol_0007_fog", NightIcon: "wsymbol_0007_fog" },
  { WeatherCode: 248, Condition: "Fog", DayIcon: "wsymbol_0007_fog", NightIcon: "wsymbol_0007_fog" },
  { WeatherCode: 230, Condition: "Blizzard", DayIcon: "wsymbol_0020_cloudy_with_heavy_snow", NightIcon: "wsymbol_0036_cloudy_with_heavy_snow_night" },
  { WeatherCode: 227, Condition: "Blowing snow", DayIcon: "wsymbol_0019_cloudy_with_light_snow", NightIcon: "wsymbol_0035_cloudy_with_light_snow_night" },
  { WeatherCode: 200, Condition: "Thundery outbreaks in nearby", DayIcon: "wsymbol_0016_thundery_showers", NightIcon: "wsymbol_0032_thundery_showers_night" },
  { WeatherCode: 185, Condition: "Patchy freezing drizzle nearby", DayIcon: "wsymbol_0021_cloudy_with_sleet", NightIcon: "wsymbol_0037_cloudy_with_sleet_night" },
  { WeatherCode: 182, Condition: "Patchy sleet nearby", DayIcon: "wsymbol_0021_cloudy_with_sleet", NightIcon: "wsymbol_0037_cloudy_with_sleet_night" },
  { WeatherCode: 179, Condition: "Patchy snow nearby", DayIcon: "wsymbol_0013_sleet_showers", NightIcon: "wsymbol_0029_sleet_showers_night" },
  { WeatherCode: 176, Condition: "Patchy rain nearby", DayIcon: "wsymbol_0009_light_rain_showers", NightIcon: "wsymbol_0025_light_rain_showers_night" },
  { WeatherCode: 143, Condition: "Mist", DayIcon: "wsymbol_0006_mist", NightIcon: "wsymbol_0006_mist" },
  { WeatherCode: 122, Condition: "Overcast", DayIcon: "wsymbol_0004_black_low_cloud", NightIcon: "wsymbol_0004_black_low_cloud" },
  { WeatherCode: 119, Condition: "Cloudy", DayIcon: "wsymbol_0003_white_cloud", NightIcon: "wsymbol_0004_black_low_cloud" },
  { WeatherCode: 116, Condition: "Partly Cloudy", DayIcon: "wsymbol_0002_sunny_intervals", NightIcon: "wsymbol_0008_clear_sky_night" },
  { WeatherCode: 113, Condition: "Clear/Sunny", DayIcon: "wsymbol_0001_sunny", NightIcon: "wsymbol_0008_clear_sky_night" }
];

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
      setCompData(data.current_condition[0]);
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
      <section className="flex flex-col items-center justify-center h-screen snap-start max-h-screen" id="weather_section">
        <header className="flex-1/12 justify-center items-center top-0">
          <div className="text-[72px] font-semibold uppercase">Weather Dashboard</div>
        </header>
        <div className="flex-11/12 items-center justify-center place-content-center grid grid-cols-6 grid-rows-6 gap-3 border-2 p-2 max-h-10/12">
          <div className="text-2xl font-semibold flex flex-col col-start-1 col-end-2 row-span-2 bg-black shadow-inner p-4 shadow-white h-full w-full rounded-2xl">
            <div className="text-center font-bold text-7xl align-middle flex-2 place-content-center">
              {wdata} °C
            </div>
            <div className="text-center font-light">
              {compData.temp_F} °F
            </div>
          </div>
          <div className="text-2xl font-extralight col-start-2 col-end-7 row-span-6 border-2 h-full overflow-auto">
            {JSON.stringify(compData)}
          </div>
          <div className="border-2 row-span-4 h-full max-h-full wrap-anywhere overflow-auto flex-col">
            <div>Some More Statistics</div>
            <div>Humidity: {compData.humidity} % </div>
            <div>Wind Speed: {compData.windspeedKmph} km/h, </div>
          </div>
        </div>
      </section>
    </div>
  );
}
