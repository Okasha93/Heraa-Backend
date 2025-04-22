exports.getUserInfo = async (req, res) => {
    res.json(req.user);
};
