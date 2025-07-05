import { useForm } from "react-hook-form";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import FormFieldError from "../../components/ui/FormFieldError";
import { useState } from "react";
import { useUpdateUserPassword } from "../../features/profile/useUpdateUserPassword";
import Spinner from "../../components/ui/Spinner";
import Modal from "../../components/ui/Modal";
import ConfirmAction from "../../components/ui/ConfirmAction";
import { useDeactivateAccount } from "../../features/profile/useDeactivateAccount";
import { useDeleteAccount } from "../../features/profile/useDeleteAccount";

export default function ProfileSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const { updatePassword, isLoading } = useUpdateUserPassword();
  const { deactivateAccount, isLoading: isDeactivating } =
    useDeactivateAccount();

  const { deleteAccount, isLoading: isDeleting } = useDeleteAccount();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const handlePasswordChange = async (data) => {
    const passwordData = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    updatePassword(passwordData);
    reset();
  };

  const handleDeactivate = async (onSettledCallback) => {
    deactivateAccount(undefined, {
      onSettled: () => {
        onSettledCallback();
      },
    });
  };

  const handleDelete = async (onSettledCallback) => {
    deleteAccount(undefined, {
      onSettled: () => {
        onSettledCallback();
      },
    });
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          My Settings
        </h2>
        <p className="text-gray-600">Manage your account preferences below.</p>
      </div>

      {/* Update Password Section */}
      <section>
        <h3 className="mb-3 text-lg font-medium text-gray-700">
          Change Password
        </h3>
        <form
          onSubmit={handleSubmit(handlePasswordChange)}
          className="space-y-4 rounded-lg bg-white p-6 shadow-[0px_0px_5px_2px_#e2e8f0]"
        >
          <div>
            <label className="block text-sm text-gray-500">
              Current Password
            </label>
            <div className="relative mt-1">
              <Input
                {...register("currentPassword", {
                  required: "This field is required",
                })}
                type={showCurrentPassword ? "text" : "password"}
                disabled={isLoading}
                placeholder="Enter current password"
                className={`w-full rounded border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 hover:shadow-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${errors.currentPassword && "border-red-500 focus:border-red-500 focus:ring-red-500 focus:placeholder:text-slate-400"}`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-sm text-gray-500 hover:text-gray-700"
                aria-label={
                  showCurrentPassword ? "Hide password" : "Show password"
                }
              >
                {showCurrentPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <FormFieldError message={errors.currentPassword.message} />
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500">New Password</label>
            <div className="relative mt-1">
              <Input
                {...register("newPassword", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                  validate: (value) =>
                    value !== watch("currentPassword") ||
                    "New password must be different from current password",
                })}
                type={showNewPassword ? "text" : "password"}
                disabled={isLoading}
                placeholder="Enter new password"
                className={`w-full rounded border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 hover:shadow-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${errors.newPassword && "border-red-500 focus:border-red-500 focus:ring-red-500 focus:placeholder:text-slate-400"}`}
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-sm text-gray-500 hover:text-gray-700"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <FormFieldError message={errors.newPassword.message} />
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500">
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <Input
                {...register("confirmPassword", {
                  required: "This field is required",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                type={showConfirmNewPassword ? "text" : "password"}
                disabled={isLoading}
                placeholder="Re-enter new password"
                className={`w-full rounded border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 hover:shadow-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${errors.confirmPassword && "border-red-500 focus:border-red-500 focus:ring-red-500 focus:placeholder:text-slate-400"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-sm text-gray-500 hover:text-gray-700"
                aria-label={
                  showConfirmNewPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmNewPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <FormFieldError message={errors.confirmPassword.message} />
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="ml-auto block cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Spinner className="mr-2 h-4 w-4 animate-spin text-white" />
                Updating...
              </span>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </section>

      {/* Deactivate Account Section */}
      <section>
        <h3 className="mb-3 text-lg font-medium text-gray-700">
          Deactivate Account
        </h3>
        <div className="rounded-lg bg-white p-6 shadow-[0px_0px_5px_2px_#e2e8f0]">
          <p className="text-sm text-gray-600">
            Temporarily deactivate your account. You can reactivate it by
            logging in again.
          </p>
          <Modal>
            <Modal.OpenBtn opens="deactivate-account">
              <Button
                variant="outline"
                className="mt-3 border-yellow-600 px-4 py-2 text-yellow-700 hover:bg-yellow-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                Deactivate Account
              </Button>
            </Modal.OpenBtn>
            <Modal.Window name="deactivate-account">
              <DeactivationDialog
                isDeactivating={isDeactivating}
                handleDeactivate={handleDeactivate}
              />
            </Modal.Window>
          </Modal>
        </div>
      </section>

      {/* Delete Account Section */}
      <section>
        <h3 className="mb-3 text-lg font-medium text-gray-700">
          Delete Account
        </h3>
        <div className="rounded-lg bg-white p-6 shadow-[0px_0px_5px_2px_#e2e8f0]">
          <p className="text-sm text-red-600">
            Permanently delete your account. This action cannot be undone.
          </p>
          <Modal>
            <Modal.OpenBtn opens="delete-account">
              <Button
                variant="destructive"
                className="mt-3 cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                Delete Account
              </Button>
            </Modal.OpenBtn>
            <Modal.Window name="delete-account">
              <DeletionDialog
                isDeleting={isDeleting}
                handleDelete={handleDelete}
              />
            </Modal.Window>
          </Modal>
        </div>
      </section>
    </div>
  );
}

function DeactivationDialog({
  OnCloseModal,
  isDeactivating,
  handleDeactivate,
}) {
  return (
    <ConfirmAction>
      <ConfirmAction.Title>Account Deactivation</ConfirmAction.Title>

      <ConfirmAction.Body>
        Are you sure you want to{" "}
        <ConfirmAction.Highlight
          variant="highlighted"
          className="text-yellow-700"
        >
          deactivate
        </ConfirmAction.Highlight>{" "}
        your account? You can reactivate it at any time by logging back in.
      </ConfirmAction.Body>

      <ConfirmAction.Actions>
        <button
          disabled={isDeactivating}
          onClick={() => handleDeactivate(OnCloseModal)}
          className="cursor-pointer rounded-md bg-yellow-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-yellow-700 hover:shadow-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeactivating ? (
            <span className="flex items-center justify-center">
              <Spinner className="mr-2 h-4 w-4 animate-spin text-white" />
              Deactivating...
            </span>
          ) : (
            "Deactivate"
          )}
        </button>
      </ConfirmAction.Actions>
    </ConfirmAction>
  );
}

function DeletionDialog({ OnCloseModal, isDeleting, handleDelete }) {
  const [confirmationText, setConfirmationText] = useState("");

  return (
    <ConfirmAction>
      <ConfirmAction.Title>Account Deletion</ConfirmAction.Title>

      <ConfirmAction.Body>
        Are you sure you want to{" "}
        <ConfirmAction.Highlight variant="highlighted" className="text-red-700">
          permanently delete
        </ConfirmAction.Highlight>{" "}
        your account? This action cannot be undone.
      </ConfirmAction.Body>

      <ConfirmAction.Actions>
        <Input
          type="text"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          disabled={isDeleting}
          placeholder="Type 'DELETE' to confirm"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 hover:shadow-none focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none focus:placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        />
        <button
          disabled={isDeleting || confirmationText.toLowerCase() !== "delete"}
          onClick={() => handleDelete(OnCloseModal)}
          className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-600"
        >
          {isDeleting ? (
            <span className="flex items-center justify-center">
              <Spinner className="mr-2 h-4 w-4 animate-spin text-white" />
              Deleting...
            </span>
          ) : (
            "Delete"
          )}
        </button>
      </ConfirmAction.Actions>
    </ConfirmAction>
  );
}
