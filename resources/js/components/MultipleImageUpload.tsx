import { Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface MultipleImageUploadProps {
    onImagesSelected: (files: File[]) => void;
    maxFiles?: number;
    maxSize?: number; // in MB
    accept?: string;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
    onImagesSelected,
    maxFiles = 10,
    maxSize = 5, // 5MB default
    accept = 'image/*',
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const newErrors: string[] = [];
        const newFiles: File[] = [];
        const newPreviews: string[] = [];

        // Check if adding new files would exceed the max limit
        if (selectedFiles.length + e.target.files.length > maxFiles) {
            newErrors.push(`You can only upload a maximum of ${maxFiles} images.`);
            return;
        }

        // Process each file
        Array.from(e.target.files).forEach((file) => {
            // Check file size
            if (file.size > maxSize * 1024 * 1024) {
                newErrors.push(`File "${file.name}" exceeds the maximum size of ${maxSize}MB.`);
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                newErrors.push(`File "${file.name}" is not an image.`);
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    newPreviews.push(event.target.result as string);

                    // Only update state when all files are processed
                    if (newPreviews.length === newFiles.length) {
                        setPreviews([...previews, ...newPreviews]);
                        setSelectedFiles([...selectedFiles, ...newFiles]);
                        onImagesSelected([...selectedFiles, ...newFiles]);
                    }
                }
            };
            reader.readAsDataURL(file);

            newFiles.push(file);
        });

        setErrors(newErrors);

        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...selectedFiles];
        const newPreviews = [...previews];

        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);

        setSelectedFiles(newFiles);
        setPreviews(newPreviews);
        onImagesSelected(newFiles);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    Project Images ({selectedFiles.length}/{maxFiles})
                </label>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="sr-only" accept={accept} multiple />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={selectedFiles.length >= maxFiles}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                >
                    <Upload className="mr-2 h-4 w-4" />
                    Add Images
                </button>
            </div>

            {errors.length > 0 && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <X className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                There {errors.length === 1 ? 'was an error' : `were ${errors.length} errors`} with your submission
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                <ul className="list-disc space-y-1 pl-5">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedFiles.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="group relative">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                                <img src={preview} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <p className="mt-1 truncate text-xs text-gray-500">{selectedFiles[index].name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground mt-2 text-xs">
                    Click "Add Images" to upload project images Max {maxFiles} images, {maxSize}MB each
                </p>
            )}
        </div>
    );
};

export default MultipleImageUpload;
