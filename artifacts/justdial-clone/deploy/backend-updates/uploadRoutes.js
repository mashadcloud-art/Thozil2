const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");

// GET: Render a beautiful upload form for easy browser testing
router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Thozil Image Uploader</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .card {
            background: white;
            padding: 2.5rem;
            border-radius: 1.5rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            border: 1px solid #f1f5f9;
            text-align: center;
            width: 100%;
            max-width: 400px;
          }
          h2 {
            color: #1e293b;
            margin-bottom: 0.5rem;
            font-weight: 800;
          }
          p {
            color: #64748b;
            font-size: 0.875rem;
            margin-bottom: 2rem;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          input[type="file"] {
            border: 2px dashed #cbd5e1;
            padding: 1.5rem;
            border-radius: 1rem;
            width: 100%;
            box-sizing: border-box;
            background: #f8fafc;
            cursor: pointer;
            transition: border-color 0.2s;
          }
          input[type="file"]:hover {
            border-color: #ff6b00;
          }
          button {
            background: #ff6b00;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            font-weight: 700;
            font-size: 0.875rem;
            cursor: pointer;
            width: 100%;
            transition: background 0.2s, transform 0.1s;
          }
          button:hover {
            background: #e66000;
          }
          button:active {
            transform: scale(0.98);
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Cloudinary Uploader</h2>
          <p>Choose an image file to upload directly to Cloudinary CDN</p>
          <form action="/api/admin/upload" method="POST" enctype="multipart/form-data">
            <div class="form-group">
              <input type="file" name="image" required accept="image/*" />
            </div>
            <button type="submit">Upload Image</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

// POST: Handle upload processing
router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      url: req.file.path
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
