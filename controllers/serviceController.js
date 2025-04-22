const Service = require('../models/Service');

exports.createService = async (req, res) => {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
};

exports.listServices = async (req, res) => {
    const services = await Service.find();
    res.json(services);
};
