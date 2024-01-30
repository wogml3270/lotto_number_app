import Image from 'next/image';

// import spinner from '@/assets/spinner.svg';
import clock from '@/assets/clock.svg';

import styles from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.loading}>
      <Image src={clock} alt='Loading Spinner' />
    </div>
  );
};

export default Spinner;
