const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/posts");
const categoryRoute=require("./routes/categories");
const multer=require("multer");
const cors = require("cors");

const path=require("path");

dotenv.config();
app.use(cors());
app.use(express.json());




// Serve static files from the 'images' directory
app.use("/images", express.static(path.join(__dirname, "images")));

// Handle direct requests for images
app.get("/images/:imageName", (req, res) => {
    const imagePath = path.join(__dirname, "images", req.params.imageName);
    console.log(`Requested image: ${imagePath}`);
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error(`Failed to send image: ${err}`);
            res.status(err.status || 500).end();
        }
    });
});






mongoose.connect(process.env.MONGO_URL,{
 
  
})
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

  //take file and save
  const storage=multer.diskStorage({

    destination:(req,file,cb)=>{
      cb(null,"images")
    },filename:(req,file,cb)=>{
      cb(null,req.body.name);
    }
  });

  const upload=multer({storage:storage});
  app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been Uploaded..");
  })

   app.use("/api/auth",authRoute);
   app.use("/api/users",userRoute);
   app.use("/api/posts",postRoute);
   app.use("/api/categories",categoryRoute);



app.listen(5000, () => {
  console.log("Backend is running...");
});
