import React from 'react';

import { PageHOC } from '../components';

const CreateBattle = () => {
  return (
    <div>
      <h1 className='text-white text-x1'>hello from create battle</h1>
    </div>
  )
};

export default PageHOC (
    CreateBattle,
  <>Create <br/> a new Battle</>,
  <>Connect your own battle  and waitfor other players to join you</>
);