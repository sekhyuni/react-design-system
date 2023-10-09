import React, { type Dispatch, type SetStateAction, useState } from 'react';

import ArrowLeftSmall from '@/assets/images/arrow-left-small.png';
import ArrowRightSmall from '@/assets/images/arrow-right-small.png';

import styles from './Pagination.module.css';

interface Props {
  /** current page number */
  page: number;
  /** update function of current page number */
  setPage: Dispatch<SetStateAction<number>>;
  /** total row count */
  total: number;
  /** row count per page */
  limit: number;
  /** page length (default : 5) */
  lengthOfPage?: number;
}

const Pagination = ({
  page,
  setPage,
  total,
  limit,
  lengthOfPage = 5,
}: Props) => {
  const countOfAllPages = Math.ceil(total / limit);

  const [pageStartIdx, setPageStartIdx] = useState(1);
  const [pageEndIdx, setPageEndIdx] = useState(lengthOfPage);

  return (
    <nav className={styles.pagination}>
      {total > limit && (
        <button
          className={styles['container-arrow-left-small']}
          disabled={page === 1}
          onClick={() => {
            if (page === pageStartIdx) {
              setPageStartIdx(pageStartIdx - 1);
              setPageEndIdx(pageEndIdx - 1);
            }

            setPage(page - 1);
          }}
        >
          <img src={ArrowLeftSmall} alt='ArrowLeftSmall' />
        </button>
      )}
      {Array.from({ length: countOfAllPages }, (_, idx) => {
        if (idx >= pageStartIdx - 1 && idx <= pageEndIdx - 1) {
          return (
            <button
              key={idx + 1}
              className={`${styles['page-number']} ${
                page === idx + 1 ? styles['active-color'] : ''
              }`}
              onClick={() => {
                setPage(idx + 1);
              }}
            >
              {idx + 1}
            </button>
          );
        }
      })}
      {total > limit && (
        <button
          className={styles['container-arrow-right-small']}
          disabled={page === countOfAllPages}
          onClick={() => {
            if (page === pageEndIdx) {
              setPageStartIdx(pageStartIdx + 1);
              setPageEndIdx(pageEndIdx + 1);
            }

            setPage(page + 1);
          }}
        >
          <img src={ArrowRightSmall} alt='ArrowRightSmall' />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
