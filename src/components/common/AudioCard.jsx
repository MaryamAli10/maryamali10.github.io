import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";

import {
  ListOrdered,
  Calendar,
  FileMusic,
  Play,
  Pause,
  FastForward,
  Rewind,
  Download,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours > 0 ? hours.toString() + ":" : "";
  const formattedMinutes = minutes.toString().padStart(2, "0") + ":";
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
}

function PlayBtn({ onClick }) {
  return (
    <button onClick={onClick}>
      <Play strokeWidth={0} size={24} fill="#262626" />
    </button>
  );
}

function PauseBtn({ onClick }) {
  return (
    <button onClick={onClick}>
      <Pause strokeWidth={0} size={24} fill="#262626" />
    </button>
  );
}

// break-up into 2 components
function AudioCard({ src, title, size, part, date }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function handleSeek(e) {
    const seekTime = Math.floor(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  }

  function handleFastForward() {
    if (currentTime + 10 >= duration) {
      setCurrentTime(duration);
      audioRef.current.currentTime = duration;
    } else {
      let newCurrentTime = currentTime + 10;
      setCurrentTime(newCurrentTime);
      audioRef.current.currentTime = newCurrentTime;
    }
  }

  function handleRewind() {
    if (currentTime <= 5) {
      setCurrentTime(0);
      audioRef.current.currentTime = 0;
    } else {
      let newCurrentTime = currentTime - 5;
      setCurrentTime(newCurrentTime);
      audioRef.current.currentTime = newCurrentTime;
    }
  }

  function playAudio() {
    audioRef.current.play();
    setIsPlaying(true);
  }

  function pauseAudio() {
    audioRef.current.pause();
    setIsPlaying(false);
  }

  useEffect(() => {
    const audio = audioRef.current;

    const timeUpdate = () => {
      setCurrentTime(Math.floor(audio.currentTime));
    };
    const durationUpdate = () => {
      setDuration(Math.floor(audio.duration));
    };
    audio.addEventListener("timeupdate", timeUpdate);
    audio.addEventListener("loadedmetadata", durationUpdate);
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      audio.removeEventListener("timeupdate", timeUpdate);
      audio.removeEventListener("loadedmetadata", durationUpdate);
      audio.removeEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    };
  }, []);

  return (
    <Card className="grid pt-2 bg-neutral-100 border-2 border-neutral-700 ring-2 ring-neutral-100">
      <CardHeader className="justify-center items-center text-center">
        <CardDescription className="flex flex-row gap-2 sm:gap-4 text-sm justify-center">
          <span className="flex flex-row">
            <Calendar size={16} strokeWidth={1.75} />
            {date}
          </span>
          <span className="flex flex-row">
            <ListOrdered size={16} strokeWidth={1.75} />
            {Array.isArray(part) ? part.join(",") : part}
          </span>
          <span className="flex flex-row">
            <FileMusic size={16} strokeWidth={1.75} />
            {size}
          </span>
        </CardDescription>
        <CardTitle className="text-neutral-800 font-[EB-Garmond] text-xl font-medium">
          <h2>{title}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <audio ref={audioRef} src={src} preload="metadata" />
        <div className="flex flex-row gap-2 items-center">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            className="w-full h-1 cursor-pointer accent-neutral-800"
            value={Math.floor(currentTime)}
            min="0"
            max={Math.floor(duration)}
            onChange={(e) => {
              handleSeek(e);
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>
        <div
          id="btnGroup"
          className="flex flex-row  items-center justify-center gap-4 mt-2 text-neutral-800"
        >
          <div id="AudioPlayerControls" className="flex gap-4 ">
            <button>
              <Rewind
                strokeWidth={0}
                size={20}
                fill="#262626"
                onClick={handleRewind}
              />
            </button>
            {isPlaying ? (
              <PauseBtn onClick={pauseAudio} />
            ) : (
              <PlayBtn onClick={playAudio} />
            )}
            <button>
              <FastForward
                strokeWidth={0}
                size={20}
                fill="#262626"
                onClick={handleFastForward}
              />
            </button>
          </div>
          <button className="justify-self-end">
            <a href={src} target="_blank" download>
              <Download strokeWidth={3} size={20} className="neutral-800" />
            </a>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AudioCard;
