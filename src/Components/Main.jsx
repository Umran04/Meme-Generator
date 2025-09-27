import { useState, useEffect } from "react"


export default function Main() {

    const [meme,setMeme] = useState({
        imageURL : "http://i.imgflip.com/1bij.jpg",
        topText : 'One does not simply',
        bottomText :  'Walk into Mordor'
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect( () => {
        fetch(`https://api.imgflip.com/get_memes`)
        .then( res => res.json())
        .then( data => {setAllMemes(data.data.memes), console.log(data)})

        
        },[] 
    )

    function getMemeImg (){
        let randomMeme = Math.floor(Math.random() * allMemes.length)
        let memeUrl = allMemes[randomMeme].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageURL : memeUrl
        }))
    }



    function handleChange(event){
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]:value
        }))
    }



    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}   
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}   
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getMemeImg}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageURL} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}