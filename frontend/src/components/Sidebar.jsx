import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <aside className="h-full w-20 sm:w-72 border-r border-gray-100 bg-white flex flex-col transition-all duration-300">
    
      <div className="border-b border-gray-100 w-full p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-gray-700" />
          <span className="text-sm font-semibold text-gray-900 hidden sm:block">ConnectSphere Contacts</span>
        </div>
        <div className="mt-3 hidden sm:flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">Online only</span>
          </label>
          <span className="text-xs text-gray-400">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

    
      <div className="overflow-y-auto w-full py-3">
        {isUsersLoading ? (
          Array(8)
            .fill(null)
            .map((_, idx) => (
              <div key={idx} className="w-full p-3 flex items-center gap-3">
                <div className="relative mx-auto sm:mx-0">
                  <div className="size-10 rounded-full bg-gray-200 animate-pulse" />
                </div>
                <div className="hidden sm:block text-left min-w-0 flex-1">
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))
        ) : filteredUsers.length === 0 ? (
    
          <div className="text-center text-gray-500 text-sm py-4">
            No {showOnlineOnly ? "online users" : "contacts"} found
          </div>
        ) : (
          
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-indigo-50 transition-colors
                ${selectedUser?._id === user._id ? "bg-indigo-50 ring-1 ring-indigo-100" : ""}
              `}
              aria-label={`Select chat with ${user.name || user.fullName}`}
            >
              <div className="relative mx-auto sm:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={`${user.name || user.fullName}'s avatar`}
                  className="size-10 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                )}
              </div>
              <div className="hidden sm:block text-left min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{user.name || user.fullName}</div>
                <div className="text-xs text-gray-500">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;