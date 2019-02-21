const {mongoose,conn}=require('../services/mongoose');
const Schema=mongoose.Schema;

let signupSchema = new Schema({
	emailId:{type:String,index:{unique:true},max:40},
	mobile_number:{type:String,required:true,max:15},
	password:{type:String,required:true},
	fullName:{type:String,max:30},
	gender:{type:String,max:12},
	date_of_birth:{type:Date},
	 device_token: {
        type: String
    },
    device_type: {
        type: Number
    },
    created_on: {
        type: Date
    },
    timeStamp: {
        type: String
    },
    is_mobile_verify: {
        type: Number,
        default : 0 // 0 = unverified 1 = verified
    },
    is_email_verify: {
        type: Number,
        default : 0 // 0 = unverified 1 = verified
    },
    is_deleted: {
        type: Number,
        default : 0 // 0 = not deleted 1 = deleted
    },
    is_blocked : {
        type: Number,
        default : 0 // 0 = unblock  1 = block 
    },
    modified_on: {
        type: Date
    },
    is_active: {
        type: Number,
        default : 0 // 0 = not active 1 = active
    },
    user_id: {
        type: String
    },
    access_token: {
        type: String
    },
    verification_code: {
        type: String
    },
    profile_image: {
        type: String,
        default : null 
    },
    location: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    is_profile_create: {
        type: Number,
        default : 0 //  0 = not crated 1 = created
    },
    notification_status: {
        type: Number,
        default: 1
    },
   
    social_type: {
        type: String
    },
    gl_social_id: {
        type: String
    },
    fb_social_id: {
        type: String
    },
}, {
    strict: true,
    collection: 'User',
    versionKey: false
});
	

//Export the module
exports.UserSchema = signupSchema;
exports.UserModel = conn.model('Signup',signupSchema);



