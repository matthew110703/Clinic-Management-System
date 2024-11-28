const router = require("express").Router();
const mongoose = require("mongoose");
const { validateId } = require("../middlewares/validateId");

const Consultation = require("../models/consultation");
const token = require("../models/token");
const Patient = require("../models/patient");

// Get all consultations
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, orderBy, byDate } = req.query;

  try {
    // Prepare sort options
    let sortOptions = {};
    if (orderBy) {
      // Split the order parameter into field and direction
      const orderFields = orderBy.split(",");
      orderFields.forEach((field) => {
        const [fieldName, direction] = field.split(":");
        sortOptions[fieldName] =
          direction === "desc" || direction === "-1" ? -1 : 1;
      });
    }

    // Prepare query object for finding consultations
    let query = {};
    if (byDate) query.createdAt = { $gte: new Date(byDate) };

    // Count total documents based on query
    const totalConsultations = await Consultation.countDocuments(query);

    // Check if there are no consultations
    if (totalConsultations === 0) {
      return res.status(400).json({ message: "No consultations found" });
    }

    // Fetch consultations based on the prepared query and sorting
    const consultations = await Consultation.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sortOptions)
      .populate("patient", "fullName phone")
      .populate("token", "tokenNo");

    res.status(200).json({
      currentPage: page,
      totalConsultations,
      totalPages: Math.ceil(totalConsultations / limit),
      consultations,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Get, Delete consultation by ID
router
  .route("/:id")
  // Get consultation by ID
  .get(validateId, async (req, res) => {
    const { id } = req.params;

    try {
      const consultation = await Consultation.findById(id.toString())
        .populate("patient", "fullName phone")
        .populate("token", "tokenNo");

      // Check if the consultation exists
      if (!consultation)
        return res.status(404).json({ message: "Consultation not found" });

      res.status(200).json(consultation);
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  // Delete consultation by ID
  .delete(validateId, async (req, res) => {
    const { id } = req.params;

    try {
      const consultation = await Consultation.findById(id.toString());
      const patient = await Patient.findOne({ _id: consultation.patient });

      // Check if the consultation exists
      if (!consultation)
        return res.status(404).json({ message: "Consultation not found" });

      // Update patient
      await patient.medicalHistory.pull(consultation._id);
      await patient.save();

      await consultation.deleteOne();

      res.status(200).json({ message: "Consultation deleted successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

module.exports = router;
