import AudioPlayer from "react-h5-audio-player";
import "./playerstyles.css";

const Player = ({ title, src }) => {
  return (
    <div class="bg-white shadow-lg rounded-lg w-5/6 max-w-[48rem] overflow-hidden">
      <div className="w-full p-8">
        <div class="flex justify-between">
          <div>
            <h3 class="text-2xl font-medium">{title}</h3>
            {/* <p class="text-sm mt-1 text-grey">Artist</p> */}
          </div>
        </div>
        <AudioPlayer
          autoPlay
          src={src}
          loop
          showJumpControls={false}
          //   onClickNext={onNext}
          //   onClickPrevious={onPrevious}
          customAdditionalControls={[]}
          layout="stacked-reverse"
        />
      </div>
    </div>
  );
};

export default Player;
