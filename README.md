# Bitespeed Backend Task: Identity Reconciliation

## Problem Statement

The goal is to build an identity reconciliation service for contact data. Given contact information (email and/or phone number), the service should:

Identify whether the contact already exists in the database.

Link related contacts under a primary contact.

Classify all contacts as either primary or secondary.

Return a unified view of the contact, including associated emails, phone numbers, and secondary contact IDs.



## Solution

### Overview

This service is built with Node.js, Express, Sequelize, and a PostgreSQL database.

Core Logic Flow:
Accepts a request with email and/or phoneNumber.

Searches for existing contacts with matching fields.

Determines or creates the primary contact.

Links new or matching entries as secondary contacts if necessary.

Returns a deduplicated, unified contact profile.


## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for handling HTTP requests and routing.
- **Sequelize**: ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: Database for storing contact information.

## Endpoints

### `/identify`

**POST** `/identify`

**Request Body**:
```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
```

**Request Response**:
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["user@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": []
  }
}
```

## Hosted URL
The service is hosted and can be accessed at:
http://ec2-13-201-62-221.ap-south-1.compute.amazonaws.com:3000/
