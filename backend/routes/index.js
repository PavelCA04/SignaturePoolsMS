const { Router } = require('express');
const controller = require('./controller')

const router = Router();

// Clients routes
router.post('/clients/', controller.addClient);
router.get('/clients/', controller.getClients);
router.get('/clients/:id', controller.getClientById);
router.put('/clients/:id', controller.updateClient);
router.delete('/clients/:id', controller.removeClient);

// Employees routes
router.post('/employees/', controller.addEmployee);
router.get('/employees/', controller.getEmployees);
router.get('/employees/:id', controller.getEmployeeById);
router.put('/employees/:id', controller.updateEmployee);
router.delete('/employees/:id', controller.removeEmployee);

// Inventory routes
router.post('/items/', controller.addItem);
router.get('/items/', controller.getItems);
router.get('/items/:id', controller.getItemById);
router.put('/items/:id', controller.updateItem);
router.delete('/items/:id', controller.removeItem);

// Meetings routes
router.post('/meetings/', controller.addMeeting);
router.get('/meetings/', controller.getMeetings);
router.get('/meetings/:id', controller.getMeetingById);
router.put('/meetings/:id', controller.updateMeeting);
router.delete('/meetings/:id', controller.removeMeeting);

module.exports = router;