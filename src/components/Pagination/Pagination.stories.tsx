import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import Pagination from './Pagination';

const meta = {
  title: 'Components / Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWithHooks = () => {
  const [page, setPage] = useState(1);

  return <Pagination page={page} setPage={setPage} total={10} limit={5} />;
};

export const Primary: Story = {
  render: () => <PaginationWithHooks />,
};
