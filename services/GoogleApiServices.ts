/*
const calculateDistanceAndTime = async (
  startLat,
  startLng,
  destinationLat,
  destinationLng,
  mode = 'bicycling',
) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  const ratePerKm = 1;

  const requestUrl = `${baseUrl}origins=${startLat},${startLng}&destinations=${destinationLat},${destinationLng}&mode=${mode}&key=${apiKey}`;

  try {
    const response = await fetch(requestUrl);
    const data = await response.json();

    // Ensure the request was successful and there are results
    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const distance = data.rows[0].elements[0].distance.text;
      const duration = data.rows[0].elements[0].duration.text;

      const distanceInKm = parseFloat(distance.replace(' km', ''));
      const price = distanceInKm * ratePerKm;
      const finalPrice = `$${price.toFixed(2)}`;

      return {
        distance,
        duration,
        finalPrice,
      };
    } else {
      console.error('Error calculating distance and duration:', data.status);
      return null;
    }
  } catch (error) {
    console.error('Failed to calculate distance and duration:', error);
    return null;
  }
};

*/

// Types for our function parameters and responses
export interface DistanceMatrixResult {
  distance: string;
  duration: string;
  finalPrice: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DirectionsResult {
  coordinates: Coordinates[];
  directions: any; // Replace 'any' with proper type from Google Maps types if available
}

/**
 * Calculates the distance, duration, and price between two points using Google Maps API
 * @param startLat - Starting point latitude
 * @param startLng - Starting point longitude
 * @param destinationLat - Destination latitude
 * @param destinationLng - Destination longitude
 * @param mode - Travel mode (driving, walking, bicycling, transit)
 * @returns Promise containing distance, duration, and price information
 * @throws Error if the API request fails or returns invalid data
 */
const calculateDistanceAndTime = async (
  startLat: number,
  startLng: number,
  destinationLat: number,
  destinationLng: number,
  mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'bicycling',
): Promise<DistanceMatrixResult | null> => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error('Google Maps API key is not configured');
  }

  const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  const ratePerKm = 1;

  const requestUrl = `${baseUrl}origins=${startLat},${startLng}&destinations=${destinationLat},${destinationLng}&mode=${mode}&key=${apiKey}`;

  try {
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`API error: ${data.status}`);
    }

    const element = data.rows[0]?.elements[0];
    if (!element || element.status !== 'OK') {
      throw new Error('No valid route found');
    }

    const distance = element.distance.text;
    const duration = element.duration.text;

    // Remove non-numeric characters and convert to number
    const distanceInKm = parseFloat(distance.replace(/[^0-9.]/g, ''));
    const price = distanceInKm * ratePerKm;
    const finalPrice = `$${price.toFixed(2)}`;

    return {
      distance,
      duration,
      finalPrice,
    };
  } catch (error) {
    console.error('Failed to calculate distance and duration:', error);
    return null;
  }
};

/* 
const extractNumbers = inputStr => {
  if (typeof inputStr !== 'string') {
    return [];
  }
  const matched = inputStr.match(/\d+/g);
  return matched ? matched.map(num => parseInt(num, 10)) : [];
};
*/

/**
 * Extracts numbers from a string and returns them as an array of integers
 * @param inputStr - String containing numbers to extract
 * @returns Array of extracted numbers
 */
const extractNumbers = (inputStr: string): number[] => {
  if (typeof inputStr !== 'string') {
    return [];
  }
  const matched = inputStr.match(/\d+/g);
  return matched ? matched.map(num => parseInt(num, 10)) : [];
};

/*
const fetchDirections = async (
  startLat,
  startLng,
  destinationLat,
  destinationLng,
) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json().then(data => {
      // setDirections(data);
      const encodedPolyline = data.routes[0].overview_polyline.points;
      const coordinates = decode(encodedPolyline);

      setCoordinates(coordinates);
    });
  } catch (error) {
    console.error(error);
  }
};
*/

/**
 * Fetches directions between two points using Google Maps Directions API
 * @param startLat - Starting point latitude
 * @param startLng - Starting point longitude
 * @param destinationLat - Destination latitude
 * @param destinationLng - Destination longitude
 * @returns Promise containing decoded polyline coordinates and directions data
 */
const fetchDirections = async (
  startLat: number,
  startLng: number,
  destinationLat: number,
  destinationLng: number,
): Promise<DirectionsResult> => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error('Google Maps API key is not configured');
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK' || !data.routes?.[0]) {
      throw new Error('No valid route found');
    }

    const encodedPolyline = data.routes[0].overview_polyline.points;
    const coordinates = decodePolyline(encodedPolyline);

    return {
      coordinates,
      directions: data,
    };
  } catch (error) {
    console.error('Failed to fetch directions:', error);
    throw error; // Re-throw to let caller handle the error
  }
};

/*
const decode = encoded => {
  const points = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let shift = 0,
      result = 0;
    let byte;
    do {
      byte = encoded.charCodeAt(index++) - 63; // <-- we use charCodeAt method, not a 'char' property
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }

  return points;
};
*/

/**
 * Decodes a Google Maps encoded polyline into an array of coordinates
 * @param encoded - Encoded polyline string
 * @returns Array of latitude/longitude coordinates
 */
const decodePolyline = (encoded: string): Coordinates[] => {
  const points: Coordinates[] = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let shift = 0;
    let result = 0;

    do {
      const byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (index < len && encoded.charCodeAt(index - 1) >= 0x20);

    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;

    do {
      const byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (index < len && encoded.charCodeAt(index - 1) >= 0x20);

    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    points.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }

  return points;
};

export default {
  calculateDistanceAndTime,
  extractNumbers,
  fetchDirections,
  decodePolyline, // Exported separately for testing purposes
};
