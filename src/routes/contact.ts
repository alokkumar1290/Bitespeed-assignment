import { Router } from 'express';
import { identifyContact } from '../services/contactService';

const contactRouter = Router();

contactRouter.post('/', async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const contactData = await identifyContact(email, phoneNumber);
    res.status(200).json(contactData);
  } catch (error) {
    console.error('Error identifying contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

contactRouter.get('/', (_req, _res) => {
  console.log('GET request received on /contacts');
});

export default contactRouter;
