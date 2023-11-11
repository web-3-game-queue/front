import { FC } from 'react';
import { addMapId, removeMapId, useLogin, useMapIds } from '../Core/Storage/DataSlice';
import { useDispatch } from 'react-redux';
import { Utils } from '../Core/Utils';
import { AuthenticationAPI } from '../Core/APIs/AuthenticationAPI';

export const TestComponent: FC = () => {
    const mapIds = useMapIds();
    const login = useLogin();
    const dispatch = useDispatch();

    function add() {
        dispatch(addMapId(Math.max(0, ...mapIds) + 1));
    }

    function remove() {
        const id = Utils.RandomInRange(0, mapIds.length);
        const removeElement = mapIds[id];
        console.log('id :>> ', id, 'removeElement :>> ', removeElement);
        dispatch(removeMapId(removeElement));
    }

    async function testMe() {
        const me = await AuthenticationAPI.GetMe();
        console.log('me :>> ', me);
    }

    return (
        <>
            Login: {login}
            <button className="btn btn-primary" onClick={add}>
                Add
            </button>
            <button className="btn btn-secondary" onClick={remove}>
                Remove
            </button>
            <button className="btn btn-info" onClick={testMe}>
                Test me
            </button>
            MapIds:
            {mapIds.map((m) => (
                <div key={m}>{m}</div>
            ))}
        </>
    );
};
