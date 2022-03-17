import { useEffect, useRef, useState } from "react"

export default function App() {
    const [userData, setUserData] = useState()
    const [repoData, setRepoData] = useState()
    const userNameRef = useRef()

    useEffect(() => {


    }, [])

    function handleSearchClick(e) {
        e.preventDefault()
        fetch(`https://api.github.com/users/${userNameRef.current.value}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data)
            }).catch(err => {
            })
        fetch(`https://api.github.com/users/${userNameRef.current.value}/repos?per_page=1000`)
            .then(res => res.json())
            .then(data => {
                setRepoData(data)
            }).catch(err => {
            })
    }

    if (!userData || !repoData) {
        return <div className="container">
            <h1>Github Search</h1>
            <form>
                <input type="text" placeholder="GitHub Username" ref={userNameRef}></input>
                <button onClick={handleSearchClick}>search</button>
            </form>
        </div>
    }

    if (userData.message === "Not Found") {
        return <div className="container">
            <h1>Github Search</h1>
            <form>
                <input type="text" placeholder="GitHub Username" ref={userNameRef}></input>
                <button onClick={handleSearchClick}>search</button>
            </form>
            <p>No data found...</p>
        </div>
    }

    if (repoData.message.includes("API rate limit")) {
        return <div className="container">
            <h1>Github Search</h1>
            <form>
                <input type="text" placeholder="GitHub Username" ref={userNameRef}></input>
                <button onClick={handleSearchClick}>search</button>
            </form>
            <p>API Limit...</p>
        </div>
    }


    const repoHeader = <img alt="" src={userData.avatar_url} />

    const repoDataHTML = repoData.map(item => {
        return <div className="result-item" key={item.name}>
            <h2>{item.name}</h2>
        </div>
    })

    return <div className="container">
        <h1>Github Search</h1>
        <form>
            <input type="text" placeholder="GitHub Username" ref={userNameRef}></input>
            <button onClick={handleSearchClick}>search</button>
        </form>
        <div className="result-container">
            {repoHeader}
            <div>
                {repoDataHTML}
            </div>
        </div>
    </div>


}