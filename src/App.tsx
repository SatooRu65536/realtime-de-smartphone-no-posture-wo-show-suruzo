import styled from 'styled-components';
import Player from './components/Player';

const Main = styled.main`
  height: 100vh;
  width: 100vw;
`;

export default function App() {
  return (
    <Main>
      <Player />
    </Main>
  );
}
