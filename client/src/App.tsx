import React, {useEffect, useState} from "react";
import "./App.css";
import axios from "axios";

declare let window: any;
let Web3 = require('web3');

const fetchData = (userAccount: String) => {
    const url = `https://api.opensea.io/api/v1/assets?owner=${userAccount}&order_direction=desc&offset=0&limit=20`;
    const data = axios.get(url)
        .then(res => {
            console.log(res.data)
                const {assets} = res.data
                console.log(assets)
                assets.forEach()
                return assets
            }
        )
        .catch(err => console.error('error:' + err));
    console.log(data)
}

const getAccount = async () => {


    Web3 = window.web3
    if (window.ethereum !== 'undefined') {
        Web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    const account = await Web3.eth.getAccounts().then()
    //setUserAccount(account)
    return account
}

export default function App(): JSX.Element {
    const [images, setImages] = useState([]);
    const [userAccount, setUserAccount] = useState("")

    const account = getAccount()

    useEffect(() => {

         fetchData(account).then( image => {
            setImages(image.imageUrl);
        });
    }, [account])

    return (
        <div>
            <h1>{userAccount}</h1>
            {images.map((image, imageIdx) => {
                return(
                    <img src={image} key={imageIdx} alt="text" />
                )
            }
            )}
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
