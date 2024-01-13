import { where } from 'sequelize'
import Model from '../../database/models'
import { responseHandler } from '../../services/responseHandler'
import { errorHandler } from '../../middleware/ErrorHandler';



export const getAllDriverDeliveryAssignment = async(req,res) => {
try {
    const {id} = req.params;
    const driverDelivery = await Model.Driver.findOne({
        where: {
            id: id
        },
        include: [
            {
            model: Model.DeliveryAssignment,
            as: 'delivetAssignment' // Use the correct alias
            }
        ]
    });
    responseHandler(res,200,true,'',driverDelivery)
} catch (error) {
    // responseHandler()
    await errorHandler(error)
}
}

export const getAllDriverCompletedDeliveryAssignment = async(req,res) => {
try {
    const {id} = req.params;
    const driverDelivery = await Model.Driver.findOne({
        where: {
            id: id
        },
        include: [
            {
            model: Model.DeliveryAssignment,
            as: 'delivetAssignment' // Use the correct alias
            }
        ]
    });
    //  const arr = driverDelivery.data.deliveryAssignment;
     const arr = driverDelivery.delivetAssignment.find((d) => d.status === 'completed');
    responseHandler(res,200,true,'',!arr ? 'No completed delivery yet' : arr)
} catch (error) {
    await errorHandler(error)
}
}

export const getAllDriverCanceledDeliveryAssignment = async(req,res) => {
    try {
        const {id} = req.params;
        const driverDelivery = await Model.Driver.findOne({
            where: {
                id: id
            },
            include: [
                {
                model: Model.DeliveryAssignment,
                as: 'delivetAssignment' // Use the correct alias
                }
            ]
        });
        //  const arr = driverDelivery.data.deliveryAssignment;
         const arr = driverDelivery.delivetAssignment.find((d) => d.status === 'canceled');
        responseHandler(res,200,true,'',!arr ? 'No completed delivery yet' : arr)
    } catch (error) {
        await errorHandler(error)
    }
}

export const getAllDriverPendingDeliveryAssignment = async(req,res) => {
    try {
        const {id} = req.params;
        const driverDelivery = await Model.Driver.findOne({
            where: {
                id: id
            },
            include: [
                {
                model: Model.DeliveryAssignment,
                as: 'delivetAssignment' // Use the correct alias
                }
            ]
        });
        //  const arr = driverDelivery.data.deliveryAssignment;
         const arr = driverDelivery.delivetAssignment.find((d) => d.status === 'pending');
        responseHandler(res,200,true,'',!arr ? 'No completed delivery yet' : arr)
    } catch (error) {
        await errorHandler(error)
    }
}

export const updateDriverOnAssignment = async(req,res) => {
    
}