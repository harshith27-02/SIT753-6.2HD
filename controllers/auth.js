const Users = require('../models/userProfile');
const ErrResponse =require('../common/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

exports.registerUser = asyncHandler(async (req, res, next) => {
    const {userName, mobile, role, password, isActive } = req.body
    const user = await Users.create({
        userName, 
        mobile, 
        role, 
        password, 
        isActive 
    });
    
    const token = user.getJWTToken();

    res.status(200).json({success: true, token: token })
})

exports.login = asyncHandler(async (req, res, next) => {
    const {mobile, password} = req.body
    if(!mobile || !password) {
        return next(new ErrResponse(`Please provide mobile and password`, 400))
    }

    const user = await Users.findOne({mobile: mobile})
    if( !user) {
        return next(new ErrResponse( `Invalid mobile number`,401))
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch) {
        return next(new ErrResponse(`Invaild Password`,401))
    }

    const token = user.getJWTToken()
    res.status(200).json({
        success: true,
        message: `User Logged in successfully`, 
        token: token
    })
})