
import PokeBtn from './PokeBtn';
import './game-over.css';

export type GameOverPropType=
{setGameover:React.Dispatch<React.SetStateAction<boolean>>}
const GameOver = ({ setGameover }:GameOverPropType) => {
  return (
    <>
      <div className='msg__container__gameOver'>
        <p className='gameOver__message'>Game Over!</p>
      </div>
      <PokeBtn setGameover={setGameover} />
    </>
  );
};

export default GameOver;
