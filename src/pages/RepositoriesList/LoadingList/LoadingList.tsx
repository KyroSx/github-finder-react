import React from 'react';
import * as Styles from './LoadingList.styles';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { theme } from '../../../app/Providers/ThemeProvider';

export function LoadingList() {
  return (
    <Styles.Container role="progressbar">
      <Skeleton
        height={100}
        count={5}
        baseColor={theme.colors.loading.base}
        highlightColor={theme.colors.loading.highlight}
      />
    </Styles.Container>
  );
}
