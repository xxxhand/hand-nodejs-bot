const { ParkingInfoRepository } = require('./../../domain/repositories');

const _findByRoadName = async (req, res) => {
    try {
        const parkingInfo = await ParkingInfoRepository.findByRoadName(req.body.roadName);
        if (!parkingInfo) {
            throw new Error(`Not found parking infomation with ${req.body.roadName}`);
        }
        if (!parkingInfo.hasFreeCount()) {
            throw new Error(`There is no parking slot with ${req.body.roadName}`);
        }
        res.status(200).json({ result: parkingInfo });
    } catch(ex) {
        res.status(400).json({ message: ex.message });
    }
}

exports.findByRoadName = _findByRoadName;