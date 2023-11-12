import { FC, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setMapIds, useAuth } from '../../../Core/Storage/DataSlice';
import { Map } from '../../../Autogenerated/Backend';
import { AuthenticationAPI } from '../../../Core/APIs/AuthenticationAPI';
import { MapAPI } from '../../../Core/APIs/MapAPI';
import { useDispatch } from 'react-redux';
import { SearchMapsRequestAPI } from '../../../Core/APIs/SearchMapsRequestAPI';
import { Utils } from '../../../Core/Utils';
import { StaticDataAPI } from '../../../Core/APIs/StaticDataAPI';

export const MapAddPageComponent: FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [update, setUpdate] = useState(true);
    const dispatch = useDispatch();
    const [coverImageUrl, setCoverImageUrl] = useState<string>(StaticDataAPI.FormPlaceholderUrl());

    const [cardBg, setCardBg] = useState('');

    const nameInput = useRef<HTMLInputElement>(null);
    const widthInput = useRef<HTMLInputElement>(null);
    const heightInput = useRef<HTMLInputElement>(null);
    const maxPlayersCountInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLInputElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    function onImageUpload() {
        const image = imageInput.current?.files?.item(0) ?? null;

        if (image != null) {
            const fr = new FileReader();
            fr.onload = () => {
                if (typeof fr.result === 'string') {
                    setCoverImageUrl(fr.result);
                }
            };
            fr.readAsDataURL(image);
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const name = nameInput.current?.value ?? '';
        const width = widthInput.current ? parseInt(widthInput.current.value) : 0;
        const height = heightInput.current ? parseInt(heightInput.current.value) : 0;
        const maxPlayersCount = maxPlayersCountInput.current ? parseInt(maxPlayersCountInput.current.value) : 0;
        const description = descriptionInput.current?.value ?? '';
        const image = imageInput.current?.files?.item(0) ?? null;

        const newMap: Map = {
            name,
            width,
            height,
            maxPlayersCount,
            description
        };

        await MapAPI.CreateMap(newMap, image ? { file: image, url: image.name } : null);

        const currentRequest = await SearchMapsRequestAPI.GetCurrent();
        if (currentRequest === null) {
            dispatch(setMapIds([]));
        } else {
            dispatch(setMapIds(currentRequest.maps!.map((x) => x.id!)));
        }

        setUpdate(true);

        setCardBg('bg-success-subtle');
        await Utils.Sleep(500);
        setCardBg('');
    }

    useEffect(() => {
        async function loadData() {
            const isAdmin = await AuthenticationAPI.IsAdmin();
            if (!isAdmin) {
                navigate('../');
            }
        }

        if (update) {
            setUpdate(false);
            loadData();
        }
    }, [auth, navigate, update]);

    const onClickBack = () => {
        navigate(-1);
    };

    const backButton = (
        <button className="btn btn-secondary" onClick={onClickBack}>
            Назад
        </button>
    );

    return (
        <div className="card">
            <h3>Создание новой карты</h3>
            <div className="card-body">
                <form className={`card p-2 m-3 needs-validation ${cardBg}`} style={{ width: '250px', display: 'inline-block' }} onSubmit={handleSubmit}>
                    <div
                        style={{
                            height: '5rem',
                            position: 'relative'
                        }}
                    >
                        <img
                            src={coverImageUrl}
                            alt="Minimap image"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                resize: 'both',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                position: 'absolute',
                                margin: 'auto',
                                width: 'auto',
                                height: 'auto',
                                border: '1px solid black'
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">
                            Название
                        </label>
                        <input type="text" className="form-control" id="Name" name="Name" ref={nameInput} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Width" className="form-label">
                            Ширина
                        </label>
                        <input type="number" className="form-control" id="Width" name="Width" min="0" ref={widthInput} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Height" className="form-label">
                            Высота
                        </label>
                        <input type="number" className="form-control" id="Height" name="Height" min="0" ref={heightInput} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Height" className="form-label">
                            Максимальное количество игроков
                        </label>
                        <input type="number" className="form-control" id="Height" name="Height" min="0" ref={maxPlayersCountInput} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">
                            Описание
                        </label>
                        <input type="text" className="form-control" id="Description" name="Description" ref={descriptionInput} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Image" className="form-label">
                            Обложка
                        </label>
                        <input type="file" className="form-control" id="Image" name="Image" min="0" ref={imageInput} onChange={onImageUpload} />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Создать новую карту
                    </button>
                </form>
            </div>
            {backButton}
        </div>
    );
};
