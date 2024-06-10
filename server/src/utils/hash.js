import bcrypt from 'bcrypt';
import argon2 from 'argon2';
const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await argon2.hash(password, salt);
};

const comparePasswords = async(password, hash) => {
    return await argon2.verify(hash, password);
};


export { hashPassword, comparePasswords };