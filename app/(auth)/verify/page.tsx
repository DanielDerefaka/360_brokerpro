// app/verify/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VerifyPage = ({verifyUser}:any) => {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  useEffect(() => {
    if (userId && secret) {
      // Call a function to update the user's verification status in your database
      verifyUser(userId, secret) 
        .then(() => {
          router.push("/"); // Redirect to the home page after successful verification
        })
        .catch((error:any) => {
          console.error("Verification error:", error);
          // Handle verification errors appropriately
        });
    }
  }, [userId, secret, router]); // Include dependencies in the useEffect array

  // Render a loading state or a verification status message
  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
};

export default VerifyPage;
