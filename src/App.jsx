import Player from "./Player";
import { useState, useEffect, createRef } from "react";
import axios from "axios";

const ENDPOINT = "https://acnhapi.com/v1a/backgroundmusic";

function App() {
  const [weather, setWeather] = useState("Sunny");
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [src, setSrc] = useState("");

  useEffect(() => {
    getSongOfTheHour();
  }, []);

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
    getSongOfTheHour();
  };

  const handleSongEnded = () => {
    if (new Date().getHours !== currentHour) {
      updateSong();
    }
    playerRef.current.audio.current.play();
  };

  const playerRef = createRef();

  return (
    <div className="w-full">
      <div className="h-2 bg-acnh-blue">
        <div className="flex items-center justify-center h-screen bg-acnh-green-dull">
          <Player
            title={makeTitleString()}
            src={src}
            songEnded={handleSongEnded}
            playerRef={playerRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
