const  Document = require('../models/documents');
const cloudinary = require('cloudinary').v2;
const User= require('../models/user')    
cloudinary.config({ 
  cloud_name: 'dzq1h0xyu', 
  api_key: '345126432123499', 
  api_secret: 'cqCvcU_hqshoESszVszEnB5-D_8' ,
  resource_type: 'auto' 
});

exports.createDocument = async (req, res) => {
  try {
    const { userId, doc_name, description, document } = req.body;

    // Assuming you have a 'userId' field in the request body to specify the user ID
    if (!userId) {
      return res.status(400).json({ error: "User ID not provided" });
    }

    // Check if the user with the provided ID exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload the document to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
    });
   

    // Create a new Document with the user reference
    const doc = new Document({
      doc_name,
      description,
      document: result.secure_url,
      user: user._id,
    });

    // Save the document
    await doc.save();

    // Return both the user ID and the document record in the response
    res.status(201).json({
      userId: user._id,
      document: doc.toJSON(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get All Documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json({ documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Documents by User ID
exports.getUserDocuments = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const documents = await Document.find({ user: user._id });

    res.status(200).json({ documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Document by ID
// exports.deleteDocument = async (req, res) => {
//   try {
//     const { docId } = req.params;

//     const document = await Document.findById(docId);

//     if (!document) {
//       return res.status(404).json({ error: "Document not found" });
//     }

//     // Optionally, you may want to check permissions here (e.g., if the user owns the document)

//     // Delete the document
//     await document.remove();

//     res.status(200).json({ message: "Document deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.deleteDocument = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete all documents associated with the user
    await Document.deleteMany({ user: user._id });

    res.status(200).json({ message: "User documents deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//search documents

exports.searchQcument= async(req,res)=>{
  
}
exports.updateDocument = async (req, res) => {
  try {
    const { userId, docId, doc_name, description } = req.body;

    // Assuming you have a 'userId' field in the request body to specify the user ID
    if (!userId) {
      return res.status(400).json({ error: "User ID not provided" });
    }

    // Check if the user with the provided ID exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the document with the provided ID exists
    const doc = await Document.find();


    // Update document fields
    doc.doc_name = doc_name || doc.doc_name;
    doc.description = description || doc.description;

    // Save the updated document
    await doc.save();

    // Return both the user ID and the updated document record in the response
    res.status(200).json({
      userId: user._id,
      document: doc.toJSON(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};