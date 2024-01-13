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
    responseHandler(res,200,true,'order created sucessfully',null)
    await trans.commit()
} catch (error) {
    await errorHandler(error)
}
}

export const cancelOrder = async(req,res) => {
try {
    const {status,orderId} = req.params;
    await Model.DeliveryAssignment.update({status:status},{orderId:orderId})
    responseHandler(res,200,true,'delivery canceled',null)
} catch (error) {
    await errorHandler(error)
}
}

export const completeOrder = async(req,res) => {
try {
    const {status,orderId} = req.params;
    await Model.DeliveryAssignment.update({status:status},{orderId:orderId})
    responseHandler(res,200,true,'delivery completed',null)
} catch (error) {
    await errorHandler(error)
}
}

