import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/20/solid";
import { useEffect, useState, useRef } from "react";

export default function ReadAloudPlayer({
  text,
  highlightedSentence,
  setHighlightedSentence,
}) {
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sentencesRef = useRef([]);
  const indexRef = useRef(0);
  const stoppedRef = useRef(false);

  const stopSpeech = () => {
    stoppedRef.current = true;
    synthRef.current.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    indexRef.current = 0;
    setHighlightedSentence("");
  };

  const speakNext = () => {
    if (stoppedRef.current || indexRef.current >= sentencesRef.current.length) {
      setIsSpeaking(false);
      setHighlightedSentence("");
      return;
    }

    const sentence = sentencesRef.current[indexRef.current];
    const utterance = new SpeechSynthesisUtterance(sentence);
    utteranceRef.current = utterance;

    utterance.onstart = () => {
      setHighlightedSentence(sentence);
    };

    utterance.onend = () => {
      if (stoppedRef.current) return;
      indexRef.current++;
      speakNext();
    };

    synthRef.current.speak(utterance);
  };

  const startSpeech = () => {
    stoppedRef.current = false;

    // Initialize only once
    if (sentencesRef.current.length === 0) {
      sentencesRef.current = text.match(/[^.!?]+[.!?]+[\])'"`’”]*|.+$/g) || [
        text,
      ];
    }

    setIsSpeaking(true);
    setIsPaused(false);
    speakNext();
  };

  const togglePlayPause = () => {
    if (synthRef.current.speaking && !synthRef.current.paused) {
      // Pause if currently speaking
      synthRef.current.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    } else if (synthRef.current.paused) {
      // Resume if paused
      synthRef.current.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    } else {
      // Fresh start
      stopSpeech(); // reset just in case
      sentencesRef.current = [];
      indexRef.current = 0;
      startSpeech();
    }
  };

  return (
    <div className="flex items-center gap-4 text-white">
      <button className="cursor-pointer" onClick={togglePlayPause}>
        {isSpeaking ? (
          <PauseIcon className="inline-block h-8 w-8" />
        ) : (
          <PlayIcon className="inline-block h-8 w-8" />
        )}
      </button>
      <button className="cursor-pointer" onClick={stopSpeech}>
        <StopIcon className="inline-block h-8 w-8" />
      </button>
    </div>
  );
}
