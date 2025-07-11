import { format, isValid, parse, parseISO } from "date-fns";
import { CameraIcon } from "../../utils/Icons";
import { useOutletContext } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";
import Select from "../../components/ui/Select";
import FormFieldError from "../../components/ui/FormFieldError";
import Input from "../../components/ui/Input";
import { useUpdateUserData } from "../../features/profile/useUpdateUserData";
import Skeleton from "react-loading-skeleton";

export default function ProfileInfo() {
  const [profileMode, setProfileMode] = useState("view"); // "view" or "edit"
  const isEditing = profileMode === "edit";
  const { user } = useOutletContext();
  const { updateUser, isLoading } = useUpdateUserData();

  if (!user) {
    return (
      <div className="flex flex-col gap-10 md:flex-row">
        {/* Profile Image + Button */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-40 w-40 overflow-hidden rounded-full">
              <Skeleton circle width={160} height={160} />
            </div>
            <div className="absolute right-0 bottom-0">
              <Skeleton width={36} height={36} circle />
            </div>
          </div>
          <Skeleton width={120} height={40} borderRadius={8} />
        </div>
        <div className="grid w-full grid-cols-1 gap-6 rounded-lg bg-zinc-200 p-6">
          {Array.from({ length: 6 }).map((_, idx) => {
            if (idx % 2 !== 0) return null;

            return (
              <div
                key={idx}
                className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
              >
                {[idx, idx + 1].map((i) => (
                  <div key={i} className="w-full">
                    <span className="block text-sm text-gray-500">
                      <Skeleton width={80} />
                    </span>
                    <Skeleton height={35} borderRadius={6} className="mt-1" />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const formattedDateOfBirth = (() => {
    const raw = user?.dateOfBirth;
    if (!raw) return "Unknown";

    let parsed;

    // Try ISO format first
    parsed = parseISO(raw);
    if (!isValid(parsed)) {
      // Fallback: Try dd-MM-yyyy
      parsed = parse(raw, "dd-MM-yyyy", new Date());
    }

    return isValid(parsed) ? format(parsed, "MMM dd, yyyy") : "Unknown";
  })();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      const raw = user.dateOfBirth;
      let parsed = parseISO(raw);
      if (!isValid(parsed)) {
        parsed = parse(raw, "dd-MM-yyyy", new Date());
      }
      reset({
        name: user.name,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        skinTone: user.skinTone,
        dateOfBirth: isValid(parsed) ? format(parsed, "yyyy-MM-dd") : "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    const birthDate = new Date(data.dateOfBirth);

    const updatedDOB = isValid(birthDate)
      ? format(birthDate, "dd-MM-yyyy")
      : "";

    const cleaned = {
      ...data,
      dateOfBirth: updatedDOB,
    };

    const changedFields = Object.entries(cleaned).reduce(
      (acc, [key, value]) => {
        const raw = user?.dateOfBirth;
        let parsed = parseISO(raw);
        if (!isValid(parsed)) {
          parsed = parse(raw, "dd-MM-yyyy", new Date());
        }

        const originalValue =
          key === "dateOfBirth" && isValid(parsed)
            ? format(parsed, "dd-MM-yyyy")
            : user?.[key];

        if (value !== originalValue) acc[key] = value;
        return acc;
      },
      {},
    );

    if (Object.keys(changedFields).length === 0) {
      toast("No changes were made.");
      return;
    }

    updateUser(
      { userId: user._id, updateData: changedFields },
      {
        onSuccess: () => {
          setProfileMode("view");
        },
      },
    );
  };

  const cancelEdit = () => {
    reset(); // reset form to initial values
    setProfileMode("view");
  };

  const resetEdit = () => {
    reset(); // reset form to initial values
  };

  const genderOptions = useMemo(
    () => [
      { name: "Male", value: "male" },
      { name: "Female", value: "female" },
    ],
    [],
  );

  const skinToneOptions = useMemo(
    () => [
      { name: "Light", value: "light" },
      { name: "Light to Medium", value: "light to medium" },
      { name: "Medium", value: "medium" },
      { name: "Medium to Dark", value: "medium to dark" },
      { name: "Dark", value: "dark" },
    ],
    [],
  );

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">My Profile</h2>

      <div className="flex flex-col gap-10 md:flex-row">
        {/* Profile Image + Button */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-blue-100 bg-gray-200">
              <img
                src="/user_avatar.png"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <button className="absolute right-0 bottom-0 rounded-full bg-blue-600 p-2 text-white shadow">
              <CameraIcon />
            </button>
          </div>
          <button
            onClick={
              isEditing ? handleSubmit(onSubmit) : () => setProfileMode("edit")
            }
            disabled={isLoading}
            className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Spinner className="mr-2 h-4 w-4 animate-spin text-white" />
                Saving...
              </span>
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Edit Profile"
            )}
          </button>
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          <div
            className={`grid grid-cols-1 gap-6 rounded-lg ${isEditing ? "bg-white shadow-[0px_0px_5px_2px_#e2e8f0]" : "bg-zinc-200"} p-6 md:grid-cols-2`}
          >
            <div>
              <div>
                <span className="block text-sm text-gray-500">Name</span>
                {isEditing ? (
                  <>
                    <input
                      {...register("name", {
                        required: "Name cannot be empty",
                        minLength: {
                          value: 3,
                          message: "Name must have at least 3 characters",
                        },
                        pattern: {
                          value: /^[\p{L}\s]+$/u,
                          message:
                            "Name should only contain letters and spaces",
                        },
                      })}
                      disabled={isLoading}
                      type="text"
                      className={`mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
                    />
                    {errors.name && (
                      <FormFieldError message={errors.name.message} />
                    )}
                  </>
                ) : (
                  <span className="font-medium">{user?.name}</span>
                )}
              </div>
              {isEditing && (
                <div className="mt-4">
                  <span className="block text-sm text-gray-500">Username</span>
                  <input
                    {...register("userName", {
                      required: "Username cannot be empty",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Username can be at most 20 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message:
                          "Username can only contain letters, numbers, and underscores",
                      },
                    })}
                    disabled={isLoading}
                    type="text"
                    className={`mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${errors.userName && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
                  />
                  {errors.userName && (
                    <FormFieldError message={errors.userName.message} />
                  )}
                </div>
              )}
              <div className="mt-4">
                <span className="block text-sm text-gray-500">Email</span>
                {isEditing ? (
                  <>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Please use a valid email address",
                        },
                      })}
                      disabled={isLoading}
                      type="email"
                      className={`mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
                    />
                    {errors.email && (
                      <FormFieldError message={errors.email.message} />
                    )}
                  </>
                ) : (
                  <span className="font-medium">{user?.email}</span>
                )}
              </div>
              <div className="mt-4">
                <span className="block text-sm text-gray-500">Phone</span>
                {isEditing ? (
                  <>
                    <input
                      {...register("phoneNumber", {
                        required: "Phone number cannot be empty",
                        pattern: {
                          value: /^(?:\+20|01)[0-9]{9}$/,
                          message:
                            "Invalid phone number. It should start with +20 or 01 followed by 9 digits.",
                        },
                      })}
                      disabled={isLoading}
                      type="tel"
                      className={`mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${errors.phoneNumber && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
                    />
                    {errors.phoneNumber && (
                      <FormFieldError message={errors.phoneNumber.message} />
                    )}
                  </>
                ) : (
                  <span className="font-medium">{user?.phoneNumber}</span>
                )}
              </div>
            </div>

            <div>
              <div>
                <span className="block text-sm text-gray-500">Gender</span>
                {isEditing ? (
                  <Controller
                    name="gender"
                    disabled={isLoading}
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          className="mt-1 border-gray-300 py-2 transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                          value={field.value}
                          onChange={(val) => field.onChange(val)}
                          options={genderOptions}
                        />
                      </>
                    )}
                  />
                ) : (
                  <span className="font-medium capitalize">{user?.gender}</span>
                )}
              </div>
              <div className="mt-4">
                <span className="block text-sm text-gray-500">Skin tone</span>
                {isEditing ? (
                  <Controller
                    name="skinTone"
                    disabled={isLoading}
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          className="mt-1 border-gray-300 py-2 transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                          value={field.value}
                          onChange={(val) => field.onChange(val)}
                          options={skinToneOptions}
                        />
                      </>
                    )}
                  />
                ) : (
                  <span className="font-medium capitalize">
                    {user?.skinTone}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <span className="block text-sm text-gray-500">
                  Date of Birth
                </span>
                {isEditing ? (
                  <>
                    <Input
                      {...register("dateOfBirth", {
                        validate: (value) => {
                          const today = new Date();
                          const birthDate = new Date(value);
                          const age =
                            today.getFullYear() - birthDate.getFullYear();
                          const ageLimit = 100;

                          // Check for future date
                          if (birthDate > today || age > ageLimit) {
                            return "Please enter a valid birthdate.";
                          }

                          return true; // Validation passes
                        },
                      })}
                      disabled={isLoading}
                      type="date"
                      className={`mt-1 w-full rounded border border-gray-300 bg-transparent px-3 py-2 text-sm transition-colors duration-200 hover:shadow-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
                    />
                    {errors.dateOfBirth && (
                      <FormFieldError message={errors.dateOfBirth.message} />
                    )}
                  </>
                ) : (
                  <span className="font-medium">{formattedDateOfBirth}</span>
                )}
              </div>
            </div>
            {isEditing && (
              <div className="col-span-2 flex justify-end">
                <button
                  onClick={cancelEdit}
                  className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-600 transition-colors duration-200 hover:bg-gray-300/60"
                >
                  Cancel
                </button>
                <button
                  onClick={resetEdit}
                  className="ml-4 cursor-pointer rounded-md border border-red-600 px-4 py-2 text-red-600"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
