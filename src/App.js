import Slider from "./Component/Slider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const server = "https://dadanisme.pythonanywhere.com";
  return (
    <div>
      <Slider server={server} />
    </div>
  );
}
