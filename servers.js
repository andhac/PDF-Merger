const express =require ('express')
const app = express();
const path = require('path')
const multer = require('multer')
const upload =multer({dest:'uploads/'})
const {mergePDF} = require("./merge")
app.use('/static',express.static('public'))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./template/index.html"));
})
app.post('/merge',upload.array('pdfs',3), async (req,res,next)=>{
    let files = req.files.map(file => path.join(__dirname,file.path))
    const pages1 = req.body.pages1 ? req.body.pages1.split(",").map(Number) : [];
    const pages2 = req.body.pages2 ? req.body.pages2.split(",").map(Number) : [];
    try{
        let d;
        d =await mergePDF(files,pages1,pages2)
        res.redirect(`http://localhost:3000/static/${d}.pdf`)
    }catch (err){
        next(err)
    }
})
app.listen(3000,()=>{
    console.log('server is running')
})