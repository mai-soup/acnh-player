import Player from "./Player";
import { useState, useEffect, createRef } from "react";
import axios from "axios";
import RainButton from "./RainButton";
import SunButton from "./SunButton";
import SnowButton from "./SnowButton";

const ENDPOINT = "https://ac-api.vercel.app/api";
const SUNNY = "Sunny";
const RAINY = "Rainy";
const SNOWY = "Snowy";

function formatAMPM(date) {
  var hours = date.getHours();
  var suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  var strTime = hours + suffix;
  return strTime;
}

function App() {
  const [weather, setWeather] = useState(SUNNY);
  const [currentHour, setCurrentHour] = useState(formatAMPM(new Date()));
  const [src, setSrc] = useState("");
  const playerRef = createRef();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (src) {
      playerRef.current.audio.current.play();
    }
  }, [src]);

  useEffect(() => {
    getSongOfTheHour();
  }, [currentHour, weather]);

  const getSongOfTheHour = async () => {
    try {
      const response = await axios.get(ENDPOINT, {
        params: { time: currentHour },
      });
      const acnh = response.data.music.find(
        (game) => game.game === "New Horizons"
      );
      switch (weather) {
        case SUNNY:
          return acnh.file;
        case RAINY:
          const rainyData = acnh.weather.find((w) => "rain" in w);
          return rainyData.rain;
        case SNOWY:
          const snowyData = acnh.weather.find((w) => "snow" in w);
          return snowyData.snow;
      }
      for (let song of data) {
        if (song.hour === currentHour && song.weather === weather) {
          return song.music_uri;
        }
      }
    } catch (err) {
      // if error.response.status in 4xx range, change error message to nofify the dev
      // if error.response.status in 5xx range, err message that api has problems
      // if timeout, err message that api has ongoing timeout issues
      if (err.response) {
        if (err.response.status >= 400 && err.response.status < 500) {
          setErrorMessage(
            `Please notify the developer of the issue: ${err.response.data.message}`
          );
        } else if (err.response.status >= 500) {
          setErrorMessage("API Error");
        }
      } else {
        // timeout or other issues that dont have a status code
        if (err.code === "ERR_NETWORK") {
          setErrorMessage("API Timeout");
        }
      }
    }
  };

  const makeTitleString = () => {
    // return the hour in 12-hour format
    return `${currentHour}, ${weather}`;
  };

  const updateSong = () => {
    setCurrentHour(formatAMPM(new Date()));
    console.log(currentHour);
  };

  const handleSongEnded = () => {
    if (new Date().getHours() !== currentHour) {
      updateSong();
    } else {
      playerRef.current.audio.current.play();
    }
  };

  const handleWeatherClick = (evt) => {
    const newWeather = evt.currentTarget.id;
    if (newWeather !== weather) {
      setWeather(newWeather);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-acnh-green-dull">
      <div className="h-2 bg-acnh-blue" />
      <div className="flex items-center justify-center grow">
        <div className="bg-white shadow-lg rounded-lg w-5/6 max-w-[48rem] overflow-hidden">
          <div className="w-full p-8">
            {errorMessage && (
              <p className="text-red-500 text-center">Error: {errorMessage}</p>
            )}
            <Player
              title={makeTitleString()}
              src={src}
              songEnded={handleSongEnded}
              playerRef={playerRef}
            />
            <div className="flex flex-row justify-evenly">
              <RainButton
                isActive={weather === RAINY}
                handleClick={handleWeatherClick}
              />
              <SunButton
                isActive={weather === SUNNY}
                handleClick={handleWeatherClick}
              />
              <SnowButton
                isActive={weather === SNOWY}
                handleClick={handleWeatherClick}
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-center text-grey">
        <p className="py-4">
          Created by{" "}
          <a
            href="https://maijsgarais.com/"
            className="underline hover:font-bold"
            target="_blank"
          >
            Maijs Garais
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default App;
