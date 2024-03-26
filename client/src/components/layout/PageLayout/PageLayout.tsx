import { ReactNode } from 'react';
import styles from './PageLayout.module.scss';

function PageLayout({ children }: { children?: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}

export default PageLayout;
