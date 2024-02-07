import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetUser } from "../context/slicers";

const Layout = ({ children }) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetUser())
  }, [dispatch]);

  return <>{children}</>;
};

export default Layout;
