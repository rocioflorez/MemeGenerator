import React, {useState, useEffect} from 'react';

const Form = () => {

    const [memes, setMemes] = useState([]);
    const [memeIndex, setMemeIndex] = useState(0)

    useEffect(() => {
      fetch('https://api.imgflip.com/get_memes')
      .then(x => x.json())
      .then(response => {
        const memes = response.data.memes;
        setMemes(memes);
      })
    }, [])

    const [text, setText] = useState({
        upperText : '',
        bottomText : ''
    })

    const handleTextChange = (event) => {
        setText({
            ...text,
            [event.target.name] : event.target.value
        });
    }

    return(
        memes.length ? 
        <div>
            <form 
                className='formContainer'
                onSubmit={handleTextChange}
            >
                <input 
                    type='text' 
                    placeholder='Enter text' 
                    name='upperText' 
                    onChange={handleTextChange}
                    className='text'
                />
                <input 
                    type='text' 
                    placeholder='Enter text' 
                    name='bottomText' 
                    onChange={handleTextChange} 
                    className='text'
                />
            </form>

            <div className='memeContainer'>
                <img src={memes[memeIndex].url} alt='meme' className='memeImg'/>
                <span className='upperText'>{text.upperText}</span>
                <span className='bottomText'>{text.bottomText}</span>
                <button 
                    onClick={() => setMemeIndex(memeIndex + 1)}
                    className='refreshBtn'
                >
                    Refresh
                </button>
            </div>
        </div> : <></>
    ) 
}



export default Form