import Image from 'next/image';

import spinner from '@/assets/spinner.svg';
import clock from '@/assets/clock.svg';
import bars from '@/assets/bars.svg';
import blocks from '@/assets/blocks.svg';
import gooey from '@/assets/gooey.svg';
import pulse from '@/assets/pulse.svg';
import styles from './spinner.module.scss';

const RandomLoading = () => {
  const images = [spinner, clock, bars, blocks, gooey, pulse];

  const randomIndex = Math.floor(Math.random() * images.length);

  const imageToShow = images[randomIndex];

  return (
    <div className={styles.loading}>
      <Image src={imageToShow} alt='Loading...' />
    </div>
  );
};

export default RandomLoading;
