import { useQuery, QueryHookOptions } from 'react-apollo'
import { DocumentNode } from 'graphql'

export default function useImperativeQuery(
  query: DocumentNode,
  options: QueryHookOptions = {}
): any {
  const { refetch } = useQuery(query, {
    ...options,
    skip: true,
  });

  const imperativelyCallQuery = (queryVariables: any) => {
    return refetch(queryVariables);
  };

  return imperativelyCallQuery;
}