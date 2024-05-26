// // const express = require('express');
// // const router = express.Router();
// // const Slot = require('../models/slot');

// // // Create a new slot
// // router.post('/', async (req, res) => {
// //     try {
// //         const newSlot = new Slot(req.body);
// //         const savedSlot = await newSlot.save();
// //         res.status(201).json(savedSlot);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(400).json({ error: 'Failed to add slot' });
// //     }
// // });

// // // Get all slots
// // router.get('/', async (req, res) => {
// //     try {
// //         const slots = await Slot.find();
// //         res.status(200).json(slots);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ error: 'Failed to fetch slots' });
// //     }
// // });

// // // Update a slot by ID
// // router.put('/:id', async (req, res) => {
// //     try {
// //         const updatedSlot = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //         if (!updatedSlot) {
// //             return res.status(404).json({ error: 'Slot not found' });
// //         }
// //         res.status(200).json(updatedSlot);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(400).json({ error: 'Failed to update slot' });
// //     }
// // });

// // // Delete a slot by ID
// // router.delete('/:id', async (req, res) => {
// //     try {
// //         const deletedSlot = await Slot.findByIdAndDelete(req.params.id);
// //         if (!deletedSlot) {
// //             return res.status(404).json({ error: 'Slot not found' });
// //         }
// //         res.status(200).json({ message: 'Slot deleted successfully' });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ error: 'Failed to delete slot' });
// //     }
// // });

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const Slot = require('../models/slots');

// // Route to get all parking slots
// router.get('/', async (req, res) => {
//     try {
//         const slots = await Slot.find();
//         res.json(slots);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Route to add a new parking slot
// router.post('/', async (req, res) => {
//     const { floorName, wingName, slotName, category, capacity } = req.body;

//     try {
//         const newSlot = new Slot({
//             floorName,
//             wingName,
//             slotName,
//             category,
//             capacity
//         });

//         const slot = await newSlot.save();
//         res.status(201).json(slot);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Route to update a parking slot
// router.put('/:id', async (req, res) => {
//     const { floorName, wingName, slotName, category, capacity } = req.body;

//     try {
//         let slot = await Slot.findById(req.params.id);

//         if (!slot) {
//             return res.status(404).json({ msg: 'Slot not found' });
//         }

//         slot.floorName = floorName;
//         slot.wingName = wingName;
//         slot.slotName = slotName;
//         slot.category = category;
//         slot.capacity = capacity;

//         await slot.save();

//         res.json({ msg: 'Slot updated successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Route to delete a parking slot
// router.delete('/:id', async (req, res) => {
//     try {
//         let slot = await Slot.findById(req.params.id);

//         if (!slot) {
//             return res.status(404).json({ msg: 'Slot not found' });
//         }

//         await Slot.findByIdAndRemove(req.params.id);

//         res.json({ msg: 'Slot removed successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;
const express = require("express");
const router = express.Router()

const { 
    getSlots, 
    getSingleSlot, 
    createSlot, 
    updateSlot, 
    deleteSlot,
    getFloor,
    getWingsByFloor,
    getslotsBywing,
    updateSlots,
    getslotsById,
    updateSlotById,
    deleteSlotById
} = require("../controllers/slots");

router.route("/").get(getSlots).post(createSlot);
router.route("/:id").get(getSingleSlot).put(updateSlot).delete(deleteSlot)
router.route("/:active/floors").get(getFloor)
router.route("/:floor/wings").get(getWingsByFloor)
router.route("/:floor/:wing").get(getslotsBywing).put(updateSlots)
router.route("/floor/slot/:id").get(getslotsById).put(updateSlotById)
router.route("/slot/:floorId/:slotId").delete(deleteSlotById)
module.exports = router;