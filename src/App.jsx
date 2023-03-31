import Player from "./Player";

function App() {
  return (
    <div className="w-full">
      <div class="h-2 bg-acnh-blue">
        <div class="flex items-center justify-center h-screen bg-acnh-green-dull">
          <Player title="Mambo No. 5" src="https://acnhapi.com/v1/hourly/3" />
        </div>
      </div>
    </div>
  );
}

export default App;
