const express=require("express");
const router = express.Router();
const form=require("../models/formSchema");

const multer=require('multer');
filename='';
const mystorage=multer.diskStorage({
    destination:'./upload',
    filename:(req,file,redirect)=>{
        let date=Date.now();
        let fl=date+'.'+file.mimetype.split('/')[1];
        redirect(null,fl);
        filename=fl;
    }
})
const upload=multer({storage:mystorage})


//send data post method
router.post("/addform", upload.single('image'), async (req, res) => {
    const { namef, datedebut, datefin, professeurname } = req.body;

    try {
        const preform = await form.findOne({ professeurname: professeurname });
        
        let image = req.file ? req.file.filename : ''; 
        
        if (preform) {
            return res.status(422).json("This student already Present");
        } else {
            const addform = new form({ namef, datedebut, datefin, professeurname, image });
            await addform.save();
            return res.status(201).json(addform);
        }
    } catch (err) {
        return res.status(422).json(err);
    }
});

//get form Data
router.get("/getform", async(req,res)=>{
    try{
        const formdata= await form.find();
        res.status(201).json(formdata);
    }catch(err){
        res.status(422).json(err)
    }
})

//get signle student Data
router.get("/getform/:id", async(req,res)=>{
    try{
       const {id}=req.params;
       const singleform=await form.findById({_id:id});
       res.status(201).json(singleform);
    }catch(err){
        res.status(422).json(err);
    }
})


//Delete student Data
router.delete("/deleteform/:id", async(req,res)=>{
    try{
       const {id} = req.params;
       const delteform=await form.findByIdAndDelete({_id:id});
       res.status(201).json(delteform);
    }catch(err){
        res.status(422).json(err);
    }
})

// update student data
router.patch("/updateform/:id", upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = req.body;

        
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedForm = await form.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json(updatedForm);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports=router;