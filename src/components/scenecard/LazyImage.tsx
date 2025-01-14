// LazyImage.tsx
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"
import React, { useEffect, useState } from "react"

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
  }, [boxData.id])

  return imageUrl ? <img src={imageUrl} alt={alt} /> : <div className="image-placeholder" />
}

export default LazyImage
