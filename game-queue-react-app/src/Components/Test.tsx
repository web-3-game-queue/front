import { FC } from 'react';
import { addMapId, removeMapId, useMapIds } from '../Core/Storage/DataSlice';
import { useDispatch } from 'react-redux';
import { Utils } from '../Core/Utils';

export const TestComponent: FC = () => {
    const mapIds = useMapIds();
    const dispatch = useDispatch();

    function add() {
        dispatch(addMapId(mapIds.length + 1));
    }

    function remove() {
        const id = Utils.RandomInRange(0, mapIds.length);
        const removeElement = mapIds[id];
        console.log('id :>> ', id, 'removeElement :>> ', removeElement);
        dispatch(removeMapId(removeElement));
    }

    return (
        <>
            <button className="btn btn-primary" onClick={add}>
                Add
            </button>
            <button className="btn btn-secondary" onClick={remove}>
                Remove
            </button>
            MapIds:
            {mapIds.map((m) => (
                <div key={m}>{m}</div>
            ))}
        </>
    );
};
