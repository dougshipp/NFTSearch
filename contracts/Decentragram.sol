pragma solidity ^0.4.4;

import "../IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Decentragram is IERC721, ERC165 {
    string public name;

    // Save address, name, and images of token holder
    mapping (uint256 => address payable) addressTokenHolder;
    mapping (uint256 => string) tokenName;
    mapping(uint256 => Image) public images;
    IERC20 currencyToken;
    IERC721 itemToken;


    struct Image {
        address author;
        uint id;
        string hash;
        string description;
    }

    function fetchTokens(address _tokenAddress, string memory _description) public {
        itemToken = IERC721(_tokenAddress);
    }

}