
import PokeBtn from './PokeBtn';
import './game-over.css';

export type GameOverPropType = {
  setGameover: React.Dispatch<React.SetStateAction<boolean>>;
  gameoverMsg:string;
};
const GameOver = ({ setGameover, gameoverMsg }: GameOverPropType) => {
  
  return (
    <>
      <div className='msg__container__gameOver'>
        <p className='gameOver__message'>{gameoverMsg}</p>
      </div>
      <PokeBtn setGameover={setGameover} />
    </>
  );
};

export default GameOver;
