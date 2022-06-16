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

  const variants = [
    {
      bg: "primary",
      text: "light",
    },
    {
      bg: "secondary",
      text: "light",
    },
    {
      bg: "success",
      text: "light",
    },
    {
      bg: "danger",
      text: "light",
    },
    {
      bg: "warning",
      text: "light",
    },
    {
      bg: "info",
      text: "light",
    },
    {
      bg: "light",
      text: "dark",
    },
    {
      bg: "dark",
      text: "light",
    },
    {
      bg: "warning",
      text: "dark",
    },
    {
      bg: "danger",
      text: "dark",
    },
    {
      bg: "info",
      text: "dark",
    },
    {
      bg: "success",
      text: "dark",
    },
  ];

  const [server, setServer] = useState("");

  useEffect(() => {
    setServer(props.server);
  }, [props.server]);

  useEffect(() => {
    setResponse(props.response);
  }, [response, props]);

  useEffect(() => {
    if (response.results !== undefined) {
      const text = response.results[0].text.replace(/[^\w\s]/gi, "");
      fetch(server + "/translate?text=" + text)
        .then((res) => res.json())
        .then((data) => {
          setTranslated(data.translatedText);
          const languageNames = new Intl.DisplayNames(["id"], {
            type: "language",
          });
          setOriginLanguage(languageNames.of(data.detectedSourceLanguage));
        });
    }
  }, [response, server]);

  return (
    <div style={containerStyle}>
      <h3>Annotations</h3>
      {JSON.stringify(response) !== "{}" ? (
        <div className="responses">
          <div className="full-text">
            <h4>
              <strong>Full Text</strong>
            </h4>
            <p>{response.results[0].text}</p>
          </div>

          <div className="full-text">
            <h4>
              <strong>
                Full Text, diterjemahkan dari{" "}
                <Badge
                  {...variants[Math.floor(Math.random() * variants.length)]}
                >
                  bahasa {originLanguage}
                </Badge>
              </strong>
            </h4>
            <p>{translated}</p>
          </div>

          <h4>
            <strong>Words</strong>
          </h4>
          {response.results.map((result, index) => (
            <span key={index} className="m-1 words">
              {index > 0 ? (
                <Badge
                  {...variants[Math.floor(Math.random() * variants.length)]}
                >
                  {result.text}
                </Badge>
              ) : (
                ""
              )}
            </span>
          ))}
        </div>
      ) : (
        <h4>Silakan upload dulu kak:{")"}</h4>
      )}
    </div>
  );
}
