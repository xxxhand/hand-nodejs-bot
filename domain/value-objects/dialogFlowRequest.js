module.exports = class {
    constructor() {
        this.roadName = ''
    }
    hasRoadName() {
        return this.roadName && this.roadName.length > 0;
    }
}