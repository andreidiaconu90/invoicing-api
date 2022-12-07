const { contractStatus } = require("../../constants/constants");

module.exports = async (req, res) => {
  const profileId = req.profile?.id;
  const { Contract } = req.app.get("models");
  const contracts = await Contract.findAll({ where: { ClientId: profileId, Status: contractStatus.IN_PROGRESS } });

  res.json(contracts);
};
