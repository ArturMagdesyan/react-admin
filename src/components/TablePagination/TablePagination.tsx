import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import usePagination from '@mui/material/usePagination';
import { Theme } from '@mui/material';
import { FilterButton } from '../FilterButton';
import { TableFilterAction } from '../../common/enums';
import { TablePageSize } from './TablePageSize';

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: (theme: Theme) => theme.spacing(5),
    height: '38px',
  },
  buttonsView: {
    display: 'flex',
    height: 'fit-content',
  },
  pageButtonsView: {
    display: 'flex',
    margin: (theme: Theme) => theme.spacing(0, 2.25),
    '& button': {
      marginRight: (theme: Theme) => theme.spacing(0.5),
    },
    '& button:last-child': {
      marginRight: 0,
    },
  },
};

interface Props {
  page: number;
  size: number;
  total: number;
  dispatch: React.Dispatch<any>,
}

export const TablePagination = ({
  dispatch,
  page,
  size,
  total,
}: Props) => {
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const { t } = useTranslation();

  const onChangePage = (event: ChangeEvent<unknown>, pageNumber: number) => {
    dispatch({ type: TableFilterAction.ADD_CURRENT_PAGE, value: pageNumber - 1 });
  };
  const { items: pages } = usePagination({
    count: totalPageCount,
    page,
    onChange: onChangePage,
  });

  useEffect(() => {
    setTotalPageCount(Math.ceil(total / size));
  }, [total, size]);

  return (
    <Box sx={styles.root}>
      <Box>
        <TablePageSize
          size={size}
          total={total}
          page={page}
          dispatch={dispatch}
        />
      </Box>
      <Box sx={styles.buttonsView}>
        <FilterButton
          title={t('pagination.previous')}
          disabled={page <= 0}
          onClick={() => dispatch({ type: TableFilterAction.ADD_CURRENT_PAGE, value: page - 1 })}
        />
        <Box sx={styles.pageButtonsView}>
          {pages.map(({ page: numberPage, type, onClick }, index) => {
            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              return (
                <FilterButton
                  key={index.toString()}
                  title="..."
                  disabled
                  onClick={() => {}}
                />
              );
            }
            if (type === 'page') {
              return (
                <FilterButton
                  key={index.toString()}
                  title={numberPage.toString()}
                  onClick={onClick}
                  isActive={page === numberPage - 1}
                />
              );
            }

            return null;
          })}
        </Box>
        <FilterButton
          title={t('pagination.next')}
          disabled={page + 1 >= totalPageCount}
          onClick={() => dispatch({ type: TableFilterAction.ADD_CURRENT_PAGE, value: page + 1 })}
        />
      </Box>
    </Box>
  );
};
