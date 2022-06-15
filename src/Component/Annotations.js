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

  useEffect(() => {
    setResponse(props.response);
  }, [response, props]);

  return (
    <div style={containerStyle}>
      <h3>Annotations</h3>
      {JSON.stringify(response) !== "{}" ? (
        <div className="responses">
          <div className="full-text">
            <h3>
              <Badge bg="dark">Full Text Annotation</Badge>
            </h3>
            <p>{response.results[0].text}</p>
          </div>

          <h3>
            <Badge bg="dark">Words</Badge>
          </h3>
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
