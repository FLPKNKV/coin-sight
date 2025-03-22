"use client";

import React, { useEffect } from "react";
import { useInputStore } from "../store/store";
import { useRouter } from "next/navigation";
import Button from "../components/Button"; // Assuming this is your reusable button component

export default function GlobalError() {
  const { error } = useInputStore();
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 animate__animated animate__fadeIn animate__faster">
      <div className="bg-white p-6 w-full max-w-md sm:max-w-lg lg:max-w-xl animate__zoomIn animate__faster">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center font-grotesk mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-base sm:text-2xl text-center text-blue-400 font-grotesk mb-4">
          {error?.response?.data?.error || "An unknown error occurred."}
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => router.back()}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
