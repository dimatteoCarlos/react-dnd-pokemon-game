import './feedback-message.css';

export type feedbackMsgPropType = { feedbackMsg: string };

const FeedbackMsg = ({ feedbackMsg }: feedbackMsgPropType) => {
  return (
    <>
      <div className='msg__container'>
        <p className='feedback__message'>{feedbackMsg}</p>
      </div>
    </>
  );
};

export default FeedbackMsg;
