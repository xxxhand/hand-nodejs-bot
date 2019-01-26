
module.exports = class {
    constructor() {
        this.roadName = '';
        this.paymentDescription = '';
        this.totalParkingCount = 0;
        this.usedParkingCount = 0;
    }

    calculateFreeCount() {
        return this.totalParkingCount - this.usedParkingCount;
    }
    hasFreeCount() {
        return this.calculateFreeCount() > 0;
    }
}