const Service = require('../models/Service');

exports.createService = async (req, res) => {
    const service = await Service.create(req.body);
    res.json(service);
};

exports.getServices = async (req, res) => {
    const services = await Service.find();
    res.json(services);
};

exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
