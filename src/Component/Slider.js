import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import FileUpload from "./FileUpload";
import Output from "./Output";
import Annotations from "./Annotations";

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [filename, setFilename] = useState("");
  const [response, setResponse] = useState({});
  const [carouselVariant, setCarouselVariant] = useState("");

  useEffect(() => {
    if (index === 6) {
      setCarouselVariant("dark");
    } else if (index % 2 === 1) {
      setCarouselVariant("dark");
    } else {
      setCarouselVariant("light");
    }
  }, [index]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleInputFileName = (filename) => {
    setFilename(filename);
  };

  const handleResponse = (response) => {
    setResponse(response);
  };

  const slideStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  if (window.innerWidth < 800) {
    alert("Please use a larger screen to view the slider");
  } else {
    return (
      <div>
        <Carousel
          variant={carouselVariant}
          interval={null}
          className="vh-100"
          activeIndex={index}
          onSelect={handleSelect}
          fade
        >
          {/* First slide */}
          <Carousel.Item
            className="vh-100"
            style={{
              backgroundColor: "#5F1A1F",
            }}
          >
            <div style={slideStyle}>
              <img
                className="d-block h-75 mw-75 mx-auto"
                style={{ objectFit: "cover" }}
                src={
                  process.env.PUBLIC_URL + "/assets/slide-1 introduction.png"
                }
                alt="First slide"
              />
            </div>
          </Carousel.Item>

          {/* Second slide */}
          <Carousel.Item
            className="vh-100"
            style={{
              backgroundColor: "#E9E3D0",
            }}
          >
            <div style={slideStyle}>
              <img
                className="d-block h-75 mw-75 mx-auto"
                style={{ objectFit: "cover" }}
                src={process.env.PUBLIC_URL + "/assets/slide-2 handwriting.png"}
                alt="Second slide"
              />
            </div>
          </Carousel.Item>

          {/* Third slide */}
          <Carousel.Item
            className="vh-100"
            style={{
              backgroundColor: "#5F1A1F",
            }}
          >
            <div style={slideStyle}>
              <img
                className="d-block h-75 mw-75 mx-auto"
                style={{ objectFit: "cover" }}
                src={
                  process.env.PUBLIC_URL + "/assets/slide-3 bahasa sunda.png"
                }
                alt="Third slide"
              />
            </div>
          </Carousel.Item>

          {/* Upload file */}
          <Carousel.Item
            className="vh-100"
            style={{
              backgroundColor: "#E9E3D0",
            }}
          >
            <div style={slideStyle}>
              <FileUpload onUpload={handleInputFileName} />
            </div>
          </Carousel.Item>

          {/* Result */}
          <Carousel.Item
            className="vh-100"
            style={{
              backgroundColor: "#5F1A1F",
            }}
          >
            <div style={slideStyle}>
              <Output filename={filename} onResponse={handleResponse} />
            </div>
          </Carousel.Item>

          {/* Annotations */}
          <Carousel.Item
            className="vh-100"
            style={{
              backgroundColor: "#E9E3D0",
            }}
          >
            <div style={slideStyle}>
              <Annotations response={response} />
            </div>
          </Carousel.Item>

          {/* Seventh slide */}
          <Carousel.Item
            className="vh-100"
            style={{
              backgroundColor: "#E9E3D0",
            }}
          >
            <div style={slideStyle}>
              <img
                className="d-block h-75 mw-75 mx-auto"
                style={{ objectFit: "cover" }}
                src={process.env.PUBLIC_URL + "/assets/slide-7 contact.png"}
                alt="Third slide"
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
