import {useEffect, useState} from 'react'
import NavBar from '../components/Navbar'

const SearchHistoryPage = () => {
    const [searchHistory, setSearchHistroy] = useState([])

    useEffect(() => {

        const getHistory = async () => {
            try {
                const res = await axios.get('/api/search/history')
                setSearchHistroy(res.data.content)
                
            } catch (error) {
                console.log(error.message)
                setSearchHistroy([])
            }
        }

        getHistory()
    }, [])

    if(!searchHistory.length){
        <div className="bg-black min-h-screen text-white">
            <NavBar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className='text-3xl font-bold mb-8'>Search history</h1>
                <div className="flex justify-center items-center h-96">
                    <p className="text-xl">No Search History Found</p>
                </div>
            </div>
        </div>
    }


  return (
    <div className='bg-black text-whitee min-h-screen'>
        <NavBar />
    </div>
  )
}

export default SearchHistoryPage