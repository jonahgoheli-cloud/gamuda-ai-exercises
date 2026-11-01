// src/component/PersonalInfo.jsx



function PersonalInfo () {
    // Add your variables here
    const name = "Eli Here!";
    const favoriteLanguage = "JavaScript!";
    const hobbies = ["Consuming Media", "Drawing", "Video games"]
    const currentDateTime = new Date().toLocaleString();
    const imageUrl = "https://i.pinimg.com/originals/e8/f1/2a/e8f12a26c4804ba31bf3dbb4b317b8bb.gif";
    
    const handleButtonClick = () => {
        alert("Hello from Eli!");
    };

    return (
        <div className="personal-card">
            <h1>{name}</h1>
            <p>My Favorite Programming Language is {favoriteLanguage}</p>
            <h3>My Hobbies:</h3>
            <ul className="hobby-list">
                <li>{hobbies[0]}</li>
                <li>{hobbies[1]}</li>
                <li>{hobbies[2]}</li>
            </ul>
            <p>It's currently {currentDateTime}</p>
            <img src ={imageUrl} alt="Profile" className="profile-img" />

            {/* BUTTON ADDED HERE */}
            <div>
                <button className="card-btn" onClick={handleButtonClick}>
                    Contact Me
                </button>
            </div>
        </div>
    );
}

export default PersonalInfo;