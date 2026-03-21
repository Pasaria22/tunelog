import { useModal } from "../../hooks/useModal";
import { User } from "../../API/API";

interface Props {
  user: User;
}

export default function UserMetaCard({ user }: Props) {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src="/images/user/owner.jpg" alt="user" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user.username}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.isAdmin ? "Admin" : "User"}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Listens : 103 songs
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              <p className="flex h-11 items-center justify-center gap-2 rounded bg-white font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                skips : 133 songs |
              </p>
              <p className="flex h-11 items-center justify-center gap-2 rounded bg-white font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                repeat : 133 songs |
              </p>
              <p className="flex h-11 items-center justify-center gap-2 rounded bg-white font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                complete : 133 songs |
              </p>
              <p className="flex h-11 items-center justify-center gap-2 rounded bg-white font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                partial : 133 songs |
              </p>
              <p className="flex h-11 items-center justify-center gap-2 rounded bg-white font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                last logged : 12/2/2020 |
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
