const { payJob } = require("../../services/paymentService");
module.exports = async (req, res) => {
  const jobId = +req.params.job_id;
  const profileId = req.profile?.id;
  const result = await payJob(jobId, profileId);
  return res.json(result);
  //   try {
  //     //in SQLite, a transaction locks the entire database, so we should be safe from concurrent updates of balances
  //     //in other db flavors a 'SELECT ... FOR UPDATE' could be used
  //     const result = await sequelize.transaction(async (t) => {
  //       const currentBalance = await Profile.findOne({ where: { id: profileId }, attributes: ["balance"] }, { transaction: t });

  //       //   await user.setShooter(
  //       //     {
  //       //       firstName: "John",
  //       //       lastName: "Boothe",
  //       //     },
  //       //     { transaction: t }
  //       //   );
  //       return currentBalance;
  //     });
  //     return res.json({ result });

  //     // If the execution reaches this line, the transaction has been committed successfully
  //     // `result` is whatever was returned from the transaction callback (the `user`, in this case)
  //   } catch (error) {
  //     return res.status(500).json(error);
  //     // If the execution reaches this line, an error occurred.
  //     // The transaction has already been rolled back automatically by Sequelize!
  //   }
};
