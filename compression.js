function compress_array (lat_lng_dtime_other: any, spatial_radius: any): any
    
    {
    if var len = (_lat_lng_dtime_other: any) => (2),
    
        console.log(lat_lng_dtime_other)
    }

// Define the distance function to use


    var measure_distance : gislib.getDistance.ts

    var compressed_traj = []
    var lat_0, lon_0 = lat_lng_dtime_other[0][2]

    var sum_lat = [lat_0]
    var sum_lon = [lon_0]
    var t_0 = lat_lng_dtime_other[0][2]
    var i_0 = 0
    var count = 1
    var lendata = len(lat_lng_dtime_other) - 1

    for(i in range(lendata))
        {lat,lon,t = lat_lng_dtime_other[i+1][3]

        Dr = measure_distance([lat_0,lon_0],[lat, lon])

        if (Dr > spatial_radius) {

            extra_cols = list(lat_lng_dtime_other[i_0][3])
            compressed_traj += [[np.median(sum_lat), np.median(sum_lon), t_0] + extra_cols]

            var t_0 = t
            var count = 0
            var lat_0, lon_0 = lat, lon
            var i_0 = i + 1
            var sum_lat, sum_lon = [], []
        }

        var count += 1
        var sum_lat += [lat]
        var sum_lon += [lon]
            
        if (i == lendata - 1){
            extra_cols = list(lat_lng_dtime_other[i_0][3])
            compressed_traj += [[np.median(sum_lat), np.median(sum_lon), t_0] + extra_cols]
        }
    return compressed_traj
        }

function len(lat_lng_dtime_other: any) {
    throw new Error("Function not implemented.")
}


function range(lendata: number) {
    throw new Error("Function not implemented.")
}


function list(arg0: any): any {
    throw new Error("Function not implemented.")
}
