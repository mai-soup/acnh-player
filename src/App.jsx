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

  useEffect(() => {
    if (src) {
      playerRef.current.audio.current.play();
    }
  }, [src]);

  useEffect(() => {
    getSongOfTheHour();
  }, [currentHour, weather]);

  const getSongOfTheHour = () => {
    axios
      .get(ENDPOINT)
      .then(res => res.data)
      .then(data => {
        for (let song of data) {
          if (song.hour === currentHour && song.weather === weather) {
            return song.music_uri;
          }
        }
      })
      .then(uri => {
        setSrc(uri);
      });
  };

  const makeTitleString = () => {
    // return the hour in 12-hour format
    return `${currentHour % 12 === 0 ? 12 : currentHour % 12}${
      // appended with am/pm
      currentHour > 12 ? "PM" : "AM"
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

  const handleWeatherClick = evt => {
    const newWeather = evt.currentTarget.id;
    if (newWeather !== weather) {
      setWeather(newWeather);
    }
  };

  return (
    <div className="w-full">
      <div className="h-2 bg-acnh-blue">
        <div className="flex items-center justify-center h-screen bg-acnh-green-dull">
          <div className="bg-white shadow-lg rounded-lg w-5/6 max-w-[48rem] overflow-hidden">
            <div className="w-full p-8">
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
      </div>
    </div>
  );
}

export default App;
