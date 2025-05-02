import { Star, Trash } from 'lucide-react';
import React, { useState } from 'react';

interface Image {
    id: number;
    image_path: string;
    alt_text: string | null;
    display_order: number;
    is_featured: boolean;
    // Add potential additional fields that might be in the data
    portfolio_project_id?: number;
    created_at?: string;
    updated_at?: string;
}

interface ImageGalleryProps {
    images: Image[];
    onDelete?: (imageId: number) => void;
    onSetFeatured?: (imageId: number) => void;
    editable?: boolean;
    behanceStyle?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onDelete, onSetFeatured, editable = false, behanceStyle = false }) => {
    // Add console log to debug
    console.log('ImageGallery received images:', images);

    // Helper function to format image paths correctly
    const getImagePath = (path: string) => {
        if (!path) return '';

        // If path already starts with /storage, return as is
        if (path.startsWith('/storage/')) return path;

        // If path starts with /, prepend /storage
        if (path.startsWith('/')) return `/storage${path}`;

        // Otherwise, prepend /storage/
        return `/storage/${path}`;
    };

    const [selectedImage, setSelectedImage] = useState<Image | null>(images.length > 0 ? images[0] : null);

    // Sort images by display_order
    const sortedImages = [...images].sort((a, b) => {
        // Handle case where display_order might be undefined
        const orderA = a.display_order ?? 0;
        const orderB = b.display_order ?? 0;
        return orderA - orderB;
    });

    // Find featured image
    const featuredImage = images.find((img) => img.is_featured) || (images.length > 0 ? images[0] : null);

    if (behanceStyle) {
        return (
            <div className="space-y-6">
                {/* Featured image at the top */}
                {featuredImage && (
                    <div className="relative overflow-hidden rounded-lg bg-gray-100">
                        <img
                            src={getImagePath(featuredImage.image_path)}
                            alt={featuredImage.alt_text || 'Featured portfolio image'}
                            className="h-auto max-h-[600px] w-full object-contain"
                            onError={() => {
                                console.error('Image failed to load:', featuredImage.image_path);
                            }}
                        />
                        <div className="absolute top-2 left-2">
                            <span className="rounded-md bg-yellow-500 px-2 py-1 text-xs font-bold text-white">Featured</span>
                        </div>
                    </div>
                )}

                {/* Other images stacked vertically */}
                {sortedImages
                    .filter((img) => !img.is_featured)
                    .map((image) => (
                        <div key={image.id} className="relative overflow-hidden rounded-lg bg-gray-100">
                            <img
                                src={getImagePath(image.image_path)}
                                alt={image.alt_text || 'Portfolio image'}
                                className="h-auto w-full object-contain"
                                onError={() => {
                                    console.error('Image failed to load:', image.image_path);
                                }}
                            />
                            {editable && (
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    {!image.is_featured && onSetFeatured && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSetFeatured(image.id);
                                            }}
                                            className="rounded-full bg-yellow-500 p-2 text-white transition-colors hover:bg-yellow-600"
                                            title="Set as featured image"
                                        >
                                            <Star className="h-4 w-4" />
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(image.id);
                                            }}
                                            className="rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                                            title="Delete image"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                {/* No images message */}
                {images.length === 0 && (
                    <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100">
                        <p className="text-gray-500">No images available</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-4">
            {/* Main image display */}
            {selectedImage && (
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                    <img
                        src={getImagePath(selectedImage.image_path)}
                        alt={selectedImage.alt_text || 'Portfolio image'}
                        className="h-auto max-h-[500px] w-full object-contain"
                        onError={() => {
                            console.error('Image failed to load:', selectedImage.image_path);
                        }}
                    />
                    {selectedImage.is_featured && (
                        <div className="absolute top-2 left-2">
                            <span className="rounded-md bg-yellow-500 px-2 py-1 text-xs font-bold text-white">Featured</span>
                        </div>
                    )}
                </div>
            )}

            {/* Thumbnails - Always show thumbnails, even with just one image */}
            {sortedImages.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                    {sortedImages.map((image) => (
                        <div
                            key={image.id}
                            className={`relative cursor-pointer overflow-hidden rounded-md ${
                                selectedImage?.id === image.id ? 'ring-primary ring-2' : ''
                            }`}
                            onClick={() => setSelectedImage(image)}
                        >
                            <img
                                src={getImagePath(image.image_path)}
                                alt={image.alt_text || 'Thumbnail'}
                                className="h-20 w-full object-cover"
                                onError={(e) => {
                                    console.error('Thumbnail failed to load:', image.image_path);
                                    e.currentTarget.src = '/images/placeholder.png'; // Fallback image
                                }}
                            />

                            {/* Featured indicator */}
                            {image.is_featured && (
                                <div className="absolute top-1 left-1">
                                    <div className="bg-opacity-70 rounded-full bg-yellow-500 p-1">
                                        <Star className="h-3 w-3 fill-white text-white" />
                                    </div>
                                </div>
                            )}

                            {editable && (
                                <>
                                    {/* Delete button */}
                                    {onDelete && (
                                        <div className="absolute top-1 right-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDelete(image.id);
                                                }}
                                                className="bg-opacity-70 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                                                title="Delete image"
                                            >
                                                <Trash className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}

                                    {/* Set as featured button */}
                                    {!image.is_featured && onSetFeatured && (
                                        <div className="absolute top-1 left-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSetFeatured(image.id);
                                                }}
                                                className="bg-opacity-70 rounded-full bg-yellow-500 p-1 text-white transition-colors hover:bg-yellow-600"
                                                title="Set as featured image"
                                            >
                                                <Star className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* No images message */}
            {images.length === 0 && (
                <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100">
                    <p className="text-gray-500">No images available</p>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
