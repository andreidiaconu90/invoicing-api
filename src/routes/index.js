const express = require("express");
const router = express.Router();
const { getProfile } = require("../middleware/getProfile");
const getContract = require("../controllers/contracts/getContract");
const getActiveContracts = require("../controllers/contracts/getActiveContracts");
const getUnpaidJobs = require("../controllers/jobs/getUnpaidJobs");
const payJob = require("../controllers/jobs/payJob");
const depositAmount = require("../controllers/balance/depositAmount");

router.get("/contracts/:id", getProfile, getContract);
router.get("/contracts", getProfile, getActiveContracts);

router.get("/jobs/unpaid", getProfile, getUnpaidJobs);
router.post("/jobs/:job_id/pay", getProfile, payJob);

router.post("/balances/deposit/:userId", depositAmount);

module.exports = router;
