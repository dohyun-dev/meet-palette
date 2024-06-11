import React from "react";
import useFetchMap from "../../hooks/useFetchMap.js";

const KakaoMap = ({ latitude, longitude }) => {
  const { mapRef } = useFetchMap(latitude, longitude);
  return (
    <div
      ref={mapRef}
      style={{ width: "100vw", height: "250px", marginBottom: 22 }}
    ></div>
  );
};

export default KakaoMap;
