function getDistanceBetweenPoints(
  latitude1,
  longitude1,
  latitude2,
  longitude2
) {
  let theta = longitude1 - longitude2;
  //cari dalam satuan miles
  let distance =
    60 *
    1.1515 *
    (180 / Math.PI) *
    Math.acos(
      Math.sin(latitude1 * (Math.PI / 180)) *
        Math.sin(latitude2 * (Math.PI / 180)) +
        Math.cos(latitude1 * (Math.PI / 180)) *
          Math.cos(latitude2 * (Math.PI / 180)) *
          Math.cos(theta * (Math.PI / 180))
    );

  distance = distance * 1.609344; //km
  // distance = 1000 * distance; //meter

  return Math.round(distance, 2); //dalam meter
}
export default getDistanceBetweenPoints;
