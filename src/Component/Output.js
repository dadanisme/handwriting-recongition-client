import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import "./output.css";

export default function Output(props) {
  const containerStyle = {
    border: "5px dotted #E9E3D0",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px",
    width: "75%",
    height: "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const getResponseRef = useRef();

  const [filename, setFilename] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [response, setResponse] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getResponse = async () => {
    try {
      await fetch(`https://cv.lskpengantin.id/getResponse?filename=${filename}`)
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          setImgUrl(`https://cv.lskpengantin.id/output/${data.filename}`);
          setIsSubmitted(true);
        });
    } catch (error) {
      console.clear();
    }
  };

  useEffect(() => {
    setFilename(props.filename);
  }, [props]);

  useEffect(() => {
    props.onResponse(response);
  }, [response, props]);

  useEffect(() => {
    if (filename !== "") {
      getResponseRef.current.click();
    }
  }, [filename]);

  return (
    <div style={containerStyle}>
      <Button
        ref={getResponseRef}
        style={{
          display: "none",
        }}
        variant="light"
        onClick={getResponse}
      >
        See Result
      </Button>
      {filename === "" ? (
        <h4 style={{ color: "var(--bs-light)" }}>
          Oops! Output masih kosong, upload dulu ya di sebelah!
        </h4>
      ) : (
        ""
      )}
      {isSubmitted ? (
        <div className="image-container">
          <img src={imgUrl} alt={filename} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
