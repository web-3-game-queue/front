import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { SearchMapsRequestPageComponent } from './SearchMapsRequestPage';

export const SearchMapsRequestPageParamIdComponent: FC = () => {
    const { id: idStr } = useParams();
    if (!idStr) {
        return <h2>Не указан id заявки</h2>;
    }
    const id = parseInt(idStr);
    if (Number.isNaN(id)) {
        return <h2>Неверно указан id заявки</h2>;
    }
    return <SearchMapsRequestPageComponent id={id} />;
};
