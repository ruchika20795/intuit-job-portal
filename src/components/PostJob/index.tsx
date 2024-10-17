import React, { useState } from "react";
import "./PostJob.css";
import { toast, ToastContainer } from "react-toastify";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [jobDescription, setJobDescription] = useState<string | null>(null);
  const [jobRequirements, setJobRequirements] = useState("");
  const [tags, setTags] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return; // If no file selected, return early

    if (file.size > 16384) {
      setError("File size must be 16KB or less.");
      return;
    }

    if (file.type !== "text/plain") {
      setError("Only .txt files are allowed.");
      return;
    }

    try {
      const fileContent = await file.text();
      setJobDescription(fileContent);
      setError(""); // Clear error if the upload is successful
    } catch (err) {
      setError("Failed to read the file.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!jobDescription) {
      setError("Please upload a job description file.");
      return;
    }

    toast.success("Job posted successfully!");

    console.log("Job Posted:", {
      title,
      jobDescription,
      jobRequirements,
      tags,
      companyName,
      contactInfo,
    });

    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setJobDescription(null);
    setJobRequirements("");
    setTags("");
    setCompanyName("");
    setContactInfo("");
    setError("");
  };

  return (
    <div className='post-job'>
      <ToastContainer />
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="job-title">Job Title:</label>
          <input
            id="job-title"
            type='text'
            className='post-job-input'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="desc-file">Job Description (max 16KB):</label>
          <input
            id="desc-file"
            type='file'
            className='post-job-input'
            accept='.txt'
            onChange={handleFileChange}
            required
          />
          {error && <p className='error'>{error}</p>}
          {jobDescription && (
            <div className='file-preview'>
              <h4>Uploaded Description:</h4>
              <pre>{jobDescription}</pre>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="job-req">Job Requirements:</label>
          <textarea
            id="job-req"
            className='post-job-input'
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tags-input">Tags (comma-separated):</label>
          <input
            id="tags-input"
            type='text'
            className='post-job-input'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="company-name">Company Name:</label>
          <input
            id="company-name"
            type='text'
            className='post-job-input'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="contact-info">Contact Info:</label>
          <input
            id="contact-info"
            type='text'
            className='post-job-input'
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>

        <div className='submit-button'>
          <button type='submit' className='post-job-button'>
            <i className='fas fa-paper-plane' />
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
