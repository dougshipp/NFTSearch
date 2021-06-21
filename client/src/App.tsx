import React, {useEffect, useState} from "react";
import "./App.css";
import axios from "axios";
import Web3 from 'web3';

declare let window: any;

type Image = {
    id: string,
    tokenId: string,
    name: string,
    image_url: string,
    description: string,
}

const getAccount = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    return await window.web3.eth.getAccounts().then()
}

export default function App(): JSX.Element {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<Image[]>([]);
    const [userAccount, setUserAccount] = useState("")

    useEffect(() => {
        if (!loading) {
            setLoading(true)

            getAccount().then(account => {
                setUserAccount(account)
            })

            fetchData(userAccount)
        }
    },[loading, userAccount])


    const fetchData = async (userAccount: string) => {
        const url = `https://api.opensea.io/api/v1/assets?owner=${userAccount}&order_direction=desc&offset=0&limit=20`;
        const {data} = await axios.get(url)
        const assets = data.assets
        setImages(assets)
        console.log("assets:", assets)
    }

        return (
            <div className='App'>
                <h1>{userAccount}</h1>
                <div className="body">
                    {images.length > 0 ? (
                        <div className="content">
                            {images.map((image,imageIdx) => (
                                <div className="wrapper">
                                <img src={image.image_url} key={imageIdx} alt="text"/>
                                <h2>{image.name}</h2>
                                <p>{image.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="loading">Loading... </p>
                    )}
                </div>
            </div>
        )
}
/*render() {
    if (!this.state.account) {
        return <span>Loading...</span>;
    }
    return (
        <div className="container">
            <h1>Hello {this.state.account}</h1>
            <span>Hello</span>
        </div>
    )

}*/
