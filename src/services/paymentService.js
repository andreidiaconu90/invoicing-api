const { sequelize, Profile, Job, Contract } = require("../model");
const { contractStatus } = require("../constants/constants");

const payJob = async (jobId, clientId) => {
  let result;
  try {
    //in other db flavors instead of a lock a SELECT ... FOR UPDATE' statement could be used
    result = await sequelize.transaction({ type: "DEFERRED" }, async (t) => {
      const clientProfile = await Profile.findOne(
        {
          //this should only select the balance column but for some reason it doesn't work
          //attributes: { include: ["balance"] },
          where: { id: clientId },
          lock: true,
        },
        { transaction: t }
      );

      const jobToBePaid = await Job.findOne(
        {
          include: [
            {
              model: Contract,
              required: true,
              where: {
                status: contractStatus.IN_PROGRESS,
                ClientId: clientId,
              },
            },
          ],
          where: { id: jobId },
        },
        { transaction: t }
      );
      if (!jobToBePaid) {
        return { status: "Failed", message: "Job not found" };
      }
      const clientBalance = clientProfile.balance;
      const contractorId = jobToBePaid.Contract.ContractorId;
      const contractorProfile = await Profile.findOne({ where: { id: contractorId } }, { transaction: t });
      const contractorBalance = contractorProfile.balance;

      if (clientBalance >= jobToBePaid.price) {
        const updateClientPromise = Profile.update({ balance: clientBalance - jobToBePaid.price }, { where: { id: clientId } }, { transaction: t });
        const updateContractorPromise = Profile.update({ balance: contractorBalance + jobToBePaid.price }, { where: { id: contractorId } }, { transaction: t });
        const updateJobPromise = Job.update({ paid: true }, { where: { id: jobId } }, { transaction: t });

        await Promise.all([updateClientPromise, updateContractorPromise, updateJobPromise]);
      } else {
        return { status: "Failed", message: "Insufficient funds" };
      }
      return {
        amountPaid: jobToBePaid.price,
        clientId: clientId,
        contractorId: contractorId,
        remainingBalance: clientBalance - jobToBePaid.price,
        status: "success",
      };
    });
  } catch (error) {
    console.log(error);
    return { status: "Failed", message: "An error occured, please try again later" };
  }
  return result;
};

const depositAmount = async (userId, amount) => {
  return "Not implemented";
};

module.exports = { payJob, depositAmount };
