// Home.jsx
import React, { useState, useEffect } from "react";
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    console.log("Contract and wallet address on mount:", {
      contract,
      walletAddress,
    });
  }, [contract, walletAddress]);

  const handleClick = async () => {
    try {
      if (!contract || !walletAddress) {
        console.error("Contract or wallet address is not defined");
        return;
      }

      console.log("Checking if player exists...");
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, { gasLimit: 500000 });

        // setShowAlert({
        //   status: true,
        //   type: 'info',
        //   message: `${playerName} is being summoned!`,
        // });
        setShowAlert({
          status: true,
          type: "info",
          message: `Registering ${playerName}...`,
        });
      }

      // console.log("Registering player...");
    } catch (error) {
      console.error("Error in handleClick:", error);
      setShowAlert({
        status: true,
        type: "failure",
        message: `${error.message}`,
      });
    }
  };

  return (
    walletAddress && (
      <div className="flex flex-col">
        <CustomInput
          label="Name"
          placeHolder="Enter your player name"
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title="Register"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
    )
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avalanche Legends <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game
  </>
);
