import express from 'express';
import { submitContactForm, getAllSubmissions } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContactForm);
router.get('/', getAllSubmissions);

export default router;
