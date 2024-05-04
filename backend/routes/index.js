const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get('/', controller.getUsers);
router.get('/:id', controller.getUsersById);
router.post('/', controller.addUser);
router.delete('/:id', controller.removeUser);
router.put('/:id', controller.updateUser);



module.exports = router;