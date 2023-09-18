"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

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
      <div className="mb-4 flex items-center gap-4">
        {value.length ? (
          value.map((url) => (
            <div key={url} className="relative w-[200px] h-[200px] rounded overflow-hidden">
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => {
                    onRemove(url);
                  }}
                  variant={"destructive"}
                  size={"icon"}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Image fill className="object-cover" alt="Image" src={url} />
            </div>
          ))
        ) : (
          <>
            <div className="w-[200px] h-[200px] rounded overflow-hidden">
              <div className="absolute">
                <div className="bg-blue-700 rounded">
                  <h1 className="flex justify-center items-center w-[200px] h-[200px]">Hello World</h1>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="qklhqrek">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button type="button" disabled={disabled} onClick={onClick} variant={"outline"}>
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload image
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
