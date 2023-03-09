function stay_locations_trajectory (tdf, stop_radius, minutes_for_a_stop, leaving_time, no_data_for_minutes, min_speed_kmh){
    // From dataframe convert to numpy matrix
        lat_lng_dtime_other = list(utils.to_matrix(tdf))
        columns_order = list(tdf.columns)

        stay_locations, leaving_times = _stay_locations_array(lat_lng_dtime_other, stop_radius,
                                        minutes_for_a_stop, leaving_time, no_data_for_minutes, min_speed_kmh)

    // print(utils.get_columns(data))
    // stay_locations = utils.to_dataframe(stay_locations, utils.get_columns(data))
        stay_locations = nparray_to_trajdataframe(stay_locations, utils.get_columns(tdf), {})

    // Put back to the original order
    stay_locations = stay_locations[columns_order]

    if (leaving_time)
        stay_locations.loc[:, constants.LEAVING_DATETIME] = pd.to_datetime(leaving_times)

    return stay_locations

}

    // From dataframe convert to numpy matrix
    lat_lng_dtime_other = list(utils.to_matrix(tdf))
    columns_order = list(tdf.columns)

    stay_locations, leaving_times = _stay_locations_array(lat_lng_dtime_other, stop_radius,
                                    minutes_for_a_stop, leaving_time, no_data_for_minutes, min_speed_kmh)

    // print(utils.get_columns(data))
    // stay_locations = utils.to_dataframe(stay_locations, utils.get_columns(data))
    stay_locations = nparray_to_trajdataframe(stay_locations, utils.get_columns(tdf), {})

    // Put back to the original order
    stay_locations = stay_locations[columns_order]

    if (leaving_time)
        stay_locations.loc[:, constants.LEAVING_DATETIME] = pd.to_datetime(leaving_times)

    return stay_locations


function stay_locations_array (lat_lng_dtime_other, stop_radius, minutes_for_a_stop, leaving_time, no_data_for_minutes, min_speed_kmh){

    // Define the distance function to use, Is this through the haversine everytime?
    const measure_distance = gislib.getDistance

    const stay_locations = []
    const leaving_times = []

    // Not sure how to break out this array
    lat_0, lon_0, t_0 = lat_lng_dtime_other[0][3]

    sum_lat = [lat_0]
    sum_lon = [lon_0]
    sum_t = [t_0]
    const speeds_kmh = []

    count = 1
    var lendata = len(lat_lng_dtime_other) - 1

    for (var i in range(lendata))

        lat, lon, t = lat_lng_dtime_other[i+1][:3]

        if (utils.diff_seconds(lat_lng_dtime_other[i][2], t) / 60. > no_data_for_minutes)
            //No data for more than `no_data_for_minutes` minutes: Not a stop
            count = 0
            lat_0, lon_0, t_0 = lat, lon, t
            sum_lat, sum_lon, sum_t = [], [], []
            speeds_kmh = []

        Dt = utils.diff_seconds(t_0, t) / 60.
        Dr = measure_distance([lat_0, lon_0], [lat, lon])
        try {
            speeds_kmh += [Dr / Dt * 60.]
            catch {ZeroDivisionError
                speeds_kmh += [0.]
            }

        }

        try { Dr > stop_radius || i == lendata - 1;
            if  Dt > minutes_for_a_stop or i == lendata - 1;                
                extra_cols = list(lat_lng_dtime_other[i][3:])

                //estimate the leaving time
                if (min_speed_kmh is None:
                    estimated_final_t = t)
                else (
                    j = 1
                    for (j in range(1, len(speeds_kmh)))
                        if (speeds_kmh[-j] < min_speed_kmh)
                            break
                    if (j == 1)
                        estimated_final_t = t
                    else (
                        estimated_final_t = sum_t[-j + 1]
                        sum_lat = sum_lat[:-j];
                        sum_lon = sum_lon[:-j];
                    )
                )

                if len(sum_lat) > 0 and utils.diff_seconds(t_0, estimated_final_t) / 60. > minutes_for_a_stop:
                    if (leaving_time)
                        leaving_times.append(estimated_final_t)

                    stay_locations += [[np.median(sum_lat), np.median(sum_lon), t_0] + extra_cols]

                count = 0
                lat_0 = lat
                lon_0 = lon 
                t_0 = t
                sum_lat, sum_lon, sum_t = [], [], []
                speeds_kmh = []
            else
                // Not a stop
                count = 0
                lat_0, lon_0, t_0 = lat, lon, t
                sum_lat, sum_lon, sum_t = [], [], []
                speeds_kmh = []
        }
        count += 1
        sum_lat += [lat]
        sum_lon += [lon]
        sum_t += [t]

    return stay_locations, leaving_times

}

function main (){

}

