import Model,{sequelize} from '../../database/models'
import {getUnassignedDriver} from './customs/custom.helper'
import { errorHandler } from '../../middleware/ErrorHandler';
import { responseHandler } from '../../services/responseHandler';


export const createOrder = async(req,res) => {
try {
    const trans = await sequelize.transaction();
    const {userId,driverId} = req.params;
    const date = Date.now();
    const order =  Model.Order
     const orderId = order.id;
    await getUnassignedDriver(driverId,res,trans,orderId,order,date,userId)
    await trans.commit()
} catch (error) {
    await errorHandler(error)
}
}