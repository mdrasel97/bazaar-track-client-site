import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../../components/footer/Footer";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/loading/Loading";

const MainLayout = () => {
  const { loading } = useAuth();

  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loading />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar />
      <div className="min-h-[190px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
