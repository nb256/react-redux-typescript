import styled from 'styled-components';

import theme from '../theme';

const Container = styled.div`
  max-width: 960px;
  margin-top: ${theme.spacing(6)};
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${theme.spacing(6)};
`;

export default Container;
