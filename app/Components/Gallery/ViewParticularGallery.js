"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { ArrowLeft, Camera, Image } from "lucide-react"

function ViewParticularGallery() {
  const [listPics, setListPics] = useState([])
  const { albumid } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getalbum/${albumid}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        const result = await response.json()
        setListPics(result)
        console.log(result)
      } catch (error) {
        console.error("Error fetching album:", error)
        toast.error("Failed to load album")
      }
    }

    fetchAlbum()
  }, [albumid])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-yellow-500 font-bold text-xl">Sub</span>
                <span className="text-gray-800 font-bold text-xl">Learn</span>
              </Link>
              <nav className="hidden md:flex ml-10 space-x-8">
                <Link to="/gallery" className="text-gray-600 hover:text-gray-900 font-medium transition duration-150">
                  Gallery
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium transition duration-150">
                  For Schools
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium transition duration-150">
                  Resources
                </Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium transition duration-150">
                  About Us
                </Link>
              </nav>
            </div>
            <div>
              <button className="hidden md:block bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-5 py-2 text-sm font-medium transition duration-150 shadow-sm">
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
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition duration-150"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              {/* <h1 className="text-3xl font-bold text-gray-900">Gallery Album</h1>
              <p className="text-gray-500 mt-1">
                Album ID: <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{albumid}</span>
              </p> */}
            </div>
            {listPics.AlbumName && (
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <Camera className="h-4 w-4 mr-1" />
                  {listPics.gallerySection?.length || 0} Photos
                </span>
              </div>
            )}
          </div>
        </div>

        {listPics.AlbumName ? (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="relative">


              {/* <img
                src={listPics.Coverpic || "/placeholder.svg?height=400&width=800"}
                alt={`${listPics.AlbumName} Cover`}
                className="w-full h-64 sm:h-80 object-cover"
              /> */}

              <div className="relative w-full h-150 aspect-[21/9]"> {/* Wider, reduces height */}
                <img
                  src={listPics.Coverpic || "/placeholder.svg?height=400&width=800"}
                  alt={`${listPics.AlbumName} Cover`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>




              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{listPics.AlbumName}</h2>
                {/* {listPics.description && <p className="text-white/90 max-w-2xl">{listPics.description}</p>} */}
              </div>
            </div>

            <div className="p-6">
              {listPics.gallerySection && listPics.gallerySection.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listPics.gallerySection.map((item) => (
                    <div
                      key={item._id}
                      className="group relative bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200"
                    >
                      {/* <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.description || "Gallery Image"}
                        className="w-full h-full sm:h-56 object-cover transition duration-300 group-hover:scale-105"
                      /> */}


                      <div className="relative w-full h-100 aspect-[16/9]">
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.description || "Gallery Image"}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>



                      {item.description && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-end transition duration-300">
                          <p className="text-white p-4 text-sm">{item.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No images uploaded yet.</p>
                  <p className="text-gray-400 mt-2">Check back later or contact the administrator.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading album...</p>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <span className="text-yellow-400 font-bold text-xl">Sub</span>
                <span className="text-white font-bold text-xl">Learn</span>
              </div>
              <p className="mt-2 text-gray-400 text-sm max-w-md">
                Providing quality educational resources and gallery services for schools and educational institutions.
              </p>
            </div>


            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="#" className="text-gray-400 hover:text-white transition duration-150">
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-gray-400 hover:text-white transition duration-150">
                      For Schools
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-gray-400 hover:text-white transition duration-150">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="#" className="text-gray-400 hover:text-white transition duration-150">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-gray-400 hover:text-white transition duration-150">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-gray-400 hover:text-white transition duration-150">
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center sm:text-left">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} SubLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default ViewParticularGallery

