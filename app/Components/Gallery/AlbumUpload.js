"use client"

import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import { Camera, Upload, ImageIcon, Loader2, ArrowLeft } from "lucide-react"


const AlbumUpload = () => {
  const [albumName, setAlbumName] = useState("")
  const [coverPic, setCoverPic] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [albumId, setAlbumId] = useState("")
  const [galleryPics, setGalleryPics] = useState([])
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const navigate = useNavigate()

  const handleCoverPicChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverPic(file)
      const reader = new FileReader()
      reader.onload = () => {
        setCoverPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryPicsChange = (e) => {
    const files = [...e.target.files]
    setGalleryPics(files)

    // Create previews for gallery images
    const previews = []
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        previews.push(e.target.result)
        if (previews.length === files.length) {
          setGalleryPreviews([...previews])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleAlbumCreate = async () => {
    if (!albumName || !coverPic) {
      toast.error("Please provide album name and cover pic!")
      return
    }

    setIsCreating(true)
    const formData = new FormData()
    formData.append("albumName", albumName)
    formData.append("coverpic", coverPic)

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create-album`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setAlbumId(res.data.album._id)
      toast.success("Album created successfully!")
      setIsCreating(false)
    } catch (error) {
      console.error(error)
      toast.error("Failed to create album!")
      setIsCreating(false)
    }
  }

  const handleGalleryUpload = async () => {
    if (!albumId || galleryPics.length === 0) {
      toast.error("Please select an album and images!")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    galleryPics.forEach((pic) => formData.append("images", pic))

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload-gallery/${albumId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      toast.success("Gallery images uploaded!")
      setIsUploading(false)
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Failed to upload images!")
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">

      <ToastContainer position="top-center" />


      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft size={24} className="text-primary" />
        </button>
        <h1 className="text-3xl font-bold text-center flex-1 text-primary">
          Photo Album Creator
        </h1>
      </div>

      {/* Album Creation */}
      <div className="bg-white shadow-xl rounded-xl mb-8 overflow-hidden">
        <div className="bg-primary/10 p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: "black" }}>
            <Camera className="h-5 w-5 text-primary" style={{ color: "black" }} /> Create New Album
          </h2>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="albumName" className="block text-sm font-medium mb-2 text-gray-700">
              Album Name
            </label>
            <input
              id="albumName"
              type="text"
              placeholder="Enter a name for your album"
              className="border text-black border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Cover Image</label>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 transition-all hover:border-primary cursor-pointer bg-gray-50">
              <input type="file" id="coverPic" className="hidden" onChange={handleCoverPicChange} />

              {coverPreview ? (
                <div className="relative w-full max-w-md">
                  <img
                    src={coverPreview || "/placeholder.svg"}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => {
                      setCoverPic(null)
                      setCoverPreview(null)
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label htmlFor="coverPic" className="flex flex-col items-center cursor-pointer">
                  <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 font-medium">Click to select cover image</span>
                  <span className="text-xs text-gray-400 mt-1">JPG, PNG or GIF files</span>
                </label>
              )}
            </div>
          </div>

          <button style={{ color: "black", cursor: "pointer" }}
            className={`w-full flex items-center justify-center gap-2 rounded-lg py-3 px-4 font-medium transition-colors ${isCreating ? "bg-primary/70 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
              } text-white`}
            onClick={handleAlbumCreate}
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating Album...
              </>
            ) : (
              <>
                <Camera className="h-5 w-5" style={{ color: "black" }} />
                Create Album
              </>
            )}
          </button>
        </div>
      </div>

      {/* Gallery Upload */}
      {albumId && (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="bg-green-100 p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-green-800">
              <Upload className="h-5 w-5" /> Upload Gallery Images
            </h2>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">Gallery Images</label>

              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 transition-all hover:border-green-500 cursor-pointer bg-gray-50">
                <input type="file" id="galleryPics" className="hidden" multiple onChange={handleGalleryPicsChange} />

                {galleryPreviews.length > 0 ? (
                  <div className="w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                      {galleryPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`Gallery preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg shadow-sm"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{galleryPics.length} images selected</span>
                      <button
                        onClick={() => {
                          setGalleryPics([])
                          setGalleryPreviews([])
                        }}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Clear selection
                      </button>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="galleryPics" className="flex flex-col items-center cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">Click to select gallery images</span>
                    <span className="text-xs text-gray-400 mt-1">Select multiple images</span>
                  </label>
                )}
              </div>
            </div>

            <button
              className={`w-full flex items-center justify-center gap-2 rounded-lg py-3 px-4 font-medium transition-colors ${isUploading || galleryPics.length === 0
                ? "bg-green-500/70 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
                } text-white`}
              onClick={handleGalleryUpload}
              disabled={isUploading || galleryPics.length === 0}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Uploading Images...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Upload {galleryPics.length} Images
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlbumUpload

