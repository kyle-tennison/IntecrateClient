/*
Sometimes the header buttons will show login/signup options,
other times it should display a 'my profile' button
*/

export default function ActionButtons(){

    return (
        <>
            <button id='login-btn' class='header-btn'>Login</button>
            <button id='signup-btn' class='header-btn'>Sign Up</button>
            <div id='profile-btn' class='header-btn'>My Profile</div>
        </>
    )

}