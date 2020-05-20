import React from 'react';
import './Style.scss';
import { observer } from 'mobx-react';

interface IProps {
    list: { id: number; name: string; selected: boolean }[],
    view: { id: number; name: string; selected: boolean }[],
    select(event: string) : void
}

const List: React.FC<IProps> = props => {

    return (
        <div className='list'>{
            props.view.map(i => (
                <a
                    href='#'
                    key={ i.id }
                    className={ i.selected ? 'item__action' : 'item' }
                    onClick={(event: React.MouseEvent<HTMLElement>) => props.select(event.currentTarget.innerHTML)}
                >{ i.name }</a>
            ))
        }
        </div>
    );
};

export default observer(List);
