import Contact from '../models/contact';
import { Op } from 'sequelize';

export const identifyContact = async (email?: string, phoneNumber?: string) => {
  const matchingContacts = await Contact.findAll({
    where: {
      [Op.or]: [{ email }, { phoneNumber }]
    },
    order: [['createdAt', 'ASC']]
  });

  let primary: any = null;
  const emailSet = new Set<string>();
  const phoneSet = new Set<string>();
  const secondaryIds = new Set<number>();

  if (matchingContacts.length === 0) {
    primary = await Contact.create({ email, phoneNumber });
  } else {
    const exactMatch = matchingContacts.find(c => c.email === email && c.phoneNumber === phoneNumber);
    primary = matchingContacts.find(c => c.linkPrecedence === 'primary') || matchingContacts[0];
    const conflictingPrimary = matchingContacts.filter(c => c.linkPrecedence === 'primary')[1];

    if (!exactMatch && !conflictingPrimary) {
      const newSecondary = await Contact.create({
        email,
        phoneNumber,
        linkedId: primary.id,
        linkPrecedence: 'secondary'
      });

      secondaryIds.add(newSecondary.id);
      if (newSecondary.email) emailSet.add(newSecondary.email);
      if (newSecondary.phoneNumber) phoneSet.add(newSecondary.phoneNumber);
    }

    if (conflictingPrimary) {
      conflictingPrimary.linkPrecedence = 'secondary';
      conflictingPrimary.linkedId = primary.id;
      await conflictingPrimary.save();
    }

    for (const contact of matchingContacts) {
      if (contact.email) emailSet.add(contact.email);
      if (contact.phoneNumber) phoneSet.add(contact.phoneNumber);
      if (contact.id !== primary.id) {
        secondaryIds.add(contact.id);
      }
    }
  }

  if (primary.email) emailSet.add(primary.email);
  if (primary.phoneNumber) phoneSet.add(primary.phoneNumber);

  return {
    contact: {
      primaryContactId: primary.id,
      emails: Array.from(emailSet),
      phoneNumbers: Array.from(phoneSet),
      secondaryContactIds: Array.from(secondaryIds)
    }
  };
};
