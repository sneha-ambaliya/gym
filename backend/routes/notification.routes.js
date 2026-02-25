import express from 'express';
import { createNotification, deleteNotification, getNotifications } from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/',getNotifications);
router.post('/',createNotification);
router.delete('/:id',deleteNotification);


export default router;