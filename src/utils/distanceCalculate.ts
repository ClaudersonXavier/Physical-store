export const harvisineDistanceCalculator = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const radiusEarth = 6371; 
    const deltaLat = (lat2 - lat1) * Math.PI / 180;
    const deltaLon = (lon2 - lon1) * Math.PI / 180;
    
    const phy = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const km = 2 * Math.atan2(Math.sqrt(phy), Math.sqrt(1 - phy));
    return radiusEarth * km; 
};