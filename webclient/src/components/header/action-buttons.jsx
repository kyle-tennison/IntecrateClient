/*
Sometimes the header buttons will show login/signup options,
other times it should display a 'my profile' button
*/

export default function ActionButtons() {
  return (
    <>
      <button
        id="signup-btn"
        className="header-btn"
        onClick={() => {
          window.location.href = "/signup";
        }}
      >
        Sign Up
      </button>
      <button
        id="login-btn"
        className="header-btn"
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        Login
      </button>
      <div
        id="profile-btn"
        className="header-btn"
        onClick={() => {
          window.location.href = "/profile";
        }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" />
        <a>My Profile</a>
      </div>
    </>
  );
}
