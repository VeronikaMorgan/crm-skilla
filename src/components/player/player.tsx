import React, { FC, useEffect, useState, useRef } from "react";
import { ReactComponent as PlaySVG } from '../../images/icons/player/play.svg';
import { ReactComponent as PauseSVG } from '../../images/icons/player/pause.svg';
import { ReactComponent as DownloadSVG } from '../../images/icons/player/download.svg';
import { ReactComponent as CloseSVG } from '../../images/icons/main/close.svg';
import { getCallRecord } from "../../utils/api";
import { mockMP3 } from "../../utils/moks";
import { calculateTime } from "../../utils/helpers/calculate-time";
import styles from './player.module.scss';

interface IPlayerProps {
  recordId: string
  partnershipId: number
}
const Player: FC<IPlayerProps> = ({ recordId, partnershipId }) => {
  const [audio, setAudio] = useState<any>()
  const [isPlay, setIsplay] = useState<boolean>(false)

  const [currentTime, setCurrentTime] = useState<string>('0')
  const [currentProgress, setCurrentProgress] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // const mp3 = getCallRecord(recordId, partnershipId)
    // setAudio(mp3)
    // data i got from test api is wrong, so set a mock audio
    setAudio(mockMP3)
    if (!audioRef.current) return
    const audio = audioRef.current
    audio.onloadedmetadata = () => {
      const duration = calculateTime(audio.duration)
      setCurrentTime(duration + '')
    }
  }, [audioRef.current])

  const handlePlay = (e: React.MouseEvent) => {
    isPlay ? setIsplay(false) : setIsplay(true)
    setIsplay(isPlay ? false : true)
    if (!audioRef.current) return
    isPlay ? audioRef.current.pause() : audioRef.current.play()
  }

  const updateProgress = (e: any) => {
    const { currentTime, duration } = e.target;
    const progress = (currentTime / duration) * 100
    // update progress bar width
    setCurrentProgress(progress)
    const time = calculateTime(currentTime)
    // update time counter
    setCurrentTime(time)
  }
  const handleChangeOnClick = (e: any) => {
    if (!audioRef.current) return
    const duration = audioRef.current.duration
    const track = e.currentTarget
    const trackWidth = track.clientWidth
    const clickX = e.nativeEvent.offsetX
    audioRef.current.currentTime = +((clickX / trackWidth) * duration).toFixed(3)
  }

  return (
    <div className={styles.player}>
      <audio ref={audioRef} src={audio} preload='metadata' onTimeUpdate={updateProgress} />
      <p className={styles.player__time}>{currentTime}</p>
      <div className={styles.player__play} onClick={handlePlay}>{isPlay ? <PauseSVG /> : <PlaySVG />}</div>
      <input
        className={styles.player__progress}
        type='range'
        value={currentProgress}
        style={{
          background: `linear-gradient(90deg, #002CFB ${currentProgress}%, #ADBFDF ${currentProgress}%)`
        }}
        onClick={handleChangeOnClick}
      />
      <div className={styles.player__btns}>
        <a href={audio} target='_blank'>
          <DownloadSVG className="icon-default" />
        </a>
        <button>
          <CloseSVG className="icon-default" />
        </button>
      </div>
    </div>
  )
}

export default Player