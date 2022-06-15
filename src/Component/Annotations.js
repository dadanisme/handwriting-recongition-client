import { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import "./annotations.css";
export default function Annotations(props) {
  const containerStyle = {
    border: "5px dotted #5F1A1F ",
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

  const [response, setResponse] = useState({});
  const [translated, setTranslated] = useState("");
  const [originLanguage, setOriginLanguage] = useState("");

  useEffect(() => {
    setResponse(props.response);
  }, [response, props]);

  useEffect(() => {
    if (response.results !== undefined) {
      const text = response.results[0].text.replace(/[^\w\s]/gi, "");
      fetch("https://cv.lskpengantin.id/translate?text=" + text)
        .then((res) => res.json())
        .then((data) => {
          setTranslated(data.translatedText);
          const languageNames = new Intl.DisplayNames(["en"], {
            type: "language",
          });
          setOriginLanguage(languageNames.of(data.detectedSourceLanguage));
        });
    }
  }, [response]);

  return (
    <div style={containerStyle}>
      <h3>Annotations</h3>
      {JSON.stringify(response) !== "{}" ? (
        <div className="responses">
          <div className="full-text">
            <h4>
              <strong>Full Text Annotation</strong>
            </h4>
            <p>{response.results[0].text}</p>
          </div>

          <div className="full-text">
            <h4>
              <strong>
                Full Text Translated from{" "}
                <Badge bg="danger">{originLanguage}</Badge>
              </strong>
            </h4>
            <p>{translated}</p>
          </div>

          <h4>
            <strong>Words</strong>
          </h4>
          {response.results.map((result, index) => (
            <span key={index} className="m-1 words">
              {index > 0 ? <Badge bg="danger">{result.text}</Badge> : ""}
            </span>
          ))}
        </div>
      ) : (
        <h4>No annotations, upload first</h4>
      )}
    </div>
  );
}
