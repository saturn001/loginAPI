//var app=require('express')();
//var socialLogin=require('social-login');


var { UserModel }=require('../models/app_model.js');
const Joi=require('joi');
const md5=require('md5');
const status=require('../modules/status.js')


exports.test=function(req,res){
	res.send(' test working!');
};

exports.signup_create=function(req,res){

	   let schema=Joi.object().keys(
	{
	    emailId: Joi.string().email({minDomainAtoms:2}).required(),
		password: Joi.string().required(),
		device_token: Joi.string(),
        device_type: Joi.number(),
        name : Joi.string(),
        mobile_number : Joi.string(),
        //latitude: Joi.string(),
        //longitude: Joi.string(),

	});
	console.log(req.body);
	
	const result = Joi.validate(req.body , schema, { abortEarly : true});
	if (result.error) 
	{
		if(result.error.details && result.error.details[0].message)
		{
			res.status(status.BAD_REQUEST).json({ message : result.error.details[0].message }) ;
		}
		else
		{
			res.status(status.BAD_REQUEST).json({ message : error.message  }) ;
		}
		return;
	}
	console.log(req.body);
	var {emailId,mobile_number,name,password,device_token,device_type}=req.body;
	UserModel.findOne({$or:[{'emailId':emailId},{'mobile_number':mobile_number}]})
	.then(userResult =>
	{
		console.log(userResult);
		if(userResult)
		{
			if(userResult.get('emailId')==emailId)
			{
				res.status(status.ALREADY_EXIST).json({message:'Your email is already registered with us'});
			}
			else
			{
				res.status(status.ALREADY_EXIST).json({message:'Your mobile number is already registered with us'});
			}
		}
		else 
		{
			var access_token=md5(new Date());
			var created_on = new Date().getTime();
                var modified_on = new Date().getTime();
                password = md5(password);
                var updateData = { emailId, mobile_number, name, password, device_token, created_on, modified_on, device_type, access_token};
                console.log(updateData);
                let user = new UserModel(updateData);
                user.save(updateData)
                	.then((userData) => {
                		user.save(function(err){	
                			if (err) { return (err);}
                			else {res.send(user);}
                			})
                	})
                }
            })
}

	

exports.signup_login=function(req,res)
{
	const schema = Joi.object().keys({
        emailId: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().required(),
        device_token: Joi.string(),
        device_type: Joi.number(),
     //   latitude: Joi.string(),
     //   longitude: Joi.string(),
    })
    const result = Joi.validate(req.body, schema, { abortEarly: true });
    if (result.error) 
    {
        if (result.error.details && result.error.details[0].message) 
        {
            res.status(status.BAD_REQUEST).json({ message: result.error.details[0].message });
        } else 
        {
            res.status(status.BAD_REQUEST).json({ message: result.error.message });
        }
        return;
    }
    console.log(req.body);		
    var { emailId, password, device_type, device_token } = req.body;
    console.log(req.body);
    UserModel.findOne({ emailId })
        .then(userData => {
            if (userData) {
                if (userData.get('password') == md5(password)) 
                {
                    var access_token = md5(new Date());
                    var updateData = { device_token, device_type, access_token };
                    console.log(updateData);
                    UserModel.findByIdAndUpdate(userData.get('_id'), { $set: updateData }, { new: true }, function(err, updateData)
                    {
                    	if(err){
                    		return err;
                    	}
                    	res.send("logged in Successfully");
                        
                    })
                }
           }
       })
}	
/*

exports.signup_social_login=function(req,res){
    app:app;
    url:'http://localhost:3000';
        function(req, type, uniqueProperty, accessToken, refreshToken, profile, done) {
        findOrCreate({
            profile:    profile,        
            property:   uniqueProperty, // What property in the data is unique: id, ID, name, ...
            type:       type            // What type of login that is: facebook, foursquare, google, ...
        }, function(user) {
            done(null, user);   // Return the user and continue
        });
    }
}

// Setup the various services:
signup_social_login.use({
    facebook:   {
        settings:   {
            clientID:       "YOUR_API_KEY",
            clientSecret:   "YOUR_API_SECRET",
            authParameters: {
                scope: 'read_stream,manage_pages'
            }
        },
        url:    {
            auth:       "/auth/facebook",           // The URL to use to login (<a href="/auth/facebook">Login with facebook</a>).
            callback:   "/auth/facebook/callback",  // The Oauth callback url as specified in your facebook app's settings
            success:    '/',                        // Where to redirect the user once he's logged in
            fail:       '/auth/facebook/fail'       // Where to redirect the user if the login failed or was canceled.
        }
    },
            google: {
        settings:   {}, // Google doesn't take any API key or API secret
        url:    {
            auth:       "/auth/google",
            callback:   "/auth/google/callback",
            success:    '/',
            fail:       '/auth/google/fail'
        }
    },
});

*/


exports.signup_social = function(req, res)
{
    let { emailId, fullName, social_type, profile_image, social_id, device_token, device_type} = req.body
    UserModel.findOne({$and :[
                        {$or:[{'gl_social_id': social_id},{'fb_social_id' : social_id}]},
                        {"social_type" : social_type}
                    ]})
    .then(userData => {     
        if (userData) {
                let access_token = md5(new Date());
                let updateData = { device_token, device_type, profile_image,access_token };
                UserModel.findByIdAndUpdate(userData.get('_id'), { $set: updateData }, { new: true })
                .then(userData => {
                    res.status(200).json({ message: "Login successfully.", response: userData })
                })
        } else {
            UserModel.findOne({ 'email': email })
            .then(userData => {
                        let fb_social_id, gl_social_id
                        let updateData = {};
                        if(social_type == "2") {
                            gl_social_id = social_id;
                            updateData = {gl_social_id, social_type, device_token, device_type};
                        } else {
                            fb_social_id = social_id;
                            updateData = {fb_social_id,social_type, device_token, device_type};
                        }
            
                })
                }
                })
                }      