import React from 'react';
import * as Styles from './List.styles';
import { Repository } from '../../../models';

interface ListProps {
  repositories: Repository[];
}

export function List({ repositories }: ListProps) {
  return (
    <>
      {repositories.map((repo) => (
        <Styles.Container key={repo.id}>
          <Styles.Header>
            <Styles.Title>{repo.name}</Styles.Title>

            <Styles.PrivateBadge>
              {repo.private ? 'Privado' : 'Publíco'}
            </Styles.PrivateBadge>
          </Styles.Header>

          <Styles.Footer>
            {repo.language && (
              <Styles.Language>{repo.language}</Styles.Language>
            )}

            <Styles.UpdatedAt>Atualizado em {repo.updated_at}</Styles.UpdatedAt>
          </Styles.Footer>
        </Styles.Container>
      ))}
    </>
  );
}
