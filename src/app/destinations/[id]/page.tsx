import React from "react";

const DestinationsDetails = async ({ params }) => {
  const { id } = await params;

  console.log(id);

  return <div></div>;
};

export default DestinationsDetails;
