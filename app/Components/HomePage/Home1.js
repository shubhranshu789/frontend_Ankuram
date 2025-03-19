import Image from "next/image"
import { Star, ArrowUpRight, Globe, Target, NetworkIcon as Connection, ChevronRight, ChevronLeft } from "lucide-react"


import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import HeroSection from "./hero-carousel.tsx"

import useEmblaCarousel from "embla-carousel-react"
// import { Button } from "@/components/ui/button"

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";



export default function Home1() {

  const [albums, setAlbums] = useState([]);

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/allalbums`)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleUpdate = (id) => {
    console.log("Update album", id);
  };


  const removeAlbum = (albumid) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteAlbum/${albumid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        notifyB(result.message);
        // window.location.reload();
      });
  };



  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  const onSelect = () => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])





  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-green-700 font-bold text-xl">Anku</span>
                <span className="text-orange-600 font-bold text-xl">ram</span>
              </Link>
              <nav className="hidden md:flex ml-10 space-x-8">
                <Link to={"/gallery"} className="text-gray-600 hover:text-gray-900">
                  Gallery
                </Link>
                <Link to={"/viewallalbumns"} className="text-gray-600 hover:text-gray-900">
                  View All Gallery
                </Link>
                {/* <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Resources
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link> */}
              </nav>
            </div>



            {/* <div>
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
            </div> */}


          </div>
        </div>
      </header>

      {/* Hero Section */}

      <HeroSection />
      {/* <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Keep Learning <br />
                <span className="relative">
                  on Track
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-green-700"></span>
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-md">
                When schools and districts have reliable access to substitute teachers that can keep the classroom
                learning experience flowing smoothly.
              </p>
              <button className="mt-8 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-md inline-flex items-center">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative">
                <Image
                  src="/img2.jpeg?height=400&width=500"
                  alt="Student with books"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
                <div className="absolute -top-6 -right-6 w-16 h-16">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-green-700">
                    <path fill="currentColor" d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
                  </svg>
                </div>
                <div className="absolute -bottom-4 -left-4">
                  <svg viewBox="0 0 100 100" className="w-12 h-12 text-teal-500">
                    <path
                      fill="currentColor"
                      d="M0,50 C0,22.4 22.4,0 50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Sub and Find Sub Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                An Easier Way to be <br />
                Sub and Find Sub
              </h2>
              <div className="mt-4 text-lg text-gray-600 max-w-md">
                When schools and districts have reliable access to substitute teachers that can keep the classroom
                learning stays on track.
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <svg className="absolute -top-10 -left-10 w-20 h-20 text-teal-500 opacity-50" viewBox="0 0 100 100">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  d="M10,50 C10,10 90,10 90,50 C90,90 10,90 10,50 Z"
                />
              </svg>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 relative">
              <div className="flex items-start">
                <div className="mr-4 bg-teal-100 p-3 rounded-full">
                  <Globe className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Teacher absences <span className="text-orange-600">disrupt</span> student learning
                  </h3>
                  <p className="mt-2 text-gray-600">When schools and districts have reliable access to teacher</p>
                </div>
              </div>
              <svg className="absolute bottom-0 left-0 w-16 h-16 text-teal-500 opacity-30" viewBox="0 0 100 100">
                <path fill="none" stroke="currentColor" strokeWidth="4" d="M10,90 C10,50 50,10 90,10" />
              </svg>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 relative">
              <div className="flex items-start">
                <div className="mr-4 bg-teal-100 p-3 rounded-full">
                  <Target className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Student learning <span className="text-orange-600">stays</span> on track to meet target
                  </h3>
                  <p className="mt-2 text-gray-600">When schools and districts have reliable access to teacher</p>
                </div>
              </div>
              <svg className="absolute top-0 right-0 w-12 h-12 text-orange-600 opacity-30" viewBox="0 0 100 100">
                <path fill="currentColor" d="M50,0 L100,50 L50,100 L0,50 Z" />
              </svg>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-start">
                <div className="mr-4 bg-yellow-100 p-3 rounded-full">
                  <Connection className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    A better way to <span className="text-orange-600">connect</span> subs and schools
                  </h3>
                  <p className="mt-2 text-gray-600">When schools and districts have reliable access to teacher</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-start">
                <div className="mr-4 bg-yellow-100 p-3 rounded-full">
                  <ArrowUpRight className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Reliable access to teacher</h3>
                  <p className="mt-2 text-gray-600">When schools and districts have reliable access to teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
                Why Choose Our Services?
                <svg className="ml-2 w-6 h-6 text-orange-600" viewBox="0 0 100 100">
                  <path fill="currentColor" d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
                </svg>
              </h2>
              <p className="mt-4 text-lg text-gray-600 lg:w-[600]">
              At Ankuram, we nurture young minds in a joyful, safe, and stimulating environment where learning feels like play. Our engaging curriculum fosters curiosity, creativity, and confidence, helping children develop essential skills for life. With experienced educators, hands-on activities, and a focus on holistic growth, we create a strong foundation for a lifelong love of learning.
              </p>
            </div>
            <div className="md:w-1/2 relative" style={{display : "flex" , justifyContent : "center" , alignItems : "center"}}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#327B74] p-6 rounded-lg col-span-2 md:col-span-1">
                  <Image
                    src="/img6.jpeg?height=300&width=300"
                    alt="Student with globe"
                    width={300}
                    height={300}
                    className="rounded-lg mx-auto"
                  />
                </div>
                <div className="space-y-4 col-span-2 md:col-span-1" style={{marginTop : "20px"}}>
                  <div className="bg-orange-400 p-6 rounded-lg text-white text-center">
                    <div className="text-4xl font-bold">500+</div>
                    <div className="text-sm">Happy Students</div>
                    <div className="text-xs">Since 2022</div>
                  </div>
                  <div className="bg-orange-500 p-6 rounded-lg text-white text-center">
                    <div className="text-4xl font-bold">10+</div>
                    <div className="text-sm">Working Professionals</div>
                    <div className="text-xs">Working With Us</div>
                  </div>
                  <div className="bg-orange-600 p-6 rounded-lg text-white text-center">
                    <div className="text-4xl font-bold">No. 1</div>
                    <div className="text-sm">Districts</div>
                    <div className="text-xs">Nationwide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            What Our Lovely <br />
            Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mansi Sharma Mini",
                // role: "Sub Teacher in Texas",
                image: "/Avatars/img1.png?height=80&width=80",
                quote:
                  "Impressed by this play school, it is one of a kind in Muradnagar. They use fun activities and unique teaching methods to make children mentally and physically active.",
              },
              {
                name: "Vivek Sagar",
                // role: "Principal",
                image: "/Avatars/img2.png?height=80&width=80",
                quote:
                  "Ankuram Pre-School is one of the best preschool with good infrastructure and overall development of students. Teachers are doing excellent work in academics as well as extra curricular activities.",
              },
              {
                name: "Ankit Tyagi",
                // role: "Sub Teacher in Illinois",
                image: "/Avatars/img3.png?height=80&width=80",
                quote:
                  "One of the best preschool in the locality. Staff is well qualified and professional.My kid learned a lot here. I will surely recommend this school.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-orange-600 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Useful Content For <br />
              Your Check
            </h2>
            <div className="mt-4 md:mt-0">
              <svg className="w-10 h-10 text-teal-500" viewBox="0 0 100 100">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  d="M10,50 C10,10 90,10 90,50 C90,90 10,90 10,50 Z"
                />
              </svg>
            </div>
          </div>



          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {albums.length > 0 ? (
                  [...albums]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((article, index) => (
                      <div
                        key={index}
                        className="min-w-[300px] md:min-w-[350px] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-sm"
                      >
                        <Image
                          src={article.Coverpic || "/placeholder.svg"}
                          alt={article.AlbumName}
                          width={350}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">{article.AlbumName}</h3>
                          <Link
                            to={`/viewparticulargallery/${article._id}`}
                            className="text-orange-600 inline-flex items-center text-sm"
                          >
                            View More
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="p-4">Loading albums...</p>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            {/* <button
              variant="outline"
              size="icon"
              className={`absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm ${!canScrollPrev ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <FaArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </button>

            <button
              variant="outline"
              size="icon"
              className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm ${!canScrollNext ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <FaArrowRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </button> */}
          </div>




        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-[#327B74] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get in Touch</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Join our loving kindergarten community!</h3>
            <p className="text-white text-lg mb-8">
            Looking to inspire young minds? Ankuram is now welcoming passionate educators in the greater Chicago area! Teaching little learners is a joyful and fulfilling experience for caregivers, educators, and creatives.
            </p>
            {/* <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-md inline-flex items-center">
              Contact Us Now
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </button> */}
          </div>
        </div>
        <svg className="absolute bottom-0 right-0 w-32 h-32 text-orange-600 opacity-80" viewBox="0 0 100 100">
          <path fill="currentColor" d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
        </svg>
        <svg className="absolute top-0 left-0 w-24 h-24 text-green-700 opacity-30" viewBox="0 0 100 100">
          <path fill="none" stroke="currentColor" strokeWidth="4" d="M10,50 C10,10 90,10 90,50 C90,90 10,90 10,50 Z" />
        </svg>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center">
                <span className="text-orange-600 font-bold text-xl">Sub</span>
                <span className="text-gray-800 font-bold text-xl">Learn</span>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Find Sub
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                For Schools
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Resources
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                About Us
              </Link>
            </div>
            <div className="flex space-x-4">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md text-sm">
                Contact Us
              </button>
            </div>
          </div> */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© Copyright Ankuram 2025. All Rights Reserved.</p>
            <div className="flex space-x-4">
              {/* <Link href="#" className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.839c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </Link> */}
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

