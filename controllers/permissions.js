const Permissions = require('../models/permissions');
const ErrResponse =require('../common/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

exports.getPermissions = asyncHandler(async (req, res, next) => {
   
    const permission = await Permissions.find();
    res.status(200).json({ success: true, data: permission })

});

exports.createPermission = asyncHandler(async (req, res, next) => {
    const permission = await Permissions.create(req.body);
    res.status(201).json({
        success: true,
        data: permission
    })
})

exports.getSinglePermission = asyncHandler(async (req, res, next) => {

    const permission = await Permissions.find({ _id: req.params.id })
    if (permission.length === 0) {
        return next(new ErrResponse(`Permission Not Found For ID ${req.params.id}`,400 ))
    }
    res.status(200).json({ success: true, data: permission })
})

exports.updatePermission = asyncHandler(async (req, res, next) => {

    let updatedPermssion = await Permissions.find({ _id: req.params.id })
    if (updatedPermssion.length === 0) {
        return next(new ErrResponse(`Permission Not Found For ID ${req.params.id}`,400 ))
    }
    updatedPermssion = await Permissions.findByIdAndUpdate(req.params.id,
        req.body, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({ success: true, data: updatedPermssion })

});

exports.deletePermission = asyncHandler(async (req, res, next) => {
    let permission = await Permissions.find({ _id: req.params.id })
    if (permission.length === 0) {
        return next(new ErrResponse(`Permission Not Found For ID ${req.params.id}`,400 ))
    }
    permission = await Permissions.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: permission })

});