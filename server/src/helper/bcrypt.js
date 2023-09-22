import bcrypt from 'bcrypt';

export const hashData = async(data) => {
    const  saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data, salt);
    return hash
}