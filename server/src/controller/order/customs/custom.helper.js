import Model, {sequelize} from '../../../database/models'
import { errorHandler } from '../../../middleware/ErrorHandler';
import { responseHandler } from '../../../services/responseHandler';


export const getUnassignedDriver = async (driverId,res,trans,orderId,order,date,userId) => {
    try {
        const driver = await Model.Driver.findOne({
            where: {
                id: driverId
            }
        })

        if(driver.onAssignment !== 'waiting') {
            responseHandler(res,400,false,'driver is on another assignemt',null)
            // throw new Error('driver is another assignment')
    // await trans.rollback()
        }else {
           const mainOrder = await order.create({ orderDate: date,userId: userId },{transaction: trans});
            const arrDriver = await Model.Driver.findAll({
                where: {
                    onAssignment: 'waiting'
                }
            })
           const mainId = arrDriver[0].id;
            await Model.Driver.update({ onAssignment: "assigned" }, {
                where: {
                  id: mainId
                }
              });
            //   console.log(driverId);
            //   return driverId
   
    await Model.DeliveryAssignment.create({orderId: mainOrder.id,driverId:mainId,assignedDate: date},{transaction: trans}) 

              //   responseHandler(res,400,false,'driver is on another assignemt',null)
        }  
    } catch (error) {
        await errorHandler(error)
    }
}