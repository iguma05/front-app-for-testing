import { Box, Chip, Stack } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useGetTodoListQuery } from '../../store/queries';

export const Tabs = () => {
  const { data, isLoading, isError } = useGetTodoListQuery();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const stats = useMemo(() => {
    const items = data?.data || [];
    const total = items.length;
    // const completed = items.filter((t) => t.done).length;
    const active = total - 0;
    return { total, active };
  }, [data]);

  return (
    <Stack direction='row' spacing={1} style={{ marginTop: 12 }}>
      <Chip
        label={`Все (${stats.total ?? '-'})`}
        color={filter === 'all' ? 'primary' : 'default'}
        onClick={() => setFilter('all')}
        variant={filter === 'all' ? 'filled' : 'outlined'}
        data-testid='all-tab'
      />
      <Chip
        label={`Активные (${isLoading || isError ? '-' : stats.active})`}
        color={filter === 'active' ? 'primary' : 'default'}
        onClick={() => setFilter('active')}
        variant={filter === 'active' ? 'filled' : 'outlined'}
        data-testid='active-tab'
      />
      <Chip
        label={`Выполненные (${isLoading || isError ? '-' : 0})`}
        color={filter === 'completed' ? 'primary' : 'default'}
        onClick={() => setFilter('completed')}
        variant={filter === 'completed' ? 'filled' : 'outlined'}
        data-testid='completed-tab'
      />
      <Box flex={1} />
    </Stack>
  );
};
