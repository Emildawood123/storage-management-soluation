'use client';
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn, convertFileToUrl, getFileType } from '@/lib/utils';
import { File } from 'buffer';
import Thumbnail from './thumbnail';
import { usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { uploadFile } from '@/lib/files.actions';
interface Props {
  ownerId: string,
  accountId: string,
  className?: string
}
const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname()
  const { toast } = useToast();
    const MAX_FILE_SIZE = 50 * 1024 * 1024;
    const [files, setFiles] = useState<File[]>([])
      const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name),
          );

          return toast({
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            ),
            className: "error-toast",
          });
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name),
              );
            }
          },
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button className={cn('uploader-button', className)}>
        <Image alt='' src='assets/icons/upload.svg' width={24} height={24} />
        <p>Upload</p>
      </Button>
      { 
        files.length > 0 && (
          <ul className='uploader-preview-list'>
            <h4 className='h4 text-light-100'></h4>
            { 
              files.map((item, i) => {
                const { type, extension } = getFileType(item.name)
                return (<li key={`${item.name}-${i}`} className='uploader-preview-item'>
                  <div className='flex items-center gap-3'>
                    <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(item)}
                  />

                  <div className="preview-item-name">
                    {item.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="Loader"
                    />
                  </div>
                  </div>
                   <Image
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  onClick={(e) => handleRemoveFile(e, item.name)}
                />
              </li>)
            })}
          </ul>
      )     
      }
    </div>
  )
}
export default FileUploader
