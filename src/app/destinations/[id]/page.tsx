import Image from "next/image";

const DestinationsDetails = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  const res = await fetch(`http://localhost:8000/destination/${id}`);
  const destination = await res.json();

  return (
    <div>
      <h1>{destination.country}</h1>
      {/* <Image src={destination.imageUrl} alt="" width={400} height={400}></Image> */}
    </div>
  );
};

export default DestinationsDetails;
