import { useState, useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, FormControl } from "react-bootstrap";
function App() {
  const [fileUrl, setFileUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [response, setResponse] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getResponse = async () => {
      setIsLoading(true);
      await fetch(`https://cv.lskpengantin.id/getResponse?filename=${fileUrl}`)
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          setImgUrl(`https://cv.lskpengantin.id/output/${data.filename}`);
          setIsSubmitted(true);
          setIsLoading(false);
        });
    };
    try {
      getResponse();
      console.log("get response");
    } catch (error) {
      console.log("hehe:)");
    }
  }, [isUpload, fileUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadLoading(true);
    const formData = new FormData(e.target);
    const xhr = new XMLHttpRequest();
    await xhr.open("POST", "https://cv.lskpengantin.id/upload");
    xhr.send(formData);

    xhr.onload = () => {
      setIsUpload(true);
      setFileUrl(JSON.parse(xhr.responseText).filename);
      setUploadLoading(false);
    };
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsUpload(false);
    setFileUrl("");
    setImgUrl("");
    setResponse({});
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
        {isUpload ? (
          <div>
            <Button type="button" variant="outline-dark" onClick={handleReset}>
              Try another image!
            </Button>
          </div>
        ) : (
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
          </InputGroup>
        )}
      </form>

      {uploadLoading ? (
        <div>Uploading...</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2>Output</h2>
              {isUpload ? (
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
                    <p>
                      {imgUrl} <Badge bg="warning">file url</Badge>
                    </p>
                    {response.results.map((item, index) => {
                      const color =
                        index > 0
                          ? `rgb(${item.color[0]}, ${item.color[1]}, ${item.color[2]})`
                          : "";
                      return (
                        <div key={index}>
                          <p style={{ color: color }}>{item.text} </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  "No response yet"
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
