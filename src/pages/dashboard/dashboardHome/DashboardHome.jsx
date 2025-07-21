import useUserRole from "@/hooks/useUserRole";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import Loading from "../../../components/loading/Loading";
import useAuth from "../../../hooks/useAuth";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import VendorDashboard from "./VendorDashboard";
import Forbidden from "../../../components/forbidden/Forbidden";

const DashboardHome = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (!user || roleLoading) {
    return <Loading />;
  }

  if (role === "user") {
    return <UserDashboard />;
  } else if (role === "vendor") {
    return <VendorDashboard />;
  } else if (role === "admin") {
    return <AdminDashboard />;
  } else {
    return <Forbidden />;
  }

  //   return (
  //     <div className="max-w-4xl mx-auto mt-10 px-4">
  //       <Card className="shadow-md border bg-white">
  //         <CardContent className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6 p-6">
  //           <div className="flex items-center gap-4">
  //             <Avatar className="w-16 h-16">
  //               <AvatarImage src={user.photoURL} alt={user.displayName} />
  //               <AvatarFallback>
  //                 {user.displayName?.charAt(0).toUpperCase() || "U"}
  //               </AvatarFallback>
  //             </Avatar>
  //             <div>
  //               <h2 className="text-xl font-semibold">{user.displayName}</h2>
  //               <p className="text-gray-600 text-sm">{user.email}</p>
  //             </div>
  //           </div>

  //           <div className="text-right">
  //             <p className="text-sm text-gray-500">Current Role</p>
  //             <p className="text-lg font-bold capitalize text-blue-600">{role}</p>
  //           </div>
  //         </CardContent>
  //       </Card>

  //       <div className="mt-8 text-center">
  //         <h3 className="text-2xl font-bold text-gray-800">
  //           Welcome to your Dashboard!
  //         </h3>
  //         <p className="text-gray-500 mt-2">
  //           Use the sidebar to manage your activities and access features based on
  //           your role.
  //         </p>
  //       </div>
  //     </div>
  //   );
};

export default DashboardHome;
