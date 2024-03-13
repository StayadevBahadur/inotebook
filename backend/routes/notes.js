const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const fetchUser = require('../middleware/fethUser');
// if your importing a modal you have to write the Modal name as it is as the file name of the modal and the modal file name should always start with Cammel case 
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1:Get loggeding user notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        res.status(400).send({ error: "Internal server error" })
    }
})
// Route 2:add a new note using POST loginn require 
router.post('/addnotes', fetchUser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Descriptions must be atleast 5 chracters').isLength({ min: 5 }),
],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })

            const savevNote = await note.save();
            res.json(savevNote)
        } catch (error) {
            console.error(error)
            res.status(400).send({ error: "Internal server error for adding notes" })
        }

    })
// Route 3:for updating an existing note

//  <--    One way of doing     -->

// router.put('/updatenotes/:id', fetchUser, [
//     body('title', 'Enter a valid Title').isLength({ min: 3 }),
//     body('description', 'Descriptions must be at least 5 characters').isLength({ min: 5 }),
// ], async (req, res) => {
//     try {
//         const { title, description, tag } = req.body;
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const noteId = req.params.id;
//         if (!mongoose.Types.ObjectId.isValid(noteId)) {
//             return res.status(400).json({ error: 'Invalid note ID' });
//         }

//         const updatedNote = await Notes.findOneAndUpdate(
//             { _id: noteId, user: req.user.id },
//             { title, description, tag },
//             { new: true }
//         );

//         if (!updatedNote) {
//             return res.status(404).json({ error: 'Note not found' });
//         }

//         res.json(updatedNote);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: 'Internal server error for updating notes' });
//     }
// });

//  <--    Onther  way of doing     -->


router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    try {
        const newNote = {};
    const { title ,description,tag } = req.body;
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }

    // find the note to be updated and update it
    
    let noteToBeUpdated = await Notes.findById(req.params.id);
    console.log(req.params.id)
    console.log(noteToBeUpdated)
    if(!noteToBeUpdated){
       return res.status(404).send("Note not fund");
    }
    // check the user is trying to update the note is same as user that is inside the 
   
    if(noteToBeUpdated.user.toString()!== req.user.id){
        return res.status(401).send("Unauthorised persen")
    }
    // now update the note
    noteToBeUpdated = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({noteToBeUpdated})
    } catch (error) {
        res.send("Internal server error")
    }
    
})
// Route 4:For deleting the notes
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    try {
        const noteId = req.params.id;
        
        // Check if the provided note ID is valid
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ error: 'Invalid note ID' });
        }

        // Find the note to be deleted
        const noteToDelete = await Notes.findById(noteId);
        
        // Check if the note exists
        if (!noteToDelete) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Check if the user is authorized to delete the note
        if (noteToDelete.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Delete the note
        await Notes.findByIdAndDelete(noteId);

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router