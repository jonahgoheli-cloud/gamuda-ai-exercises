function JSXExample() {
    const name = "Eli"
    const isLearning = true
    const skills = ['Javascript', 'React', 'CSS']

    return(
        <div> {/* Single parent element */}
            {/* 1. Embedding Javascript expressions */}
            <h1>Hello, {name}!</h1>

            {/* 2. Conditional rendering */}
            <p>{isLearning? "Currently learning React" : "React expert"}</p>

            {/* 3. Using className instead of class */}
            <div className="skill-container">
                <h3>Skills:</h3>
                {/* 4. Rendering lists */}
                <ul>
                    {skills.map((skill,index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>

            {/* 5. Self-closing tags */}
            <img src="https://external-preview.redd.it/the-uncanny-shocked-freddy-meme-comes-from-one-of-those-v0-eHRzczhmcnZxazdnMYUzeiUwI88-x_ZSCOhosk2lmIgxddkM9JsqC55fFeRp.png?format=pjpg&auto=webp&s=0faa57de44978c422314c1d4ccde0bcd590f7b05"/>
            <br />
            <hr />
        </div>
    )
}

export default JSXExample