"use client"
import Image from 'next/image'
import React,{useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'
import { Button } from './ui/button'


type FileUploadprops = {
    fieldChange: (FILES: File[]) => void,
    mediaUrl : string
}

const FileUploaderMain = ({fieldChange, mediaUrl}:FileUploadprops) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  
    const onDrop = useCallback(
      (acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      },
      [file]
    );
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
        "image/*": [".png", ".jpeg", ".jpg"],
      },
    });
  
  return (
    <div {...getRootProps()} className='flex flex-center flex-col border-gray-400 border-[1px] bg-dark cursor-pointer rounded-xl'>
    <input {...getInputProps()} className='cursor-pointer' />
    {
      fileUrl ? (

        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <Image src={fileUrl} alt="image" className="file_uploader-img" width={50} height={50} />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>

      ): (
        <div className='file_uploader-box '>

        <Image src="/iconsN/file-upload.svg" width={96} height={77} alt='screenshotupload'/>
        <h3 className='text-blue-600 mb-2 mt-6 font-bold'>Drag photo here </h3>
        <p className='text-gray-400 mb-6 text-[15px]'> SVG, PNG, JPG</p>

        <Button className='bg-blue-400'>
            Select from computer
        </Button>
            </div>

      )
       
    }
  </div>
  )
}

export default FileUploaderMain