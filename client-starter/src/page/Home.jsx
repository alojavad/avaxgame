import React from 'react';

import { useGlobalContext } from '../context';
import { PageHOC, CustomInput } from '../components';

const Home = () => {
  const {contract, walletAddress} = useGlobalContext();
  const [playerName, setPlayerName] = useState('')

  return (
    <div className="flex flex-col">
      <CustomInput/>
    </div>
  )
};

export default PageHOC(
  Home,
  <>Welcome to Avax Gods <br/> a Web3 NFT Card Game</>,
  <>Connect your wallet to start playing<br/>The ultimate Web3 Battle Card Game</>
);