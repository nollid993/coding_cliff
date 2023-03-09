// export interface DeviceLocation {
//     id: number;
//     deviceUuid: string;
//     createTime: string;
//     receivedTime: string;
//     latitude: number;
//     longitude: number;
//     altitude: number;
//     accuracy: number;
//     verticalAccuracy: number;
//     bearing: number;
//     bearingAccuracy: number;
//     speed: number;
//     speedAccuracy: number;
// }

const earthradius = 6371.0

function getDistanceByHaversine(loc1, loc2) {
    lat1 = loc1.latitude;
    lon1 = loc1.longitude;
    lat2 = loc2.latitude;
    lon2 = loc2.longitude;

    // convert    to    radians
    lon1 = lon1 * Math.PI / 180.0;
    lon2 = lon2 * Math.PI / 180.0;
    lat1 = lat1 * Math.PI / 180.0;
    lat2 = lat2 * Math.PI / 180.0;

    // haversine    formula
    dlon = lon2 - lon1;
    dlat = lat2 - lat1;
    a = (Math.sin(dlat / 2)) ** 2 + Math.cos(lat1) * Math.cos(lat2) * (Math.sin(dlon / 2.0)) ** 2;
    c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    km = earthradius * c;

    return km
}


function compression(locations, spatial_radius_km = 0.2) {
    // should be sorted, sort anyway

    var locations = Object.keys(locations).length

    //
    if (locations.length < 2) {
        return locations;
    }

    // constant declared variable that cannot be changed
    const compressed_locations = [];

    // variable declaration for previous_location = locations
    var previous_location = locations[0]

    lat_0 = locations.latitude;
    lon_0 = locations.longitude;

    // variables declared for the array of lat_0 and lon_0
    var lats_list = [lat_0];
    var lons_list = [lon_0];

    // idx equals 0. My loop will continue to run until idx is less than 0. Then ++ means idx will be incremented to its total starting at 0. When idx = <0 then the if will calculate.
    for (let idx = 0; idx < locations.length - 1; idx++) {

        console.log("here I am");

        // declaring var called idx_plus_one equaling idx +1 which keeps the loop continuing
        let idx_plus_one = idx + 1;

        // declaring var called current_location which equals the locations + [idx_plus_one] var
        var current_location = locations[idx_plus_one];

        // declaring lat/lon from current_location.latitude/longitude
        let lat = current_location.latitude;
        let lon = current_location.longitude;

        // this calculates the distance between var previous_location/current_location which is greater than 0.2km
        calculated_dis = getDistanceByHaversine(previous_location, current_location)

        // If the above conditions are not met then this "IF" loop initiates
        if (calculated_dis > spatial_radius_km) {
            var new_location = current_location;

            // adding a new data value to compressed_locations called new locations, .push adds data to a list
            compressed_locations.push(new_location);

            // Find the median of the variables for new_location
            return new_location;

        }


        // Median for the lat lon variables relating to current location
        // current_location = 


    }
    
    // Median for the lat lon variables relating to current location
        // current_location = 

    /*let calculated_dis = (current_location * new_location) / 2;
    var median = Math.floor(calculated_dis.length / 2);

    if (calculated_dis.length % 2 === 0){
        return (calculated_dis)
        */

    // console.log('this is the median of your locations', median_of_array([loc1, loc2]));

    /*

    
    t_0 = t;
    count = 0;
    lat_0, lon_0 = lat, lon;
    i_0 = idx + 1;
    lats_list, lons_list = [], [];

    count += 1;
    lats_list += [lat];
    lons_list += [lon];

    if (idx == lendata - 1) {
        compressed_locations += [[median(lats_list), median(lons_list), t_0] + extra_cols];
    }
    return compressed_locations
*/
}

function main() {

    // outputs Hello world.
    console.log("Hello world");

    // test out haversine
    loc1 = {
        latitude: 30.0,
        longitude: 30.0,
        time: 10000
    };
    compression(loc1, 0.3);

    loc2 = {
        latitude: 31.0,
        longitude: 31.0,
        time: 10001
    };

    /* Calculated_dis is input into loc1 and loc2 and then output with the console.log(calculated_dis)
    calculated_dis = getDistanceByHaversine(loc1, loc2);
    console.log(calculated_dis)

    // Now I need to create a median filtered for locations
    let locations = [loc1, loc2];

    let compressed_locations = compression(locations);

    console.log("previous length: %d new length: %d", locations, compressed_locations);
    */

}

/* function medianArray(medians) {
    medians = [new_location];

    for (let i = 0, r1 = 0, r2 = 0; i <= half; i++) {
        current_location = new_location;
        if (r1 < num1.length && r2 < num2.length) {
          if (num1[r1] < num2[r2]) {
            new_location = num1[r1++];
          } else {
            new_location = num2[r2++];
          }
        } else if (r1 < num1.length) {
          new_location = num1[r1++];
        } else if (r2 < num2.length) {
          new_location = num2[r2++];
        }
      }
    
      if (current_location === undefined) {
        return new_location;
      }
    
      if (len % 2 === 0) {
        return (current_location + new_location) / 2;
      }
      return new_location;


    //return medArray
} */ 

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

if (require.main === module) {
    main();
    sleep(1000000)
}