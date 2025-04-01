# 📸 JustImagine (An AI-Powered Image Editor)

An AI-powered image editor built with **Tauri** that allows users to upload an image and edit it based on a user prompt using the **Google Gemini Multimodal API**.

---

## 🚀 Features
- 📂 **Upload an Image** – Select an image from your local system.
- 🎨 **Edit with AI** – Provide a text prompt to modify the image.
- 🤖 **Google Gemini Integration** – Uses Gemini's multimodal AI capabilities for intelligent image modifications.
- 📥 **Download Edited Image** – Save the final edited image locally.
- 🔥 **Lightweight & Fast** – Built with Rust + Tauri for efficiency.

---

## 🛠️ Installation & Setup

### **Prerequisites**
Ensure you have the following installed:
- **Rust** (with `cargo` and `rustup`)
- **Node.js (v18.19.0 or later) & yarn**
- **Google Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/apikey))

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Harry-027/JustImagine.git
cd tauri-gemini-image-editor
```

### **2️⃣ Install Dependencies**
```sh
make build_frontend
make build_backend
```

### **3️⃣ Run the App in Development Mode**
```sh
make dev_mode
```

---

## 📦 Build for Production
To build a production-ready package:
```sh
make desktop_app
```
The built app will be available in the `src-tauri/target/release/` folder.

---

## 🎨 Usage Guide
1. **Upload an Image** – Click the upload button and select an image.
2. **Enter a Prompt** – Describe how you want the image to be edited (e.g., "Make it black and white").
3. **Process the Image** – Click the "Edit" button to apply AI-powered modifications.
4. **Download the Edited Image** – Save the result locally.

---

## 🛠️ Technologies Used
- **Tauri** – Lightweight cross-platform desktop framework
- **Rust** – Backend performance and efficiency
- **React** – Frontend UI
- **Google Gemini API** – AI-powered image editing

---

## 📝 License
This project is licensed under the **MIT License**.

---

## 🤝 Contributing
Feel free to contribute by submitting issues or pull requests!

---

## 📬 Contact
For questions or support, reach out via [GitHub Issues](https://github.com/Harry-027/JustImagine/issues).

Happy coding! 🚀

