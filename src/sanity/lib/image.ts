// sanityImageUrl.ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client"; 
// Create an image URL builder using the client
const builder = imageUrlBuilder(client);

// Export a function that can be used to get image URLs with full optimization
export function urlFor(source: SanityImageSource) {
  return builder
    .image(source)
    .auto("format") // Auto WebP/AVIF conversion (smaller files, same visual quality)
    .fit("max") // Responsive sizing without cropping
    .quality(95); // Maximum quality - NO compression
}


