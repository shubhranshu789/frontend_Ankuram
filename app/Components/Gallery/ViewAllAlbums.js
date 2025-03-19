"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate, Link } from "react-router-dom"
import { Trash2, Edit, ArrowLeft } from "lucide-react"

const ViewAllAlbums = () => {
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/allalbums`)
      .then((res) => {
        setAlbums(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  const handleUpdate = (id) => {
    navigate(`/update/${id}`)
  }

  const removeAlbum = (albumid) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteAlbum/${albumid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        notifyB(result.message)
        navigate("/")
        // window.location.reload();
      })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-yellow-500 font-bold text-xl">Sub</span>
                <span className="text-gray-800 font-bold text-xl">Learn</span>
              </Link>
              <nav className="hidden md:flex ml-10 space-x-8">
                <Link to={"/gallery"} className="text-gray-600 hover:text-gray-900">
                  Gallery
                </Link>
                <Link to={"/viewallalbumns"} className="text-gray-600 hover:text-gray-900">
                  View All Gallery
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Resources
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </nav>
            </div>
            <div>
              <button className="hidden md:block bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Make Appointment
              </button>
              <button className="md:hidden text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header> */}
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Album Collection</h1> */}

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft size={24} className="text-primary" />
        </button>
        <h1 className="text-3xl font-bold text-center flex-1 text-primary">
          Album Collection
        </h1>
      </div>

      {albums.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No albums found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div
              key={album._id}
              className="bg-card text-card-foreground rounded-xl overflow-hidden border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={album.Coverpic || "/placeholder.svg"}
                  alt={album.AlbumName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 truncate">{album.AlbumName}</h2>
                <hr className="border-t border-gray-300 mb-4" />
                <div className="flex justify-between items-center mt-4 gap-4">
                  <button
                    onClick={() => handleUpdate(album._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                  <button style={{ color: "red" }}
                    onClick={() => removeAlbum(album._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded-md transition-colors"
                  >
                    <Trash2 size={16} />
                    <span style={{ color: "red" }}>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default ViewAllAlbums

