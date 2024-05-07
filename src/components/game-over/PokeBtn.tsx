import React from 'react';
import './poke-btn.css';

export type PokeBtnPropType = {
  setGameover: React.Dispatch<React.SetStateAction<boolean>>;
};
const PokeBtn = ({ setGameover }: PokeBtnPropType) => {
  function handleReload(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    e.preventDefault();

    setGameover(false);
    window.location.reload();
  }

  return (
    <>
      <div className='poke__btn'>
        <img
          className='pokeball__btn'
          src='/pokeball_btn.jpg'
          alt='pokeball_btn'
          onClick={(e) => handleReload(e)}
        />
      </div>
    </>
  );
};

export default PokeBtn;
