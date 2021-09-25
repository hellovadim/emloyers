import EmployersListItem from '../eployers-list-item/eployers-list-item';

import './employers-list.css';

const EmployersList = () => {
    return (
        <ul className="app-list list-group">
            <EmployersListItem/>
            <EmployersListItem/>
            <EmployersListItem/>
        </ul>
    )
}

export default EmployersList;