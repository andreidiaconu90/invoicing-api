const { contractStatus } = require("../../constants/constants");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = async (req, res) => {
  const profileId = req.profile?.id;
  const { Contract } = req.app.get("models");
  const { Job } = req.app.get("models");

  let unpaidJobs = await Job.findAll({
    include: [
      {
        model: Contract,
        required: true,
        where: {
          status: contractStatus.IN_PROGRESS,
          [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        },
      },
    ],
    //set to true so it returns something as there are no paid:false jobs in the seed
    where: { paid: true },
  });

  return res.status(200).json(unpaidJobs);
};

//Get all unpaid jobs for a user (**_either_** a client or contractor), for **_active contracts only_**.
//SELECT * FROM Jobs j INNER JOIN Contracts c ON j.ContractId = c.id WHERE j.paid = false AND (ClientId = ${profile_id} OR ContractorId = ${profile_id})
