import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface FearGreedSemicircleProps {
  fgIndex: number;
}

function FearGreedSemicircle({ fgIndex }: FearGreedSemicircleProps) {
  let color = '#fe5914';
  if (fgIndex < 40) color = '#f87171';
  else if (fgIndex > 60) color = '#34d399';
  else color = '#facc15';

  return (
    <div className="w-40 h-20">
      <CircularProgressbar
        value={fgIndex}
        text={`${fgIndex.toFixed(0)}`}
        maxValue={100}
        strokeWidth={10}
        circleRatio={0.5}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: 'round',
          trailColor: '#e5e7eb',
          pathColor: color,
          textColor: color,
          textSize: '17px',
        })}
      />
    </div>
  );
}

export default FearGreedSemicircle;