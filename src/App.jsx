import Player from "./Player";
import { useState, useEffect, createRef } from "react";
import axios from "axios";
import RainButton from "./RainButton";
import SunButton from "./SunButton";
import SnowButton from "./SnowButton";

const ENDPOINT = "https://acnhapi.com/v1a/backgroundmusic";
const SUNNY = "Sunny";
const RAINY = "Rainy";
const SNOWY = "Snowy";

function App() {
  const [weather, setWeather] = useState(SUNNY);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
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
      const response = await axios.get(ENDPOINT);
      const data = response.data;
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
    return `${currentHour % 12 === 0 ? 12 : currentHour % 12}${
      // appended with am/pm
      currentHour >= 12 && currentHour < 24 ? "PM" : "AM"
      // and the selected weather
    }, ${weather}`;
  };

  const updateSong = () => {
    setCurrentHour(new Date().getHours());
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
            <p className="pb-2 text-center">
              The ACNH API has been having ongoing timeout issues since August.
              Apologies if the player is not working as intended.
            </p>
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
