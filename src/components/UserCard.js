import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserCard = ({ userInfo, handleFollowToggle }) => {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <div className="user-card">
      <Link to={`/users/${userInfo._id}`}>
        <img
          src={userInfo.picturePath || "/default-avatar.png"}
          alt={`${userInfo.firstName} ${userInfo.lastName}`}
          className="user-card-picture"
        />
        <h3 className="user-card-name">
          {userInfo.firstName} {userInfo.lastName}
        </h3>
      </Link>
      {currentUser._id !== userInfo._id && (
        <button
          className={`user-card-follow-button ${
            userInfo.followers.includes(currentUser._id)
              ? "following"
              : "not-following"
          }`}
          onClick={() => handleFollowToggle(userInfo._id)}
        >
          {userInfo.followers.includes(currentUser._id) ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserCard;
