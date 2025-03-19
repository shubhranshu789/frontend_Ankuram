"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home1 from "./Components/HomePage/Home1";
import ViewParticularGallery from "../app/Components/Gallery/ViewParticularGallery";
import AlbumUpload from "./Components/Gallery/AlbumUpload";
import Update from "./Components/Gallery/Update";
import ViewAllAlbums from "./Components/Gallery/ViewAllAlbums";

export default function HomeWithRouter() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/viewparticulargallery/:albumid" element={<ViewParticularGallery />} />
          <Route exact path="/gallery" element={<AlbumUpload />} />
          <Route exact path="/viewallalbumns" element={<ViewAllAlbums />} />
          <Route path="/update/:albumid" element={<Update />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
