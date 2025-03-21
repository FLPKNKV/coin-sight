"use client";

import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <ClipLoader size={50} color="#3B82F6" />
        </div>
    );
};

export default LoadingSpinner;
