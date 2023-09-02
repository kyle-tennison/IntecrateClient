/*
Sometimes the header buttons will show login/signup options,
other times it should display a 'my profile' button
*/

export default function ActionButtons(){

    return (
        <>
            <button id='signup-btn' class='header-btn'>Sign Up</button>
            <button id='login-btn' class='header-btn'>Login</button>
            <div id='profile-btn' class='header-btn'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" />
                <a>My Profile</a>
            </div>
        </>
    )

}