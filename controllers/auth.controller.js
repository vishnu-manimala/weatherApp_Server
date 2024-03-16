const User = require("../model/user.schema");


const register = async (req, res) => {
    const data = req.body;
    try {
      const securePassword = await helper.securePassword(data.password);
      const userData = await User.create({
        name: data.name,
        email: data.email,
        contactNumber: data.phone,
        password: securePassword,
        createdAt: new Date(),
      });
      res.status(200).json("success");
    } catch (err) {
      console.log(err);
      return res.json("Error");
    }
  };

//Login With password
const login = async (req, res) => {
    const data = req.body;
    try {
      const userData = await User.findOne({ email: data.username });
      if (!userData) {
        return res
          .status(401)
          .json({ data: null, status: "Error", message: "No user found" });
      }
      const passwordMatch = await bcrypt.compare(
        data.password,
        userData.password
      );
      if (userData.isBlocked) {
        return res
          .status(401)
          .json({ data: null, status: "Error", message: "You are blocked!" });
      }
  
      if (!passwordMatch) {
        return res.status(401).json({
          data: null,
          status: "Error",
          message: "Username & password mismatch",
        });
      }
      const accessToken = await helper.tokenGenerator(userData);
      const refreshToken = await helper.refreshTokenGenerator(userData);
      const jwt = await jwtModel.create({
        userId:userData._id,
        token:refreshToken,
        createdAt:new Date() 
      });
      const refresh = jwt.save();
      const userdata = await User.findOne(
        { email: data.username }
      );
      res.header('Authorization', `Bearer ${accessToken}`)
  
      // Set the access token and refresh token in cookies
      .cookie('access_token', accessToken, { httpOnly: true,  })
      .cookie('refresh_token', refreshToken,  { httpOnly: true, })
      .status(200)
      .json({ data: userdata, status: "Success", token: accessToken,refresh_token:refreshToken });
    } catch (err) {
      console.log(err);
      res
        .status(401)
        .json({ data: null, status: "Error", message: "Something went wrong" });
    }
  };
  

  module.exports = {
    register,
    login
  };
  