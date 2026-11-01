import { useState, useEffect } from "react";

const IMAGES = [
  { id: 1, url: "https://picsum.photos/id/10/800/600", title: "Forest Lake" },
  { id: 2, url: "https://picsum.photos/id/11/800/600", title: "Mountain Peak" },
  { id: 3, url: "https://picsum.photos/id/12/800/600", title: "Beach Sunset" },
  { id: 4, url: "https://picsum.photos/id/13/800/600", title: "Waterfall" },
  { id: 5, url: "https://picsum.photos/id/14/800/600", title: "Ocean Shore" }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard Event Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
      } else if (e.key === " ") {
        e.preventDefault(); // Space bar toggles fullscreen
        setIsFullscreen((prev) => !prev);
      } else if (e.key === "Escape") {
        e.preventDefault(); // Escape closes fullscreen
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentImage = IMAGES[currentIndex];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h2>Keyboard Image Gallery</h2>
      <p style={{ color: "#666" }}>
        <strong>Controls:</strong> Arrow keys (← / →) | Space (Toggle Fullscreen) | Esc (Close Fullscreen)
      </p>

      {/* Main Preview (Click to toggle fullscreen) */}
      <div 
        onClick={() => setIsFullscreen(true)}
        style={{ cursor: "pointer", display: "inline-block", margin: "20px 0" }}
      >
        <img
          src={currentImage.url}
          alt={currentImage.title}
          style={{
            width: "600px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
          }}
        />
        <h3>{currentImage.title}</h3>
      </div>

      {/* Thumbnails (Click to Select Image) */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {IMAGES.map((img, index) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.title}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "100px",
              height: "70px",
              objectFit: "cover",
              borderRadius: "6px",
              cursor: "pointer",
              border: index === currentIndex ? "4px solid #007bff" : "2px solid transparent",
              opacity: index === currentIndex ? 1 : 0.6
            }}
          />
        ))}
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <img
            src={currentImage.url}
            alt={currentImage.title}
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain" }}
          />
          <p style={{ color: "#fff", marginTop: "15px" }}>
            {currentImage.title} — Press <strong>ESC</strong> or <strong>Space</strong> to exit
          </p>
        </div>
      )}
    </div>
  );
}

