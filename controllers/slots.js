const Slots = require('../models/slots')
const ErrResponse = require('../common/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')

exports.getSlots = asyncHandler(async (req, res, next) => {
   
        const slots = await Slots.find();
        res.status(200).json({ success: true, data: slots })

});

exports.createSlot = asyncHandler(async (req, res, next) => {
    try {
        const slot = await Slots.create(req.body);
        res.status(201).json({
            success: true,
            data: slot
        });
    } catch (error) {
        console.error('Error creating slot:', error);  // Log the error
        return next(new ErrResponse('Error creating slot', 500));
    }
});


exports.getSingleSlot = asyncHandler(async (req, res, next) => {
    
        const slot = await Slots.find({ _id: req.params.id })
        if (slot.length === 0) {
            return next(new ErrResponse(`Slot Not Found For ID ${req.params.id}`,400 ))
        }
        res.status(200).json({ success: true, data: slot })
})

exports.updateSlot = asyncHandler(async (req, res, next) => {
   
        let updatedSlot = await Slots.find({ _id: req.params.id })
        if (updatedSlot.length === 0) {
            return next(new ErrResponse(`Slot Not Found For ID ${req.params.id}`,400 ))
        }
        updatedSlot = await Slots.findByIdAndUpdate(req.params.id,
            req.body, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({ success: true, data: updatedSlot })

});

exports.deleteSlot = asyncHandler(async (req, res, next) => {
        let slot = await Slots.find({ _id: req.params.id })
        if (slot.length === 0) {
            return next(new ErrResponse(`Slot Not Found For ID ${req.params.id}`,400 ))
        }
        slot = await Slots.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, data: slot })

});
// function deleteSlot(slotId) {
//     // Implement the logic to delete the slot here
//     console.log('Deleting slot with ID:', slotId);
//     // Example: Send a DELETE request to the backend API
//     axios.delete(`http://localhost:3000/PMS/v1/slots/${slotId}`)
//         .then(response => {
//             console.log('Slot deleted successfully:', response.data);
//             // Fetch updated slot data after deletion
//             fetchParkingSlots();
//         })
//         .catch(error => {
//             console.error('Error deleting parking slot:', error);
//         });
//   }

exports.getFloor = asyncHandler(async (req, res, next) => {
  
        const floors = await Slots.distinct('floorName', {
            isActive: req.params.active
        })
        if (floors.length === 0) {
            return next(new ErrResponse(`Floor not Found`,400 ))

        }
        res.status(200).json({ success: true, data: floors })
});

exports.getWingsByFloor = asyncHandler(async (req, res, next) => {
        const wings = await Slots.distinct('wingName', {
            floorName: req.params.floor
        })
        if (wings.length === 0) {
            return next(new ErrResponse(`Wing Not Found For ID ${req.params.floor}`,400 ))
        }
        res.status(200).json({ success: true, data: wings })

});

exports.getslotsBywing = asyncHandler(async (req, res, next) => {
        const slot = await Slots.find({
            floorName: req.params.floor,
            wingName: req.params.wing
        }).select({
            'slots.slotName': 1,
            'slots._id': 1,
            'slots.capacity': 1,
            'slots.vehicleType': 1,
            'slots.isAvailable': 1,
            wingName: 1,
            _id: 1
        })
        if (slot.length === 0) {
            return next(new ErrResponse(`Slots Not Found For ${req.params.floor} and  ${req.params.wing}`,400 ))
        }
        res.status(200).json({ success: true, data: slot })
});

exports.getslotsById = asyncHandler(async (req, res, next) => {
        const slot = await Slots.find({
            'slots._id': req.params.id
        }, {
            'slots.$': 1
        }).select({
            floorName: 1,
            wingName: 1,
            isFullyOccupied: 1,
            isActive: 1
        }) 
        if (slot.length === 0) {
            return next(new ErrResponse(`Slots Not Found For ID ${req.params.id}`,400 ))

    }
    res.status(200).json({ success: true, data: slot })
});

exports.updateSlotById = asyncHandler(async (req, res, next) => {
   
    let { capacity, slotName,vehicleType,isAvailable} = req.body;
        const slot = await Slots.updateOne({
            'slots._id': req.params.id
        }, {
            $set: {
                "slots.$.capacity": capacity,
                "slots.$.slotName": slotName,
                'slots.$.vehicleType': vehicleType,
                'slots.$.isAvailable': isAvailable
            
            }
        })
        res.status(200).json({ success: true, data: slot })

});

exports.updateSlots = asyncHandler(async (req, res, next) => {

        const floor = req.params.floor
        let wing = req.params.wing
        let findwing = await Slots.find({
            floorName: floor,
            wingName: wing
        }).select({
            _id: 1
        })
       if (findwing.length === 0) {
            return next(new ErrResponse(`Id does not exist for ${floor} and ${wing}`,400 ))
        }
        findwing = findwing.map((floor) => floor._id)
        const slot = await Slots.findByIdAndUpdate({
            _id: findwing},
            {$push: { slots: {$each: req.body} } },
            {
                new: true,
                upsert: true
            }
        )
        res.status(200).json({ success: true, data: slot })
   
});

exports.deleteSlotById = asyncHandler(async (req, res, next) => {
  
        const slot = await Slots.updateOne(
            { _id: req.params.floorId},
            {$pull :{slots:{_id: req.params.slotId}}}
        )
        res.status(200).json({ success: true, data: slot })
});