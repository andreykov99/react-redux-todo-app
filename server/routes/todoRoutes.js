const express = require('express');
const router = express.Router();

const {
  getTodos,
  addTodo,
  deleteTodo,
  toggleComplete,
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTodos);
router.post('/', protect, addTodo);
router.patch('/:id', protect, toggleComplete);
router.delete('/:id', protect, deleteTodo);

module.exports = router;
