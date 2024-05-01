// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Crowdfunding {
    struct Campaign {
        address payable creator;
        string title;
        string description;
        uint goal;
        uint deadline;
        string image;
        uint raised;
        mapping(address => uint) contributions;
        address[] donators;
        uint[] donations;
        bool complete;

    }
    address payable owner;

    constructor(){
        owner= payable(msg.sender);
    }
    uint public numCampaigns;

    mapping (uint => Campaign) public campaigns;
    
   
    function createCampaign(string memory _title, string memory _description, uint _goal,
     uint _deadline, string memory _image) public returns(uint, address , string memory, string memory,uint ,uint ,string memory,uint,bool ) {
        Campaign storage c = campaigns[numCampaigns];

        require(c.deadline < block.timestamp, "The deadlin must be a date in the future.");

        c.creator = payable(msg.sender);
        c.title = _title;
        c.description = _description;
        c.goal = _goal;
        c.deadline = _deadline;
        c.image = _image;
        c.raised = 0 ;
        c.complete = false;

        numCampaigns++;

        return (numCampaigns -1,c.creator,c.title,c.description,c.goal,c.deadline,c.image,c.raised,c.complete);
        }
    
    

    function contribute(uint _campaignIndex) public payable {
        Campaign storage campaign = campaigns[_campaignIndex];
        require(!campaign.complete, "Campaign already complete.");
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.contributions[msg.sender] += msg.value;
        campaign.raised += msg.value;
        if (campaign.raised >= campaign.goal) {
            campaign.complete = true;
            uint ownerTax = campaign.raised / 20; // 5% tax is 1/20th of the contribution
            campaign.creator.transfer(campaign.raised - ownerTax); // transfer contribution minus the owner tax
            owner.transfer(ownerTax); // transfer the owner tax to the owner
            
        }
    }

    function getContribute(uint _campaignIndex) view public returns (address[] memory, uint[] memory){
        return (campaigns[_campaignIndex].donators, campaigns[_campaignIndex].donations);
    }


    function getCampaigns() view public returns (address[] memory, string[] memory, string[] memory, uint[] memory, uint[] memory, string[] memory, uint[] memory, bool[] memory) {
        address[] memory creators = new address[](numCampaigns);
        string[] memory titles = new string[](numCampaigns);
        string[] memory descriptions = new string[](numCampaigns);
        uint[] memory goals = new uint[](numCampaigns);
        uint[] memory deadlines = new uint[](numCampaigns);
        string[] memory images = new string[](numCampaigns);
        uint[] memory raisedAmounts = new uint[](numCampaigns);
        bool[] memory isComplete = new bool[](numCampaigns);
        
        for (uint i = 0; i < numCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            creators[i] = campaign.creator;
            titles[i] = campaign.title;
            descriptions[i] = campaign.description;
            goals[i] = campaign.goal;
            deadlines[i] = campaign.deadline;
            images[i] = campaign.image;
            raisedAmounts[i] = campaign.raised;
            isComplete[i] = campaign.complete;
        }
        
        return (creators, titles, descriptions, goals, deadlines, images, raisedAmounts, isComplete);
    }



}



//שלבים להעלאת החוזה
//truffle migrate --reset 
//דריסת החוזה הקודם ויצירת חוזה חדש
//truffle console
//העלאת החוזה לגאנש
//const instance = await Crowdfunding.deployed()

//instance.createCampaign("A","aa","50","6","aaaa", {from: accounts[0]})
//instance.createCampaign("B","bb","40","5","bbbb", {from: accounts[1]})
//instance.getCampaigns()

//instance.contribute("1",{value:"500000000000000000", from: accounts[1]})
//instance.getContribute("1")







