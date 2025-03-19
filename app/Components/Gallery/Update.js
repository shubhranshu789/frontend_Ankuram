"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { Upload, Trash2, ArrowLeft, Image, X } from "lucide-react"

function Update() {
  const [listPics, setListPics] = useState({
    AlbumName: "",
    Coverpic: "",
    gallerySection: [],
  })
  const [galleryPics, setGalleryPics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const { albumid } = useParams()
  const navigate = useNavigate()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewUrls, setPreviewUrls] = useState([])

  useEffect(() => {
    const fetchAlbum = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getalbum/${albumid}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        const result = await response.json()
        setListPics(result)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching album:", error)
        toast.error("Failed to load album details")
        setIsLoading(false)
      }
    }

    fetchAlbum()
  }, [albumid])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setGalleryPics(files)

    // Create preview URLs for selected files
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls(newPreviewUrls)
  }

  const removeSelectedFile = (index) => {
    const newFiles = [...galleryPics]
    newFiles.splice(index, 1)
    setGalleryPics(newFiles)

    const newPreviewUrls = [...previewUrls]
    URL.revokeObjectURL(newPreviewUrls[index]) // Clean up the URL
    newPreviewUrls.splice(index, 1)
    setPreviewUrls(newPreviewUrls)
  }

  const handleGalleryUpload = async () => {
    if (!albumid || galleryPics.length === 0) {
      toast.error("Please select images to upload!")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    galleryPics.forEach((pic) => formData.append("images", pic))

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload-gallery/${albumid}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percentCompleted)
        },
      })

      toast.success("Gallery images uploaded successfully!")
      setUploadProgress(0)
      setGalleryPics([])
      setPreviewUrls([])
      setIsUploading(false)

      // Refresh album data
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getalbum/${albumid}`, {
        headers: { "Content-Type": "application/json" },
      })
      const result = await response.json()
      setListPics(result)
    } catch (error) {
      console.error(error)
      toast.error("Failed to upload images!")
      setIsUploading(false)
    }
  }

  const removeImage = async (imageId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/removeImage/${albumid}/${imageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setListPics((prev) => ({
          ...prev,
          gallerySection: prev.gallerySection.filter((img) => img._id !== imageId),
        }))
        toast.success("Image removed successfully")
      } else {
        toast.error(data.message || "Failed to remove image")
      }
    } catch (error) {
      console.error("Error removing image:", error)
      toast.error("Failed to remove image")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Albums
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Album Details Section */}
        <div className="bg-card text-card-foreground rounded-xl overflow-hidden border border-border shadow-sm">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{listPics.AlbumName || "Album Details"}</h1>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted mb-6">
              <img
                src={listPics.Coverpic || "/placeholder.svg"}
                alt="Album Cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-card text-card-foreground rounded-xl overflow-hidden border border-border shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Upload Gallery Images</h2>

            <div className="mb-6">
              <label
                htmlFor="gallery-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 10MB)</p>
                </div>
                <input
                  id="gallery-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            </div>

            {/* Selected Files Preview */}
            {previewUrls.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Selected Images ({previewUrls.length})</h3>
                <div className="grid grid-cols-3 gap-2">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-md overflow-hidden bg-muted">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeSelectedFile(index)}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Button & Progress */}
            <div>
              <button
                className={`w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-md transition-colors ${isUploading || galleryPics.length === 0 ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                onClick={handleGalleryUpload}
                disabled={isUploading || galleryPics.length === 0}
              >
                <Upload size={16} />
                {isUploading ? "Uploading..." : "Upload Images"}
              </button>

              {/* Progress Bar */}
              {uploadProgress > 0 && (
                <div className="mt-4 w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-2 transition-all duration-300 ease-in-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mt-8 bg-card text-card-foreground rounded-xl overflow-hidden border border-border shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Gallery Images</h2>
            <span className="text-sm text-muted-foreground">{listPics.gallerySection?.length || 0} images</span>
          </div>

          {listPics.gallerySection && listPics.gallerySection.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {listPics.gallerySection.map((item) => (
                <div key={item._id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.description || "Gallery Image"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <button
                    onClick={() => removeImage(item._id)}
                    className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                    aria-label="Delete image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Image className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
              <h3 className="text-lg font-medium">No images yet</h3>
              <p className="text-sm text-muted-foreground mt-1">Upload some images to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Update

