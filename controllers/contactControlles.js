const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route /api/contacts
//@acess private

const getAllContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});


// @access private
const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(contact);
});


// @access private
const putContact = asyncHandler (async (req, res) => {
  const contactById = await Contact.findById(req.params.id);
  if(!contactById) {
    res.status(400);
    throw new Error("Contact not found.")
  }

  if(contactById.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have the permission to update the other contact.");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  );
  res.status(200).json(updatedContact);
});


// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contactById = await Contact.findById(req.params.id);
  if(!contactById) {
    res.status(400);
    throw new Error("Contact not found.")
  }

  if(contactById.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have the permission to update the other contact.");
  }

  const deleteContactById = await Contact.deleteOne(contactById);
  res.status(200).send(deleteContactById);
});


// access private
const getContact = asyncHandler(async (req, res) => {
  const contactById = await Contact.findById(req.params.id);
  if(!contactById) {
    res.status(400);
    throw new Error("Contact not found.")
  }
  res.status(200).json(contactById);
});

module.exports = {
  getAllContact,
  getContact,
  postContact,
  putContact,
  deleteContact,
};
