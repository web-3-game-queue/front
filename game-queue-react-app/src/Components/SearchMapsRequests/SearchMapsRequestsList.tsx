import { FC, useState, useEffect, useRef } from 'react';
import { SearchMapsRequest } from '../../Autogenerated/Backend';
import { LoadingIndicator } from '../UI/LoadingIndicator';
import { SearchMapsRequestAPI } from '../../Core/APIs/SearchMapsRequestAPI';
import { useAuth } from '../../Core/Storage/DataSlice';
import { useNavigate } from 'react-router-dom';
import { SearchMapsRequestRowComponent } from './SearchMapsRequestRow';
import { AuthenticationAPI } from '../../Core/APIs/AuthenticationAPI';

export const SearchMapsRequestListComponent: FC = () => {
    const [requests, setRequests] = useState<SearchMapsRequest[] | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const [isMod, setIsMod] = useState(false);

    const [beginDate, setBeginDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);

    const beginDateInput = useRef<HTMLInputElement>(null);
    const endDateInput = useRef<HTMLInputElement>(null);
    const usernameInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function loadData() {
            const checkIsMod = await AuthenticationAPI.IsMod();
            setIsMod(checkIsMod);
        }

        loadData();
        if (auth === null) {
            navigate('/');
        }
    }, [auth, navigate]);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (isMod) {
                const requests = await SearchMapsRequestAPI.GetAllRequests(beginDate, endDate, username);
                setRequests(requests);
            } else {
                const requests = await SearchMapsRequestAPI.GetRequests();
                setRequests(requests);
            }
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [isMod, beginDate, endDate, username]);

    function applyFilters(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();

        const beginDateStr = beginDateInput.current?.value;
        const beginDate = beginDateStr ? new Date(beginDateStr) : undefined;
        setBeginDate(beginDate);

        const endDateStr = endDateInput.current?.value;
        const endDate = endDateStr ? new Date(endDateStr) : undefined;
        setEndDate(endDate);

        const username = usernameInput.current?.value;
        setUsername(username);
        setRequests(null);
    }

    // const filtersPanel = !isMod ? <>HELLO</> : <>WTF</>;
    const filtersPanel = (
        <form className="card card-body" onSubmit={applyFilters}>
            <h5>Фильтрация</h5>
            <label htmlFor="BeginDate" className="form-label">
                Начальная дата — конечная дата
            </label>
            <div id="BeginDate" className="input-group mb-3">
                <input type="datetime-local" className="form-control" placeholder="Начальная дата" aria-label="BeginDate" ref={beginDateInput} />
                <span className="input-group-text">—</span>
                <input type="date" className="form-control" placeholder="Конечная дата" aria-label="EndDate" ref={endDateInput} />
            </div>

            <div className="mb-3">
                <label htmlFor="Username" className="form-label">
                    Имя пользователя
                </label>
                <input type="text" className="form-control" placeholder="Имя пользователя" id="Username" name="Username" ref={usernameInput} />
            </div>
            <button className="btn btn-primary">Применить</button>
        </form>
    );

    return (
        <div>
            <h3>Список заявок</h3>
            {filtersPanel}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {isMod ? <th scope="col">Создатель</th> : <></>}
                        <th scope="col">Статус</th>
                        <th scope="col">Дата создания</th>
                        <th scope="col">Дата формирования</th>
                        <th scope="col">Дата завершения</th>
                        <th scope="col">Список карт</th>
                    </tr>
                </thead>
                <tbody>{requests == null ? <LoadingIndicator /> : requests.map((r) => <SearchMapsRequestRowComponent searchMapsRequest={r} isMod={isMod} key={r.id} />)}</tbody>
            </table>
        </div>
    );
};
