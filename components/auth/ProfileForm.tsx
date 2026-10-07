"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
  name: string;
  email: string;
}

interface ProfileFormProps {
  user: UserProfile;
}

export default function ProfileForm({
  user,
}: ProfileFormProps) {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile>({
    name: user.name,
    email: user.email,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const name = profile.name.trim();
    const email = profile.email.trim().toLowerCase();

    if (!name) {
      setError("Name cannot be empty.");
      return;
    }

    if (!email) {
      setError("Email cannot be empty.");
      return;
    }

    try {
      setIsSaving(true);

      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to update your profile."
        );
      }

      const updatedProfile: UserProfile = {
        name:
          data.user?.name ??
          data.name ??
          name,
        email:
          data.user?.email ??
          data.email ??
          email,
      };

      setProfile(updatedProfile);

      setSuccess(
        "Your profile has been updated successfully."
      );

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update your profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">
          Profile Information
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          View and update your account information.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={profile.name}
            onChange={handleChange}
            autoComplete="name"
            required
            disabled={isSaving}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            autoComplete="email"
            required
            disabled={isSaving}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
          />
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Account Settings
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Update the name and email address associated
            with your account.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4">
            <p className="text-sm leading-6 text-slate-600">
              Your health and financial records remain
              associated with your account when your
              profile information is updated.
            </p>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-200 pt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-40"
          >
            {isSaving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}