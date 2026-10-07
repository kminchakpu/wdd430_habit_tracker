"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  className?: string;
  onLogout?: () => void;
}

export default function LogoutButton({
  className = "",
  onLogout,
}: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const data = await response
          .json()
          .catch(() => null);

        throw new Error(
          data?.message ||
            "Unable to log out. Please try again."
        );
      }

      onLogout?.();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to log out. Please try again."
      );

      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoading}
        className={className}
      >
        {isLoading ? "Logging Out..." : "Log Out"}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}