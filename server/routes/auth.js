const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {

    const newUser ={
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
image: profile.photos[0].value
    }

    try {
      const user = await User.FindOne({ googleId: profile.id });
if(user){
done(null, user);
}else{
  user = await user.create (newUser);
  done(null, user);
}

    } catch (error) {
      console.log(err);
    }
}
));
//google login route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));
 
router.get('/google/callback', 
  passport.authenticate('google',{
failureRedirect: '/login-failure',
successRedirect: '/dashboard'
  })
);

//ruta si algo sale mal
router.get('/login-failure', (req, res)=> {
    res.send('Algo salio mal')
})

//data after successful authentication
passport.serializeUser(function(user, done){
    done(null, user.id);
})
//recupera los datos del usuario 
passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        })

})


module.exports = router;