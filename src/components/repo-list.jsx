import React from 'react';
import { Divider, Spin } from 'antd';
import useSWR from 'swr';
import GridLayout from 'react-grid-layout';

import { fetcher } from '../utils';
import { Repo } from './repo';

export const RepoList = () => {
  const { data, error } = useSWR('/users/relative-ci/repos?sort=created&direction=desc&type=public&per_page=100', fetcher);

  if (error) {
    return <Text>{error.message}</Text>;
  }


  if (!data) {
    return <Spin />;
  }

  const repos = data?.filter((repo) => repo.name.match(/^example-/));

  return (
    <GridLayout cols={2} rowHeight={180} width={768}>
      {repos?.map((repo, index) => (
        <div key={repo.id}>
          <Repo repo={repo} />
        </div>
      ))}
    </GridLayout>
  )
};
