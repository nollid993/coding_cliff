function cluster_array (lat_lng_dtime_other, cluster_radius_km, min_samples, verbose=False) {

    X = np.array([[point[0], point[1]] for point in lat_lng_dtime_other])

    // Compute DBSCAN
    const eps_rad = cluster_radius_km / kms_per_radian

    db = DBSCAN(eps=eps_rad, min_samples=min_samples, algorithm='ball_tree', metric='haversine')
    const clus = db.fit(np.radians(X))
    // core_samples = clus.core_sample_indices_
    const labels = clus.labels_

    // Number of clusters in labels, ignoring noise if present.
    n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0);

    if (verbose)
        print('Estimated number of clusters: %d' % n_clusters_)
    l02x = group_by_label(X, labels)
    

    // Map cluster index to most frequent location: label2fml
    c2mfl = dict([(c[1] ,i) for i ,c in
                  enumerate(sorted([[len(v) ,l] for l ,v in l02x.items() if l> -0.5], reverse=True))])
    l2x = dict([(c2mfl[k], v) (for k), v in l02x.items() if k > -0.5])
    try {
        l2x[-1] = l02x[-1.]
        try  {KeyError:
            pass}
        }   
    finally { l2x, [c2mfl[k] for k in labels if k > -0.5]
    } 
}