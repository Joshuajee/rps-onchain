// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RPSNFTToken is ERC721, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;

    string private tokenUri;

    constructor(string memory _name, string memory _symbol, string memory _tokenURI)  ERC721(_name, _symbol) Ownable()   {
        tokenUri = _tokenURI;
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return tokenUri;
    }

}