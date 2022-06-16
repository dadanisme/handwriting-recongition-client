import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
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

  const [server, setServer] = useState("");

  useEffect(() => {
    setServer(props.server);
  }, [props.server]);

  const [filename, setFilename] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [response, setResponse] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const getResponse = async () => {
    try {
      setLoading(true);
      await fetch(`${server}/getResponse?filename=${filename}`)
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          setImgUrl(`${server}/output/${data.filename}`);
          setIsSubmitted(true);
          setLoading(false);
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

  if (loading) {
    return (
      <div style={containerStyle}>
        <Spinner animation="border" variant="light" />
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
      </div>
    );
  } else {
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
}
