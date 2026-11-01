// src/component/UserCard.jsx
import  "./UserCard.css";

function UserCard({ id, name, email, role }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{role}</p>
    </div>
  );
}

export default UserCard;