"use client";

import React, { useEffect, useState } from "react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: String) => void;
  onRemove: (value: String) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  // function for prevent hidration
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url); // from console.log(result) we can see that the url is in result.info.secure_url
  };

  if (!isMounted) return null;

  return (
    <>
      <div className="mb-4 flex items-center gap-4"></div>
    </>
  );
};

export default ImageUpload;
