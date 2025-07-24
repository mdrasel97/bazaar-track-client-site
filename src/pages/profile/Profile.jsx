import useUserRole from "@/hooks/useUserRole";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  const coverImage = "https://i.ibb.co/23KNXtQb/Facebook-Cover-04.png"; // Replace with your own cover photo URL

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-500">No user info found.</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <title>Bazaar Track || Profile</title>
      <Card className="overflow-hidden shadow-lg">
        {/* Cover Photo */}
        <div className="relative h-40 md:h-52 w-full">
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {/* Profile Avatar */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Avatar className="w-24 h-24 border-4 shadow-md">
              <AvatarImage src={user.photoURL} alt={user.displayName} />
              <AvatarFallback>
                {user.displayName?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* User Info */}
        <CardContent className="mt-16 text-center pb-6">
          <h2 className="text-2xl font-semibold">{user.displayName}</h2>
          <p className="">{user.email}</p>
          <p className="text-sm text-blue-600 mt-1">
            {roleLoading ? "Loading role..." : `Role: ${role}`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
