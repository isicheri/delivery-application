import express from 'express'
import { getAllDriverCanceledDeliveryAssignment, getAllDriverCompletedDeliveryAssignment, getAllDriverDeliveryAssignment, getAllDriverPendingDeliveryAssignment } from '../../../controller/driver/driver.controller';

const router = express.Router();

router.get('/get-driver-delivery-assignment/:id',getAllDriverDeliveryAssignment)
router.get('/get-driver-completed-delivery/:id',getAllDriverCompletedDeliveryAssignment)
router.get('/get-driver-canceled-delivery/:id',getAllDriverCanceledDeliveryAssignment)
router.get('/get-driver-pending-delivery/:id',getAllDriverPendingDeliveryAssignment)
module.exports = router;