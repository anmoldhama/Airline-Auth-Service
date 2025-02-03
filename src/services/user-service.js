const UserRepository = require('../repositories/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService {
    constructor(){
        this.UserRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.UserRepository.create(data);
            return user;
        }catch(error){
            console.log('something went wrong in the service layer');
            throw error;
        }
    }

    async signIn(email,password){
        try{
            const user = await this.UserRepository.getByEmail(email);

            const passwordMatch = this.checkPassword(password, user.password);

            if(!passwordMatch){
                console.log('password incorrect');
                throw {error: 'password incorrect'};
            }
            
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        }catch(error){
            console.log('something went wrong in sign in the user');
            throw error;
        }
    }

    async isAuthenticated(token){
        try{
           const response = this.verifyToken(token);
           if(!response){
            throw {error: 'Invalid token'}
           }
           const user = await this.UserRepository.getById(response.id);
           if(!user){
            throw {error: 'No user with the corresponding token exists'}
           }
           return user.id;
        }catch(error){
          console.log('Something went wrong in the auth process');
          throw error;
        }
    }

    createToken(user){
       try{
         const result = jwt.sign(user,JWT_SECRET,{expiresIn: '1h'});
         return result;
       }catch(error){
        console.log('Something went wrong in token creation');
        throw error; 
       }
    }

    verifyToken(token){
        try{
         const response = jwt.verify(token, JWT_SECRET);
         return response;
        }catch(error){
         console.log('Something went wrong in token validaton!',error);
         throw error;
        }
    }

    checkPassword(userInputPassword, encryptedPassword){
        try{
           return bcrypt.compareSync(userInputPassword, encryptedPassword);
        }catch(error){
          console.log('someting went wrong in comparing the password!');
          throw error;
        }
    }

    isAdmin(userId){
        try{
            return this.UserRepository.isAdmin(userId);
        }catch(error){
            console.log('Something went wrong on service layer');
          throw error;
        }
    }
}

module.exports = UserService;