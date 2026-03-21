// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import UserMetaCard from "../components/UserProfile/UserMetaCard";
// import PageMeta from "../components/common/PageMeta";
// import { useState, useEffect } from "react";
// import { fetchGetUsers, User } from "../API/API";
// import Button from "../components/ui/button/Button";
// import { Modal } from "../components/ui/modal";
// import { useModal } from "../hooks/useModal";
// import Input from "../components/form/input/InputField";
// import Label from "../components/form/Label";
// import Switch from "../components/form/switch/Switch";

// // import Button from "../ui/button/Button";

// export default function UserProfiles() {
//   const [users, setUsers] = useState<User[]>([]);
//   const { isOpen, openModal, closeModal } = useModal();
//   const [isAdmin, setIsAdmin] = useState(false);

//     const [name, setName] = useState("Name");
//     const [username, setUsername] = useState("Username");
//     const [password, setPassword] = useState("password");
//     const [toggleisAdmin, setToggleIsAdmin] = useState(false);

//   useEffect(() => {
//     fetchGetUsers({ admin: "adii", adminPD: "adutya11@" }).then((data) => {
//       if (data.status === "ok" && data.users) {
//         setUsers(data.users);
//       }
//     });
//   }, []);

//   return (
//     <>
//       <PageMeta
//         title="Users | TuneLog"
//         description="Users dashboard, helps maintain users, Add, Delete users"
//       />
//       <PageBreadcrumb pageTitle="Users" />
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
//         <Button variant="outline" className="mx-10" onClick={openModal}>
//           Add user
//         </Button>
//         <Button variant="outline" className="mr-10 ">
//           Maintain user
//         </Button>

//         <hr className="mt-5" />

//         <div className="space-y-6 mt-5">
//           {users.map((user) => (
//             <UserMetaCard key={user.username} user={user} />
//           ))}
//         </div>
//       </div>

//       <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
//         <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
//           <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
//             <div className="col-span-2 lg:col-span-1">
//               <Label>Name</Label>
//               <Input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <div className="col-span-2 lg:col-span-1">
//               <Label>Username</Label>
//               <Input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>

//             <div className="col-span-2">
//               <Label>Password</Label>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
//             <Switch
//               label="Is Admin"
//               defaultChecked={isAdmin}
//               onChange={(checked) => setToggleIsAdmin(checked)}
//             />
//             <Button size="sm" variant="outline" onClick={closeModal}>
//               Close
//             </Button>
//             <Button size="sm">Create User</Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import PageMeta from "../components/common/PageMeta";
import { useState, useEffect } from "react";
import { fetchGetUsers, fetchCreateUser, User } from "../API/API";
import Button from "../components/ui/button/Button";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import Switch from "../components/form/switch/Switch";

export default function UserProfiles() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, openModal, closeModal } = useModal();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleisAdmin, setToggleIsAdmin] = useState(false);
  const [createError, setCreateError] = useState("");

  const loadUsers = () => {
    setLoading(true);
    fetchGetUsers({ admin: "adii", adminPD: "adutya11@" }).then((data) => {
      if (data.status === "ok" && data.users) {
        setUsers(data.users);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = () => {
    if (!name || !username || !password) {
      setCreateError("All fields are required");
      return;
    }

    fetchCreateUser({
      name,
      username,
      password,
      isAdmin: toggleisAdmin,
      admin: "adii",
      adminPD: "adutya11@",
      email: "",
    }).then((data) => {
      if (data.status === "success") {
        setCreateError("");
        setName("");
        setUsername("");
        setPassword("");
        setToggleIsAdmin(false);
        closeModal();
        loadUsers(); // refresh list after creating
      } else {
        setCreateError(data.reason ?? "Failed to create user");
      }
    });
  };

  return (
    <>
      <PageMeta
        title="Users | TuneLog"
        description="Users dashboard, helps maintain users, Add, Delete users"
      />
      <PageBreadcrumb pageTitle="Users" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <Button variant="outline" className="mx-10" onClick={openModal}>
          Add user
        </Button>
        <Button variant="outline" className="mr-10">
          Maintain user
        </Button>

        <hr className="mt-5" />

        <div className="space-y-6 mt-5">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading users...</p>
          ) : (
            users.map((user) => (
              <UserMetaCard key={user.username} user={user} />
            ))
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <h4 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Create User
          </h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div className="col-span-2 lg:col-span-1">
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Label>Username</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {createError && (
            <p className="mt-3 text-sm text-red-500">{createError}</p>
          )}

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Switch
              label="Is Admin"
              defaultChecked={toggleisAdmin}
              onChange={(checked) => setToggleIsAdmin(checked)}
            />
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="sm" onClick={handleCreateUser}>
              Create User
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}