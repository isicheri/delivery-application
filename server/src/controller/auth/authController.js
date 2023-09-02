import  Model,{sequelize}  from "../../database/models";



export const getUsers = async(req,res) => {
try {
    const user = await Model.User.findAll({
        include: [
            {
            model:Model.Order,
            as: 'Orders' // Use the correct alias
            }
        ]
    });
    res.status(200).json(user)
} catch (error) {
    console.error('SequelizeEagerLoadingError:', error);
    res.status(400).json(error)
}
}


//change valu to human readable date and time
/**
 * const timestamp = 1693624717497; // Replace this with your timestamp

// Create a new Date object using the timestamp
const date = new Date(timestamp);

// Extract the different components of the date (year, month, day, hour, minute, second)
const year = date.getFullYear();
const month = date.getMonth() + 1; // Months are zero-based, so add 1
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// Create a human-readable date string
const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

console.log(dateString);
 */