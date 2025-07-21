import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signInUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    // console.log(data);
    signInUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        // console.log(user);
        navigate(from);
        toast.success("user sign in successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md relative mt-5">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex absolute items-center gap-2 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <Link to={"/"}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">BT</span>
              </div>
            </Link>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <p className="">Sign in to your Bazaar Track account</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    {...register("password")}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 " />
                    ) : (
                      <Eye className="h-4 w-4 " />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded  text-purple-600 focus:ring-purple-500"
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="#"
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                size="lg"
              >
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className=" px-2 text-sm">Or continue with</span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <GoogleLogin />
              <FacebookLogin />
            </div>

            {/* Signup */}
            <div className="text-center">
              <p className="text-sm ">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
