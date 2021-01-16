export interface GeoLocation {
  lat: number;
  lng: number;
}

export class GeoUtils {
  static sortByDistance(
    latitude: number,
    longitude: number,
    locations: GeoLocation[]
  ): void {
    locations.sort((a, b) => {
      let d1 = this.getDistance(latitude, longitude, a.lat, a.lng);
      let d2 = this.getDistance(latitude, longitude, b.lat, b.lng);
      return d1 - d2;
    });
  }

  private static getDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) {
    lat1 = this.toRadians(lat1);
    lat2 = this.toRadians(lat2);
    lng1 = this.toRadians(lng1);
    lng2 = this.toRadians(lng2);
    let radius = 6371;
    let x = (lng2 - lng1) * Math.cos((lat1 + lat2) / 2);
    let y = lat2 - lat1;
    let distance = Math.sqrt(x * x + y * y) * radius;
    return distance;
  }

  private static toRadians(deg: number) {
    return (deg * Math.PI) / 180;
  }
}
