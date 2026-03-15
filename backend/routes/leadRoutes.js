const express = require('express');
const router = express.Router();
const {
  getAllLeads,
  createLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController');

router.get('/', getAllLeads);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
