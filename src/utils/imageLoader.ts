// Image loading optimization utility

/**
 * Creates an optimized image URL with width and quality parameters
 * This is a placeholder for actual image optimization service integration
 * In a production app, you would use something like Cloudinary, Imgix, or Next.js Image
 */
export const getOptimizedImageUrl = (src: string): string => {
  // If using an actual image optimization service, you would transform the URL here
  // For now, we'll just return the original URL
  return src;
};

/**
 * Preloads an image to improve perceived performance
 */
export const preloadImage = (src: string): void => {
  const img = new Image();
  img.src = src;
};

/**
 * Preloads critical images for the application
 */
export const preloadCriticalImages = (images: string[]): void => {
  images.forEach(preloadImage);
};

/**
 * Creates a responsive srcSet for images
 */
export const createSrcSet = (src: string, widths: number[] = [320, 640, 960, 1280, 1920]): string => {
  return widths.map(width => `${getOptimizedImageUrl(src)} ${width}w`).join(', ');
};
