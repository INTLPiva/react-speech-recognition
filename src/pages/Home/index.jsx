import 'regenerator-runtime/runtime';
import React, { useRef, useState } from 'react';

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import './styles.css';
import microPhoneIcon from '../../assets/microphone.png';

export const Home = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);

  const handleListening = () => {
    setIsListening(true);
    microphoneRef.current.classList.add('listening');
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const handleStopListening = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove('listening');
    SpeechRecognition.stopListening();
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <h1 className="microphone-container">
        O navegador não suporta reconhecimento de voz
      </h1>
    );
  }

  return (
    <div className="microphone-wrapper">
      <div className="microphone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListening}
        >
          <img src={microPhoneIcon} className="microphone-icon" />
        </div>

        <div className="microphone-status">
          {isListening ? 'Ouvindo.........' : 'Clique no microfone para falar'}
        </div>

        {isListening && (
          <button className="microphone-stop btn" onClick={handleStopListening}>
            Pausar
          </button>
        )}
      </div>

      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>

          <button
            className="microphone-reset btn"
            onClick={() => resetTranscript()}
          >
            Resetar
          </button>
        </div>
      )}
    </div>
  );
};
