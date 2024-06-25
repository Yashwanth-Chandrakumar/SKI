import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import * as XLSX from 'xlsx';
import '../components/FileView.css';


function FileView({ onFileSubmit }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [viewFile, setViewFile] = useState(false);
    const [fileContent, setFileContent] = useState(null);
    const [warning, setWarning] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fileSizeLimit = 2 * 1024 * 1024; // 5MB size limit

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > fileSizeLimit) {
                setWarning('File size exceeds the 2MB limit.');
                setSelectedFile(null);
                setViewFile(false);
                setFileContent(null);
            } else {
                setWarning('');
                setSelectedFile(file);
                setViewFile(false);
                setFileContent(null);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            onFileSubmit(selectedFile); // Invoke callback when file is submitted
            setIsSubmitted(true);
            toast.success("File uploaded successfully!");
        } else {
            toast.error("Please select a file before submitting.");
        }
    };
    const handleDownload = () => {
        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = selectedFile.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(fileURL); // Clean up the URL.createObjectURL object
        }
    };

    const handleView = () => {
        if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonContent = XLSX.utils.sheet_to_json(worksheet);
                setFileContent(jsonContent);
                setViewFile(true);
            };
            reader.readAsArrayBuffer(selectedFile);
        } else {
            setViewFile(true);
        }
    };

    const notify = () => toast("Updation Successful");

    const renderFile = () => {
        if (!selectedFile) return null;

        const fileURL = URL.createObjectURL(selectedFile);
        const fileType = selectedFile.type;

        if (fileType.startsWith('image/')) {
            return <img src={fileURL} alt="Uploaded" className="uploaded-file" />;
        } else if (fileType.startsWith('video/')) {
            return <video controls src={fileURL} className="uploaded-file" />;
        } else if (fileType === 'application/pdf') {
            return <embed src={fileURL} type="application/pdf" className="uploaded-file" />;
        } else if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return (
                <table className="excel-table">
                    <thead>
                        <tr>
                            {fileContent && Object.keys(fileContent[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {fileContent && fileContent.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(row).map((value, colIndex) => (
                                    <td key={colIndex}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            return (
                <a href={fileURL} download={selectedFile.name} className="uploaded-file">
                    {selectedFile.name}
                </a>
            );
        }
    };

    return (
        <div className="nav1">
             <ToastContainer />
            <h3>Upload Documents</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="file" 
                        accept=".pdf, .xls, .xlsx, image/*" 
                        onChange={handleFileChange}
                    />
                 {!isSubmitted && (
                        <button type="button" onClick={handleSubmit} name="save" id="save" disabled={!selectedFile}>
                            Submit
                        </button>
                    )}
                    <h5>Upload Documents less than 2MB</h5>
                </form>
            </div>
            {warning && (
                <div className="warning">
                    {warning}
                </div>
            )}
            {selectedFile && (
                <div className="file-actions">
                    <button type='button' onClick={handleView} className="view-button">
                        View
                    </button>
                    <button type='button' onClick={handleDownload} className="download-button">
                        Download
                    </button>
                </div>
            )}
            {viewFile && (
                <div className="file-container">
                    <div className="file-preview">
                        {renderFile()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileView;
