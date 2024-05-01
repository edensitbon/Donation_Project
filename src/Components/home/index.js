import { ethers } from "ethers";
import { useState, useEffect } from "react";
import CampaignsCard from "../../units/allCampaigns";
import { getContractInstance } from "../../utils/get-contract-instance";
import "./styles.css";
const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const getCampaignsData = async () => {
    try {
      const contract = getContractInstance();
      const campaignsData = await contract.getCampaigns();
      console.log(campaignsData, "first");
      const creators = campaignsData[0];
      const converted = creators.map((creator, i) => {
        return {
          index: i,
          creator: creator,
          title: campaignsData[1][i],
          description: campaignsData[2][i],
          goal: ethers.utils.formatEther(campaignsData[3][i]),
          deadlines: campaignsData[4][i],
          image: campaignsData[5][i],
          raisedAmount: ethers.utils.formatEther(campaignsData[6][i]),
          isComplete: campaignsData[7][i],
        };
      });

      setCampaigns(converted);
      console.log(converted, "all campaigns");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCampaignsData();
  }, []);

  return (
    <div className="campaings-page">
      <h1 className="title">All campaigns</h1>
      <div className="center">
        <div className="grid-container">
          {campaigns &&
            campaigns.map((campaign) => (
              <div className="cards" key={campaign.index}>
                <CampaignsCard
                  index={campaign.index}
                  creators={campaign.creator}
                  title={campaign.title}
                  image={campaign.image}
                  isComplete={campaign.isComplete}
                  raisedAmounts={campaign.raisedAmount}
                  deadlines={campaign.deadlines}
                  description={campaign.description}
                  goal={campaign.goal}
                  onTxComplete={getCampaignsData}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllCampaigns;
