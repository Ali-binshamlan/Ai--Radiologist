import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import "../assets/Styling/Upload.css";
import NavBar from "../Components/NavBar";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../config";

const API_CREATE_REPORT = `${BASE_URL}/user/reports/create/`;
const API_FETCH_OPTIONS = `${BASE_URL}/user/reports/options/`;

const Upload = () => {
  const { token, user } = useAuth();
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const [radioOptions, setRadioOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [modelDescription, setModelDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    file1: null,
    imagePreview1: null,
    type: "",
    bodyPart: "",
    loading: false,
    predictionResult: null,
    errorMessage: null,
    reportId: null,
  });

  

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get(`${API_FETCH_OPTIONS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRadioOptions(res.data);
      } catch (err) {
        console.error("Failed to fetch radio options", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [token]);

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: "File size must be less than 5MB",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      file1: selectedFile,
      imagePreview1: URL.createObjectURL(selectedFile),
      predictionResult: null,
      errorMessage: null,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFileSelection(selectedFile);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.file1 || !formData.type || !formData.bodyPart) {
      setFormData((prev) => ({
        ...prev,
        errorMessage: "Please complete all fields",
      }));
      return;
    }

    try {
      setFormData((prev) => ({
        ...prev,
        loading: true,
        predictionResult: null,
        errorMessage: null,
      }));

      const form = new FormData();
      form.append("image_path", formData.file1);
      form.append("radio_modality", formData.type);
      form.append("body_ana", formData.bodyPart);

      const response = await axios.post(`${API_CREATE_REPORT}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData((prev) => ({
        ...prev,
        predictionResult: response.data.report_details,
        reportId: response.data.id,
        loading: false,
      }));
      setModelDescription(response.data.model_description || "");
    } catch (error) {
      console.error("Upload error:", error);
      console.log("Server response:", error.response?.data);
      setFormData((prev) => ({
        ...prev,
        errorMessage:
          error.response?.data?.detail || "Failed to upload or generate report",
        loading: false,
      }));
    }
  };

  const handleDownloadPDF = async () => {
    if (!formData.reportId) {
      toast.error("No report available to download.");
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/user/reports/${formData.reportId}/pdf/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Medical_Report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Failed to download report.");
    }
  };

  const resetForm = () => {
    setFormData({
      file1: null,
      imagePreview1: null,
      type: "",
      bodyPart: "",
      loading: false,
      predictionResult: null,
      errorMessage: null,
      reportId: null,
    });
    setModelDescription("");
  };

  return (
    <div className="ai-radiologist-page">
      {/* Animated Background */}
      <div className="tech-background">
        <div className="circuit-lines"></div>
        <div className="data-points">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="data-point"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <NavBar />

      <motion.div
        className="upload-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              

              <div className="row justify-content-center">
                {/* Upload Section */}
                <motion.div
                  className="col-lg-6 mb-5"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="upload-card">
                    <div className="card-header">
                      <h3 className="card-title">
                        <i className="bi bi-cloud-upload-fill me-2"></i>
                        Upload Medical Image
                      </h3>
                      <p className="card-subtitle">
                        Supported formats: JPEG, PNG (Max 5MB)
                      </p>
                    </div>

                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        {/* Drag & Drop Area */}
                        <motion.div
                          className={`drop-area ${
                            isDragging ? "dragging" : ""
                          } ${formData.imagePreview1 ? "has-image" : ""}`}
                          ref={dropAreaRef}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            hidden
                            onChange={handleFileChange}
                            accept="image/jpeg,image/png"
                          />

                          <AnimatePresence mode="wait">
                            {formData.imagePreview1 ? (
                              <motion.div
                                key="preview"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="image-preview-wrapper"
                              >
                                <img
                                  src={formData.imagePreview1}
                                  alt="Medical scan preview"
                                  className="upload-preview"
                                />
                                <div className="preview-overlay">
                                  <i className="bi bi-arrow-repeat"></i>
                                  <span>Click to change image</span>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="drop-placeholder"
                              >
                                <i className="bi bi-file-earmark-medical"></i>
                                <h4>Drop medical image here</h4>
                                <p>or click to browse files</p>
                                <div className="supported-formats">
                                  <span className="format-tag">CT Scan</span>
                                  <span className="format-tag">X-Ray</span>
                                  <span className="format-tag">MRI</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Analysis Parameters */}
                        <div className="analysis-params mt-4">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label className="form-label">
                                <i className="bi bi-cpu me-2"></i>
                                Imaging Modality
                              </label>
                              <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="form-select modern-select"
                                disabled={formData.predictionResult !== null}
                              >
                                <option value="">
                                  {loadingOptions
                                    ? "Loading modalities..."
                                    : "Select Modality"}
                                </option>
                                {radioOptions.map((modality) => (
                                  <option
                                    key={modality.modality.id}
                                    value={modality.modality.id}
                                  >
                                    {modality.modality.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <AnimatePresence mode="wait">
                              {formData.type && (
                                <motion.div
                                  className="col-md-6"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                >
                                  <label className="form-label">
                                    <i className="bi bi-body-text me-2"></i>
                                    Body Region
                                  </label>
                                  <select
                                    name="bodyPart"
                                    value={formData.bodyPart}
                                    onChange={handleChange}
                                    className="form-select modern-select"
                                    disabled={
                                      formData.predictionResult !== null
                                    }
                                  >
                                    <option value="">
                                      {loadingOptions
                                        ? "Loading regions..."
                                        : "Select Body Part"}
                                    </option>
                                    {radioOptions
                                      .find(
                                        (opt) =>
                                          opt.modality.id ===
                                          parseInt(formData.type)
                                      )
                                      ?.regions.map((region) => (
                                        <option
                                          key={region.id}
                                          value={region.id}
                                        >
                                          {region.name}
                                        </option>
                                      ))}
                                  </select>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons mt-4">
                          <motion.button
                            type="submit"
                            className={`btn btn-primary analyze-btn ${
                              formData.loading ? "loading" : ""
                            }`}
                            disabled={
                              formData.loading ||
                              !formData.file1 ||
                              !formData.type ||
                              !formData.bodyPart
                            }
                            whileHover={{
                              scale:
                                formData.loading ||
                                !formData.file1 ||
                                !formData.type ||
                                !formData.bodyPart
                                  ? 1
                                  : 1.05,
                              boxShadow:
                                formData.loading ||
                                !formData.file1 ||
                                !formData.type ||
                                !formData.bodyPart
                                  ? "none"
                                  : "0 10px 25px rgba(0, 123, 255, 0.3)",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {formData.loading ? (
                              <>
                                <motion.span
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="spinner-border spinner-border-sm me-2"
                                ></motion.span>
                                AI Analyzing...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-robot me-2"></i>
                                Start AI Analysis
                              </>
                            )}
                          </motion.button>

                          {formData.predictionResult && (
                            <motion.button
                              type="button"
                              className="btn btn-outline-light ms-2"
                              onClick={resetForm}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <i className="bi bi-plus-circle me-2"></i>
                              New Analysis
                            </motion.button>
                          )}
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                          {formData.errorMessage && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="alert alert-danger mt-3"
                            >
                              <i className="bi bi-exclamation-triangle-fill me-2"></i>
                              {formData.errorMessage}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </form>
                    </div>
                  </div>
                </motion.div>

                {/* Report Section */}
                <motion.div
                  className="col-lg-6"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <AnimatePresence>
                    {formData.predictionResult ? (
                      <motion.div
                        className="report-card"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="card-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <h3 className="card-title">
                              <i className="bi bi-file-earmark-medical-fill me-2"></i>
                              AI Diagnostic Report
                            </h3>
                            <div className="report-badge">AI Generated</div>
                          </div>
                          <div className="patient-info">
                            <div className="row">
                              <div className="col-md-6">
                                <strong>Patient:</strong> {user?.first_name}{" "}
                                {user?.last_name}
                              </div>
                              <div className="col-md-6">
                                <strong>Date:</strong>{" "}
                                {new Date().toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body">
                          {/* Technical Details */}
                          <div className="report-section">
                            <h5 className="section-title">
                              <i className="bi bi-gear-fill me-2"></i>
                              Technical Details
                            </h5>
                            <p>
                              A{" "}
                              {
                                radioOptions.find(
                                  (opt) =>
                                    opt.modality.id === parseInt(formData.type)
                                )?.modality.name
                              }
                              examination was performed focusing on the{" "}
                              {radioOptions
                                .find(
                                  (opt) =>
                                    opt.modality.id === parseInt(formData.type)
                                )
                                ?.regions.find(
                                  (region) =>
                                    region.id === parseInt(formData.bodyPart)
                                )
                                ?.name.toLowerCase()}{" "}
                              region. Images were acquired following standard
                              clinical protocols.
                            </p>
                          </div>

                          {/* AI Findings */}
                          <div className="report-section">
                            <h5 className="section-title findings-title">
                              <i className="bi bi-clipboard2-pulse-fill me-2"></i>
                              AI Analysis Findings
                            </h5>
                            <div className="findings-content">
                              {formData.predictionResult
                                .split("\n")
                                .map((line, index) => {
                                  const match = line.match(/^([^:]+:)(.*)$/);
                                  if (match) {
                                    const [, heading, rest] = match;
                                    return (
                                      <div key={index} className="finding-item">
                                        <strong className="finding-heading">
                                          {heading}
                                        </strong>
                                        {rest}
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div key={index} className="finding-item">
                                        {line}
                                      </div>
                                    );
                                  }
                                })}
                            </div>
                          </div>

                          {/* Model Info */}
                          {modelDescription && (
                            <div className="report-section">
                              <h5 className="section-title">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                AI Model Information
                              </h5>
                              <p>{modelDescription}</p>
                            </div>
                          )}

                          {/* Recommendations */}
                          <div className="report-section">
                            <h5 className="section-title">
                              <i className="bi bi-lightbulb-fill me-2"></i>
                              Clinical Recommendations
                            </h5>
                            <div className="recommendations">
                              <div className="recommendation-item">
                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                Consult with a qualified radiologist for
                                comprehensive evaluation
                              </div>
                              <div className="recommendation-item">
                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                Consider follow-up imaging if clinically
                                indicated
                              </div>
                              <div className="recommendation-item">
                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                Correlation with patient history and physical
                                examination recommended
                              </div>
                            </div>
                          </div>

                          {/* Download Button */}
                          <div className="text-center mt-4">
                            <motion.button
                              onClick={handleDownloadPDF}
                              className="btn btn-success download-report-btn"
                              whileHover={{
                                scale: 1.05,
                                boxShadow: "0 8px 20px rgba(40, 167, 69, 0.3)",
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <i className="bi bi-download me-2"></i>
                              Download Full Report (PDF)
                            </motion.button>
                          </div>

                          {/* Disclaimer */}
                          <div className="disclaimer mt-4">
                            <small className="text-muted">
                              <i className="bi bi-exclamation-triangle me-1"></i>
                              This AI-generated report is for assistance
                              purposes only and should be interpreted by
                              qualified medical professionals.
                            </small>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="placeholder-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="placeholder-content">
                          <i className="bi bi-graph-up-arrow"></i>
                          <h4>AI Analysis Report</h4>
                          <p>
                            Upload a medical image and start analysis to see the
                            AI diagnostic report here.
                          </p>
                          <div className="placeholder-features">
                            <div className="feature">
                              <i className="bi bi-lightning-charge-fill"></i>
                              <span>Fast Analysis</span>
                            </div>
                            <div className="feature">
                              <i className="bi bi-shield-check"></i>
                              <span>Secure & Private</span>
                            </div>
                            <div className="feature">
                              <i className="bi bi-graph-up"></i>
                              <span>High Accuracy</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Upload;
