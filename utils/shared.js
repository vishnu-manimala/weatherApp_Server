const bcrypt = require('bcrypt');


export const securePassword = async(password)=>{
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        console.log("hash",hashedPassword);
        return hashedPassword;
    }catch(err){
        console.log(err)
    }
}


module.exports = {
    securePassword,
}