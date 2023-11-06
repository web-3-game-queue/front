import { FC } from 'react';
import { Link } from 'react-router-dom';

export const IndexComponent: FC = () => (
    <>
        Well, hello there
        <br />
        <Link to="/demo">Open demo</Link>
    </>
);
