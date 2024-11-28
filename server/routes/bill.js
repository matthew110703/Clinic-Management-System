const router = require("express").Router();
const { validateId } = require("../middlewares/validateId");

const Bill = require("../models/bill");

// Get all bills and create a new bill
router
  .route("/")
  // Get all bills by page, limit, orderBy, byPatient, byDate
  .get(async (req, res) => {
    const {
      page = 1,
      limit = 10,
      orderBy,
      byStatus,
      byPatient,
      byDate,
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

      // Prepare query object for finding bills
      let query = {};
      if (byPatient) query.patient = byPatient;
      if (byDate) query.createdAt = { $gte: new Date(byDate) };
      if (byStatus) query.status = byStatus;

      // Count total documents based on query
      const totalBills = await Bill.countDocuments(query);

      // Check if there are no bills
      if (totalBills === 0) {
        return res.status(400).json({ message: "No bills found" });
      }

      // Fetch bills based on the prepared query and sorting
      const bills = await Bill.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort(sortOptions)
        .populate("patient", "fullName phone");

      res.status(200).json({
        currentPage: page,
        totalBills,
        totalPages: Math.ceil(totalBills / limit),
        bills,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  // Create a new bill
  .post(async (req, res) => {
    const { patient, consultation, totalAmount } = req.body;

    try {
      const bill = new Bill({
        patient,
        consultation,
        totalAmount,
      });

      await bill.save();

      res.status(201).json({ message: "Bill created successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

// Get, Update, Delete bill by ID

router
  .route("/:id")
  // Get bill by ID
  .get(validateId, async (req, res) => {
    const { id } = req.params;

    try {
      const bill = await Bill.findById(id.toString()).populate(
        "patient",
        "fullName phone"
      );

      // Check if the bill exists
      if (!bill) return res.status(404).json({ message: "Bill not found" });

      res.status(200).json(bill);
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  // Update bill by ID
  .put(validateId, async (req, res) => {
    const { id } = req.params;
    const { status, paidAmount } = req.body;

    try {
      const bill = await Bill.findById(id.toString()).populate(
        "patient",
        "fullName phone"
      );

      // Check if the bill exists
      if (!bill) return res.status(404).json({ message: "Bill not found" });

      // Update the bill
      bill.status = status || bill.status;
      bill.paidAmount = paidAmount || bill.paidAmount;

      await bill.save();

      res.status(200).json({ message: "Bill updated successfully", bill });
    } catch (error) {
      res.status(500).json(error.message);
    }
  })
  // Delete bill by ID
  .delete(validateId, async (req, res) => {
    const { id } = req.params;

    try {
      const bill = await Bill.findById(id.toString());

      // Check if the bill exists
      if (!bill) return res.status(404).json({ message: "Bill not found" });

      await bill.deleteOne();

      res.status(200).json({ message: "Bill deleted successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

module.exports = router;
