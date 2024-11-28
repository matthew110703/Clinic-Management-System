const router = require("express").Router();

const Patient = require("../models/patient");
const Token = require("../models/token");
const Consultation = require("../models/consultation");

// Middleware to validate the patient ID
const validatePatientId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id.toString());

    // Check if the patient exists
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    req.patient = patient;

    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid Patient ID format" });
  }
};

router
  .route("/")
  // Fetch all patients or search patients by name or phone or other criteria
  .get(async (req, res) => {
    const {
      page = 1,
      limit = 10,
      searchByName = null,
      searchByPhone = null,
      orderBy = null,
      queryBy = {}, // filter by other criteria
    } = req.query;

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

      // Prepare query object for finding patients
      let query = {};
      if (searchByName) {
        query.fullName = new RegExp(searchByName, "i");
      }
      if (searchByPhone) {
        query.phone = searchByPhone; // Adjust the field name as per your model
      }
      // Add other filters if necessary
      Object.assign(query, queryBy);

      // Count total documents based on query
      const totalPatients = await Patient.countDocuments(query);

      // Check if there are no patients
      if (totalPatients === 0) {
        return res.status(400).json({ message: "No patients found" });
      }

      // Fetch patients based on the prepared query and sorting
      const patients = await Patient.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort(sortOptions);

      res.status(200).json({
        totalPatients,
        totalPages: Math.ceil(totalPatients / limit),
        currentPage: page,
        patients,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  // Create a new patient
  .post(async (req, res) => {
    const { clinicName, fullName, age, gender, email, phone } = req.body;

    try {
      // Check if the patient already exists
      const existingPatient = await Patient.findOne({ fullName, phone });
      if (existingPatient) {
        return res.status(400).json({ message: "Patient already exists" });
      }

      const patient = await Patient.create({
        clinicName,
        fullName,
        age,
        gender,
        email,
        phone,
      });

      res.status(201).json({
        message: "Patient created successfully",
        patient,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get, update, or delete a patient by ID

router
  .route("/:id")
  // Fetch a patient
  .get(validatePatientId, async (req, res) => {
    const { id } = req.params;

    try {
      const patient = await req.patient.populate(
        "medicalHistory",
        "doctorName diagnosis prescription notes createdAt"
      ); // Get the patient from the request object

      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  // Update a patient
  .put(validatePatientId, async (req, res) => {
    const { id } = req.params;
    const { clinicName, fullName, age, phone, email } = req.body;

    try {
      const patient = await Patient.findById(id.toString());

      patient.clinicName = clinicName || patient.clinicName;
      patient.fullName = fullName || patient.fullName;
      patient.age = age || patient.age;
      patient.phone = phone || patient.phone;
      patient.email = email || patient.email;

      await patient.save();

      res.status(200).json({ message: "Patient updated successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  // Delete a patient
  .delete(validatePatientId, async (req, res) => {
    const { id } = req.params;

    try {
      const patient = await Patient.findById(id.toString());

      await patient.deleteOne();

      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

// Generate a new token for a patient by ID
router.post("/:id/generate-token", validatePatientId, async (req, res) => {
  const { id } = req.params;

  try {
    const patient = req.patient; // Get the patient from the request object

    // Generate a new token for the patient
    const tokensCount = await Token.countDocuments();
    const tokenNo = tokensCount + 1;

    const token = await Token.create({
      patient: patient._id,
      tokenNo,
    });

    res.status(201).json({
      message: "Token generated successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Consultations routes
router
  .route("/:id/consultations")
  // Create a new consultation for a patient by ID
  .post(validatePatientId, async (req, res) => {
    const { id } = req.params;
    const { doctorName, tokenNo, diagnosis, medication, notes = "" } = req.body;

    try {
      const patient = req.patient; // Get the patient from the request object
      const token = await Token.findOne({ patient: patient._id, tokenNo });

      if (!token)
        return res.status(400).json({ message: "Invalid token number" });

      if (token.status !== "consulting")
        return res.status(400).json({ message: "Token is not updated." });

      if (token.status === "cancelled")
        return res.status(400).json({ message: "Token is cancelled." });

      const consultation = await Consultation.create({
        patient: patient._id,
        token: token._id,
        doctorName,
        diagnosis,
        medication,
        notes,
      });

      patient.medicalHistory.push(consultation._id); // Add the consultation to the patient's medical history
      token.status = "served"; // Update the token status to served
      await token.save();
      await patient.save();

      res.status(201).json({
        message: "Consultation created successfully",
        consultation,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  // Fetch all consultations of a patient by ID
  .get(validatePatientId, async (req, res) => {
    const { id } = req.params;

    try {
      const patient = req.patient; // Get the patient from the request object

      const consultations = await Consultation.find({
        patient: patient._id,
      })
        .populate("patient", "fullName phone")
        .populate("token", "tokenNo status");

      res.status(200).json(consultations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
