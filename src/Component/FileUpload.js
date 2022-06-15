import { useState, useRef, useEffect } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import "./form_placeholder.css";

export default function FileUpload(props) {
  const formStyle = {
    border: "5px dotted #5F1A1F",
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

  const formRef = useRef();
  const getResponseRef = useRef();

  const [isUpload, setIsUpload] = useState(false);
  const [filePath, setFilePath] = useState("");
  const [formPlaceholder, setFormPlaceholder] = useState(
    "Drag and drop your file here"
  );
  const [status, setStatus] = useState("no file uploaded");
  const [statusBg, setStatusBg] = useState("dark");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("uploading...");
    setStatusBg("warning");
    const formData = new FormData(e.target);
    const xhr = new XMLHttpRequest();
    await xhr.open("POST", "https://cv.lskpengantin.id/upload");
    xhr.send(formData);

    xhr.onload = () => {
      setIsUpload(true);
      setFilePath(JSON.parse(xhr.responseText).filename);
      setStatus("file uploaded");
      setStatusBg("success");
    };
  };

  const handleChange = (e) => {
    setFilePath(e.target.files[0].name);
    setFormPlaceholder(e.target.files[0].name);
    formRef.current.click();
  };

  useEffect(() => {
    if (isUpload) {
      props.onUpload(filePath);
    }
  }, [isUpload, filePath, props]);

  return (
    <div style={formStyle}>
      <form
        style={{
          width: "100%",
          height: "100%",
        }}
        method="POST"
        action="https://cv.lskpengantin.id/upload"
        id="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="input-label">
          <h3 style={{ maxWidth: "90%", textAlign: "center" }}>
            {formPlaceholder}
          </h3>
        </div>
        <Form.Control
          id="file"
          type="file"
          name="file"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            top: "-100%",
            left: "0",
            opacity: "0",
          }}
          onChange={handleChange}
        />
        <Button style={{ display: "none" }} ref={formRef} type="submit">
          submit
        </Button>
        <Button style={{ display: "none" }} ref={getResponseRef} type="submit">
          submit
        </Button>
      </form>
      <div className="upload-status">
        <Badge bg={statusBg}>{status}</Badge>
      </div>
    </div>
  );
}
