import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TranslateBreadcrumb } from './BreadcrumbsTranslation';

export const BreadcrumbsComponent: FC = () => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter((x) => x !== '' && x !== 'index');
    const lastPath = paths.splice(paths.length - 1);

    return (
        <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page" key="path-0">
                {lastPath.length > 0 ? (
                    <Link to="/">Home</Link>
                ) : (
                    <li className="breadcrumb-item active" aria-current="page">
                        Home
                    </li>
                )}
            </li>
            {paths.map((path, id) => (
                <li className="breadcrumb-item" aria-current="page" key={`path-${id}`}>
                    <Link to={paths.slice(0, id + 1).join('/')}>{TranslateBreadcrumb(path)}</Link>
                </li>
            ))}
            {lastPath.length > 0 ? (
                <li className="breadcrumb-item active" aria-current="page">
                    {TranslateBreadcrumb(lastPath[0])}
                </li>
            ) : null}
        </ol>
    );
};
