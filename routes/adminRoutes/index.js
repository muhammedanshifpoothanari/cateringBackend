const express = require('express');
const router = express();
const { createStock, updateStockById, getByStockName, getAllStock, getByStockId } = require('../.../../../controller/adminController/stockManagement');
const { createOrder, updateOrderById, getByOrderName, getAllOrder, getByOrderId } = require('../.../../../controller/adminController/orderManagment');
const { loginUserCntrl, registerUserCntrl, getAllUser } = require('../../controller/adminController/user');


router.use(express.json());

/////////////itemManagement\\\\\\\\\\\\\\\\
router.get('/item/getAll', getAllStock);
router.post('/item/getByItemName', getByStockName);
router.post('/item/getByItemId', getByStockId);
router.post('/item/createItem', createStock);
router.post('/item/updateItemById', updateStockById);



/////////////itemManagement\\\\\\\\\\\\\\\\
router.get('/order/getAll', getAllOrder);
router.post('/order/getByOrderName', getByOrderName);
router.post('/order/getByOrderId', getByOrderId);
router.post('/order/createOrder', createOrder);
router.post('/order/updateOrderById', updateOrderById);

// 
router.post('/login', loginUserCntrl);
router.post('/register', registerUserCntrl);
router.get('/user', getAllUser);


module.exports = router;