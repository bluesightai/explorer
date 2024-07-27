// LazyImage.tsx
import React, { useEffect, useState } from "react"
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"

interface LazyImageProps {
  boxData: BoundingBoxResponse
  fetchImage: (box: BoundingBoxResponse) => Promise<string>
  alt: string
}

const LazyImage: React.FC<LazyImageProps> = ({ boxData, fetchImage, alt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const loadImage = async () => {
      try {
        const url = await fetchImage(boxData)
        if (isMounted) {
          setImageUrl(url)
        }
      } catch (error) {
        console.error("Error loading image:", error)
      }
    }

    loadImage()

    return () => {
      isMounted = false
    }
  }, [boxData, fetchImage])

  return imageUrl ? <img src={imageUrl} alt={alt} /> : <div className="image-placeholder" />
}

export default LazyImage
