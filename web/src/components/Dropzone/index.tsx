import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiAlertTriangle } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUpload: (file: File) => void;
  error?: string | null;
}

const Dropzone: React.FC<Props> = ({ onFileUpload, error }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    acceptedFiles => {
      const [file] = acceptedFiles;

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);

      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <>
      <div className={`dropzone ${error ? 'error' : ''}`} {...getRootProps()}>
        <input {...getInputProps()} accept="image/*" />

        {selectedFileUrl ? (
          <img src={selectedFileUrl} alt="Imagem enviada" />
        ) : (
          <p>
            <FiUpload />
            Imagem do estabelecimento
          </p>
        )}
      </div>

      {error && (
        <span>
          <FiAlertTriangle color="#e57373" size={20} />
          {error}
        </span>
      )}
    </>
  );
};

export default Dropzone;
