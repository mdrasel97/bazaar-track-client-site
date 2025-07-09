import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const axiosInstant = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        console.log(user);

        // database connect
        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: data.photo,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        const userRes = await axiosInstant.post("/users", userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: data.photo,
        };
        updateUserProfile(userProfile);
        navigate(from);
        // from reset
        reset();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     const { name, email, photo, password } = formData;

  //     if (!name || !email || !photo || !password) {
  //       toast.error("Please fill in all fields");
  //       return;
  //     }

  //     if (password.length < 6) {
  //       toast.error("Password must be at least 6 characters");
  //       return;
  //     }

  //     // Simulated registration logic
  //     toast.success("Account created successfully!");
  //     navigate("/login");
  //   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md relative mt-5">
        <Link
          to="/"
          className="inline-flex absolute items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">BT</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Create Account
            </CardTitle>
            <p className="text-gray-600">Join Bazaar Track today</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("name", { required: true })}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", { required: true })}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  {...register("photo", { required: true })}
                  id="photo"
                  name="photo"
                  type="text"
                  placeholder="https://your-photo-link.com"
                />
                {errors.photo && (
                  <span className="text-red-500">Photo is required</span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    {...register("password", { required: true })}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <span className="text-red-500">password is required</span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                Register
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
