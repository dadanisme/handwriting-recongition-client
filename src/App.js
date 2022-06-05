import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, FormControl } from "react-bootstrap";
function App() {
  const [fileUrl, setFileUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [response, setResponse] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const getResponse = () => {
    fetch(`http://127.0.0.1:5000/getResponse?filename=${fileUrl}`)
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
        setImgUrl(`http://127.0.0.1:5000/output/${data.filename}`);
        setIsSubmitted(true);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpload(true);
    const formData = new FormData(e.target);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/upload");
    xhr.send(formData);

    xhr.onload = () => {
      setFileUrl(JSON.parse(xhr.responseText).filename);
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="m-3"
    >
      <h1>Upload File</h1>

      <form
        method="POST"
        action="/upload"
        id="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <InputGroup>
          <FormControl
            name="file"
            type="file"
            placeholder="Recipient's username"
            aria-label="Recipient's username with two button addons"
          />
          <Button type="submit" variant="outline-secondary">
            Upload
          </Button>
          <Button
            onClick={getResponse}
            variant="outline-dark"
            disabled={!isUpload}
          >
            Get Response
          </Button>
        </InputGroup>
      </form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Output</h2>
        {isSubmitted ? (
          <img style={{ maxHeight: "500px" }} src={imgUrl} alt="file" />
        ) : (
          ""
        )}
        <div
          className="mt-3"
          style={{
            textAlign: "center",
          }}
        >
          {isSubmitted ? (
            <div>
              <h3>Texts detected:</h3>
              {response.results.map((item, index) => (
                <div key={index}>
                  <p style={{ color: item.color }}>{item.text} </p>
                </div>
              ))}
            </div>
          ) : (
            "No response yet"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
