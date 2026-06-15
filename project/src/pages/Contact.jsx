export default function Contact() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#faf7f4",
        padding: "80px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          background: "#fff",
          padding: "50px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            color: "#7A0016",
            fontSize: "42px",
            fontFamily: "Playfair Display, serif",
            marginBottom: "20px",
          }}
        >
          Cherry Side 🍒
        </h1>

        <p
          style={{
            color: "#555",
            lineHeight: "1.8",
            fontSize: "16px",
            marginBottom: "35px",
          }}
        >
          At Cherry Side, we believe every gift should feel special and
          personal. We create beautifully curated gift hampers, handmade
          keepsakes, premium gift boxes, custom ribbons, scrunchies, and
          thoughtful gifting experiences for your loved ones.
        </p>

        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ color: "#7A0016", marginBottom: "8px" }}>Email</h3>
          <p style={{ color: "#444" }}>
            hello@cherryside.in
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ color: "#7A0016", marginBottom: "8px" }}>Phone</h3>
          <p style={{ color: "#444" }}>
            +91 9876543210
          </p>
        </div>

        <div>
          <h3 style={{ color: "#7A0016", marginBottom: "8px" }}>Instagram</h3>

          <a
            href="https://instagram.com/cherryside"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#7A0016",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            @cherryside
          </a>
        </div>
      </div>
    </div>
  );
}