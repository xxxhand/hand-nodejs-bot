const { ParkingInfoRepository } = require('./../../domain/repositories');
const { DialogFlowRequest } = require('./../../domain/value-objects');

const _findByRoadName = async (req, res) => {
    try {
        console.log(req.body);
        const dReq = new DialogFlowRequest();
        dReq.roadName = req.body.queryResult.parameters.roadName || '';
        if (!dReq.hasRoadName()) {
            throw new Error(`Road name is empty`);
        }
        const parkingInfo = await ParkingInfoRepository.findByRoadName(dReq.roadName);
        if (!parkingInfo) {
            throw new Error(`Not found parking infomation with ${dReq.roadName}`);
        }
        if (!parkingInfo.hasFreeCount()) {
            throw new Error(`There is no parking slot with ${dReq.roadName}`);
        }

        res.json({ fulfillmentText: `${parkingInfo.roadName}有${parkingInfo.calculateFreeCount()}個空位`});

    } catch(ex) {
        res.json({ fulfillmentText: ex.message });
    }
}

exports.findByRoadName = _findByRoadName;