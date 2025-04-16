import React, { useEffect, useState } from 'react';

type CountdownProps = {
  start: number;
  onComplete: () => void;
};

const Countdown: React.FC<CountdownProps> = ({ start, onComplete }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div style={styles.container}>
      <h1 style={styles.number}>{count}</h1>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '5rem',
    fontWeight: 'bold',
    background: 'rgba(255, 255, 255, 0.75)',
    padding: '1rem 2rem',
    borderRadius: '1rem',
    zIndex: 10,
  },
  number: {
    margin: 0,
  },
};

export default Countdown;