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

  if (!isMounted) return null;

  const onUpload = (result: any) => {
    onChange(result.info.secure_url); // from console.log(result) we can see that the url is in result.info.secure_url
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
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
        ))}
        {/* If use code on this btm can't upload multiple image, need edit code */}
        {/* {value.length ? (
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
            <CldUploadWidget onUpload={onUpload} uploadPreset="qklhqrek">
              {({ open }) => {
                const onClick = () => {
                  open();
                };
                return (
                  <div className="w-[200px] h-[200px] rounded overflow-hidden">
                    <div className="absolute">
                      <div onClick={onClick} className="cursor-pointer">
                        <div className="bg-gray-100 rounded">
                          <h1 className="flex justify-center items-center w-[200px] h-[200px] text-black/40 hover:text-black/70 text-sm duration-200">
                            Upload your image
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>
          </>
        )} */}
      </div>
      {/* Inser preset btm this line */}
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
