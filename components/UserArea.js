import { useEffect, useState } from "react";
import UserLinks from "./UserLinks";
import { SignOut, useUser } from "../hooks/authUser";

export default function UserArea() {
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      SignOut();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      {user && (
        <>
          <h1>User area</h1>
          <p>{user.email}</p>
          <button
  
            onClick={handleLogout}
          >
            Logout
          </button>
          <h2>Links</h2>
          <UserLinks user_id={user.id} />
        </>
      )}
    </div>
  );
}
