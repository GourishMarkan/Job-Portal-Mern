import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-7 w-full min-h-96">
      <h3 className="text-3xl font-semibold text-yellow-200">My Profile</h3>
      <div className="flex flex-col gap-2 relative">
        {/* <label htmlFor="" className="text-3xl font-medium">
          <input type="text" disabled value={user.name} />
        </label> */}
        <label htmlFor="" className="text-3xl font-medium">
          Name
        </label>

        <input
          type="text"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          disabled
          value={user && user.name}
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="" className="text-3xl font-medium">
          Email Address
        </label>

        <input
          type="text"
          className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
          disabled
          value={user && user.email}
        />
      </div>
      {/* <div className="flex flex-col gap-2 relative">
        <p className=" text-3xl ">
          <span className="text-3xl font-medium">Email:</span> {user.email}
        </p>
      </div> */}
      {user && user.role === "Job Seeker" && (
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="" className="text-3xl font-medium">
            My Preferred Job Niches
          </label>
          <div className="flex flex-col gap-3.5">
            <input
              type="text"
              className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
              disabled
              value={user && user.niches.firstNiche}
            />
            <input
              type="text"
              className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
              disabled
              value={user && user.niches.secondNiche}
            />
            <input
              type="text"
              className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
              disabled
              value={user && user.niches.thirdNiche}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="" className="text-3xl font-medium">
              Phone Number
            </label>

            <input
              type="text"
              className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
              disabled
              value={user && user.phoneNumber}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="" className="text-3xl font-medium">
              Address
            </label>

            <input
              type="text"
              className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
              disabled
              value={user && user.address}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="" className="text-3xl font-medium">
              Role
            </label>

            <input
              type="text"
              className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
              disabled
              value={user && user.role}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="" className="text-3xl font-medium">
              Joined On
            </label>

            <input
              type="text"
              className="py-2 px-1 bg-[#8080805e] border-none text-[#555]"
              disabled
              value={user && user.createdAt.split("T")[0]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
