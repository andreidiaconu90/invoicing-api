module.exports = async (req, res) => {
  const id = +req.params.id;
  const profileId = req.profile?.id;
  const { Contract } = req.app.get("models");
  const contract = await Contract.findOne({ where: { id, ClientId: profileId } });
  if (!contract) {
    return res.status(404).end();
  }
  res.json(contract);
};
