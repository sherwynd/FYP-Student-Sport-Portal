export default function ProfileId() {
  const profileData = {
    name: "John Doe",
    gender: "Male",
    address: "1234 Elm Street, Springfield, USA",
    university: "Springfield University",
    grade: "Sophomore",
    height: "180 cm",
    weight: "75 kg",
    bloodType: "O+",
    dob: "2002-05-15", // Date of Birth in YYYY-MM-DD format
  };

  // Utility function to calculate age
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    return monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;
  };

  const age = calculateAge(profileData.dob); // Calculate age from DOB

  return (
    <>
      <h1 className="mb-4 text-center text-2xl font-bold">
        Profile Information
      </h1>
      <div className="space-y-4">
        {/* Basic Info */}
        <div>
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            Basic Information
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div>
              <span className="font-bold">Gender:</span> {profileData.gender}
            </div>
            <div>
              <span className="font-bold">Date of Birth:</span>{" "}
              {profileData.dob}
            </div>
            <div>
              <span className="font-bold">Age:</span> {age} years
            </div>
            <div className="col-span-2">
              <span className="font-bold">Address:</span> {profileData.address}
            </div>
          </div>
        </div>

        {/* Education Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Education</h2>
          <div className="mt-2 text-gray-600">
            <p>
              <span className="font-bold">University/School:</span>{" "}
              {profileData.university}
            </p>
          </div>
        </div>

        {/* Physical Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Physical Details
          </h2>
          <div className="mt-2 grid grid-cols-2 gap-4 text-gray-600">
            <div>
              <span className="font-bold">Height:</span> {profileData.height}
            </div>
            <div>
              <span className="font-bold">Weight:</span> {profileData.weight}
            </div>
            <div>
              <span className="font-bold">Blood Type:</span>{" "}
              {profileData.bloodType}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
