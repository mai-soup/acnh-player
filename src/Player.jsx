import AudioPlayer from "react-h5-audio-player";
import "./playerstyles.css";

const Player = ({ title, src, songEnded, playerRef }) => {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl font-medium">{title}</h3>
          {/* <p class="text-sm mt-1 text-grey">Artist</p> */}
        </div>
      </div>
      <AudioPlayer
        src={src}
        ref={playerRef}
        showJumpControls={false}
        //   onClickNext={onNext}
        //   onClickPrevious={onPrevious}
        customAdditionalControls={[]}
        layout="stacked-reverse"
        onEnded={songEnded}
      />
    </>
  );
};

export default Player;
