import { Link } from 'react-router-dom';

export default function () {
  return (
    <ul>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/profile">
        <li>Profile</li>
      </Link>
      <Link to="/review">
        <li>Review</li>
      </Link>
    </ul>
  );
}
