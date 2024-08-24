import bcrypt from 'bcryptjs';
import { validate, ValidationError } from 'class-validator';
import jwt from 'jsonwebtoken';
import Users from '../models/Loginmodel.js';

class uservalidation {
  constructor( name, password) {
    this.name = name;
    this.password = password;
  }
  async validate() {
    const errors = [];
    if (typeof this.name !== 'string' || this.name.length < 4 || this.name.length > 20) {
      errors.push({ property: 'name', region: 'Username must be between 4 and 20 characters long' });
    }
    if (typeof this.password !== 'string' || this.password.length < 6 || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(this.password)) {
      errors.push({ property: 'password', region: 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character' });
    }
    if (errors.length > 0) {
      throw {errors};
    }
  }
}

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '5h' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

export const register = async (req, res) => {
  
  const { name, email, password } = req.body;
  const uservalid=new uservalidation(name,password);
  console.log("uservalid",uservalid);
  try {
    console.log("registration password", password);
    await uservalid.validate();

    const userExist = await Users.findOne({ email });

    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("register hash", hashedPassword);

      const data = new Users({ name, email, password: hashedPassword });
      await data.save();
      res.status(201).json({ msg: "Register successful", data });
    } else {
      res.status(400).send('User already exists, try to login');
    }
  } catch (err) {
    console.error("error in register", err);
    res.status(500).send("Internal server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password, email);

    if (!email || !password) {
      return res.status(400).send("Email and password required");
    }

    const userExist = await Users.findOne({ email });
    const userRole=userExist.role;
    if (userExist) {
      try {
        const passCheck = await bcrypt.compare(password, userExist.password);
        console.log("Stored hash:", userExist.password);
        console.log("Password to compare:", password);
        console.log("bcrypt compare", passCheck);
        if (passCheck) {
          const accessToken = generateToken(userExist);
          const refreshToken = generateRefreshToken(userExist);
          userExist.refreshToken = refreshToken;
          await userExist.save();

          req.session.accessToken = accessToken;
          req.session.refreshToken = refreshToken;

          res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
          });
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
          });

         req.session.save(err => {
            if (err) {
              return res.status(500).send('Failed to save session');
            }
            
            res.status(200).json({ message: 'Login successful', accessToken ,userRole});
          });
        } else {
          console.log("Incorrect password");
          res.status(400).send("Incorrect password");
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Password comparison failed");
      }
    } else {
      console.log("User does not exist");
      res.status(400).send('User does not exist, try to register');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
export const logout = async (req, res) => {
  const {refreshToken} = req.session;
  console.log(req.session);
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const user = await Users.findOne({ refreshToken });
    
    if (user) {
      user.refreshToken = null; 
      await user.save(); 
    }

    res.clearCookie('accessToken');

    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);

    return res.status(500).json({ message: 'User logout failed', error });
  }
};