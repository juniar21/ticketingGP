'use client'
import React, { useState, ChangeEvent } from "react";

interface ImageUploaderProps {
  onChange: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file); // kirim file ke Formik
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); // tampilkan preview
      };
      reader.readAsDataURL(file);
    } else {
      onChange(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="my-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-white"
      />
      {previewUrl && (
        <div className="mt-2">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-40 h-40 object-cover border border-gray-400 rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;