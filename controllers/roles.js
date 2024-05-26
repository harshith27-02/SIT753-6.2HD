const Roles = require('../models/roles');
const ErrResponse =require('../common/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

exports.getRoles = asyncHandler(async (req, res, next) => {
   
    const roles = await Roles.find();
    res.status(200).json({ success: true, data: roles })

});

exports.createRole = asyncHandler(async (req, res, next) => {
    const role = await Roles.create(req.body);
    res.status(201).json({
        success: true,
        data: role
    })
})

exports.getSingleRole = asyncHandler(async (req, res, next) => {

    const role = await Roles.find({ _id: req.params.id })
    if (role.length === 0) {
        return next(new ErrResponse(`Role Not Found For ID ${req.params.id}`,400 ))
    }
    res.status(200).json({ success: true, data: role })
})

exports.updateRole = asyncHandler(async (req, res, next) => {

    let updatedRole = await Roles.find({ _id: req.params.id })
    if (updatedRole.length === 0) {
        return next(new ErrResponse(`Role Not Found For ID ${req.params.id}`,400 ))
    }
    updatedRole = await Roles.findByIdAndUpdate(req.params.id,
        req.body, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({ success: true, data: updatedRole })

});

exports.deleteRole = asyncHandler(async (req, res, next) => {
    let role = await Roles.find({ _id: req.params.id })
    if (role.length === 0) {
        return next(new ErrResponse(`Role Not Found For ID ${req.params.id}`,400 ))
    }
    role = await Roles.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: role })

});